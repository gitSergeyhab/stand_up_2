import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
