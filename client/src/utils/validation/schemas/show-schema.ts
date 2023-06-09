import Joi from "joi";

export const JoiMessageKey = {
  StringMin: `string.min`,
  StringMax: `string.max`,
  StringEmpty: `string.empty`,
  Required: `any.required`,
  AnyOnly: `any.only`,
  NumberMin: `number.min`,
  NumberBase: `number.base`,
  Regexp: `string.pattern.base`,
  Email: `string.email`
};

const schemaField = {
    userId: 'user_id',
    countryId: 'country_id',
    userAvatarId: 'user_avatar_id',
    userEmail: 'user_email',
    userPassword: 'user_password',
    userNik: 'user_nik',
    userFirstName: 'user_first_name',
    userLastName: 'user_last_name',
    userCity: 'user_city',
    userDateBirth: 'user_date_birth',
    userDescription: 'user_description',
    userDateRegistration: 'user_date_registration',
    userActivated: 'user_activated',
    userActivationLink: 'user_activation_link',
    comedianId: 'comedian_id',
    userAddedId: 'user_added_id',
    comedianMainPictureId: 'comedian_main_picture_id',
    comedianNik: 'comedian_nik',
    comedianNikEn: 'comedian_nik_en',
    comedianFirstName: 'comedian_first_name',
    comedianSecondName: 'comedian_second_name',
    comedianLastName: 'comedian_last_name',
    comedianFirstNameEn: 'comedian_first_name_en',
    comedianSecondNameEn: 'comedian_second_name_en',
    comedianLastNameEn: 'comedian_last_name_en',
    comedianCity: 'comedian_city',
    comedianCityEn: 'comedian_city_en',
    comedianDateBirth: 'comedian_date_birth',
    comedianDateDeath: 'comedian_date_death',
    comedianDescription: 'comedian_description',
    comedianDateAdded: 'comedian_date_added',
    placeId: 'place_id',
    placeMainPictureId: 'place_main_picture_id',
    placeName: 'place_name',
    placeNameEn: 'place_name_en',
    placeCity: 'place_city',
    placeCityEn: 'place_city_en',
    placeDateFounded: 'place_date_founded',
    placeDescription: 'place_description',
    placeDateAdded: 'place_date_added',
    placeActive: 'place_active',
    eventId: 'event_id',
    eventMainPictureId: 'event_main_picture_id',
    eventName: 'event_name',
    eventNameEn: 'event_name_en',
    eventDescription: 'event_description',
    eventDate: 'event_date',
    eventDateAdded: 'event_date_added',
    eventStatus: 'event_status',
    showId: 'show_id',
    languageId: 'language_id',
    showMainPictureId: 'show_main_picture_id',
    showDate: 'show_date',
    showName: 'show_name',
    showDescription: 'show_description',
    showDateAdded: 'show_date_added',
}

export const showSchema = Joi.object({
  [schemaField.showName]: Joi.string().max(64).min(3)
    .required()
    .messages({
      [JoiMessageKey.StringMin]: 'минимум 3 символа',
      [JoiMessageKey.StringMax]: 'максимум 64 символа',
    }),
  password: Joi.string().min(4).max(8).required(),
});
