import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chat-block/chat-block';
import { getUser } from '../../store/user-reducer/user-selectors';
import {  getChartState } from '../../store/chat-reducer/chat-selectors';
import { setChatState } from '../../store/actions';



export function Chat() {
  const user = useSelector(getUser);
  const chatState = useSelector(getChartState)
  const dispatch = useDispatch()

  const handleChatHide = () => dispatch(setChatState(false));
  const handleChatOpen = () => {
    if (!user) {
      toast.warning('Чат доступен только авторизованным пользователям')
      return;
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
