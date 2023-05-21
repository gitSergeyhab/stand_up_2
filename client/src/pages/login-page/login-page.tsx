import { FormEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header,RegButton,RegForm,RegInput } from '../registration-page/registration-page-style';
import { UserErrorMessage } from '../../const/errors';
import { UserErrorsBlock } from '../../components/user-errors-block/user-errors-block';

import { LogRegMessage } from '../../components/common/common';
import { useLoginUserMutation } from '../../store/user-api';
import { storageUtils } from '../../utils/storage-utils';
import { setUser } from '../../store/actions';
import { DataErrorType, ErrorDataFieldType } from '../../types/types';
import { setDataError } from '../../utils/error-utils';

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});
  const [disable, setDisable] = useState(false);
  const [login] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setAble = () => setDisable(false);

  const handleLoginSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    setDisable(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!password || password.length < 8) {
      setErrors({errorIndexes:[], errorMessages: [UserErrorMessage.Password]} );
      setAble();
    } else if (email) {
      login({ password, email })
        .unwrap()
        .then((res) => {
          dispatch(setUser(res.user));
          storageUtils.setData(res);
          navigate('/');
        })
        .catch((data: DataErrorType) => setDataError({ setErrors, data }))
        .finally(setAble);
    }
  };

  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;

  return (
    <>
      <Header> Вход </Header>
      <RegForm disabled={disable} onSubmit={handleLoginSubmit}>
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
        {errorBlock}
        <RegButton disabled={disable}> Войти </RegButton>
        <LogRegMessage
          offer="регистрация"
          question="нет аккаунта?"
          to="/registration"
        />
      </RegForm>
    </>
  );
}

