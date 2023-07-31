import { Router } from 'express'
import { newsController } from '../controllers/news-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { userMiddleware } from '../middlewares/user-middleware';
import { imageUploader } from '../utils/image-uploader';
import { authMiddleware } from '../middlewares/auth-middleware';


const newsRouter =  Router();

newsRouter.get('/news/:id', userMiddleware, asyncHandler(newsController.getNewsById));
newsRouter.get('/news-list', asyncHandler(newsController.getNewsList));
newsRouter.post('/', authMiddleware, imageUploader.single('image'),  asyncHandler(newsController.addNews));
newsRouter.put('/:id', authMiddleware, imageUploader.single('image'),   asyncHandler(newsController.changeNews));
export { newsRouter };