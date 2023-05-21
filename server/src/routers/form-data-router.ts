import { Router } from 'express'
import { formDataController } from '../controllers/form-data-controller';

const formDataRouter =  Router();


formDataRouter.get('/preload', formDataController.getPreloadForm);


export { formDataRouter };