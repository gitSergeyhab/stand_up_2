import { createApi } from '@reduxjs/toolkit/query/react';
import {
  OneComedianTypeCC,
  SubComedianCC,
  SubComedianSC,
} from '../types/comedian-types';
import {
  adaptOneComedianToClient,
  adaptComediansToClient,
} from '../utils/adapters/comedian-adapters';
import { baseQueryWithReauth } from './auth-api';

// const BASE_URL = 'http://localhost:5000/api/comedians';

type DateAllComediansSC = { comedians: SubComedianSC[]; count: string };
type DateAllComediansCC = { comedians: SubComedianCC[]; count: string };

export const comediansApi = createApi({
  reducerPath: 'comediansApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAllComedians: build.query<DateAllComediansCC, string>({
      query: (queryParams) => `/comedians/${queryParams}`,
      transformResponse: ({ comedians, count }: DateAllComediansSC) => ({
        comedians: comedians.map(adaptComediansToClient),
        count,
      }),
    }),
    getComedianById: build.query<OneComedianTypeCC, string>({
      query: (id) => `/comedians/${id}`,
      transformResponse: adaptOneComedianToClient,
    }),
  }),
});

export const { useGetAllComediansQuery, useGetComedianByIdQuery } = comediansApi;
