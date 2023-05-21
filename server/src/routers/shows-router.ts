import { Router } from 'express'
import { showsController } from '../controllers/shows-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';

const showsRouter =  Router();

showsRouter.get('/', showsController.getShowsByQuery);
// showsRouter.get('/search', showsController.searchShowsByNames);

showsRouter.get('/:id', showsController.getShowById);
showsRouter.get('/:id/votes', showsController.getVotesByShowId);
showsRouter.post('/',  imageUploader.single('image'), asyncHandler(showsController.addShow));





export { showsRouter };