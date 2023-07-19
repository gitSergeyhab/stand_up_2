import { ContentName } from '../../const/const';
import {
  ComedianCardDataSC,
  ComedianCardDataWithTitlesSC,
  ComedianCardSC,
  OneComedianTypeCC,
  OneComedianTypeSC
} from '../../types/comedian-types';
import { CardDataCC, CardDataWithTitlesCC } from '../../types/common-types';
import { ImageCC, ImageSC } from '../../types/pic-types';
import { GridCardType } from '../../types/types';



const adaptImageToClient = (data: ImageSC): ImageCC  => ({
  imageId: data.image_id,
  imagePath: data.image_path
})

export const adaptOneComedianToClient = (data: OneComedianTypeSC): OneComedianTypeCC => ({
  avgRate: data.avg_rate,
  comedianNik: data.comedian_nik,
  comedianCity: data.comedian_city,
  comedianCityEn: data.comedian_city_en,
  comedianFirstName: data.comedian_first_name,
  comedianFirstNameEn: data.comedian_first_name_en,
  comedianId: data.comedian_id,
  comedianLastName: data.comedian_last_name,
  comedianLastNameEn: data.comedian_last_name_en,
  countryId: data.country_id,
  mainPicture: data.main_picture,
  countryName: data.country_name,
  countryNameEn: data.country_name_en,
  comedianDateAdded: data.comedian_date_added,
  numberOfRate: data.number_of_rate,
  totalViews: data.total_views,
  weeklyViews: data.weekly_views,
  userNik: data.user_nik,
  userId: data.user_id,
  resources: data.resources,
  pictures: data.pictures?.map(adaptImageToClient),
  comedianDescription: data.comedian_description,
  comedianDateBirth: data.comedian_date_birth,
  comedianDateDeath: data.comedian_date_death,
  comedianNikEn: data.comedian_nik_en,
  comedianSecondName: data.comedian_second_name,
  comedianSecondNameEn: data.comedian_second_name_en,
});





export const adaptComedianToClientCard = (data:ComedianCardSC): GridCardType => ({
  id: data.comedian_id,
  name: data.comedian_nik,
  type: ContentName.Comedians,
  extType: ContentName.Countries,
  extName: data.country_name ? `${data.country_name} ${data.comedian_city ? `(${  data.comedian_city  })` : ''}` : '',
  picture: data.main_picture,
  totalViews: data.total_views,
  weeklyViews: data.weekly_views,
  extId: ''
});

// const adaptComedianToClient = (data:ComedianCardSC):ComedianCardCC => ({
//   comedianId: data.comedian_id,
//   comedianNik: data.comedian_nik,
//   comedianCity: data.comedian_city,
//   countryId: data.country_id,
//   countryName: data.country_name,
//   mainPicture: data.main_picture,
//   totalViews: data.total_views,
//   weeklyViews: data.weekly_views
// });


export const adaptComedianDataToClient = (result: ComedianCardDataSC): CardDataCC => ({
  list: result.list.map(adaptComedianToClientCard),
  count: +result.count,
});

export const adaptComedianDataWithTitlesToClient = (result: ComedianCardDataWithTitlesSC): CardDataWithTitlesCC => ({
  list: result.list.map(adaptComedianToClientCard),
  count: +result.count,
  titles: {
    native: result.titles.native,
    en: result.titles.en
  }
});
