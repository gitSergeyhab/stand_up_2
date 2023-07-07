import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket-io';
import { ChartLink, ChatImg, ChatMessageLI, ChatMessageUL, MessageP, TextDiv, UserDateWrapperDiv } from './chat-message-block-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { DefaultPath, SERVER_URL } from '../../const/const';
import { getColorFromUserData } from '../../utils/chat-utils';
import { formatDateFromTimeStamp } from '../../utils/date-utils';
import { SocketEvent } from '../../const/chat';
import { adaptMessage, adaptMessages } from '../../utils/adapters/chat-adapters';
import { MessageCC, MessageSC } from '../../types/chat-types';
import { Role } from '../../store/actions';




function ChatMessage({message}: {message: MessageCC}) {

  const user = useSelector(getUser);
  const id = user?.id;
  const { messageAdded, messageAuto, userId, userNik, userRoles, avatar, messageText } = message;
  const side = (id === userId) ? 'end' : 'start';
  const userColor = getColorFromUserData({roles: userRoles as Role[], userAuthId: id, userMessageId: userId});
  const formatDate =  formatDateFromTimeStamp(messageAdded);

  if (messageAuto) {
    return <ChatMessageLI>{formatDate} / {userNik} {messageText}</ChatMessageLI>
  }


  const textBlock = (
    <TextDiv color={userColor} side={side}>
      <UserDateWrapperDiv>
        {formatDate}
        <ChartLink color={userColor}  side={side} to={`/users/${userId}`}>{userNik}</ChartLink>

      </UserDateWrapperDiv>

      <MessageP>{messageText} </MessageP>
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
  // room: string
}

export function ChatMessageBlock({color}: ChatMessageBlockProps) {
  const [messages, setMessages]  = useState<MessageCC[]>([]);
  const ulRef = useRef<HTMLUListElement|null>(null)


  useEffect(() => {
    const ul = ulRef.current
    const scrollDown = () => {
      if(ul) {
        setTimeout(() => {
          ul.scrollTop = ul.scrollHeight;
        }, 100)
      }
    }

    socket.on(SocketEvent.ResponseOneMessage, (message: MessageSC) => {
      console.log({message}, {messages})
      setMessages((prev) => [...prev, adaptMessage(message)]);
      scrollDown()
    });

    socket.on(SocketEvent.ResponseAllMessages, (allMessages: MessageSC[]) => {
      const adaptedMessages = adaptMessages(allMessages)
      console.log({allMessages}, {adaptedMessages})
      setMessages(adaptedMessages);
      scrollDown()
    })
  }, [])


  const messageElements = messages.map((item) => <ChatMessage key={item.messageId} message={item}/>)

  return (
    <ChatMessageUL color={color} ref={ulRef}>
      {messageElements}
    </ChatMessageUL>
  )
}
