import { useState, ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import styled from "styled-components"
import { LongButton } from "../common/common-style"
import { checkLinkedText, linkifyText } from '../../utils/format-text';

export const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  min-width: 20rem;
  resize: vertical;
  /* max-width: 50rem; */
  /* max-width: 100%; */
`;

const PreviewDiv = styled.div<{isTextValid?:boolean}>`
  padding: 1rem;
  border: 4px solid #000;
  box-shadow: 2px 2px 2px #0000006f;
  margin: auto;
  margin-top: 1rem;
  width: 90%;
  ${({isTextValid}) => isTextValid ? '' : 'color: red'};
`;

const WrapperDiv = styled.div`
  max-width: 100%;
`


type TextareaWithPreviewProps = {
  name: string,
  placeholder?: string,
  // defaultValue?: string,
  required?:boolean
  text: string,
  setText: Dispatch<SetStateAction<string>>

}

export function TextareaWithPreview({name, placeholder='', text, setText , required=false} : TextareaWithPreviewProps) {

  const [isShown, setShown] = useState(false);

  // const [text, setText] = useState(defaultValue);
  const [isTextValid, setTextValid] = useState(checkLinkedText(text))
  // const [adaptedText, setAdaptedText] = useState(defaultValue);

  const handleBtnClick = () => setShown((prev) => !prev);
  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const {value} = evt.target;
    setTextValid(checkLinkedText(value));
    setText(value);
  }


  const preview = isShown ? <PreviewDiv isTextValid={isTextValid}>{linkifyText(text)}</PreviewDiv> : null;

  const buttonText = isShown ? 'Скрыть превью текста' : 'Показать превью текста';

  return (
    <WrapperDiv>
      <TextArea
        name={name}
        placeholder={placeholder}
        required={required}
        value={text}
        onChange={handleTextChange}
      />
      <LongButton type='button' onClick={handleBtnClick}> {buttonText} </LongButton>
      {preview}

    </WrapperDiv>

  )
}
