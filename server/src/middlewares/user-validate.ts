import { NextFunction, Request, Response } from "express";
import { ApiError } from "../custom-errors/api-error";
import { userSchema } from "../schemas/user-schema";
import { sequelize } from "../sequelize";

export const userValidate = (req: Request, res: Response, next: NextFunction) => {

    const data = req.body;

    const {error} = userSchema.validate(data, { abortEarly: false }); 

    if (error) {
        const errors = error.details.map((item) => item.message)
        throw ApiError.BadRequest('registration error', errors)
    }

    return next();
}