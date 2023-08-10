import { sequelize } from "../sequelize";

class LikeService {
    async insertCommentLike (comment_id: string, user_id: string, value: number) {
        const result = await sequelize.query(
            `
            INSERT INTO news_comment_likes 
            (comment_id, user_added_id, value)
            VALUES
            (:comment_id, :user_id, :value)
            RETURNING like_id
            `, 
            {
                replacements: { comment_id, user_id, value },
                type: 'INSERT'
            }
        )
        return result;
    }

    async getUserOfLike (like_id: string)  {
        try {
            const result = await sequelize.query(
                `
                SELECT user_added_id 
                FROM news_comment_likes 
                WHERE like_id = :like_id
                `, 
                {
                    replacements: { like_id },
                    type: 'SELECT'
                }
            )
            return result[0]['user_added_id'];
        } catch (err) {
            console.log({err})
            return null
        }
    }

    async updateCommentLike (like_id: string, user_id: string, value: number) {
        try {
            const result = await sequelize.query(
                `
                UPDATE news_comment_likes 
                SET (value, date_updated) = (:value, CURRENT_TIMESTAMP)
                WHERE like_id = :like_id
                RETURNING like_id, comment_id;
                `, 
                {
                    replacements: { like_id, user_id, value },
                    type: 'INSERT'
                }
            )

            return result[0][0];
        } catch (err) {
            console.log({err})
            return null
        }
    }
}


export const likeService = new LikeService();