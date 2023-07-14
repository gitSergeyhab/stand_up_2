import { Link } from "react-router-dom";
import styled, { css } from "styled-components"
import { ChatPosition } from "../../const/chat";


export const ChatMessageLI = styled.li<{side?:'start'|'end'}>`
  width: 100%;
  column-gap: .5rem;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: ${({side}) => side || 'center'};
  ${({side}) => side ?  '' : 'background-color: #FFF'};
`;

export const MainMessage = styled.div<{side?:'start'|'end'}>`
column-gap: .5rem;
  width: 100%;
  display: flex;
  justify-content: ${({side}) => side || 'center'};
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
  padding: 0 ;
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


export const MessageTextDiv = styled.div<{isBreak?: boolean}>`
  background-color: #FFF;
  border-radius: 4px;
  padding: .5rem;
  margin: 0;
  width: 100%;

  ${({isBreak}) => isBreak ? 'word-break: break-all' : ''};


  @media (max-width: 900px) {
    padding: 0.25rem;
    word-break: break-all;
  }
`;

export const TextDiv = styled.div<{side:'start'|'end', color: string}>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 2px #000 solid;
  border-color: ${({color}) => color};
  box-shadow: 4px -4px 4px #e08f0463;
  position: relative;
  align-items: center;
`;

const sidePositionStyle = css`
  flex-direction: column;
`;
export const UserDateWrapperDiv = styled.div<{position?: ChatPosition}>`
 ${({position}) => position === ChatPosition.Left || position === ChatPosition.Right ? sidePositionStyle : ''};
  display: flex;
  width: 100%;
  column-gap: 1rem;
  color: #FFF;
  font-size: 0.8rem;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 1.5rem;
  background-color: #000;
  border-radius: 4px;
  position: relative;


`;


export const QuoteButton = styled.button.attrs({type: 'button'})`
  position: absolute;
  right: 0;
  top: 0;
  background-color: #FFF;
  padding: 0 1px;
  border-radius: 2px;
  opacity: 0.75;
  border: none;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const ImageBtn = styled.button.attrs({type: 'button'})`
  position: absolute;
  top: 0;
  left: 0;
  width: min-content;
  height: 18px;
  padding: 0;
  border: 2px transparent solid;
  border-radius: 2px;
  overflow: hidden;
  transition: opacity 0.25s ease-in-out;
  &:hover {
    opacity: 0.75;
  }
`;
