import styled, {css} from "styled-components";
import { hiddenStyle } from "../common/common-style";

const left = css`
  height: auto;
  top: 7%;
  bottom: 0;
  left: 0;
  width: 20%;
`;

const right = css`
  height: auto;
  top: 7%;
  bottom: 0;
  right: 0;
  width: 20%;
`;

const bottom = css`
  height: 350px;
  bottom: 0;
  left: 10%;
  width: 80%;
`;

const center = css`
  height: 93%;
  bottom: 0;
  left: 19%;
  width: 62%;
`;



export const ChatSection = styled.section<{position: string, hide?: boolean}>`
  border: 4px solid white;
  outline: 4px solid #130301;
  box-shadow: 8px -8px 8px #e6980685;
  background-color: #130301;
  display: grid;
  grid-template-rows: 2rem auto 1rem;

  position: fixed;
  padding: 0.1rem;
  z-index: 6;

  width: 100%;
  bottom: 0;
  ${({position}) => position === 'bottom' ? bottom : ''};
  ${({position}) => position === 'left' ? left : ''};
  ${({position}) => position === 'right' ? right : ''};
  ${({position}) => position === 'center' ? center : ''};
  ${({hide}) => hide  ? hiddenStyle : ''};
  transition: background-color 0.4s ease-in-out;
`;

export const ChartCloseBtn = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: 1%;
  top: 1%;
  border: none;
  background-color: transparent;
  color: gold;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover,
  &:focus {
    color: goldenrod;
    outline: 2px solid;
  }
`;


export const SettingsDiv = styled.div`
  position: absolute;
  top: 1.75rem;
  right: 0;
  display: flex;
  height: min-content;
  width: min-content;
`;

export const ButtonsDiv = styled.div`
position: absolute;
top: 1.5rem;
right: 1rem;
display: flex;
height: min-content;
width: min-content;
opacity: 0.5;
scale: 0.7;
transition: opacity 0.3s ease-in-out, scale 0.3s ease-in-out;

&:hover {
  opacity: 1;
  scale: 0.85;
}
`;

export const ChatHeader = styled.h2`
  background-color: #000;
  color: goldenrod;
  width: 100%;
  text-align: center;
  height: 2rem;
  /* position: absolute; */
  margin: 0;
`
