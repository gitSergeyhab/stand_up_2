import { Link } from "react-router-dom";
import styled from "styled-components"




export const ChatMessageUL = styled.ul<{color:string}>`
  list-style: none;
  margin: 0;
  width: 100%;


  background-color: ${({color}) => color};
  display: flex;
  flex-direction: column;
  row-gap: .25rem;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: min(92%, calc(100% - 3rem)) ;

  @media (min-width: 900px) {
    padding: 2rem 1rem  4rem;
    row-gap: .5rem;
  }
`;

export const ChatMessageLI = styled.li<{side?:'start'|'end'}>`
  width: 100%;
  column-gap: .5rem;
  color: #000;
  display: flex;
  justify-content: ${({side}) => side || 'center'};
  ${({side}) => side ?  '' : 'background-color: #FFF'};
  @media (min-width: 900px) {
  }
`;


export const ChatImg = styled.img<{color: string}>`
  height: 1.5rem;
  object-fit: cover;

  border: 2px solid ${({color}) => color};
  box-shadow: 2px 2px 2px #00000083;

  @media (min-width: 900px) {
    height: 2rem;
    width: 2rem;
    border-radius: 0.75rem;
  }
`;
export const ChartLink = styled(Link)<{side:'start'|'end', color: string}>`
  padding: .1rem 1rem ;
  display: flex;
  align-items: center;
  justify-content: ${({side}) => side};
  text-decoration: none;
  background-color: #000000ab;
  color: ${({color}) => color};
  font-weight: 700;
  font-size: 1rem;

  transition:
    0.3s scale ease-in-out,
    0.3s color ease-in-out;
  &:hover {
    scale: 1.01;
    color: rgb(255, 155, 5);
  }
`


export const MessageP = styled.p`
  background-color: #FFF;
  border-radius: 4px;
  padding: .5rem;
  display: flex;
  align-items: center;
  margin: 0;

  @media (max-width: 900px) {
    padding: 0.25rem;
  }
`;

export const TextDiv = styled.div<{side:'start'|'end', color: string}>`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 2px #000 solid;
  border-color: ${({color}) => color};
`;

export const UserDateWrapperDiv = styled.div`
  display: flex;
  row-gap: 0.4rem;
  color: #FFF;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 1rem;
`
