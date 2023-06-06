import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';

import { OneShowCC, ShowCardDataCC, ShowCardDataWithTitlesCC } from '../types/show-types';
import { adaptOneShowToClient, adaptServerShowDataToCard, adaptServerShowDataToWithTitlesToCard } from '../utils/adapters/show-adapters';



export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getShowsOfComedian: build.query< ShowCardDataWithTitlesCC, {id: string, search: string}>({
      query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/shows${search}`,
      transformResponse: adaptServerShowDataToWithTitlesToCard,
    }),
    getShows: build.query<ShowCardDataCC, string>({
      query: (search) => `shows/${search}`,
      transformResponse: adaptServerShowDataToCard
    }),
    getShowById: build.query<OneShowCC, string>({
      query: (id) => `shows/${id}`,
      transformResponse: adaptOneShowToClient,
    }),
    // getEventsOfComedian: build.query<EventCardServerDataWithTitlesCC , {id: string, search:string}>({
    //   query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/events${search}`,
    //   transformResponse: adaptServerEventDataWithTitlesToCard,
    // }),
  }),
});

export const { useGetShowsOfComedianQuery, useGetShowsQuery, useGetShowByIdQuery } = showsApi;
