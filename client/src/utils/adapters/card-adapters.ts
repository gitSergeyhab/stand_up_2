import { ContentName } from '../../const/const';
import { SubComedianCC } from '../../types/comedian-types';
// import { ComedianTypeCC, ComedianTypeSC } from '../../types/comedian-types';
import { SubEventCC } from '../../types/event-types';
import { SubShowCC } from '../../types/show-types';
import { GridCardType } from '../../types/types';

export type AdapterCardType<D> = (data: D) => GridCardType;

// type AnyDate = EventsOfComedianCC | ShowsOfComedianCC;

export const adaptEventsToCard: AdapterCardType<SubEventCC> = (data) => ({
  type: ContentName.Events,
  id: data.eventId,
  name: data.eventName,
  nameEn: data.eventNameEn,
  picture: data.eventPromoPicture,

  extType: ContentName.Places,
  extId: data.placeId,
  extName: data.placeName,
  extNameEn: data.placeNameEn,

  date: data.eventDate,
  numberOfRate: null,
  rate: null,
  status: data.eventStatus,
});

export const adaptShowsToCard: AdapterCardType<SubShowCC> = (data) => ({
  type: ContentName.Shows,
  id: data.showId,
  name: data.showName,
  nameEn: null,
  picture: data.showPoster,

  extType: ContentName.Comedians,
  extId: data.comedianId,
  extName: data.comedianName,
  extNameEn: data.comedianNameEn,

  date: data.showDateAdded,
  numberOfRate: data.numberOfRate ? +data.numberOfRate : null,
  rate: data.avgRate,
  status: null,
});

export const adaptComediansToCard: AdapterCardType<SubComedianCC> = (data) => ({
  type: ContentName.Comedians,
  id: data.comedianId,
  nik: data.nik,
  // name: data.comedianName,
  // nameEn: data.comedianNameEn,
  picture: data.picture,

  extType: ContentName.Countries,
  extId: data.countryId,
  extName: `${data.countryName || ''} ${
    data.comedianCity ? `(${data.comedianCity})` : ''
  }`,
  extNameEn: `${data.countryName || ''} ${
    data.comedianCity ? `(${data.comedianCity})` : ''
  }`,

  date: null,
  numberOfRate: data.numberOfRate ? +data.numberOfRate : null,
  rate: data.avgRate,
  status: null,
});

export type CardAdapters =
  | ReturnType<typeof adaptEventsToCard>
  | ReturnType<typeof adaptShowsToCard>
  | ReturnType<typeof adaptComediansToCard>;

// export const adaptEventsToCard: AdapterCardType<EventsOfComedianCC> = (data) => ({

//   date: data.eventDate || '',
//   extId: data.placeId || '',
//   extName: data.placeName,
//   id: data.eventId || '',
//   name: data.eventName || '',
//   picture: data.eventPromoPicture || '',
//   status: data.eventStatus || '',
//   type: ContentName.Events,
//   extType: ContentName.Places,

//   comedianTitle: `${data.comedianFirstName || ''} ${data.comedianLastName || ''}`,
//   comedianTitleEn: `${data.comedianFirstNameEn || ''} ${data.comedianLastNameEn || ''}`,
//   eventTitle: data.eventName || '',
//   eventTitleEn: data.eventNameEn || '',
//   placeTitle: data.placeName || '',
//   placeTitleEn: data.placeNameEn || '',
//   showTitle: data.showName || ''

// });

// export const adaptShowsToCard: AdapterCardType<ShowsOfComedianCC> = (data) => ({
//   date: data.showDateAdded || '',
//   extId: data.comedianId || '',
//   extName: `${data.comedianFirstName || ''} ${data.comedianLastName || ''}`,
//   id: data.showId || '',
//   name: data.showName || '',
//   picture: data.showPoster || '',
//   status: null,
//   type: ContentName.Shows,
//   extType: ContentName.Comedians,

//   comedianTitle: `${data.comedianFirstName || ''} ${data.comedianLastName || ''}`,
//   comedianTitleEn: `${data.comedianFirstNameEn || ''} ${data.comedianLastNameEn || ''}`,
//   eventTitle: data.eventName || '',
//   eventTitleEn: data.eventNameEn || '',
//   placeTitle: data.placeName || '',
//   placeTitleEn: data.placeNameEn || '',
//   showTitle: data.showName || '',

// });

// export const adaptComedianToCard: AdapterCardType<ComedianTypeCC> = (data) => ({
//   date: '',
//   extId: data.countryId?.toString() || '',
//   extName: data.countryName,
//   id: data.comedianId || '',
//   name: data.comedianFirstName,
//   picture: data.comedianLastName,
//   status: null,
//   type: ContentName.Comedians,
//   extType: ContentName.Countries,

//   comedianTitle: `${data.comedianFirstName || ''} ${data.comedianLastName || ''}`,
//   comedianTitleEn: `${data.comedianFirstNameEn || ''} ${data.comedianLastNameEn || ''}`,
//   eventTitle: data.eventName || '',
//   eventTitleEn: data.eventNameEn || '',
//   placeTitle: data.placeName || '',
//   placeTitleEn: data.placeNameEn || '',
//   showTitle: data.showName || '',

// });
