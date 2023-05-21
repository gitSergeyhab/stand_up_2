import { Router } from 'express'
import { comedianController } from '../controllers/comedians-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { imageUploader } from '../utils/image-uploader';

const comedianRouter =  Router();

comedianRouter.get('/', comedianController.getComedians);
comedianRouter.get('/search', comedianController.searchComedianByNames);

comedianRouter.get('/:id', comedianController.getComedianById);
comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);
// comedianRouter.get('/:id/events', comedianController.getEventsByComedianId);
comedianRouter.get('/:id/shows', comedianController.getShowsByComedianId);
comedianRouter.get('/:id/events', comedianController.getEventsByComedianId);

comedianRouter.post('/', imageUploader.single('image'), asyncHandler(comedianController.addComedian));








export { comedianRouter };