import { Router } from "express";
import { userMiddleware } from "../middlewares/user-middleware";
import { asyncHandler } from "../middlewares/async-handler";
import { mainController } from "../controllers/main-controller";

const mainRouter = Router();

mainRouter.get('/', userMiddleware,  asyncHandler(mainController.getMainData));

export {mainRouter}