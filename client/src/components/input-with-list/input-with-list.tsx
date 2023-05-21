import { useState, ChangeEventHandler, SetStateAction, Dispatch } from "react";
import { AdminInput,  ChosenDataDiv, InputWithListDiv, OptionButton, OptionList } from "../forms/form-style";
import { OptionType } from "../../types/types";
import { Required } from "../admin-form-field/admin-form-field";


const filterValues = (pattern: string, list: OptionType[]) => {
  const cleanPattern = pattern.replace(/[^a-zа-яё\s\d-/&!"'#$%<>_?]/ig,'');
  try {
    const re = new RegExp(cleanPattern, 'i')
    return list.filter((item) => re.test(item.name));
  } catch (err) {
    return []
  }
}


type ChosenDataProps = {
  setDataValue: Dispatch<SetStateAction<OptionType | null>>
  chosenDataValue: OptionType
}

function ChosenData({chosenDataValue, setDataValue}: ChosenDataProps) {
  const {name} = chosenDataValue;
  return (
    <ChosenDataDiv>
      {name}
      <button type="button" onClick={() => setDataValue(null)}> ✘ </button>
    </ChosenDataDiv>
  )

}

type InputWithListProps = {
  setDataValue: Dispatch<SetStateAction<OptionType | null>>
  options: OptionType[],
  id: string,
  dataName: string,
  chosenDataValue: OptionType|null
  required?:boolean
}


export function InputWithList({options, id, dataName, required, setDataValue, chosenDataValue} : InputWithListProps) {
  const [values, setValues] = useState(options);
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {value} = evt.target;
    setInputValue(value)
    const filteredValues = filterValues(value, options)
    setValues(filteredValues);
  }

  const handleOptionClick = (option: OptionType) => {
    setInputValue('')
    setDataValue(option)
  }

  const dataList = inputValue ? values.map((item) =>
    <li key={item.id} >
      <OptionButton onClick={() => handleOptionClick(item)}>{item.name}</OptionButton>
    </li>
  ) : null



  const chosenDataElement = chosenDataValue ? <ChosenData chosenDataValue={chosenDataValue} setDataValue={setDataValue}/> : null;
  return (
    <InputWithListDiv>
      <AdminInput
        type="text"
        hidden={!!chosenDataValue}
        id={id}
        placeholder={dataName}
        onChange={handleChangeInput}
        value={inputValue}
        required={required && !chosenDataValue}
        error={!!inputValue}
        name='no_name'

      />
      {required && !chosenDataValue ? <Required /> : null}
      <OptionList hidden={!!chosenDataValue}>
        {dataList}
      </OptionList>
      {chosenDataElement}
    </InputWithListDiv>

  )
}
