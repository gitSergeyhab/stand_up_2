// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import { OneEventTypeCC } from '../types/event-types';
// import { adaptOneEventToClient } from '../utils/adapters/event-adapters';
// import { SERVER_URL } from '../const/const';

// const BASE_URL = `${SERVER_URL}api/events`;

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// export const eventsApi = createApi({
//   reducerPath: 'eventsApi',
//   baseQuery,
//   endpoints: (build) => ({
//     getEventById: build.query<OneEventTypeCC, string>({
//       query: (id) => `/${id}`,
//       transformResponse: adaptOneEventToClient,
//     }),
//   }),
// });

// export const { useGetEventByIdQuery } = eventsApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { EventsOfComedianDataCC, OneEventTypeCC } from '../types/event-types';
import { adaptEventsOfComedianDataToClient, adaptOneEventToClient } from '../utils/adapters/event-adapters';




export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getEventById: build.query<OneEventTypeCC, string>({
      query: (id) => `/${id}`,
      transformResponse: adaptOneEventToClient,
    }),
    getEventsOfComedian: build.query<EventsOfComedianDataCC , {id: string, search:string}>({
      query: ({id, search}: {id: string, search:string}) => `/comedians/${id}/events${search}`,
      transformResponse: adaptEventsOfComedianDataToClient,
    }),
  }),
});

export const { useGetEventsOfComedianQuery, useGetEventByIdQuery } = eventsApi;

