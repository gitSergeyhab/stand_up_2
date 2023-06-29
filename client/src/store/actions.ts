import { createAction } from '@reduxjs/toolkit';
import { ContentName } from '../const/const';
import { OptionType, Titles } from '../types/types';
import { AuthUserTypeCC } from '../types/user-types';
import { InitialPreloadState } from './preload-reducer/preload-reducer';

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
  // SetUserInfo = 'user/SetUserInfo',
  SetUsers = 'users/SetUsers',

  SetPreloadComedians = 'preload/SetPreloadComedians',
  SetPreloadShows = 'preload/SetPreloadShows',
  SetPreloadEvents = 'preload/SetPreloadEvents',
  SetPreloadPlaces = 'preload/SetPreloadPlaces',
  SetPreloadCountries = 'preload/SetPreloadCountries',
  SetPreloadLanguages = 'preload/SetPreloadLanguages',
  SetPreloadData = 'preload/SetPreloadData',
}

export const setType = createAction(Action.SetType,(type: null | ContentName) => ({ payload: type }),);
export const setTitles = createAction(Action.SetTitles, (type: Titles) => ({payload: type}));
export const setUser = createAction(Action.SetUser,(user: AuthUserTypeCC | null) => ({ payload: user }));
export const setUsers = createAction(Action.SetUsers,(users: UsersTypeCC[]) => ({ payload: users }));

// export const setUserInfo = createAction(Action.SetUserInfo, (info: UserInfo | null) => ({ payload: info }));

export const setPreloadData = createAction(Action.SetPreloadData, (payload: InitialPreloadState) => ({ payload }));
export const setPreloadComedians = createAction(Action.SetPreloadComedians, (payload: OptionType[]) => ({ payload }));

export const setPreloadShows = createAction(Action.SetPreloadShows, (payload: OptionType[]) => ({ payload }))
export const setPreloadPlaces = createAction(Action.SetPreloadPlaces, (payload: OptionType[]) => ({ payload }));
export const setPreloadEvents = createAction(Action.SetPreloadEvents, (payload: OptionType[]) => ({ payload }));
export const setPreloadCountries = createAction(Action.SetPreloadCountries, (payload: OptionType[]) => ({ payload }));
export const setPreloadLanguages = createAction(Action.SetPreloadLanguages, (payload: OptionType[]) => ({ payload }));

