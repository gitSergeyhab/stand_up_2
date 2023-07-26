import { FormPattern, FormPatternMessage } from '../../const/form-pattern';
import { OptionType, SimpleDictEmpty } from '../../types/types';
import { validateDate } from '../date-utils';
import { getFieldErrorMessage } from '../error-utils';
import { checkListInputValue } from './form-validators';


export type GetErrorMessagesArgs = {
  formData: FormData,
  // countries: FormDataItemCC[],
  countries: OptionType[],


};

export const getPlaceErrorMessages = ({formData, countries}: GetErrorMessagesArgs) => {
  const errorMessages = [];
  let errorIDs = {};

  const {
    country_id,
    place_name, place_name_en,
    place_city, place_city_en,
    place_date_founded,
    place_date_closed,
    no_name
    // place_active,
  } = Object.fromEntries(formData) as SimpleDictEmpty

  if (!FormPattern.Name1to256.test(place_name || '')) {
    errorMessages.push(getFieldErrorMessage('название площадки', FormPatternMessage.Name3to256));
    errorIDs = {...errorIDs, place_name}

  }
  if (place_city && !FormPattern.Name1to256.test(place_city)) {
    errorMessages.push(getFieldErrorMessage('город', FormPatternMessage.Name1to256));
    errorIDs = {...errorIDs, place_city}
  }
  if (place_name_en && !FormPattern.NameEn1to256.test(place_name_en)) {
    errorMessages.push(getFieldErrorMessage('place name', FormPatternMessage.NameEn3to256));
    errorIDs = {...errorIDs, place_name_en}
  }
  if (place_city_en && !FormPattern.NameEn1to256.test(place_city_en)) {
    errorMessages.push(getFieldErrorMessage('city', FormPatternMessage.NameEn1to256));
    errorIDs = {...errorIDs, place_city_en}
  }


  if (country_id && !checkListInputValue(countries, country_id)) {
    errorMessages.push(getFieldErrorMessage('страна', FormPatternMessage.List));
  }

  if (place_date_founded && !validateDate({date: place_date_founded, startDate: '01.01.0001'})) {
    errorMessages.push(getFieldErrorMessage('дата основания', FormPatternMessage.Date));
  }
  if (place_date_closed && !validateDate({date: place_date_closed, startDate: '01.01.0001'})) {
    errorMessages.push(getFieldErrorMessage('дата закрытия', FormPatternMessage.Date));
  }

  if (no_name) {
    errorMessages.push(FormPatternMessage.NoName);
  }

  const errorIndexes = Object.keys(errorIDs);

  return {errorMessages, errorIndexes};
};
