import { NewsCommentCC } from "../types/news-comments-types";

export const updateComments = (oldComments: NewsCommentCC[], newComment: NewsCommentCC) => {
  let newComments: NewsCommentCC[] = [];
  const rootId = newComment.rootCommentId;
  const rootCommentIndex = oldComments.findIndex((item) => item.commentId === rootId);
  if (rootCommentIndex === -1) {// если добавлен корневой коммент,
    const commentIndex = oldComments.findIndex((item) => item.commentId === newComment.commentId);
    const leftComments = oldComments.slice(0, commentIndex);
    const rightComments = oldComments.slice(commentIndex + 1);
    newComments = [...leftComments, newComment, ...rightComments];
  } else {// если добавлен дочерний коммент
    const rootComment = oldComments[rootCommentIndex];
    const childComments = rootComment?.childComments;
    if (!childComments) {
      return null;
    }
    const commentIndex = childComments.findIndex((item) => String(item.commentId) === String(newComment.commentId));
    const leftChildComments = childComments.slice(0, commentIndex);
    const rightChildComments = childComments.slice(commentIndex + 1);
    const newChildComments = [...leftChildComments, newComment, ...rightChildComments];
    const newRootComment = {...rootComment, childComments: newChildComments};
    const leftRootComments = oldComments.slice(0, rootCommentIndex);
    const rightRootComments = oldComments.slice(rootCommentIndex + 1);
    newComments = [...leftRootComments, newRootComment, ...rightRootComments];
  }
  return newComments;
}
