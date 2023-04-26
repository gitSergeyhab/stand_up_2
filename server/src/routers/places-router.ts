import { Router } from 'express'
import { placesController } from '../controllers/places-controller';

const placesRouter =  Router();

placesRouter.get('/', placesController.getPlacesByQuery);
placesRouter.get('/search', placesController.searchPlacesByName);
placesRouter.get('/:id', placesController.getPlaceById);


export { placesRouter };