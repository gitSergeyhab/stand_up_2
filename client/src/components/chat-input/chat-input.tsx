import { useRef, useState, FormEventHandler } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ChatButton, ChatInputForm, ChatTextarea, NoUserDiv } from './chat-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import socket from '../../socket-io';
import { getActiveRoom } from '../../store/chat-reducer/chat-selectors';
import { SocketEvent } from '../../const/chat';


export function ChatInput() {

  const user = useSelector(getUser);
  const activeRoom = useSelector(getActiveRoom)

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

    const text = textRef.current?.value?.trim();
    if (!text) {
      toast.warning('перед отправкой сообщения его придется написать')
      return;
    }

    const {id} = user;
    const data = { userId: id, text, roomId: activeRoom?.roomId }

    console.log(data);
    socket.emit(SocketEvent.MessageFromClient, data)
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
