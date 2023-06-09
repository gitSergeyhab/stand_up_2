import { Router } from 'express'
import { comedianController } from '../controllers/comedians-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { imageUploader } from '../utils/image-uploader';

const comedianRouter =  Router();

comedianRouter.get('/', comedianController.getComedians);
comedianRouter.get('/search', comedianController.searchComedianByNames);

comedianRouter.get('/:id', asyncHandler(comedianController.getComedianById));
comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);
comedianRouter.get('/:id/ratings', asyncHandler(comedianController.getShowsRatingsByComedianId));
comedianRouter.get('/:id/rating-data', asyncHandler(comedianController.getShowsRatingDataByComedianId));
comedianRouter.put('/:id', imageUploader.single('image'), asyncHandler(comedianController.changeComedian));
// comedianRouter.get('/:id/events', comedianController.getEventsByComedianId);
// comedianRouter.get('/:id/shows', comedianController.getShowsByComedianId);
// comedianRouter.get('/:id/events', comedianController.getEventsByComedianId);

comedianRouter.post('/', imageUploader.single('image'), asyncHandler(comedianController.addComedian));








export { comedianRouter };