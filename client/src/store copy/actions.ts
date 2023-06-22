import { createAction } from '@reduxjs/toolkit';
import { ContentName } from '../const/const';
import { Titles } from '../types/types';
import { AuthUserTypeCC } from '../types/user-types';

export const enum Role {
  Super = 'SUPER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
  ProUser = 'PRO-USER',
}

export type UsersTypeSC = {
  user_id: string;
  user_nik: string;
  user_email: string;
  user_avatar: string | null;
  user_activated: boolean;
  user_date_birth: string | null;
  country_id: number | null;
  country_name: string | null;
  roles: Role[];
};

export type UsersTypeCC = {
  id: string;
  nik: string;
  email: string;
  avatar: string | null;
  activated: boolean;
  dateBirth: string | null;
  countryId: number | null;
  countryName: string | null;
  roles: Role[];
};

export const adaptUsersToClient = (data: UsersTypeSC): UsersTypeCC => ({
  id: data.user_id,
  nik: data.user_nik,
  email: data.user_email,
  avatar: data.user_avatar,
  activated: data.user_activated,
  dateBirth: data.user_date_birth,
  countryId: data.country_id,
  countryName: data.country_name,
  roles: data.roles,
});

export const enum Action {
  SetType = 'main/SetType',
  SetTitles = 'main/SetTitles',

  SetUser = 'main/SetUser',

  SetUsers = 'users/SetUsers',
}

export const setType = createAction(
  Action.SetType,
  (type: null | ContentName) => ({ payload: type }),
);
export const setTitles = createAction(Action.SetTitles, (type: Titles) => ({
  payload: type,
}));

export const setUser = createAction(
  Action.SetUser,
  (user: AuthUserTypeCC | null) => ({ payload: user }),
);
export const setUsers = createAction(
  Action.SetUsers,
  (users: UsersTypeCC[]) => ({ payload: users }),
);
