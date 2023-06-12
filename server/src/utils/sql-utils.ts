import { Response } from "express";
import { Column, StatusCode, TableName } from "../const/const";
import { sequelize } from "../sequelize";
import { DataTypeRate, SimpleDict, TitlesDataType } from "../types";


export const getDataFromSQL = (result: [unknown[], unknown]) => 
    ({
        list: result.slice(0, result.length - 1),
        ...result[result.length - 1] as {count: string }
    });

type DataType = {
    data: unknown[];
    titles: TitlesDataType;
}



export const getDataFromSQLWithTitles = (result: [unknown[], unknown])  => 
    ({
        list: result.slice(0, result.length - 2), 
        titles: result[result.length - 2] as TitlesDataType, 
        ...result[result.length - 1] as {count: string }
    });

export const separateGraphTitles = (result: [unknown[], unknown])  => 
    ({
        graph: result.slice(0, result.length - 1), 
        titles: result[result.length - 1] as TitlesDataType, 
     
    });

export const separateListCount = (result: [unknown[], unknown])  => 
    ({
        list: result.slice(0, result.length - 1), 
        ...result[result.length - 1] as {count: string }
     
    });


/**
 * Проверяет, есть ли заголовки(а значит и комик/событие/место...) с данным айдишником, и если нет выдает онибку 404
 * @param data обработанные данные их SQL
 * @param res response
 * @returns респонсит ошибку 404 - когда нет заголовка; либо данные
 *  */    

// export const checkTitles = async (data: DataType | DataTypeRate, res: Response) => {
//     const native = data.titles?.native;
//     if (!native) {
        
//         return res.status(StatusCode.NotFoundError).json({message: `not found this content with such id`})
//     }
//     return res.status(StatusCode.Ok).json(data);
// }

export const getIdFromTable = (table: string) => table.slice(0, -1) + '_id';


export const insertView = async(id: string, user_id: string, column: string) => {
    await sequelize.query(
        `SELECT insert_view (:column, :id, :user_id);`, 
        {
            replacements: {id, user_id, column},
            type: 'INSERT'
        }
    )
}

const getProtoTitleQuery = (nativeCol: string, enCol: string, table: string, idCol: string) => `
    SELECT 
    ${nativeCol} AS native,
    ${enCol} AS en
    FROM ${table}
    WHERE ${idCol} = :id;
    `

export const getTitlesQuery = (type: string) => {
    const tableName = TableName[type] || TableName.comedians;

    switch (tableName) {
        case TableName.comedians: return getProtoTitleQuery('comedian_nik', 'comedian_nik_en', 'comedians', 'comedian_id');
        case TableName.events: return getProtoTitleQuery('event_name', 'event_name_en', 'events', 'event_id');
        case TableName.places: return getProtoTitleQuery('place_name', 'place_name_en', 'places', 'place_id');
        case TableName.shows: return getProtoTitleQuery('show_name', '', 'shows', 'show_id');
        default: return getProtoTitleQuery('user_nik', '', 'users', 'user_id'); 
    }
};


export const getNeedYears = (from: any, to: any) => {

    if (!from && !to) {
        return null;
    }

    const yearFrom = +from;
    const yearTo = +to || new Date().getFullYear();

    return {yearFrom, yearTo};
}

export const convertToDate = (date: string, pattern: string) => `to_date(:${date}, ${pattern})`;
export const convertFormDataToDate = (date: string) => convertToDate(date, `'dd.MM.yyyy'`);

const getFieldNames = (fields: SimpleDict[]) => {
    const fieldNames = fields.filter((item) => {
        const value = Object.entries(item)[0][1];
        return value && typeof value === 'string';
    }).map((item) => Object.entries(item)[0][0]);
    return fieldNames;
}

const prepareFields = (fields: string[]) => {
    return fields.map((item) => {
        if (/_date/.test(item)) {
            return convertFormDataToDate(item);
        }
        return `:${item}`;
    })
}

/**
 * sql строка для вставки нового show/place/...
 * @param fields данные в формате [{show_name, date, ...}] кроме ..._main_picture_id
 * @param dir папка для картинки, она же таблица
 * @returns id
 */
export const getDataInsertQueryStr = (fields: SimpleDict[], dir: string) => {
    const fieldNames = getFieldNames(fields);
    const fieldsStr = fieldNames.join(', ');
    const valuesStr = prepareFields(fieldNames).join(', ')
    const idName = getIdFromTable(dir)
    const sqlQuery = `
    INSERT INTO ${dir} (${fieldsStr})
    VALUES (${valuesStr})
    RETURNING ${idName}
    `
    return sqlQuery
}

/**
 * возвращает sql запрос на получение заголовков, 
 * если запрос из суброутера
 * ! в replacements обязателен id
 * @param table 
 * @returns 
 */
export const getTitles = (table: string) => {
    if (!table) {
        return ''
    }

    let name = ''
    if (table === TableName.comedians) {
        name = 'comedian_nik'
    } else {
        name = table.slice(0, table.length - 1) + '_name'
    }

    const nameEn = name + '_en';

    const columnId = getIdFromTable(table)

    return `
    SELECT ${name} AS native, ${nameEn} AS en  
    FROM ${table}
    WHERE ${columnId} = :id
    ;`

}


