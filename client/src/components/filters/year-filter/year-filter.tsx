import { RefObject } from 'react';

import { getCurrentYear } from '../../../utils/date-utils';
import {
  YearAnyInput,
  YearFieldSet,
  YearInput,
  YearLabel,
} from './year-filter-style';

type YearFilterProps = {
  yearRef: RefObject<HTMLInputElement>;
  isAnyDate: boolean;
  setAnyDate: (isAnyDate: boolean) => void;
  year: string | null;
};

export function YearFilter({
  yearRef,
  isAnyDate,
  setAnyDate,
  year,
}: YearFilterProps) {
  const currentYear = year ? +year : getCurrentYear();
  const maxYear = currentYear + 3;

  const handleChange = () => setAnyDate(!isAnyDate);

  return (
    <YearFieldSet>
      <legend> Год</legend>
      <YearLabel>
        <YearInput
          ref={yearRef}
          min={1900}
          max={maxYear}
          defaultValue={currentYear}
          disabled={isAnyDate}
        />
      </YearLabel>
      <YearLabel>
        <YearAnyInput checked={isAnyDate} onChange={handleChange} />
        не важно
      </YearLabel>
    </YearFieldSet>
  );
}
