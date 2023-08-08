import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { NewsComment } from "../news-comment/news-comment";
import { CommentHeader, CommentSection, CommentUL } from "./news-comments-block-style";
import { NewsCommentInput } from "../news-comment-input/news-comment-input";
import { NewsCommentSortBlock } from "../news-comment-sort-block/news-comment-sort-block";
import { NewsCommentsMoreBtn } from "../news-comments-more-btn/news-comments-more-btn";
import {  getNewsCommentsData } from "../../store/news-comments-slice/news-comment-selectors";
import { resetComments } from "../../store/news-comments-slice/news-comments-slice";
import { fetchNewsComments } from "../../store/news-comments-slice/news-comments-thunks";


export function NewsCommentsBlock({newsId} : {newsId: string}) {


  const {comments, count, isError, isLoading, offset, sortType} = useSelector(getNewsCommentsData);


  const dispatch = useDispatch()
  // const fakeCommentData = useSelector(getFakeCommentData)

  // useEffect(() => {
  //   dispatch(setFakeCommentData(undefined))
  // }, [dispatch])

  useEffect(() => {
    dispatch(resetComments()) // обнулить комменты при 1-ом рендеринге
  }, [dispatch])

  if (isError) {
    console.log({isError})
  }

  useEffect(() => {
    dispatch(fetchNewsComments({id: newsId, offset, sort: sortType.id}) as unknown as AnyAction)
  }, [dispatch, newsId, offset, sortType])


  const commentsElements = comments.map((item) =>
    <NewsComment key={item.commentId} comment={item} />);

  const commentsLength = comments.length

  return(
    <CommentSection>
      <CommentHeader>Комментарии</CommentHeader>
      <NewsCommentInput  newsId={newsId}/>
      <NewsCommentSortBlock  />
      <CommentUL>
        {commentsElements}
      </CommentUL>
      <NewsCommentsMoreBtn
        isLoading={isLoading}
        count={count}
        length={commentsLength}
      />
    </CommentSection>
  )
}
