import styled from "styled-components"


export const ChatInputForm = styled.form<{focus?: boolean}>`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  height: max(10%, 4rem);
  background-color: rgba(13, 1, 1);
  scale: ${({focus}) => focus ? '1' : '0.65'} ;
  opacity: ${({focus}) => focus ? '1' : '0.65'} ;
  transition:
    scale 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
    transition-delay: 1s;

  &:hover{
    scale: 1;
    opacity: 1;
    transition-delay: 0s;
  }
`;

export const ChatTextarea = styled.textarea`
  flex-grow: 1;
  height: 100%;
  max-height: 5rem;
  resize: none;
  overflow: visible;
`;

export const ChatButton = styled.button.attrs({type: 'submit'})`
  width: 2.5rem;
  height: 100%;
  border: 2px solid rgb(13, 1, 1);
  background-color: goldenrod;
  border-radius: 6px;
  color: #000;
  padding: 0;
  &:hover {
    color: #FFF;
    box-shadow: 2px 2px 2px #00000066;
  }

  &:active {
    color: goldenrod;
    background-color: #4d0d0d;
    box-shadow: inset 2px 2px 2px #00000066;
  }

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
  width: calc(100%) ;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  height: max(10%, 4rem);
  background-color: rgba(13, 1, 1);
  color: goldenrod;
`;

export const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 0;
`;

export const EmojiButton = styled.button.attrs({type: 'button'})`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: transparent;
  border: 4px solid transparent;
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
`;

export const SmileFileWrapperDiv = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;


export const FileButton = styled.button.attrs({type: 'button'})<{delBtn?: boolean}>`
  border: 4px solid rgb(13, 1, 1);
  padding: 0 4px;
  background-color: gold;
  &:hover {
    background-color: ${({delBtn}) => delBtn ? 'red' : 'orangered'};
    border-color: ${({delBtn}) => delBtn ? 'red' : 'orangered'};
  }
  transition:
    0.3s border-color ease-in-out,
    0.3s background-color ease-in-out
  ;
`
