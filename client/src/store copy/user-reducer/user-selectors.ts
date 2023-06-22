import { ReducerName, ReducerType } from '../store';

export const getUser = (state: ReducerType) => state[ReducerName.User].user;
