import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';

import { OneShowCC, ShowCardDataCC, ShowCardDataWithTitlesCC } from '../types/show-types';
import { adaptOneShowToClient, adaptServerShowDataToCard, adaptServerShowDataToWithTitlesToCard } from '../utils/adapters/show-adapters';



export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['shows', 'show'],

  endpoints: (build) => ({
    getShowsOfComedian: build.query< ShowCardDataWithTitlesCC, {id: string, search: string}>({
      query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/shows${search}`,
      transformResponse: adaptServerShowDataToWithTitlesToCard,
      providesTags: ['shows']
    }),
    getShows: build.query<ShowCardDataCC, string>({
      query: (search) => `shows/${search}`,
      transformResponse: adaptServerShowDataToCard,
      providesTags: ['shows']
    }),
    getShowById: build.query<OneShowCC, string>({
      query: (id) => `shows/${id}`,
      transformResponse: adaptOneShowToClient,
      providesTags: ['show']
    }),

    postShowRate: build.mutation<{showId: string, rate: number}, {showId: string, rate: number}>({
      query: ({showId, rate}) => ({
        url: 'shows/rate-show',
        method: 'POST',
        body: {showId, rate}
      }),
      invalidatesTags: ['show', 'shows']
    })
    // getEventsOfComedian: build.query<EventCardServerDataWithTitlesCC , {id: string, search:string}>({
    //   query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/events${search}`,
    //   transformResponse: adaptServerEventDataWithTitlesToCard,
    // }),
  }),
});

export const { useGetShowsOfComedianQuery, useGetShowsQuery, useGetShowByIdQuery, usePostShowRateMutation } = showsApi;
