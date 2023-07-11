export const SERVER_URL = 'http://localhost:5000/';

export const IMAGES_PORTION = 10;

export const enum ResourceName {
  Site = 'Site',
  Facebook = 'Facebook',
  YouTube = 'YouTube',
  WhatsApp = 'WhatsApp',
  Instagram = 'Instagram',
  VKontakte = 'VKontakte',
  Telegram = 'Telegram',
}

export const enum ContentName {
  Users = 'users',
  Comedians = 'comedians',
  Events = 'events',
  Shows = 'shows',
  Places = 'places',
  Countries = 'countries',
  Pictures = 'pictures',
}

export const DefaultPath = {
  UserAvatar: './../assets/img/default/default.png',
  ComedianAvatar: './../assets/img/default/comedian.png',
  ShowPoster: './../assets/img/default/show.png',
  EventPicture: './../assets/img/default/default.png',
  PlacePromoPicture: './../assets/img/default/place.png',
  Any: '/assets/img/default/default.png',
};

export const KeyNext = ['ArrowRight', 'Numpad6', 'ArrowDown'];
export const KeyPrev = ['ArrowLeft', 'Numpad4', 'ArrowUp'];
export const KeyEscape = 'Escape';

export const Color = {
  Gold: '#ff9b05',
  GoldD: '#ee7b27',
  BrownMain: '#300606',
};

export const EventStatus = {
  Planned: 'planned',
  Ended: 'ended',
  Canceled: 'canceled',
  All: 'all',
} as const;

export const FilterName = {
  Year: 'year',
  Days: 'days',
  EventStatus: 'status',
  Country: 'country',
  Language: 'language',
  // CountryId: 'country_id',
  ComedianId: 'comedian_id',
  PlaceId: 'place_id',
  LanguageId: 'language_id',
  City: 'city',
  Rate: 'rate',
  Limit: 'limit',
  Offset: 'offset',
  Order: 'order',
  Direction: 'direction',
} as const;

export const enum Language {
  En = 'english',
  Native = 'native',
}

export const DefaultPageParam = {
  Limit: 6,
  Offset: 0,
};

export const tableField = {
  user: {
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
    userActivationLink: 'user_activation_link'
  },
  comedian: {
    comedianId: 'comedian_id',
    countryId: 'country_id',
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
    comedianDateAdded: 'comedian_date_added'
  },
  places: {
    placeId: 'place_id',
    countryId: 'country_id',
    userAddedId: 'user_added_id',
    placeMainPictureId: 'place_main_picture_id',
    placeName: 'place_name',
    placeNameEn: 'place_name_en',
    placeCity: 'place_city',
    placeCityEn: 'place_city_en',
    placeDateFounded: 'place_date_founded',
    placeDateClosed: 'place_date_closed',

    placeDescription: 'place_description',
    placeDateAdded: 'place_date_added',
    placeActive: 'place_active',
  },
  events: {
    eventId: 'event_id',
    placeId: 'place_id',
    userId: 'user_id',
    eventMainPictureId: 'event_main_picture_id',
    eventName: 'event_name',
    eventNameEn: 'event_name_en',
    eventDescription: 'event_description',
    eventDate: 'event_date',
    eventDateAdded: 'event_date_added',
    eventStatus: 'event_status',
  },
  shows: {
    showId: 'show_id',
    eventId: 'event_id',
    userAddedId: 'user_added_id',
    comedianId: 'comedian_id',
    countryId: 'country_id',
    languageId: 'language_id',
    placeId: 'place_id',
    showMainPictureId: 'show_main_picture_id',
    showDate: 'show_date',
    showName: 'show_name',
    showNameEn: 'show_name_en',
    showDescription: 'show_description',
    showDateAdded: 'show_date_added'
  }
}

export const DEFAULT_DATE = '9999/01/01';

export const statusOptions = [
  { id: EventStatus.Canceled, name: 'отменено' },
  { id: EventStatus.Ended, name: 'завершено' },
  { id: EventStatus.Planned, name: 'запланировано' },
];

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
}

export const SortType = {
  Added: 'date_added',
  New: 'new',
  Name: 'name',
  ViewsWeekly: 'weekly_views',
  ViewsTotal: 'total_views',
  Rate: 'rate',
  RateCount: 'rate_count',
}

export const SortTypeName = {
  [SortType.Added]: 'по добавлению',
  [SortType.New]: 'по времени',
  [SortType.Name]: 'по имени',
  [SortType.ViewsWeekly]: 'по попурности (неделя)',
  [SortType.ViewsTotal]: 'по попурности (общее)',
  [SortType.Rate]: 'по рейтингу',
  [SortType.RateCount]: 'по количеству оценок',
}

export const DefaultSorterParam = {
  Direction: SortDirection.DESC,
  Type: SortType.ViewsWeekly
};
