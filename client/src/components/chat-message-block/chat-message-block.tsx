import { useState, useEffect, useRef } from 'react';
import socket from '../../socket-io';
import { ChatMessageUL} from './chat-message-block-style';
import { SocketEvent } from '../../const/chat';
import { adaptMessage, adaptMessages } from '../../utils/adapters/chat-adapters';
import { MessageCC, MessageSC } from '../../types/chat-types';
import { ImageModalSingle } from '../image-modal/image-modal';
import { ImageCC } from '../../types/pic-types';
import { ChatMessage } from '../chat-message/chat-message';


type ChatMessageBlockProps = { color: string }

export function ChatMessageBlock({color}: ChatMessageBlockProps) {
  const ulRef = useRef<HTMLUListElement|null>(null);
  const [messages, setMessages]  = useState<MessageCC[]>([]);
  const [currentImg, setCurrentImg] = useState<ImageCC|null>(null);

  useEffect(() => {
    const ul = ulRef.current
    const scrollDown = () => {
      if (!ul) return;
      setTimeout(() => { ul.scrollTop = ul.scrollHeight }, 100);
    }
    const getMessage = (message: MessageSC) => {
      setMessages((prev) => [...prev,
        {
          ...adaptMessage(message),
          imgOpen: true  // все новые сообщения появляются с открытыми картинками
        }
      ]);
      scrollDown();
    }
    const getMessages = (allMessages: MessageSC[]) => {
      setMessages(adaptMessages(allMessages));
      scrollDown();
    }

    socket.on(SocketEvent.ResponseOneMessage, getMessage);
    socket.on(SocketEvent.ResponseAllMessages, getMessages);

    return () => {
      socket.off(SocketEvent.ResponseOneMessage, getMessage);
      socket.off(SocketEvent.ResponseAllMessages, getMessages);
    }
  }, [])

  const handleCloseModal = () => setCurrentImg(null);

  const messageElements = messages.map((item) =>
    <ChatMessage key={item.messageId} message={item} setCurrentImg={setCurrentImg}/>)
  const modal = currentImg ? <ImageModalSingle currentImg={currentImg} onClose={handleCloseModal}/> : null;

  return (
    <ChatMessageUL color={color} ref={ulRef}>
      {messageElements}
      {modal}
    </ChatMessageUL>
  )
}
