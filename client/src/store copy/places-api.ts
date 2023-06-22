import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';

import { adaptOnePlaceToClient, adaptServerPlaceDataToCard } from '../utils/adapters/place-adapters';
import { OnePlaceCC, PlaceCardDataCC } from '../types/place-types';



export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({

    getPlaces: build.query<PlaceCardDataCC, string>({
      query: (search) => `places/${search}`,
      transformResponse: adaptServerPlaceDataToCard
    }),
    getPlaceById: build.query<OnePlaceCC, string>({
      query: (id) => `places/${id}`,
      transformResponse: adaptOnePlaceToClient,
    }),
    // getEventsOfComedian: build.query<EventCardServerDataWithTitlesCC , {id: string, search:string}>({
    //   query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/events${search}`,
    //   transformResponse: adaptServerEventDataWithTitlesToCard,
    // }),
  }),
});

export const { useGetPlacesQuery, useGetPlaceByIdQuery } = placesApi;
