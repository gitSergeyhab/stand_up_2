import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonFieldSet, HiddenInput } from "../../common/common-style";
import { createNewSearch, getFieldFromSearch } from "../../../utils/navigation-utils";


type FilterButton = {
  name: string, value: string
}

const radioButtons = [
  {name: 'Лучшие за год', value: 'year'},
  {name: 'Лучшие за месяц', value: 'month'},
  {name: 'Лучшие за неделю', value: 'week'},
  {name: 'Лучшие за всё время', value: 'all'},
  {name: 'Новые', value: 'new'},
];

const NewsHiddenInput = styled(HiddenInput)`
  &:checked ~ label {
    background-color: #000;
    color: #FFF;
    border-radius: 16px;
    padding: .75rem;
    box-shadow:  2px 2px 2px #000;
  }
`;

const NewsInputLabel = styled.label`
  padding: .25rem;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function RadioInput({button}: {button: FilterButton}) {
  const {name, value} = button;

  const {search} = useLocation();
  const navigate = useNavigate();

  const field = (getFieldFromSearch({field: 'filter', search}) || 'all') as string;
  const defaultChecked = field === value;
  const handleChange = () => {
    const fields = [{name: 'filter', value}];
    const newSearch = createNewSearch({search, fields, replace: true});
    navigate(`?${newSearch}`);
  }

  return (
        <InputDiv>
          <NewsHiddenInput
            defaultChecked={defaultChecked}
            onChange={handleChange}
            name="radio-filter"
            id={value}
            value={value}
          />
          <NewsInputLabel htmlFor={value}>{name}</NewsInputLabel>
        </InputDiv>
  )
}


export function RadioNews() {
  const buttonElements = radioButtons.map((item) => <RadioInput key={item.value} button={item}/>)
  return (
    <CommonFieldSet>
      <legend> Показать </legend>
      {buttonElements}
    </CommonFieldSet>
  )
}
