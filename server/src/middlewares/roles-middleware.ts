import { Role, TokenType } from "../const";
import { Request, Response, NextFunction } from "express";
import { tokenService } from "../service/token-service";
import { ApiError } from "../custom-errors/api-error";


export const rolesMiddleware = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {

    try {

        if (req.method === 'OPTIONS') {
            next();
        }

        const token = tokenService.getTokenFromRequest({req});

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken({token, type: TokenType.Access})

        if (!userData) {
            return next(ApiError.UnauthorizedError()); 
        }

              //!!! activated !!!
        // if (!userData.user_activated) {
        //     return next(ApiError.BadRequest('you need to activate your account by clicking on the link sent to your email')); 
        // }

        const {roles: rolesFromToken} = userData;
        const matchRoles = rolesFromToken.filter((item) => roles.includes(item));

        if (!matchRoles.length) {
            return next(ApiError.ForbiddenError());
        }

        next();

    } catch {
        throw ApiError.ForbiddenError();
    }

}


