import { Router } from 'express'
import { eventsController } from '../controllers/events-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';

const eventsRouter =  Router();

eventsRouter.get('/:id', asyncHandler(eventsController.getEventById));
// eventsRouter.get('/', asyncHandler(eventsController.getEventsByQuery));
// eventsRouter.get('/:type/:id', asyncHandler(eventsController.getEvents));
eventsRouter.get('/', asyncHandler(eventsController.getEvents));

eventsRouter.post('/',  imageUploader.single('image'), asyncHandler(eventsController.addEvent));

// comedianRouter.get('/:id', comedianController.getComedianById);
// comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);



export { eventsRouter };