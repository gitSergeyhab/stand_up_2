import styled from "styled-components";

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  background-color: #300606;
  color: goldenrod;
  padding: 0.4rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    background-color: #130101;
    color: #000000;
    &:hover,
    &:focus {
      color: #000000;
    }
  }

  &:hover,
  &:focus {
    color: gold;

    background-color: #130101;
    box-shadow: 4px 4px 8px 0px #300606;
    transition: all 0.3s ease;
  }
`;
