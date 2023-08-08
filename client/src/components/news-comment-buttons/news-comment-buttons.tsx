import { RiQuestionAnswerLine } from 'react-icons/ri'
import { TbWriting, TbTrashX } from 'react-icons/tb'
import { BiLike, BiDislike } from 'react-icons/bi'
import { MdRestoreFromTrash } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { getUser } from "../../store/user-reducer/user-selectors";
import { ButtonsWrapper, CommentButton, DeleteBtn } from './news-comment-buttons-style';
import { setInputCommentId, setInputCommentType } from '../../store/news-comments-slice/news-comments-slice';
import { DropUp } from '../drop-up/drop-up';
import { toggleNewsCommentDeleteStatus } from '../../store/news-comments-slice/news-comments-thunks';




type CommentButtonsProps = {
  commentId: string;
  userId: string;
  deleted: boolean
}

export function NewsCommentButtons({ commentId, userId, deleted } : CommentButtonsProps) {

  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isUserComment = user?.id === String(userId);
  const [isTrashDropUp, setTrashDropUp] = useState(false);

  const commentIdx = `delete-comment-${commentId}`

  useEffect(()=> {
    const hideBtn = (evt: MouseEvent) => {
      if ( evt.target instanceof Element && !evt.target.closest(`#${commentIdx}`)) {
        setTrashDropUp(false);
      }
    };
    document.addEventListener('click', hideBtn);
    return () => document.removeEventListener('click', hideBtn)
  }, [commentIdx])

  const handleToCommentClick = () => {
    dispatch(setInputCommentId(commentId));
    dispatch(setInputCommentType('re-comment'));
  }

  const handleToCorrectClick = () => {
    dispatch(setInputCommentId(commentId));
    dispatch(setInputCommentType('correct'));
  }

  const handleLikeClick = () => {
    console.log('like', {commentId})
  }

  const handleDisLikeClick = () => {
    console.log('!like', {commentId})
  }


  const delBtnImg = deleted ? <MdRestoreFromTrash /> : <TbTrashX/>;

  const toggleTrashBtnClick = () => setTrashDropUp((prev) => !prev)

  const handleStatusDeleteClick = () => {
    const onSuccess = () => setTrashDropUp(false);
    dispatch(toggleNewsCommentDeleteStatus({commentId, status: !deleted, onSuccess}) as unknown as AnyAction)
  }



  const deleteBtnText = deleted ? 'восстановить комментарий' : 'удалить комментарий'
  const deleteButton = isTrashDropUp ?
    <DropUp>
      <DeleteBtn onClick={handleStatusDeleteClick}   >
        {deleteBtnText}
      </DeleteBtn>
    </DropUp>
    : null;

  return (
    <ButtonsWrapper>
      <CommentButton onClick={handleLikeClick} disabled className="del-marker">
        <BiLike />
      </CommentButton>

      <CommentButton onClick={handleDisLikeClick} className="del-marker">
        <BiDislike  />
      </CommentButton>
      &nbsp;&nbsp;
      <CommentButton title="комментировать" disabled={!user} onClick={handleToCommentClick} className="del-marker">
        <RiQuestionAnswerLine />
      </CommentButton>
      <CommentButton title="править" disabled={!isUserComment} onClick={handleToCorrectClick} className="del-marker">
        <TbWriting />
      </CommentButton>
      <div id={commentIdx}>
        {deleteButton}
        <CommentButton onClick={toggleTrashBtnClick} disabled={!isUserComment}  >
          {delBtnImg}
        </CommentButton>
      </div>


    </ButtonsWrapper>
  )
}
