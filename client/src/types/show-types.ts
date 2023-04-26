import { PictureType } from './types';

export type VideoType = {
  id: number | string;
  minutes: number | null;
  path: string | null;
  pro: boolean;
  userId: string | number | null;
  userNik: string | null;
};

// export type ShowTypeSC = {
//   avg_rate: number | null;
//   comedian_first_name: string | null;
//   comedian_first_name_en: string | null;
//   comedian_id: string;
//   comedian_last_name: string | null;
//   comedian_last_name_en: string | null;
//   country_id: number | null;
//   country_name: string | null;
//   country_name_en: string | null;
//   date_added: string | null;
//   language_id: number | null;
//   language_name: string | null;
//   language_name_en: string | null;
//   number_of_rate: string | null;
//   place_id: string | null;
//   place_name: string | null;
//   place_name_en: string | null;
//   show_date: string | null;
//   show_id: string;
//   show_name: string;
//   show_poster: string | null;
//   total_views: string | null;
//   views: string | null;
// };

// export type ShowTypeCC = {
//   avgRate: number | null;
//   comedianFirstName: string | null;
//   comedianFirstNameEn: string | null;
//   comedianId: string;
//   comedianLastName: string | null;
//   comedianLastNameEn: string | null;
//   countryId: number | null;
//   countryName: string | null;
//   countryNameEn: string | null;
//   dateAdded: string | null;
//   languageId: number | null;
//   languageName: string | null;
//   languageNameEn: string | null;
//   numberOfRate: string | null;
//   placeId: string | null;
//   placeName: string | null;
//   placeNameEn: string | null;
//   showDate: string | null;
//   showId: string;
//   showName: string;
//   showPoster: string | null;
//   totalViews: string | null;
//   views: string | null;
// };

export type OneShowTypeSC = {
  avg_rate: number | null;
  comedian_avatar: string | null;
  comedian_first_name: string | null;
  comedian_first_name_en: string | null;
  comedian_id: string | null;
  comedian_last_name: string | null;
  comedian_last_name_en: string | null;
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  pictures: PictureType[] | null;
  language_id: number | null;
  language_name: string | null;
  language_name_en: string | null;
  number_of_rate: number | null;
  place_id: string | null;
  place_name: string | null;
  place_name_en: string | null;
  show_date: string | null;
  show_date_added: string;
  show_description: string | null;
  show_id: string;
  show_name: string;
  show_poster: string | null;
  total_views: string | null;
  user_show_added_id: string | null;
  user_show_added_nik: string | null;
  videos: VideoType[] | null;
  views: string | null;
};

export type OneShowTypeCC = {
  avgRate: number | null;
  comedianAvatar: string | null;
  comedianFirstName: string | null;
  comedianFirstNameEn: string | null;
  comedianId: string | null;
  comedianLastName: string | null;
  comedianLastNameEn: string | null;
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  pictures: PictureType[] | null;
  languageId: number | null;
  languageName: string | null;
  languageNameEn: string | null;
  numberOfRate: number | null;
  placeId: string | null;
  placeName: string | null;
  placeNameEn: string | null;
  showDate: string | null;
  showDateAdded: string;
  showDescription: string | null;
  showId: string;
  showName: string;
  showPoster: string | null;
  totalViews: string | null;
  userShowAddedId: string | null;
  userDhowAddedNik: string | null;
  videos: VideoType[] | null;
  views: string | null;
};

// export type ShowsOfComedianSC = {
//   show_id: string;
//   show_name: string;
//   show_date_added: string;
//   show_poster: string | null;

//   comedian_id: string;
//   comedian_first_name: string | null;
//   comedian_first_name_en: string | null;
//   comedian_last_name: string | null;
//   comedian_last_name_en: string | null;

//   place_name: string | null;
//   place_name_en: string | null;
//   event_name: string | null;
//   event_name_en: string | null;
// }

// export type ShowsOfComedianCC = {
//   dataType: DataType;

//   showId: string;
//   showName: string;
//   showDateAdded: string;
//   showPoster: string | null;

//   comedianId: string;
//   comedianFirstName: string | null;
//   comedianFirstNameEn: string | null;
//   comedianLastName: string | null;
//   comedianLastNameEn: string | null;

//   placeName: string | null;
//   placeNameEn: string | null;
//   eventName: string | null;
//   eventNameEn: string | null;
// }

export type SubShowSC = {
  show_id: string;
  show_name: string;
  show_date_added: string | null;
  show_poster: string | null;

  comedian_id: string;
  comedian_name: string;
  comedian_name_en: string | null;
  avg_rate: number | null;
  number_of_rate: string | null;
};

export type SubShowCC = {
  showId: string;
  showName: string;
  showDateAdded: string | null;
  showPoster: string | null;

  comedianId: string;
  comedianName: string;
  comedianNameEn: string | null;
  avgRate: number | null;
  numberOfRate: string | null;
};
