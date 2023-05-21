import { NextFunction, Request, Response } from "express";

type ResolveFnType = (req: Request, res: Response, next: NextFunction) => unknown;
type AsyncHandlerType = (fn: ResolveFnType) => (req: Request, res: Response, next: NextFunction) => unknown;

export const asyncHandler: AsyncHandlerType = (fn) => (req, res, next) => {
    // console.log('_________________start asyncHandler___________________');
    return Promise
        .resolve(fn(req, res, next))
        // .catch(next);
        .catch((err) => {
            console.log('_________________asyncHandler catch error___________________=>',{err},'<=_________________asyncHandler catch error___________________');
            next(err)
        })
}
    