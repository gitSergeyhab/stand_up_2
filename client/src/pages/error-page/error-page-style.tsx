import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotExistSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
`;

export const RedirectLink = styled(Link).attrs({ to: '/' })`
  text-decoration: none;
  color: goldenrod;
  font-size: 2rem;
  margin: 1rem;

  &:focus,
  &:hover {
    color: #0d0101;
    text-decoration: underline;
  }
`;
