import { useDispatch, useSelector } from "react-redux";
import { ChildCommentCC } from "../../types/news-comments-types";
import { CommentImage, CommentLi, CommonCommentDiv, TextDiv } from "./news-common-comment-style";
// import { getInputCommentId, getInputCommentType } from "../../store/comment-reducer/comment-selectors";
import { resetCommentInput } from "../../store/actions";
import { getRowLinkedText } from "../../utils/format-text";
import { NewsCommentInputBlock } from "../news-comment-input-block/news-comment-input-block";
import { NewsCommentUserBlock } from "../news-comment-user-block/news-comment-user-block";
import { SERVER_URL } from "../../const/const";
import { NewsCommentDateRateBtn } from "../news-comment-date-rate-btn/news-comment-date-rate-btn";
import { getInputCommentId, getInputCommentType } from "../../store/news-comments-slice/news-comment-selectors";
import { getUser } from "../../store/user-reducer/user-selectors";


type ChildCommentProps = { comment: ChildCommentCC }

export function NewsCommonComment ({comment}:  ChildCommentProps) {

  const {commentId, text, userId, userNik, rootCommentId, avatar, image, parentComment, newsId, deleted} = comment;
  const dispatch = useDispatch()
  const inputCommentId = useSelector(getInputCommentId);
  const typeCommentInput = useSelector(getInputCommentType);
  const user = useSelector(getUser);

  const src =  `${SERVER_URL}${image}`
  const commentImage = image ? <CommentImage src={src} loading="lazy" className="del-marker" /> : null;
  const commentText = parentComment?.userNik ? `${parentComment?.userNik}, ${text}` : text;
  const textP = <TextDiv className="del-marker" >{getRowLinkedText(commentText || '')}</TextDiv>;

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


  const isShowContent = !deleted || String(userId) === user?.id;

  if (!isShowContent) {
    return <div>Коментарий удален</div>;
  }

  return (
    <CommonCommentDiv deleted={deleted}>
      <NewsCommentUserBlock commentId={commentId} avatar={avatar} userId={userId} userNik={userNik} />
      {deleted ? 'комментарий удален' : ''}
      {commentImage}
      {commentContent}
      <NewsCommentDateRateBtn comment={comment} />
      {inputReCommentBlock}
    </CommonCommentDiv>
  )
}

export function NewsChildComment({comment}:  ChildCommentProps) {
 return (
  <CommentLi>
    <NewsCommonComment comment={comment} />
  </CommentLi>
 )
}
