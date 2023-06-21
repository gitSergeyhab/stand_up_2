import { FormPattern, FormPatternMessage } from '../../const/form-pattern';
import { FormDataItemCC } from '../../store/form-data-api';
import { SimpleDictEmpty } from '../../types/types';
import { validateDate } from '../date-utils';
import { getFieldErrorMessage } from '../error-utils';
import { checkListInputValue } from './form-validators';


export type GetErrorMessagesArgs = {
  formData: FormData,
  events: FormDataItemCC[],
  comedians: FormDataItemCC[],
  places: FormDataItemCC[],
  languages: FormDataItemCC[]
};

export const getShowErrorMessages = ({
  formData,
  comedians, events, languages, places
}: GetErrorMessagesArgs) => {
  const errorMessages = [];
  let errorIDs = {};

  const {show_name, show_name_en, event_id, comedian_id, place_id, language_id, show_date, no_name} = Object.fromEntries(formData) as SimpleDictEmpty

  if (!FormPattern.Name3to256.test(show_name || '')) {
    errorMessages.push(getFieldErrorMessage('название события', FormPatternMessage.Name3to256));
    errorIDs = {...errorIDs, show_name}
  }
  // !!! NEW DB
  if (show_name_en && !FormPattern.NameEn3to256.test(show_name_en)) {
    errorMessages.push(getFieldErrorMessage('show name', FormPatternMessage.NameEn3to256));
    errorIDs = {...errorIDs, show_name_en}
  }


  if (show_date && !validateDate({date: show_date})) {
    errorMessages.push(getFieldErrorMessage('дата шоу', FormPatternMessage.Date));
  }

  if (!checkListInputValue(comedians, comedian_id)) {
    errorMessages.push(getFieldErrorMessage('комик', FormPatternMessage.List));
  }

  if (event_id && !checkListInputValue(events, event_id)) {
    errorMessages.push(getFieldErrorMessage('событие', FormPatternMessage.List));
  }

  if (place_id && !checkListInputValue(places, place_id)) {
    errorMessages.push(getFieldErrorMessage('площадка', FormPatternMessage.List));
  }

  if (language_id && !checkListInputValue(languages, language_id)) {
    errorMessages.push(getFieldErrorMessage('язык', FormPatternMessage.List));
  }

  if (no_name) {
    errorMessages.push(FormPatternMessage.NoName);
  }

  const errorIndexes = Object.keys(errorIDs);

  return {errorMessages, errorIndexes};
};
