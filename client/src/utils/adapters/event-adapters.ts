import { ContentName } from "../../const/const";
import { EventCardSC, EventCardServerDataCC, EventCardServerDataSC, EventCardServerDataWithTitlesCC, EventCardServerDataWithTitlesSC, OneEventCC, OneEventSC,
  // , EventsOfComedianCardCC, EventsOfComedianCardSC, EventsOfComedianDataCC, EventsOfComedianDataSC, OneEventTypeCC, OneEventTypeSC, SubEventCC, SubEventSC
} from "../../types/event-types";
import { GridCardType } from "../../types/types";

// const adaptEventsOfComedianToClient = (data:EventsOfComedianCardSC): EventsOfComedianCardCC => ({
//   eventId: data.event_id,
//   eventName: data.event_name,
//   eventNameEn: data.event_name_en,
//   mainPicture: data.main_picture,
//   status: data.status,
//   viewsCount: data.views_count,
//   eventDate: data.event_date,
//   placeId: data.place_id,
//   placeName: data.place_name
// });




// export const adaptEventsOfComedianDataToClient = (result: EventsOfComedianDataSC): EventsOfComedianDataCC => ({
//   data: result.data.map(adaptEventsOfComedianToClient),
//   count: +result.count,
//   titles: {
//     comedianNik: result.titles.comedian_nik,
//     comedianNikEn: result.titles.comedian_nik_en
//   }
// });


// export const adaptOneEventToClient = (data: OneEventTypeSC): OneEventTypeCC => (
//   {
//     countryId: data.country_id,
//     countryName: data.country_name,
//     countryNameEn: data.country_name_en,
//     eventComedians: data.event_comedians,
//     eventDate: data.event_date,
//     eventDateAdded: data.event_date_added,
//     eventDescription: data.event_description,
//     eventId: data.event_id,
//     eventName: data.event_name,
//     eventNameEn: data.event_name_en,
//     eventPicture: data.event_picture,
//     eventResources: data.event_resources,
//     eventShows: data.event_shows,
//     eventStatus: data.event_status,
//     placeId: data.place_id,
//     placeName: data.place_name,
//     placeNameEn: data.place_name_en,
//     placePicture: data.place_picture,
//     totalViews: data.total_views,
//     userAvatar: data.user_avatar,
//     userId: data.user_id,
//     userNik: data.user_nik,
//     views: data.views,
//   }
// );
// export const adaptEventsToClient = (data: SubEventSC): SubEventCC => ({
//   eventId: data.event_id,
//   eventName: data.event_name,
//   eventNameEn: data.event_name_en,
//   eventPromoPicture: data.event_promo_picture,
//   eventDate: data.event_date,
//   eventStatus: data.event_status,
//   placeId: data.place_id,
//   placeName: data.place_name,
//   placeNameEn: data.place_name_en,
//   comedianId: data.comedian_id,
// });


// -----







// export const adaptServerEventToClientCard = (data: EventCardSC): GridCardType=> ({
//   extId: data.place_id ? data.place_id : data.country_id,
//   extName: data.place_name ? data.place_name : getCountryCityStr(data.country_name, data.place_city),
//   id: data.event_id,
//   name: data.event_name,
//   picture: data.main_picture,
//   type: ContentName.Events,
//   extType: data.place_id ? ContentName.Places : ContentName.Countries,
//   viewsCount: data.total_views
// })
export const adaptServerEventToClientCard = (data: EventCardSC): GridCardType=> ({
  extId: data.place_id,
  extName: data.place_name,
  id: data.event_id,
  name: data.event_name,
  picture: data.main_picture,
  type: ContentName.Events,
  extType: ContentName.Places,
  viewsCount: data.views_count
})


export const adaptServerEventDataToCard = (result: EventCardServerDataSC): EventCardServerDataCC => ({
  list: result.list.map(adaptServerEventToClientCard),
  count: +result.count,
});

export const adaptServerEventDataWithTitlesToCard = (result: EventCardServerDataWithTitlesSC): EventCardServerDataWithTitlesCC => ({
  list: result.list.map(adaptServerEventToClientCard),
  count: +result.count,
  titles: {
    native: result.titles.native,
    en: result.titles.en
  }
});

export const adaptServerEventToClientPage = (data: OneEventSC): OneEventCC=> ({
  eventId: data.event_id,
  eventName: data.event_name,
  eventNameEn: data.event_name_en,
  eventDescription: data.event_description,
  eventDate: data.event_date,
  eventDateAdded: data.event_date_added,
  eventStatus: data.event_status,
  mainPicture: data.main_picture,
  placeId: data.place_id,
  placeName: data.place_name,
  userNik: data.user_nik,
  userId: data.user_id,
  userPicture: data.user_picture,
  eventResources: data.event_resources,
  views: data.views,
  totalViews: data.total_views,
  placeCity: data.place_city,
  placeCountryId: data.place_country_id,
  placeCountryName: data.place_country_name,
  placePicture: data.place_picture
})



