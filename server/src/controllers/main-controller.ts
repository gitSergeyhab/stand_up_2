import { Response } from "express";
import { sequelize } from "../sequelize";
import { UserRequest } from "../types";
import { StatusCode } from "../const/const";
import { sqlQueryCardService } from "../service/query-card-service";

const LIMIT = 9;


class MainController {


    async getMainData(req: UserRequest, res: Response) {


        try {
            const user_id = req.user?.user_id || '0';

            const showsQuery = sqlQueryCardService.getShows();
            const comediansQuery = sqlQueryCardService.getComedians();
            const eventsQuery = sqlQueryCardService.getEvents();
            const placesQuery = sqlQueryCardService.getPlaces();

            const orderLimitQuery = `
                ORDER BY weekly_views DESC
                LIMIT :LIMIT;
            `;

            const eventDateOrderLimitQuery = `
                ORDER BY event_date_sort DESC
                LIMIT :LIMIT;
            `;


            const result = await sequelize.query(
                `
                    ${showsQuery} ${orderLimitQuery};
                    ${comediansQuery} ${orderLimitQuery};
                    ${eventsQuery} ${orderLimitQuery};
                    ${eventsQuery} ${eventDateOrderLimitQuery};
                    ${placesQuery} ${orderLimitQuery};
                `,
                {
                    type: 'SELECT',
                    replacements: {LIMIT, user_id}
                }
            ) as [][];


            console.log({result}, 'result___________________________', 'getShows +++')

            const data = {
                shows: result[0],
                comedians: result[1],
                eventsByViews: result[2],
                eventsByDate: result[3],
                places: result[4]
            }

            return res.status(StatusCode.Ok).json(data);
    
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error getMainData'})
        }
    }
}


export const mainController = new MainController();