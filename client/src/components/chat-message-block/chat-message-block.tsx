import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket-io';
import { ChartLink, ChatImg, ChatMessageLI, ChatMessageUL, MessageP, TextDiv, UserDateWrapperDiv } from './chat-message-block-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { DefaultPath, SERVER_URL } from '../../const/const';
import { Message } from '../../types/socket-types';
import { getColorFromUserData } from '../../utils/chat-utils';
import { formatDateFromTimeStamp, formatDateType } from '../../utils/date-utils';





function ChatMessage({message}: {message: Message}) {

  const user = useSelector(getUser);
  const id = user?.id;
  const { avatar, roles, text, userId, nik, date, isJoin } = message;
  const side = (id === userId) ? 'end' : 'start';
  const userColor = getColorFromUserData({roles, userAuthId: id, userMessageId: userId});
  const formatDate =  formatDateFromTimeStamp(date);

  if (isJoin) {
    return <ChatMessageLI>{formatDate} / {nik} вошел в чат</ChatMessageLI>
  }


  const textBlock = (
    <TextDiv color={userColor} side={side}>
      <UserDateWrapperDiv>
        {formatDate}
        <ChartLink color={userColor}  side={side} to={`/users/${userId}`}>{nik}</ChartLink>

      </UserDateWrapperDiv>

      <MessageP>{text} </MessageP>
    </TextDiv>
  );

  const image = <ChatImg color={userColor} src={avatar ? `${SERVER_URL}${avatar}` : DefaultPath.Any}/>;

  const elements = side === 'start' ? <>{image}{textBlock}</> : <>{textBlock}{image}</>

  return (
    <ChatMessageLI side={side}>
      {elements}
    </ChatMessageLI>
  )
}


type ChatMessageBlockProps = {
  color: string,
  room: string
}

export function ChatMessageBlock({color, room}: ChatMessageBlockProps) {
  const [messages, setMessages]  = useState<Message[]>([]);
  const ulRef = useRef<HTMLUListElement|null>(null)


  useEffect(() => {
    socket.on('response', (message) => {
      console.log({message}, {messages})
      setMessages((prev) => [...prev, message] );
      const ul = ulRef.current
      if(ul) {
        setTimeout(() => {
          ul.scrollTop = ul.scrollHeight;
        }, 100)

      }

    })
  }, [])


  const messageElements = messages
    // .filter((item) => item.room === room)
    .map((item) => <ChatMessage key={item.id} message={item}/>)

  return (
    <ChatMessageUL color={color} ref={ulRef}>
      {messageElements}
    </ChatMessageUL>
  )
}
