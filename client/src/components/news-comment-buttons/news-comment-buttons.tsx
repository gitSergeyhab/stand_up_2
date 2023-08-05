import {RiQuestionAnswerLine} from 'react-icons/ri'
import {TbWriting, TbTrashX} from 'react-icons/tb'
import {BiLike, BiDislike} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user-reducer/user-selectors";
import { setCommentType, setCurrentComment } from "../../store/actions";
import { ButtonsWrapper, CommentButton } from './news-comment-buttons-style';


type CommentButtonsProps = {
  commentId: string;
  userId: string;
}

export function NewsCommentButtons({ commentId, userId } : CommentButtonsProps) {

  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isUserComment = user?.id === String(userId);

  const handleToCommentClick = () => {
    dispatch(setCurrentComment(commentId))
    dispatch(setCommentType('re-comment'))
  }

  const handleToCorrectClick = () => {
    dispatch(setCurrentComment(commentId))
    dispatch(setCommentType('correct'))
  }

  const handleLikeClick = () => {
    console.log('like', {commentId})
  }

  const handleDisLikeClick = () => {
    console.log('!like', {commentId})
  }
  return (
    <ButtonsWrapper>
      <CommentButton onClick={handleLikeClick} disabled>
        <BiLike />
      </CommentButton>

      <CommentButton onClick={handleDisLikeClick}>
        <BiDislike  />
      </CommentButton>
      &nbsp;&nbsp;
      <CommentButton title="комментировать" disabled={!user} onClick={handleToCommentClick}>
        <RiQuestionAnswerLine />
      </CommentButton>
      <CommentButton title="править" disabled={!isUserComment} onClick={handleToCorrectClick}>
        <TbWriting />
      </CommentButton>

      <CommentButton disabled={!isUserComment} >
        <TbTrashX />
      </CommentButton>

    </ButtonsWrapper>
  )
}
