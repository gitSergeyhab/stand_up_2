import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { CommonFieldSet, LongButton } from "../common/common-style";

const PressBtn = styled(LongButton).attrs({type: 'button'})<{isPressed?: boolean}>`
  ${({isPressed}) => isPressed ?  'background-color: goldenrod;  color: rgb(13, 1, 1);' : ''}
`


type CopyPathBtnProps = {
  isPressed?: boolean;
  setPressed: Dispatch<SetStateAction<boolean>>
}
export function CopyPathBtn({isPressed, setPressed}: CopyPathBtnProps) {
  const text = isPressed ? 'отключить' : 'включить';

  const handleBtnClick = () => setPressed((prev) => !prev)

  return (
    <CommonFieldSet>
      <legend> Копирования ссылок</legend>
      <PressBtn onClick={handleBtnClick} isPressed={isPressed}>{text}</PressBtn>
    </CommonFieldSet>

  )



}
