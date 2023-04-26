import { ParsedQs } from 'qs';
import { Role, TokenType } from "../const";
import { ApiError } from "../custom-errors/api-error";
import { sequelize } from "../sequelize";
import { UserPseudoType } from "../types";
import { crypt } from "../utils/bcrypt-utils";
import { mailService } from "./mail-service";
import { tokenService } from "./token-service";
import { collectWhere, getWhereActivated, getWhereCountry, getWhereStatus, getWhereYearsBetween } from "../utils/sql-where-utuls";
import { getDataFromSQL, getNeedYears } from "../utils/sql-utils";



/**
 * создает ссылку для активации профиля пользователя
 * @param hashPassword 
 * @returns 
 */

const generateActivateLink = (hashPassword: string) => {
    const length = Math.ceil(hashPassword.length / 10); ;
    const date = Date.now();
    return `${hashPassword.slice(0,  length)}-${date}-activate`
};

const getUserDTO = (user: UserPseudoType) => ({...user, user_password: 'no way'});


class UserService {

    async findUserByNik({nik} : {nik: string}) {
        const user = await sequelize.query(
            `
            SELECT user_id FROM users
            WHERE user_nik = :nik;
            `,
            {
                type: 'SELECT',
                replacements: {nik}
            }
        );

        return user.length ? user[0] : null // { user_id: '46' }
    }

    async findUserByEmail({email} : {email: string}) {
        //!!! WHERE LOWER(user_email) = LOWER(:email)
        const user = await sequelize.query(
            `
            SELECT user_id FROM users
            WHERE user_email = :email;
            `,
            {
                type: 'SELECT',
                replacements: {email}
            }
        );

        return user.length ? user[0] : null; // { user_id: '46' }
    }


    async registration ({email, nik, password}: {email: string, nik: string, password: string}) {

        //1. проверяет, что еще нет юзера с такими  nik и email
        const userByNik = await this.findUserByNik({nik})
        const userByEmail = await this.findUserByEmail({email})

        const errors = [];

        if (userByNik) {
            errors.push(`user with nik: "${nik}" has already exist`);
        };
        if (userByEmail) {
            errors.push(`user with email: "${email}" has already exist`);
        };

        //2. если есть выдает ошибку
        if (errors.length) {
            throw ApiError.BadRequest('registration error', errors)
        }
        //2.хеширует пароль
        const hashPassword = await crypt.hash(password);
        //3.создает ссылку для активации
        const activationLink = generateActivateLink(hashPassword);


        //4.создает юзера и ! возвращает user_id, user_email, user_activated
        const users = await sequelize.query(
            `
            INSERT INTO users(user_password, user_email, user_nik, user_activation_link) 
            VALUES (:hashPassword, :email, :nik, :activationLink)
            RETURNING user_id, user_email, user_activated
            ;
            `, 
            {
                type: 'INSERT',
                replacements: {nik, email, hashPassword, activationLink}
            }
        );

        const user = users[0][0] as UserPseudoType // на свмом деле пока без ролей



        // добавляет роль юзер и достает обновленного юзера
        await userService.addRoleToUser({id: user.user_id, role: Role.User})
        const userWithRoles = await userService.findUserDataById({id: user.user_id});

        //5.отправляет на почту ссылку для регистрации

        // const link = `${process.env.API_URL}/api/users/activate/${activationLink}`;
        // await mailService.sendActivationMail({email, link}); // не работает - нужен рассылочный сервис !!!
        await mailService.sendActivationMailImitation({email, link: activationLink}); // пока не настроен sendActivationMail !!!

        const userDTO = getUserDTO(userWithRoles as unknown as UserPseudoType) ; //!

        //6.создает токены
        const {accessToken, refreshToken} = tokenService.generateTokens({userDTO});
        //7.создает / обновляет токены в БД
        await tokenService.saveToken({user_id: userDTO.user_id , refreshToken});

        //8.возвращает токены и юзера
        return {
            accessToken, refreshToken,
            user: userDTO
        }
    }

    async addRoleToUser({id, role} : {id: string, role: Role}) {

        const roles = await sequelize.query(
            `
            SELECT role_id FROM roles WHERE role_name = :role
            `,
            {
                type: 'SELECT',
                replacements: {role}
            }
        );

        const {role_id} = (roles[0] as unknown as {role_id: string})

        if (!role_id ) {
            throw ApiError.BadRequest(`Role ${role} does not exist`)
        }

        await sequelize.query(
            `
            INSERT INTO users_roles 
            VALUES(:id, :role_id);
            `, 
            {
                type: 'INSERT',
                replacements: {id, role_id}
            }
        )
    }


    async activate({activationLink} : {activationLink: string}) {
        const users = await sequelize.query(
            `
            SELECT user_id FROM users
            WHERE user_activation_link = :activationLink;
            `,
            {
                type: 'SELECT',
                replacements: {activationLink}
            }
        );

        if(!users.length) {
            throw ApiError.BadRequest(`There is not user with this activation Link: ${activationLink}`)
        }

        await sequelize.query(
            `
            UPDATE users
            SET user_activated = true;
            `, 
            {
                type: 'UPDATE'
            }
        );
    }

    async login({email, password}: {email: string, password: string}) {
        const user = await sequelize.query(
            `
            SELECT 
            user_id, user_email, user_nik, user_password, user_avatar, user_activated,
            JSON_AGG(role_name) as roles
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN roles USING(role_id)
            WHERE LOWER(user_email) = LOWER(:email)
            GROUP BY user_id;
            `,
            {
                type: 'SELECT',
                replacements: { email }
            }
        );

        if (!user.length) {
            throw ApiError.BadRequest(`There is not user with email ${email}`);
        }

        const theUser = user[0] as unknown as UserPseudoType;

        const isPasswordCorrect = await crypt.compare(password, theUser.user_password);

        if (!isPasswordCorrect) {
            throw ApiError.BadRequest('The password is wrong');
        }

              //!!! activated !!!
        // if (!theUser.user_activated) {
        //     throw ApiError.BadRequest('you need to activate your account by clicking on the link sent to your email');
        // }

        const userDTO = getUserDTO(theUser);
        const tokens = tokenService.generateTokens({userDTO});

        await tokenService.saveToken({user_id: userDTO.user_id, refreshToken: tokens.refreshToken});
        // console.log({tokens})

        return { ...tokens, user: userDTO }
    }

    async logout({refreshToken} : { refreshToken: string }) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const token = await tokenService.removeRefreshToken({refreshToken})
        return token;
    }

    async refreshToken({refreshToken} : { refreshToken: string }) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateToken({token: refreshToken, type: TokenType.Refresh});
        const tokenFromDB = await tokenService.findTokenByToken({refreshToken});

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await userService.findUserDataById({id: (userData as UserPseudoType).user_id});

        const userDTO = getUserDTO(user as unknown as UserPseudoType);

        const newTokens = tokenService.generateTokens({userDTO});
        await tokenService.saveToken({ user_id: userDTO.user_id, refreshToken: newTokens.refreshToken });

        return { ...newTokens, user: userDTO };
    }


    async findUserDataById ({id} : {id: string}) {

        if (!id) {
            throw ApiError.BadRequest('id does not exist')
        }
        
        const users = await sequelize.query(
            `
            SELECT 
            user_id, user_email, user_nik, user_password, user_avatar, user_activated,
            JSON_AGG(role_name) as roles
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN roles USING(role_id)
            WHERE user_id = :id
            GROUP BY user_id
            `,
            {
                type: 'SELECT',
                replacements: {id}
            }
        );

        if (!users.length) {
            throw ApiError.BadRequest(`There is not user with id : ${id}`)
        }

        return users[0];
    }

    async findUserById ({id} : {id: string}) {

        if (!id) {
            throw ApiError.BadRequest('id does not exist')
        }

        const users = await sequelize.query(
            `
            SELECT 
                user_id, 
                user_email, user_password, user_nik, user_first_name, user_last_name, user_city, user_avatar, user_date_birth, user_description, user_date_registration, user_activated,
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
            throw ApiError.BadRequest(`There is not user with id : ${id}`)
        }

        return users[0];
    }

    async findUsersByQuery({query} : { query: ParsedQs }){
        const {year_from, year_to, activated, country_id} = query;

        const years = getNeedYears(year_from, year_to);

        const whereYears = getWhereYearsBetween(years);
        const whereActivated = getWhereActivated(activated);
        const whereCountry = getWhereCountry(country_id);

        const where = collectWhere([whereActivated, whereCountry, whereYears])

        const result = await sequelize.query(
            `
            SELECT
            user_id, user_nik, user_email, user_avatar, user_activated, user_date_birth,
            country_id, country_name,
            JSON_AGG ( role_name ) AS roles
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN countries USING(country_id)
            LEFT JOIN roles USING(role_id)
            ${where}
            GROUP BY user_id, country_name
            ;

            SELECT COUNT(user_id) 
            FROM users
            ${where}
            ;`, 
            {
                type: 'SELECT',
                replacements: {
                    activated, country_id, 
                    year_from: years ? years.yearFrom : '', 
                    year_to:  years ? years.yearTo : '',
                }
            }
        );

        const data = getDataFromSQL(result, 'users');

        if (!+data.count) { // data.count -> type -> string -> !+"0"
            throw ApiError.NotFound('there are not users with these params ')
        }
        
        return data;
    }

    async findUsersByQueryWithRoles({query} : { query: ParsedQs }) {

        const {year_from, year_to, role, activated, country_id} = query;

        const years = getNeedYears(year_from, year_to);

        const whereYears = getWhereYearsBetween(years);
        const whereActivated = getWhereActivated(activated);
        const whereCountry = getWhereCountry(country_id);

        const whereRole = `
        user_id IN (
            SELECT user_id
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN roles USING(role_id)
            WHERE LOWER(role_name) = LOWER(:role)
            )
        `

        const where = collectWhere([whereActivated, whereCountry, whereRole, whereYears]);

        const result = await sequelize.query(
            `
            SELECT 
            user_id, user_nik, user_email, user_avatar, user_activated, user_date_birth,
            country_id, country_name,
            JSON_AGG ( role_name ) AS roles
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN countries USING(country_id)
            LEFT JOIN roles USING(role_id)
            ${where}
            GROUP BY user_id, country_name
            ;

            SELECT COUNT(DISTINCT user_id) 
            FROM users
            LEFT JOIN users_roles USING(user_id)
            LEFT JOIN roles USING(role_id)
            ${where}
            ;`, 
            {
                type: 'SELECT',
                replacements: {
                    role, activated, country_id, 
                    year_from: years ? years.yearFrom : '', 
                    year_to:  years ? years.yearTo : '',
                }
            }
        );


        const data = getDataFromSQL(result, 'users');

        if (!+data.count) { // data.count -> type -> string -> !+"0"
            throw ApiError.NotFound('there are not users with these params ')
        }

        return data;
    }
}

export const userService = new UserService();