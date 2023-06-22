import { createReducer } from '@reduxjs/toolkit';
import { OptionType } from '../../types/types';
import { setPreloadComedians, setPreloadCountries, setPreloadData, setPreloadEvents, setPreloadLanguages, setPreloadPlaces, setPreloadShows } from '../actions';

export type InitialPreloadState = {
  comedians: OptionType[];
  shows:  OptionType[];
  events:  OptionType[];
  places:  OptionType[];
  countries:  OptionType[];
  languages:  OptionType[];
};

const initialState: InitialPreloadState = {
  comedians: [],
  shows: [],
  events: [],
  places: [],
  countries: [],
  languages: [],
};

export const preloadReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPreloadData, (state, action) => {
      state.comedians = action.payload.comedians;
      state.countries = action.payload.countries;
      state.shows = action.payload.shows;
      state.events = action.payload.events;
      state.places = action.payload.places;
      state.languages = action.payload.languages;
    })
    .addCase(setPreloadComedians, (state, action) => {state.comedians = action.payload })
    .addCase(setPreloadCountries, (state, action) => {state.countries = action.payload })
    .addCase(setPreloadEvents, (state, action) => {state.events = action.payload })
    .addCase(setPreloadPlaces, (state, action) => {state.places = action.payload })
    .addCase(setPreloadShows, (state, action) => {state.shows = action.payload })
    .addCase(setPreloadLanguages, (state, action) => {state.languages = action.payload })
});
