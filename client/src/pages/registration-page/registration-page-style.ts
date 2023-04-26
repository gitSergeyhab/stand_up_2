import styled from 'styled-components';

export const RegForm = styled.form<{ disabled?: boolean }>`
  background-color: #1a0e0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const RegInput = styled.input`
  width: 90%;
  margin-bottom: 1rem;
  padding: 0.2rem 1rem;
  background-color: #310c07;
  color: goldenrod;
  border: 2px solid #000000;

  @media (min-width: 500px) {
    width: 70%;
  }

  @media (min-width: 900px) {
    width: 40%;
  }
`;

export const Header = styled.h1`
  color: #300606;
`;

export const RegButton = styled.button.attrs({ type: 'submit' })`
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
