import { Router } from "express";
import { newsCommentsController } from "../controllers/news-comments-controller";
import { asyncHandler } from "../middlewares/async-handler";
import { authMiddleware } from "../middlewares/auth-middleware";
import { imageUploader } from "../utils/image-uploader";
import { userMiddleware } from "../middlewares/user-middleware";

const newsCommentRouter = Router();

newsCommentRouter.get('/:news_id', userMiddleware, asyncHandler(newsCommentsController.getNewsCommentsByNewsId));
newsCommentRouter.post('/', authMiddleware, imageUploader.single('image'), asyncHandler(newsCommentsController.addNewsComment));
newsCommentRouter.put('/:id', authMiddleware, imageUploader.single('image'), asyncHandler(newsCommentsController.changeNewsComment));
newsCommentRouter.patch('/:id', authMiddleware,  asyncHandler(newsCommentsController.toggleNewsCommentDeleteStatus));

export {newsCommentRouter}