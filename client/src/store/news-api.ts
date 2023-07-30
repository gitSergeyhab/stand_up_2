import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { NewsCC, NewsDataCC } from '../types/news-types';
import { adaptServerNewsDataToClient, adaptServerNewsToClient } from '../utils/adapters/news-adapters';
import { NewsCommentsDataCC } from '../types/news-comments-types';
import { adaptServerNewsCommentsDataToClient } from '../utils/adapters/news-comments-adapter';


export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['news', 'comments'],
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
    }),

    getCommentsByNewsId: build.query<NewsCommentsDataCC, {id: string, search: string}>({
      query: ({id, search}) => `/news-comments/${id}${search}`,
      transformResponse: adaptServerNewsCommentsDataToClient,
      providesTags: ['comments'],
    }),

  }),
});

export const {
  useGetNewsByIdQuery, useGetNewsListQuery, useAddNewsMutation, useChangeNewsMutation,
  useGetCommentsByNewsIdQuery
 } = newsApi;
