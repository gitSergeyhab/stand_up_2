import styled from 'styled-components';

export const AboutTable = styled.table`
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  min-width: 320px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
`;

export const TR = styled.tr`
  height: 48px;
  border-bottom: 1px solid #300606;
  &:last-child {
    border: 0;
  }
`;

export const TDL = styled.td`
  padding-left: 10px;
`;

export const TDR = styled.td`
  text-align: end;
  padding-right: 10px;
`;
