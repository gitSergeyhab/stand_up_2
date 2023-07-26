import { FormPattern, FormPatternMessage } from '../../const/form-pattern';
// import { FormDataItemCC } from '../../types/preload-type';
import { OptionType, SimpleDictEmpty } from '../../types/types';
import { validateDate } from '../date-utils';
import { getFieldErrorMessage } from '../error-utils';
import { checkListInputValue } from './form-validators';


export type GetErrorMessagesArgs = {
  formData: FormData,
  places: OptionType[],
};


export const getEventErrorMessages = ({formData, places}: GetErrorMessagesArgs) => {
  const errorMessages = [];
  let errorIDs = {};

  const {event_name, event_name_en, place_id, status, event_date, no_name} = Object.fromEntries(formData) as SimpleDictEmpty

  if (!FormPattern.Name3to512.test(event_name || '')) {
    errorMessages.push(getFieldErrorMessage('название события', FormPatternMessage.Name3to512));
    errorIDs = {...errorIDs, event_name}
  }
  if (event_name_en && !FormPattern.NameEn3to512.test(event_name_en)) {
    errorMessages.push(getFieldErrorMessage('event name', FormPatternMessage.NameEn3to512));
    errorIDs = {...errorIDs, event_name_en}
  }
  if (event_date && !validateDate({date: event_date})) {
    errorMessages.push(getFieldErrorMessage('Дата события', FormPatternMessage.Date));
    errorIDs = {...errorIDs, event_date}
  }

  if (status && !FormPattern.Status.test(status)) {
    errorMessages.push(getFieldErrorMessage('статус', FormPatternMessage.List));
    errorIDs = {...errorIDs, status}

  }

  if (place_id && !checkListInputValue(places, place_id)) {
    errorMessages.push(getFieldErrorMessage('площадка', FormPatternMessage.List));
    errorIDs = {...errorIDs, place_id}

  }
  if (no_name) {
    errorMessages.push(FormPatternMessage.NoName);
  }

  const errorIndexes = Object.keys(errorIDs);

  return {errorMessages, errorIndexes};
};
