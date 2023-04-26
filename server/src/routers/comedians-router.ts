import { Router } from 'express'
import { comedianController } from '../controllers/comedians-controller';

const comedianRouter =  Router();

comedianRouter.get('/', comedianController.getComedians);
comedianRouter.get('/search', comedianController.searchComedianByNames);

comedianRouter.get('/:id', comedianController.getComedianById);
comedianRouter.get('/:id/votes', comedianController.getVotesByComedianId);
// comedianRouter.get('/:id/events', comedianController.getEventsByComedianId);
comedianRouter.get('/:id/shows', comedianController.getShowsByComedianId);







export { comedianRouter };