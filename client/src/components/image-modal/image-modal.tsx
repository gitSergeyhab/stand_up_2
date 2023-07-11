import { useState, useEffect, MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseBtn, Image, ImageContainer, ImageList, ItemSlideLi, Modal, ModalContent, SlideItemImg } from './image-modal-style';
import { KeyEscape, KeyNext, KeyPrev, SERVER_URL } from '../../const/const';
import { ImageCC } from '../../types/pic-types';
import { getCurrentList, getImg } from '../../utils/modal-utils';



// elements

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <CloseBtn onClick={onClose}>
      <AiOutlineClose />
    </CloseBtn>
  );
}

type ImageItemType = {
  item: ImageCC;
  currentImg: ImageCC;
  handleImgClick: MouseEventHandler<HTMLImageElement>;
};

function ImageItem({ item, currentImg, handleImgClick }: ImageItemType) {
  const current = item.imageId === currentImg.imageId;
  const src = `${SERVER_URL}${item.imagePath}`;
  return (
    <ItemSlideLi current={current}>
      <SlideItemImg src={src} onClick={handleImgClick} />
    </ItemSlideLi>
  );
}

type ImageModalProps = {
  pictures: ImageCC[];
  currentImg: ImageCC;
  setImg: (currentImg: ImageCC) => void;
  onClose: () => void;
};

export function ImageModal({
  pictures,
  currentImg,
  setImg,
  onClose,
}: ImageModalProps) {
  const [currentImgList, setImgList] = useState(
    getCurrentList(currentImg, pictures),
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return function setOverflow() {
      document.body.style.overflow = '';
    };
  }, []);

  const handleImgClick = (img: ImageCC) => {
    setImg(img);
    setImgList(getCurrentList(img, pictures));
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    const key = evt.code;

    if (KeyNext.some((item) => item === key)) {
      handleImgClick(getImg(1, pictures, currentImg));
    } else if (KeyPrev.some((item) => item === key)) {
      handleImgClick(getImg(-1, pictures, currentImg));
    } else if (KeyEscape === key) {
       onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return function removeKeydownListener() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const imageElements = currentImgList.map((item) => (
    <ImageItem
      key={item.imageId}
      currentImg={currentImg}
      handleImgClick={() => handleImgClick(item)}
      item={item}
    />
  ));

  const src = `${SERVER_URL}${currentImg.imagePath}`;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClose={onClose} />
        <ImageContainer>
          <Image src={src} alt="" />
        </ImageContainer>
        <ImageList>{imageElements}</ImageList>
      </ModalContent>
    </Modal>
  );
}

export function ImageModalSingle(
  { currentImg, onClose }:
  { currentImg: ImageCC; onClose: () => void }
  ) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return function setOverflow() {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      const key = evt.code;
      if (KeyEscape === key) { onClose() }
    };
    document.addEventListener('keydown', handleKeyDown);
    return function removeKeydownListener() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const src = `${SERVER_URL}${currentImg.imagePath}`;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClose={onClose} />
        <ImageContainer>
          <Image src={src} alt="" />
        </ImageContainer>
      </ModalContent>
    </Modal>
  );
}
