import {
  ComedianCardCC,
  ComedianCardDataCC,
  ComedianCardDataSC,
  ComedianCardSC,
  OneComedianTypeCC,
  OneComedianTypeSC,

} from '../../types/comedian-types';
import { ImageCC, ImageSC } from '../../types/pic-types';



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
  views: data.views,
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


const adaptComedianToClient = (data:ComedianCardSC):ComedianCardCC => ({
  comedianId: data.comedian_id,
  comedianNik: data.comedian_nik,
  comedianCity: data.comedian_city,
  countryId: data.country_id,
  countryName: data.country_name,
  mainPicture: data.main_picture,
  viewsCount: data.views_count
});


export const adaptComedianDataToClient = (result: ComedianCardDataSC): ComedianCardDataCC => ({
  list: result.list.map(adaptComedianToClient),
  count: +result.count,
});
