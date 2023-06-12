import { Link } from "react-router-dom";
import styled from "styled-components";

export const VoteUL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  padding: 1rem;

  @media (max-width: 1000px) {
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  @media (max-width: 800px) {
    font-size: 0.8rem;
    padding: 0.1rem;
  }
`;


export const VoteLi = styled.li`
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  display: grid;
  box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.4);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 2px 2px 12px 0px rgba(34, 60, 80, 0.5);
  }
`;


export const SmallImg = styled.img`
  height: 2.2rem;
  object-fit: cover;
  border-radius: 0.75rem;
`
export const RatingLink = styled(Link)`
  height: 2.2rem;
  display: flex;
  max-width: 80%;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition:
    0.3s scale ease-in-out,
    0.3s color ease-in-out;
  &:hover {
    scale: 1.01;
    color: rgb(255, 155, 5);
  }
`
export const UserLink = styled(RatingLink)`
  grid-area: user;
`;

export const ShowLink = styled(RatingLink)`
  grid-area: show;
`;


export const DateDiv = styled.div`
  display: flex;
  align-items: center;
  grid-area: date;
  @media (max-width: 600px) {
    display: none;
  }

`;

export const VoteSector = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:first-child {
    margin-bottom: 1rem;
  }

`;

export const BadgeSector = styled.div`
  display: flex;
  align-items: end;
  gap: 0.3rem;

  @media (max-width: 600px) {
    display: none;
  }

`


export const VoteBadgeDiv = styled.div`
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

`

export const UserRateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.3rem;
  height: 2.3rem;
  color: rgb(255, 155, 5);
  font-weight: 700;
  border: 4px solid rgb(225, 135, 1);
  border-radius: 4px;
  font-size: 1.3rem;
  box-shadow: 2px 2px 4px 2px rgba(34, 60, 80, 0.4);
`
