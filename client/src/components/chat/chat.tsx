import { useDispatch, useSelector } from 'react-redux';
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chat-block/chat-block';
import { ChatState, SocketEvent } from '../../const/chat';
import { getUser } from '../../store/user-reducer/user-selectors';
import { getActiveRoom, getChartState } from '../../store/chat-reducer/chat-selectors';
import { setChatState } from '../../store/actions';
import { joinRoom } from '../../utils/chat-utils';
import socket from '../../socket-io';



export function Chat() {
  const user = useSelector(getUser);
  const activeRoom = useSelector(getActiveRoom);
  const chatState = useSelector(getChartState)

  const dispatch = useDispatch()

  const handleChatOpen = () => {
    if (!user || !activeRoom) return;
    if (chatState === ChatState.Close) {
      joinRoom({userId: user.id, joinRoomId: activeRoom.roomId})
    }
    dispatch(setChatState(ChatState.Open))

  };
  const handleChatClose = () => {
    if(!user || !activeRoom) return;
    dispatch(setChatState(ChatState.Close));
    socket.disconnect();
    // socket.emit(SocketEvent.Leave, {userId: user.id,  roomId: activeRoom.roomId})
  }
  const handleChatHide = () => dispatch(setChatState(ChatState.Hide));

  const chatSection = (chatState === ChatState.Close) ? null :
    <ChatBlock
      onHide={handleChatHide}
      onClose={handleChatClose}
      hide={chatState === ChatState.Hide}
    />

  const buttonText = chatState === ChatState.Close ? 'открыть чат' : 'восстановить чат';
  const chatButton = chatState === ChatState.Open ? null : <BottomButton onClick={handleChatOpen}>{buttonText}</BottomButton>;

  return (
    <>
      {chatSection}
      {chatButton}
    </>
  )
}
