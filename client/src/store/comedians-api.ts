import { createApi } from '@reduxjs/toolkit/query/react';
import {  OneComedianTypeCC } from '../types/comedian-types';
import { adaptComedianDataToClient, adaptOneComedianToClient } from '../utils/adapters/comedian-adapters';
import { baseQueryWithReauth } from './auth-api';
import { adaptComedianShowRatingCountToClient } from '../utils/adapters/rating-adapters';
import { ComedianShowRatingCountCC } from '../types/rating-types';
import { CardDataCC } from '../types/common-types';

type ShowComedianRateReq = {id: string, digit: number, offset: number, limit: number};

export const comediansApi = createApi({
  reducerPath: 'comediansApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getComedians: build.query<CardDataCC, string>({
      query: (search) => `/comedians${search}`,
      transformResponse: adaptComedianDataToClient
    }),
    getComedianById: build.query<OneComedianTypeCC, string>({
      query: (id) => `/comedians/${id}`,
      transformResponse: adaptOneComedianToClient,
    }),
    getShowsRatingsByComedianId: build.query<ComedianShowRatingCountCC, ShowComedianRateReq>({
      query: ({digit, id, offset, limit}) =>  ({
        url: `/comedians/${id}/ratings`,
        params: {digit, offset, limit}
      }),
      transformResponse: adaptComedianShowRatingCountToClient
    }),
    getShowsRatingDataByComedianId: build.query({
      query: (id) => `/comedians/${id}/rating-data`
    }),
  }),
});

export const {
  useGetComediansQuery,
  useGetComedianByIdQuery,
  useGetShowsRatingDataByComedianIdQuery,
  useGetShowsRatingsByComedianIdQuery,
  useLazyGetShowsRatingsByComedianIdQuery
} = comediansApi;
