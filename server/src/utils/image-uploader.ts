import { Request } from "express";
import multer, {FileFilterCallback, diskStorage} from "multer";
import path from "path";
import fs from 'fs'



const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req: Request, file: Express.Multer.File, cb:  FileFilterCallback) => {
    cb(null, types.includes(file.mimetype))
}

const storage = diskStorage({
    destination(req, file, cb) {
        const {dir} = req.query;
        const dirname = path.resolve(__dirname, `../files/images/${dir}/`) // 
        const resultDirname = fs.existsSync(dirname) ? dirname : path.resolve(__dirname, `../files/images/default/`)
        cb(null, resultDirname)
    },
    filename(req, file, cb) {
        const names = file.originalname.split('.');
        const ext = names[names.length-1];
        const name = names.slice(0, names.length-1).join('.') + '_' + Date.now();
        cb(null, name + '.' + ext)
    }
})


export const imageUploader = multer({ storage, fileFilter })