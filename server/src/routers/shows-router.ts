import { Router } from 'express'
import { showsController } from '../controllers/shows-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';

const showsRouter =  Router();

showsRouter.get('/', asyncHandler(showsController.getShows));
// showsRouter.get('/search', showsController.searchShowsByNames);

showsRouter.get('/:id', asyncHandler(showsController.getShowById) );
showsRouter.get('/:id/votes', showsController.getVotesByShowId);
showsRouter.post('/',  imageUploader.single('image'), asyncHandler(showsController.addShow));
showsRouter.put('/:id', imageUploader.single('image'), asyncHandler(showsController.changeShow));





export { showsRouter };