import { Role } from '../store/actions';
import { ResourceType } from './types';

export type ReviewType = {
  comedianFirstName: string | null;
  comedianFirstNameEn: string | null;
  comedianLastName: string | null;
  comedianLastNameEn: string | null;
  reviewDate: string;
  reviewId: string | number;
  showId: string | number;
  showName: string;
  text: string;
  title: string;
};

export type ShowRatingType = {
  comedianFirstName: string;
  comedianFirstNameEn: string | null;
  comedianLastName: string | null;
  comedianLastNameEn: string | null;
  dateRate: string;
  showId: string;
  showName: string;
  showRate: number;
};

export type ComedianRatingType = {
  comedianFirstName: string;
  comedianFirstNameEn: string | null;
  comedianId: string | number;
  comedianLastName: string | null;
  comedianLastNameEn: string | null;
  comedianRate: number;
  dateRate: string;
};
// date-id -> data-id
export type ViewType = {
  dataId: string | number;
  id: string | number;
  picture: string | null;
  type: string | null;
  viewDate: string;
};

export type OneUserTypeSC = {
  avg_rate: number | null;
  comedian_ratings: ComedianRatingType[] | null;
  country_id: number | null;
  country_name: string | null;
  country_name_en: string | null;
  latest_views: ViewType[] | null;
  picture_path: string | null;
  resources: ResourceType[] | null;
  reviews: ReviewType[] | null;
  show_ratings: ShowRatingType[] | null;
  user_avatar: string | null;
  user_city: string | null;
  user_date_birth: string | null;
  user_date_registration: string;
  user_description: string | null;
  user_email: string;
  user_first_name: string | null;
  user_id: string;
  user_last_name: string | null;
  user_nik: string;
  // user_password: string;
};

export type OneUserTypeCC = {
  avgRate: number | null;
  comedianRatings: ComedianRatingType[] | null;
  countryId: number | null;
  countryName: string | null;
  countryNameEn: string | null;
  latestViews: ViewType[] | null;
  picturePath: string | null;
  resources: ResourceType[] | null;
  reviews: ReviewType[] | null;
  showRatings: ShowRatingType[] | null;
  userAvatar: string | null;
  userCity: string | null;
  userDateBirth: string | null;
  userDateRegistration: string;
  userDescription: string | null;
  userEmail: string;
  userFirstName: string | null;
  userId: string;
  userLastName: string | null;
  userNik: string;
};

export type UserContentRate = {
  id: string;
  rate: number;
};

export type UserData = {
  showRates: UserContentRate[];
  comedianRates: UserContentRate[];
  reviews: string[];
};

export type AuthUserTypeSC = {
  user_email: string;
  user_avatar: string | null;
  user_id: string;
  user_nik: string;
  user_activated: boolean;
  roles: Role[];
};

export type LoginUserDataSC = {
  user: AuthUserTypeSC;
  accessToken: string;
  refreshToken: string;
};

export type AuthUserTypeCC = {
  email: string;
  nik: string;
  id: string;
  avatar: string | null;
  activated: boolean;
  roles: Role[];
};

export type LoginUserDataCC = {
  user: AuthUserTypeCC;
  accessToken: string;
  refreshToken: string;
};

export type TestUserSC = {
  country_id: number | null;
  country_name: string | null;
  roles: Role[];
  user_activated: boolean;
  user_avatar: string | null;
  user_date_birth: string | null;
  user_email: string;
  user_id: string;
  user_nik: string;
};

export type TestUserCC = {
  countryId: number | null;
  countryName: string | null;
  roles: Role[];
  activated: boolean;
  avatar: string | null;
  dateBirth: string | null;
  email: string;
  id: string;
  nik: string;
};


// export type UserReviewSC = {
//   id: string,
//   show_id: string,
//   show_name: string,
//   review_title: string,
//   review_date_updated: string
// }

// export type ShowRateSC = {
//   id: string,
//   show_id: string,
//   show_name: string,
//   show_rate: number,
//   show_date_rate: string
// }


export type UserReviewSC = {
  shows: string[],
  events: string[],
  places: string[]
}

export type UserInfo = {
  reviews: UserReviewSC,
  rates: {id: string, rate: number}[],
}

export type ReviewSC = {
  review_id: string,
  user_id: string,
  show_id?: string,
  event_id?: string,
  place_id?: string
};

export type RatingSC = {
  show_rating_id : string,
  show_rate : number
};

export type ReviewCC = {
  reviewId: string,
  userId: string,
  showId?: string,
  eventId?: string,
  placeId?: string
};

export type RatingCC = {
  rateId : string,
  rate : number
};
