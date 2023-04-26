import {
  OneEventTypeCC,
  OneEventTypeSC,
  SubEventCC,
  SubEventSC,
} from '../../types/event-types';

// export const adaptEventsToClient = (data: EventTypeSC): EventTypeCC => (
//   {
//     countryId: data['country_id'],
//     countryName: data['country_name'],
//     countryNameEn: data['country_name_en'],
//     eventDate: data['event_date'],
//     eventDateAdded: data['event_date_added'],
//     eventId: data['event_id'],
//     eventName: data['event_name'],
//     eventNameEn: data['event_name_en'],
//     eventPicture: data['event_picture'],
//     eventStatus: data['event_status'],
//     placeCity: data['place_city'],
//     placeCityEn: data['place_city_en'],
//     totalViews: data['total_views'],
//     upcoming: data['upcoming'],
//     views: data['views'],
//   }
// );

export const adaptOneEventToClient = (data: OneEventTypeSC): OneEventTypeCC => (
  {
    countryId: data.country_id,
    countryName: data.country_name,
    countryNameEn: data.country_name_en,
    eventComedians: data.event_comedians,
    eventDate: data.event_date,
    eventDateAdded: data.event_date_added,
    eventDescription: data.event_description,
    eventId: data.event_id,
    eventName: data.event_name,
    eventNameEn: data.event_name_en,
    eventPicture: data.event_picture,
    eventResources: data.event_resources,
    eventShows: data.event_shows,
    eventStatus: data.event_status,
    placeId: data.place_id,
    placeName: data.place_name,
    placeNameEn: data.place_name_en,
    placePicture: data.place_picture,
    totalViews: data.total_views,
    userAvatar: data.user_avatar,
    userId: data.user_id,
    userNik: data.user_nik,
    views: data.views,
  }
);
export const adaptEventsToClient = (data: SubEventSC): SubEventCC => ({
  eventId: data.event_id,
  eventName: data.event_name,
  eventNameEn: data.event_name_en,
  eventPromoPicture: data.event_promo_picture,
  eventDate: data.event_date,
  eventStatus: data.event_status,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  comedianId: data.comedian_id,
});

// export const adaptEventsOfComedianToClient = (data: EventsOfComedianSC): EventsOfComedianCC => (
//   {
//     comedianFirstName: data['comedian_first_name'],
//     comedianFirstNameEn: data['comedian_first_name_en'],
//     comedianLastName: data['comedian_last_name'],
//     comedianLastNameEn: data['comedian_last_name_en'],
//     eventDate: data['event_date'],
//     eventId: data['event_id'],
//     eventName: data['event_name'],
//     eventNameEn: data['event_name_en'],
//     eventPromoPicture: data['event_promo_picture'],
//     eventStatus: data['event_status'],
//     placeId: data['place_id'],
//     placeName: data['place_name'],
//     placeNameEn: data['place_name_en'],
//     showName: data['show_name'],
//     dataType: DataType.EventsOfComedianCC
//   }
// );
