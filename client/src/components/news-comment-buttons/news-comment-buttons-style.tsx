import styled from "styled-components"

export const ButtonsWrapper = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  display: flex;
  align-items: center;
  column-gap: 0.2rem;
  scale: 1;
  transition: scale 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;

export const CommentButton = styled.button.attrs({type: 'button'})<{disabled?:boolean, chosen?:boolean}>`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: opacity 0.2s ease-in-out;
  position: relative;
  color: #FFF;
  ${({disabled}) => disabled ? 'opacity: 0.4': ''};


  & svg {
    color: inherit;
    ${({chosen}) => chosen  ? 'color: #ff6200;': ''};

  }
  &:hover {
    ${({disabled}) => !disabled ? 'color: goldenrod': ''};
  }
`;


export const DeleteBtn = styled.button.attrs({type: 'button'})`
  border-radius: 4px;
  border: none;
  background-color: inherit;
  width: max-content;
  box-shadow: 2px 2px 5px #00000045;
  &:hover {
    color: #ff8000;
    box-shadow: 4px 4px 8px #0000006d;
  }
  transition: all .2s ease-in-out;

`

