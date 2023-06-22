import { ComediansDataSC, CountriesDataSC, EventsDataSC, FormDataCC, FormDataItemCC, FormDataSC, LanguagesDataSC, PlacesDataSC, ShowsDataSC } from "../../types/preload-type"

export const adaptEventsDataToClient = (data: EventsDataSC): FormDataItemCC => ({
  id: data.event_id,
  name: data.event_name,
})

export const adaptShowsDataToClient = (data: ShowsDataSC): FormDataItemCC => ({
  id: data.show_id,
  name: data.show_name
})

export const adaptCountriesDataToClient = (data: CountriesDataSC): FormDataItemCC => ({
  id: data.country_id,
  name: data.country_name,
})

export const adaptComediansDataToClient = (data: ComediansDataSC): FormDataItemCC => ({
  id: data.comedian_id,
  name: data.comedian_nik
})

export const adaptPlacesDataToClient = (data: PlacesDataSC): FormDataItemCC => ({
  id: data.place_id,
  name: data.place_name,
})

export const adaptLanguagesDataToClient = (data: LanguagesDataSC): FormDataItemCC => ({
  id: data.language_id,
  name: data.language_name,
})

export const adaptFormDataToClient = (data: FormDataSC): FormDataCC => ({
  comedians: data.comedians.map(adaptComediansDataToClient),
  countries: data.countries.map(adaptCountriesDataToClient),
  events: data.events.map(adaptEventsDataToClient),
  places: data.places.map(adaptPlacesDataToClient),
  shows: data.shows.map(adaptShowsDataToClient),
  languages: data.languages.map(adaptLanguagesDataToClient)
})
