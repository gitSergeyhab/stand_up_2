import { useState, useRef, FormEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EventStatus } from '../../const/const';
import { QueryField } from '../../types/types';
import { createNewSearch, deleteFieldFromSearch, getFieldFromSearch } from '../../utils/navigation-utils';
import { EventStatusFilter } from './event-status-filter/event-status-filter';
import { FilterForm, SubmitButton } from './filter-style';
import { YearFilter } from './year-filter/year-filter';

const DefaultFilterParam = {
  Status: EventStatus.All,
};

/**
 * из url(search) достает limit и offset
 * @param search location.search
 * @returns - {limit, offset}
 */

const getFilterParams = (search: string) => {
  const status = (getFieldFromSearch({ field: 'status', search }) as string) || DefaultFilterParam.Status;
  const year = (getFieldFromSearch({ field: 'year', search }) as string) || null;
  return { status, year };
};

export function Filter({ filters }: { filters: { name: string, title?: string }[] }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { status, year } = getFilterParams(search);

  const yearFromRef = useRef<HTMLInputElement>(null);
  const yearToRef = useRef<HTMLInputElement>(null);
  const [currentStatus, setStatus] = useState(status);
  const [isAnyYear, setAnyYear] = useState(!year);

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const valueYearFromRef = yearFromRef.current?.value;
    const valueYearFrom = !isAnyYear && valueYearFromRef ? valueYearFromRef : null;
    const valueYearToRef = yearToRef.current?.value;
    const valueYearTo = !isAnyYear && valueYearToRef ? valueYearToRef : null;


    const fields = [
      { name: 'status', value: currentStatus },
      { name: 'year_from', value: valueYearFrom },
      { name: 'year_to', value: valueYearTo },
    ].filter((item) => item.name && item.value) as unknown as QueryField[];

    const yearSearch = isAnyYear ? deleteFieldFromSearch({ fields: ['year_from', 'year_to'], search }) : search;

    const newSearch = createNewSearch({
      search: yearSearch,
      fields,
      replace: true,
    });
    navigate(`?${newSearch}`);
  };

  const eventStatusFilter = <EventStatusFilter
      currentEventType={currentStatus}
      setEventType={setStatus}
      filters={filters}
    />


  const yearFilter = <YearFilter
      filters={filters}
      isAnyDate={isAnyYear}
      yearFromRef={yearFromRef}
      yearToRef={yearToRef}
      year={year}
      setAnyDate={setAnyYear}
    />;

  // const yearFilter = filters.some((item) => item === FilterName.Year) ? (
  //   <YearFilter
  //     isAnyDate={isAnyYear}
  //     yearFromRef={yearFromRef}
  //     yearToRef={yearToRef}
  //     year={year}
  //     setAnyDate={setAnyYear}
  //   />
  // ) : null;

  return (
    <FilterForm onSubmit={handleSubmit}>
      {eventStatusFilter}
      {yearFilter}
      <SubmitButton>искать</SubmitButton>
    </FilterForm>
  );
}
