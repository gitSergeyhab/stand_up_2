import styled from 'styled-components';

export const FilterForm = styled.form`
  width: 100%;
  background-color: #300606;
  color: gold;
  display: flex;
  flex-direction: column;
  border: solid 2px #000000;
  font-size: 12px;
`;

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  background-color: #200404;
  color: gold;
  outline: 1px solid #000000;
  cursor: pointer;
  margin-top: 0.5rem;

  &:focus,
  &:hover {
    background-color: #300606;
    color: goldenrod;
    outline: 2px solid #000000;
  }
`;
