import { FormPattern, FormPatternMessage } from '../../const/form-pattern';
import { SimpleDictEmpty } from '../../types/types';
import { getFieldErrorMessage } from '../error-utils';


export const getNewsErrorMessages = ({formData}: {formData: FormData}) => {
  const errorMessages = [];
  let errorIDs = {};

  const {
    news_title, news_text
    // place_active,
  } = Object.fromEntries(formData) as SimpleDictEmpty

  if (!FormPattern.Name1to256.test(news_title || '')) {
    errorMessages.push(getFieldErrorMessage('заголовок', FormPatternMessage.Name3to256));
    errorIDs = {...errorIDs, news_title}

  }
  if (!news_text || !FormPattern.LinkedText.test(news_text)) {
    errorMessages.push(getFieldErrorMessage('текст новости', FormPatternMessage.LinkedText));
    errorIDs = {...errorIDs, news_text}
  }


  const errorIndexes = Object.keys(errorIDs);

  return {errorMessages, errorIndexes};
};
