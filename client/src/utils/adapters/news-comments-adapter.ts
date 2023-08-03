import { ChildCommentCC, ChildCommentSC, NewsCommentCC, NewsCommentSC, NewsCommentsDataCC, NewsCommentsDataSC, ParentCommentCC, ParentCommentSC } from "../../types/news-comments-types";


export const adaptServerParentCommentToClient = (data: ParentCommentSC): ParentCommentCC => ({
  commentId: data.comment_id,
  userId: data.user_id,
  userNik: data.user_nik,
})

export const adaptServerChildCommentToClient = (data: ChildCommentSC): ChildCommentCC => ({
  newsId: data.news_id,
  commentId: data.comment_id,
  dateAdded: data.date_added,
  dateUpdated: data.date_updated,
  text: data.text,
  userId: data.user_id,
  userNik: data.user_nik,
  rootCommentId: data.root_comment_id,
  avatar: data.avatar,
  image: data.image,
  parentComment: data.parent_comment ? adaptServerParentCommentToClient(data.parent_comment) : undefined
})


export const adaptServerNewsCommentToClient = (data: NewsCommentSC): NewsCommentCC => ({
  commentId: data.comment_id,
  dateAdded: data.date_added,
  dateUpdated: data.date_updated,
  text: data.text,
  userId: data.user_id,
  userNik: data.user_nik,
  newsId: data.news_id,
  newsTitle: data.news_title,
  childCommentCount: data.child_comment_count,
  rootCommentId: data.root_comment_id,
  avatar: data.avatar,
  image: data.image,
  childComments: data.child_comments?.map(adaptServerChildCommentToClient),

});

export const adaptServerNewsCommentsDataToClient = (result: NewsCommentsDataSC): NewsCommentsDataCC => ({
  list: result.list.map(adaptServerNewsCommentToClient),
  count: +result.count,
});
