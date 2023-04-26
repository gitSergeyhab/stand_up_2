import { createApi/* , fetchBaseQuery */ } from '@reduxjs/toolkit/query/react';
import {
  AuthUserTypeCC,
  AuthUserTypeSC,
  LoginUserDataCC,
  TestUserCC,
  TestUserSC,
} from '../types/user-types';
import {
  adaptAuthUserToClient,
  adaptLoginUserDataToClient,
  adaptTestUserToClient,
} from '../utils/adapters/user-adapters';
import { baseQueryWithReauth } from './auth-api';

// const BASE_URL = 'http://localhost:5000/api/users';

export type LoginSendType = {
  email: string;
  password: string;
};

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: 'include',
//   headers: {'Content-type': 'application/json; charset=UTF-8'}
// });

type RegSendType = LoginSendType & { nik: string; passwordRepeat: string };

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    authUser: build.query<AuthUserTypeCC | null, null>({
      query: () => '/users/auth',
      transformResponse: (data: { user: AuthUserTypeSC | null }) => (
        data.user ? adaptAuthUserToClient(data.user) : null
      ),
    }),

    loginUser: build.mutation<LoginUserDataCC, LoginSendType>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      transformResponse: adaptLoginUserDataToClient,
    }),
    logoutUser: build.mutation<null, null>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    registerUser: build.mutation<RegSendType, RegSendType>({
      query: (body) => ({
        url: '/users/registration',
        method: 'POST',
        body,
      }),
    }),

    getTestUsers: build.query<TestUserCC[], null>({
      query: () => '/users',
      transformResponse: ({ users }: { users: TestUserSC[] }) => users.map(adaptTestUserToClient),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useAuthUserQuery,
  useGetTestUsersQuery,
} = userApi;
