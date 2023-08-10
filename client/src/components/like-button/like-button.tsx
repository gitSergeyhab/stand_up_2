import { BiLike, BiDislike } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';
import { ChildCommentCC, LikesCC } from "../../types/news-comments-types";
import { CommentButton } from "../news-comment-buttons/news-comment-buttons-style";
import { getUser } from '../../store/user-reducer/user-selectors';
import { addNewsCommentLike, changeNewsCommentLike } from '../../store/news-comments-slice/news-comments-thunks';
import { getNewsCommentsData } from '../../store/news-comments-slice/news-comment-selectors';
import { setChangComment } from '../../store/news-comments-slice/news-comments-slice';

type LikeType = 'like'|'dislike';

export const LoaderWrapper = styled.div`
  padding: 0 .15rem;
`;

type GetChosen = {
  type: LikeType;
  likes: LikesCC;
}
const getChosen = ({likes, type}: GetChosen) => {
  switch (type) {
    case 'like': return likes.userValue === 1;
    case 'dislike': return likes.userValue === -1;
    default: return false;
  }
}

type GetNewValue = {
  type: LikeType;
  likes: LikesCC;
}
const getNewValue = ({likes, type}: GetNewValue) => {
  switch (likes.userValue) {
    case 1: return type === 'like' ? 0 : -1;
    case -1: return type === 'like' ? 1 : 0;
    default: return type === 'like' ? 1 : -1;
  }
}


type LikeButtonProps = {
  type: LikeType;
  comment: ChildCommentCC;
}
export function LikeButton({comment, type}: LikeButtonProps) {

  const {likes, userId, commentId} = comment;
  const user = useSelector(getUser);
  const { changCommentId } = useSelector(getNewsCommentsData);
  const dispatch = useDispatch();
  const chosen = getChosen({likes, type});
  const disabled = !user || userId === user.id;
  const btnImage = type === 'like' ? <BiLike /> : <BiDislike />

  const handleLikeClick = () => {
    const value = getNewValue({likes, type});
    const {likeId} = likes;
    dispatch(setChangComment(commentId))
    if (likeId) {
      dispatch(changeNewsCommentLike({likeId, value}) as unknown as AnyAction)
    } else {
      const body = {commentId, value}
      dispatch(addNewsCommentLike({body}) as unknown as AnyAction)
    }
  }

  if (changCommentId === commentId) {
    return <LoaderWrapper><HashLoader size={12}/></LoaderWrapper>
  }

  return (
    <CommentButton onClick={handleLikeClick} chosen={chosen} disabled={disabled} className="del-marker">
      {btnImage}
    </CommentButton>
  )
}
