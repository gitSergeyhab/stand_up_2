import { Router } from 'express'
import { formDataController } from '../controllers/form-data-controller';
import { asyncHandler } from '../middlewares/async-handler';

const formDataRouter =  Router();


formDataRouter.get('/preload', asyncHandler(formDataController.getPreloadForm));
formDataRouter.get('/preload-countries', asyncHandler(formDataController.getPreloadCountries));
formDataRouter.get('/preload-places', asyncHandler(formDataController.getPreloadPlaces));

export { formDataRouter };