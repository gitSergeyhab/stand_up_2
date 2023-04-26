import { PictureType, ResourceType } from './types';

export type PlaceTypeSC = {
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  place_city: string | null;
  place_city_en: string | null;
  place_id: string | null;
  place_name: string;
  place_name_en: string | null;
  place_promo_picture: string | null;
  total_views: string | null;
  views: string | null;
};

export type PlaceTypeCC = {
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  placeCity: string | null;
  placeCityEn: string | null;
  placeId: string | null;
  placeName: string;
  placeNameEn: string | null;
  placePromoPicture: string | null;
  totalViews: string | null;
  views: string | null;
};

export type OnePlaceTypeSC = {
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  date_place_added: string | null;
  pictures: PictureType[] | null;
  place_city: string | null;
  place_city_en: string | null;
  place_date_founded: string | null;
  place_description: string | null;
  place_id: string;
  place_name: string;
  place_name_en: string | null;
  place_promo_picture: string | null;
  resources: ResourceType | null;
  total_views: string | null;
  user_id: string | null;
  user_nik: string | null;
  views: string | null;
};

export type OnePlaceTypeCC = {
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  datePlaceAdded: string | null;
  pictures: PictureType[] | null;
  placeCity: string | null;
  placeCityEn: string | null;
  placeDateFounded: string | null;
  placeDescription: string | null;
  placeId: string;
  placeName: string;
  placeNameEn: string | null;
  placePromoPicture: string | null;
  resources: ResourceType | null;
  totalViews: string | null;
  userId: string | null;
  userNik: string | null;
  views: string | null;
};
