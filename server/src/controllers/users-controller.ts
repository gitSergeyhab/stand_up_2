import { sequelize } from "../sequelize";
import { Request, Response, NextFunction } from "express";
import { OrderValues, StatusCode, SQLFunctionName } from "../const/const";
import { crypt } from "../utils/bcrypt-utils";
import { userSchema } from "../schemas/user-schema";
import { userService } from "../service/user-service";
import { tokenService } from "../service/token-service";
import { UserPseudoType } from "../types";
import { ApiError } from "../custom-errors/api-error";
import { contentService } from "../service/content-service";





class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        const {email, password, nik} = req.body;
        const user = await userService.registration({email, nik, password});
        tokenService.setRefreshTokenToCookie({res, refreshToken: user.refreshToken});
        return res.status(StatusCode.Added).json(user);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
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

    async getUsersByQueries(req: Request & {user: []}, res: Response, next: NextFunction) {
        console.log('{getUsersByQueries}___________________________')
        const query = req.query
        const {role} = query;
        console.log({role}, req.user, '________________-------________________')
        const usersWithCount = role ? 
            await userService.findUsersByQueryWithRoles({query}) :
            await userService.findUsersByQuery({query});
        return res.status(StatusCode.Ok).json(usersWithCount);
    }

    // async getUserInfo(req: Request & {user: UserPseudoType}, res: Response) {
    //     try {
    //         const id = req.user?.user_id;

    //         if (!id) {
    //             throw ApiError.UnauthorizedError()
    //         }

    //         const result = await sequelize.query(`
    //             SELECT show_id, event_id, place_id 
    //             FROM reviews
    //             WHERE user_id = :id;

    //             SELECT show_id AS id, show_rate AS rate 
    //             FROM show_ratings 
    //             WHERE user_id = :id; 
    //         `, 
    //             {
    //                 replacements: {id},
    //                 type: "SELECT"
    //             }
    //         );

    //         type Result = {id?: string; rate?: number; show_id?: string; event_id?: string; place_id?: string}[];

    //         const getDataByField = (res: Result, field: string) => (res as Result).filter((item) => item[field]).map((item) => item[field])

    //         const shows = getDataByField(result, 'show_id');
    //         const events = getDataByField(result, 'event_id');
    //         const places = getDataByField(result, 'place_id');
    //         const rates = (result as Result).filter((item) => item.id);
    //         const data = {reviews: {shows, events, places}, rates}


    //         return res.status(StatusCode.Ok).json(data)

    //     } catch (err) {
    //         throw ApiError.BadRequest('getUserInfo')
    //     }
    // }




}


export const userController = new UserController();