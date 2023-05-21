import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';


export type ImageSC = {
  image_id: string,
  image_path: string,
}

export type ImageCC = {
  imageId: string,
  imagePath: string,
}



const adaptImageToClient = (data:ImageSC): ImageCC => ({
  imageId: data.image_id,
  imagePath: data.image_path
});

export type ImageDataSC = {
  data: ImageSC[],
  titles: {
    native: string,
    en?: string,
  },
  count: string
}

export type ImageDataCC = {
  data: ImageCC[],
  titles: {
    native: string,
    en?: string,
  },
  count: number
}


const adaptImageDataToClient = (result: ImageDataSC): ImageDataCC => ({
  ...result,
  data: result.data.map(adaptImageToClient),
  count: +result.count
});


const getImagePath = (pathname: string) => pathname.split('/').slice(0,3).join('/')

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getImages: build.query<ImageDataCC, string>({
      query: (pathname) => `images${getImagePath(pathname)}` ,
      transformResponse: adaptImageDataToClient
    }),

    postImage: build.mutation<string, {queries: string, body: FormData}>({
      query: ({body, queries}) => ({
        url: `images${queries}`,
        body,
        method: 'POST'
      })
    })
  }),
});

export const { useGetImagesQuery } = imagesApi;
