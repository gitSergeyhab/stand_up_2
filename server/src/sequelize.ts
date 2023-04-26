import { Sequelize, Dialect } from 'sequelize';

const DEFAULT_DB_NAME = 'stand_up';
const DEFAULT_DB_USER = 'postgres';
const DEFAULT_DB_PASSWORD = '1';

const dialect = process.env.SQL_DIALECT as Dialect || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = +process.env.DB_PORT || 5432;


export const sequelize = new Sequelize(
    process.env.DB_NAME || DEFAULT_DB_NAME,
    process.env.DB_USER || DEFAULT_DB_USER,
    process.env.DB_PASSWORD || DEFAULT_DB_PASSWORD,
    {dialect, host, port}
)