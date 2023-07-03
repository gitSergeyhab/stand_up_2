import { useRef, useState, FormEventHandler } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ChatButton, ChatInputForm, ChatTextarea, NoUserDiv } from './chat-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import socket from '../../socket-io';




export function ChatInput({room}: {room: string}) {

  const user = useSelector(getUser);


  const [focus, setFocus] = useState(false);
  const textRef = useRef<null|HTMLTextAreaElement>(null);
  const formRef = useRef<null|HTMLFormElement>(null);

  if (!user) {
    return <NoUserDiv>Отправлять сообщения могут только авторизованные пользователи</NoUserDiv>
  }

  const handleFocus = () => setFocus(true)
  const handleBlur = () => setFocus(false)

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const value = textRef.current?.value?.trim();
    if (!value || value?.length < 3) {
      toast.warning('перед отправкой сообщения его придется написать. Хотя бы 3 символа')
      return;
    }

    const {avatar, id, nik, roles} = user;
    const data = {socketId: socket.id, userId: id, avatar, nik, roles, text: value, room}

    // console.log(data);
    socket.emit('message', data)
    formRef.current?.reset()


  }

  // const errorBlock = err ? <ErrorMessage>{err}</ErrorMessage> : null
  return (
    <ChatInputForm ref={formRef} onSubmit={handleSubmit} focus={focus}>
      <ChatTextarea ref={textRef} onFocus={handleFocus} onBlur={handleBlur} required />
      <ChatButton>➤</ChatButton>
    </ChatInputForm>
  )

}
