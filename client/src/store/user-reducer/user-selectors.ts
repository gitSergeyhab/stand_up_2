import { ReducerName, ReducerType } from '../store';

export const getUser = (state: ReducerType) => state[ReducerName.User].user;

// export const getUserReviews = (state: ReducerType) => state[ReducerName.User].userInfo?.reviews;
// export const getUserRates = (state: ReducerType) => state[ReducerName.User].userInfo?.rates;
