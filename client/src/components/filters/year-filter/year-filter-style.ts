import styled from 'styled-components';

export const YearInput = styled.input.attrs({ type: 'number' })`
  color: #200404;
  width: min-content;
  &:focus,
  &:hover {
    color: goldenrod;
    background-color: #000000;
  }
`;

export const YearLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const YearFieldSet = styled.fieldset`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const YearAnyInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;
