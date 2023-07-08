import { useState, FormEventHandler, ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import EmojiPicker, {Emoji, EmojiClickData} from 'emoji-picker-react';
import { ChatButton, ChatInputForm, ChatTextarea, EmojiButton, EmojiWrapper, NoUserDiv } from './chat-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import socket from '../../socket-io';
import { getActiveRoom } from '../../store/chat-reducer/chat-selectors';
import { SocketEvent } from '../../const/chat';


export function ChatInput() {

  const user = useSelector(getUser);
  const activeRoom = useSelector(getActiveRoom)

  const [focus, setFocus] = useState(false);
  const [isEmojiPicker, setEmojiPicker] = useState(false);
  const [value, setValue] = useState('');

  if (!user) {
    return <NoUserDiv>Отправлять сообщения могут только авторизованные пользователи</NoUserDiv>
  }

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleEmojiBtnClick = () => setEmojiPicker((prev) => !prev);

  const handleInputChange:ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const val = evt.target.value;
    setValue(val);
  }

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    const text = value.trim();
    if (!text) {
      toast.warning('перед отправкой сообщения его придется написать')
      return;
    }

    const {id} = user;
    const data = { userId: id, text, roomId: activeRoom?.roomId }

    socket.emit(SocketEvent.MessageFromClient, data);
    setValue('');
  }

  const onEmojiClick = (emoji: EmojiClickData) => {
    setValue((prev) => prev + emoji.emoji);
    setEmojiPicker(false);
  }

  const emojiPicker = isEmojiPicker ? (
    <EmojiWrapper>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </EmojiWrapper>
  ) : null;

  return (
    <ChatInputForm  onSubmit={handleSubmit} focus={focus}>

      <EmojiButton onClick={handleEmojiBtnClick}><Emoji unified='1f603'/></EmojiButton>
      <ChatTextarea
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        required
      />
      <ChatButton>➤</ChatButton>
      {emojiPicker}
    </ChatInputForm>
  )

}
