import { OptionType } from "../../types/types";

type SelectOptionProps = {
  option: OptionType;
}
function SelectOption({option}: SelectOptionProps) {
  const {id, name} = option;
  return (
    <option value={id}>{name}</option>
  )
}

type FormSelectProps = {
  options: OptionType[];
  id: string
}

  //

export function FormSelect ({options, id}: FormSelectProps) {

  const optionsElements = options.map((item) => <SelectOption key={item.id} option={item}/>)
  return (
    <select name={id} id={id}>
      <option key="no-key" value="">--выберете {id}, если знаете--</option>
      {optionsElements}
    </select>
  )
}
