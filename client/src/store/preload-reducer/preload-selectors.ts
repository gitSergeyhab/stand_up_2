import { ReducerName, ReducerType } from '../store';

export const getComedians = (state: ReducerType) => state[ReducerName.Preload].comedians;
export const getCountries = (state: ReducerType) => state[ReducerName.Preload].countries;
export const getEvents = (state: ReducerType) => state[ReducerName.Preload].events;
export const getLanguages = (state: ReducerType) => state[ReducerName.Preload].languages;
export const getPlaces = (state: ReducerType) => state[ReducerName.Preload].places;
export const getShows = (state: ReducerType) => state[ReducerName.Preload].shows;
export const getData = (state: ReducerType) => state[ReducerName.Preload];
