import {  MouseEventHandler } from 'react';
import { SERVER_URL } from '../../const/const';
import { ImageCC } from '../../types/pic-types';
import { GalleryInfo, GalleryInfoImg, GalleryInfoLi, GalleryInfoLink } from './img-list-info-style';


type GalleryItemProps = {
  picture: ImageCC;
  onClick: () => void;
};

function GalleryItem({onClick, picture}: GalleryItemProps) {



  const {imagePath} = picture;
  const src = `${SERVER_URL}${imagePath}`

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault()
    onClick();
  }

  const imageElement =  (
    <GalleryInfoLink to="/" onClick={handleLinkClick} >
      <GalleryInfoImg src={src}  />
    </GalleryInfoLink>
  )


  return (
    <GalleryInfoLi >
      {imageElement}
    </GalleryInfoLi>
  )

}

type ImgListProps = {
  pictures: ImageCC[];
  handleImgClick: (pic: ImageCC) => void;

};

export function ImgListInfo({ pictures, handleImgClick, }: ImgListProps) {
  const imageElements = pictures.map((item) => (
   <GalleryItem
      onClick={() => handleImgClick(item)}
      picture={item}
      key={item.imageId}
    />
  ));

  return <GalleryInfo>{imageElements}</GalleryInfo>;
}
