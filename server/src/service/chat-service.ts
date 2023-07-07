import { Server } from "socket.io";
import { sequelize } from "../sequelize";
import { getSQLRangeFromArray } from "../utils/sql-utils";

class ChatService {
    async getMessageDataById (id: number) {
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
                    WHERE message_id = :id
                    GROUP BY chat_messages.message_id, user_nik, destination, filename;
                `, 
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