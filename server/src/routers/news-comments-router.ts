import { Router } from "express";
import { newsCommentsController } from "../controllers/news-comments-controller";
import { asyncHandler } from "../middlewares/async-handler";
import { authMiddleware } from "../middlewares/auth-middleware";
import { imageUploader } from "../utils/image-uploader";

const newsCommentRouter = Router();

newsCommentRouter.get('/:news_id', asyncHandler(newsCommentsController.getNewsCommentsByNewsId));
newsCommentRouter.post('/', authMiddleware, imageUploader.single('image'), asyncHandler(newsCommentsController.addNewsComment));
newsCommentRouter.put('/:id', authMiddleware, imageUploader.single('image'), asyncHandler(newsCommentsController.changeNewsComment));

export {newsCommentRouter}