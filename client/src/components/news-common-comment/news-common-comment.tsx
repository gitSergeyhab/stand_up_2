import { useDispatch, useSelector } from "react-redux";
import { ChildCommentCC } from "../../types/news-comments-types";
import { CommentImage, CommentLi, CommonCommentDiv, TextDiv } from "./news-common-comment-style";
import { getInputCommentId, getInputCommentType } from "../../store/comment-reducer/comment-selectors";
import { resetCommentInput } from "../../store/actions";
import { getRowLinkedText } from "../../utils/format-text";
import { NewsCommentInputBlock } from "../news-comment-input-block/news-comment-input-block";
import { NewsCommentUserBlock } from "../news-comment-user-block/news-comment-user-block";
import { SERVER_URL } from "../../const/const";
import { NewsCommentDateRateBtn } from "../news-comment-date-rate-btn/news-comment-date-rate-btn";


type ChildCommentProps = { comment: ChildCommentCC, isFake?: boolean }

export function NewsCommonComment ({comment, isFake}:  ChildCommentProps) {

  const { commentId, dateAdded,
    // dateUpdated,
    text, userId, userNik, rootCommentId, avatar, image, parentComment, newsId } = comment;
  const dispatch = useDispatch()

  const inputCommentId = useSelector(getInputCommentId);
  const typeCommentInput = useSelector(getInputCommentType);

  const src = isFake ? image : `${SERVER_URL}${image}`
  const commentImage = image ? <CommentImage src={src} /> : null;
  const commentText = parentComment?.userNik ? `${parentComment?.userNik}, ${text}` : text;
  const textP = <TextDiv>{getRowLinkedText(commentText || '')}</TextDiv>;

  const handleCloseInput = () =>  dispatch(resetCommentInput());

  const inputReCommentBlock = (inputCommentId === comment.commentId) && typeCommentInput === "re-comment" ? (
    <NewsCommentInputBlock
      newsId={newsId}
      commentId={commentId}
      rootCommentId={rootCommentId || commentId}
      onCloseInput={handleCloseInput}
    />
  ) : null;

  const inputChangeCommentBlock = (
    <NewsCommentInputBlock
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
      <NewsCommentUserBlock commentId={commentId} avatar={avatar} userId={userId} userNik={userNik}/>
      {commentImage}
      {commentContent}
      <NewsCommentDateRateBtn commentId={commentId} dateAdded={dateAdded} userId={userId}/>
      {inputReCommentBlock}
    </CommonCommentDiv>
  )
}


export function NewsChildComment({comment, isFake}:  ChildCommentProps) {
 return (
  <CommentLi>
    <NewsCommonComment comment={comment} isFake={isFake} />
  </CommentLi>
 )
}
