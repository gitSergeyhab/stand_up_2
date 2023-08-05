import { createReducer } from '@reduxjs/toolkit';
import { CommentType, NewsCommentFakeData } from '../../types/types';
import { resetCommentInput, setCommentType, setCurrentComment, setFakeCommentData } from '../actions';


// const c: NewsCommentCC;
export type InitialChatState = {
  inputCommentType?: CommentType;
  inputCommentId?: string;
  hiddenHref?: string;
  fakeCommentData?: NewsCommentFakeData;
};

const initialState: InitialChatState = {};

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCommentType, (state, action) => { state.inputCommentType = action.payload })
    .addCase(setCurrentComment, (state, action) => { state.inputCommentId = action.payload })
    .addCase(resetCommentInput, (state) => { state.inputCommentId = undefined; state.inputCommentType = undefined })
    .addCase(setFakeCommentData, (state, action) => { state.fakeCommentData = action.payload })
});
