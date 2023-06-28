import { sequelize } from "../sequelize";

class ContentService {
    async deleteShowRate(user_id: string, showId: string) {
        await sequelize.query(
            `
            DELETE FROM show_ratings
            WHERE user_id = :user_id AND show_id = :showId;
            `, 
            {
                replacements: {user_id, showId},
                type: 'DELETE'
            }
        )
    }

    async addShowRate(user_id: string, showId: string, rate: number) {
        await sequelize.query(
            `
            INSERT INTO show_ratings(user_id, show_id, show_rate)
            VALUES (:user_id, :showId, :rate)
            `, 
            {
                replacements: {user_id, showId, rate},
                type: 'INSERT'
            }
        )
    }
}

export const contentService = new ContentService();