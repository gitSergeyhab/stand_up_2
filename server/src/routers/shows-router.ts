import { Router } from 'express'
import { showsController } from '../controllers/shows-controller';

const showsRouter =  Router();

showsRouter.get('/', showsController.getShowsByQuery);
// showsRouter.get('/search', showsController.searchShowsByNames);


showsRouter.get('/:id', showsController.getShowById);
showsRouter.get('/:id/votes', showsController.getVotesByShowId);





export { showsRouter };