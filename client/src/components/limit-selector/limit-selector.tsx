import { Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import styled from 'styled-components';


const LIMITS = [2,4,10,20,40];

const LimitSelect = styled.select`
  width: 100%;
  text-align: center;
  box-shadow:  0 0 0.5rem #000;
  transition: 0.3s box-shadow ease-in-out;
  &:hover {
    box-shadow:  0 0 1rem #000;
  }
`;

const SelectWrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

function LimitOption({value}: {value: number}) {
  return <option value={value}>{value}</option>
}

type LimitSelectorProps = {
  setLimit: Dispatch<SetStateAction<number>>
}


export function LimitSelector({setLimit}: LimitSelectorProps) {

const handleChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
  const value = +evt.target.value
  if (value) setLimit(value)
}
  const options = LIMITS.map((item) =>
    <LimitOption key={item} value={item} />
  )

  return (
    <SelectWrapper>
      <LimitSelect onChange={handleChange} name="limit" id="limit">
        {options}
      </LimitSelect>
    </SelectWrapper>
  )
}
