import { RefObject } from 'react';
import { YearAnyInput, YearFieldSet, YearInput, YearLabel } from './year-filter-style';
import { getDefaultYears } from '../../../utils/date-utils';
import { FilterName } from '../../../const/const';
import { FilterPropsType } from '../../../types/firler-type';




type YearFilterProps = {
  yearFromRef: RefObject<HTMLInputElement>;
  yearToRef: RefObject<HTMLInputElement>;
  isAnyDate: boolean;
  setAnyDate: (isAnyDate: boolean) => void;
  year: string | null;
  filters: FilterPropsType[]

};

export function YearFilter({ yearFromRef, yearToRef, isAnyDate, setAnyDate, year, filters }: YearFilterProps) {

  const filterIndex = filters.findIndex((item) => item.name === FilterName.Year)
  console.log({filters, filterIndex})

  if (filterIndex === -1) {
    return null;
  }

  const title = filters[filterIndex].title || 'Годы';

  const {currentYear, maxYear, minYear} = getDefaultYears(year)

  const handleChange = () => setAnyDate(!isAnyDate);

  return (
    <YearFieldSet>
      <legend> {title} </legend>
      <YearLabel>
        <YearInput
          ref={yearFromRef}
          min={minYear}
          max={maxYear}
          defaultValue={minYear}
          disabled={isAnyDate}
          placeholder='c'
          title='c'
          name='year_from'
        />
        <YearInput
          ref={yearToRef}
          min={minYear}
          max={maxYear}
          defaultValue={currentYear}
          disabled={isAnyDate}
          placeholder='по'
          title='по'
          name='year_to'
        />
      </YearLabel>
      <YearLabel>
        <YearAnyInput checked={isAnyDate} onChange={handleChange} />
        не важно
      </YearLabel>
    </YearFieldSet>
  );
}
