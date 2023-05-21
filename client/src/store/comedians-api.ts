import { createApi } from '@reduxjs/toolkit/query/react';
import { ComedianCardDataCC, OneComedianTypeCC } from '../types/comedian-types';
import { adaptComedianDataToClient, adaptOneComedianToClient } from '../utils/adapters/comedian-adapters';
import { baseQueryWithReauth } from './auth-api';



export const comediansApi = createApi({
  reducerPath: 'comediansApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getComedians: build.query<ComedianCardDataCC, string>({
      query: (search) => `/comedians${search}`,
      transformResponse: adaptComedianDataToClient
    }),
    getComedianById: build.query<OneComedianTypeCC, string>({
      query: (id) => `/comedians/${id}`,
      transformResponse: adaptOneComedianToClient,
    })
  }),
});

export const { useGetComediansQuery, useGetComedianByIdQuery } = comediansApi;
