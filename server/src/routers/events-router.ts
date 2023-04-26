import { Router } from 'express'
import { eventsController } from '../controllers/events-controller';

const eventsRouter =  Router();

eventsRouter.get('/:id', eventsController.getEventById);
eventsRouter.get('/', eventsController.getEventsByQuery);


// comedianRouter.get('/:id', comedianController.getComedianById);
// comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);



export { eventsRouter };