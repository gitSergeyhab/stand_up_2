import { Response } from "express";
import { sequelize } from "../sequelize";
import { UserRequest } from "../types";
import { StatusCode } from "../const/const";
import { sqlQueryCardService } from "../service/query-card-service";

const LIMIT = 9;

const Type = {
    EventDate: 'event_date',
    EventView: 'event_view',
    Show: 'show',
    Place: 'place',
    Comedian: 'comedian'

} as const;
class MainController {


    async getMainData(req: UserRequest, res: Response) {


        try {
            const user_id = req.user?.user_id || '0';

            const showsQuery = sqlQueryCardService.getShows(Type.Show);
            const comediansQuery = sqlQueryCardService.getComedians(Type.Comedian);
            const eventsQueryDate = sqlQueryCardService.getEvents(Type.EventDate);
            const eventsQueryViews = sqlQueryCardService.getEvents(Type.EventView);
            const placesQuery = sqlQueryCardService.getPlaces(Type.Place);

            const orderLimitQuery = `
                ORDER BY weekly_views DESC
                LIMIT :LIMIT;
            `;

            const eventDateOrderLimitQuery = `
                where event_date >= CURRENT_DATE 
                ORDER BY event_date_sort
                LIMIT :LIMIT;
            `;



            const result = await sequelize.query(
                `
                    ${showsQuery} ${orderLimitQuery};
                    ${comediansQuery} ${orderLimitQuery};
                    ${eventsQueryViews} ${orderLimitQuery};
                    ${eventsQueryDate} ${eventDateOrderLimitQuery};
                    ${placesQuery} ${orderLimitQuery};
                `,
                {
                    type: 'SELECT',
                    replacements: {LIMIT, user_id}
                }
            ) as {type: string}[];


            console.log({result}, 'result___________________________', 'getShows +++')


            const shows = result.filter((item) => item.type === Type.Show);
            const comedians = result.filter((item) => item.type === Type.Comedian);
            const eventsByViews = result.filter((item) => item.type === Type.EventView);
            const eventsByDate = result.filter((item) => item.type === Type.EventDate);
            const places = result.filter((item) => item.type === Type.Place);

            return res.status(StatusCode.Ok).json({ 
                shows, comedians, eventsByViews, eventsByDate, places 
            });
    
        } catch(err) {
            console.log(err)
            return res.status(StatusCode.ServerError).json({message: 'error getMainData'})
        }
    }
}


export const mainController = new MainController();