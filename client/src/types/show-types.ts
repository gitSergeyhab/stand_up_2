import { CommonListDataType, CommonListDataWithTitlesType } from "./common-types";
import { GridCardType } from "./types";
import { RatingCC, RatingSC } from "./user-types";

export type VideoType = {
  id: number | string;
  minutes?: number;
  path?: string;
  pro: boolean;
  userId: string | number | null;
  userNik?: string;
};

export type OneShowSC = {
  show_id:          string;
  show_name:        string;
  show_name_en?:     string;
  show_date?:        string;
  show_date_added:  string;
  show_description?: string,
  event_id?:         string;
  event_name?:       string;
  event_name_en?:    string;
  comedian_id:      string;
  comedian_nik:     string;
  comedian_nik_en?:  string;
  place_id?:         string;
  place_name?:       string;
  place_name_en?:    string;
  language_id?:      number;
  language_name?:    string;
  language_name_en?: string;
  country_id?:       number;
  country_name?:     string;
  country_name_en?:  string;
  user_id?:          string;
  user_nik?:         string;
  views:            string;
  total_views:      string;
  videos?:           VideoType[];
  show_picture?:     string;
  place_picture?:    string;
  event_picture?:    string;
  comedian_picture?:    string;
  number_of_rate?:   number;
  avg_rate?:         number;
  user_rating?: RatingSC
}

export type OneShowCC = {
  showId:          string;
  showName:        string;
  showNameEn?:     string;
  showDate?:        string;
  showDateAdded:  string;
  showDescription?: string,
  eventId?:         string;
  eventName?:       string;
  eventNameEn?:    string;
  comedianId:      string;
  comedianNik:     string;
  comedianNikEn?:  string;
  placeId?:         string;
  placeName?:       string;
  placeNameEn?:    string;
  languageId?:      number;
  languageName?:    string;
  languageNameEn?: string;
  countryId?:       number;
  countryName?:     string;
  countryNameEn?:  string;
  userId?:          string;
  userNik?:         string;
  views:            string;
  totalViews:      string;
  videos?:           VideoType[];
  showPicture?:     string;
  placePicture?:    string;
  eventPicture?:    string;
  comedianPicture?:    string;
  numberOfRate?:   number;
  avgRate?:         number;
  userRate?: RatingCC
}


// export type OneShowSC = {
//   avg_rate?: number;
//   comedian_avatar?: string;
//   comedian_first_name?: string;
//   comedian_first_name_en?: string;
//   comedian_id?: string;
//   comedian_last_name?: string;
//   comedian_last_name_en?: string;
//   country_id?: number;
//   country_name?: string;
//   country_name_en?: string;
//   pictures?: ImageCC[];
//   language_id?: number;
//   language_name?: string;
//   language_name_en?: string;
//   number_of_rate?: number;
//   place_id?: string;
//   place_name?: string;
//   place_name_en?: string;
//   show_date?: string;
//   show_date_added: string;
//   show_description?: string;
//   show_id: string;
//   show_name: string;
//   show_poster?: string;
//   total_views?: string;
//   user_show_added_id?: string;
//   user_show_added_nik?: string;
//   videos?: VideoType[];
//   views?: string;
// };

// export type OneShowCC = {
//   avgRate?: number;
//   comedianAvatar?: string;
//   comedianFirstName?: string;
//   comedianFirstNameEn?: string;
//   comedianId?: string;
//   comedianLastName?: string;
//   comedianLastNameEn?: string;
//   countryId?: number;
//   countryName?: string;
//   countryNameEn?: string;
//   pictures?: ImageCC[];
//   languageId?: number;
//   languageName?: string;
//   languageNameEn?: string;
//   numberOfRate?: number;
//   placeId?: string;
//   placeName?: string;
//   placeNameEn?: string;
//   showDate?: string;
//   showDateAdded: string;
//   showDescription?: string;
//   showId: string;
//   showName: string;
//   showPoster?: string;
//   totalViews?: string;
//   userShowAddedId?: string;
//   userDhowAddedNik?: string;
//   videos?: VideoType[];
//   views?: string;
// };





export type ShowCardSC = {
  show_id: string,
  show_name: string,
  main_picture?: string,
  comedian_id: string,
  comedian_nik: string,
  views_count: string,
  number_of_rate: string,
  avg_show_rate: number,
  show_date?: string,
  user_rating: RatingSC
}



export type ShowCardDataSC = CommonListDataType<ShowCardSC>

export type ShowCardDataCC = CommonListDataType<GridCardType>

export type ShowCardDataWithTitlesSC = CommonListDataWithTitlesType<ShowCardSC>

export type ShowCardDataWithTitlesCC = CommonListDataWithTitlesType<GridCardType>

export type ShowState = {
  showId: string,
  showName: string,
  showNameEn: string,
  comedianId: string,
  comedianNik: string,
  eventId: string,
  eventName: string,
  placeId: string,
  placeName: string,
  languageId: string,
  languageName: string,
  showDescription: string,
  showDate: string,
  showPicture:string
}
