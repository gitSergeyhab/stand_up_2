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

  // const [startDate, setStartDate] = useState<Date|null>(null);


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

// const setCurrentError = ({value, pattern}: {value: string, pattern?: RegExp}) => {
//   if (!pattern || !value) {
//     return false;
//   }
//   return !pattern.test(value)
// }

// type FieldType = {
//   placeholder: string,
//   id: string,
//   required?: boolean,
//   maxLen?: number,
//   pattern?: RegExp,
//   requirements?: string[]
// }
// export function Field ({placeholder, required=false, id, maxLen=64, pattern, requirements=[]}: FieldType) {


//   const [value, setValue] = useState('');

//   const [error, setError] = useState(false);

//   const handleInput = (evt: FormEvent<HTMLInputElement>) => {
//     const currentValue = evt.currentTarget.value
//     const currentError = setCurrentError({value: currentValue, pattern})
//     setValue(currentValue)
//     setError(currentError)

//   }



//   return (
//     <AdminInputLabel htmlFor={id}>
//       <AdminInput
//         name={id}
//         error={error}
//         onInput={handleInput}
//         type="text"
//         placeholder={placeholder}
//         id={id}
//         required={required}
//         maxLength={maxLen}
//         minLength={3}
//         value={value}
//        />
//        {required ? <Required /> : null}
//        <ErrorField error={error} requirements={requirements.join('\n')} />
//     </AdminInputLabel>

//   )

// }

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
        // defaultValue="test"

      />
       {required ? <Required /> : null}
    </AdminInputLabel>

  )

}
