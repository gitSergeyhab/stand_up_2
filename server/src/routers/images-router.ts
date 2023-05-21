import { Router } from 'express'
import { imagesController } from '../controllers/images-controller';
import { imageUploader } from '../utils/image-uploader';

const imagesRouter =  Router();


imagesRouter.get('/', imagesController.getImageById);
imagesRouter.post('/', imageUploader.single('image'), imagesController.postImage);


export { imagesRouter };