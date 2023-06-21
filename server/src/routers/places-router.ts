import { Router } from 'express'
import { placesController } from '../controllers/places-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { imageUploader } from '../utils/image-uploader';

const placesRouter =  Router();

placesRouter.get('/', asyncHandler(placesController.getPlaces));
placesRouter.get('/search', placesController.searchPlacesByName);
placesRouter.get('/:id', asyncHandler(placesController.getPlaceById));
placesRouter.post('/', imageUploader.single('image'), asyncHandler(placesController.addPlace));
placesRouter.put('/:id', imageUploader.single('image'), asyncHandler(placesController.changePlace));



export { placesRouter };