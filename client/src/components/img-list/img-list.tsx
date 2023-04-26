import { MouseEventHandler } from 'react';
// import { ImageList, ImageListItem } from '@mui/material';

import { PictureType } from '../../types/types';
import { Image, ImageList, ItemLi } from './img-list-style';

type ImageItemType = {
  item: PictureType;
  handleImgClick: MouseEventHandler<HTMLImageElement>;
};

function ImgItem({ item, handleImgClick }: ImageItemType) {
  return <Image onClick={handleImgClick} src={`/assets${item.src}`} />;
}

type ImgListProps = {
  pictures: PictureType[];
  handleImgClick: (pic: PictureType) => void;
  info?: boolean;
};
export function ImgList({ pictures, info, handleImgClick }: ImgListProps) {
  const imageElements = pictures.map((item) => (
    <ItemLi info={info} key={item.id}>
      <ImgItem item={item} handleImgClick={() => handleImgClick(item)} />
    </ItemLi>
  ));

  return <ImageList info={info}>{imageElements}</ImageList>;
}
