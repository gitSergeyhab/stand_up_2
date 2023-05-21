import { Request, Response } from "express";
import { ColumnId, ImageType, StatusCode } from "../const";
import { sequelize } from "../sequelize";
import { getDataFromSQL, getDataFromSQLWithTitles, getTitlesQuery } from "../utils/sql-utils";

const getIdFromTable = (table: string) => table.slice(0, -1) + '_id'



class ImagesController {
    async getImageById(req: Request, res: Response) {

        try {
            const {type, id} = req.params;
            const {limit = null, offset = null} = req.query; 
            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const where = `WHERE ${columnId} = :id`;

            const result = await sequelize.query(
                `SELECT 
                image_id, destination || filename AS image_path
                FROM images
                ${where}
                LIMIT :limit
                OFFSET :offset;

                ${getTitlesQuery(type)};
                
                SELECT COUNT(image_id) 
                FROM images
                ${where};`, 
                {
                    replacements: { id, columnId, limit, offset },
                    type: 'SELECT'
                }
            );

            const data = getDataFromSQLWithTitles(result);
            console.log(data)
            return res.status(200).json(data)

        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'error getImageById'})
        }
    }

    async postImage(req: Request, res: Response) {
        try {
            const {filename, destination, mimetype, size} = req.file;
            const {type = ImageType.images } = req.query;
            const table = ImageType[type as string] 
            const mainId = getIdFromTable(table)
//!!! user_added_id HARDCODE
            const result = await sequelize.query(`
                INSERT INTO ${table} (user_added_id, filename, destination, mimetype, size) 
                VALUES (1, :filename, :destination, :mimetype, :size)
                RETURNING ${mainId}
            `, {
                replacements: {filename, destination, mimetype, size},
                type: 'INSERT'
            });

            return res.status(StatusCode.Added).json(result[0][0]);


        } catch(err) {
            console.log({err})
            return res.status(StatusCode.Added).json('ERROR postImage');
        }
    }
}


export const imagesController = new ImagesController()