import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { SubComedianCC, SubComedianSC } from '../types/comedian-types';
import { SubEventCC, SubEventSC } from '../types/event-types';
import { PictureCC, PictureSC } from '../types/pic-types';
import { SubShowCC, SubShowSC } from '../types/show-types';
import { DataRateCC, DataRateSC, StatRateCC, StatRateSC } from '../types/types';
// import { adaptComediansToClient } from '../utils/adapters/comedian-adapters';
import { adaptEventsToClient } from '../utils/adapters/event-adapters';
import { adaptPictureToClient } from '../utils/adapters/pic-adapter';
import { adaptShowsToClient } from '../utils/adapters/show-adapters';
import { adaptRateToClient, adaptStatToClient } from '../utils/adapters/small-adapters';
import { SERVER_URL } from '../const/const';

const SUB_API_URL = `${SERVER_URL}api/sub`;

type SupApiType<Sub> = {
  data: Sub[];
  count: string;
};

type SupRateType<Stat, Rate> = {
  stats: Stat[];
  rates: Rate[];
  count: string;
  titles: { en: string; native: string };
};

export const subApi = createApi({
  reducerPath: 'subApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SUB_API_URL,
  }),

  endpoints: (build) => ({
    getEvents: build.query<SupApiType<SubEventCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({ data, count }: SupApiType<SubEventSC>) => ({
        data: data.map(adaptEventsToClient),
        count
      }),
    }),
    getShows: build.query<SupApiType<SubShowCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({ data, count }: SupApiType<SubShowSC>) => ({
        data: data.map(adaptShowsToClient),
        count
      }),
    }),
    // getComedians: build.query<SupApiType<SubComedianCC>, string>({
    //   query: (queryParams) => queryParams,
    //   transformResponse: ({
    //     data,
    //     count,
    //   }: SupApiType<SubComedianSC>) => ({
    //     data: data.map(adaptComediansToClient),
    //     count,
    //   }),
    // }),
    getPictures: build.query<SupApiType<PictureCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({ data, count }: SupApiType<PictureSC>) => ({
        data: data.map(adaptPictureToClient),
        count,
      }),
    }),
    getRatings: build.query<SupRateType<StatRateCC, DataRateCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({
        rates,
        count,
        stats,
        titles,
      }: SupRateType<StatRateSC, DataRateSC>) => ({
        count,
        titles,
        rates: rates.map(adaptRateToClient),
        stats: stats.map(adaptStatToClient),
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetShowsQuery,
  // useGetComediansQuery,
  useGetPicturesQuery,
  useGetRatingsQuery,
} = subApi;

export type UseGetQueryType =
  // | typeof useGetComediansQuery
  | typeof useGetEventsQuery
  | typeof useGetShowsQuery;
