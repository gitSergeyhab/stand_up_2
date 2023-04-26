import { Dispatch, SetStateAction } from 'react';
import { ServerError, UserErrorMessage } from '../const/errors';
import { DataErrorType } from '../types/types';

export type SetAuthErrorArgs = {
  setErrors: Dispatch<SetStateAction<string[]>>;
  data: DataErrorType;
};
/**
 * устанавлиывет список ошибок для рендера
 * @param param0 - {setErrors, data}:
 * setErrors - fn useState;
 * data : {data: {errors: string[]}} - список ошибок с сервера;
 */
export const setAuthError = ({ setErrors, data }: SetAuthErrorArgs) => {
  const errors = data.data?.errors;
  if (errors && errors.length) {
    setErrors(errors);
  } else {
    setErrors([ServerError.Default]);
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
