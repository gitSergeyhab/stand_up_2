import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UserMenuUl = styled.ul`
  position: absolute;
  top: 50px;
  right: 22px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 40;
  background-color: #000000;
  border-radius: 3px;
  padding: 4px;
  padding: 3px;
`;

export const UserMenuLi = styled.li`
  flex-grow: 1;
  text-align: left;
  vertical-align: middle;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const UserMenuLink = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  color: gold;
  text-decoration: none;
  text-transform: uppercase;
  height: 100%;
  width: 100%;
  font-size: 10px;
  padding: 0 5px;

  &:hover,
  &:focus {
    background-color: #300606;
  }
`;

// my-rate
