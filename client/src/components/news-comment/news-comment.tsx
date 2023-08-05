import { useState } from "react";
import { NewsCommentCC } from "../../types/news-comments-types";
import { CommentUL,  ShowMoreBtn } from "./news-comment-style";
import {  NewsChildComment, NewsCommonComment } from "../news-common-comment/news-common-comment";
import { CommentLi } from "../news-common-comment/news-common-comment-style";



type NewsCommentProps = {
  comment: NewsCommentCC;
  isFake?: boolean;
}

export function NewsComment({comment, isFake}: NewsCommentProps) {

  const { childCommentCount, childComments } = comment;
  const [areChildren, setChildren] = useState(false);

  const handleShowBtnClick = () =>  setChildren((prev) => !prev);

  const btnText = areChildren ? 'Скрыть ответы' : `Показать ответы (${childCommentCount})`;
  const showButton = (childCommentCount && +childCommentCount) ?
    <ShowMoreBtn onClick={handleShowBtnClick}>{btnText}</ShowMoreBtn> : null;
  const childElements = childComments?.map((item) =>
    <NewsChildComment key={item.commentId} comment={item} />)
  const childList =  areChildren ? <CommentUL> {childElements}</CommentUL> : null;

  return (
    <CommentLi >
      <NewsCommonComment comment={comment} key={comment.commentId}  isFake={isFake}/>
      {showButton}
      {childList}
    </CommentLi>
  )
}
