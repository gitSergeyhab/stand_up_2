import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { StatusCode, Column, DefaultQueryParams, ImageType, ImageDir } from "../const/const";
import { getDataFromSQL,  getDataInsertQuery,  getDataUpdateQuery,  insertView } from "../utils/sql-utils";

import { sqlQueryCardService } from "../service/query-card-service";
import { imageService } from "../service/image-service";
import { ImageFile, SimpleDict, UserRequest } from "../types";
import { ApiError } from "../custom-errors/api-error";
import { getNullObj, getValueOrNull } from "../utils/utils";


const {Limit, Offset} = DefaultQueryParams;

const enum DateFilter {
    All = 'all',
    Week = 'week',
    Month = 'month',
    Year = 'year',
    New = 'new'
}

const getWhereCase = (days: number) => `WHERE date_added >= now() - INTERVAL '${days} DAYS'`;

const getWhere = (filter: DateFilter) => {
    switch (filter) {
        case DateFilter.Week: return getWhereCase(7);
        case DateFilter.Month: return getWhereCase(30);
        case DateFilter.Year: return getWhereCase(366);
        default: return '';
    }
}

const getOrder = (filter: DateFilter) => {
    switch (filter) {
        case DateFilter.New: return 'ORDER BY news_id DESC';
        default: return 'ORDER BY total_views DESC';
    }
}

class NewsController {

    async getNewsById(req: Request, res: Response) {
        
        try {
            const {id, user_id='1'} = req.params
            console.log('getNewsById', {id})
            const newsQuery = sqlQueryCardService.getNews();
            const where = 'WHERE news_id = :id'
                const news = await sequelize.query(
                    `
                    ${newsQuery}
                    ${where}
                    ;
                    `,
                    { 
                        replacements: {id},
                        type: 'SELECT'
                    }
                );
                if (!news.length) {
                    return res.status(StatusCode.NotFoundError)
                        .json({message: `not found place with ID: ${id}`});
                }

                await insertView(id, user_id, Column.News);

        
                return res.status(StatusCode.Ok).json(news[0])
        } catch (err) {
            console.log({err});
            return res.status(StatusCode.ServerError).json({message: 'getNewsById'})
        }
    }


    async addNews (req: UserRequest, res: Response ) {
        try {
            // const user_id = req.user?.user_id || '0';
            const {body, user} = req;
            console.log({user}, '+++++++++   addNews   +++++++++')
            const user_added_id = user.user_id;
            const dir = req.query.dir as string;
            const file = req.file as ImageFile;
            console.log({dir, body})
        
            const { news_title, news_text } = body as SimpleDict;
            const fields = [ {user_added_id}, {news_title}, {news_text} ] as SimpleDict[];

            const news_main_picture_id = await imageService.createImage({
                file,  dir: ImageDir.News, table: ImageType.MainPictures, user_added_id
            }) as string;

            const allFields = [...fields, {news_main_picture_id}]
            const sqlQuery = getDataInsertQuery(allFields, 'news', 'news_id')
            const result = await sequelize.query(sqlQuery, {
                replacements: {...body, news_main_picture_id, user_added_id}, 
                type: "INSERT"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json(result)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async changeNews (req: UserRequest, res: Response ) {
        console.log('_________________        |     changePlace    |        ___________'      )
        try {
            const {body, user} = req;
            const user_added_id = user.user_id;
            const {id} = req.params
            const file = req.file as ImageFile;
            const news_main_picture_id = await imageService.createImage({
                file,  dir: ImageDir.News, table: ImageType.MainPictures, user_added_id
            }) as string;
            const { news_text, news_title, isPicChanged } = body as SimpleDict;
            const fields = [ {news_text}, {news_title}, {user_added_id} ] as SimpleDict[];
            const newsPictureIdValue = getValueOrNull(news_main_picture_id);
            const allFields = [...fields, isPicChanged ? {news_main_picture_id} : null].filter((item) => item)
            const sqlQuery = getDataUpdateQuery(allFields, 'news', 'news_id', true);


            const result = await sequelize.query(sqlQuery, {
                replacements: getNullObj({...body, news_main_picture_id: newsPictureIdValue, user_added_id, id}), 
                type: "UPDATE"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json({sqlQuery, id})

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getNewsList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { 
                limit=Limit, offset=Offset,  filter=DateFilter.All
            } = req.query;

            const where = getWhere(filter as DateFilter);
            const order = getOrder(filter as DateFilter)
            const newsQuery = sqlQueryCardService.getNews();
            const countQuery = `SELECT COUNT(news_id) FROM news ${where};`;

            const result = await sequelize.query(
                `
                ${newsQuery}
                ${where}
                ${order}
                LIMIT :limit
                OFFSET :offset;
                ;
                ${countQuery}
                ;`,
                {
                    replacements: { id, limit, offset },
                    type: 'SELECT'
                }

            )
            console.log({result}, 'result___________________________', 'getShows +++')

            const data = getDataFromSQL(result);
            return res.status(200).json(data);
    
        } catch(err) {
            console.log({err});
            return res.status(StatusCode.ServerError).json({message: 'error getNewsList'});
        }
    }

    // async getPlaces(req: Request, res: Response) {
    //     try {
    //         const { yearFrom, yearTo } = getDefaultFromToYears()
    //         const { id } = req.params;
    //         const { 
    //             country_id, year_from=yearFrom, year_to=yearTo, limit = Limit, offset = Offset,
    //             direction, sort_type
    //          } = req.query;

    //          console.log(req.query, '+++++++++++ ______ req.query ________ ++++++++++++')

    //         const sqlDirection = direction === SortDirection.ASC ? direction : SortDirection.DESC;
    //         const sqlType = SortTypeName[sort_type as string] || SortTypeName[SortType.WeeklyViews];

    //         console.log( SortTypeName[sort_type as string], 'SortTypeName[sort_type as string]' )

    //         const where = `
    //             WHERE (places.country_id ${country_id ? ' = :country_id' : ' = places.country_id OR 1 = 1'})
    //             ${ req.query.year_from || req.query.year_to ? `AND ${getBetweenYearsWhereStr('place_date_founded')}` : '' }
    //         `;



    //     const countQuery = `SELECT COUNT(place_id) FROM places ${where};`;

    //         const result = await sequelize.query(
    //             `
    //             SELECT
    //                 place_id,
    //                 place_name,
    //                 place_city, 
    //                 place_city_en,
    //                 place_date_founded, 
    //                 COALESCE(place_date_founded, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS place_date_founded_sort, 
    //                 place_date_closed,
    //                 place_date_added,
    //                 place_description,
    //                 countries.country_id, country_name, 
    //                 destination || filename AS main_picture,
    //                 get_views_count('place_id', place_id, 7) AS weekly_views,
    //                 get_views_count('place_id', place_id, 1000000) AS total_views
    //             FROM places
    //             LEFT JOIN countries ON countries.country_id = places.country_id
    //             LEFT JOIN main_pictures ON place_main_picture_id = main_pictures.main_picture_id
    //             ${where}
    //             ORDER BY ${sqlType} ${sqlDirection}
    //             LIMIT :limit
    //             OFFSET :offset;
    //             ;

    //             ${countQuery}
    //             ;`,
    //             {
    //                 replacements: { id, limit, offset, year_from, year_to, country_id },
    //                 type: 'SELECT'
    //             }

    //         )
    //         console.log({result}, 'result___________________________', 'getShows +++')

    //         const data = getDataFromSQL(result)
    //         return res.status(200).json(data);
    
    //     } catch(err) {
    //         console.log(err)
    //         return res.status(StatusCode.ServerError).json({message: 'error getShows'})
    //     }
    // }
}


export const newsController = new NewsController();