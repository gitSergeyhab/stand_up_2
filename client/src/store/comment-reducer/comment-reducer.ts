import { createReducer } from '@reduxjs/toolkit';
import { CommentType } from '../../types/types';
import { resetCommentInput, setCommentType, setCurrentComment } from '../actions';



export type InitialChatState = {
  inputCommentType?: CommentType;
  inputCommentId?: string;
  hiddenHref?: string;

};

const initialState: InitialChatState = {

  inputCommentType: undefined,
  inputCommentId: undefined,
  hiddenHref: undefined
};

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCommentType, (state, action) => { state.inputCommentType = action.payload })
    .addCase(setCurrentComment, (state, action) => { state.inputCommentId = action.payload })
    .addCase(resetCommentInput, (state) => { state.inputCommentId = undefined; state.inputCommentType = undefined })
});
