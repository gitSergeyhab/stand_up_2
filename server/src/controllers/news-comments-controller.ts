import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { StatusCode, Column, DefaultQueryParams, ImageType, ImageDir } from "../const/const";
import { getDataFromSQL,  getDataInsertQuery,  getDataUpdateQuery,  insertView } from "../utils/sql-utils";

import { sqlQueryCardService } from "../service/query-card-service";
import { imageService } from "../service/image-service";
import { ImageFile, SimpleDict, UserRequest } from "../types";
import { ApiError } from "../custom-errors/api-error";
import { getNullObj, getValueOrNull } from "../utils/utils";


// const {Limit, Offset, EventStatusAll} = DefaultQueryParams;
const LIMIT = 20;
const OFFSET = 0


// const SortTypeName = {
//     [SortType.New]: 'child_comment_count', //=
//     [SortType.WeeklyViews]: 'weekly_views', //=
//     [SortType.TotalViews]: 'total_views'//=
//   }

const  ReqSortQuery = {
    new: 'new',
    old: 'old',
    pop: 'pop',
}

// const enum FilterSorter {
//     Newest = 'comment_id',
//     ChildComments = 'child_comment_count',
//     // Likes = 'likes',
//     // Dislikes = 'dislikes',
// }


// const getOrder = (filter: FilterSorter) => {
//     switch (filter) {
//         case FilterSorter.ChildComments: return `ORDER BY ${FilterSorter.ChildComments} DESC`;
//         default: return `ORDER BY ${FilterSorter.Newest} DESC`;
//     }
// }

const getOrder = (filter?: string) => {
    switch (filter) {
        case ReqSortQuery.new: return `ORDER BY comment_id DESC`;
        case ReqSortQuery.old: return `ORDER BY comment_id ASC`;
        default: return `ORDER BY child_comment_count DESC`;
    }
}
class NewsCommentsController {

    // async getNewsById(req: Request, res: Response) {
        
    //     try {
    //         const {id, user_id='1'} = req.params
    //         console.log('getNewsById', {id})
    //         const newsQuery = sqlQueryCardService.getNews();
    //         const where = 'WHERE news_id = :id'
    //             const news = await sequelize.query(
    //                 `
    //                 ${newsQuery}
    //                 ${where}
    //                 ;
    //                 `,
    //                 { 
    //                     replacements: {id},
    //                     type: 'SELECT'
    //                 }
    //             );
    //             if (!news.length) {
    //                 return res.status(StatusCode.NotFoundError)
    //                     .json({message: `not found place with ID: ${id}`});
    //             }

    //             await insertView(id, user_id, Column.News);

        
    //             return res.status(StatusCode.Ok).json(news[0])
    //     } catch (err) {
    //         console.log({err});
    //         return res.status(StatusCode.ServerError).json({message: 'getNewsById'})
    //     }
    // }


    async addNewsComment (req: UserRequest, res: Response ) {
        try {
            const {body, user} = req;
            console.log({user}, '+++++++++   addNewsComment   +++++++++')
            const user_added_id = user.user_id;
            const dir = req.query.dir as string;
            const file = req.file as ImageFile;
            console.log({dir, body})
        
            const { text, parent_comment_id, root_comment_id, news_id } = body as SimpleDict;
            const fields = [ {user_added_id}, {text}, {parent_comment_id}, {root_comment_id}, {news_id} ] as SimpleDict[];
            const image_id = await imageService.createImage({
                file,  dir: ImageDir.Comments, table: ImageType.Images, user_added_id
            }) as string;

            const allFields = [...fields, {image_id}]
            const sqlQuery = getDataInsertQuery(allFields, 'news_comments', 'comment_id');

            console.log({sqlQuery})
            const result = await sequelize.query(sqlQuery, {
                replacements: {...body, image_id, user_added_id}, 
                type: "INSERT"
            })

            console.log({file, result}, '_________________lll____________ . . . ', result[0], result[0]['comment_id'])

            return res.status(StatusCode.Added).json(result[0][0]['comment_id'])

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async changeNewsComment (req: UserRequest, res: Response ) {
        console.log('_________________        |     changeNewsComment    |        ___________'      )
        try {
            const {body, user} = req;
            const user_added_id = user.user_id;
            const {id} = req.params
            const file = req.file as ImageFile;
            const image_id = await imageService.createImage({
                file,  dir: ImageDir.Comments, table: ImageType.Images, user_added_id
            }) as string;

            const { text, isPicChanged } = body as SimpleDict;
            console.log({isPicChanged} )
            const fields = [ {text} ] as SimpleDict[];
            const imageIdValue = getValueOrNull(image_id);
            const allFields = [...fields, isPicChanged ? {image_id} : null].filter((item) => item)
            const sqlQuery = getDataUpdateQuery(allFields, 'news_comments', 'comment_id', true);


            const result = await sequelize.query(sqlQuery, {
                replacements: getNullObj({...body, image_id: imageIdValue, id}), 
                type: "UPDATE"
            })

            console.log({file, result})

            return res.status(StatusCode.Added).json({sqlQuery, id})

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async getNewsCommentsByNewsId(req: Request, res: Response) {

        const where = `
            WHERE news.news_id = :news_id
            AND root_comment_id IS NULL
        `;


        try {
            const { news_id } = req.params;
            const { limit=LIMIT, offset=OFFSET, sort=ReqSortQuery.pop } = req.query;
            console.log({sort}, '+++++++++ sort +++++++++')

            const order = getOrder(ReqSortQuery[sort as string])
            const commentsQuery = sqlQueryCardService.getNewsComments();
            const countQuery = `
            SELECT COUNT(comment_id) 
            FROM news_comments 
            LEFT JOIN news ON news_comments.news_id = news.news_id
            ${where};`;

            const result = await sequelize.query(
                `
                ${commentsQuery}
                ${where}
                ${order}
                LIMIT :limit
                OFFSET :offset;
                ;
                ${countQuery}

                ;`,
                {
                    replacements: { news_id, limit, offset },
                    type: 'SELECT'
                }

            )
            console.log(result[0], 'result___________________________', 'console.log +++')

            const data = getDataFromSQL(result);
            return res.status(200).json(data);
    
        } catch(err) {
            console.log({err});
            return res.status(StatusCode.ServerError).json({message: 'error getNewsList'});
        }
    }


}


export const newsCommentsController = new NewsCommentsController();