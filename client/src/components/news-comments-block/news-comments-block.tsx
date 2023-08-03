import { useLocation } from "react-router-dom"

import { useGetCommentsByNewsIdQuery } from "../../store/news-api"
import { ErrorPage } from "../../pages/error-page/error-page";
import { BigSpinner } from "../spinner/big-spinner";
import { NewsComment } from "../news-comment/news-comment";
import { CommentHeader, CommentSection, CommentUL, MoreCommentButton } from "./news-comments-block-style";
import { CommentInput } from "../comment-input/comment-input";
import { CommentSortBlock } from "../comment-sort-block/comment-sort-block";








export function NewsCommentsBlock({newsId} : {newsId: string}) {


  const { search } = useLocation();



  const { isError, isLoading, data, error } = useGetCommentsByNewsIdQuery({id: newsId, search});

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data ) {
    return <BigSpinner />;
  }

  const {list} = data;

  const commentsElements = list.map((item) =>  <NewsComment key={item.commentId} comment={item}/>)





  return(
    <CommentSection>
      <CommentHeader>Комментарии</CommentHeader>

      <CommentInput  newsId={newsId}/>


      <CommentSortBlock/>


      <CommentUL>
        {commentsElements}
      </CommentUL>

      <MoreCommentButton> Показать еще комментарии </MoreCommentButton>
    </CommentSection>
  )
}
