import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./auth-api";
import { MainContentCC } from "../types/types";
import { adaptMainContent } from "../utils/adapters/adapters";

export const mainApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'mainApi',
  endpoints: (build) => ({
    getMainContent: build.query<MainContentCC, null>({
      query: () => '/main',
      transformResponse: adaptMainContent
    })
  })
})


export const { useGetMainContentQuery } = mainApi;
