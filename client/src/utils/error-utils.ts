import { Dispatch, SetStateAction } from 'react';
import { ServerError, UserErrorMessage } from '../const/errors';
import { DataErrorType, ErrorDataFieldType } from '../types/types';

export type setDataErrorArgs = {
  setErrors: Dispatch<SetStateAction<ErrorDataFieldType>>
  data: DataErrorType;
};
/**
 * устанавлиывет список ошибок для рендера
 * @param param0 - {setErrors, data}:
 * setErrors - fn useState;
 * data : {data: {errors: string[]}} - список ошибок с сервера;
 */
export const setDataError = ({ setErrors, data }: setDataErrorArgs) => {
  const errors = data.data?.errors;
  if (errors && errors.length) {
    setErrors({errorMessages: errors, errorIndexes:[]});
  } else {
    setErrors({errorMessages: [ServerError.Default], errorIndexes:[]});
  }
};

export type RefType = string | undefined;
export type ErrorMessagesArgs = {
  nik: RefType;
  email: RefType;
  password: RefType;
  passwordRepeat: RefType;
};

export const getErrorMessages = ({
  nik,
  email,
  password,
  passwordRepeat,
}: ErrorMessagesArgs) => {
  const errorMessages = [];

  if ([nik, email, password, passwordRepeat].some((item) => !item)) {
    errorMessages.push(UserErrorMessage.All);
  }

  if (nik && (nik.length > 50 || nik.length < 3)) {
    errorMessages.push(UserErrorMessage.Nik);
  }

  if (password && password.length < 8) {
    errorMessages.push(UserErrorMessage.Password);
  }

  if (password && passwordRepeat && password !== passwordRepeat) {
    errorMessages.push(UserErrorMessage.PasswordRepeat);
  }

  return errorMessages;
};

export const getFieldErrorMessage = (field: string, pattern: string) => `${field}: ${pattern}`;
