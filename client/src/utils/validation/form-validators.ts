import { FormDataItemCC } from "../../store/form-data-api";
import { SimpleDictEmpty } from "../../types/types";
import { getNextWeekDatePickerFormat } from "../date-utils"




export const dateValidator = (date: string) => {
  if (date === getNextWeekDatePickerFormat()) {
    return false;
  }
  return true
}


/**
 * проверяет является ли выбранное значение одним из списка с сервера
 * @param values список значений с сервера
 * @param value значение из инпута
 * @returns
 */
export const checkListInputValue = (values: FormDataItemCC[], value?: string) =>
 !value || values.map((item) => String(item.id)).includes(value);

export const getIdFieldError = (idDict: SimpleDictEmpty, message: string) =>
  `${Object.keys(idDict)[0]  }: ${ message }`;
