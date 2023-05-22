import { Request, Response } from "express";
import { ColumnId, StatusCode } from "../const/const";
import { sequelize } from "../sequelize";
import { getDataFromSQL, getDataFromSQLWithTitles, getTitlesQuery } from "../utils/sql-utils";

class PicturesController {
    async getPictureById(req: Request, res: Response) {

        try {
            const {type, id} = req.params;
            const {limit = null, offset = null} = req.query; 
            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const where = `WHERE ${columnId} = :id`;

            const result = await sequelize.query(
                `SELECT picture_id, picture_path 
                FROM pictures
                ${where}
                LIMIT :limit
                OFFSET :offset;

                ${getTitlesQuery(type)}
                
                SELECT COUNT(picture_id) 
                FROM pictures
                ${where};`, 
                {
                    replacements: { id, columnId, limit, offset },
                    type: 'SELECT'
                }
            );

            const data = getDataFromSQL(result, 'pictures');
            return res.status(200).json({data})

        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error getPictureById'})
        }
    }
}


export const picturesController = new PicturesController()