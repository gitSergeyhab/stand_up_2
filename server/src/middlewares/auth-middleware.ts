import { Request, Response, NextFunction } from "express";
import { TokenType } from "../const";
import { ApiError } from "../custom-errors/api-error";
import { tokenService } from "../service/token-service";
import { UserPseudoType } from "../types";

type ReqUser = Request & {user: UserPseudoType}

export const authMiddleware = (req: ReqUser, res: Response, next: NextFunction) => {

    try {

        if (req.method === 'OPTIONS') {
            next();
        }
    
        const token = tokenService.getTokenFromRequest({req});

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken({token, type: TokenType.Access});

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        //!!! activated !!!
        // if (!userData.user_activated) {
        //     return next(ApiError.BadRequest('you need to activate your account by clicking on the link sent to your email')); 
        // }

        next();

    } catch {
        throw ApiError.UnauthorizedError()
    }
}