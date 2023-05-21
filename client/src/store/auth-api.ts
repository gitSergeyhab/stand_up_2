import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { Mutex } from 'async-mutex';
import { setUser } from './actions';
import { LoginUserDataSC } from '../types/user-types';
import { adaptLoginUserDataToClient } from '../utils/adapters/user-adapters';
import { storageUtils } from '../utils/storage-utils';
import { SERVER_URL } from '../const/const';

export const BASE_URL = `${SERVER_URL}api`;

const mutex = new Mutex();
/* , headers: {'Content-type': 'application/json; charset=UTF-8'} */
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = storageUtils.getToken();
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const { data } = await baseQuery('/users/refresh', api, extraOptions);
        if (data) {
          const userData = adaptLoginUserDataToClient(data as LoginUserDataSC);
          api.dispatch(setUser(userData.user));
          storageUtils.setData(userData);

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setUser(null));
          storageUtils.removeData();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query'
// import { tokenReceived, loggedOut } from './authSlice'
// import { Mutex } from 'async-mutex'

// // create a new mutex
// const mutex = new Mutex()
// const baseQuery = fetchBaseQuery({ baseUrl: '/' })
// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // wait until the mutex is available without locking it
//   await mutex.waitForUnlock()
//   let result = await baseQuery(args, api, extraOptions)
//   if (result.error && result.error.status === 401) {
//     // checking whether the mutex is locked
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire()
//       try {
//         const refreshResult = await baseQuery(
//           '/refreshToken',
//           api,
//           extraOptions
//         )
//         if (refreshResult.data) {
//           api.dispatch(tokenReceived(refreshResult.data))
//           // retry the initial query
//           result = await baseQuery(args, api, extraOptions)
//         } else {
//           api.dispatch(loggedOut())
//         }
//       } finally {
//         // release must be called once the mutex should be released again.
//         release()
//       }
//     } else {
//       // wait until the mutex is available without locking it
//       await mutex.waitForUnlock()
//       result = await baseQuery(args, api, extraOptions)
//     }
//   }
//   return result
// }
