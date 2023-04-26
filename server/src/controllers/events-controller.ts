import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { Column, ColumnId, DefaultQueryParams, OrderValues, SQLFunctionName, StatusCode } from "../const";
import { checkTitles, getDataFromSQL, getDataFromSQLWithTitles, getTitlesQuery, insertView } from "../utils/sql-utils";
import { TitlesDataType } from "../types";

const EventOrder = {
    totalViews: 'total_views',
    views: 'views',
    time: 'event_date',
    upcoming : 'upcoming '
}

const {Limit, Offset, EventStatus} = DefaultQueryParams;


class EventsController {
    async getEventById(req: Request, res: Response) {
        try {
            console.log('getEventById')
            const {id, user_id = '1'} = req.params
                const events = await sequelize.query(
                    `
                    SELECT 
                        event_id, event_name, event_name_en, event_description, event_date, event_date_added, event_status, event_promo_picture AS event_picture,
                        places.place_id, place_name, place_name_en, places.place_promo_picture AS place_picture,
                        user_id, user_nik, user_avatar,
                        countries.country_id, country_name, country_name_en, 
                        get_event_comedians(:id) as event_comedians,
                        get_event_shows(:id) AS event_shows,
                        get_resources('event_id', :id)  AS event_resources,

                        get_views_count('event_id', :id, 7) AS views,
                        get_views_count('event_id', :id, 1000000) AS total_views
                    
                    FROM events
                    LEFT JOIN places USING (place_id)
                    LEFT JOIN countries USING (country_id)
                    LEFT JOIN users USING (user_id)
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
            return res.status(StatusCode.ServerError).json({message: 'error get show by id'})
        }
    }

// !!! PLANNED -> planned
    async getEventsByQuery(req: Request, res: Response) {
        try {
            const {days = '365', country_id = null, city = null, status = null, order = null, direction = null, limit = Limit, offset = Offset } = req.query;

            const where = `
                WHERE  country_id = ${country_id ? ':country_id' : 'country_id'}
                AND ( LOWER(place_city)  = LOWER(${city ? ':city' : 'LOWER(place_city)'})  OR LOWER(place_city_en) = LOWER(${city ? ':city' : 'LOWER(place_city_en)'}) )
                AND event_status = ${status ? ':status' : 'event_status'}
                AND EXTRACT (DAY FROM ( NOW() - event_date )) < :days
            `;

            const result = await sequelize.query(
                `
                SELECT 
                    event_id, event_name, event_name_en, event_date, event_date_added, event_status, event_promo_picture AS event_picture,
                    countries.country_id, country_name, country_name_en, 
                    place_city, place_city_en,

                    get_views_count('event_id', event_id, 7) AS views,
                    get_views_count('event_id', event_id, 1000000) AS total_views,

                    ABS(EXTRACT (DAY FROM ( NOW() - event_date )))  AS upcoming

                FROM events
                LEFT JOIN places USING (place_id)
                LEFT JOIN countries USING (country_id)

                ${where}

                ORDER BY ${EventOrder[order as string] || EventOrder.views} ${direction === 'asc' ? 'ASC' : 'DESC'}
                
                LIMIT :limit
                OFFSET :offset
                ;

                SELECT
                COUNT (event_id)::int
                FROM events
                LEFT JOIN places USING (place_id)
                LEFT JOIN countries USING (country_id)

                ${where}
                ;
                `,
                {
                    replacements: { days, country_id, city, status, order, direction, limit, offset},
                    type: 'SELECT'
                }
            )

            const data = getDataFromSQL(result, 'events')

            return res.status(200).json({data});
    
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error get shows by query'})
        }
    }

    async getEventsByColumnId(req: Request, res: Response) {
        try {
            const {type, id} = req.params;
            const {year = null, limit = Limit , offset = Offset, status = EventStatus, test} = req.query;
            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const where = `
                WHERE ${columnId} = :id
                ${year ? 'AND EXTRACT( YEAR FROM event_date) = :year' : '' } 
                AND ${status && status !== EventStatus ? 'event_status = :status' : '1 = 1'}
            `;

            const result = await sequelize.query(
                `
                SELECT
                event_id, event_name, event_name_en, event_date, event_promo_picture, event_status,
                comedian_id, place_id, place_name, place_name_en

                FROM events
                LEFT JOIN comedians_events USING (event_id)
                LEFT JOIN comedians USING (comedian_id)
                LEFT JOIN places USING (place_id)

                ${where}

                ORDER BY ABS(EXTRACT( DAY FROM (NOW() - event_date))) ASC
                LIMIT :limit
                OFFSET :offset
                ;
                ${getTitlesQuery(type)}
                SELECT COUNT(event_id) 
                FROM events
                LEFT JOIN comedians_events USING (event_id)
                LEFT JOIN comedians USING (comedian_id)
                ${where}
                ;`,
                {
                    replacements: { id, year, status, limit, offset },
                    type: 'SELECT'
                }
            )

            const data = getDataFromSQLWithTitles(result);
            return checkTitles(data, res);
   
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error getShowsByColumnId'})
        }
    }



}


export const eventsController = new EventsController();