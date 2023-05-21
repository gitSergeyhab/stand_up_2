import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TabPanelUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  background-color: #300606;
  width: 100%;
  margin-bottom: 30px;
  box-shadow: 1px 4px 8px 0px rgba(34, 60, 80, 0.6);
  &:hover {
    box-shadow: 1px 5px 8px 0px rgba(34, 60, 80, 0.6);
  }
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

type TabProps = { active: boolean };

export const TabLi = styled.li<TabProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  background: ${({ active }) => (active
    ? 'radial-gradient(circle, rgba(141,30,30,1) 0%, rgba(48,6,6,1) 100%)'
    : '')};
`;

export const TabLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  color: #ff9b05;
  transition: 0.3s ease-in-out all;

  &:hover,
  &:focus {
    box-shadow: 1px 5px 8px 0px rgba(34, 60, 80, 0.7);
    color: #f57215;
  }

  @media (max-width: 900px) {
    &:hover,
    &:focus {
      box-shadow: 1px 1px 8px 0px rgba(34, 60, 80, 0.7);
    }
  }
`;
