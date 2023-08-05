import { useState, ChangeEventHandler, Dispatch, SetStateAction, MutableRefObject } from 'react';
import EmojiPicker, {Emoji, EmojiClickData} from 'emoji-picker-react';
import { AiOutlineFileAdd, AiOutlineFileExcel } from 'react-icons/ai';
import { ButtonsBlock,  ControlsDiv, EmojiButton, EmojiWrapper, FileButton, SendButton } from './news-comment-input-buttons-style';
import { InvisibleImageInput } from '../common/hidden-file-input';
import { FileData } from '../../types/types';


type CommentInputButtonsProps = {
  setValue: Dispatch<SetStateAction<string>>;
  setFileData: Dispatch<SetStateAction<null|FileData>>;
  disabled: boolean;
  setImgFileSrc: Dispatch<SetStateAction<string>>;
  imgFileSrc: string;
  setPicChanged: Dispatch<SetStateAction<boolean>>;
  fileRef: MutableRefObject<HTMLInputElement|null>;
  textRef: MutableRefObject<HTMLTextAreaElement|null>;
  formRef: MutableRefObject<HTMLFormElement|null>;

}

export function NewsCommentInputButtons({
  disabled, setFileData, setValue, imgFileSrc, setImgFileSrc, setPicChanged, fileRef, formRef, textRef
}: CommentInputButtonsProps
  ) {

  const [isEmojiPicker, setEmojiPicker] = useState(false);

  const handleEmojiBtnClick = () => setEmojiPicker((prev) => !prev);

  const onEmojiClick = (emoji: EmojiClickData) => {
    setValue((prev) => prev + emoji.emoji);
    setEmojiPicker(false);
    textRef.current?.focus();
  }

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {files} = evt.target
    if (files && files[0]) {
      setPicChanged(true);
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
  const fileButtonTitle  = !imgFileSrc ? 'добавить изображение не более 1Mb' : 'отменить добавление картинки';

  return (
    <ControlsDiv>
      <ButtonsBlock>

        <InvisibleImageInput ref={fileRef} id="image" name="image" onChange={handleFileInputChange} disabled={disabled}/>
        {chosenImage}
        <FileButton title={fileButtonTitle} onClick={handleFileBtnClick} delBtn={!!imgFileSrc} disabled={disabled}>
          {imgForFileBtn}
        </FileButton>
        <EmojiButton onClick={handleEmojiBtnClick} disabled={disabled}>
          <Emoji unified='1f603' size={20} />
        </EmojiButton>
        {emojiPicker}
        <SendButton disabled={disabled}>➤</SendButton>
      </ButtonsBlock>
    </ControlsDiv>
  )
}
