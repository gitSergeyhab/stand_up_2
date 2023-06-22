import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import {  DefaultQueryParams, StatusCode, EventStatus, ImageType, TableName, Column } from "../const/const";
import {  getDataFromSQL,  getDataFromSQLWithTitles,  getDataInsertQueryStr, getDataUpdateQueryStr, getTitles, getTitlesQuery, insertView } from "../utils/sql-utils";
import { ImageFile, SimpleDict, TitlesDataType } from "../types";
import { imageService } from "../service/image-service";
import { ApiError } from "../custom-errors/api-error";
import { getDefaultFromToYears } from "../utils/date-utils";
import {getBetweenYearsWhereStr} from '../utils/sql-where-utils'
import { getNullObj, getValueOrNull } from "../utils/utils";

const EventOrder = {
    totalViews: 'total_views',
    views: 'views',
    time: 'event_date',
    upcoming : 'upcoming '
}


const ColumnId = {
    comedians: 'comedians.comedian_id',
    events: 'events.event_id',
    shows: 'shows.show_id',
    places: 'places.place_id',


}

const {Limit, Offset, EventStatusAll} = DefaultQueryParams;


class EventsController {
    async getEventById(req: Request, res: Response) {
        try {
            console.log('getEventById')
            const {id, user_id = '1'} = req.params
                const events = await sequelize.query(
                    `
                    SELECT 
                        event_id,
                        event_name,
                        event_name_en,
                        event_description,
                        event_date,
                        event_date_added,
                        event_status,
                        places.place_id,
                        places.place_name,
                        place_city,
                        countries.country_id AS place_country_id, 
                        countries.country_name AS place_country_name,
                        users.user_nik,
                        users.user_id,
                        avatars.destination || avatars.filename AS user_picture,
                        get_main_pictures(event_main_picture_id) AS main_picture,
                        get_main_pictures(place_main_picture_id) AS place_picture,
                        get_resources('event_id', :id)  AS event_resources,
                        get_views_count('event_id', :id, 7) AS views,
                        get_views_count('event_id', :id, 1000000) AS total_views

                    FROM events
                    LEFT JOIN users ON users.user_id = events.user_added_id
					LEFT JOIN places ON places.place_id = events.place_id 
					LEFT JOIN countries ON countries.country_id = places.country_id
					LEFT JOIN avatars on user_avatar_id = avatars.avatar_id
                    LEFT JOIN main_pictures on event_main_picture_id = main_pictures.main_picture_id
                    WHERE event_id = :id
                    ;
                    `,
                    { 
                        replacements: {id},
                        type: 'SELECT'
                    }
                );

                if (!events.length) {
                    return res.status(StatusCode.NotFoundError).json({message: `where is not event with ID: ${id}`})
                }

                await insertView(id, user_id, Column.Event)
        
                return res.status(StatusCode.Ok).json(events[0])
            
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error getEventById'})
        }    
    }


    async addEvent (req: Request, res: Response ) {

        // const getStringStatus = (status: string|string[]) => typeof status === 'string' ? status : status[0];

        try {
            const {body} = req;
            const dir = req.query.dir as string;
            console.log({dir, body})

            const file = req.file as ImageFile;
            const event_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   + user_added_id
            
            const {user_added_id = '1', event_status, place_id, event_date, event_name, event_name_en, event_description} = body as SimpleDict;
            console.log(typeof event_status)
            const fields = [{event_status}, {user_added_id}, {event_name}, {event_name_en}, {place_id}, {event_date}, {event_description}] as SimpleDict[];
            const allFields = [...fields, {event_main_picture_id}];

            const sqlQuery = getDataInsertQueryStr(allFields, dir)

            
            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! +  user_added_id
                replacements: {...body, event_main_picture_id, user_added_id: '1'}, 
                type: "INSERT"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async changeEvent (req: Request, res: Response ) {
        try {
            const {body} = req;
            const {id} = req.params
            const dir = req.query.dir as string;
            console.log({dir, body})
            const file = req.file as ImageFile;
            const event_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {
                user_added_id = '1',  place_id, 
                event_date, event_name, event_name_en, event_description, event_status,
                isPicChanged
            } = body as SimpleDict;
            const fields = [
                {user_added_id}, {place_id}, 
                {event_date}, {event_name}, {event_name_en}, {event_description}, {event_status},
            ] as SimpleDict[];

        
            const pictureIdValue = getValueOrNull(event_main_picture_id);
            const allFields = [...fields, isPicChanged ? {event_main_picture_id} : null].filter((item) => item);
            const sqlQuery = getDataUpdateQueryStr(allFields, dir);
            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! 
                replacements: getNullObj({...body, event_main_picture_id: pictureIdValue, user_added_id: '1', id}),
                type: "UPDATE"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getEvents(req: Request, res: Response) {
        try {
            const { yearFrom, yearTo } = getDefaultFromToYears()
            const { type, id } = req.params;
            const { year_from=yearFrom, year_to=yearTo, status = EventStatusAll, limit = Limit, offset = Offset } = req.query;

            const columnId = ColumnId[type];
            const titlesSqlQuery = getTitles(type);
            console.log({titlesSqlQuery}, '+=================+')

            const where = `
                WHERE 1=1
                ${columnId ? `AND ${columnId} = :id`: '' } 
                ${status && status !== EventStatusAll ? 'AND event_status = :status' : '' }  
                ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('event_date')}` : '' }
            `;

            const result = await sequelize.query(
                `
				SELECT 
                    event_id, 
                    event_name,
                    event_name_en, 
                    event_date, 
                    event_date_added,
                    event_status,
                    places.place_id, 
                    place_name,
                    destination || filename AS main_picture,
                    count (DISTINCT view_id) AS views_count
	
				FROM events
                LEFT JOIN main_pictures ON event_main_picture_id = main_picture_id
				LEFT JOIN views USING (event_id)
                LEFT JOIN comedians_events USING(event_id)
				LEFT JOIN comedians ON comedians.comedian_id = comedians_events.comedian_id
                LEFT JOIN places ON events.place_id = places.place_id
                ${where}
                GROUP BY event_id, destination, filename, places.place_id
                LIMIT :limit
                OFFSET :offset
                ;

                ${titlesSqlQuery}

                SELECT COUNT (DISTINCT event_id) 
                FROM events
                LEFT JOIN comedians_events USING(event_id)
				LEFT JOIN comedians ON comedians.comedian_id = comedians_events.comedian_id
                LEFT JOIN places ON events.place_id = places.place_id
                ${where}
                ;
                `,
                {
                    replacements: { id, limit, offset, status, year_from, year_to },
                    type: 'SELECT'
                }
            )
            console.log({result}, 'result___________________________', 'getEvents+++')

            const data = type ? getDataFromSQLWithTitles(result) : getDataFromSQL(result)
            return res.status(200).json(data);
    
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error getShowsByComedianId'})
        }
    }
}


export const eventsController = new EventsController();
