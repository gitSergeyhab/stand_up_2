import { Link } from "react-router-dom"
import { useState } from "react";
import { ChildCommentCC, NewsCommentCC } from "../../types/news-comments-types";
import { formatDateFromTimeStamp } from "../../utils/date-utils";
import { UserLink } from "../common/common-style";
import { DefaultPath, SERVER_URL } from "../../const/const";
import { CommentImage, CommentLi, CommentUL, CommonCommentDiv, ContentWrapperDiv, DateP, DateSpan, Header, LikeRating, ShowMoreBtn, SmallImg, TextP } from "./news-comment-style";
import { CommentButtons } from "../comment-buttons/comment-buttons";



export function CommonComment ({comment}:  {comment: ChildCommentCC}) {
  const { commentId, dateAdded, dateUpdated, text, userId, userNik, rootCommentId, avatar, image, parentComment } = comment;
  const formatDate =  formatDateFromTimeStamp(dateAdded);

  const userAvatar = avatar ? SERVER_URL + avatar : DefaultPath.Any;

  const commentImage = image ? <CommentImage src={`${SERVER_URL}${image}`} /> : null;
  return (
    <CommonCommentDiv>

      <ContentWrapperDiv>
        <Link to={`/users/${userId}`}><SmallImg src={userAvatar}/></Link>
        <Header><UserLink to={`/users/${userId}`}>  {userNik}</UserLink></Header>
      </ContentWrapperDiv>


        {commentImage}
        <TextP>{text}</TextP>
        <DateP>
          <DateSpan>{formatDate}</DateSpan>
          <LikeRating>+12</LikeRating>
          <CommentButtons commentId={commentId} userId={userId}/>
        </DateP>
    </CommonCommentDiv>

  )
}

function ChildComment({comment}:  {comment: ChildCommentCC}) {


 return (
  <CommentLi>
    <CommonComment comment={comment} />
  </CommentLi>
 )
}


export function NewsComment({comment}:  {comment: NewsCommentCC}) {

  const { childCommentCount, childComments } = comment;

  const [areChildren, setChildren] = useState(false);

  const handleShowBtnClick = () =>  setChildren((prev) => !prev);

  const btnText = areChildren ? 'Скрыть ответы' : `Показать ответы (${childCommentCount})`
  const showButton = childCommentCount ?
    <ShowMoreBtn onClick={handleShowBtnClick}>{btnText}</ShowMoreBtn> : null;
  const childElements = childComments?.map((item) => <ChildComment key={item.commentId} comment={item}/>)
  const childList =  areChildren ? <CommentUL> {childElements}</CommentUL> : null;

  return (
    <CommentLi>
      <CommonComment comment={comment} />
      {showButton}
      {childList}
    </CommentLi>
  )
}
