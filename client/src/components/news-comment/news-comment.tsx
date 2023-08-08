import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NewsCommentCC } from "../../types/news-comments-types";
import { CommentUL,  ShowMoreBtn } from "./news-comment-style";
import {  NewsChildComment, NewsCommonComment } from "../news-common-comment/news-common-comment";
import { CommentLi } from "../news-common-comment/news-common-comment-style";
import { getNewsCommentsData } from "../../store/news-comments-slice/news-comment-selectors";



type NewsCommentProps = {
  comment: NewsCommentCC;
}

export function NewsComment({comment}: NewsCommentProps) {

  const {openedRootCommentId} = useSelector(getNewsCommentsData);
  const { childComments } = comment;
  const [areChildren, setChildren] = useState(false);

  useEffect(() => {
    // без useEffect areChildren не меняется на тру при
    // const [areChildren, setChildren] = useState(openedRootCommentId === comment.commentId);
    setChildren(openedRootCommentId === comment.commentId)
  }, [openedRootCommentId, comment])



  const handleShowBtnClick = () =>  setChildren((prev) => !prev);

  const btnText = areChildren ? 'Скрыть ответы' : `Показать ответы (${childComments?.length})`;
  const showButton = (childComments?.length)  ?
    <ShowMoreBtn onClick={handleShowBtnClick}>{btnText}</ShowMoreBtn> : null;
  const childElements = childComments?.map((item) =>
    <NewsChildComment key={item.commentId} comment={item} />)
  const childList =  areChildren ? <CommentUL> {childElements}</CommentUL> : null;

  return (
    <CommentLi >
      <NewsCommonComment comment={comment} key={comment.commentId} />
      {showButton}
      {childList}
    </CommentLi>
  )
}
