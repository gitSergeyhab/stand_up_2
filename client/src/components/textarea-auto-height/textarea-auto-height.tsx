import  { useEffect, ChangeEventHandler, SetStateAction, Dispatch, MutableRefObject } from "react";
import styled from "styled-components";


export const TextArea = styled.textarea<{disabled?: boolean}>`
  width: 100%;
  display: block;
  resize: none;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  box-shadow:  1px 1px 10px 1px #00000010;
  padding: 0.5rem;
  border-radius: 0.25rem;
  &:focus {
    box-shadow: 1px 1px 10px 1px #0000007d;
    border-bottom: 2px solid #000;
  }
  opacity: ${({disabled}) => disabled ? '0.5' : '1'};
`;


type TextareaAutoHeightProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>
  textareaRef:  MutableRefObject<HTMLTextAreaElement | null>;
  disabled?: boolean,
  isAnswer?: boolean;
}

export function TextareaAutoHeight  ({ setValue, value, textareaRef, disabled, isAnswer }: TextareaAutoHeightProps){

  const textAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      // eslint-disable-next-line
      textareaRef.current.style.height = "0px";
      const {scrollHeight} = textareaRef.current;
      // eslint-disable-next-line
      textareaRef.current.style.height = `${scrollHeight  }px`;
    }
  }, [value, textareaRef]);

  const placeholder = isAnswer ? 'ваш ответ' : 'ваш комментарий'

  return (
    <TextArea
      ref={textareaRef}
      name="text"
      onChange={textAreaChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus
    />
  )
}
