import { useState } from "react";
import { NewsCommentCC } from "../../types/news-comments-types";
import { CommentUL,  ShowMoreBtn } from "./news-comment-style";
import { ChildComment, CommonComment } from "../news-common-comment/news-common-comment";
import { CommentLi } from "../news-common-comment/news-common-comment-style";



type NewsCommentProps = {
  comment: NewsCommentCC;
}

export function NewsComment({comment}: NewsCommentProps) {

  const { childCommentCount, childComments } = comment;
  const [areChildren, setChildren] = useState(false);

  const handleShowBtnClick = () =>  setChildren((prev) => !prev);

  const btnText = areChildren ? 'Скрыть ответы' : `Показать ответы (${childCommentCount})`;
  const showButton = childCommentCount ?
    <ShowMoreBtn onClick={handleShowBtnClick}>{btnText}</ShowMoreBtn> : null;
  const childElements = childComments?.map((item) =>
    <ChildComment key={item.commentId} comment={item} />)
  const childList =  areChildren ? <CommentUL> {childElements}</CommentUL> : null;

  return (
    <CommentLi >
      <CommonComment comment={comment} key={comment.commentId} />
      {showButton}
      {childList}
    </CommentLi>
  )
}
