import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { ImageDataCC } from '../types/pic-types';
import { adaptImageDataToClient } from '../utils/adapters/pic-adapter';


const getImagePath = (pathname: string) => pathname.split('/').slice(0,3).join('/')

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['imageData'],
  endpoints: (build) => ({
    getImages: build.query<ImageDataCC, {pathname: string}>({
      query: ({pathname}) => `images${getImagePath(pathname)}` ,
      transformResponse: adaptImageDataToClient,
      providesTags: ['imageData']
    }),
    addImages: build.mutation<string, {body: FormData, mainType: string, id: string}> ({
      query: ({body, mainType, id}) => ({
        url: `/images/${mainType}/${id}`,
        method: 'POST',
        body,
        params: {dir: mainType}
      }),
      invalidatesTags: ['imageData']
    }),
    deleteImages: build.mutation<string, {indexes: string[]}> ({
      query: ({indexes}) => ({
        url: `/images`,
        method: 'DELETE',
        params: {indexes}
      }),
      invalidatesTags: ['imageData']
    })
  }),


});

export const { useGetImagesQuery, useLazyGetImagesQuery, useAddImagesMutation, useDeleteImagesMutation } = imagesApi;
