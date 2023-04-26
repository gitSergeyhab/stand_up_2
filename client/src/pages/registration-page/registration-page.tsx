import { FormEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  RegButton,
  RegForm,
  RegInput,
} from './registration-page-style';
import { useRegisterUserMutation } from '../../store/user-api';
import { UserErrorsBlock } from '../../components/user-errors-block/user-errors-block';
import { DataErrorType } from '../../types/types';
import { getErrorMessages, setAuthError } from '../../utils/error-utils';

export function RegistrationPage() {
  const [registration] = useRegisterUserMutation();

  const nikRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string[]>([]);
  const [disable, setDisable] = useState(false);
  const setAble = () => setDisable(false);

  const navigate = useNavigate();

  const onSuccessReg = () => navigate('/login');

  const handleRegSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    setDisable(true);

    const nik = nikRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordRepeat = passwordRepeatRef.current?.value;

    const errorMessages = getErrorMessages({
      nik,
      email,
      password,
      passwordRepeat,
    });
    if (errorMessages.length) {
      setErrors(errorMessages);
      setAble();
    } else {
      setErrors([]);
      if (email && nik && password && passwordRepeat) {
        registration({ email, nik, password, passwordRepeat })
          .unwrap()
          .then(onSuccessReg)
          .catch((data: DataErrorType) => setAuthError({ setErrors, data }))
          .finally(setAble);
      }
    }
  };

  const errorBlock = <UserErrorsBlock errors={errors} />;

  return (
    <>
      <Header> Регистрация </Header>
      <RegForm disabled={disable} onSubmit={handleRegSubmit}>
        <RegInput type="text" placeholder="your nik" ref={nikRef} required />
        <RegInput
          type="email"
          placeholder="your email"
          ref={emailRef}
          required
        />
        <RegInput
          type="password"
          placeholder="your password"
          ref={passwordRef}
          required
        />
        <RegInput
          type="password"
          placeholder="repeat password"
          ref={passwordRepeatRef}
          required
        />
        {errorBlock}
        <RegButton disabled={disable}> Зарегистрироваться </RegButton>
      </RegForm>
    </>
  );
}
