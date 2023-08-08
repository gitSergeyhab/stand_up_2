import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsCommentCC } from "../../types/news-comments-types";
import { CommentType,  OptionType } from "../../types/types";
import { COMMENT_LIMIT } from "../../const/const";
import { addNewsComment, fetchNewsComments } from "./news-comments-thunks";

// type FakeCommentData = NewsCommentCC & {timeStamp: number}

export type InitialNewsCommentsState = {
  inputCommentType?: CommentType;
  inputCommentId?: string;
  comments: NewsCommentCC[];
  count: number;
  isLoading: boolean;
  isError: boolean;
  sortType: OptionType;
  offset: number;
  openedRootCommentId?: string;
};


const defaultSortType = {id: 'pop', name: 'популярные'} as const;


const initialState: InitialNewsCommentsState = {
  comments: [],
  count: 0,
  isLoading: true,
  isError: false,
  sortType: defaultSortType,
  offset: 0,
};

export const newsCommentsSlice = createSlice({
  name: 'news-comments',
  initialState,
  reducers: {
    setOpenRootComment(state, {payload}) {
      state.openedRootCommentId = payload;
    },
    setComments(state, {payload}) {
      state.comments = payload
    },
    setInputCommentType(state, action: PayloadAction<CommentType>) {
      state.inputCommentType = action.payload;
    },
    setInputCommentId(state, action: PayloadAction<string>) {
      state.inputCommentId = action.payload;
    },
    // setFakeCommentData(state, action: PayloadAction<NewsCommentFakeData2>) {
    //   state.fakeCommentData = {...emptyFakeComment, ...action.payload};
    // },


    // setNewComment(state, action: PayloadAction<NewsCommentCC>) {
    //   state.newComment = action.payload
    // },
    resetInputCommentData(state) {
      state.inputCommentId = undefined;
      state.inputCommentType = undefined;
    },
    setSortType (state, action) {
      state.sortType = action.payload;
    },
    resetOffset (state) {
      state.offset = 0;
    },
    setOffset (state, {payload}) {
      state.offset = payload;
    },
    increaseOffset (state) {
      state.offset += COMMENT_LIMIT;
    },
    resetComments (state) {
      state.comments = [];
      state.count = 0;
      state.sortType = defaultSortType;
      state.offset = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsComments.fulfilled, (state, action) => {
        const newComments = action.payload?.list || []
        state.comments = state.offset ? [...state.comments, ...newComments] : newComments;
        state.count = action.payload?.count || 0;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(fetchNewsComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchNewsComments.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(addNewsComment.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(addNewsComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addNewsComment.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
  },
})

export const {
  resetInputCommentData,
  // setFakeCommentData,
  setInputCommentId,
  setInputCommentType,
  resetComments,
  setSortType,
  increaseOffset,
  resetOffset,
  setOffset,
  setComments,
  setOpenRootComment
} = newsCommentsSlice.actions;

