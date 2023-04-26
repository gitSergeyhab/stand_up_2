import { ResourceType } from './types';

export const enum EventStatus {
  Planned = 'planned',
  Ended = 'ended',
  Canceled = 'canceled',
}

export type SubEventSC = {
  event_id: string;
  event_name: string;
  event_name_en: string | null;
  event_date: string | null;
  event_promo_picture: string | null;
  event_status: EventStatus;
  comedian_id: string | null;
  place_id: string | null;
  place_name: string | null;
  place_name_en: string | null;
};

export type SubEventCC = {
  eventId: string;
  eventName: string;
  eventNameEn: string | null;
  eventDate: string | null;
  eventPromoPicture: string | null;
  eventStatus: EventStatus;
  comedianId: string | null;
  placeId: string | null;
  placeName: string | null;
  placeNameEn: string | null;
};

export type EventComedian = {
  avg_comedian_rate: number | null;
  comedian_avatar: string | null;
  comedian_first_name: string;
  comedian_first_name_en: string | null;
  comedian_id: number;
  comedian_last_name: string | null;
  comedian_last_name_en: string | null;
};

export type EventShow = {
  avg_show_rate: number | null;
  show_id: number;
  show_name: string;
  show_poster: string | null;
};

// export type EventTypeSC = {
//   country_id: number | null;
//   country_name: string | null;
//   country_name_en: string | null;
//   event_date: string | null;
//   event_date_added: string;
//   event_id: string;
//   event_name: string;
//   event_name_en: string | null;
//   event_picture: string | null;
//   event_status: EventStatus;
//   place_city: string | null;
//   place_city_en: string | null;
//   total_views: string | null;
//   upcoming: number | null; // ?? now - event_date (null -!)
//   views: string | null;
// };

// export type EventTypeCC = {
//   countryId: number | null;
//   countryName: string | null;
//   countryNameEn: string | null;
//   eventDate: string | null;
//   eventDateAdded: string;
//   eventId: string;
//   eventName: string;
//   eventNameEn: string | null;
//   eventPicture: string | null;
//   eventStatus: EventStatus;
//   placeCity: string | null;
//   placeCityEn: string | null;
//   totalViews: string | null;
//   upcoming: number | null; // ?? now - event_date (null -!)
//   views: string | null;
// };

export type OneEventTypeSC = {
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  event_comedians: EventComedian[] | null;
  event_date: string | null;
  event_date_added: string;
  event_description: string | null;
  event_id: string;
  event_name: string;
  event_name_en: string | null;
  event_picture: string | null;
  event_resources: ResourceType[] | null;
  event_shows: EventShow[] | null;
  event_status: EventStatus;
  place_id: string | null;
  place_name: string | null;
  place_name_en: string | null;
  place_picture: string | null;
  total_views: string | null;
  user_avatar: string | null;
  user_id: string | null;
  user_nik: string | null;
  views: string | null;
};

export type OneEventTypeCC = {
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  eventComedians: EventComedian[] | null;
  eventDate: string | null;
  eventDateAdded: string;
  eventDescription: string | null;
  eventId: string;
  eventName: string;
  eventNameEn: string | null;
  eventPicture: string | null;
  eventResources: ResourceType[] | null;
  eventShows: EventShow[] | null;
  eventStatus: EventStatus;
  placeId: string | null;
  placeName: string | null;
  placeNameEn: string | null;
  placePicture: string | null;
  totalViews: string | null;
  userAvatar: string | null;
  userId: string | null;
  userNik: string | null;
  views: string | null;
};

// export type EventsOfComedianSC = {
//   event_id: string;
//   event_name: string;
//   event_name_en: string | null;
//   event_date: string | null;
//   event_status: EventStatus;
//   event_promo_picture: string | null;
//   place_id: string | null;
//   place_name: string | null;
//   place_name_en: string | null;
//   comedian_first_name: string | null;
//   comedian_first_name_en: string | null;
//   comedian_last_name: string | null;
//   comedian_last_name_en: string | null;
//   show_name: string | null;
// }

// export type EventsOfComedianCC = {
//   dataType: DataType;
//   eventId: string;
//   eventName: string;

//   eventNameEn: string | null;
//   eventDate: string | null;
//   eventStatus: EventStatus;
//   eventPromoPicture: string | null;
//   placeId: string | null;
//   placeName: string | null;
//   placeNameEn: string | null;
//   comedianFirstName: string | null;
//   comedianFirstNameEn: string | null;
//   comedianLastName: string | null;
//   comedianLastNameEn: string | null;
//   showName: string | null;
// }
