import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';

export type CountriesDataSC = {
  country_id: string,
  country_name: string,
}
export type ComediansDataSC = {
  comedian_id: string,
  comedian_nik: string,
}
export type ShowsDataSC = {
  show_id: string,
  show_name: string,
}
export type EventsDataSC = {
  event_id: string,
  event_name: string,
}
export type PlacesDataSC = {
  place_id: string,
  place_name: string,
}
export type LanguagesDataSC = {
  language_id: string,
  language_name: string,
}

export type FormDataSC = {
   countries: CountriesDataSC[],
   comedians: ComediansDataSC[],
   shows: ShowsDataSC[],
   events: EventsDataSC[],
   places: PlacesDataSC[],
   languages: LanguagesDataSC[]

}

export type FormDataItemCC = {
  id: string,
  name: string,
}


export type FormDataCC = {
   countries: FormDataItemCC[],
   comedians: FormDataItemCC[],
   shows: FormDataItemCC[],
   events: FormDataItemCC[],
   places: FormDataItemCC[],
   languages: FormDataItemCC[]
}

const adaptEventsDataToClient = (data: EventsDataSC): FormDataItemCC => ({
  id: data.event_id,
  name: data.event_name,
})

const adaptShowsDataToClient = (data: ShowsDataSC): FormDataItemCC => ({
  id: data.show_id,
  name: data.show_name
})

const adaptCountriesDataToClient = (data: CountriesDataSC): FormDataItemCC => ({
  id: data.country_id,
  name: data.country_name,
})

const adaptComediansDataToClient = (data: ComediansDataSC): FormDataItemCC => ({
  id: data.comedian_id,
  name: data.comedian_nik
})

const adaptPlacesDataToClient = (data: PlacesDataSC): FormDataItemCC => ({
  id: data.place_id,
  name: data.place_name,
})

const adaptLanguagesDataToClient = (data: LanguagesDataSC): FormDataItemCC => ({
  id: data.language_id,
  name: data.language_name,
})

const adaptFormDataToClient = (data: FormDataSC): FormDataCC => ({
  comedians: data.comedians.map(adaptComediansDataToClient),
  countries: data.countries.map(adaptCountriesDataToClient),
  events: data.events.map(adaptEventsDataToClient),
  places: data.places.map(adaptPlacesDataToClient),
  shows: data.shows.map(adaptShowsDataToClient),
  languages: data.languages.map(adaptLanguagesDataToClient)
})


export const formDataApi = createApi({
  reducerPath: 'formDataApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getPreloadData: build.query<FormDataCC, undefined>({
      query: () => `/form-data/preload`,
      transformResponse: adaptFormDataToClient,
    })
  }),
});

export const { useGetPreloadDataQuery } = formDataApi;
