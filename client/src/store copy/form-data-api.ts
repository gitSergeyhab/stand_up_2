import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { CountriesDataSC, FormDataCC, FormDataItemCC, PlacesDataSC } from '../types/preload-type';
import { adaptCountriesDataToClient, adaptFormDataToClient, adaptPlacesDataToClient } from '../utils/adapters/preload-adapters';

// export type CountriesDataSC = {
//   country_id: string,
//   country_name: string,
// }
// export type ComediansDataSC = {
//   comedian_id: string,
//   comedian_nik: string,
// }
// export type ShowsDataSC = {
//   show_id: string,
//   show_name: string,
// }
// export type EventsDataSC = {
//   event_id: string,
//   event_name: string,
// }
// export type PlacesDataSC = {
//   place_id: string,
//   place_name: string,
// }
// export type LanguagesDataSC = {
//   language_id: string,
//   language_name: string,
// }

// export type FormDataSC = {
//    countries: CountriesDataSC[],
//    comedians: ComediansDataSC[],
//    shows: ShowsDataSC[],
//    events: EventsDataSC[],
//    places: PlacesDataSC[],
//    languages: LanguagesDataSC[]

// }

// export type FormDataItemCC = {
//   id: string,
//   name: string,
// }


// export type FormDataCC = {
//    countries: FormDataItemCC[],
//    comedians: FormDataItemCC[],
//    shows: FormDataItemCC[],
//    events: FormDataItemCC[],
//    places: FormDataItemCC[],
//    languages: FormDataItemCC[]
// }




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
