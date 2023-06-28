// import { RefObject } from 'react';
// import ReactDatePicker from 'react-datepicker';
// import { YearAnyInput, YearFieldSet, YearInput, YearLabel } from './year-filter-style';
// import { getDefaultYears } from '../../../utils/date-utils';
// import { FilterName } from '../../../const/const';
// import { FilterPropsType } from '../../../types/filter-type';




// type YearFilterProps = {
//   yearFromRef: RefObject<HTMLInputElement>;
//   yearToRef: RefObject<HTMLInputElement>;
//   isAnyDate: boolean;
//   setAnyDate: (isAnyDate: boolean) => void;
//   // year: string | null;
//   filters: FilterPropsType[];
//   yearTo: string;
//   yearFrom: string;

// };

// export function YearFilter({ yearFromRef, yearToRef, isAnyDate, setAnyDate,  filters, yearFrom, yearTo }: YearFilterProps) {

//   const filterIndex = filters.findIndex((item) => item.name === FilterName.Year)
//   console.log({filters, filterIndex})

//   if (filterIndex === -1) {
//     return null;
//   }

//   const title = filters[filterIndex].title || 'Годы';

//   const {currentYear, maxYear, minYear} = getDefaultYears()

//   const handleChange = () => setAnyDate(!isAnyDate);

//   return (
//     <YearFieldSet>
//       <legend> {title} </legend>
//       <YearLabel>

//       <ReactDatePicker

//       name={id}
//       dateFormat="dd.MM.yyyy"

//       id={id}
//       selected={date}
//       onChange={(value: Date) => setDate(value)}
//       shouldCloseOnSelect
//       startDate={getStartDate()}
//       endDate={new Date()}
//       placeholderText={label}
//       showYearDropdown
//       />
//         {/* <YearInput
//           ref={yearFromRef}
//           min={minYear}
//           max={maxYear}
//           defaultValue={yearFrom}
//           disabled={isAnyDate}
//           placeholder='c'
//           title='c'
//           name='year_from'
//         /> */}
//         {/* <YearInput
//           ref={yearToRef}
//           min={minYear}
//           max={maxYear}
//           defaultValue={yearTo}
//           disabled={isAnyDate}
//           placeholder='по'
//           title='по'
//           name='year_to'
//         /> */}
//       </YearLabel>
//       <YearLabel>
//         <YearAnyInput checked={isAnyDate} onChange={handleChange} />
//         не важно
//       </YearLabel>
//     </YearFieldSet>
//   );
// }

import { SetStateAction,  Dispatch } from 'react';
import dayjs from 'dayjs';
import { Picker, YearAnyInput, YearBlock, YearFieldSet,  YearLabel } from './year-filter-style';
import { FilterName } from '../../../const/const';
import { FilterPropsType } from '../../../types/filter-type';




const getYear = (strDate?: string) => strDate ? dayjs(strDate).toDate() : null;

type YearPickerProps = {
  id: string;
  setYear: Dispatch<SetStateAction<string|undefined>>;
  stringDate?: string;
  text?: string
}

function YearPicker({stringDate, id, setYear, text}: YearPickerProps) {
  const date = getYear(stringDate);
  const handleYearChange = (value: Date|null) => {
    const newYear = dayjs(value).year().toString();
    if(newYear) {
      setYear(newYear)
    }
  }

  return (
    <Picker
      autoComplete='off'
      name={id}
      dateFormat="yyyy"
      shouldCloseOnSelect
      startDate={date}
      id={id}
      selected={date}
      onChange={handleYearChange}
      showYearPicker
      placeholderText={text}
    />
  )
}



type YearFilterProps = {
  isAnyDate: boolean;
  setAnyDate: Dispatch<SetStateAction<boolean>>
  filters: FilterPropsType[];
  yearTo?: string;
  yearFrom?: string;
  setYearTo:Dispatch<SetStateAction<string|undefined>>;
  setYearFrom: Dispatch<SetStateAction<string|undefined>>;
};

export function YearFilter({ isAnyDate, setAnyDate,  filters, yearFrom, yearTo, setYearFrom, setYearTo }: YearFilterProps) {

  const filterIndex = filters.findIndex((item) => item.name === FilterName.Year)

  if (filterIndex === -1) {
    return null;
  }

  const title = filters[filterIndex].title || 'Годы';


  const handleChange = () => {
    setAnyDate((prev) => !prev);
    setYearFrom(undefined);
    setYearTo(undefined);

  };

  return (
    <YearFieldSet>
      <legend> {title} </legend>
      <YearBlock invisible={isAnyDate}>

        <YearPicker id='year_from' setYear={setYearFrom} stringDate={yearFrom} text='с'/>
        <YearPicker id='year_to' setYear={setYearTo} stringDate={yearTo} text='по'/>

      </YearBlock>
      <YearLabel>
        <YearAnyInput checked={isAnyDate} onChange={handleChange}  />
        не важно
      </YearLabel>
    </YearFieldSet>
  );
}
