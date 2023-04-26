import { Response } from "express";
import { StatusCode, TableName } from "../const";
import { sequelize } from "../sequelize";
import { DataTypeRate, TitlesDataType } from "../types";


export const getDataFromSQL = (result: [unknown[], unknown], field: string) => ({[field]: result.slice(0, result.length - 1), ...result[result.length - 1] as {count: string }});

type DataType = {
    data: unknown[];
    titles: TitlesDataType;
}



export const getDataFromSQLWithTitles = (result: [unknown[], unknown]):{data: unknown[], titles: TitlesDataType}  => 
    ({data: result.slice(0, result.length - 2), titles: result[result.length - 2] as TitlesDataType, ...result[result.length - 1] as {}});


/**
 * Проверяет, есть ли заголовки(а значит и комик/событие/место...) с данным айдишником, и если нет выдает онибку 404
 * @param data обработанные данные их SQL
 * @param res response
 * @returns респонсит ошибку 404 - когда нет заголовка; либо данные
 *  */    

export const checkTitles = async (data: DataType | DataTypeRate, res: Response) => {
    const native = data.titles?.native;
    if (!native) {
        
        return res.status(StatusCode.NotFoundError).json({message: `not found this content with such id`})
    }
    return res.status(StatusCode.Ok).json(data);
}



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
        case TableName.comedians: return `
            SELECT 
            get_one_name_of_two(comedian_first_name, comedian_last_name) AS native,
            get_one_name_of_two(comedian_first_name_en, comedian_last_name_en) AS en
            FROM comedians
            WHERE comedian_id = :id;
        `;
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