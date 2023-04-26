import { PictureCC, PictureSC } from '../../types/pic-types';

export const adaptPictureToClient = (data: PictureSC): PictureCC => ({
  id: data.picture_id,
  src: data.picture_path,
});
