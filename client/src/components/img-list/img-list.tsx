import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {  Gallery, GalleryImg, GalleryLi, GalleryLink, GalleryNotLoaded, MarkerButton, MarkerButtonLabel } from './img-list-style';
import { SERVER_URL } from '../../const/const';
import { ImageCC } from '../../types/pic-types';


type DeleteBtnProps = {
  id: string;
  setIdList: Dispatch<SetStateAction<string[]>>;
  hidden?: boolean;
  marker: boolean;
  setMarker: Dispatch<SetStateAction<boolean>>;

}
export function ChoseMarkerBtn({setIdList, id, hidden=true, marker, setMarker}: DeleteBtnProps) {


  const handleBtnClick = () => {
    setMarker((prev) => !prev);
    setIdList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id]
    });

  }

  return (
    <MarkerButtonLabel hidden={hidden}>
      <MarkerButton onClick={handleBtnClick} marker={marker} hidden={hidden}/>
    </MarkerButtonLabel>
  )
}


type GalleryItemProps = {
  picture: ImageCC;
  onClick: () => void;
  idList: string[];
  setIdList: Dispatch<SetStateAction<string[]>>;
  hidden?: boolean;
};

function GalleryItem({onClick, picture, idList, setIdList, hidden}: GalleryItemProps) {
  const [marker, setMarker] = useState(idList.includes(picture.imageId))

  const {ref, inView} = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  const {imagePath} = picture;
  const src = `${SERVER_URL}${imagePath}`

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault()
    onClick();
  }

  const imageElement = inView ? (
    <GalleryLink to="/" onClick={handleLinkClick} >
      <GalleryImg src={src}  />
    </GalleryLink>
  ) : <GalleryNotLoaded/>


  return (
    <GalleryLi ref={ref} marker={marker}>
      <ChoseMarkerBtn
        id={picture.imageId}
        setIdList={setIdList}
        hidden={hidden}
        marker={marker}
        setMarker={setMarker}
      />
      {imageElement}
    </GalleryLi>
  )

}

type ImgListProps = {
  pictures: ImageCC[];
  handleImgClick: (pic: ImageCC) => void;
  isInfo?: boolean;
  idList: string[];
  setIdList: Dispatch<SetStateAction<string[]>>;
  hidden?: boolean;
};

export function ImgList({ pictures, handleImgClick, idList, setIdList, isInfo, hidden=true }: ImgListProps) {
  const imageElements = pictures.map((item) => (
   <GalleryItem
      onClick={() => handleImgClick(item)}
      picture={item}
      idList={idList}
      setIdList={setIdList}
      key={item.imageId}
      hidden={hidden}
    />
  ));

  return <Gallery isInfo={isInfo}>{imageElements}</Gallery>;
}
