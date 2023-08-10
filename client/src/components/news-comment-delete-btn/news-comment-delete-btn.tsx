import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners';
import { MdRestoreFromTrash } from "react-icons/md";
import { TbTrashX } from "react-icons/tb";
import { AnyAction } from "@reduxjs/toolkit";
import { toggleNewsCommentDeleteStatus } from "../../store/news-comments-slice/news-comments-thunks";
import { getUser } from "../../store/user-reducer/user-selectors";
import { DropUp } from "../drop-up/drop-up";
import { CommentButton } from "../news-comment-buttons/news-comment-buttons-style";
import { getNewsCommentsData } from "../../store/news-comments-slice/news-comment-selectors";
import { DeleteBtn } from "./news-comment-delete-btn-style";
import { setChangComment } from "../../store/news-comments-slice/news-comments-slice";
import { ChildCommentCC } from "../../types/news-comments-types";


function BtnImg({deleted, disabled}: {deleted: boolean, disabled: boolean}) {
  if (disabled) return <HashLoader size={12}/>;
  return deleted ? <MdRestoreFromTrash /> : <TbTrashX/> ;
}

type CommentButtonsProps = {
  comment: ChildCommentCC
}

export function NewsCommentDeleteBtn({comment}: CommentButtonsProps) {
  const { commentId, deleted, userId } = comment;
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const {changCommentId} = useSelector(getNewsCommentsData);
  const [isTrashDropUp, setTrashDropUp] = useState(false);

  const commentIdx = `delete-comment-${commentId}`;
  const toggleTrashBtnClick = () => setTrashDropUp((prev) => !prev);

  useEffect(()=> {
    const hideBtn = (evt: MouseEvent) => {
      if ( evt.target instanceof Element && !evt.target.closest(`#${commentIdx}`)) {
        setTrashDropUp(false);
      }
    };
    document.addEventListener('click', hideBtn);
    return () => document.removeEventListener('click', hideBtn);
  }, [commentIdx])

  const handleStatusDeleteClick = () => {
    setTrashDropUp(false);
    dispatch(setChangComment(commentId));
    dispatch(toggleNewsCommentDeleteStatus({commentId, status: !deleted}) as unknown as AnyAction)
  }

  const isUserComment = user?.id === String(userId);
  const disabled = changCommentId === commentId;
  const deleteBtnText = deleted ? 'восстановить комментарий' : 'удалить комментарий';
  const deleteButton = !isTrashDropUp ? null :
    <DropUp>
      <DeleteBtn onClick={handleStatusDeleteClick}  disabled={disabled} >
        {deleteBtnText}
      </DeleteBtn>
    </DropUp>

  return (
    <div id={commentIdx}>
      {deleteButton}
      <CommentButton onClick={toggleTrashBtnClick} disabled={!isUserComment}  >
        <BtnImg deleted={deleted} disabled={disabled}/>
      </CommentButton>
    </div>
  )
}
