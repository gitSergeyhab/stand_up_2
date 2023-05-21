import { FormPattern, FormPatternMessage } from '../../const/form-pattern';
import { FormDataItemCC } from '../../store/form-data-api';
import { SimpleDictEmpty } from '../../types/types';
import { validateDate } from '../date-utils';
import { getFieldErrorMessage } from '../error-utils';
import { checkListInputValue, getIdFieldError } from './form-validators';


export type GetErrorMessagesArgs = {
  formData: FormData,
  countries: FormDataItemCC[],
};

export const getComedianErrorMessages = ({formData, countries}: GetErrorMessagesArgs) => {
  const errorMessages = [];
  let errorIDs = {};

  const {
    comedian_nik, comedian_nik_en,
    comedian_first_name, comedian_second_name, comedian_last_name,
    comedian_first_name_en, comedian_second_name_en, comedian_last_name_en,
    comedian_city, comedian_city_en, country_id,
    comedian_date_birth, comedian_date_death,
    no_name
  } = Object.fromEntries(formData) as SimpleDictEmpty

  if (!FormPattern.Name3to64.test(comedian_nik || '')) {
    errorMessages.push(getFieldErrorMessage('псевдоним', FormPatternMessage.Name3to64));
    errorIDs = {...errorIDs, comedian_nik}
  }
  if (comedian_first_name && !FormPattern.Name3to64.test(comedian_first_name)) {
    errorMessages.push(getFieldErrorMessage('имя', FormPatternMessage.Name3to64));
    errorIDs = {...errorIDs, comedian_first_name}
  }
  if (comedian_second_name && !FormPattern.Name3to64.test(comedian_second_name)) {
    errorMessages.push(getFieldErrorMessage('отчество', FormPatternMessage.Name3to64));
    errorIDs = {...errorIDs, comedian_second_name}
  }
  if (comedian_last_name && !FormPattern.Name3to64.test(comedian_last_name)) {
    errorMessages.push(getFieldErrorMessage('фамилия', FormPatternMessage.Name3to64));
    errorIDs = {...errorIDs, comedian_last_name}
  }
  if (comedian_city && !FormPattern.Name3to64.test(comedian_city)) {
    errorMessages.push(getFieldErrorMessage('город', FormPatternMessage.Name3to64));
    errorIDs = {...errorIDs, comedian_city}
  }


  if (comedian_nik_en && !FormPattern.NameEn3to64.test(comedian_nik_en)) {
    errorMessages.push(getFieldErrorMessage('nik name', FormPatternMessage.NameEn3to64));
    errorIDs = {...errorIDs, comedian_nik_en}
  }
  if (comedian_first_name_en && !FormPattern.NameEn3to64.test(comedian_first_name_en)) {
    errorMessages.push(getFieldErrorMessage('first name', FormPatternMessage.NameEn3to64));
    errorIDs = {...errorIDs, comedian_first_name_en}
  }
  if (comedian_second_name_en && !FormPattern.NameEn3to64.test(comedian_second_name_en)) {
    errorMessages.push(getFieldErrorMessage('second name', FormPatternMessage.NameEn3to64));
    errorIDs = {...errorIDs, comedian_second_name_en}
  }
  if (comedian_last_name_en && !FormPattern.NameEn3to64.test(comedian_last_name_en)) {
    errorMessages.push(getFieldErrorMessage('last name', FormPatternMessage.NameEn3to64));
    errorIDs = {...errorIDs, comedian_last_name_en}
  }
  if (comedian_city_en && !FormPattern.NameEn3to64.test(comedian_city_en)) {
    errorMessages.push(getFieldErrorMessage('city', FormPatternMessage.NameEn3to64));
    errorIDs = {...errorIDs, comedian_city_en}
  }




  if (comedian_date_birth && !validateDate({date:comedian_date_birth})) {
    errorMessages.push(getFieldErrorMessage('дата рождения', FormPatternMessage.Date));
  }
  if (comedian_date_death && !validateDate({date: comedian_date_death, startDate: comedian_date_birth})) {
    errorMessages.push(getFieldErrorMessage('дата смерти', FormPatternMessage.Date));
  }

  if (country_id && !checkListInputValue(countries, country_id)) {
    errorMessages.push(getIdFieldError({country_id}, FormPatternMessage.List));
  }

  if (no_name) {
    errorMessages.push(FormPatternMessage.NoName);
  }
  const errorIndexes = Object.keys(errorIDs);

  return {errorMessages, errorIndexes};
};
