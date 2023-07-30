import styled from "styled-components"
import {RiQuestionAnswerLine} from 'react-icons/ri'
import {TbWriting, TbTrashX} from 'react-icons/tb'

import {BiLike, BiDislike} from 'react-icons/bi'
import { useSelector } from "react-redux";
import { ChildCommentCC } from "../../types/news-comments-types";
import { getUser } from "../../store/user-reducer/user-selectors";


export const ButtonsWrapper = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  display: flex;
  align-items: center;
  column-gap: 0.2rem;
  scale: 1;
  transition: scale 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }

`;

export const CommentButton = styled.button.attrs({type: 'button'})<{disabled?:boolean, chosen?:boolean}>`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: opacity 0.2s ease-in-out;
  color: #FFF;
  ${({disabled}) => disabled ? 'opacity: 0.4': ''};


  & svg {
    color: inherit;
    ${({chosen}) => chosen  ? 'color: #ff6200;': ''};

  }
  &:hover {
    ${({disabled}) => !disabled ? 'color: goldenrod': ''};
  }

`;

type CommentButtonsProps = {
  commentId: string;
  userId: string;
}


export function CommentButtons({ commentId, userId } : CommentButtonsProps) {
  console.log(userId)


  const user = useSelector(getUser);

  const isUserComment = user?.id === userId;

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
      <CommentButton title="комментировать" disabled={!isUserComment}>
        <RiQuestionAnswerLine />
      </CommentButton>
      <CommentButton title="править" disabled={!isUserComment}>
        <TbWriting />
      </CommentButton>

      <CommentButton disabled={!isUserComment} >
        <TbTrashX />
      </CommentButton>

    </ButtonsWrapper>
  )
}
