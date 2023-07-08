import { Server } from "socket.io";
import { sequelize } from "../sequelize";
import { getSQLRangeFromArray } from "../utils/sql-utils";
import { RoomUserId } from "../types";
import { Role } from "../const/const";

class ChatService {

    getMessageQuery (where: string) {
        return (
            `
            SELECT 
                message_id, 
                chat_messages.user_id, 
                user_nik, 
                room_id, 
                message_text, 
                message_auto, 
                message_added,
                destination || filename AS avatar,
                ARRAY_AGG(role_name) as user_roles
            FROM chat_messages
            LEFT JOIN users ON users.user_id = chat_messages.user_id
            LEFT JOIN users_roles ON users.user_id = users_roles.user_id
            LEFT JOIN roles ON roles.role_id = users_roles.role_id
            LEFT JOIN avatars ON users.user_avatar_id = avatars.avatar_id
                ${where}
                GROUP BY chat_messages.message_id, user_nik, destination, filename;
            `
        )
    } 
    async getMessageDataById (id: number) {
        try {

            
            const where = 'WHERE message_id = :id';
            const query = this.getMessageQuery(where);
            const result = await sequelize.query( 
                query, 
                {
                    replacements: {id},
                    type: 'SELECT'
                }
            );

            // console.log(result);

            return result[0];

        } catch (err) {
            console.log({err}, 'getMessageDataById');
            return null;
        }

    }
/**
 * возвращает массив сообщений с доп юзер инфо по message_id[]
 * @param indexes message_id[]
 * @returns массив сообщений с доп изер инфо
 */
    async getMessagesDataById (indexes: number[]) {
        try {
            const values = `(${indexes})`;
            const where = `WHERE message_id IN ${values}`
            const query = this.getMessageQuery(where);
            console.log({query})
            const result = await sequelize.query(
                query, 
                { type: 'SELECT' }
            );

            console.log(result);

            type Result = {
                message_id: number, 
                user_id: string, 
                user_nik: string, 
                room_id: string, 
                message_text: string, 
                message_auto?: boolean, 
                message_added: Date,
                avatar?: string,
                user_roles: Role[]
            }

            console.log({result});
            return (result as Result[]);

        } catch (err) {
            console.log({err}, 'getMessagesDataById');
            return null;
        }

    }

    async getMessagesByRoom (roomId: string) {
        try {
            const result = await sequelize.query(
                `
                SELECT 
                    message_id, 
                    chat_messages.user_id, 
                    user_nik, 
                    room_id, 
                    message_text, 
                    message_auto, 
                    message_added,
                    destination || filename AS avatar,
                    ARRAY_AGG(role_name) as user_roles
                FROM chat_messages
                LEFT JOIN users ON users.user_id = chat_messages.user_id
                LEFT JOIN users_roles ON users.user_id = users_roles.user_id
                LEFT JOIN roles ON roles.role_id = users_roles.role_id
                LEFT JOIN avatars ON users.user_avatar_id = avatars.avatar_id
                    WHERE room_id = :roomId
                    GROUP BY chat_messages.message_id, user_nik, destination, filename
                    ORDER BY message_added
                    ;
                `, 
                {
                    replacements: {roomId},
                    type: 'SELECT'
                }
            );

            // console.log(result);

            return result;

        } catch (err) {
            console.log({err}, 'getMessageDataById');
            return [];
        }

    }

    async addMessage (userId: string, roomId: string, text: string, isAuto=false) {
        try {
            const result = await sequelize.query(
                `
                INSERT INTO chat_messages
                (user_id, room_id, message_text, message_auto) VALUES
                (:userId, :roomId, :text, :isAuto)
                RETURNING message_id;
                `,
                {
                    replacements: {userId, roomId, text, isAuto},
                    type: 'SELECT'
                }
            )

            type Result = {message_id: string}[]
            return +(result as Result)[0]?.message_id || 0;

        } catch (err) {
            console.log({err})
            return 0;
        }
    }
/**
 * добавляет сообщения в БД - возвращает их индексы
 * @param roomUserList - {room_id: string;user_id: string}[] - массив объктов какой пользователь(хотя он 1) в какой комнате(пока тоже 1)
 * @param text техт сообщения
 * @param isAuto сгенерировать автоматически при входе/выходе
 * @returns - {message_id: number}[] / null-при ошибке
 */
    async addMessages (roomUserList: RoomUserId[], text: string, isAuto=false) {

        const values = roomUserList.map(({room_id, user_id}) => `(${user_id}, ${room_id}, :text, :isAuto)`).join(', ');
        try {
            const result = await sequelize.query(
                `
                INSERT INTO chat_messages
                (user_id, room_id, message_text, message_auto) 
                VALUES ${values}
                RETURNING message_id;
                `,
                {
                    replacements: {text, isAuto},
                    type: 'SELECT'
                }
            )

            type Result = {message_id: number}[]
            return (result as Result).map(item => item.message_id);

        } catch (err) {
            console.log({err})
            return null;
        }
    }

    async insertUserToRoom (userId: string, roomId: string, socketId: string) {
        try {
            await sequelize.query(
                `
                    INSERT INTO users_rooms(user_id, room_id, socket_id) 
                    VALUES (:userId, :roomId, :socketId)
                `,
                {
                    replacements: {userId, roomId, socketId},
                    type: 'INSERT'
                }
            )

            return 1;

        } catch (err) {
            return 0;
        }
    }

    async deleteUserFromRoom (userId: string, roomId: string) {
        try {
            await sequelize.query(
                `
                DELETE FROM users_rooms
                WHERE user_id = :userId
                AND room_id = :roomId;
                `,
                {
                    replacements: { userId, roomId },
                    type: 'DELETE'
                }
            )
            return true;
        } catch {
            return false;
        }
    }

    /**
     * удалить из БД (users_rooms) все строки с socket.id
     * @param socketId 
     * @returns true/false - удачно или нет
     */
    async deleteUserFromRoomBySocket (socketId: string) {
        try {
            await sequelize.query(
                `
                DELETE FROM users_rooms
                WHERE socket_id = :socketId;
                `,
                {
                    replacements: {socketId },
                    type: 'DELETE'
                }
            )
            return true;
        } catch {
            return false;
        }
    }

    /**
     * ищет в БД(users_rooms) строки с socketId
     * @param socketId 
     * @returns массив {room_id, user_id}[], в комнатах, где есть юзер или FLSE при ошибке
     */

    async getRoomUserBySocket (socketId: string) {
        try {
            const result = await sequelize.query(
                `
                SELECT 
                room_id,
                user_id
                FROM users_rooms
                WHERE socket_id = :socketId;
                `,
                {
                    replacements: {socketId },
                    type: 'SELECT'
                }
            )
            return result;
        } catch {
            return false;
        }
    }

    // async addUserToRoom (userId: string, roomId: string) {
    //     try {
    //         await sequelize.query(
    //             `
    //             INSERT INTO users_rooms(user_id, room_id) 
    //             VALUES (:userId, :roomId);
  
    //             `,
    //             {
    //                 replacements: { userId, roomId },
    //                 type: 'INSERT'
    //             }
    //         )
    //         return true;
    //     } catch {
    //         return false;
    //     }
    // }

    async checkUserInRoom (userId: string, roomId: string) {
        try {
            const result = await sequelize.query(
                `
                SELECT 
                user_id 
                FROM users_rooms
                WHERE user_id = :userId
                AND room_id = :roomId;
                `,
                {
                    replacements: { userId, roomId },
                    type: 'SELECT'
                }
            )

            return !!result.length;
        } catch {
            return false;
        }
    }

    getUserSocketIndexesOfRoom (io: Server, roomId: string) {
        const clients = io.sockets.adapter.rooms.get(roomId);
        return [...clients]
    }

    async getUsersBySocketIndexes(indexes: string[]) {

        console.log({indexes}, '_______________ ? __________')
        
        try {
            const sqlIndexes = getSQLRangeFromArray(indexes);
            console.log({sqlIndexes}, 'sqlIndexes ? __________')
            const result = await sequelize.query(
                `
                SELECT 
                users.user_id,
                user_nik,
                socket_id,
                ARRAY_AGG(role_name) as user_roles
                FROM users_rooms
                LEFT JOIN users ON users.user_id = users_rooms.user_id
                LEFT JOIN users_roles ON users.user_id = users_roles.user_id
                LEFT JOIN roles ON roles.role_id = users_roles.role_id
                WHERE socket_id IN (:indexes)
                GROUP BY users.user_id, socket_id;
                `,
                {
                    replacements: {indexes},
                    type: 'SELECT'
                }
            )

            return result;
        } catch {
            return null;
        }
    }
}

export const chatService = new ChatService()