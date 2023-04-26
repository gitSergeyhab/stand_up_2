import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.li`
  transition: 0.5s;
  min-height: 100px;
  width: 100%;
  background-color: #300606;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 13px;
  padding: 1rem;
  outline: #000000 2px solid;
  box-shadow: 7px 6px 36px 0px rgba(60, 8, 6, 0.5);

  &:hover,
  &:focus {
    scale: 1.01;
    transition: 0.5s;
    box-shadow: 9px 8px 40px 2px rgba(60, 8, 6, 1);
  }
`;

export const Img = styled.img`
  height: 100%;
`;

export const CardLink = styled(Link)`
  background-color: inherit;
  display: flex;
  /* flex-grow: 1; */
  justify-content: center;
  align-items: center;
  width: 100%;
  color: wheat;
  text-decoration: none;
  height: 160px;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 13px;

  &:focus,
  &:hover {
    outline: goldenrod 1px solid;
  }
`;

export const CardContent = styled.div`
  background-color: #300606;
  color: white;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TitleCard = styled.h4`
  margin: 3px;
  text-align: center;
`;

export const DateCard = styled.p`
  margin: 1px;
`;

export const StatusCard = styled.p`
  margin: 1px;
`;

export const RateCard = styled.p`
  margin: 1px;
  font-size: 12px;
`;

export const ExtLink = styled(Link)`
  text-decoration: none;
  color: gold;

  &:hover,
  &:focus {
    color: goldenrod;
  }
`;
