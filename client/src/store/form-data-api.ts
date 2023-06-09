import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { CountriesDataSC, FormDataCC, FormDataItemCC, PlacesDataSC } from '../types/preload-type';
import { adaptCountriesDataToClient, adaptFormDataToClient, adaptPlacesDataToClient } from '../utils/adapters/preload-adapters';

// !!! FOR DEL


export const formDataApi = createApi({
  reducerPath: 'formDataApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getPreloadData: build.query<FormDataCC, undefined>({
      query: () => `/form-data/preload`,
      transformResponse: adaptFormDataToClient,
    }),
    getPreloadCountries: build.query<FormDataItemCC[], undefined>({
      query: () => `/form-data/preload-countries`,
      transformResponse: (data: CountriesDataSC[]) => data.map(adaptCountriesDataToClient)
    }),
    getPreloadPlaces: build.query<FormDataItemCC[], undefined>({
      query: () => `/form-data/preload-places`,
      transformResponse: (data: PlacesDataSC[]) => data.map(adaptPlacesDataToClient)
    })
  }),

});

export const { useGetPreloadDataQuery, useGetPreloadCountriesQuery, useGetPreloadPlacesQuery } = formDataApi;
