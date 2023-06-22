import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { EventCardServerDataCC, EventCardServerDataWithTitlesCC, OneEventCC } from '../types/event-types';
import { adaptServerEventDataToCard, adaptServerEventDataWithTitlesToCard, adaptServerEventToClientPage } from '../utils/adapters/event-adapters';


// adaptServerEventDataToCard = (result: EventCardServerDataSC): EventCardServerDataCC

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getEvents: build.query<EventCardServerDataCC, string>({
      query: (search) => `events/${search}`,
      transformResponse: adaptServerEventDataToCard
    }),
    getEventById: build.query<OneEventCC, string>({
      query: (id) => `events/${id}`,
      transformResponse: adaptServerEventToClientPage,
    }),
    getEventsOfComedian: build.query<EventCardServerDataWithTitlesCC , {id: string, search:string}>({
      query: ({id, search}: {id: string, search:string}) => `/sub/comedians/${id}/events${search}`,
      transformResponse: adaptServerEventDataWithTitlesToCard,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventsOfComedianQuery, useGetEventByIdQuery } = eventsApi;

