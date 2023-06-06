import { Request, Response } from "express";
import { ColumnId, ImageType, StatusCode, TableName } from "../const/const";
import { sequelize } from "../sequelize";
import { getDataFromSQL, getDataFromSQLWithTitles, getTitlesQuery } from "../utils/sql-utils";
import { ApiError } from "../custom-errors/api-error";
import { filesRemover } from "../utils/file-remover";
import { checkDigitList } from "../utils/cheks-utils";

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
            console.log(data, 'getImageById')
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

    async postImagesByTypeAndId(req: Request, res: Response) {
        try {
            console.log('postImagesByTypeAndId TRY')
            const {id, type} = req.params as {type: string, id: string};
            const {files} = req;

            type FileDataType = {filename: string, mimetype:string, size: number}
            const geReplacementsFromFile = ({filename, mimetype, size}: FileDataType, i: number) => 
                ({['filename' + i]: filename, ['mimetype' + i]: mimetype, ['size' + i]: size })

            const geReplacementsFromFiles = (files: Express.Multer.File[]) =>
                files
                .reduce((acc, {filename, mimetype, size}, i) =>  {
                    const newItems = geReplacementsFromFile({filename, mimetype, size}, i);
                    return {...acc, ...newItems}
                } , {});


            const replacementsData = geReplacementsFromFiles(files as  Express.Multer.File[])
            

            const columnId = getIdFromTable(type);

            const getValueQueryStrFromFile = (i: number) =>
                `(:user_added_id, :filename${i}, :destination, :mimetype${i}, :id, :size${i})`;

            const getValuesQueryStrFromFiles = (files: Express.Multer.File[]) =>
                files
                .map((_, i) => getValueQueryStrFromFile(i))
                .join(',\n')

            const dataQueryStr = getValuesQueryStrFromFiles(files as Express.Multer.File[]);

            // console.log({data, dataQueryStr})

            await sequelize.query(
                `
                INSERT INTO images (user_added_id, filename, destination, mimetype, ${columnId}, size)
                VALUES ${dataQueryStr};
            `, {
                    replacements: {...replacementsData, user_added_id: 1, destination: `images/${type}/`, id},
                    type: 'INSERT'
                }
            )


            console.log({id, type})
            return res.status(StatusCode.Added).json(`Ok. Added ${files.length} images for ${type} id=${id}`)

        } catch (err) {
            console.log({err});

            return res.status(StatusCode.ServerError).json('postImagesByTypeAndId Error')
        }
    }

    

    async removeImagesByIdList(req: Request, res: Response) {


        try {
            const {indexes} = req.query as {indexes: string};

            if (!checkDigitList(indexes)) {
                throw new ApiError(StatusCode.ServerError, 'removeImagesByIdList Error: no id list')
            }

            const result = await sequelize.query(`
                DELETE FROM images 
                WHERE image_id IN (${indexes})
                RETURNING destination || filename AS path;
            `, {
                    type: 'DELETE'
                }
            )

            const filenames = (result as {path: string}[]).map((item) => item.path);
            if (filenames?.length) {
                filesRemover(filenames)
            }

           return res.status(StatusCode.Deleted).json(`deleted`)

        } catch (err) {
            console.log({err})
            throw new ApiError(StatusCode.ServerError, err.message || 'unknown error')
        }
    }
}


export const imagesController = new ImagesController()