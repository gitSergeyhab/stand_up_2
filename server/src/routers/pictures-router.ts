import { Router } from 'express'
import { picturesController } from '../controllers/pictures-controller';

const pictureRouter =  Router();


pictureRouter.get('/:type/:id', picturesController.getPictureById);


export { pictureRouter };