import { CommonListDataType } from "./common-types";
import { ImageCC, ImageSC } from "./pic-types";
import { GridCardType, ResourceType } from "./types";



export type OnePlaceSC = {
  place_id:            string;
  place_name:          string;
  place_name_en?:      string;
  place_city?:         string;
  place_city_en?:      string;
  place_date_founded?: string;
  place_date_closed?:  string;
  place_date_added:    string;
  place_description?:  string;
  main_picture?:       string;
  user_picture?:       string;
  country_id?:         number;
  country_name?:       string;
  country_name_en?:    string;
  user_id?:            string;
  user_nik?:           string;
  resources?:          ResourceType[];
  pictures?:           ImageSC[];
  weekly_views:        string;
  total_views:         string;
}


export type OnePlaceCC = {
  placeId:            string;
  placeName:          string;
  placeNameEn?:       string;
  placeCity?:         string;
  placeCityEn?:       string;
  placeDateFounded?:  string;
  placeDateClosed?:   string;
  placeDateAdded:     string;
  placeDescription?:  string;
  mainPicture?:       string;
  userPicture?:       string;
  countryId?:         number;
  countryName?:       string;
  countryNameEn?:     string;
  userId?:            string;
  userNik?:           string;
  resources?:         ResourceType[];
  pictures?:          ImageCC[];
  weeklyViews:        string;
  totalViews:         string;
}


export type PlaceCardSC = {
  place_id:            string;
  place_name:          string;
  place_city?:         string;
  place_city_en?:      string;
  place_date_founded?: string;
  place_date_closed?:  string;
  place_date_added:    string;
  place_description?:  string;
  country_id?:         number;
  country_name?:       string;
  main_picture?:       string;
  weekly_views:        string;
  total_views:         string;
}



export type PlaceCardDataSC = CommonListDataType<PlaceCardSC>

export type PlaceCardDataCC = CommonListDataType<GridCardType>

// export type ShowCardDataWithTitlesSC = CommonListDataWithTitlesType<ShowCardSC>

// export type ShowCardDataWithTitlesCC = CommonListDataWithTitlesType<GridCardType>

export type PlaceState = {
  placeName: string,
  placeNameEn?: string,
  countryId?: number,
  countryName?: string,
  placeCity?: string,
  placeCityEn?: string,
  mainPicture?: string,
  placeDescription?: string,
  placeDateClosed?: string,
  placeDateFounded?: string,
  placeId: string
}
