import styled from 'styled-components';
import { CommonFieldSet } from '../common/common-style';


export const SortFieldset = styled(CommonFieldSet)`
  display: flex;
  row-gap: 1rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 1rem ;
  padding-bottom: 1rem ;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media (min-width: 1200px) {
    row-gap: 0.5rem;
    }

`


