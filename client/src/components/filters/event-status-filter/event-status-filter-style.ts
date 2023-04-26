import styled from 'styled-components';

export const EventStatusFieldSet = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: start;

  & input {
    margin-right: 0.2rem;
  }

  @media (min-width: 700px) {
    text-align: center;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    text-align: start;
    grid-template-columns: 1fr;
  }
`;
