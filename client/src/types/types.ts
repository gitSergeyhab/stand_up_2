import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ContentName } from '../const/const';
import { RatingCC } from './user-types';
import { EventCardSC } from './event-types';
import { ShowCardSC } from './show-types';
import { ComedianCardSC } from './comedian-types';
import { PlaceCardSC } from './place-types';

export type ResourceType = {
  id: number;
  type: string;
  href: string;
};


export type GridCardType = {
  picture?: string,
  id: string,
  extId?: string|number,
  name: string,
  extName?: string,
  type: ContentName,
  extType?: ContentName,
  avgRate?: number,
  userRate?: RatingCC,
  rateCount?: string|number,
  weeklyViews?: string,
  totalViews?: string,
  date?: string,
  status?: string,
}

export type SimpleDict = { [key: string]: string };
export type SimpleDictEmpty = {[key:string]:string|undefined}

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


export type OptionType = {
  id: string|number, name: string
}

export type FieldValueType = string | undefined;

export type ErrorDataFieldType = {
  errorMessages: string[],
  errorIndexes: string[]
}

export type MainContentSC = {
  shows: ShowCardSC[];
  comedians: ComedianCardSC[];
  eventsByDate: EventCardSC[];
  eventsByViews: EventCardSC[];
  places: PlaceCardSC[];
}

export type MainContentCC = {
  shows: GridCardType[];
  comedians: GridCardType[];
  eventsByDate: GridCardType[];
  eventsByViews: GridCardType[];
  places: GridCardType[];
}

export type FileData = {
  file: File,
  type: string,
  size: number,
  name: string
}

export type CommentType = 're-comment' | 'correct' | undefined;
