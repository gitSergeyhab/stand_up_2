import { Dispatch, SetStateAction, useState } from "react"
import { OptionType } from "../../../types/types"
import { CommonFieldSet, LongButton } from "../../common/common-style";
import { FilterPropsType } from "../../../types/filter-type";
import { FilterSelectLI, FilterSelectUl } from "./filter-select-style";


type SelectOptionProps = {
  option: OptionType;
  onClick: (item: OptionType) => void
}

function SelectOption({option, onClick}: SelectOptionProps) {

  const handleClick = () => onClick(option)
  const {name} = option
  return (
    <FilterSelectLI value={name} onClick={handleClick}>
      {name}
    </FilterSelectLI>
  )
}

type ChosenBlockProps = {
  option: OptionType;
  setOpen: Dispatch<SetStateAction<boolean>>
}

function ChosenBlock({option, setOpen}: ChosenBlockProps) {

  const handleClick = () => setOpen((prev) => !prev)

  return (
    <LongButton type="button" onClick={handleClick}>
      {option.name}
    </LongButton>
  )
}

type FilterSelectProps = {
  option: OptionType;
  options: OptionType[];
  setOption: Dispatch<SetStateAction<OptionType>>;
  filters: FilterPropsType[];
  filterName: string

}

export function FilterSelect({option, options, setOption, filters, filterName}: FilterSelectProps) {

  const [open, setOpen] = useState(false)

  const filterIndex = filters.findIndex((item) => item.name === filterName)

  if (filterIndex === -1) {
    return null;
  }

  const title = filters[filterIndex].title || 'Страна';

  const handleCountryLiClick = (item: OptionType) => {
    setOption(item);
    setOpen(false)
  }

  const optionElements =  [{id: -1, name: 'Все'}, ...options].map((item) =>
  <SelectOption key={item.id} option={item} onClick={handleCountryLiClick} />
  )

  const optionsBlock = open ? <FilterSelectUl> {optionElements} </FilterSelectUl> : null;
  return (
    <CommonFieldSet>
      <legend> {title} </legend>
      <ChosenBlock option={option} setOpen={setOpen}/>
      {optionsBlock}
    </CommonFieldSet>
  )
}
