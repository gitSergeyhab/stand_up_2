import { useState, ChangeEventHandler, Dispatch, SetStateAction, useRef} from "react";
import { ImageDiv } from "./image-field-sryle";
import { SERVER_URL } from "../../const/const";
import { InvisibleImageInput } from "../common/hidden-file-input";



type ImageFieldProps = {setPic: Dispatch<SetStateAction<boolean>>, isPic: boolean}
export function ImageField({setPic, isPic}: ImageFieldProps) {

  const [src, setSrc] = useState(`${SERVER_URL}images/default/default.png`);
  const [fileName, setFileName] = useState('test.test');
  const inputRef = useRef<HTMLInputElement|null>(null)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {files} = evt.target
    if (files && files[0]) {
      setPic(true)
      setFileName(files[0].name)
      setSrc(URL.createObjectURL(files[0]))
    }
  }

  const handleBtnCleanPictureClock = () => {
      setPic(false)
      setFileName('')
      setSrc('')
  }

  const handleBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const img = isPic ? <ImageDiv><img src={src} alt='chosen pic' height={100} width="auto" /></ImageDiv> : null
  const clearPictureBtn = <button type="button" onClick={handleBtnCleanPictureClock}> ✘ </button>
  const fileNameSpan = isPic ? <span>{fileName} {clearPictureBtn}</span> : null

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
