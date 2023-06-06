import { Router } from 'express'
import { eventsController } from '../controllers/events-controller';
import { picturesController } from '../controllers/pictures-controller';
import { ratingController } from '../controllers/ratings-controllers';
import { showsController } from '../controllers/shows-controller';
import { asyncHandler } from '../middlewares/async-handler';

const subRouter =  Router();

subRouter.get('/:type/:id/shows', asyncHandler(showsController.getShows));
// subRouter.get('/:type/:id/events', eventsController.getEventsByColumnId);
// subRouter.get('/:type/:id/comedians', eventsController.getEventsByColumnId);
subRouter.get('/:type/:id/events', asyncHandler(eventsController.getEvents));
// subRouter.get('/:type/:id/comedians', eventsController.getEventsByColumnId);
subRouter.get('/:type/:id/pictures', picturesController.getPictureById);

subRouter.get('/:type/:id/ratings', ratingController.getRatings);





export { subRouter };
