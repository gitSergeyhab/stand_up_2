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
