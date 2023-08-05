import { ReducerName, ReducerType } from '../store';

export const getInputCommentId = (state: ReducerType) => state[ReducerName.Comment].inputCommentId;
export const getInputCommentType = (state: ReducerType) => state[ReducerName.Comment].inputCommentType;
export const getFakeCommentData = (state: ReducerType) => state[ReducerName.Comment].fakeCommentData;
