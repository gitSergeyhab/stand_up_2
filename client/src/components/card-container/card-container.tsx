import {ReactNode} from 'react'
import styled from 'styled-components';


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


export function CardContainer({children}: {children: ReactNode[]}) {
  return <CardContainerUl>{children}</CardContainerUl>;
}
