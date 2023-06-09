import { ContentName } from '../../const/const';
import {  OneShowCC, OneShowSC, ShowCardDataCC, ShowCardDataSC, ShowCardDataWithTitlesCC, ShowCardDataWithTitlesSC, ShowCardSC } from '../../types/show-types';
import { GridCardType } from '../../types/types';
import { adaptRatingToClient } from './user-adapters';


const adaptServerShowToClientCard = (data: ShowCardSC): GridCardType => ({
  avgRate: data.avg_rate,
  extId: data.comedian_id,
  extName: data.comedian_nik,
  id: data.show_id,
  name: data.show_name,
  picture: data.main_picture,
  type: ContentName.Shows,
  extType: ContentName.Comedians,
  weeklyViews: data.weekly_views,
  totalViews: data.total_views,
  date: data.show_date,
  rateCount: data.number_of_rate,
  userRate: data.user_rating ?  adaptRatingToClient(data.user_rating) : undefined
});

export const adaptServerShowDataToCard = (result: ShowCardDataSC): ShowCardDataCC => ({
  list: result.list.map(adaptServerShowToClientCard),
  count: +result.count,
});


export const adaptServerShowDataToWithTitlesToCard = (result: ShowCardDataWithTitlesSC): ShowCardDataWithTitlesCC => ({
  list: result.list.map(adaptServerShowToClientCard),
  count: +result.count,
  titles: {
    native: result.titles.native,
    en: result.titles.en
  }
});

export const adaptOneShowToClient = (data: OneShowSC): OneShowCC => ({
  ...data,
  avgRate: data.avg_rate,
  comedianNik: data.comedian_nik,
  comedianNikEn: data.comedian_nik_en,
  comedianId: data.comedian_id,
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  languageId: data.language_id,
  languageName: data.language_name,
  languageNameEn: data.language_name_en,
  numberOfRate: data.number_of_rate,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  showDate: data.show_date,
  showDateAdded: data.show_date_added,
  showId: data.show_id,
  showName: data.show_name,
  showNameEn: data.show_name_en,
  totalViews: data.total_views,
  videos: data.videos,
  weeklyViews: data.weekly_views,
  eventId: data.event_id,
  eventName: data.event_name,
  eventNameEn: data.event_name_en,
  eventPicture: data.event_picture,
  placePicture: data.place_picture,
  showPicture: data.show_picture,
  comedianPicture: data.comedian_picture,
  userId: data.user_id,
  userNik: data.user_nik,
  showDescription: data.show_description,
  userRate: data.user_rating ? adaptRatingToClient(data.user_rating) : undefined,

});
