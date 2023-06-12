import { Request, Response } from "express";
import { ColumnId, DefaultQueryParams, StatusCode } from "../const/const";
import { sequelize } from "../sequelize";
import { RateResult } from "../types";

const {Limit, Offset, EventStatusAll} = DefaultQueryParams;



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

                `,
                {
                    replacements: {id, rate}, 
                    type: 'SELECT'
                }
            );

            const data = getData(result);
            return res.status(StatusCode.Ok).json({data})

        } catch (err) {
            return res.status(StatusCode.Ok).json({message: 'Error getRatings'})
        }
    }
    // async getShowsRatingsByComedianId(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         const { limit = Limit, offset=Offset } = req.query;

    //         const where = `WHERE shows.show_id IN (
    //             SELECT show_id
    //             FROM shows
    //             WHERE comedian_id = :id
    //         )`


    //         const result = await sequelize.query(
    //             `
    //             SELECT 
    //                 users.user_id, users.user_nik,
    //                 shows.show_id, shows.show_name, 
    //                 show_ratings.show_rating_id, show_rate, show_ratings.show_date_rate,
    //                 get_views_count('show_id', shows.show_id, 7) AS weekly_views,
    //                 get_views_count('show_id', shows.show_id, 1000000) AS total_views,
    //                 get_avg_show_rate(shows.show_id)::real AS avg_show_rate,
    //                 avatars.destination || avatars.filename AS user_avatar,
    //                 main_pictures.destination || main_pictures.filename AS show_picture
    //             FROM show_ratings
    //             LEFT JOIN users ON show_ratings.user_id = users.user_id
    //             LEFT JOIN shows ON show_ratings.show_id = shows.show_id
    //             LEFT JOIN avatars ON avatars.avatar_id = users.user_avatar_id
    //             LEFT JOIN main_pictures ON main_picture_id = shows.show_main_picture_id
    //             ${where}
    //             ORDER BY show_date_rate DESC
    //             LIMIT :limit
    //             OFFSET :offset
    //             ;
    //             SELECT count(show_rating_id)
    //             FROM show_ratings
    //             LEFT JOIN shows ON show_ratings.show_id = shows.show_id
    //             ${where}
    //             `,
    //             {
    //                 replacements: { id, limit, offset }, 
    //                 type: 'SELECT'
    //             }
    //         );

            
    //         return res.status(StatusCode.Ok).json(result)

    //     } catch (err) {
    //         return res.status(StatusCode.Ok).json({message: 'Error getRatings'})
    //     }
    // }
}

export const ratingController = new RatingController()