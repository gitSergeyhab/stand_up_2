import { sequelize } from "../sequelize";
import { Request, Response, NextFunction } from "express";
import { OrderValues, StatusCode, SQLFunctionName } from "../const";
import { crypt } from "../utils/bcrypt-utils";
import { userSchema } from "../schemas/user-schema";
import { userService } from "../service/user-service";
import { tokenService } from "../service/token-service";





class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        const {email, password, nik} = req.body;
        const user = await userService.registration({email, nik, password});
        tokenService.setRefreshTokenToCookie({res, refreshToken: user.refreshToken});
        return res.status(StatusCode.Added).json(user);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;;
        const user = await userService.login({email, password});
        tokenService.setRefreshTokenToCookie({res, refreshToken: user.refreshToken});
        return res.status(StatusCode.Ok).json(user);
    }

    async logout (req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.cookies.refreshToken as string;
        await userService.logout({refreshToken})
        res.clearCookie('refreshToken');
        return res.status(StatusCode.Ok).json({message: 'you are now logged out'});
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        const {link} = req.params;
        await userService.activate({activationLink: link});
        return res.redirect(process.env.CLIENT_URL);
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {


        console.log('refreshToken --- start ---')

        const refreshToken = req.cookies.refreshToken as string;
        const user = await userService.refreshToken({refreshToken});
        tokenService.setRefreshTokenToCookie({res, refreshToken: user.refreshToken});
        console.log({user}, 'refreshToken --- end ---')
        return res.status(StatusCode.Ok).json(user);
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const user = await userService.findUserById({id});
        return res.status(StatusCode.Ok).json(user)
    }

    async getUsersByQueries(req: Request, res: Response, next: NextFunction) {
        const query = req.query
        const {role} = query;
        const usersWithCount = role ? 
            await userService.findUsersByQueryWithRoles({query}) :
            await userService.findUsersByQuery({query});
        return res.status(StatusCode.Ok).json(usersWithCount);
    }
}


export const userController = new UserController();