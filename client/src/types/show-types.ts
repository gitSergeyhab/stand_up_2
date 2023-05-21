import { ImageCC } from "../store/images-api";

export type VideoType = {
  id: number | string;
  minutes?: number;
  path?: string;
  pro: boolean;
  userId: string | number | null;
  userNik?: string;
};



export type OneShowTypeSC = {
  avg_rate?: number;
  comedian_avatar?: string;
  comedian_first_name?: string;
  comedian_first_name_en?: string;
  comedian_id?: string;
  comedian_last_name?: string;
  comedian_last_name_en?: string;
  country_id?: number;
  country_name?: string;
  country_name_en?: string;
  pictures?: ImageCC[];
  language_id?: number;
  language_name?: string;
  language_name_en?: string;
  number_of_rate?: number;
  place_id?: string;
  place_name?: string;
  place_name_en?: string;
  show_date?: string;
  show_date_added: string;
  show_description?: string;
  show_id: string;
  show_name: string;
  show_poster?: string;
  total_views?: string;
  user_show_added_id?: string;
  user_show_added_nik?: string;
  videos?: VideoType[];
  views?: string;
};

export type OneShowTypeCC = {
  avgRate?: number;
  comedianAvatar?: string;
  comedianFirstName?: string;
  comedianFirstNameEn?: string;
  comedianId?: string;
  comedianLastName?: string;
  comedianLastNameEn?: string;
  countryId?: number;
  countryName?: string;
  countryNameEn?: string;
  pictures?: ImageCC[];
  languageId?: number;
  languageName?: string;
  languageNameEn?: string;
  numberOfRate?: number;
  placeId?: string;
  placeName?: string;
  placeNameEn?: string;
  showDate?: string;
  showDateAdded: string;
  showDescription?: string;
  showId: string;
  showName: string;
  showPoster?: string;
  totalViews?: string;
  userShowAddedId?: string;
  userDhowAddedNik?: string;
  videos?: VideoType[];
  views?: string;
};



export type SubShowSC = {
  show_id: string;
  show_name: string;
  show_date_added?: string;
  main_picture?: string;
  comedian_nik: string;
  comedian_id: string;
  avg_rate?: number;
  number_of_rate?: string;
};

export type SubShowCC = {
  showId: string;
  showName: string;
  showDateAdded?: string;
  mainPicture?: string;
  comedianNik: string;
  comedianId: string;
  avgRate?: number;
  numberOfRate?: string;
};



export type ShowsOfComedianCardSC = {
  show_id: string,
  show_name: string,
  main_picture?: string,
  comedian_id: string,
  comedian_nik: string,
  views_count: string,
  rate_count: string,
  avg_show_rate: number,
  show_date?: string,
}

export type ShowsOfComedianCardCC = {
  showId: string,
  showName: string,
  mainPicture?: string,
  comedianId: string,
  comedianNik: string,
  viewsCount: string,
  rateCount: string,
  avgShowRate: number,
  showDate?: string
}

export type ShowsOfComedianDataSC = {
  data: ShowsOfComedianCardSC[],
  titles: {
    comedian_nik: string,
    comedian_nik_en: string|null,
  },
  count: string
}

export type ShowsOfComedianDataCC = {
  data: ShowsOfComedianCardCC[],
  titles: {
    comedianNik: string,
    comedianNikEn: string|null,
  },
  count: number
}
