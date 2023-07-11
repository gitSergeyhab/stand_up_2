import { ImageCC } from "../types/pic-types";

const getImageNumbers = (images: ImageCC[]) => {
  const len = images.length < 6 ? images.length : 5;
  const current = Math.floor((len - 1) / 2);

  return { len, current };
};

export const getImg = (
  dir: 1 | -1,
  images: ImageCC[],
  currentPic: ImageCC,
) => {
  const idx = images.findIndex((item) => item.imageId === currentPic.imageId);
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

export const getCurrentList = (currentPic: ImageCC, fullList: ImageCC[]) => {
  const { len } = getImageNumbers(fullList);
  const fullLen = fullList.length;
  const { imageId } = currentPic;
  const idx = fullList.findIndex((item) => item.imageId === imageId);

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
