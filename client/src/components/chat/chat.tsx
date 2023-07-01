import { useState } from 'react'
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chart-block/chart-block';
import { ChatState } from '../../const/chat';



export function Chat() {
  const [chatState, setChatState] = useState<ChatState>(ChatState.Close);

  const handleChatOpen = () => setChatState(ChatState.Open);
  const handleChatClose = () => setChatState(ChatState.Close);
  const handleChatHide = () => setChatState(ChatState.Hide);

  const chatSection =  [ChatState.Open, ChatState.Hide].includes(chatState) ?
    <ChatBlock onHide={handleChatHide} onClose={handleChatClose} hide={chatState === ChatState.Hide} /> : null;

  const buttonText = chatState === ChatState.Close ? 'открыть чат' : 'восстановить чат';
  const chatButton = chatState === ChatState.Open ? null : <BottomButton onClick={handleChatOpen}>{buttonText}</BottomButton>;

  return (
    <>
      {chatSection}
      {chatButton}
    </>
  )
}
