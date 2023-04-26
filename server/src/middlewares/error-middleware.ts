import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../const";
import { ApiError } from "../custom-errors/api-error";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        const {errors: errs, message, status} = err;
        const errors = errs.length ? errs : [message];
        return res.status(status).json({message, errors})
    }
    return res.status(StatusCode.ServerError).json({message: err.message || 'SERVER ERROR. TRY AGAIN LATER'})
}