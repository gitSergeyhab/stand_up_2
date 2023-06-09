import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { OrderValues, StatusCode, SQLFunctionName, Column, ColumnId, ImageType, DefaultQueryParams, SortType, SortDirection } from "../const/const";
import { getDataFromSQL, getDataInsertQueryStr, getDataUpdateQueryStr, getTitles, insertView } from "../utils/sql-utils";
import { ImageFile, SimpleDict } from "../types";
import { imageService } from "../service/image-service";
import { ApiError } from "../custom-errors/api-error";
import { getDefaultFromToYears } from "../utils/date-utils";
import { getBetweenYearsWhereStr } from '../utils/sql-where-utils'
import { getNullObj, getValueOrNull } from "../utils/utils";


const {Limit, Offset, EventStatusAll} = DefaultQueryParams;

const SortTypeName = {
    [SortType.Added]: 'place_date_added', //=
    [SortType.New]: 'place_date_founded_sort', //=
    [SortType.Name]: 'place_name', //=
    [SortType.WeeklyViews]: 'weekly_views', //=
    [SortType.TotalViews]: 'total_views',//=
    // [SortType.Rate]: 'avg_rate', //=
    // [SortType.RateCount]: 'number_of_rate', //=
  }



class PlacesController {

    async getPlaceById(req: Request, res: Response) {
        
        try {
            const {id, user_id = '1'} = req.params
            console.log('getPlaceById', {id, user_id})
                const places = await sequelize.query(
                    `
                    SELECT
                        place_id, 
                        place_name, 
                        place_name_en, 
                        place_city, 
                        place_city_en, 
                        place_date_founded, 
                        place_date_closed,
                        place_date_added, 
                        place_description, 
                        get_main_pictures(place_main_picture_id) as main_picture,  
                        get_main_pictures(user_avatar_id) as user_picture, 
                        countries.country_id, country_name, country_name_en,
                        users.user_id, user_nik,
                        get_resources('place_id', :id) AS resources,
                        get_images('place_id', :id) AS pictures,

                        get_views_count('place_id', :id, 7) AS weekly_views,
                        get_views_count('place_id', :id, 1000000) AS total_views
                    FROM places
                    LEFT JOIN countries USING(country_id)
                    LEFT JOIN users ON user_id = user_added_id
                    WHERE place_id = :id
                    GROUP BY  place_id, countries.country_id, users.user_id;
                    ;
                    `,
                    { 
                        replacements: {id},
                        type: 'SELECT'
                    }
                );
                if (!places.length) {
                    return res.status(StatusCode.NotFoundError).json({message: `not found place with ID: ${id}`})
                }

                await insertView(id, user_id, Column.Place)

        
                return res.status(StatusCode.Ok).json(places[0])
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get place by id'})
        }
    }



    async searchPlacesByName(req: Request, res: Response) {
        try {
            const {search='', limit = null, offset = null, order='view'} = req.query;

            const shows = await sequelize.query(
                `
                SELECT 
                    place_id, place_name, place_name_en, place_city, place_city_en, place_promo_picture,
                    COUNT(place_view_id) as view_num
                FROM places
                JOIN place_views USING (place_id) 
                
                WHERE place_name ILIKE :search OR place_name_en ILIKE :search
                GROUP BY place_id
                ORDER BY ${OrderValues[order as string] || OrderValues.views} DESC
                LIMIT :limit
                OFFSET :offset;
                ;
                `,
                {
                    replacements: {search: `%${search}%`, limit, offset},
                    type: 'SELECT'
                }
            )

            return res.status(200).json({shows});
    
   
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'error search shows'})
        }
    }

    async addPlace (req: Request, res: Response ) {
        try {
            const {body} = req;
            const dir = req.query.dir as string;
            console.log({dir, body})
            const file = req.file as ImageFile;
            const place_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {
                user_added_id = '1', country_id, 
                place_name, place_name_en, 
                place_city, place_city_en,
                place_date_founded, place_date_closed,
                place_description
            } = body as SimpleDict;

            const fields = [
                {user_added_id}, {country_id}, 
                {place_name}, {place_name_en}, 
                {place_city}, {place_city_en},
                {place_date_founded}, {place_date_closed}, 
                {place_description}

            ] as SimpleDict[];
            const allFields = [...fields, {place_main_picture_id}]

            const sqlQuery = getDataInsertQueryStr(allFields, dir)


            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! 
                replacements: {...body, place_main_picture_id, user_added_id: '1'}, 
                type: "INSERT"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async changePlace (req: Request, res: Response ) {
        try {
            const {body} = req;
            const {id} = req.params
            const dir = req.query.dir as string;
            const file = req.file as ImageFile;
            const place_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {
                user_added_id = '1', country_id, 
                place_name, place_name_en, 
                place_city, place_city_en,
                place_date_founded, place_date_closed,
                place_description, isPicChanged
            } = body as SimpleDict;
            const fields = [
                {user_added_id}, {country_id}, 
                {place_name}, {place_name_en}, 
                {place_city}, {place_city_en},
                {place_date_founded}, {place_date_closed}, 
                {place_description}

            ] as SimpleDict[];
            
            const placePictureIdValue = getValueOrNull(place_main_picture_id);
            const allFields = [...fields, isPicChanged ? {place_main_picture_id} : null].filter((item) => item)
            const sqlQuery = getDataUpdateQueryStr(allFields, dir)


            const result = await sequelize.query(sqlQuery, {
                replacements: getNullObj({...body, place_main_picture_id: placePictureIdValue, user_added_id: '1', id}), 
                type: "UPDATE"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json({sqlQuery, id})

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getPlaces(req: Request, res: Response) {
        try {
            const { yearFrom, yearTo } = getDefaultFromToYears()
            const { id } = req.params;
            const { 
                country_id, year_from=yearFrom, year_to=yearTo, limit = Limit, offset = Offset,
                direction, sort_type
             } = req.query;

             console.log(req.query, '+++++++++++ ______ req.query ________ ++++++++++++')

            const sqlDirection = direction === SortDirection.ASC ? direction : SortDirection.DESC;
            const sqlType = SortTypeName[sort_type as string] || SortTypeName[SortType.WeeklyViews];

            console.log( SortTypeName[sort_type as string], 'SortTypeName[sort_type as string]' )

            const where = `
                WHERE (places.country_id ${country_id ? ' = :country_id' : ' = places.country_id OR 1 = 1'})
                ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('place_date_founded')}` : '' }
            `;



        const countQuery = `SELECT COUNT(place_id) FROM places ${where};`;

            const result = await sequelize.query(
                `
                SELECT
                    place_id,
                    place_name,
                    place_city, 
                    place_city_en,
                    place_date_founded, 
                    COALESCE(place_date_founded, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS place_date_founded_sort, 
                    place_date_closed,
                    place_date_added,
                    place_description,
                    countries.country_id, country_name, 
                    destination || filename AS main_picture,
                    get_views_count('place_id', place_id, 7) AS weekly_views,
                    get_views_count('place_id', place_id, 1000000) AS total_views
                FROM places
                LEFT JOIN countries ON countries.country_id = places.country_id
                LEFT JOIN main_pictures ON place_main_picture_id = main_pictures.main_picture_id
                ${where}
                ORDER BY ${sqlType} ${sqlDirection}
                LIMIT :limit
                OFFSET :offset;
                ;

                ${countQuery}
                ;`,
                {
                    replacements: { id, limit, offset, year_from, year_to, country_id },
                    type: 'SELECT'
                }

            )
            console.log({result}, 'result___________________________', 'getShows +++')

            const data = getDataFromSQL(result)
            return res.status(200).json(data);
    
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error getShows'})
        }
    }
}


export const placesController = new PlacesController();