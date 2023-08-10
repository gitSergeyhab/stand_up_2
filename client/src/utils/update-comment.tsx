import { ChildCommentCC, NewsCommentCC } from "../types/news-comments-types";

const replaceComment = (comments: NewsCommentCC[]|ChildCommentCC[], newComment: NewsCommentCC|ChildCommentCC) => {
  const commentIndex = comments.findIndex((item) => String(item.commentId) === String(newComment.commentId));
  const leftComments = comments.slice(0, commentIndex);
  const rightComments = comments.slice(commentIndex + 1);
  return [...leftComments, newComment, ...rightComments];
}

export const updateComments = (oldComments: NewsCommentCC[], newComment: NewsCommentCC) => {
  let newComments: NewsCommentCC[] = [];
  const rootId = newComment.rootCommentId;
  const rootCommentIndex = oldComments.findIndex((item) => item.commentId === rootId);
  if (rootCommentIndex === -1) {// если добавлен корневой коммент,
    newComments = replaceComment(oldComments, newComment) as NewsCommentCC[];
  } else {// если добавлен дочерний коммент
    const rootComment = oldComments[rootCommentIndex];
    const childComments = rootComment?.childComments;
    if (!childComments) {
      return null;
    }
    const newChildComments = replaceComment(childComments, newComment);
    const newRootComment = {...rootComment, childComments: newChildComments};
    const leftRootComments = oldComments.slice(0, rootCommentIndex);
    const rightRootComments = oldComments.slice(rootCommentIndex + 1);
    newComments = [...leftRootComments, newRootComment, ...rightRootComments];
  }
  return newComments;
}
