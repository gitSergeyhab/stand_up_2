import { PictureType, ResourceType } from './types';

// export type ComedianTypeSC = {
//   avg_rate: number | null;
//   comedian_city:string | null;
//   comedian_first_name: string;
//   comedian_first_name_en: string | null;
//   comedian_id: string;
//   comedian_last_name: string | null;
//   comedian_last_name_en: string | null;
//   country_id: number | null;
//   country_name: string | null;
//   country_name_en: string | null;
//   comedian_date_added: string | null;
//   number_of_rate: string | null;
//   total_views: string | null;
//   views: string | null;
//   comedian_avatar: string | null;
//   first_title: string | null;
//   second_title: string | null;

// };

// export type ComedianTypeCC = {
//   avgRate: number | null;
//   comedianCity:string | null;
//   comedianFirstName: string;
//   comedianFirstNameEn: string | null;
//   comedianId: string;
//   comedianLastName: string | null;
//   comedianLastNameEn: string | null;
//   countryId: number | null;
//   countryName: string | null;
//   countryNameEn: string | null;
//   comedianDateAdded: string | null;
//   numberOfRate: string | null;
//   totalViews: string | null;
//   views: string | null;
//   comedianAvatar: string | null;
//   firstTitle: string | null;
//   secondTitle: string | null;
// };

export type SubComedianSC = {
  comedian_id: string;
  comedian_avatar: string | null;
  comedian_name: string;
  comedian_name_en: string | null;
  country_id: string | null;
  country_name: string | null;
  comedian_city: string | null;
  avg_rate: number | null;
  number_of_rate: string | null;
};

export type SubComedianCC = {
  comedianId: string;
  comedianAvatar: string | null;
  comedianName: string;
  comedianNameEn: string | null;
  countryId: string | null;
  countryName: string | null;
  comedianCity: string | null;
  avgRate: number | null;
  numberOfRate: string | null;
};

export type OneComedianTypeSC = {
  avg_rate: number | null;
  comedian_avatar: string | null;
  comedian_city: string | null;
  comedian_city_en: string | null;
  comedian_date_added: string | null;
  comedian_date_birth: string | null;
  comedian_date_death: string | null;
  comedian_description: string | null;
  comedian_first_name: string;
  comedian_first_name_en: string | null;
  comedian_id: number;
  comedian_last_name: string | null;
  comedian_last_name_en: string | null;
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  number_of_rate: string | null;
  pictures: PictureType[] | null;
  resources: ResourceType[] | null;
  total_views: string | null;
  user_id: string | null;
  user_nik: string | null;
  views: string | null;
};

export type OneComedianTypeCC = {
  avgRate: number | null;
  comedianAvatar: string | null;
  comedianCity: string | null;
  comedianCityEn: string | null;
  comedianDateAdded: string | null;
  comedianDateBirth: string | null;
  comedianDateDeath: string | null;
  comedianDescription: string | null;
  comedianFirstName: string;
  comedianFirstNameEn: string | null;
  comedianId: number;
  comedianLastName: string | null;
  comedianLastNameEn: string | null;
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  numberOfRate: string | null;
  totalViews: string | null;
  views: string | null;
  pictures: PictureType[] | null;
  resources: ResourceType[] | null;
  userId: string | null;
  userNik: string | null;
};
