import { writeFile } from "fs/promises"
import { ImageType } from "../const/const";
import { sequelize } from "../sequelize";
import { ImageFile } from "../types";
// import { getIdFromTable } from "../utils/sql-utils";
import path from "path";
import { getIdFromTable } from "../utils/sql-utils";

type CreateImageType = {
    file: ImageFile, 
    table: string, 
    dir: string,
    user_added_id: string
}

class ImageService {
    async createImage({file, table, dir, user_added_id} : CreateImageType) {
        if (!file) {
            return '';
        }
        const column = getIdFromTable(table);
        const {filename, mimetype, size} = file;
        const path = `images/${dir || 'default'}/`

        const result = await sequelize.query(`
            INSERT INTO ${table} (user_added_id, filename, destination, mimetype, size) 
            VALUES (:user_added_id, :filename, :path, :mimetype, :size)
            RETURNING ${column}
        `, {
            replacements: {filename, path, mimetype, size, user_added_id},
            type: 'INSERT'
        });
        console.log(result[0][0], 'result[0][0]')

        return result[0][0][column];
    }

    async saveFile( file: File, name: string, dir: string ) {

        try {
            const filePath = path.resolve(__dirname, `../files/images/${dir}/${name}`)
            const pseudoString = file as unknown as string // !!! Почему-то только так...
            await writeFile( filePath, pseudoString );

            console.log('_______________saved______________________!')
        } catch (err) {
                console.log({err}, '_________________________saveFile')
        }
        // const response = await fetch('url');
        // const buffer = await response.blob();

    }
}

export const imageService = new ImageService();