import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import {  Column, ColumnId, DefaultQueryParams, ImageType, SQLFunctionName, StatusCode, TableName } from "../const/const";
import { getDataFromSQL, getDataInsertQueryStr, insertView, separateGraphTitles, separateListCount } from "../utils/sql-utils";
import { getDataFromSQLWithTitles } from "../utils/sql-utils";
import { ImageFile, SimpleDict } from "../types";
import { imageService } from "../service/image-service";
import { ApiError } from "../custom-errors/api-error";
import { getDefaultFromToYears } from "../utils/date-utils";
import { getBetweenYearsWhereStr } from "../utils/sql-where-utils";

const {Limit, Offset, EventStatusAll} = DefaultQueryParams;

export const ComedianOrder = {
    dateAdded: 'comedian_date_added',
    dateWas: 'show_date',
    rate: 'avg_rate',
    pop: 'number_of_rate',
    views: 'views',
    totalViews: 'total_views'
}



class ComedianController {
    async getComedians(req: Request, res: Response) {
        console.log('_________===================__________________________')
        try {
            const {yearFrom, yearTo} = getDefaultFromToYears()

            const {
                country_id, city, year_from=yearFrom, year_to=yearTo,
                limit = null, offset = null, order='pop', direction=null
            } = req.query;

            console.log({year_from, year_to})
//!!goodwhere
            // const where = `
            //     WHERE (country_id ${country_id ? ' = :country_id' : ' = country_id OR 1 = 1'})
            //     AND ${ city ?  '(LOWER(comedian_city) = LOWER(:city)) OR (LOWER(comedian_city_en) = LOWER(:city))' : '1 = 1'}
            //     AND ${getBetweenYearsWhereStr('comedian_date_birth')}
            // `;

            const where = `
                WHERE (country_id ${country_id ? ' = :country_id' : ' = country_id OR 1 = 1'})
                ${ city ?  'AND (LOWER(comedian_city) = LOWER(:city)) OR (LOWER(comedian_city_en) = LOWER(:city))' : ''}
                ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('comedian_date_birth')}` : '' }
            `;

    // NO RATE !!!
                const result = await sequelize.query(
                    `
                    SELECT 
                        comedian_id, comedian_nik,
                        destination || filename AS main_picture,
                        country_id, country_name, comedian_city,
                        AVG(comedian_rate)::real AS avg_rate, COUNT (comedian_id) AS number_of_rate,
                        get_views_count('comedian_id', comedian_id, 7) AS views,
                        get_views_count('comedian_id', comedian_id, 1000000) AS total_views
                    FROM comedians

                    LEFT JOIN countries USING(country_id)
                    LEFT JOIN comedian_ratings USING(comedian_id)
                    LEFT JOIN main_pictures ON comedian_main_picture_id = main_picture_id
                    
                    ${where}

                    GROUP BY comedian_id, country_id, country_name, country_name_en, destination, filename

                    ORDER BY ${ComedianOrder[order as string] || ComedianOrder.pop} ${direction === 'asc' ? 'ASC' : 'DESC'}

                    LIMIT :limit
                    OFFSET :offset
                    ;

                    SELECT COUNT(comedian_id) FROM comedians
                    ${where}
                    ;
                    `,
                    { 
                        replacements: {offset, limit, country_id, city, year_from, year_to},
                        type: 'SELECT'
                    }
                );

                const data = getDataFromSQL(result)
                console.log({data})
        
                return res.status(200).json({...data})
                

        } catch(e) {
            console.log(e)
            return res.status(500).json({message: 'error get comedians'})
        }
    }
    // async getComedians(req: Request, res: Response) {
    //     try {

    //         const {country_id, city, limit = null, offset = null, order='pop', direction=null} = req.query;

    //         const where = `
    //             WHERE country_id = ${country_id ? ':country_id' : 'country_id'}
    //             AND (LOWER(comedian_city) = ${city ? 'LOWER(:city)' : 'LOWER(comedian_city)'} OR LOWER(comedian_city_en) = ${city ? 'LOWER(:city)' : 'LOWER(comedian_city_en)'})
    //         `
    
    //             const result = await sequelize.query(
    //                 `
    //                 SELECT 
    //                     comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, comedian_date_added, comedian_city, comedian_avatar,
    //                     comedian_first_name  || ' ' || comedian_last_name AS first_title, comedian_first_name_en  || ' ' || comedian_last_name_en AS second_title, 
    //                     country_id, country_name, country_name_en,
    //                     AVG(comedian_rate)::real AS avg_rate, COUNT (comedian_id) AS number_of_rate,
    //                     get_views_count('comedian_id', comedian_id, 7) AS views,
    //                     get_views_count('comedian_id', comedian_id, 1000000) AS total_views
    //                 FROM comedians

    //                 LEFT JOIN countries USING(country_id)
    //                 LEFT JOIN comedian_ratings USING(comedian_id)
                    
    //                 ${where}

    //                 GROUP BY comedian_id, country_id, country_name, country_name_en

    //                 ORDER BY ${ComedianOrder[order as string] || ComedianOrder.pop} ${direction === 'asc' ? 'ASC' : 'DESC'}

    //                 LIMIT :limit
    //                 OFFSET :offset
    //                 ;

    //                 SELECT COUNT(comedian_id)::int FROM comedians
    //                 ${where}
    //                 ;
    //                 `,
    //                 { 
    //                     replacements: {offset, limit, country_id, city},
    //                     type: 'SELECT'
    //                 }
    //             );

    //             const data = getDataFromSQL(result, 'comedians')
        
    //             return res.status(200).json({...data})
                

    //     } catch(e) {
    //         console.log(e)
    //         return res.status(500).json({message: 'error get comedians'})
    //     }
    // }


    async getComedianById(req: Request, res: Response) {
        try {
            const {id, user_id = '1'} = req.params;

            if (!id) {
                return res.status(400).json({message: 'there is not comedian_id'})
            }

            const comedians = await sequelize.query(
                `
                SELECT 
                    comedian_id,
                    comedian_nik,
                    comedian_first_name,
                    comedian_last_name,
                    comedian_first_name_en,
                    comedian_last_name_en,
                    comedian_city,
                    comedian_city_en,
                    destination || filename AS main_picture,
                    comedian_date_birth,
                    comedian_date_death,
                    comedian_date_added,
                    comedian_description,
                    countries.country_id, country_name, country_name_en,
                    users.user_id, user_nik,
                    get_resources('comedian_id', :id) AS resources,
                    AVG (comedian_rate)::real as avg_rate, COUNT(comedian_rate) as number_of_rate,
                    get_images('comedian_id', :id) AS pictures,

                    get_views_count('comedian_id', :id, 7) AS views,
                    get_views_count('comedian_id', :id, 1000000) AS total_views

                FROM comedians
                LEFT JOIN countries USING (country_id)
                LEFT JOIN users ON users.user_id = comedians.user_added_id
                LEFT JOIN comedian_ratings USING (comedian_id)
                LEFT JOIN main_pictures ON comedian_main_picture_id = main_picture_id
                
                WHERE comedian_id = :id
                GROUP BY comedian_id, countries.country_id, users.user_id, destination, filename;
                `,
                {
                    replacements: {id},
                    type: 'SELECT'
                }
            );

            if (!comedians.length) {
                return res.status(StatusCode.NotFoundError).json({message: `there is not comedian with id = ${id}`})
            }

            await insertView(id, user_id, Column.Comedian); // Добавляет 1 просмотр

            // console.log(comedians)


            console.log(comedians[0], 'comedians[0]')
            return res.status(200).json(comedians[0]);
    
   
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'error get comedian by id'})
        }
    }
    async searchComedianByNames(req: Request, res: Response) {
        try {
            const {search} = req.query;


            const comedians = await sequelize.query(
                `SELECT 
                    comedian_id, comedian_first_name, comedian_last_name, 
                    country_id, country_name, country_name_en,
                AVG(comedian_rate)::real AS avg_rate 
                FROM comedians
                LEFT JOIN countries USING(country_id)
                LEFT JOIN comedian_ratings USING(comedian_id)
                WHERE comedian_first_name ILIKE :search 
                    OR comedian_last_name ILIKE :search  
                    OR comedian_first_name_en ILIKE :search  
                    OR comedian_last_name_en ILIKE :search
                GROUP BY comedian_id, country_id, country_name, country_name_en
                ;
                `,
                {
                    replacements: {search: `%${search}%`},
                    type: 'SELECT'
                }
            )

            return res.status(StatusCode.Ok).json({comedians});
    
   
        } catch {
            return res.status(500).json({message: 'error search comedian'})
        }
    }

    async getVotesByComedianId(req: Request, res: Response) {

        try {
            const {id} = req.params;
            const {limit = null, offset = null, rate} = req.query;

            const where = `WHERE comedian_id = :id AND comedian_rate = ${ rate ? ':rate' : 'comedian_rate'}`

            const result = await sequelize.query(`
            SELECT
            user_id, user_nik, user_avatar, comedian_rate, comedian_date_rate
            FROM users
            JOIN comedian_ratings USING (user_id)
            ${where}
            ORDER BY comedian_date_rate DESC
            LIMIT :limit
            OFFSET :offset
            ;

            SELECT COUNT (comedian_rate) 
            FROM comedian_ratings
            ${where} 
            ;
            `,
            {
                replacements: {limit, offset, rate, id},
                type: 'SELECT'
            }
            );

            const data = getDataFromSQL(result)
            return res.status(StatusCode.Ok).json(data);

        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error getVotesByComedianId'})
        }

    }

    // async getEventsByComedianId(req: Request, res: Response) {
    //     try {
    //         const {id} = req.params;
    //         const {year = null, status = 'planned'} = req.query;

    //         const where = `
    //             WHERE comedian_id = :id
    //             ${year ? 'AND EXTRACT( YEAR FROM event_date) = :year' : '' }  
    //             AND event_status = :status 
    //         `;

    //         const data = await sequelize.query(
    //             `
    //             SELECT
    //             event_id, event_name, event_name_en, event_date, event_status, event_promo_picture, place_id, place_name, 
    //             comedian_first_name, comedian_first_name_en, comedian_last_name, comedian_last_name_en

    //             FROM events
    //             LEFT JOIN comedians_events USING (event_id)
    //             LEFT JOIN comedians USING (comedian_id)
    //             LEFT JOIN places USING (place_id)

    //             ${where}

    //             ORDER BY ABS(EXTRACT( DAY FROM (NOW() - event_date))) ASC
    //             ;
    //             `,
    //             {
    //                 replacements: { id, year, status },
    //                 type: 'SELECT'
    //             }
    //         )

    //         // if (!data.length) {
    //         //     return res.status(StatusCode.NotFoundError).json({message: `there is not comedian with id = ${id}`})
    //         // }
            
    //         // const data = getDataFromSQL(result, 'events')


    //         return res.status(200).json(data);
    
   
    //     } catch(err) {
    //         console.log(err)
    //         return res.status(500).json({message: 'error getEventsByComedianId'})
    //     }
    // }

    async getShowsByComedianId(req: Request, res: Response) {
        try {

            const {yearFrom, yearTo} = getDefaultFromToYears()

            const { id } = req.params;
            const { year_from=yearFrom, year_to=yearTo, limit = Limit, offset = Offset } = req.query;
console.log(req.query.year_from, req.query.year_to, 'req.query.year_from || req.query.year_to')
            const where = `
                WHERE comedians.comedian_id = :id
                ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('show_date')}` : '' }
            `;

            

            const result = await sequelize.query(
                `
				SELECT 
				show_id, show_name, show_date,
                destination || filename AS main_picture,
                comedians.comedian_id, comedians.comedian_nik,
				count (DISTINCT  view_id) AS views_count,
				count (DISTINCT  show_rating_id) AS rate_count,
				AVG(show_rate) AS avg_show_rate

				FROM shows
				LEFT JOIN comedians USING (comedian_id)
                LEFT JOIN main_pictures ON show_main_picture_id = main_picture_id
				LEFT JOIN views USING (show_id)
				LEFT JOIN show_ratings USING (show_id)

                ${where}

                GROUP BY show_id, destination, filename, comedians.comedian_id;

                ;
                SELECT comedian_nik, comedian_nik_en
                FROM comedians
                WHERE comedian_id = :id
                ;

                SELECT COUNT (show_id) 
                FROM shows
                LEFT JOIN comedians USING (comedian_id)
                ${where}
                ;
                `,
                {
                    replacements: { id, year_from, year_to, limit, offset },
                    type: 'SELECT'
                }
            )

            const data = getDataFromSQLWithTitles(result)
            return res.status(200).json(data);
    
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error getShowsByComedianId'})
        }
    }

    // async getEventsByComedianId(req: Request, res: Response) {
    //     try {
    //         const {yearFrom, yearTo} = getDefaultFromToYears()
    //         const { id } = req.params;
    //         const { year_from=yearFrom, year_to=yearTo, status = EventStatusAll, limit = Limit, offset = Offset } = req.query;
    //         console.log(req.query, '________')

            


    //         const where = `
    //             WHERE comedians.comedian_id = :id
    //             ${status && status !== EventStatusAll ? 'AND event_status = :status' : '' }  
    //             ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('comedian_date_birth')}` : '' }
    //         `;

    //         const result = await sequelize.query(
    //             `
	// 			SELECT 
	// 			event_id, event_name, event_name_en, event_date, event_status,
    //             places.place_id, place_name,
    //             destination || filename AS main_picture,
	// 			count (DISTINCT view_id) AS views_count
	
	// 			FROM events
    //             LEFT JOIN main_pictures ON event_main_picture_id = main_picture_id
	// 			LEFT JOIN views USING (event_id)
    //             LEFT JOIN comedians_events USING(event_id)
	// 			LEFT JOIN comedians ON comedians.comedian_id = comedians_events.comedian_id
    //             LEFT JOIN places ON events.place_id = places.place_id
    //             ${where}
    //             GROUP BY event_id, destination, filename, places.place_id
    //             LIMIT :limit
    //             OFFSET :offset
    //             ;

    //             SELECT comedian_nik, comedian_nik_en
    //             FROM comedians
    //             WHERE comedian_id = :id
    //             ;

    //             SELECT COUNT (event_id) 
    //             FROM events
    //             LEFT JOIN comedians_events USING(event_id)
	// 			LEFT JOIN comedians ON comedians.comedian_id = comedians_events.comedian_id
    //             ${where}
    //             ;
    //             `,
    //             {
    //                 replacements: { id, limit, offset, status, year_from, year_to },
    //                 type: 'SELECT'
    //             }
    //         )
    //         console.log({result}, 'result___________________________')

    //         const data = getDataFromSQLWithTitles(result)
    //         return res.status(200).json(data);
    
    //     } catch(err) {
    //         console.log(err)
    //         return res.status(StatusCode.ServerError).json({message: 'error getShowsByComedianId'})
    //     }
    // }

    async getComediansByColumnId(req: Request, res: Response) {
        try {
            const {type, id} = req.params;
            const {country_id = null, city = null, limit = null, offset = null} = req.query;
            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const where = `
                WHERE ${columnId} = :id
                AND country_id = ${country_id ? ':country_id' : 'country_id'}
                AND (LOWER(comedian_city) = ${city ? 'LOWER(:city)' : 'LOWER(comedian_city)'} OR LOWER(comedian_city_en) = ${city ? 'LOWER(:city)' : 'LOWER(comedian_city_en)'})
            `;

            const result = await sequelize.query(
                `
                SELECT
                comedian_id, comedian_avatar,
                get_one_name_of_two(comedian_first_name, comedian_last_name) AS comedian_name,
                get_one_name_of_two(comedian_first_name_en, comedian_last_name_en) AS comedian_name_en,
                country_id, country_name, comedian_city,
                AVG(show_rate)::real AS avg_rate, COUNT (show_id) AS number_of_rate

                FROM comedians
                LEFT JOIN countries USING (country_id)


                ${where}

                GROUP BY comedian_id
                ORDER BY number_of_rate DESC
                LIMIT :limit
                OFFSET :offset
                ;

                SELECT COUNT(event_id) 
                FROM events
                LEFT JOIN comedians_events USING (event_id)
                LEFT JOIN comedians USING (comedian_id)
                ${where}
                ;`,
                {
                    replacements: { id, country_id, city, limit, offset },
                    type: 'SELECT'
                }
            )
            
            const data = getDataFromSQL(result)


            return res.status(200).json(data);
    
   
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error getShowsByColumnId'})
        }
    }

    async addComedian (req: Request, res: Response ) {
        try {
            const {body} = req;
            const dir = req.query.dir as string;
            console.log({dir, body})
            const file = req.file as ImageFile;
            const comedian_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {
                user_added_id = '1', country_id, 
                comedian_nik, comedian_nik_en, comedian_first_name, comedian_second_name, comedian_last_name, comedian_first_name_en, comedian_second_name_en, comedian_last_name_en,
                comedian_city, comedian_city_en, comedian_description,
                comedian_date_birth, comedian_date_death
            } = body as SimpleDict;
            const fields = [
                {user_added_id}, {country_id}, 
                {comedian_nik}, {comedian_nik_en}, {comedian_first_name}, {comedian_second_name}, {comedian_last_name}, {comedian_first_name_en}, {comedian_second_name_en}, {comedian_last_name_en},
                {comedian_city}, {comedian_city_en}, {comedian_description},
                {comedian_date_birth}, {comedian_date_death}

            ] as SimpleDict[];
            const allFields = [...fields, {comedian_main_picture_id}]

            const sqlQuery = getDataInsertQueryStr(allFields, dir)

            
            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! 
                replacements: {...body, comedian_main_picture_id, user_added_id: '1'}, 
                type: "INSERT"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getShowsRatingsByComedianId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { limit = Limit, offset=Offset, digit='0' } = req.query;
            console.log(req.query, 'req-query____________________________________')

            const where = `WHERE shows.show_id IN (
                SELECT show_id
                FROM shows
                WHERE comedian_id = :id
            )
            ${digit !=='0' ? ` AND show_rate = ${digit}`: ''}
            `


            const result = await sequelize.query(
                `
                SELECT 
                    users.user_id, users.user_nik,
                    shows.show_id, shows.show_name, 
                    show_ratings.show_rating_id, show_rate, show_ratings.show_date_rate,
                    get_views_count('show_id', shows.show_id, 7) AS weekly_views,
                    get_views_count('show_id', shows.show_id, 1000000) AS total_views,
                    get_avg_show_rate(shows.show_id)::real AS avg_show_rate,
                    avatars.destination || avatars.filename AS user_avatar,
                    main_pictures.destination || main_pictures.filename AS show_picture
                FROM show_ratings
                LEFT JOIN users ON show_ratings.user_id = users.user_id
                LEFT JOIN shows ON show_ratings.show_id = shows.show_id
                LEFT JOIN avatars ON avatars.avatar_id = users.user_avatar_id
                LEFT JOIN main_pictures ON main_picture_id = shows.show_main_picture_id
                ${where}
                ORDER BY show_date_rate DESC
                LIMIT :limit
                OFFSET :offset
                ;
                SELECT count(show_rating_id)
                FROM show_ratings
                LEFT JOIN shows ON show_ratings.show_id = shows.show_id
                ${where}
                `,
                {
                    replacements: { id, limit, offset }, 
                    type: 'SELECT'
                }
            );

            const data = separateListCount(result)

            console.log({data})
            
            return res.status(StatusCode.Ok).json(data)

        } catch (err) {
            return res.status(StatusCode.Ok).json({message: 'Error getRatings'})
        }
    }
    async getShowsRatingDataByComedianId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const where = `WHERE shows.show_id IN (
                SELECT show_id
                FROM shows
                WHERE comedian_id = :id
            )`


            const result = await sequelize.query(
                `
                SELECT
                    show_rate AS rate,
                    COUNT (show_rating_id)
                FROM show_ratings
                LEFT JOIN shows USING(show_id)
                WHERE comedian_id = :id
                GROUP BY show_rate
                ORDER BY rate DESC
                ;
                SELECT 
                    comedian_nik AS native,
                    comedian_nik_en AS en
                FROM comedians
                WHERE comedian_id = :id
                    ;
                `,
                {
                    replacements: { id }, 
                    type: 'SELECT'
                }
            );

            const data = separateGraphTitles(result)
            
            return res.status(StatusCode.Ok).json(data)

        } catch (err) {
            return res.status(StatusCode.Ok).json({message: 'Error getRatings'})
        }
    }

}


export const comedianController = new ComedianController();