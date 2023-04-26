import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api } from './axios-api';

import { comediansApi } from './comedians-api';
import { eventsApi } from './events-api';
// import { mainReducer } from './main-reducer/main-reducer';
import { subApi } from './sub-api';
import { testSlice } from './test-store';
import { userApi } from './user-api';
import { userReducer } from './user-reducer/user-reducer';

export const enum ReducerName {
  // Main = 'Main',
  User = 'User',
}

export const reducer = combineReducers({
  [comediansApi.reducerPath]: comediansApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [subApi.reducerPath]: subApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [ReducerName.User]: userReducer,
  [testSlice.name]: testSlice.reducer,

  // [ReducerName.Main]: mainReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api } })
    .concat(comediansApi.middleware)
    .concat(userApi.middleware)
    .concat(subApi.middleware)
    .concat(eventsApi.middleware),

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(comediansApi.middleware)
});

export type ReducerType = ReturnType<typeof reducer>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  ReducerType,
  AxiosInstance,
  Action
>;
