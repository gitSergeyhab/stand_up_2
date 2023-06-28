import {
  AuthUserTypeCC,
  AuthUserTypeSC,
  LoginUserDataCC,
  LoginUserDataSC,
  OneUserTypeCC,
  OneUserTypeSC,
  RatingCC,
  RatingSC,
  ReviewCC,
  ReviewSC,
  TestUserCC,
  TestUserSC,
} from '../../types/user-types';

export const adaptOneUserToClient = (data: OneUserTypeSC): OneUserTypeCC => ({
  avgRate: data.avg_rate,
  comedianRatings: data.comedian_ratings,
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  latestViews: data.latest_views,
  picturePath: data.picture_path,
  resources: data.resources,
  reviews: data.reviews,
  showRatings: data.show_ratings,
  userAvatar: data.user_avatar,
  userCity: data.user_city,
  userDateBirth: data.user_date_birth,
  userDateRegistration: data.user_date_registration,
  userDescription: data.user_description,
  userEmail: data.user_email,
  userFirstName: data.user_first_name,
  userId: data.user_id,
  userLastName: data.user_last_name,
  userNik: data.user_nik,
});

export const adaptAuthUserToClient = (
  data: AuthUserTypeSC,
): AuthUserTypeCC => ({
  email: data.user_email,
  id: data.user_id,
  nik: data.user_nik,
  avatar: data.user_avatar,
  activated: data.user_activated,
  roles: data.roles,
});

export const adaptLoginUserDataToClient = (
  data: LoginUserDataSC,
): LoginUserDataCC => ({
  accessToken: data.accessToken,
  refreshToken: data.refreshToken,
  user: adaptAuthUserToClient(data.user),
});

export const adaptTestUserToClient = (data: TestUserSC): TestUserCC => ({
  id: data.user_id,
  nik: data.user_nik,
  email: data.user_email,
  avatar: data.user_avatar,
  dateBirth: data.user_date_birth,
  activated: data.user_activated,
  countryId: data.country_id,
  countryName: data.country_name,
  roles: data.roles,
});

export const adaptReviewToClient = (data: ReviewSC): ReviewCC => ({
  reviewId: data.review_id,
  userId: data.user_id,
  eventId: data.event_id,
  placeId: data.place_id,
  showId: data.show_id
});

export const adaptReviewsToClient = (data: ReviewSC[]): ReviewCC[] => data.map(adaptReviewToClient);

export const adaptRatingToClient = (data: RatingSC): RatingCC => ({
  rate: data.show_rate,
  rateId: data.show_rating_id
})

export const adaptRatingsToClient = (data: RatingSC[]): RatingCC[] => data.map(adaptRatingToClient);
