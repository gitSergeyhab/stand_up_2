import { createReducer } from '@reduxjs/toolkit';
import { AuthUserTypeCC, UserInfo } from '../../types/user-types';
import { setUser } from '../actions';

export type InitialState = {
  user: AuthUserTypeCC | null;
  userInfo: UserInfo | null
};

const initialState: InitialState = {
  user: null,
  userInfo:  null
 };

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {state.user = action.payload})
    // .addCase(setUserInfo, (state, action) => {state.userInfo = action.payload})
    ;
});
