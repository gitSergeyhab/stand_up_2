import { Request, Response } from "express";
import { ColumnId, StatusCode } from "../const";
import { sequelize } from "../sequelize";
import { RateResult } from "../types";
import { checkTitles, getTitlesQuery } from "../utils/sql-utils";



const getTableParams = (columnId: string) => {
    const type = columnId.split('_id')[0];

    return {
        ratingIdCol: type + '_rating_id',
        rateCol: type + '_rate',
        dateCol: type + '_date_rate',
        rateTable: type + '_ratings',
        table: type + 's'
    }
}





const getData = (result: RateResult[]) => {
    const count = result.filter((item) => item.count);
    const stats = result.filter((item) => item.rate_count);
    const rates = result.filter((item) => item.user_id);
    const titles = result.filter((item) => item.native)[0];
    return {count: count[0].count || '0', stats, rates, titles}
}

class RatingController {


    async getRatings(req: Request, res: Response) {
        try {
            const { type, id } = req.params;
            const { rate = null } = req.query;

            const columnId: string = ColumnId[type as string] || ColumnId.comedians;

            const { dateCol, rateCol, ratingIdCol, rateTable, table } = getTableParams(columnId);

            const where = `WHERE ${columnId} = :id${rate ? ` AND ${rate} = :rate` :  ''}`

            const result = await sequelize.query(
                `
                SELECT ${rateCol} AS rate, COUNT(${rateCol}) AS rate_count 
                FROM ${rateTable}
                WHERE ${columnId} = :id
                GROUP BY ${rateCol}
                ORDER BY rate DESC
                ;

                SELECT 
                ${ratingIdCol} AS rate_id, 
                ${dateCol} AS date, 
                ${rateCol} AS rate, 
                user_id, user_nik, user_avatar
                FROM ${rateTable}
                LEFT JOIN users USING (user_id)
                ${where}
                ORDER BY ${dateCol} DESC;

                SELECT COUNT(*)
                FROM ${rateTable}
                ${where};

                ${getTitlesQuery(type)}
                `,
                {
                    replacements: {id, rate}, 
                    type: 'SELECT'
                }
            );

            const data = getData(result);
            return checkTitles(data, res);

        } catch (err) {
            return res.status(StatusCode.Ok).json({message: 'Error getRatings'})
        }
    }
}

export const ratingController = new RatingController()