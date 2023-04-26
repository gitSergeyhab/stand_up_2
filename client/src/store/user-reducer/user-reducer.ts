import { createReducer } from '@reduxjs/toolkit';
import { AuthUserTypeCC } from '../../types/user-types';
import { setUser } from '../actions';

export type InitialState = {
  user: AuthUserTypeCC | null;
};

const initialState: InitialState = { user: null };

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});
