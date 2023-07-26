import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Form } from "./form-style";
import { Field } from "../admin-form-field/admin-form-field";
import { tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { DataErrorType, ErrorDataFieldType } from "../../types/types";

import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { setDataError } from "../../utils/error-utils";
import { ImageField } from "../image-field/image-field";
import { useAddNewsMutation, useChangeNewsMutation } from "../../store/news-api";
import { getNewsErrorMessages } from "../../utils/validation/news-form-validation";
import { TextareaWithPreview } from "../textarea-with-preview/textarea-with-preview";

export const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  min-width: 20rem;
  max-width: 50rem;
`

type ShowFormProps = {
  state?: {
    newsId: string;
    newsTitle: string;
    newsText: string;
    mainPicture?: string;
  }
}

export function NewsForm ({ state}: ShowFormProps) {
  const formRef = useRef<HTMLFormElement|null>(null);
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});
  const [isPic, setPic] = useState( !!state?.mainPicture);
  const [isPicChanged, setPicChanged] = useState(false);

  const [text, setText] = useState(state?.newsText || '');

  const [addContent] = useAddNewsMutation()
  const [changeContent] =  useChangeNewsMutation();



  const resetForm = () => {
    formRef.current?.reset();
    setPic(false);
    setDisabled(false);
    setText('');
    setErrors({errorIndexes:[],errorMessages:[]});
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async(evt) => {
    evt.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    if (isPicChanged) {
      formData.append('isPicChanged', 'true')
    }
    setDisabled(true);

    const errorData = getNewsErrorMessages({formData});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
      return;
    }

    try {
      if (state) {
        await changeContent({body: formData, id: state.newsId}).unwrap();
        navigate(`/news/${state.newsId}`);
      } else {
        await addContent({body: formData}).unwrap();
        toast.info('Новость добавлена')
      }
      resetForm();
    } catch (err) {
      setDataError({ setErrors, data: err as DataErrorType })
      setDisabled(false);
    }
  }

  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;
  const submitText = state ? 'Внести изменения' : 'Добавить';

  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.news.newsTitle}
        placeholder="заголовок"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.newsTitle}
        required
      />

    <ImageField setPic={setPic} isPic={isPic} statePicture={state?.mainPicture} setPicChanged={setPicChanged}/>

      <TextareaWithPreview
        name={tableField.news.newsText}
        placeholder="текст новости"
        setText={setText}
        text={text}
        required
      />
      <br/>
      {errorBlock}
      <SubmitButton disabled={disabled}> {submitText}</SubmitButton>
    </Form>
  )
}
