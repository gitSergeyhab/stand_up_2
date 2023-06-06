import { CommonListDataType, CommonListDataWithTitlesType } from "./common-types"
import { GridCardType, ResourceType } from "./types"

export const enum EventStatus {
  Planned = 'planned',
  Ended = 'ended',
  Canceled = 'canceled',
}

export type EventsOfComedianCardSC = {
  event_id: string,
  event_name: string,
  event_name_en?: string,
  main_picture?: string,
  views_count: string,
  event_date?: string,
  status: EventStatus,
  place_id: string,
  place_name: string
}

export type EventsOfComedianCardCC = {
  eventId: string,
  eventName: string,
  eventNameEn?: string,
  mainPicture?: string,
  viewsCount: string,
  eventDate?: string,
  status: EventStatus,
  placeId: string,
  placeName: string,
}

export type EventsOfComedianDataSC = {
  data: EventsOfComedianCardSC[],
  titles: {
    comedian_nik: string,
    comedian_nik_en: string|null,
  },
  count: string
}

export type EventsOfComedianDataCC = {
  data: EventsOfComedianCardCC[],
  titles: {
    comedianNik: string,
    comedianNikEn: string|null,
  },
  count: number
}

export type SubEventSC = {
  event_id: string;
  event_name: string;
  event_name_en?: string;
  event_date?: string;
  event_promo_picture?: string;
  event_status: EventStatus;
  comedian_id?: string;
  place_id?: string;
  place_name?: string;
  place_name_en?: string;
};

export type SubEventCC = {
  eventId: string;
  eventName: string;
  eventNameEn?: string;
  eventDate?: string;
  eventPromoPicture?: string;
  eventStatus: EventStatus;
  comedianId?: string;
  placeId?: string;
  placeName?: string;
  placeNameEn?: string;
};

export type EventComedian = {
  avg_comedian_rate?: number;
  comedian_avatar?: string;
  comedian_first_name: string;
  comedian_first_name_en?: string;
  comedian_id: number;
  comedian_last_name?: string;
  comedian_last_name_en?: string;
};

export type EventShow = {
  avg_show_rate?: number;
  show_id: number;
  show_name: string;
  show_poster?: string;
};



// export type OneEventTypeSC = {
//   country_id?: number;
//   country_name?: string;
//   country_name_en?: string;
//   event_comedians?: EventComedian[];
//   event_date?: string;
//   event_date_added: string;
//   event_description?: string;
//   event_id: string;
//   event_name: string;
//   event_name_en?: string;
//   event_picture?: string;
//   event_resources?: ResourceType[];
//   event_shows?: EventShow[];
//   event_status: EventStatus;
//   place_id?: string;
//   place_name?: string;
//   place_name_en?: string;
//   place_picture?: string;
//   total_views?: string;
//   user_avatar?: string;
//   user_id?: string;
//   user_nik?: string;
//   views?: string;
// };

// export type OneEventTypeCC = {
//   countryId?: number;
//   countryName?: string;
//   countryNameEn?: string;
//   eventComedians?: EventComedian[];
//   eventDate?: string;
//   eventDateAdded: string;
//   eventDescription?: string;
//   eventId: string;
//   eventName: string;
//   eventNameEn?: string;
//   eventPicture?: string;
//   eventResources?: ResourceType[];
//   eventShows?: EventShow[];
//   eventStatus: EventStatus;
//   placeId?: string;
//   placeName?: string;
//   placeNameEn?: string;
//   placePicture?: string;
//   totalViews?: string;
//   userAvatar?: string;
//   userId?: string;
//   userNik?: string;
//   views?: string;
// };

//---------

export type EventCardSC = {
  event_id: string,
  event_name: string,
  event_date?: string,
  event_date_added: string,
  event_status: string,
  main_picture?: string,
  place_id?: string,
  place_name?: string,
  views_count: string,
}

export type OneEventSC = {
  event_id:          string;
  event_name:        string;
  event_name_en?:     null;
  event_description?: string;
  event_date?:        string;
  event_date_added:  string;
  event_status:      string;
  main_picture?:      string;
  place_id?:          string;
  place_name?:        string;
  user_nik?:          string;
  user_id?:           string;
  user_picture?:      string;
  place_picture?:      string;
  event_resources?:   ResourceType[];
  views:             string;
  total_views:       string;
  place_country_id?: string;
  place_country_name?: string;
  place_city?: string;
}

export type OneEventCC = {
  eventId:          string;
  eventName:        string;
  eventNameEn?:     null;
  eventDescription?: string;
  eventDate?:        string;
  eventDateAdded:  string;
  eventStatus:      string;
  mainPicture?:      string;
  placeId?:          string;
  placeName?:        string;
  userNik?:          string;
  userId?:           string;
  userPicture?:      string;
  placePicture?:      string;
  eventResources?:   ResourceType[];
  views:             string;
  totalViews:       string;
  placeCountryId?: string;
  placeCountryName?: string;
  placeCity?: string;
}


export type EventCardServerDataSC = CommonListDataType<EventCardSC>

export type EventCardServerDataCC = CommonListDataType<GridCardType>

export type EventCardServerDataWithTitlesSC = CommonListDataWithTitlesType<EventCardSC>

export type EventCardServerDataWithTitlesCC = CommonListDataWithTitlesType<GridCardType>
