import styled from "styled-components";

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
