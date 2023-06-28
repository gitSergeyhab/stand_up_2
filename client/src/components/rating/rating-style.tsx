import styled from 'styled-components';

export const RatingSection = styled.section`
  min-width: 320px;
  display: grid;
  grid-template-columns: auto min-content;
  margin: 0 auto;
  padding: 10px 15px;
  background: #f8f8f8;
  box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.2);
`;

export const StarsDiv = styled.div`
  &:not(:checked) > label:hover:before,
  &:not(:checked) > label:hover ~ label:before {
    color: #da9320;
  }
`;

export const UserRateDiv = styled.div`
  vertical-align: bottom;
  color: #300606;
  font-size: 18px;
  font-weight: 700;
  text-align: start;
  padding: 0 0.5rem;
`;

export const RatingLabel = styled.label`
  float: right;
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:not(:first-of-type) {
    padding-right: 5px;
  }

  &:before {
    content: '★';
    font-size: 26px;
    color: gold;
    line-height: 1;
  }
`;

export const RatingInput = styled.input.attrs({
  type: 'radio',
  name: 'rating-2',
})`
  display: none;
  &:checked ~ label:before {
    color: #300606;
    text-shadow: 1px 1px black;
  }
`;

export const LineDiv = styled.div<{ size: number }>`
  width: 100%;
  height: 0.5rem;
  background-color: #300606;
  margin-top: 0.5rem;
  background: ${({ size }) => `linear-gradient(90deg, rgba(48,6,6,1) ${size - 5}%, rgba(255,215,0,1) ${
    size + 5
  }%);`};
`;

export const VotesSpan = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

// my-rate
