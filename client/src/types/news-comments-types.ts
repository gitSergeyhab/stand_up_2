import { CommonListDataType } from "./common-types";

export type ParentCommentSC = {
  comment_id: string,
  user_id: string,
  user_nik: string
}

export type ParentCommentCC = {
  commentId: string,
  userId: string,
  userNik: string
}

export type ChildCommentSC = {
  comment_id: string,
  root_comment_id?: string,
  date_added: Date,
  date_updated: Date,
  user_id: string,
  user_nik: string,
  text: string,
  avatar?: string,
  image?: string,
  parent_comment?: ParentCommentSC
}

export type ChildCommentCC = {
  commentId: string,
  rootCommentId?: string,
  dateAdded: Date,
  dateUpdated: Date,
  userId: string,
  userNik: string,
  text: string,
  avatar?: string,
  image?: string,
  parentComment?: ParentCommentCC
}


export type NewsCommentSC = {
  comment_id: string,
  root_comment_id?: string,
  date_added: Date,
  date_updated: Date,
  user_id: string,
  user_nik: string,
  news_id: string,
  news_title: string,
  text: string,
  child_comments?: ChildCommentSC[],
  child_comment_count?: string,
  avatar?: string,
  image?: string
}

export type NewsCommentCC = {
  commentId: string,
  rootCommentId?: string,
  dateAdded: Date,
  dateUpdated: Date,
  userId: string,
  userNik: string,
  newsId: string,
  newsTitle: string,
  text: string,
  childComments?: ChildCommentCC[],
  childCommentCount?: string,
  avatar?: string,
  image?: string
}

export type NewsCommentsDataSC = CommonListDataType<NewsCommentSC>

export type NewsCommentsDataCC = CommonListDataType<NewsCommentCC>

export type NewsCommentsState = {
  commentId: string,
  text: string,
}
