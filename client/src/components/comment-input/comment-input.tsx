import { useState, FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CommentInputForm, ContainerTextarea, NoUserDiv } from './comment-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { TextareaAutoHeight } from '../textarea-auto-height/textarea-auto-height';
import { UserLink } from '../common/common-style';
import { useAddNewsCommentMutation, useChangeNewsCommentMutation } from '../../store/news-api';
import { CommentInputButtons } from '../comment-input-buttons/comment-input-buttons';
import { FileData } from '../../types/types';
import { resetCommentInput } from '../../store/actions';


const MAX_FILE_SIZE = 1 * 1024 * 1024;

type CommentInputProps = {
  newsId: string;
  rootCommentId?: string;
  commentId?: string;
  userNik?: string;
  defaultText?: string
  image?: string;
}

export function CommentInput({commentId, userNik, rootCommentId, newsId, defaultText='', image}: CommentInputProps) {
  const textRef = useRef<HTMLTextAreaElement|null>(null);
  const formRef = useRef<HTMLFormElement|null>(null);

  const user = useSelector(getUser);
  const dispatch = useDispatch()

  const [value, setValue] = useState(defaultText);
  const [fileData, setFileData] = useState<null|FileData>(null);
  const [disabled, setDisabled] = useState(false);
  const [imgFileSrc, setImgFileSrc] = useState('');
  const [isPicChanged, setPicChanged] = useState(false);

  const [addComment] = useAddNewsCommentMutation();
  const [changeComment] = useChangeNewsCommentMutation();

  if (!user) {
    return <NoUserDiv>Оставлять комментарии могут только авторизованные пользователи</NoUserDiv>
  }

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const scrollToComment = (id: string) => {
      document.getElementById(id)?.scrollIntoView({block: 'center'});
    }

    const onSuccess = (data: string) => {
      setTimeout(() => scrollToComment(`comment-${data}`), 250)
      setValue('');
      setImgFileSrc('');
      dispatch(resetCommentInput());
    }
    const onAnyCase = () => setDisabled(false);
    const onError = () =>  toast.error('добавление комментариев временно недоступно, попробуйте позже');

    const text = value.trim();
    const currentForm = formRef.current;
    if (!currentForm) return;

    const formData = new FormData(currentForm);
    formData.append('news_id', newsId);
    formData.append('parent_comment_id', commentId || '');

    formData.append('root_comment_id', rootCommentId || '');
    if (isPicChanged) {
      formData.append('isPicChanged', 'true');
      setPicChanged(false);
    }

    if (fileData && (fileData.size > MAX_FILE_SIZE)) {
      toast.warning('прикрепляемая картинка должна быть меньше 1 МБ');
      return;
    }

    if (!text && !fileData) {
      toast.warning('перед отправкой сообщения его придется написать. Ну или хоть картинкой поделитесь');
      return;
    }

    setDisabled(true)
    if ((image || defaultText) && commentId) {
      changeComment({body: formData, id: commentId}).unwrap().then(onSuccess).catch(onError).finally(onAnyCase);
    } else {
      addComment(formData).unwrap().then(onSuccess).catch(onError).finally(onAnyCase);
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
        <CommentInputButtons
          disabled={disabled}
          setFileData={setFileData}
          setValue={setValue}
          imgFileSrc={imgFileSrc}
          setImgFileSrc={setImgFileSrc}
          setPicChanged={setPicChanged}
        />
      </ContainerTextarea>
    </CommentInputForm>
  )
}
