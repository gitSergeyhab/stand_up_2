import { RiQuestionAnswerLine } from 'react-icons/ri'
import { TbWriting } from 'react-icons/tb'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user-reducer/user-selectors";
import { ButtonsWrapper, CommentButton, LikeRating } from './news-comment-buttons-style';
import { setInputCommentId, setInputCommentType } from '../../store/news-comments-slice/news-comments-slice';
import { ChildCommentCC } from '../../types/news-comments-types';
import { LikeButton } from '../like-button/like-button';
import { NewsCommentDeleteBtn } from '../news-comment-delete-btn/news-comment-delete-btn';


const getLikeColor = (rate: number) => {
  if (!rate) return '#FFF';
  return rate > 0 ? '#1eac04' : '#fb1616';
}

type CommentButtonsProps = {
  comment: ChildCommentCC
}

export function NewsCommentButtons({ comment } : CommentButtonsProps) {

  const {commentId, userId, likes} = comment;

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isUserComment = user?.id === String(userId);


  const handleToCommentClick = () => {
    dispatch(setInputCommentId(commentId));
    dispatch(setInputCommentType('re-comment'));
  }

  const handleToCorrectClick = () => {
    dispatch(setInputCommentId(commentId));
    dispatch(setInputCommentType('correct'));
  }

  const likeRate = likes.likeCount - likes.dislikeCount;
  const likeColor = getLikeColor(likeRate);

  return (
    <ButtonsWrapper>
      <LikeButton type='like' comment={comment}/>
      <LikeRating color={likeColor} className="del-marker">{likeRate}</LikeRating>
      <LikeButton type='dislike' comment={comment}/>
      &nbsp;&nbsp;
      <CommentButton title="комментировать" disabled={!user} onClick={handleToCommentClick} className="del-marker">
        <RiQuestionAnswerLine />
      </CommentButton>
      <CommentButton title="править" disabled={!isUserComment} onClick={handleToCorrectClick} className="del-marker">
        <TbWriting />
      </CommentButton>
      <NewsCommentDeleteBtn comment={comment} />
    </ButtonsWrapper>
  )
}
