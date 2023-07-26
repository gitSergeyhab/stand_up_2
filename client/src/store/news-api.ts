import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { NewsCC, NewsDataCC } from '../types/news-types';
import { adaptServerNewsDataToClient, adaptServerNewsToClient } from '../utils/adapters/news-adapters';


export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['news'],
  endpoints: (build) => ({
    getNewsList: build.query<NewsDataCC, string>({
      query: (search) => `news/news-list${search}`,
      transformResponse: adaptServerNewsDataToClient,
      providesTags: ['news'],
    }),
    getNewsById: build.query<NewsCC, string>({
      query: (id) => `news/news/${id}`,
      transformResponse: adaptServerNewsToClient,
      providesTags: ['news'],
    }),
    addNews: build.mutation<string, {body: FormData}> ({
      query: ({body}) => ({
        url: `/news`,
        method: 'POST',
        body,
        params: {dir: 'news'}
      }),
      invalidatesTags: ['news'],
    }),

    changeNews: build.mutation<string, {body: FormData,  id: string}> ({
      query: ({body, id}) => ({
        url: `/news/${id}`,
        method: 'PUT',
        body,
        params: {dir: 'news'}
      }),
      invalidatesTags: ['news'],
    })

  }),
});

export const { useGetNewsByIdQuery, useGetNewsListQuery, useAddNewsMutation, useChangeNewsMutation } = newsApi;
