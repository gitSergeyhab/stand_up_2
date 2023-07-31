import { Router } from 'express'
import { placesController } from '../controllers/places-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { imageUploader } from '../utils/image-uploader';
import { authMiddleware } from '../middlewares/auth-middleware';

const placesRouter =  Router();

placesRouter.get('/', asyncHandler(placesController.getPlaces));
placesRouter.get('/search', placesController.searchPlacesByName);
placesRouter.get('/:id', asyncHandler(placesController.getPlaceById));
placesRouter.post('/', authMiddleware, imageUploader.single('image'), asyncHandler(placesController.addPlace));
placesRouter.put('/:id', authMiddleware, imageUploader.single('image'), asyncHandler(placesController.changePlace));



export { placesRouter };