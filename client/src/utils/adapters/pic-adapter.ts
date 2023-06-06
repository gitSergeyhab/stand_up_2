import { ImageCC, ImageDataCC, ImageDataSC, ImageSC, PictureCC, PictureSC } from '../../types/pic-types';

export const adaptPictureToClient = (data: PictureSC): PictureCC => ({
  id: data.picture_id,
  src: data.picture_path,
});


export const adaptImageToClient = (data:ImageSC): ImageCC => ({
  imageId: data.image_id,
  imagePath: data.image_path
});



export const adaptImageDataToClient = (result: ImageDataSC): ImageDataCC => ({
  ...result,
  list: result.list.map(adaptImageToClient),
  count: +result.count
});

