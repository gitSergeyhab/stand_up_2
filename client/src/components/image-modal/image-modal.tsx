import { useState, useEffect, MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
  CloseBtn,
  Image,
  ImageContainer,
  ImageList,
  ItemSlideLi,
  Modal,
  ModalContent,
  SlideItemImg,
} from './image-modal-style';
import { PictureType } from '../../types/types';
import { KeyNext, KeyPrev } from '../../const/const';

// functions

const getImageNumbers = (images: PictureType[]) => {
  const len = images.length < 6 ? images.length : 5;
  const current = Math.floor((len - 1) / 2);

  return { len, current };
};

const getImg = (
  dir: 1 | -1,
  images: PictureType[],
  currentPic: PictureType,
) => {
  const idx = images.findIndex((item) => item.id === currentPic.id);
  const len = images.length;
  const nextIdx = dir + idx;

  if (nextIdx > len - 1) {
    return images[0];
  }
  if (nextIdx === -1) {
    return images[len - 1];
  }

  return images[nextIdx];
};

const getCurrentList = (currentPic: PictureType, fullList: PictureType[]) => {
  const { len } = getImageNumbers(fullList);
  const fullLen = fullList.length;
  const { id } = currentPic;
  const idx = fullList.findIndex((item) => item.id === id);

  if (len < 5) {
    return fullList;
  }

  const firstPart = idx - 1 > 0
    ? fullList.slice(idx - 2, idx)
    : [
      ...fullList.slice(fullLen + idx - 2, fullLen),
      ...fullList.slice(0, idx),
    ];
  const lastPart = idx + 2 < fullLen
    ? fullList.slice(idx, idx + 3)
    : [
      ...fullList.slice(idx, fullLen),
      ...fullList.slice(0, 3 - (fullLen - idx)),
    ];

  return [...firstPart, ...lastPart];
};

// elements

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <CloseBtn onClick={onClose}>
      <AiOutlineClose />
    </CloseBtn>
  );
}

type ImageItemType = {
  item: PictureType;
  currentImg: PictureType;
  handleImgClick: MouseEventHandler<HTMLImageElement>;
};

function ImageItem({ item, currentImg, handleImgClick }: ImageItemType) {
  const current = item.id === currentImg.id;
  const src = `/assets${item.src}`;
  return (
    <ItemSlideLi current={current}>
      <SlideItemImg src={src} onClick={handleImgClick} />
    </ItemSlideLi>
  );
}

type ImageModalProps = {
  pictures: PictureType[];
  currentImg: PictureType;
  setImg: (currentImg: PictureType) => void;
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

  const handleImgClick = (img: PictureType) => {
    setImg(img);
    setImgList(getCurrentList(img, pictures));
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    const key = evt.code;

    // if (key === 'Escape') {
    //   return onClose();
    // }

    if (KeyNext.some((item) => item === key)) {
      return handleImgClick(getImg(1, pictures, currentImg));
    }

    if (KeyPrev.some((item) => item === key)) {
      return handleImgClick(getImg(-1, pictures, currentImg));
    }

    return onClose(); // ??
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return function removeKeydownListener() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const imageElements = currentImgList.map((item) => (
    <ImageItem
      key={item.id}
      currentImg={currentImg}
      handleImgClick={() => handleImgClick(item)}
      item={item}
    />
  ));

  const src = `/assets${currentImg.src}`;

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
