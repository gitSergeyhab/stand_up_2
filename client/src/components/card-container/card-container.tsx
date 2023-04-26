import styled from 'styled-components';
import { GridCardType } from '../../types/types';
import { GridCard } from '../grid-card/grid-card';

export const CardContainerUl = styled.ul`
  width: 100%;
  list-style: none;
  box-sizing: border-box;
  display: grid;
  place-content: center;
  gap: 1rem;
  grid-template-columns: repeat(3, 30%);
  margin: 0;
  padding: 1rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 47%);
  }

  @media (max-width: 900px) {
    grid-template-columns: 90%;
  }
`;

export function CardContainer({ cards }: { cards: GridCardType[] }) {
  const cardElements = cards
  // без этого при переключении с page-card-filter-list  на  page-card-filter-list
  // не выдает ошибку, потому что в  cards  становится {id: undefined, name: undefined ...}
    .filter((item) => item.id)
    .map((item) => <GridCard key={item.id} card={item} />);

  return <CardContainerUl>{cardElements}</CardContainerUl>;
}
