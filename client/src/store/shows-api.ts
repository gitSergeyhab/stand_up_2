import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth-api';
import { ShowsOfComedianDataCC } from '../types/show-types';
import { adaptShowsOfComedianDataToClient } from '../utils/adapters/show-adapters';


export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: baseQueryWithReauth,


  endpoints: (build) => ({
    getShowsOfComedian: build.query<ShowsOfComedianDataCC , {id: string, search:string}>({
      query: ({id, search}: {id: string, search:string}) => `/comedians/${id}/shows${search}`,
      transformResponse: adaptShowsOfComedianDataToClient,
    })
  }),
});

export const { useGetShowsOfComedianQuery } = showsApi;
