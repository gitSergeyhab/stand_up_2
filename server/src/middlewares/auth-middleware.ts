import { Request, Response, NextFunction } from "express";
import { TokenType } from "../const/const";
import { ApiError } from "../custom-errors/api-error";
import { tokenService } from "../service/token-service";
import { UserPseudoType } from "../types";

type ReqUser = Request & {user: UserPseudoType}

// type RequestUserId = Request & {user_id: string}

export const authMiddleware = (req: ReqUser, res: Response, next: NextFunction) => {
    console.log('__________!_______________authMiddleware__________!_______________')

    try {

        if (req.method === 'OPTIONS') {
            next();
        }
        // console.log({req})
        // console.log(req.headers, '_________req.headers')
        
        const token = tokenService.getTokenFromRequest({req});
        console.log({token})

        if (!token) {
            console.log('__________!_______________no token__________!_______________')

            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken({token, type: TokenType.Access});

        if (!userData) {
            console.log('__________!_______________no userData__________!_______________')

            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;

        //!!! activated !!!
        // if (!userData.user_activated) {
        //     return next(ApiError.BadRequest('you need to activate your account by clicking on the link sent to your email')); 
        // }

        next();

    } catch {
        throw ApiError.UnauthorizedError()
    }
}