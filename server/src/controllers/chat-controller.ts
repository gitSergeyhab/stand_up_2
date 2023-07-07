import { Request, Response } from "express";
import { sequelize } from "../sequelize";
import { StatusCode } from "../const/const";
import { ApiError } from "../custom-errors/api-error";

class ChatController {

   
    async getRooms(req: Request, res: Response) {
        try {
            const result = await sequelize.query(
                `SELECT room_id, room_name, room_name_en FROM rooms;`,
                { type: 'SELECT'}
            );

            res.status(StatusCode.Ok).json(result)

        } catch (err) {
            console.log({err}, 'getRooms')
            throw ApiError.BadRequest('wrong request')
        }
    }
}


export const chatController = new ChatController()