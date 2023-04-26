import {
  OnePlaceTypeCC,
  OnePlaceTypeSC,
  PlaceTypeCC,
  PlaceTypeSC,
} from '../../types/place-types';

export const adaptEventsToClient = (data: PlaceTypeSC): PlaceTypeCC => ({
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  placeCity: data.place_city,
  placeCityEn: data.place_city_en,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  placePromoPicture: data.place_promo_picture,
  totalViews: data.total_views,
  views: data.views,
});

export const adaptOneEventToClient = (
  data: OnePlaceTypeSC,
): OnePlaceTypeCC => ({
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  datePlaceAdded: data.date_place_added,
  pictures: data.pictures,
  placeCity: data.place_city,
  placeCityEn: data.place_city_en,
  placeDateFounded: data.place_date_founded,
  placeDescription: data.place_description,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  placePromoPicture: data.place_promo_picture,
  resources: data.resources,
  totalViews: data.total_views,
  userId: data.user_id,
  userNik: data.user_nik,
  views: data.views,
});
