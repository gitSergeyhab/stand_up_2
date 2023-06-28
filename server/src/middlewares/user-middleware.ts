import { Request, Response, NextFunction } from "express";
import { TokenType } from "../const/const";
import { ApiError } from "../custom-errors/api-error";
import { tokenService } from "../service/token-service";
import { UserPseudoType } from "../types";

type ReqUser = Request & {user: UserPseudoType}

// type RequestUserId = Request & {user_id: string}

export const userMiddleware = (req: ReqUser, res: Response, next: NextFunction) => {
    console.log('__________!userMiddleware!_______________')

    try {

        if (req.method === 'OPTIONS') {
            next();
        }
        // console.log({req})
        console.log(req.headers, '_________req.headers')
        
        const token = tokenService.getTokenFromRequest({req});
        console.log({token})

        if (!token) {
            console.log('__________!_______________no token__________!_______________');
            return next()
        }

        const userData = tokenService.validateToken({token, type: TokenType.Access});
        req.user = userData || null;
        next();

    } catch {
        throw ApiError.UnauthorizedError()
    }
}