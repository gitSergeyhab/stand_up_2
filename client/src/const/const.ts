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
  Any: './../assets/img/default/default.png',
};

export const KeyNext = ['ArrowRight', 'Numpad6', 'ArrowDown'];
export const KeyPrev = ['ArrowLeft', 'Numpad4', 'ArrowUp'];

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
  CountryId: 'country_id',
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
