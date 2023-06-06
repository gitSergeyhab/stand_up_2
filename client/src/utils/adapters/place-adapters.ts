import { ContentName } from '../../const/const';
import { OnePlaceCC, OnePlaceSC, PlaceCardDataCC, PlaceCardDataSC, PlaceCardSC } from '../../types/place-types';
import { GridCardType } from '../../types/types';
import { getCountryCityStr } from './common-adapter-utils';
import { adaptImageToClient } from './pic-adapter';


const adaptServerPlaceToClientCard = (data: PlaceCardSC): GridCardType => ({
  // extId: data.country_id,
  extName: getCountryCityStr(data.country_name, data.place_city || data.place_city_en ),
  id: data.place_id,
  name: data.place_name,
  picture: data.main_picture,
  type: ContentName.Places,
  extType: ContentName.Countries,
  viewsCount: data.views_count,
  date: data.place_date_founded,

});

export const adaptServerPlaceDataToCard = (result: PlaceCardDataSC): PlaceCardDataCC => ({
  list: result.list.map(adaptServerPlaceToClientCard),
  count: +result.count,
});


// export const adaptServerShowDataToWithTitlesToCard = (result: ShowCardDataWithTitlesSC): ShowCardDataWithTitlesCC => ({
//   list: result.list.map(adaptServerShowToClientCard),
//   count: +result.count,
//   titles: {
//     native: result.titles.native,
//     en: result.titles.en
//   }
// });

export const adaptOnePlaceToClient = (data: OnePlaceSC): OnePlaceCC=> ({
  countryId: data.country_id,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  placeId: data.place_id,
  placeName: data.place_name,
  placeNameEn: data.place_name_en,
  totalViews: data.total_views,
  views: data.views,
  userId: data.user_id,
  userNik: data.user_nik,
  mainPicture: data.main_picture,
  userPicture: data.user_picture,
  pictures: data.pictures?.map(adaptImageToClient) ,
  placeCity: data.place_city,
  placeCityEn: data.place_city_en,
  placeDateClosed: data.place_date_closed,
  placeDateFounded: data.place_date_founded,
  placeDateAdded: data.place_date_added,
  placeDescription: data.place_description,
  resources: data.resources,

});
