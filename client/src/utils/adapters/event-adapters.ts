import { EventsOfComedianCardCC, EventsOfComedianCardSC, EventsOfComedianDataCC, EventsOfComedianDataSC, OneEventTypeCC, OneEventTypeSC, SubEventCC, SubEventSC } from "../../types/event-types";

const adaptEventsOfComedianToClient = (data:EventsOfComedianCardSC): EventsOfComedianCardCC => ({
  eventId: data.event_id,
  eventName: data.event_name,
  eventNameEn: data.event_name_en,
  mainPicture: data.main_picture,
  status: data.status,
  viewsCount: data.views_count,
  eventDate: data.event_date,
  placeId: data.place_id,
  placeName: data.place_name
});




export const adaptEventsOfComedianDataToClient = (result: EventsOfComedianDataSC): EventsOfComedianDataCC => ({
  data: result.data.map(adaptEventsOfComedianToClient),
  count: +result.count,
  titles: {
    comedianNik: result.titles.comedian_nik,
    comedianNikEn: result.titles.comedian_nik_en
  }
});


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

