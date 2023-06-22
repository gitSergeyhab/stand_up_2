import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { SubComedianCC, SubComedianSC } from '../types/comedian-types';
import { EventCardServerDataWithTitlesCC } from '../types/event-types';
import { PictureCC, PictureSC } from '../types/pic-types';
import { DataRateCC, DataRateSC, StatRateCC, StatRateSC } from '../types/types';
// import { adaptComediansToClient } from '../utils/adapters/comedian-adapters';
import { adaptServerEventDataWithTitlesToCard } from '../utils/adapters/event-adapters';
import { adaptPictureToClient } from '../utils/adapters/pic-adapter';
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
    getEvents: build.query<EventCardServerDataWithTitlesCC, string>({
      query: (queryParams) => queryParams,
      transformResponse: adaptServerEventDataWithTitlesToCard
    }),

    getPictures: build.query<SupApiType<PictureCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({ data, count }: SupApiType<PictureSC>) => ({
        data: data.map(adaptPictureToClient),
        count,
      }),
    }),
    getRatings: build.query<SupRateType<StatRateCC, DataRateCC>, string>({
      query: (queryParams) => queryParams,
      transformResponse: ({ rates, count, stats, titles }: SupRateType<StatRateSC, DataRateSC>) => ({
        count,
        titles,
        rates: rates.map(adaptRateToClient),
        stats: stats.map(adaptStatToClient),
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetPicturesQuery, useGetRatingsQuery } = subApi;

