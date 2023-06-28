import { useState, FormEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EventStatus, FilterName } from '../../const/const';
import { OptionType, QueryField } from '../../types/types';
import { createNewSearch, deleteFieldFromSearch, getFieldFromSearch } from '../../utils/navigation-utils';
import { EventStatusFilter } from './event-status-filter/event-status-filter';
import { FilterForm, SubmitButton } from './filter-style';
import { YearFilter } from './year-filter/year-filter';
import { FilterSelect } from './filter-select/filter-select';
import { getCountries, getLanguages } from '../../store/preload-reducer/preload-selectors';

const DefaultFilterParam = {
  Status: EventStatus.All,
};

/**
 * из url(search) достает limit и offset
 * @param search location.search
 * @returns - { status, yearTo, yearFrom, countryId, languageId }
 */

const getFilterParams = (search: string) => {
  const status = (getFieldFromSearch({ field: 'status', search }) as string) || DefaultFilterParam.Status;
  const yearTo = (getFieldFromSearch({ field: 'year_to', search }) as string) || undefined;
  const yearFrom = (getFieldFromSearch({ field: 'year_from', search }) as string) || undefined;
  const countryId =  (getFieldFromSearch({ field: 'country_id', search }) as string) || undefined;
  const languageId =  (getFieldFromSearch({ field: 'language_id', search }) as string) || undefined;
  return { status, yearTo, yearFrom, countryId, languageId };
};


const getOptionById = (options: OptionType[], id?: string ) => {
    const option = options.find((item) => String(item.id) === id);
    return option || {id: -1, name: 'все'}
}

export function Filter({ filters }: { filters: { name: string, title?: string }[] }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { status, yearFrom: yearFromDefault, yearTo: yearToDefault, countryId, languageId } = getFilterParams(search);

  const countries = useSelector(getCountries);
  const languages = useSelector(getLanguages);

  const [yearFrom, setYearFrom] = useState(yearFromDefault);
  const [yearTo, setYearTo] = useState(yearToDefault);
  const [currentStatus, setStatus] = useState(status);
  const [isAnyYear, setAnyYear] = useState(!yearFromDefault && !yearToDefault);
  const [country, setCountry] = useState<OptionType>( getOptionById(countries, countryId) );
  const [language, setLanguage] = useState<OptionType>( getOptionById(languages, languageId) );

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const fields = [
      { name: 'status', value: currentStatus },
      { name: 'year_from', value: yearFrom },
      { name: 'year_to', value: yearTo },
      { name: 'country_id', value:  country.id },
      { name: 'language_id', value:  language.id }
    ].filter((item) => item.name && item.value ) as unknown as QueryField[];

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
      yearTo={yearTo}
      yearFrom={yearFrom}
      setYearFrom={setYearFrom}
      setYearTo={setYearTo}
      setAnyDate={setAnyYear}
    />;

  const countryFilter = <FilterSelect
      options={countries}
      filterName={FilterName.Country}
      filters={filters}
      option={country}
      setOption={setCountry}
    />

  const languageFilter = <FilterSelect
      options={languages}
      filterName={FilterName.Language}
      filters={filters}
      option={language}
      setOption={setLanguage}
    />


  return (
    <FilterForm onSubmit={handleSubmit}>
      {yearFrom}
      {eventStatusFilter}
      {yearFilter}
      {countryFilter}
      {languageFilter}
      <SubmitButton>искать</SubmitButton>
    </FilterForm>
  );
}
