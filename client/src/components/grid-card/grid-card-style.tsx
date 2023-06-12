import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.li`
  position: relative;
  min-height: 100px;
  width: 100%;
  background-color: #300606;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 13px;
  padding: 1rem;
  outline: #000000 2px solid;
  box-shadow: inset 0 0 1rem #000, 0 0 0.1rem #000;
  transition:  all 0.3s ease-in-out;


  &:hover,
  &:focus {
    /* scale: 1.01; */
    box-shadow: inset 0 0 0.1rem #000, 0 0 1rem #000;
  }
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;

`;

export const CardLink = styled(Link)`
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  text-decoration: none;
  height: 160px;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 13px;

  &:focus,
  &:hover {
    box-shadow: 0 0 1rem #000;
  }
`;

export const CardTitleLink = styled(Link)`
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  text-decoration: none;
  overflow: hidden;

  &:focus,
  &:hover {
    color: goldenrod;
    box-shadow: 0 0 1rem #000;
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

export const ExtNoLink = styled.span`
  text-decoration: none;
  color: gold;

  &:hover,
  &:focus {
    color: goldenrod;
  }
`;

