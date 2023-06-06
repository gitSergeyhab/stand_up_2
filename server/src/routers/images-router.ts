import { Router } from 'express'
import { imagesController } from '../controllers/images-controller';
import { imageUploader } from '../utils/image-uploader';
import { asyncHandler } from '../middlewares/async-handler';

const imagesRouter =  Router();


imagesRouter.get('/:type/:id', imagesController.getImageById);
imagesRouter.post('/', imageUploader.single('image'), asyncHandler(imagesController.postImage));
imagesRouter.post('/:type/:id', imageUploader.array('images'),  asyncHandler(imagesController.postImagesByTypeAndId));
imagesRouter.delete('/', asyncHandler(imagesController.removeImagesByIdList))

export { imagesRouter };