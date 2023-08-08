import { ReducerType } from '../store';
import { newsCommentsSlice } from './news-comments-slice';

export const getInputCommentId = (state: ReducerType) => state[newsCommentsSlice.name].inputCommentId;
export const getInputCommentType = (state: ReducerType) => state[newsCommentsSlice.name].inputCommentType;
// export const getFakeCommentData = (state: ReducerType) => state[newsCommentsSlice.name].fakeCommentData;
export const getNewsCommentsData = (state: ReducerType) => state[newsCommentsSlice.name];
