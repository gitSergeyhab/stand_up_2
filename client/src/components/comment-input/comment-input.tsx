import { useState, FormEventHandler, ChangeEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import EmojiPicker, {Emoji, EmojiClickData} from 'emoji-picker-react';
import { AiOutlineFileAdd, AiOutlineFileExcel } from 'react-icons/ai';
import { ButtonsBlock, CommentInputForm, ContainerTextarea, ControlsDiv, EmojiButton, EmojiWrapper, FileButton, NoUserDiv, SendButton } from './comment-input-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { InvisibleImageInput } from '../common/hidden-file-input';
import { TextareaAutoHeight } from '../textarea-auto-height/textarea-auto-height';
import { UserLink } from '../common/common-style';


const MAX_FILE_SIZE = 1 * 1024 * 1024;

type FileData = {
  file: File,
  type: string,
  size: number,
  name: string
}


type CommentInputProps = {
  rootCommentId?: string;
  parentCommentId?: string;
  parentUserNik?: string;
}

export function CommentInput({parentCommentId, parentUserNik, rootCommentId}: CommentInputProps) {
  const fileRef = useRef<HTMLInputElement|null>(null);
  const textRef = useRef<HTMLTextAreaElement|null>(null);
  const formRef = useRef<HTMLFormElement|null>(null);

  const user = useSelector(getUser);

  const [isEmojiPicker, setEmojiPicker] = useState(false);
  const [value, setValue] = useState('');
  const [imgFileSrc, setImgFileSrc] = useState('');
  const [fileData, setFileData] = useState<null|FileData>(null);


  if (!user) {
    return <NoUserDiv>Оставлять комментарии могут только авторизованные пользователи</NoUserDiv>
  }

  const handleEmojiBtnClick = () => setEmojiPicker((prev) => !prev);

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    const text = value.trim();
    const userId = user.id;
    const data = {text, fileData, userId, parentCommentId, rootCommentId};

    if (fileData && (fileData.size > MAX_FILE_SIZE)) {
      toast.warning('прикрепляемая картинка должна быть меньше 1 МБ');
      return;
    }

    if (!text && !fileData) {
      toast.warning('перед отправкой сообщения его придется написать. Ну или хоть картинкой поделитесь');
      return;
    }

    console.log({data});

  }

  const onEmojiClick = (emoji: EmojiClickData) => {
    setValue((prev) => prev + emoji.emoji);
    setEmojiPicker(false);
    textRef.current?.focus();
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
      setImgFileSrc('');
      setFileData(null);
      formRef.current?.reset(); // сброс картинки
    } else if (fileCurrent) {
      fileCurrent.value = '';
      fileCurrent.click();
    }
  };

  const emojiPicker = isEmojiPicker ? <EmojiWrapper><EmojiPicker onEmojiClick={onEmojiClick} /></EmojiWrapper> : null;
  const chosenImage = imgFileSrc ? <img src={imgFileSrc} alt="картинка для сообщения" width={40} height={40} /> : null;
  const imgForFileBtn = imgFileSrc ? <AiOutlineFileExcel size={20}/> : <AiOutlineFileAdd size={20}/>;
  const fileButtonTitle  = !imgFileSrc ? 'добавить изображение не более 1Mb' : 'отменить изображение';
  const parentUserLink = parentUserNik && parentCommentId ?
    <UserLink to={`#comment-${parentCommentId}`}>@{parentUserNik}</UserLink> : null;

  return (
    <CommentInputForm ref={formRef} onSubmit={handleSubmit} >
      <ContainerTextarea>
        {parentUserLink}
        <TextareaAutoHeight textareaRef={textRef} value={value} setValue={setValue}/>
        <ControlsDiv>
          {chosenImage}
          <ButtonsBlock>
            <InvisibleImageInput ref={fileRef} id="image" name="image" onChange={handleFileInputChange}/>
            <FileButton title={fileButtonTitle} onClick={handleFileBtnClick} delBtn={!!imgFileSrc}>
              {imgForFileBtn}
            </FileButton>
            <EmojiButton onClick={handleEmojiBtnClick}><Emoji unified='1f603' size={20}/></EmojiButton>
            {emojiPicker}
            <SendButton>➤</SendButton>
          </ButtonsBlock>
        </ControlsDiv>
      </ContainerTextarea>
    </CommentInputForm>
  )
}

