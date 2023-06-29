import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { Column, ColumnId, DefaultQueryParams, ImageType, OrderValues, SortDirection, SortType, StatusCode } from "../const/const";
import { convertFormDataToDate, getDataFromSQL, getDataInsertQueryStr, getDataUpdateQueryStr, getTitles, insertView } from "../utils/sql-utils";
import { imageService } from "../service/image-service";
import { ImageFile, SimpleDict, UserPseudoType, UserRequest } from "../types";
import { ApiError } from "../custom-errors/api-error";
import { getDefaultFromToYears } from "../utils/date-utils";
import { getBetweenYearsWhereStr } from '../utils/sql-where-utils'
import { getDataFromSQLWithTitles } from "../utils/sql-utils";
import { getNullObj, getValueOrNull } from "../utils/utils";
import { contentService } from "../service/content-service";


const SortTypeName = {
    [SortType.Added]: 'show_date_added', //=
    [SortType.New]: 'show_date_sort', //=
    [SortType.Name]: 'show_name', //=
    [SortType.WeeklyViews]: 'weekly_views', //=
    [SortType.TotalViews]: 'total_views',//=
    [SortType.Rate]: 'avg_rate', //=
    [SortType.RateCount]: 'number_of_rate', //=
  }

const {Limit, Offset, EventStatusAll} = DefaultQueryParams;

class ShowsController {
    async getShowById(req: UserRequest, res: Response) {
        console.log('______________getShowById______________')
        try {
            const {id} = req.params;
            const user_id = req.user?.user_id || '0';
            const shows = await sequelize.query(
                `
                SELECT 
                    show_id, show_name, show_name_en, show_date, 
                    show_description, 
                    show_date_added,
                    events.event_id, event_name, event_name_en,
                    comedians.comedian_id, comedian_nik, comedian_nik_en,
                    places.place_id, place_name, place_name_en,
                    languages.language_id, language_name, language_name_en,
                    countries.country_id, country_name, country_name_en,
                    users.user_id, user_nik,
                    get_views_count('show_id', :id, 7) AS weekly_views,
                    get_views_count('show_id', :id, 1000000) AS total_views,
                    get_videos_by_show(:id) AS videos,
                    get_main_pictures(show_main_picture_id) AS show_picture,
                    get_main_pictures(place_main_picture_id) AS place_picture,
                    get_main_pictures(event_main_picture_id) AS event_picture,
                    get_main_pictures(comedian_main_picture_id) AS comedian_picture,
                    COUNT (show_rating_id)::int AS number_of_rate, 
                    AVG (show_rate)::real AS avg_rate,
                    get_reviews_by_type_id_user('show_id', :id, :user_id) AS user_reviews,
                    get_user_show_rating(:id, :user_id) AS user_rating

                FROM shows
                LEFT JOIN events ON events.event_id = shows.event_id
                LEFT JOIN comedians ON comedians.comedian_id = shows.comedian_id
                LEFT JOIN places ON places.place_id = shows.place_id
                LEFT JOIN languages ON languages.language_id = shows.language_id
                LEFT JOIN countries ON places.country_id = countries.country_id
                LEFT JOIN users ON shows.user_added_id = user_id
                LEFT JOIN show_ratings USING (show_id)

                WHERE shows.show_id = :id

                GROUP BY 
                    shows.show_id, 
                    events.event_id, 
                    comedians.comedian_id, 
                    places.place_id, 
                    languages.language_id, 
                    countries.country_id, 
                    users.user_id
                ;
                `,
                { 
                    replacements: {id, user_id},
                    type: 'SELECT'
                }
            );
            console.log('______________getShowById______________2', {shows}, {user_id}, '___!!!')
            if (!shows.length) {
                return res.status(StatusCode.NotFoundError).json({message: `where is not show with ID: ${id}`})
            }

            await insertView(id, user_id, Column.Show)
            console.log({shows}, '_________________show_______________')
    
            return res.status(StatusCode.Ok).json(shows[0])
            
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
                    show_id, show_date, show_date_added AS date_added, show_name, 
                    destination || filename AS main_picture,
                    comedian_id, comedian_nik, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en,
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
                LEFT JOIN main_pictures ON shows_main_pictures_id = main_pictures_id

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

            
            const data = getDataFromSQL(result)


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

            const data = getDataFromSQL(result)

            return res.status(StatusCode.Ok).json(data);

        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get shows by query'})
        }

    }

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
                show_id, show_name, show_date_added, destination || filename AS main_picture,
                comedian_id, comedian_nik,
                AVG(show_rate)::real AS avg_rate, COUNT (show_id) AS number_of_rate

                FROM shows
                LEFT JOIN comedians USING (comedian_id)
                LEFT JOIN show_ratings USING (show_id)
                LEFT JOIN main_pictures ON show_main_picture_id = main_picture_id

                ${where}

                GROUP BY show_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, destination, filename, comedian_nik
                ORDER BY number_of_rate DESC
                LIMIT :limit
                OFFSET :offset
                ;
                ${countQuery}
                ;`,
                {
                    replacements: { id, year, limit, offset },
                    type: 'SELECT'
                }
            )
            
            const data = getDataFromSQL(result);
            return res.status(200).json({...data})
            // return checkTitles(data, res);

   
        } catch(err) {
            console.log(err)
            // return res.status(500).json({message: 'error getShowsByColumnId'})
        }
    }
    async addShow(req: Request, res: Response ) {

        try {
            const {body} = req;
            const dir = req.query.dir as string;
            console.log({dir, body})
            const file = req.file as ImageFile;
            const show_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {user_added_id = '1', event_id, comedian_id, place_id, language_id, show_date, show_name, show_name_en, show_description} = body as SimpleDict;
            const fields = [{show_name}, {show_name_en},{user_added_id}, {event_id}, {comedian_id}, {place_id}, {language_id}, {show_date}, {show_description}] as SimpleDict[];
            const allFields = [...fields, {show_main_picture_id}]

            const sqlQuery = getDataInsertQueryStr(allFields, dir)

            
            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! 
                replacements: {...body, show_main_picture_id: show_main_picture_id, user_added_id: '1'}, 
                type: "INSERT"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        }
    }

    async changeShow (req: Request, res: Response ) {
        try {
            const {body} = req;
            const {id} = req.params
            const dir = req.query.dir as string;
            console.log({dir, body})
            const file = req.file as ImageFile;
            const show_main_picture_id = await imageService.createImage({file, type: ImageType.main_pictures, dir}) as string;
            // HARDCODE user_added_id = 1 !!!   
            const {
                user_added_id = '1', event_id, comedian_id, place_id, language_id, 
                show_date, show_name, show_name_en, show_description,
                isPicChanged
            } = body as SimpleDict;
            const fields = [
                {user_added_id}, {event_id}, {comedian_id}, {place_id}, {language_id}, 
                {show_date}, {show_name}, {show_name_en}, {show_description},
            ] as SimpleDict[];

        
            const pictureIdValue = getValueOrNull(show_main_picture_id);
            const allFields = [...fields, isPicChanged ? {show_main_picture_id} : null].filter((item) => item);
            const sqlQuery = getDataUpdateQueryStr(allFields, dir)
            const result = await sequelize.query(sqlQuery, {
                // HARDCODE user_added_id = 1 !!! 
                replacements: getNullObj({...body, show_main_picture_id: pictureIdValue, user_added_id: '1', id}),
                type: "UPDATE"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getShows(req: UserRequest, res: Response) {
        try {
            const { yearFrom, yearTo } = getDefaultFromToYears()
            const { type, id } = req.params;
            const user_id = req.user?.user_id || '0';
            const { 
                year_from=yearFrom, year_to=yearTo, limit=Limit, offset=Offset, language_id,
                direction, sort_type
            } = req.query;
            console.log(req.query, 'req.query')

            const sqlDirection = direction === SortDirection.ASC ? direction : SortDirection.DESC;
            const sqlType = SortTypeName[sort_type as string] || SortTypeName[SortType.WeeklyViews];

            const columnId = ColumnId[type];
            const titlesSqlQuery = getTitles(type);
            console.log({titlesSqlQuery}, '+ ================= +')

            const where = `
                WHERE (language_id ${(language_id && language_id !== '-1') ? ' = :language_id' : ' = language_id OR 1 = 1'})
                ${columnId ? `AND shows.${columnId} = :id`: '' } 
                ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('show_date')}` : '' }
            `;



        const countQuery = `SELECT COUNT(show_id) FROM shows ${where};`;

            const result = await sequelize.query(
                `
                SELECT
                    shows.show_id, 
                    show_name, 
                    show_date,
                    COALESCE(show_date, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS show_date_sort, 
                    show_date_added,
                    destination || filename AS main_picture,
                    comedians.comedian_id, 
                    comedian_nik,
                    count (DISTINCT  show_rating_id) AS number_of_rate,
                    COALESCE(AVG(show_rate)::real, 0)  AS avg_rate,
                    get_reviews_by_type_id_user('show_id', shows.show_id, :user_id) AS user_reviews,
                    get_user_show_rating(shows.show_id, :user_id) AS user_rating,
                    get_views_count('show_id', shows.show_id, 7) AS weekly_views,
                    get_views_count('show_id', shows.show_id, 1000000) AS total_views
                FROM shows
                LEFT JOIN comedians ON comedians.comedian_id = shows.comedian_id
                LEFT JOIN show_ratings ON show_ratings.show_id = shows.show_id
                LEFT JOIN main_pictures ON show_main_picture_id = main_picture_id
				LEFT JOIN views ON views.show_id = shows.show_id


                ${where}

                GROUP BY 
                    shows.show_id, 
                    comedians.comedian_id, 
                    comedian_first_name, 
                    comedian_last_name, 
                    comedian_first_name_en, 
                    comedian_last_name_en, 
                    destination, 
                    filename, 
                    comedian_nik
                ORDER BY ${sqlType} ${sqlDirection} 
                LIMIT :limit
                OFFSET :offset
                ;
                ${titlesSqlQuery}
                ${countQuery}
                ;`,
                {
                    replacements: { id, limit, offset, year_from, year_to, language_id, user_id },
                    type: 'SELECT'
                }

            )
            console.log({result}, 'result___________________________', 'getShows +++')

            const data = type ? getDataFromSQLWithTitles(result) : getDataFromSQL(result)
            return res.status(200).json(data);
    
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error getShows'})
        }
    }

    async rateShow(req: Request & {user: UserPseudoType}, res: Response) {
        try {
            console.log('________rateShow___________')
            const {user_id} = req.user;
            const {showId, rate, random} = req.body;
            console.log({showId, rate},{user_id} )

            console.log({random}, '!_________________!')

            if (!user_id) {
                throw ApiError.UnauthorizedError()
            }

            await contentService.deleteShowRate(user_id, showId);
            await contentService.addShowRate(user_id, showId, rate);

            return res.status(StatusCode.Added).json({showId, rate})
            

        } catch (err) {
            console.log({err})
            throw ApiError.BadRequest('wrong request')
        }
    }

}


export const showsController = new ShowsController();


