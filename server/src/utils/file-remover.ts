import { unlinkSync, unlink } from 'fs'
import { ApiError } from '../custom-errors/api-error';
import { StatusCode } from '../const/const';
import path from 'path';

export const fileRemover = (filepath: string, dirname: string) => 
    unlink(`${dirname}/${filepath}`, (err) => {
        if (err) {
            console.log({err}, '_______Error fileRemover ________', {filepath, dirname})
            return { code: StatusCode.ServerError, message: err.message }
        } 
        console.log('_______no Error fileRemover ________')
        return { code: StatusCode.Deleted, message: `file ${filepath} was deleted` }
    });

export const filesRemover = (filepaths: string[]) => {
    const dirname = path.resolve(__dirname, `../files/`);
    filepaths.forEach((item) => fileRemover(item, dirname));
} 