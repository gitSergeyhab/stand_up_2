import styled from "styled-components";


export const CommentUL = styled.ul`
  list-style: none;
  padding: 0 0 0 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
`;

export const ShowMoreBtn = styled.button.attrs({type: 'button'})`
  color: #000;
  font-weight: 700;
  background: linear-gradient(90deg, #300606a9 0%, #ffffff76 100%);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.5) -1px 1px 10px;
  cursor: pointer;
  &:hover {
    background-color: #00000025;
  }
  transition: background-color .2s ease-in-out;
`;

