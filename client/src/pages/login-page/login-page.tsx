import { FormEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Header,
  RegButton,
  RegForm,
  RegInput,
} from '../registration-page/registration-page-style';
import { UserErrorMessage } from '../../const/errors';
import { UserErrorsBlock } from '../../components/user-errors-block/user-errors-block';

import { LogRegMessage } from '../../components/common/common';
import { useLoginUserMutation } from '../../store/user-api';
import { storageUtils } from '../../utils/storage-utils';
import { setUser } from '../../store/actions';
import { setAuthError } from '../../utils/error-utils';
import { DataErrorType } from '../../types/types';

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string[]>([]);
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
      setErrors([UserErrorMessage.Password]);
      setAble();
    } else if (email) {
      login({ password, email })
        .unwrap()
        .then((res) => {
          dispatch(setUser(res.user));
          storageUtils.setData(res);
          navigate('/');
        })
        .catch((data: DataErrorType) => setAuthError({ setErrors, data }))
        .finally(setAble);
    }
  };

  const errorBlock = <UserErrorsBlock errors={errors} />;

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

// import { FormEventHandler, useRef, useState } from 'react';
// import { Header, RegButton, RegForm, RegInput }
// from '../registration-page/registration-page-style';
// import { UserErrorMessage } from '../../const/errors';
// import { UserErrorsBlock } from '../../components/user-errors-block/user-errors-block';

// import { loginAction } from '../../store/api-actions';
// import { useAppDispatch } from '../../hooks/use-app-dispatch';
// import { LogRegMessage } from '../../components/common/common';
// import { useNavigate } from 'react-router-dom';

// export const LoginPage = () => {

//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const [errors, setErrors] = useState<string[]>([]);
//   const [disable, setDisable] = useState(false);

//   const setAble = () => setDisable(false);

//   const navigate = useNavigate();

//   const dispatch = useAppDispatch();

//   const handleLoginSubmit: FormEventHandler = ( evt ) => {
//     evt.preventDefault();

//     setDisable(true);

//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!password || password.length < 8) {
//       setErrors([UserErrorMessage.Password]);
//       setAble();
//     } else if (email) {
//       dispatch(loginAction({password, email}, () => navigate('/'), setAble, setErrors));
//     }

//   };

//   const errorBlock = <UserErrorsBlock errors={errors}/>;

//   return (
//     <>
//       <Header> Вход </Header>
//       <RegForm disabled={disable} onSubmit={handleLoginSubmit}>
//         <RegInput type={'email'} placeholder='your email' ref={emailRef} required/>
//         <RegInput type={'password'} placeholder='your password' ref={passwordRef} required/>
//         {errorBlock}
//         <RegButton disabled={disable}> Войти </RegButton>
//         <LogRegMessage offer='регистрация' question='нет аккаунта?' to='/registration'/>

//       </RegForm>
//     </>
//   );
// };
