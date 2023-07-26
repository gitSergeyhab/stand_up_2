import { Response } from "express";
import { Column, StatusCode, TableName } from "../const/const";
import { sequelize } from "../sequelize";
import { DataTypeRate, SimpleDict, TitlesDataType } from "../types";


export const getDataFromSQL = (result: [unknown[], unknown]) => 
    ({
        list: result.slice(0, result.length - 1),
        ...result[result.length - 1] as {count: string }
    });


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



export const getIdFromTable = (table: string) => {
    if (table === 'news') {
        return 'news_id'
    }
    return table.slice(0, -1) + '_id';
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



const filterNotNull = (fields: SimpleDict[]) => fields.filter((item) => Object.entries(item)[0][1] !== null)
const filterNotEmpty = (fields: SimpleDict[]) => fields.filter((item) => Object.entries(item)[0][1])
/**
 * из массива {key: value}[] возвращает массив названий key
 * @param fields 
 * @returns 
 */
// const getFieldNames = (fields: SimpleDict[]) => filterNotNull(fields).map((item) => Object.entries(item)[0][0]);

const getFieldNames = (fields: SimpleDict[], update=false) => {
    const filter = update ? filterNotNull : filterNotEmpty;
    return filter(fields).map((item) => Object.entries(item)[0][0]);
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
// export const getDataInsertQueryStr = (fields: SimpleDict[], dir: string) => {
//     const fieldNames = getFieldNames(fields);
//     const fieldsStr = fieldNames.join(', ');
//     const valuesStr = prepareFields(fieldNames).join(', ')
//     const idName = getIdFromTable(dir)
//     const sqlQuery = `
//     INSERT INTO ${dir} (${fieldsStr})
//     VALUES (${valuesStr})
//     RETURNING ${idName}
//     `
//     return sqlQuery
// }

export const getDataInsertQueryStr = (fields: SimpleDict[], dir: string) => {
    console.log({fields})
    const fieldNames = getFieldNames(fields);
    const columnId = getIdFromTable(dir);
    const fieldsStr = fieldNames.join(', ');
    const valuesStr = prepareFieldsToQuery(filterNotEmpty(fields)).join(', ');
    console.log({fieldsStr, valuesStr})
    const sqlQuery = `
    INSERT INTO ${dir} (${fieldsStr})
    VALUES (${valuesStr})
    RETURNING ${columnId}
    `
    return sqlQuery
}


/**
 * проверят поля на "" / _date / остальные и возвращает подготовленный массив значений
 * @param fields {key:value} : key - поле, value - значение из формы с клиента
 * @returns массив значений:  :key / to_date(:${date}, ${pattern}) / null
 */
export const prepareFieldsToQuery = (fields: SimpleDict[]) => {
    return fields.map((item) => {
        const [key, value] = Object.entries(item)[0]
        if (!/_date/.test(key)) {
            return `:${key}`;
        }
        if (value) {
            return convertFormDataToDate(key);
        }
        return 'null';
    })
}

export const getDataUpdateQueryStr = (fields: SimpleDict[], dir: string) => {
    console.log({fields})
    const fieldNames = getFieldNames(fields, true);
    const columnId = getIdFromTable(dir);
    const fieldsStr = fieldNames.join(', ');
    // const valuesStr = prepareFields(fieldNames).join(', ')
    const valuesStr = prepareFieldsToQuery(filterNotNull(fields)).join(', ');
    console.log({fieldsStr, valuesStr})
    const sqlQuery = `
        UPDATE ${dir} 
        SET (${fieldsStr}) = (${valuesStr})
        WHERE ${columnId} = :id
    `
    return sqlQuery
}

export const getDataUpdateQueryStrDateUpd = (fields: SimpleDict[], dir: string) => {
    console.log({fields})
    const fieldNames = getFieldNames(fields, true);
    const columnId = getIdFromTable(dir);
    const fieldsStr = fieldNames.join(', ') + ', date_updated';
    // const valuesStr = prepareFields(fieldNames).join(', ')
    const valuesStr = prepareFieldsToQuery(filterNotNull(fields)).join(', ') + ', CURRENT_TIMESTAMP';
    console.log({fieldsStr, valuesStr})
    const sqlQuery = `
        UPDATE ${dir} 
        SET (${fieldsStr}) = (${valuesStr})
        WHERE ${columnId} = :id
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


export const getSQLRangeFromArray = (data: (string|number)[]) => `( ${data.join(', ') } )`;