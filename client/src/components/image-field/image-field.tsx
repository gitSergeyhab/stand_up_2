import { useState, ChangeEventHandler, Dispatch, SetStateAction, useRef} from "react";
import { ImageDiv } from "./image-field-sryle";
import { SERVER_URL } from "../../const/const";
import { InvisibleImageInput } from "../common/hidden-file-input";



type ImageFieldProps = {
  setPic: Dispatch<SetStateAction<boolean>>,
  setPicChanged: Dispatch<SetStateAction<boolean>>,
  isPic: boolean,
  statePicture?: string
}
export function ImageField({setPic, isPic, statePicture, setPicChanged}: ImageFieldProps) {
  console.log({isPic}, `${SERVER_URL}${statePicture}`)

  const [src, setSrc] = useState( statePicture ? `${SERVER_URL}${statePicture}` : undefined);
  const [fileName, setFileName] = useState(statePicture);
  const inputRef = useRef<HTMLInputElement|null>(null)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {files} = evt.target
    if (files && files[0]) {
      setPic(true);
      setPicChanged(true);
      setFileName(files[0].name);
      setSrc(URL.createObjectURL(files[0]));
    }
  }

  const handleBtnCleanPictureClick = () => {
      setPic(false);
      setPicChanged(true);
      setFileName('');
      setSrc('');
  }

  const handleBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const img = isPic ? <ImageDiv><img src={src} alt='chosen pic' height={100} width="auto" /></ImageDiv> : null;
  const clearPictureBtn = <button type="button" onClick={handleBtnCleanPictureClick}> ✘ </button>;
  const fileNameSpan = isPic ? <span>{fileName} {clearPictureBtn}</span> : null;

  return (
    <>
      <InvisibleImageInput
        ref={inputRef}
        id="image"
        name="image"
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleBtnClick}> Выбери 1 файл png \ jpeg \ jpg</button>

        {img}

      {fileNameSpan}

    </>
  )
}
