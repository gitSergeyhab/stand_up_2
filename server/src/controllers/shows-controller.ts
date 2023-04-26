import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { Column, ColumnId, OrderValues, SQLFunctionName, StatusCode } from "../const";
import { checkTitles, getDataFromSQL, getDataFromSQLWithTitles, getTitlesQuery, insertView } from "../utils/sql-utils";


class ShowsController {
    async getShowById(req: Request, res: Response) {
        try {
            const {id, user_id = '1'} = req.params
                const shows = await sequelize.query(
                    `
                    SELECT
                        show_id, show_date, show_date_added, show_name, show_description, show_poster,
                        comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, comedian_avatar,
                        countries.country_id, country_name, country_name_en,
                        place_id, place_name, place_name_en,
                        language_id, language_name, language_name_en,
                        users.user_id AS user_show_added_id, user_nik AS user_show_added_nik,
                        get_pictures('show_id', :id) AS pictures,
                        get_views_count('show_id', :id, 7) AS views,
                        get_views_count('show_id', :id, 1000000) AS total_views,
                        get_videos_by_show(:id) AS videos,
                        COUNT (show_rating_id)::int AS number_of_rate, AVG (show_rate)::real AS avg_rate
                    FROM shows
                    LEFT JOIN comedians USING (comedian_id)
                    LEFT JOIN countries ON shows.country_id = countries.country_id
                    LEFT JOIN languages USING (language_id)
                    LEFT JOIN places USING (place_id)
                    LEFT JOIN users ON shows.user_added_id = user_id
                    LEFT JOIN show_ratings USING (show_id)
                    
                    WHERE show_id = :id
                    GROUP BY language_name, language_name_en, users.user_id, 
                    show_id, comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, comedian_avatar, countries.country_id, place_name, place_name_en
                    ;
                    `,
                    { 
                        replacements: {id},
                        type: 'SELECT'
                    }
                );

                if (!shows.length) {
                    return res.status(StatusCode.NotFoundError).json({message: `where is not show with ID: ${id}`})
                }

                await insertView(id, user_id, Column.Show)
        
                return res.status(StatusCode.Ok).json({show: shows[0]})
            
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get show by id'})
        }
    }


    async getShowsByQuery(req: Request, res: Response) {
        try {
            const {comedian_id = null, place_id = null, language_id = null, order = 'pop', direction = 'DESC', limit = null, offset = null } = req.query;

            const where = `
                WHERE language_id = ${language_id ? ':language_id' : 'language_id'} 
                AND place_id = ${place_id ? ':place_id' : 'place_id'} 
                AND comedian_id = ${comedian_id ? ':comedian_id' : 'comedian_id'} 
            `;

            const result = await sequelize.query(
                `
                SELECT
                    show_id, show_date, show_date_added AS date_added, show_name, show_poster,
                    comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en,
                    countries.country_id, country_name, country_name_en,
                    place_id, place_name, place_name_en,
                    language_id, language_name, language_name_en,

                    get_views_count('show_id', show_id, 7) AS views,
                    get_views_count('show_id', show_id, 1000000) AS total_views,
                    COUNT (show_rating_id) AS number_of_rate, AVG (show_rate)::real AS avg_rate
                FROM shows

                LEFT JOIN comedians USING (comedian_id)
                LEFT JOIN countries ON shows.country_id = countries.country_id
                LEFT JOIN languages USING (language_id)
                LEFT JOIN places USING (place_id)
                LEFT JOIN show_ratings USING (show_id)

                ${where}

                GROUP BY 
                language_name, language_name_en,
                show_id, 
                comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, 
                countries.country_id, 
                place_name, place_name_en

                ORDER BY ${OrderValues[order as string] || OrderValues.pop} ${direction}
                LIMIT :limit
                OFFSET :offset
                ;

                SELECT
                COUNT (show_id)::int
                FROM shows

                ${where}
                ;
                `,
                {
                    replacements: {comedian_id, place_id, language_id, order, limit, offset},
                    type: 'SELECT'
                }
            )

            
            const data = getDataFromSQL(result, 'shows')


            return res.status(200).json({data});
    
   
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error get shows by query'})
        }
    }

    async getVotesByShowId(req: Request, res: Response) {

        try {
            const {id} = req.params;
            const {limit = null, offset = null, rate} = req.query;

            const where = `WHERE show_id = :id AND show_rate = ${ rate ? ':rate' : 'show_rate'}`

            const result = await sequelize.query(`
            SELECT
            user_id, user_nik, user_avatar, show_rate, show_date_rate
            FROM users
            JOIN show_ratings USING (user_id)
            ${where}
            ORDER BY show_date_rate DESC
            LIMIT :limit
            OFFSET :offset
            ;

            SELECT COUNT (show_rate)::int
            FROM show_ratings
            ${where} 
            ;
            `,
            {
                replacements: {limit, offset, rate, id},
                type: 'SELECT'
            }
            );

            const data = getDataFromSQL(result, 'shows')

            return res.status(StatusCode.Ok).json(data);

        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get shows by query'})
        }

    }
    // async searchShowsByNames(req: Request, res: Response) {
    //     try {
    //         const {search, limit = null, offset = null} = req.query;


    //         const shows = await sequelize.query(
    //             `
    //             SELECT
    //             show_id, show_date, show_name, average_show_rating, number_show_rating, show_poster,
    //             comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en,
    //             country_id, country_name, country_name_en,
    //             place_id, place_name, place_name_en,
    //             language_id
    //             FROM shows
    //             LEFT JOIN comedians ON comedian_id = fk_comedian_id
    //             LEFT JOIN countries ON shows.fk_country_id = country_id
    //             LEFT JOIN languages ON shows.fk_language_id = language_id
    //             LEFT JOIN places ON shows.fk_place_id = place_id
    //             WHERE comedian_first_name ILIKE :search 
    //                 OR comedian_last_name ILIKE :search  
    //                 OR comedian_first_name_en ILIKE :search  
    //                 OR comedian_last_name_en ILIKE :search
    //                 OR comedian_last_name ILIKE :search  
    //                 OR show_name ILIKE :search
    //                 ORDER BY number_show_rating
    //                 LIMIT :limit
    //                 OFFSET :offset
    //             ;
    //             `,
    //             {
    //                 replacements: {search: `%${search}%`, limit, offset},
    //                 type: 'SELECT'
    //             }
    //         )

    //         return res.status(200).json({shows});
    
   
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(500).json({message: 'error search shows'})
    //     }
    // }

    async getShowsByColumnId(req: Request, res: Response) {
        try {
            const {type, id} = req.params;
            const {year = null, limit = null, offset = null} = req.query;
            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const where = `
                WHERE ${columnId} = :id
                ${year ? 'AND EXTRACT( YEAR FROM show_date_added) = :year' : '' }  
            `;

            const countQuery = `SELECT COUNT(show_id) FROM shows ${where};`;

            

            const result = await sequelize.query(
                `
                SELECT
                show_id, show_name, show_date_added, show_poster,
                comedian_id, 
                get_one_name_of_two(comedian_first_name, comedian_last_name) AS comedian_name,
                get_one_name_of_two(comedian_first_name_en, comedian_last_name_en) AS comedian_name_en,
                AVG(show_rate)::real AS avg_rate, COUNT (show_id) AS number_of_rate

                FROM shows
                LEFT JOIN comedians USING (comedian_id)
                LEFT JOIN show_ratings USING (show_id)

                ${where}

                GROUP BY show_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en
                ORDER BY number_of_rate DESC
                LIMIT :limit
                OFFSET :offset
                ;
                ${getTitlesQuery(type)}
                ${countQuery}
                ;`,
                {
                    replacements: { id, year, limit, offset },
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


export const showsController = new ShowsController();