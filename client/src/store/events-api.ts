import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { OneEventTypeCC } from '../types/event-types';
import { adaptOneEventToClient } from '../utils/adapters/event-adapters';

const BASE_URL = 'http://localhost:5000/api/events';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery,
  endpoints: (build) => ({
    getEventById: build.query<OneEventTypeCC, string>({
      query: (id) => `/${id}`,
      transformResponse: adaptOneEventToClient,
    }),
  }),
});

export const { useGetEventByIdQuery } = eventsApi;
