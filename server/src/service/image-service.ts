import { ImageType, TableName } from "../const/const";
import { sequelize } from "../sequelize";
import { ImageFile } from "../types";
import { getIdFromTable } from "../utils/sql-utils";






class ImageService {
    async createImage({file, type, dir} : {file: ImageFile, type: string, dir: string}) {
        if (!file) {
            return '';
        }
        const {filename, mimetype, size} = file;
        const table = ImageType[type] || ImageType.images;
        const mainId = getIdFromTable(table);
        const path = `images/${dir || 'default'}`
        //!!! user_added_id HARDCODE = 1

        const result = await sequelize.query(`
            INSERT INTO ${table} (user_added_id, filename, destination, mimetype, size) 
            VALUES (1, :filename, :path, :mimetype, :size)
            RETURNING ${mainId}
        `, {
            replacements: {filename, path, mimetype, size},
            type: 'INSERT'
        });
        console.log(result[0][0], 'result[0][0]')

        return result[0][0][mainId];
    }
}

export const imageService = new ImageService();