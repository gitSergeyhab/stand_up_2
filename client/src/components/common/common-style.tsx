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
