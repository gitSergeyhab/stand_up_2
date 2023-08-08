import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { StatusCode, Column, DefaultQueryParams, ImageType, ImageDir } from "../const/const";
import { getDataFromSQL,  getDataInsertQuery,  getDataUpdateQuery,  insertView } from "../utils/sql-utils";

import { sqlQueryCardService } from "../service/query-card-service";
import { imageService } from "../service/image-service";
import { ImageFile, SimpleDict, UserRequest } from "../types";
import { ApiError } from "../custom-errors/api-error";
import { getNullObj, getValueOrNull } from "../utils/utils";


const LIMIT = 20;
const OFFSET = 0



const  ReqSortQuery = {
    new: 'new',
    old: 'old',
    pop: 'pop',
}


const getOrder = (filter?: string) => {
    switch (filter) {
        case ReqSortQuery.new: return `ORDER BY comment_id DESC`;
        case ReqSortQuery.old: return `ORDER BY comment_id ASC`;
        default: return `ORDER BY child_comment_count DESC`;
    }
}
class NewsCommentsController {

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

            const id = result[0][0]['comment_id'];

            const newComment = await sqlQueryCardService.getNewsCommentById({id});

            console.log({id, newComment}, '_________________lll____________ . . . ')

            return res.status(StatusCode.Added).json(newComment);

        
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

            const newComment = await sqlQueryCardService.getNewsCommentById({id});
            console.log({file, result})

            return res.status(StatusCode.Added).json(newComment)

        
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || 'unknown error')
        } 
    }

    async toggleNewsCommentDeleteStatus (req: UserRequest, res: Response ) {
        console.log('_________________        |     changeNewsComment    |        ___________'      )
        try {
            const {body, user} = req;
            // const user_added_id = user.user_id;
            const {id} = req.params

            console.log(req.body, req.params, req.query, 'req.body, req.params, req.query')

            const { deleted } = body as SimpleDict;
            console.log({deleted})
            const fields = [ {deleted} ] as SimpleDict[];
            const sqlQuery = getDataUpdateQuery(fields, 'news_comments', 'comment_id', true);


            const result = await sequelize.query(sqlQuery, {
                replacements: {deleted, id}, 
                type: "UPDATE"
            })

            const newComment = await sqlQueryCardService.getNewsCommentById({id});
            console.log({result})

            return res.status(StatusCode.Added).json(newComment)

        
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