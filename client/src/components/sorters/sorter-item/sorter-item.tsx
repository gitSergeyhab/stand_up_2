import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewSearch } from '../../../utils/navigation-utils';
import { HiddenInput } from '../../common/common-style';





const SorterLabel = styled.label`
  color: #FFF;
  &:hover {

    text-shadow: 1px 1px 1px gold;
  }
  transition: 0.3s color ease-in-out;
  cursor: pointer;

`;


const SorterItemDiv = styled.div`
  width: 49%;
  @media (min-width: 1200px) {
    width: 100%;
  }
`

type SorterDirectionProps = {
  startValue: string,
  value: string,
  title: string,
  name: string
}

export function SorterItem({value, startValue, title, name}: SorterDirectionProps) {

  const {search} = useLocation();
  const navigate = useNavigate();

  const handleChange = () => {
    const fields = [{name, value}];
    const newSearch = createNewSearch({search, fields, replace: true});
    navigate(`?${newSearch}`);
  }
  return (
    <SorterItemDiv>
      <HiddenInput name={name} onChange={handleChange} value={value} id={title} defaultChecked={value === startValue}/>
      <SorterLabel htmlFor={title}>{title}</SorterLabel>
    </SorterItemDiv>

  )
}
