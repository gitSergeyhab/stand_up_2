import { useState, ChangeEventHandler, useRef, FormEventHandler } from "react";
// import { SERVER_URL } from "../../const/const";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FilesBlock, ItemList, NoFilesTextDiv } from "./image-form-multi-upload-style";
import { InvisibleImageInput } from "../common/hidden-file-input";
import { CommonFieldSet, CommonSideForm, LongButton } from "../common/common-style";
import { SubmitButton } from "../common/submit-button";
import { useAddImagesMutation } from "../../store/images-api";


function DropList({items}: {items: string[]}) {
  const [shown, setShown] = useState(false);

  const handleBtnClick = () => setShown((state) => !state)

  const fileNameList = <ItemList> {items.map((item) => <li key={item}>{item}</li>)}</ItemList>
  const noFilesText = <NoFilesTextDiv>файлы не выбраны</NoFilesTextDiv>
  const showBtn = (
    <LongButton type="button" onClick={handleBtnClick}>
    { shown ? 'Скрыть файлы' : 'Показать файлы' }
    </LongButton>
  )

  return (
    <FilesBlock>
      { items.length ? showBtn : noFilesText }
      { shown ? fileNameList : null }
    </FilesBlock>
  )
}



export function ImageFieldMultiUpload() {

  const [fileNames, setFileNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement|null>(null);
  const formRef = useRef<HTMLFormElement|null>(null);
  const [isSubmitDisable, setSubmitDisable] = useState(true)

  const {mainType, id} = useParams() as {mainType: string, id: string}

  const [postImages] = useAddImagesMutation()

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {files} = evt.target
    if (files) {
      const names = Array.from(files).map((item) => item.name);
      setFileNames(names);
      setSubmitDisable(false)
    } else {
      setSubmitDisable(true)
    }
  }

  const handleBtnCleanPictureClick = () => {
    setFileNames([]);
    setSubmitDisable(true);
    formRef?.current?.reset()
  }

  const handleBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (formRef.current) {
      const onSuccess = () => {
        formRef.current?.reset();
        setFileNames([]);
        setSubmitDisable(true);
      }
      const onError = () => {
        toast.error('Невозможно добавить файлы. Пробуйте позже');
        setSubmitDisable(false);
      }

      setSubmitDisable(true);
      const formData = new FormData(formRef.current)
      postImages({body: formData, id, mainType }).unwrap()
        .then(onSuccess)
        .catch(onError)

    }


  }

  const clearPictureBtn = <LongButton
    type="button"
    disabled={!fileNames.length}
    onClick={handleBtnCleanPictureClick}
    title="Сбросить выбранные файлы"
  > ✘ </LongButton>


  return (
    // <ImageUploadForm ref={formRef} onSubmit={handleSubmit}>
    <CommonSideForm ref={formRef} onSubmit={handleSubmit}>
      <CommonFieldSet>
      <legend> Добавление картинок</legend>
      <InvisibleImageInput
        ref={inputRef}
        id="images"
        name="images"
        onChange={handleInputChange}
        multiple
      />
      <LongButton type="button"  onClick={handleBtnClick}> Выбери файлы png \ jpeg \ jpg</LongButton>
      {clearPictureBtn}
      <DropList items={fileNames}/>
      <SubmitButton disabled={isSubmitDisable}>Загрузить</SubmitButton>
      </CommonFieldSet>
    </CommonSideForm>
  )
}
