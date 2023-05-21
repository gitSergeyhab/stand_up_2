import { OneShowTypeCC,OneShowTypeSC,ShowsOfComedianCardCC,ShowsOfComedianCardSC,ShowsOfComedianDataCC,ShowsOfComedianDataSC,SubShowCC,SubShowSC } from '../../types/show-types';

const adaptShowsOfComedianToClient = (data:ShowsOfComedianCardSC): ShowsOfComedianCardCC => ({
  avgShowRate: data.avg_show_rate,
  comedianId: data.comedian_id,
  comedianNik: data.comedian_nik,
  mainPicture: data.main_picture,
  rateCount: data.rate_count,
  showId: data.show_id,
  showName: data.show_name,
  viewsCount: data.views_count,
  showDate: data.show_date
});

export const adaptShowsOfComedianDataToClient = (result: ShowsOfComedianDataSC): ShowsOfComedianDataCC => ({
  data: result.data.map(adaptShowsOfComedianToClient),
  count: +result.count,
  titles: {
    comedianNik: result.titles.comedian_nik,
    comedianNikEn: result.titles.comedian_nik_en
  }
});

export const adaptOneShowToClient = (data: OneShowTypeSC): OneShowTypeCC => ({
  avgRate: data.avg_rate,
  comedianAvatar: data.comedian_avatar,
  comedianFirstName: data.comedian_first_name,
  comedianFirstNameEn: data.comedian_first_name_en,
  comedianId: data.comedian_id,
  comedianLastName: data.comedian_last_name,
  comedianLastNameEn: data.comedian_last_name_en,
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  pictures: data.pictures,
  languageId: data.language_id,
  languageName: data.language_name,
  languageNameEn: data.language_name_en,
  numberOfRate: data.number_of_rate,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  showDate: data.show_date,
  showDateAdded: data.show_date_added,
  showDescription: data.show_description,
  showId: data.show_id,
  showName: data.show_name,
  showPoster: data.show_poster,
  totalViews: data.total_views,
  userShowAddedId: data.user_show_added_id,
  userDhowAddedNik: data.user_show_added_nik,
  videos: data.videos,
  views: data.views,
});

export const adaptShowsToClient = (data: SubShowSC): SubShowCC => ({
  showId: data.show_id,
  showName: data.show_name,
  showDateAdded: data.show_date_added,
  comedianNik: data.comedian_nik,
  mainPicture: data.main_picture,
  comedianId: data.comedian_id,
  avgRate: data.avg_rate,
  numberOfRate: data.number_of_rate,
});
