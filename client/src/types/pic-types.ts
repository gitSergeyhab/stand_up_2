export type PictureSC = {
  picture_id: string;
  picture_path: string;
};

export type PictureCC = {
  id: string;
  src: string;
};


export type ImageSC = {
  image_id: string,
  image_path: string,
}

export type ImageCC = {
  imageId: string,
  imagePath: string,
}

export type ImageDataSC = {
  list: ImageSC[],
  titles: {
    native: string,
    en?: string,
  },
  count: string
}

export type ImageDataCC = {
  list: ImageCC[],
  titles: {
    native: string,
    en?: string,
  },
  count: number
}
