import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { CommonFieldSet } from '../../common/common-style';

export const YearInput = styled.input.attrs({ type: 'number' })`
  color: #200404;
  width: min-content;
  &:focus,
  &:hover {
    color: goldenrod;
    background-color: #000000;
  }
`;

export const YearLabel = styled.label<{invisible?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({invisible}) =>  invisible ? 'display: none;' : ''}
`;

export const YearBlock = styled.div<{invisible?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({invisible}) =>  invisible ? 'display: none;' : ''}
`;

export const YearFieldSet = styled(CommonFieldSet)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-color: #644102;
  border-style: solid;
`;

export const YearAnyInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

export const Picker = styled(ReactDatePicker)`
  width: 80%;
`;
