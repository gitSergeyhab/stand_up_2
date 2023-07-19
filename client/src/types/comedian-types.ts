import { CommonListDataType, CommonListDataWithTitlesType } from './common-types';
import { ImageCC, ImageSC } from './pic-types';
import { ResourceType } from './types';

export type OneComedianTypeSC = {
  avg_rate?: number;
  main_picture?: string;
  comedian_city?: string;
  comedian_city_en?: string;
  comedian_date_added?: string;
  comedian_date_birth?: string;
  comedian_date_death?: string;
  comedian_description?: string;
  comedian_first_name?: string;
  comedian_first_name_en?: string;
  comedian_second_name?: string;
  comedian_second_name_en?: string;
  comedian_id: number;
  comedian_nik: string;
  comedian_nik_en?: string;
  comedian_last_name?: string;
  comedian_last_name_en?: string;
  country_id?: number;
  country_name?: string;
  country_name_en?: string;
  number_of_rate?: string;
  pictures?: ImageSC[];
  resources?: ResourceType[];
  total_views: string;
  weekly_views: string;
  user_id?: string;
  user_nik?: string;
  views?: string;
};

export type OneComedianTypeCC = {
  avgRate?: number;
  mainPicture?: string;
  comedianCity?: string;
  comedianCityEn?: string;
  comedianDateAdded?: string;
  comedianDateBirth?: string;
  comedianDateDeath?: string;
  comedianDescription?: string;
  comedianFirstName?: string;
  comedianFirstNameEn?: string;
  comedianId: number;
  comedianNik: string;
  comedianNikEn?: string;
  comedianLastName?: string;
  comedianLastNameEn?: string;
  comedianSecondName?: string;
  comedianSecondNameEn?: string;
  countryId?: number;
  countryName?: string;
  countryNameEn?: string;
  numberOfRate?: string;
  totalViews: string;
  weeklyViews: string;
  views?: string;
  pictures?: ImageCC[];
  resources?: ResourceType[];
  userId?: string;
  userNik?: string;
};



export type ComedianCardSC = {
  comedian_id: string;
  main_picture?: string;
  comedian_nik: string;
  country_id?: string;
  country_name?: string;
  comedian_city?: string;
  weekly_views: string;
  total_views: string;
};

export type ComedianCardCC = {
  comedianId: string;
  comedianNik: string;
  mainPicture?: string;
  countryId?: string;
  countryName?: string;
  comedianCity?: string;
  weeklyViews: string;
  totalViews: string;

};



export type ComedianCardDataSC = CommonListDataType<ComedianCardSC>
export type ComedianCardDataWithTitlesSC = CommonListDataWithTitlesType<ComedianCardSC>

export type ComedianState = {
  comedianId: string,
  comedianDateBirth?: string,
  comedianDateDeath?: string,
  comedianDescription?: string,
  comedianSecondName?: string,
  comedianSecondNameEn?: string,
  comedianFirstName?: string,
  comedianLastName?: string,
  comedianLastNameEn?: string,
  comedianFirstNameEn?: string,
  comedianNik: string,
  comedianNikEn?: string,
  countryId?: number,
  countryName?: string,
  comedianCity?: string,
  comedianCityEn?: string,
  mainPicture?:string
}
