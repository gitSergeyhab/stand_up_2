import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ContentName } from '../const/const';

export type ResourceType = {
  id: number;
  type: string;
  href: string;
};

export type PictureType = {
  id: string;
  src: string;
};

export type GridCardType = {
  type: ContentName;
  id: string;
  name: string;
  nameEn: string | null;
  picture: string | null;
  extType: ContentName | null;
  extId: string | null;
  extName: string | null;
  extNameEn: string | null;

  date: string | null;
  rate: number | null | undefined;
  numberOfRate: number | null | undefined;
  status: string | null;
};

export type SimpleDict = { [key: string]: string };

export type SearchByIdType = { id: string; search: string };

export const enum DataType {
  EventsOfComedianCC = 'EventsOfComedianCC',
  ShowsOfComedianCC = 'ShowsOfComedianCC',
}

export type Titles = {
  first: string;
  second: string;
};
export type TabsContent = {
  name: string;
  path: string;
};

export type StatRateSC = {
  rate: number;
  rate_count: string;
};

export type DataRateSC = {
  rate_id: string;
  rate: number;

  date: string;
  user_id: string;
  user_nik: string;
  user_avatar: string;
};

export type StatRateCC = {
  rate: number;
  count: string;
};

export type DataRateCC = {
  rateId: string;
  rate: number;
  date: string;
  userId: string;
  userNik: string;
  userAvatar: string;
};

export type GetPageNumArgs = {
  count: number;
  limit: number;
  offset: number;
};

export type QueryField = { name: string; value: string | number };

export type DataErrorType = {
  data: { errors: string[]; message: string };
};

export const enum TokenType {
  Refresh = 'Refresh',
  Access = 'Access',
}

// eslint-disable-next-line
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
