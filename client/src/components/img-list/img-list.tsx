import { MouseEventHandler } from 'react';
import { Image, ImageList, ItemLi } from './img-list-style';
import { SERVER_URL } from '../../const/const';
import { ImageCC } from '../../store/images-api';

type ImageItemType = {
  item: ImageCC;
  handleImgClick: MouseEventHandler<HTMLImageElement>;
};

function ImgItem({ item, handleImgClick }: ImageItemType) {
  return <Image onClick={handleImgClick} src={`${SERVER_URL}${item.imagePath}`} />;
}

type ImgListProps = {
  pictures: ImageCC[];
  handleImgClick: (pic: ImageCC) => void;
  info?: boolean;
};
export function ImgList({ pictures, info, handleImgClick }: ImgListProps) {

  console.log({pictures})
  const imageElements = pictures.map((item) => (
    <ItemLi info={info} key={item.imageId}>
      <ImgItem item={item} handleImgClick={() => handleImgClick(item)} />
    </ItemLi>
  ));

  return <ImageList info={info}>{imageElements}</ImageList>;
}
