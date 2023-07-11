import { useState, FormEventHandler, ChangeEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import EmojiPicker, {Emoji, EmojiClickData} from 'emoji-picker-react';
import { AiOutlineFileAdd, AiOutlineFileExcel } from 'react-icons/ai';
import { ChatButton, ChatInputForm, ChatTextarea, EmojiButton, EmojiWrapper, FileButton, NoUserDiv, SmileFileWrapperDiv } from './chat-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import socket from '../../socket-io';
import { getActiveRoom } from '../../store/chat-reducer/chat-selectors';
import { SocketEvent } from '../../const/chat';
import { InvisibleImageInput } from '../common/hidden-file-input';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

type FileData = {
  file: File,
  type: string,
  size: number,
  name: string
}

export function ChatInput() {

  const fileRef = useRef<HTMLInputElement|null>(null)
  const inputRef = useRef<HTMLTextAreaElement|null>(null)
  const formRef = useRef<HTMLFormElement|null>(null)
  const user = useSelector(getUser);
  const activeRoom = useSelector(getActiveRoom)

  const [focus, setFocus] = useState(false);
  const [isEmojiPicker, setEmojiPicker] = useState(false);
  const [value, setValue] = useState('');
  const [imgFileSrc, setImgFileSrc] = useState('');
  const [fileData, setFileData] = useState<null|FileData>(null)

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
    if (!text && !fileData) {
      toast.warning('перед отправкой сообщения его придется написать. Ну или хоть картинкой поделитесь')
      return;
    }

    if (fileData && (fileData.size > MAX_FILE_SIZE)) {
      toast.warning('прикрепляемая картинка должна быть меньше 2 МБ')
      return;
    }


    const {id} = user;
    const data = { userId: id, text, roomId: activeRoom?.roomId, fileData }

    socket.emit(SocketEvent.MessageFromClient, data);
    setValue('');
    setFileData(null);
    setImgFileSrc('');
  }

  const onEmojiClick = (emoji: EmojiClickData) => {
    setValue((prev) => prev + emoji.emoji);
    setEmojiPicker(false);
    inputRef.current?.focus();
  }

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {files} = evt.target
    if (files && files[0]) {
      setImgFileSrc(URL.createObjectURL(files[0]));
      const {size, name, type} = files[0]
      setFileData({file: files[0], size, name, type });
    }
  }

  const handleFileBtnClick = () => {
    const fileCurrent = fileRef.current;
    if (imgFileSrc) {
      // console.log(file?.name, file?.size, file?.type)
      setImgFileSrc('');
      setFileData(null);
      formRef.current?.reset(); // сброс картинки
    } else if (fileCurrent) {
      fileCurrent.value = '';
      fileCurrent.click();
    }

  };



  const emojiPicker = isEmojiPicker ? (
    <EmojiWrapper>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </EmojiWrapper>
  ) : null;


  const chosenImage = imgFileSrc ? <img src={imgFileSrc} alt="картинка для сообщения" width={66} height={66} /> : null;
  const imgForFileBtn = imgFileSrc ? <AiOutlineFileExcel size={20}/> : <AiOutlineFileAdd size={20}/>;

  return (
    <ChatInputForm ref={formRef} onSubmit={handleSubmit} focus={focus}>

      <SmileFileWrapperDiv>
        <InvisibleImageInput
          ref={fileRef}
          id="image"
          name="image"
          onChange={handleFileInputChange}
        />
        <FileButton title='добавить изображение не более 1Mb' onClick={handleFileBtnClick} delBtn={!!imgFileSrc}>
          {imgForFileBtn}
        </FileButton>
        <EmojiButton onClick={handleEmojiBtnClick}><Emoji unified='1f603'/></EmojiButton>
      </SmileFileWrapperDiv>
      {chosenImage}
      <ChatTextarea
        ref={inputRef}
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
