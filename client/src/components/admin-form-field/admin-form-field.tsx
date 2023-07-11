import { Dispatch, SetStateAction } from "react";
import { AdminInput, AdminInputLabel, AdminRequiredSpan, DateInput } from "../forms/form-style";
import { getStartDate } from "../../utils/date-utils";


export function Required() {
  return <AdminRequiredSpan>*</AdminRequiredSpan>
}

type DateFieldProps = {
  id: string,
  label: string
  date: Date | null | undefined,
  setDate: Dispatch<SetStateAction<Date | null | undefined>>

}
export function DateField ({id, label, date, setDate} : DateFieldProps) {

  return (
      <DateInput
        name={id}
        dateFormat="dd.MM.yyyy"

        id={id}
        selected={date}
        onChange={(value: Date) => setDate(value)}
        shouldCloseOnSelect
        startDate={getStartDate()}
        endDate={new Date()}
        placeholderText={label}
        showYearDropdown
      />
  )
}



type FieldProps = {
  placeholder: string,
  required?: boolean,
  id: string,
  errorIndexes?: string[],
  stateValue?: string
}
export function Field ({placeholder, required=false, id, errorIndexes=[], stateValue}: FieldProps) {

  const isError = errorIndexes.includes(id)

  return (
    <AdminInputLabel htmlFor={id}>
      <AdminInput
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        error={isError}
        defaultValue={stateValue}
      />
       {required ? <Required /> : null}
    </AdminInputLabel>

  )

}
