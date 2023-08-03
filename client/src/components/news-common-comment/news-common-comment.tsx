import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { ChildCommentCC } from "../../types/news-comments-types";
import { formatDateFromTimeStamp } from "../../utils/date-utils";
import { UserLink } from "../common/common-style";
import { DefaultPath, SERVER_URL } from "../../const/const";
import { CommentImage, CommentLi, CommonCommentDiv, ContentWrapperDiv, DateP, DateSpan, Header, LikeRating,  SmallImg, TextDiv } from "./news-common-comment-style";
import { CommentButtons } from "../comment-buttons/comment-buttons";
import { getInputCommentId, getInputCommentType } from "../../store/comment-reducer/comment-selectors";
import { resetCommentInput } from "../../store/actions";
import { getRowLinkedText } from "../../utils/format-text";
import { CommentInputBlock } from "../comment-input-block/comment-input-block";


type ChildCommentProps = {
  comment: ChildCommentCC;
}

export function CommonComment ({comment}:  ChildCommentProps) {

  const { commentId, dateAdded,
    // dateUpdated,
    text, userId, userNik, rootCommentId, avatar, image, parentComment, newsId } = comment;
  const dispatch = useDispatch()


  const inputCommentId = useSelector(getInputCommentId);
  const typeCommentInput = useSelector(getInputCommentType);
  const formatDate =  formatDateFromTimeStamp(dateAdded);
  const userAvatar = avatar ? SERVER_URL + avatar : DefaultPath.Any;

  const commentImage = image ? <CommentImage src={`${SERVER_URL}${image}`} /> : null;

  const commentText = parentComment?.userNik ? `${parentComment?.userNik}, ${text}` : text;
  const textP = <TextDiv>{getRowLinkedText(commentText)}</TextDiv>;

  const handleCloseInput = () =>  dispatch(resetCommentInput());

  const inputReCommentBlock = (inputCommentId === comment.commentId) && typeCommentInput === "re-comment" ? (
    <CommentInputBlock
      newsId={newsId}
      commentId={commentId}
      rootCommentId={rootCommentId || commentId}
      onCloseInput={handleCloseInput}
    />
  ) : null;

  const inputChangeCommentBlock = (
    <CommentInputBlock
      newsId={newsId}
      commentId={commentId}
      rootCommentId={rootCommentId}
      defaultText={text}
      image={image}
      onCloseInput={handleCloseInput}
    />
  );

  const commentContent = (inputCommentId === comment.commentId) && typeCommentInput === "correct"
    ? inputChangeCommentBlock : textP;

  return (
    <CommonCommentDiv>
      <ContentWrapperDiv>
        <Link to={`/users/${userId}`} id={`comment-${commentId}`}><SmallImg src={userAvatar}/></Link>
        <Header><UserLink to={`/users/${userId}`}>  {userNik}</UserLink></Header>
      </ContentWrapperDiv>
        {commentImage}
        {commentContent}
        <DateP>
          <DateSpan>{formatDate}</DateSpan>
          <LikeRating>+12</LikeRating>
          <CommentButtons
            commentId={commentId}
            userId={userId}
          />
        </DateP>
        {inputReCommentBlock}
    </CommonCommentDiv>
  )
}


export function ChildComment({comment}:  ChildCommentProps) {
 return (
  <CommentLi>

    <CommonComment comment={comment} />
  </CommentLi>
 )
}
