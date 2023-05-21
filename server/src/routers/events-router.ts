import { Router } from 'express'
import { eventsController } from '../controllers/events-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';

const eventsRouter =  Router();

eventsRouter.get('/:id', eventsController.getEventById);
eventsRouter.get('/', eventsController.getEventsByQuery);

eventsRouter.post('/',  imageUploader.single('image'), asyncHandler(eventsController.addEvent));

// comedianRouter.get('/:id', comedianController.getComedianById);
// comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);



export { eventsRouter };