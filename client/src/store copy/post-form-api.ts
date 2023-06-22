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
    }),

    changeMainContent: build.mutation<string, {body: FormData, dir: string, id: string}> ({
      query: ({body, dir, id}) => ({
        url: `/${dir}/${id}`,
        method: 'PUT',
        body,
        params: {dir}
      })
    }),
    // addImages: build.mutation<string, {body: FormData, mainType: string, id: string}> ({
    //   query: ({body, mainType, id}) => ({
    //     url: `/images/${mainType}/${id}`,
    //     method: 'POST',
    //     body,
    //     params: {dir: mainType}
    //   })
    // })
  }),
});

export const { useAddMainContentMutation, useChangeMainContentMutation } = postFormApi;
