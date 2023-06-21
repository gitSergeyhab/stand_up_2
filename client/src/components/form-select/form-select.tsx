import { SetStateAction, Dispatch, ChangeEventHandler } from "react";
import { OptionType } from "../../types/types";
import { getStatusOption } from "../../utils/utils";

type SelectOptionProps = {
  option: OptionType;
  selected: boolean
}
function SelectOption({option, selected}: SelectOptionProps) {
  const {id, name} = option;
  return (
    <option value={id} defaultChecked={selected}>{name}</option>
  )
}

type FormSelectProps = {
  options: OptionType[];
  id: string;
  setOption: Dispatch<SetStateAction<OptionType | null>>,
  option: OptionType | null
}

  //

export function FormSelect ({options, option, setOption, id}: FormSelectProps) {


  const handleChangeOption: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setOption(getStatusOption(evt.currentTarget.value))
  }


  const defaultValue = option ? option.name : '-выберете опцию, если знаете-';

  const optionsElements = options.map((item) =>
    <SelectOption key={item.id} option={item} selected={option?.id === item.id}/>
  )
  return (
    <select name={id} id={id} onChange={handleChangeOption}>
      <option key="no-key" value="">{defaultValue}</option>
      {optionsElements}
    </select>
  )
}
