import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './auth-api';



export const postFormApi = createApi({
  reducerPath: 'postFormApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    addMainContent: build.mutation<string, {body: FormData, dir: string}> ({
      query: ({body, dir}) => ({
        url: `/${dir}`,
        method: 'POST',
        body,
        params: {dir}
      })
    })
  }),
});

export const { useAddMainContentMutation } = postFormApi;
