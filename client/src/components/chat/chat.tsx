import { useState } from 'react'
import { useSelector } from 'react-redux';
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chat-block/chat-block';
import { ChatState, Room } from '../../const/chat';
import socket from '../../socket-io';
import { getUser } from '../../store/user-reducer/user-selectors';




export function Chat() {

  const user = useSelector(getUser);
  const [room, setRoom] = useState(Room.Common);
  const [chatState, setChatState] = useState<ChatState>(ChatState.Close);

  const handleChatOpen = () => {
    setChatState(ChatState.Open);
    if (!user) return;
    socket.emit('room:add-user', {userId: user.id, nik: user.nik, roles: user.roles, room})
  };
  const handleChatClose = () => setChatState(ChatState.Close);
  const handleChatHide = () => setChatState(ChatState.Hide);

  const chatSection =  [ChatState.Open, ChatState.Hide].includes(chatState) ?
    <ChatBlock
      onHide={handleChatHide}
      onClose={handleChatClose}
      hide={chatState === ChatState.Hide}
      room={room}
      setRoom={setRoom}
    /> : null;

  const buttonText = chatState === ChatState.Close ? 'открыть чат' : 'восстановить чат';
  const chatButton = chatState === ChatState.Open ? null : <BottomButton onClick={handleChatOpen}>{buttonText}</BottomButton>;

  return (
    <>
      {chatSection}
      {chatButton}
    </>
  )
}
