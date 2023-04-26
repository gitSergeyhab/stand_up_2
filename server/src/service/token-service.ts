import jwt from 'jsonwebtoken';
import { TokenExpire, TokenType } from '../const';
import { ApiError } from '../custom-errors/api-error';
import { sequelize } from '../sequelize';
import { UserDTO_SC, UserPseudoType } from '../types';
import { userService } from './user-service';
import { Request, Response, NextFunction } from "express";





class TokenService {
    generateTokens({userDTO} : {userDTO: UserPseudoType}) {
        const accessToken = jwt.sign(userDTO, process.env.JWT_ACCESS_SECRET, {expiresIn: TokenExpire.Access});
        const refreshToken = jwt.sign(userDTO, process.env.JWT_REFRESH_SECRET, {expiresIn: TokenExpire.Refresh});
        return { accessToken, refreshToken };
    }

    validateToken({token, type}: {token: string, type: TokenType}) {
        try {
            const secret = type === TokenType.Access ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
            const userData = jwt.verify(token, secret);
            return userData as UserPseudoType;
        } catch {
            return null;
        }
    }

    getTokenFromRequest({req} : {req: Request}) {
        const authHeader = req.headers.authorization;
        return authHeader ? authHeader.split(' ')[1] : null
    }

    setRefreshTokenToCookie({res, refreshToken} : {res: Response, refreshToken: string}) {
        res.cookie('refreshToken', refreshToken,  { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } )
    }

    async findTokenByUserId({user_id} : {user_id: string}) {
        const token = await sequelize.query(
            `
            SELECT * FROM tokens
            WHERE user_id = :user_id; 
            `, 
            {
                type: 'SELECT',
                replacements: {user_id}
            }
        )
        return token.length ? token[0] : null;
    }

    async updateToken({user_id, refreshToken} : { user_id: string, refreshToken: string }) {
        const token =  await sequelize.query(
            `
            UPDATE tokens
            SET refresh_token = :refreshToken
            WHERE user_id = :user_id;
            `, 
            {
                type: 'UPDATE',
                replacements: { user_id, refreshToken }
            }
        )
        return token;
    }

    async createToken({user_id, refreshToken} : { user_id: string, refreshToken: string }) {
        const token =  await sequelize.query(
            `
            INSERT INTO tokens(user_id, refresh_token) VALUES
            (:user_id, :refreshToken);
            `, 
            {
                type: 'INSERT',
                replacements:  { user_id, refreshToken }
            }
        )
        return token;
    }

    async saveToken({user_id, refreshToken}: {user_id: string, refreshToken: string}) {
        // ищет в токенах токен с user_id
        const oldTokens = await this.findTokenByUserId({user_id})
        // если уже есть, то обновляет
        if (oldTokens) {
            const updatedToken = await this.updateToken({user_id, refreshToken})
            return updatedToken;
        }
        // если нет, то создает новый
        const newToken = await this.createToken({user_id, refreshToken})
        return newToken;
    }

    async removeRefreshToken({refreshToken} : { refreshToken: string }) {
        const token = await sequelize.query(
            `
            DELETE FROM tokens
            WHERE refresh_token = :refresh_token;
            `,
            {
                type: 'DELETE',
                replacements: {refresh_token: refreshToken}
            }
        );


        return token;
    }


    async findTokenByToken({refreshToken} : { refreshToken: string }) {
        const tokens = await sequelize.query(
            `
            SELECT * FROM tokens WHERE refresh_token = :refresh_token;
            `, 
            {
                type: 'SELECT',
                replacements: {refresh_token: refreshToken}
            }
        );

        if (!tokens || !tokens.length) {
            throw ApiError.UnauthorizedError();
        }

        return tokens[0];
    }

}

export const tokenService = new TokenService();