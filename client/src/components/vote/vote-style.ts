import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const VoteLi = styled.li`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #000000 solid;
  &:first-child {
    border-top: 1px #000000 solid;
  }

  width: 100%;
`;

export const NikDateContainer = styled.div`
  flex-grow: 2;
  padding: 1rem;
  @media (min-width: 500px) {
    padding: 1rem 2rem;
  }

  @media (min-width: 900px) {
    padding: 1rem 3rem;
  }
`;

export const AvatarContainer = styled(Link)`
  width: 80px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 500px) {
    width: 90px;
    height: 90px;
  }

  @media (min-width: 900px) {
    width: 100px;
    height: 100px;
  }
`;

export const UserImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const UserLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

export const Date = styled.p`
  font-style: italic;
  font-size: small;
`;

export const RateContainer = styled.div`
  text-align: end;
`;

export const MyRate = styled.h3`
  color: green;
`;
