import { ContentName } from "../../const/const";
import { EventCardSC, EventCardServerDataCC, EventCardServerDataSC, EventCardServerDataWithTitlesCC, EventCardServerDataWithTitlesSC, OneEventCC, OneEventSC,
} from "../../types/event-types";
import { GridCardType } from "../../types/types";


export const adaptServerEventToClientCard = (data: EventCardSC): GridCardType=> ({
  extId: data.place_id,
  extName: data.place_name,
  id: data.event_id,
  name: data.event_name,
  picture: data.main_picture,
  type: ContentName.Events,
  extType: ContentName.Places,
  totalViews: data.total_views,
  weeklyViews: data.weekly_views
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
  weeklyViews: data.weekly_views,
  totalViews: data.total_views,
  placeCity: data.place_city,
  placeCountryId: data.place_country_id,
  placeCountryName: data.place_country_name,
  placePicture: data.place_picture
})



