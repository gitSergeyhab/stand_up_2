import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsCommentCC } from "../../types/news-comments-types";
import { CommentType,  OptionType } from "../../types/types";
import { COMMENT_LIMIT } from "../../const/const";
import { addNewsComment, addNewsCommentLike, changeNewsCommentLike, fetchNewsComments, toggleNewsCommentDeleteStatus } from "./news-comments-thunks";

// type FakeCommentData = NewsCommentCC & {timeStamp: number}

export type InitialNewsCommentsState = {
  inputCommentType?: CommentType;
  inputCommentId?: string;
  comments: NewsCommentCC[];
  count: number;
  isLoading: boolean;
  isSubLoading: boolean;
  changCommentId?: string|number;
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
  isSubLoading: false,
  isError: false,
  sortType: defaultSortType,
  offset: 0,
};

export const newsCommentsSlice = createSlice({
  name: 'news-comments',
  initialState,
  reducers: {
    setChangComment(state, {payload}) {
      state.changCommentId = payload;
    },
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

      .addCase(addNewsCommentLike.fulfilled, (state) => {
        state.changCommentId = undefined;
      })
      .addCase(addNewsCommentLike.rejected, (state) => {
        state.changCommentId = undefined;
      })

      .addCase(changeNewsCommentLike.fulfilled, (state) => {
        state.changCommentId = undefined;
      })
      .addCase(changeNewsCommentLike.rejected, (state) => {
        state.changCommentId = undefined;
      })

      .addCase(toggleNewsCommentDeleteStatus.fulfilled, (state) => {
        state.changCommentId = undefined;
      })
      .addCase(toggleNewsCommentDeleteStatus.rejected, (state) => {
        state.changCommentId = undefined;
      })
  },
})

export const {
  setChangComment,
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

