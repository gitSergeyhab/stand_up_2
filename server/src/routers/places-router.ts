import { Router } from 'express'
import { placesController } from '../controllers/places-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { imageUploader } from '../utils/image-uploader';

const placesRouter =  Router();

placesRouter.get('/', placesController.getPlacesByQuery);
placesRouter.get('/search', placesController.searchPlacesByName);
placesRouter.get('/:id', placesController.getPlaceById);
placesRouter.post('/', imageUploader.single('image'), asyncHandler(placesController.addPlace));



export { placesRouter };