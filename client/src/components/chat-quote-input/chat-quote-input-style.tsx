import styled from "styled-components";


export const QuoteSection = styled.section`
  width: 97.5%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  position: absolute;
  top: -2rem;
  background-color: #FFF;
  padding: 4px .3%;
  box-shadow: inset 8px 0 8px 0 #00000089;
`;
export const QuoteText = styled.span`
`;

export const QuoteUser = styled.div`
  height: 100%;
  color: #FFF;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  border-radius: 4px;
`;

export const QuoteImg = styled.img`
  height: 1.5rem;
  object-fit: cover;
  border: 2px solid #000;
  box-shadow: 2px 2px 2px #00000083;

  @media (min-width: 900px) {
    height: 2rem;
    width: 2rem;
  }
`;

export const BtnWrapperDiv = styled.div`
  position: absolute;
  right: 1rem;
`;

export const ImgNikQuoteDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 0.5rem;
`
