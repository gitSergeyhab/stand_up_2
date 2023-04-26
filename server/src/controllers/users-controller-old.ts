import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { OrderValues, StatusCode, SQLFunctionName } from "../const";
import { crypt } from "../utils/bcrypt-utils";
import { userSchema } from "../schemas/user-schema";

type UserType = {
    user_email: string,
    user_password: string,
    user_avatar: string,
    user_status: string,
    user_id: string,
    user_nik: string,
}


type UserRequest = Request & {session: {user : UserType | null}}
class UserController {

    async auth(req: UserRequest, res: Response) {
        try {
            if (req.session.user) {
                return res.status(StatusCode.Ok).json({ user: req.session.user });
            } 
            return res.status(StatusCode.NotAuthError).json({ user: null });
        } catch {
            return res.status(StatusCode.ServerError).json({ user: null });
        }

    }

    async logoutUser (req: UserRequest, res: Response) {
        try {
            req.session.user = null;
            return res.status(StatusCode.Ok).json({ user: null });
        } catch(err) {
            console.log('logoutUser', {err})
            return res.status(StatusCode.ServerError).json({ user: null });
        }
    }

    async loginUser(req: UserRequest, res: Response) {
        try {

            const {email, password} = req.body;

            const user = await sequelize.query(
                `
                SELECT user_id, user_nik, user_avatar, user_password, user_status, user_email
                FROM users
                WHERE user_email = :email
                `, 
                {
                    type: 'SELECT',
                    replacements: {email}
                }
            );

            if (!user.length) {
                return res.status(StatusCode.BadRequest).send([`User with email: "${email}" doesn't exist`])
            }


            const isPasswordRight = await crypt.compare(password, (user[0] as unknown as UserType).user_password);

            // console.log({isPasswordRight})


            // console.log(user, isPasswordRight, email, password)

            if (isPasswordRight) {
                console.log('req.session - bef', req.session);
                req.session.user = user[0] as unknown as UserType;
                req.session.user.user_password = 'you know';
                console.log('req.session - aft', req.session);

                const userRes = {...user[0], user_password: 'you know'};
                return res.status(StatusCode.Ok).json({user: userRes});
            }

            return res.status(StatusCode.BadRequest).send(['It is Wrong email/password combination'])

        } catch (err) {
            console.log('err.original.error //', err.message, '//')
            setTimeout(() => res.status(StatusCode.ServerError).send(['Сломаалось :((. Накосячили разработчики... Не беспокойтесь - мы всех уволим )']), 1000)
            // return res.status(StatusCode.ServerError).send(['Сломаалось :((. Накосячили разработчики... Не беспокойтесь - мы всех уволим )'])
        }
    }

    async registerUser(req: Request, res: Response) {

        try {
            const {body} = req;

            const {error} = userSchema.validate(body, {abortEarly: false})

            if (error) {
                const errors = error.details.map((err) => err.message)
                // console.log(errors)
                return res.status(StatusCode.BadRequest).send(errors);
            }

            const {nik, email, password, passwordRepeat} = body;

            const userByNik = await sequelize.query(
                `
                SELECT user_id FROM users
                WHERE user_nik = :nik;
                `,
                {
                    type: 'SELECT',
                    replacements: {nik}
                }
            );

            const userByEmail = await sequelize.query(
                `
                SELECT user_id FROM users
                WHERE user_email = :email
                `,
                {
                    type: 'SELECT',
                    replacements: { email }
                }
            );

            const errors = [];

            if (userByNik.length) {
                errors.push(`user with nik: "${nik}" has already exist`);
            };
            if (userByEmail.length) {
                errors.push(`user with email: "${email}" has already exist`);
            };


            if (errors.length) {
                return res.status(StatusCode.BadRequest).send(errors);
            };

            if (nik && email && password && passwordRepeat) {
                const hashPassword = await crypt.hash(password);
                

                const result = await sequelize.query(
                    `
                    INSERT INTO users(user_password, user_email, user_nik) 
                    VALUES (:hashPassword, :email, :nik);

                    `, 
                    {
                        type: 'INSERT',
                        replacements: {nik, email, hashPassword}
                    }
                )
                return res.status(StatusCode.Added).json({result})
            }

        } catch (err) {
            console.log('err.original.error //', err.message, '//')
            setTimeout(() => res.status(StatusCode.ServerError).send(['Сломаалось :((. Накосячили разработчики... Не беспокойтесь - мы всех уволим )']), 1000)
            // return res.status(StatusCode.ServerError).send(['Сломаалось :((. Накосячили разработчики... Не беспокойтесь - мы всех уволим )'])
        }
        

        


    }


    async getUserById(req: Request, res: Response) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({message: 'there is not id'})
            }

            const users = await sequelize.query(
                `
                SELECT 
                    user_id, 
                    user_email, user_password, user_nik, user_first_name, user_last_name, user_city, user_avatar, user_date_birth, user_description, user_date_registration,
                    country_id, country_name, country_name_en,
                    AVG(show_rate)::real AS avg_rate,
                    get_review_user_data(:id, 3) AS reviews,
                    get_user_views_data(:id, 10) AS latest_views,
                    picture_path,
                    get_resources('user_id', 1) AS resources,
                    get_show_ratings_user_data(:id, 3) AS show_ratings,
                    get_comedian_ratings_user_data(:id, 3) AS comedian_ratings

                FROM users
                LEFT JOIN countries USING(country_id)
                LEFT JOIN show_ratings USING(user_id)
                LEFT JOIN pictures USING(user_id)
                WHERE user_id = :id
                GROUP BY user_id, country_name, country_name_en, picture_path
                `, 
                {
                    replacements: {id},
                    type: 'SELECT'
                }
            )

            if (!users.length) {
                return res.status(StatusCode.NotFoundError).json({message: `there is not user with id = ${id}`})
            }

            return res.status(200).json({user: users[0]});
    
   
        } catch {
            return res.status(500).json({message: 'error get users'})
        }
    }
}


export const userController = new UserController();