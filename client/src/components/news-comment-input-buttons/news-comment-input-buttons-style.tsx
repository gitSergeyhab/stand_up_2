import styled from "styled-components"
import { UserLink, hiddenStyle } from "../common/common-style";


export const CommentInputForm = styled.form<{focus?: boolean}>`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem;
  bottom: 0;
  height: max(10%, 4rem);
  /* background-color: rgba(13, 1, 1); */

`;

export const ChatTextarea = styled.textarea`
  flex-grow: 1;
  height: 100%;
  max-height: 5rem;
  resize: none;
  overflow: visible;
`;

export const SendButton = styled.button.attrs({type: 'submit'})<{disabled?: boolean}>`
  width: 2.5rem;
  border: none;
  /* background-color: goldenrod; */
  border-radius: 6px;
  color: #000;
  box-shadow: 1px 1px 4px #00000041;
  padding: 0;
  &:hover {
    color: goldenrod;
    box-shadow: 2px 2px 2px #00000066;
  }

  &:active {
    color: goldenrod;
    background-color: #4d0d0d;
    box-shadow: inset 2px 2px 2px #00000066;
  }
  opacity: ${({disabled}) => disabled ? '0.5' : '1'};
  transition: color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  background-color: #000;
  color: #FFF;
  font-weight: 700;
  text-align: center;
`;

export const NoUserDiv = styled.div`
  width: 100% ;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  padding: 0.5rem;
`;

export const EmojiWrapper = styled.div`
  position: absolute;
  top: 3rem;
  right: 0;
  z-index: 2;
`;

export const EmojiButton = styled.button.attrs({type: 'button'})<{disabled?: boolean}>`
  height: min-content;
  width: min-content;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: goldenrod;
  }

  &:active {
    background-color: goldenrod;
  }

  transition:
    0.3s border-color ease-in-out,
    0.3s background-color ease-in-out
  ;

  opacity: ${({disabled}) => disabled ? '0.5' : '1'};
`;

export const SmileFileWrapperDiv = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;


export const FileButton = styled.button.attrs({type: 'button'})<{delBtn?: boolean, disabled?: boolean}>`
  border: none;
  padding: 2px 4px 0;
  border-radius: 4px;
  &:hover {
    background-color: ${({delBtn}) => delBtn ? 'red' : 'gold'};
  }
  transition:
    0.3s border-color ease-in-out,
    0.3s background-color ease-in-out
  ;
  opacity: ${({disabled}) => disabled ? '0.5' : '1'};
`
///

export const ContainerTextarea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ControlsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding: 0.1rem 0.5rem;
  position: relative;
`

export const ButtonsBlock = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0.1rem 0;
  justify-content: end;
  align-items: center;
  column-gap: 2rem;
`

export const CommentUserLink = styled(UserLink)`
  color: #4f4220;
  padding-left: 0.5rem;
  margin-bottom: .25rem;
`

export const HiddenLink = styled.a`
  ${hiddenStyle}
`
