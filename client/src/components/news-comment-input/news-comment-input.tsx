import { useState, FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { CommentInputForm, ContainerTextarea, NoUserDiv } from './news-comment-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { TextareaAutoHeight } from '../textarea-auto-height/textarea-auto-height';
import { UserLink } from '../common/common-style';
import { NewsCommentInputButtons } from '../news-comment-input-buttons/news-comment-input-buttons';
import { FileData } from '../../types/types';
import { addNewsComment, changeNewsComment } from '../../store/news-comments-slice/news-comments-thunks';


const MAX_FILE_SIZE = 1 * 1024 * 1024;

const createFormData = (currentForm: HTMLFormElement, newsId: string, commentId?:string, rootCommentId?:string) => {
  const formData = new FormData(currentForm)
  formData.append('news_id', newsId);
  formData.append('parent_comment_id', commentId || '');
  formData.append('root_comment_id', rootCommentId || '');
  return formData;
}

type CommentInputProps = {
  newsId: string;
  rootCommentId?: string;
  commentId?: string;
  userNik?: string;
  defaultText?: string
  image?: string;
}

export function NewsCommentInput({commentId, userNik, rootCommentId, newsId, defaultText='', image}: CommentInputProps) {
  const textRef = useRef<HTMLTextAreaElement|null>(null);
  const formRef = useRef<HTMLFormElement|null>(null);

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [value, setValue] = useState(defaultText);
  const [fileData, setFileData] = useState<null|FileData>(null);
  const [disabled, setDisabled] = useState(false);
  const [imgFileSrc, setImgFileSrc] = useState('');
  const [isPicChanged, setPicChanged] = useState(false);


  if (!user) {
    return <NoUserDiv>Оставлять комментарии могут только авторизованные пользователи</NoUserDiv>
  }

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const currentForm = formRef.current;
    if (!currentForm) return;

    const onSuccess = (addedCommentId: string) => {
      const scrollToComment = (id: string) => document.getElementById(id)?.scrollIntoView({block: 'center', behavior: 'smooth'});
      setTimeout(() => scrollToComment(`comment-${addedCommentId}`), 300)
      setValue('');
      setImgFileSrc('');
      currentForm.reset();
    }

    const onAnyCase = () => setDisabled(false);


    const formData = createFormData(currentForm,  newsId, commentId, rootCommentId);
    if (isPicChanged) {
      formData.append('isPicChanged', 'true');
    }


    if (fileData && (fileData.size > MAX_FILE_SIZE)) {
      toast.warning('прикрепляемая картинка должна быть меньше 1 МБ');
      return;
    }

    // if (!text && !fileData) {
    //   toast.warning('перед отправкой сообщения его придется написать. Ну или хоть картинкой поделитесь');
    //   return;
    // }


    setDisabled(true)
    if ((image || defaultText) && commentId) {
      dispatch(changeNewsComment({commentId, body: formData, onAnyCase, onSuccess}) as unknown as AnyAction)
    } else {
      dispatch(addNewsComment({body: formData, onAnyCase, onSuccess}) as unknown as AnyAction)
    }
  }

  const parentUserLink = userNik && commentId ?
    <UserLink to={`#comment-${commentId}`}>@{userNik}, </UserLink> : null;

  return (
    <CommentInputForm ref={formRef} onSubmit={handleSubmit} >
      <ContainerTextarea>
        {parentUserLink}
        <TextareaAutoHeight
          textareaRef={textRef}
          value={value}
          setValue={setValue}
          disabled={disabled}
          isAnswer={!!commentId}
        />
        <NewsCommentInputButtons
          disabled={disabled}
          setFileData={setFileData}
          setValue={setValue}
          imgFileSrc={imgFileSrc}
          setImgFileSrc={setImgFileSrc}
          setPicChanged={setPicChanged}
          // fileRef={fileRef}
          formRef={formRef}
          textRef={textRef}
        />
      </ContainerTextarea>
    </CommentInputForm>
  )
}
