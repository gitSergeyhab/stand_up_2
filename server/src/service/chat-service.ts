import { sequelize } from "../sequelize";

class ChatService {
    async getMessageDataById (id: string) {
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
                    ARRAY_AGG(role_name) as user_roles
                FROM chat_messages
                LEFT JOIN users ON users.user_id = chat_messages.user_id
                LEFT JOIN users_roles ON users.user_id = users_roles.user_id
                LEFT JOIN roles ON roles.role_id = users_roles.role_id
                WHERE message_id = :id
                GROUP BY chat_messages.message_id, user_nik
                `, 
                {
                    replacements: {id},
                    type: 'SELECT'
                }
            );

            console.log(result);

            return result;

        } catch (err) {
            console.log({err}, 'getMessageDataById');
            return null;
        }

    }

    async addMessage (userId: string, roomId: string, text: string, isAuto: boolean) {
        try {
            const result = await sequelize.query(
                `
                INSERT INTO chat_messages
                (user_id, room_id, message_text, message_auto) VALUES
                (:userId, :roomId, :text, :isAuto)
                RETURNS message_id;
                `,
                {
                    replacements: {userId, roomId, text, isAuto},
                    type: 'INSERT'
                }
            )

            return result;

        } catch (err) {
            return 0;
        }
    }

    async joinUserToRoom (userId: string, roomId: string) {
        try {
            const result = await sequelize.query(
                `
                    INSERT INTO users_rooms(user_id, room_id) VALUES (:userId, :roomId)
                `,
                {
                    replacements: {userId, roomId},
                    type: 'INSERT'
                }
            )

            return 1;

        } catch (err) {
            return 0;
        }
    }
}

export const chatService = new ChatService()