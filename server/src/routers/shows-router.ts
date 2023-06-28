import { Router } from 'express'
import { showsController } from '../controllers/shows-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';
import { authMiddleware } from '../middlewares/auth-middleware';
import { userMiddleware } from '../middlewares/user-middleware';

const showsRouter =  Router();

showsRouter.get('/', userMiddleware, asyncHandler(showsController.getShows));
showsRouter.post('/rate-show', authMiddleware, asyncHandler(showsController.rateShow));
// showsRouter.get('/search', showsController.searchShowsByNames);

showsRouter.get('/:id', userMiddleware, asyncHandler(showsController.getShowById) );
showsRouter.get('/:id/votes', showsController.getVotesByShowId);
showsRouter.post('/',  imageUploader.single('image'), asyncHandler(showsController.addShow));
showsRouter.put('/:id', imageUploader.single('image'), asyncHandler(showsController.changeShow));





export { showsRouter };