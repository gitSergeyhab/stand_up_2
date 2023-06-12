import styled from "styled-components";
import { LongButton } from "../../../components/common/common-style";

export const GraphDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(13, 1, 1);
  border-radius: 1rem;
  box-shadow:  0 0 1rem #000;
  transition:  box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow:  0 0 2rem #000;
  }
`

export const GraphSection = styled.section`
  display: grid;
  grid-template-areas: "text graph digit";
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-areas:  "graph" "text" "digit";
  }
`;

const SideDiv = styled.div`
  background-color: transparent;
  font-size: 2rem;
  padding: 1rem;

  border: 4px solid #000;
  border-radius: 12px;
  box-shadow: inset  0 0 1rem #000;

  @media (max-width: 1400px) {
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    margin: auto;
    font-size: 1.2rem;
    width: 100%;
  }
`;

export const TextSideDiv = styled(SideDiv)`
  grid-area: text;
`;
export const DigitSideDiv = styled(SideDiv)`
  text-align: center;
  grid-area: digit;
  color: goldenrod;
  min-width: 10rem;
  min-height: 100px;
`;

export const ClearButton = styled(LongButton)`
  font-size: 1rem;
  border-radius: 0.5rem;
`;


export const FlexDiv = styled.div`
  display: flex;
  gap: 1rem;
`
export const ShowMoreButtonWrapper = styled.div`
  padding: 1rem;
  width: 100%;
`
