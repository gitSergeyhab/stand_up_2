import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chat-block/chat-block';
import { getUser } from '../../store/user-reducer/user-selectors';
import {  getActiveRoom, getChartState, getJoin } from '../../store/chat-reducer/chat-selectors';
import { setChatState, setSocketJoin } from '../../store/actions';
import { joinRoom } from '../../utils/chat-utils';



export function Chat() {
  const user = useSelector(getUser);
  const activeRoom = useSelector(getActiveRoom);
  const chatState = useSelector(getChartState);
  const isJoin = useSelector(getJoin)
  const dispatch = useDispatch();

  const handleChatHide = () => dispatch(setChatState(false));
  const handleChatOpen = () => {
    if (!user) {
      toast.warning('Чат доступен только авторизованным пользователям')
      return;
    }
    // const setJoin = () => dispatch(setSocketJoin);
    if(isJoin) {
      dispatch(setSocketJoin)
    } else {
      joinRoom({userId: user.id, joinRoomId: activeRoom.roomId})
    }

    dispatch(setChatState(true))
  };

  const chatButton = chatState ? null : <BottomButton onClick={handleChatOpen}>Показать чат</BottomButton>;

  return (
    <>
      <ChatBlock onHide={handleChatHide} hide={!chatState} />
      {chatButton}
    </>
  )
}
