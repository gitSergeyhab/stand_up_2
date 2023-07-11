import styled from "styled-components"

export const ChatMessageUL = styled.ul<{color:string}>`
  list-style: none;
  margin: 0;
  width: 100%;
  background-color: ${({color}) => color};
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: min(92%, calc(100% - 3rem)) ;
  padding: 2rem .4rem 4rem;

  @media (min-width: 900px) {
    padding: 2rem 1rem  4rem;
    row-gap: .75rem;
  }
`;
