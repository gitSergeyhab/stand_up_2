import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { OrderValues, StatusCode, SQLFunctionName, Column, ColumnId } from "../const";
import { getDataFromSQL, insertView } from "../utils/sql-utils";


const PlaceOrder = {
    views: 'views',
    totalViews: 'total_views',
    dateAdded: 'date_place_added'
}



class PlacesController {

    async getPlaceById(req: Request, res: Response) {
        try {
            const {id, user_id = '1'} = req.params
                const places = await sequelize.query(
                    `
                    SELECT
                        place_id, place_name, place_name_en, place_city, place_city_en, place_date_founded, date_place_added, place_description, place_promo_picture,   
                        countries.country_id, country_name, country_name_en,
                        users.user_id, user_nik,
                        get_resources('place_id', :id) AS resources,
                        get_pictures('place_id', :id) AS pictures,

                        get_views_count('place_id', :id, 7) AS views,
                        get_views_count('place_id', :id, 1000000) AS total_views
                    FROM places
                    LEFT JOIN countries USING(country_id)
                    LEFT JOIN users ON user_id = user_added_id
                    WHERE place_id = :id
                    GROUP BY  place_id, countries.country_id, users.user_id
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

        
                return res.status(StatusCode.Ok).json({place: places[0]})
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get place by id'})
        }
    }


    async getPlacesByQuery(req: Request, res: Response) {
        try {
            const {country_id = null, city = null, order = 'views', limit = null, offset = null, direction = 'DESC'} = req.query;

            const where = `
                WHERE country_id = ${country_id ? ':country_id' : 'country_id'}
                AND ( LOWER(place_city)  = LOWER(${city ? ':city' : 'LOWER(place_city)'})  OR LOWER(place_city_en) = LOWER(${city ? ':city' : 'LOWER(place_city_en)'}) )
            `

            const result = await sequelize.query(
                `
                SELECT
                    place_id, place_name, place_name_en, place_city, place_city_en, place_promo_picture,
                    country_id, country_name, country_name_en,

                    get_views_count('place_id', place_id, 7) AS views,
                    get_views_count('place_id', place_id, 1000000) AS total_views

                FROM places
                LEFT JOIN countries USING (country_id)

                ${where}

                ORDER BY ${PlaceOrder[order as string] || PlaceOrder.views} 
                ${direction}

                LIMIT :limit
                OFFSET :offset
                ;

                SELECT COUNT (place_id)::int 
                FROM places

                ${where}
                ;
                `,
                {
                    replacements: {country_id, city, order, limit, offset},
                    type: 'SELECT'
                }
            )

            const data = getDataFromSQL(result, 'places')

            return res.status(StatusCode.Ok).json({data});
    
   
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error get shows by query'})
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



}


export const placesController = new PlacesController();