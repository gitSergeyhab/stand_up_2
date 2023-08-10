import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { NewsCommentCC, NewsCommentSC, NewsCommentsDataSC } from "../../types/news-comments-types";
import { adaptServerNewsCommentToClient, adaptServerNewsCommentsDataToClient } from "../../utils/adapters/news-comments-adapter";
import { api } from "../api";
import { newsCommentsSlice, resetInputCommentData, setComments, setOpenRootComment } from "./news-comments-slice";
import { ReducerType } from "../store";
import { updateComments } from "../../utils/update-comment";

type FetchNewsComments = {
  id: string,
  offset: number,
  sort: string|number
}

export const fetchNewsComments = createAsyncThunk(
  'news-comments/fetchNewsComments',
  async ({ id, offset, sort }:FetchNewsComments) => {
    try {
      const {data} = await api.get<NewsCommentsDataSC>(`/news-comments/${id}`, {params: {offset, sort}})
      return adaptServerNewsCommentsDataToClient(data);
    } catch (err) {
      console.log({err})
      toast.error('невозможно загрузить данные. попробуйте позже')
      return null;
    }
  }
)


type AddNewsComments = {
  body: FormData;
  onSuccess: (addedCommentId: string) => void;
  onAnyCase: () => void;
}

export const addNewsComment = createAsyncThunk(
  'news-comments/addNewsComments',
  async ({body, onSuccess, onAnyCase}: AddNewsComments, { getState, dispatch }) => {
    try {
      let newComments: NewsCommentCC[] = [];
      const {data} = await api.post<NewsCommentSC>(`/news-comments`, body, {params: {dir: 'comments'}})
      const commentCC = adaptServerNewsCommentToClient(data);
      const rootId = commentCC.rootCommentId;
      const state = getState() as ReducerType
      const oldComments = state[newsCommentsSlice.name].comments;
      const rootCommentIndex = oldComments.findIndex((item) => item.commentId === rootId);
      if (rootCommentIndex === -1) {
        newComments = [commentCC, ...oldComments]; // если добавлен корневой коммент, до добавить его в начало
      } else {// если добавлен дочерний коммент
        const rootComment = oldComments[rootCommentIndex];
        const childComments = rootComment?.childComments ? [...rootComment.childComments, commentCC] : [commentCC]; // взять все комеенты родительского, к ним добавить новый
        const leftComments = oldComments.slice(0, rootCommentIndex);
        const rightComments = oldComments.slice(rootCommentIndex + 1);
        const newComment = {...rootComment, childComments}
        newComments = [...leftComments, newComment, ...rightComments]
      }

      dispatch(setComments(newComments));
      dispatch(resetInputCommentData())
      onSuccess(commentCC.commentId);
      dispatch(setOpenRootComment(commentCC.rootCommentId))
    } catch (err) {
      toast.error('добавление комментариев временно недоступно, попробуйте позже');
    }
    onAnyCase();
  }
)

type ChangeNewsComments = {
  commentId: string;
  body: FormData;
  onSuccess: (addedCommentId: string) => void;
  onAnyCase: () => void;
}

export const changeNewsComment = createAsyncThunk(
  'news-comments/changeNewsComment',
  async ({commentId, body, onSuccess, onAnyCase}: ChangeNewsComments, { getState, dispatch }) => {
    try {
      const {data} = await api.put<NewsCommentSC>(`/news-comments/${commentId}`, body, {params: {dir: 'comments'}});
      const commentCC = adaptServerNewsCommentToClient(data);
      const state = getState() as ReducerType
      const oldComments = state[newsCommentsSlice.name].comments;
      const newComments = updateComments(oldComments, commentCC);

      dispatch(setComments(newComments));
      dispatch(resetInputCommentData());
      onSuccess(commentCC.commentId);
      dispatch(setOpenRootComment(commentCC.rootCommentId));
    } catch (err) {
      console.log({err})
      toast.error('изменение комментариев временно недоступно, попробуйте позже');
    }
    onAnyCase();
  }
)

type ToggleNewsCommentDeleteStatus = {
  commentId: string;
  status: boolean;
}

export const toggleNewsCommentDeleteStatus = createAsyncThunk(
  'news-comments/changeNewsComment',
  async ({commentId, status}: ToggleNewsCommentDeleteStatus, { getState, dispatch }) => {
    try {
      const {data} = await api.patch<NewsCommentSC>(`/news-comments/${commentId}`, {deleted: status}, {params: {dir: 'comments'}});
      const commentCC = adaptServerNewsCommentToClient(data);
      const state = getState() as ReducerType;
      const oldComments = state[newsCommentsSlice.name].comments;
      const newComments = updateComments(oldComments, commentCC);

      dispatch(setComments(newComments));
      dispatch(resetInputCommentData());
      dispatch(setOpenRootComment(commentCC.rootCommentId));
    } catch (err) {
      console.log({err});
      toast.error('изменение комментариев временно недоступно, попробуйте позже');
    }
  }
)

type AddNewsCommentLike = {
  body: {value: number; commentId: string};
}

export const addNewsCommentLike = createAsyncThunk(
  'news-comments/addNewsCommentLike',
  async ({body}: AddNewsCommentLike, { getState, dispatch }) => {
    try {
      const {data} = await api.post<NewsCommentSC>(`/news-comments/likes`, body);
      const commentCC = adaptServerNewsCommentToClient(data);
      const state = getState() as ReducerType;
      const oldComments = state[newsCommentsSlice.name].comments;
      const newComments = updateComments(oldComments, commentCC);

      dispatch(setComments(newComments));
      dispatch(setOpenRootComment(commentCC.rootCommentId));
    } catch (err) {
      console.log({err});
      toast.error('изменение комментариев временно недоступно, попробуйте позже');
    }
  }
)

type ChangeNewsCommentLike = {
  likeId: string|number;
  value: number;
}

export const changeNewsCommentLike = createAsyncThunk(
  'news-comments/changeNewsCommentLike',
  async ({likeId, value}: ChangeNewsCommentLike, { getState, dispatch }) => {
    try {
      const {data} = await api.put<NewsCommentSC>(`/news-comments/likes/${likeId}`, {value});
      const commentCC = adaptServerNewsCommentToClient(data);
      const state = getState() as ReducerType;
      const oldComments = state[newsCommentsSlice.name].comments;
      const newComments = updateComments(oldComments, commentCC);

      dispatch(setComments(newComments));
      dispatch(setOpenRootComment(commentCC.rootCommentId));
    } catch (err) {
      console.log({err});
      toast.error('изменение комментариев временно недоступно, попробуйте позже');
    }
  }
)
