import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

export const LogRegP = styled.p`
  color: #ffffff;
  font-size: 14px;

  & * {
    transition: 0.5s all;
  }
`;

export const LogRegLink = styled(Link)`
  color: #000000;
  background-color: #ffffff;
  text-decoration: none;
  padding: 2px 4px;
  margin-left: 10px;
  text-align: center;

  &:hover {
    color: gold;
    background-color: #000000;
  }
`;

export const LongButton = styled.button`
  width: 100%;
  background-color: #300606;
  color: goldenrod;
  padding: 0.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    background-color: #130101;
    color: #000000;
    &:hover,
    &:focus {
      color: #000000;
    }
  }

  &:hover,
  &:focus {
    color: #FFF;

    background-color: #130101;
    transition: all 0.3s ease;
  }
`;

export const CommonFieldSet = styled.fieldset`
  border-color: #644102;
  border-style: solid;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
`;

export const CommonRightFormContainer = styled.section`
  width: 100%;
  background-color: #300606;
  font-size: 12px;
  color: gold;

  @media (min-width: 600px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    width: 18%;
    position: absolute;
    right: 1rem;
    top: 5rem;
  }
`

export const CommonAsideContainer = styled.aside<{side?:string}>`
  width: 100%;
  background-color: #300606;
  font-size: 12px;
  color: gold;

  @media (min-width: 600px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    width: 18%;
    position: fixed;
    /* right: 1rem; */
    top: 5rem;

    ${({side}) => side === 'left' ? 'left: 1rem;' : 'right: 1rem;'}


  }
`



export const CommonSideForm = styled.form`
  width: 100%;
  background-color: #300606;
  display: flex;
  flex-direction: column;
  border: solid 2px #000000;
`;


export const TopLeftDiv = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: -0.5rem;
`


export const AbsoluteDiv = styled.div<{side: 'left'| 'right', height: 'top'|'bottom' }>`
  position: absolute;
  display: flex;

  ${({side}) => `${side}: 0;`}
  ${({height}) => `${height}: ${height === 'bottom' ? '' : '-'}0.5rem;`}
`
export const LongLink = styled(Link)`
  color: #FFF;
  background-color: #480909;
  text-decoration: none;
  padding: 2px 4px;
  text-align: center;
  width: 100%;
  margin-bottom: 0.5rem;
  transition: 0.3s ease-in-out all;

  &:hover {
    color: gold;
    background-color: #000000;
  }
`;

export const hiddenStyle = css`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  border: none;
  outline: none;
  overflow: hidden;
  scale: 0;
`
export const SmallSup = styled.sup`font-size: 0.65rem;`;


const activeStyleBtn = css`
  color: goldenrod;
  background-color: #4d0d0d;
  box-shadow: inset 2px 2px 2px #00000066;
  scale: 1.15;

`

export const ActionButton = styled.button.attrs({type: 'button'})<{width?:number, active?: boolean}>`
  /* width: 1.5rem; */
  width: ${({width}) => width || 1.5}rem ;
  height: 1.5rem;
  border: 2px solid rgb(13, 1, 1);
  background-color: goldenrod;
  border-radius: 6px;
  color: #000;
  padding: 0;
  scale: 1;
  &:hover {
    color: #FFF;
    box-shadow: 2px 2px 2px #00000066;
  }

  &:active {
    ${activeStyleBtn};
    scale: 1.1;
  }

  ${({active}) => active ? activeStyleBtn : ''} ;

  transition: color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
`

