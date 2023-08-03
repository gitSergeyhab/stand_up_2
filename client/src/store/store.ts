import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { comediansApi } from './comedians-api';
import { eventsApi } from './events-api';
import { subApi } from './sub-api';
import { testSlice } from './test-store';
import { userApi } from './user-api';
import { userReducer } from './user-reducer/user-reducer';
import { showsApi } from './shows-api';
import { imagesApi } from './images-api';
import { formDataApi } from './form-data-api';
import { postFormApi } from './post-form-api';
import { placesApi } from './places-api';
import { preloadReducer } from './preload-reducer/preload-reducer';
import { api } from './api';
import { mainApi } from './main-api';
import { newsApi } from './news-api';
import { commentReducer } from './comment-reducer/comment-reducer';
import { chatReducer } from './chat-reducer/chat-reducer';


export const enum ReducerName {
  User = 'User',
  Preload = 'Preload',
  Chat = 'Chat',
  Comment = 'Comment'
}

export const reducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
  [comediansApi.reducerPath]: comediansApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [subApi.reducerPath]: subApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [testSlice.name]: testSlice.reducer,
  [showsApi.reducerPath]: showsApi.reducer,
  [placesApi.reducerPath]: placesApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [imagesApi.reducerPath]: imagesApi.reducer,
  [formDataApi.reducerPath]: formDataApi.reducer,
  [postFormApi.reducerPath]: postFormApi.reducer,
  [ReducerName.Preload]: preloadReducer,
  [ReducerName.User]: userReducer,
  [ReducerName.Chat]: chatReducer,
  [ReducerName.Comment]: commentReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( { thunk: { extraArgument: api } } )
    .concat(mainApi.middleware)
    .concat(comediansApi.middleware)
    .concat(userApi.middleware)
    .concat(subApi.middleware)
    .concat(eventsApi.middleware)
    .concat(showsApi.middleware)
    .concat(placesApi.middleware)
    .concat(newsApi.middleware)
    .concat(imagesApi.middleware)
    .concat(formDataApi.middleware)
    .concat(postFormApi.middleware)
});

export type ReducerType = ReturnType<typeof reducer>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction< R, ReducerType, AxiosInstance, Action >;
