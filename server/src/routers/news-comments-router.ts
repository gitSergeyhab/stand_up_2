import { Router } from "express";
import { newsCommentsController } from "../controllers/news-comments-controller";
import { asyncHandler } from "../middlewares/async-handler";

const newsCommentRouter = Router();

newsCommentRouter.get('/:news_id', asyncHandler(newsCommentsController.getNewsCommentsByNewsId));

export {newsCommentRouter}