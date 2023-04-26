import { ContentName } from '../const/const';
import { SubComedianCC } from '../types/comedian-types';
import { SubEventCC } from '../types/event-types';
// import { EventsOfComedianCC } from '../types/event-types';
import { SubShowCC } from '../types/show-types';
import {
  adaptComediansToCard,
  adaptEventsToCard,
  adaptShowsToCard,
} from './adapters/card-adapters';

/**
 * возвращает  заголовок страницы
 * @param data Данные
 * @param type Тип - к чему относится страница (событие/шоу/комик и тд)
 * @param language язык
 * @returns заголовок страницы
 */

// export const getTitle = (data: GridCardType, type: ContentName, language: Language ) => {

//   switch (type) {
//     case ContentName.Comedians:
//       return language === Language.Native ? data.comedianTitle : data.comedianTitleEn;
//     case ContentName.Events:
//       return language === Language.Native ? data.eventTitle : data.eventTitleEn;
//     case ContentName.Places:
//       return language === Language.Native ? data.placeTitle : data.placeTitleEn;

//     default: return '';
//   }
// };

/**
 * в зависимости от типа выбирает адаптер для данных с сервера
 *  и возвращает массив переведенных в CamelCase данных
 * @param data массив данных с сервера
 * @param type Тип - к чему относится страница (событие/шоу/комик и тд)
 * @returns массив переведенных в CamelCase данных
 */

export const getCardData = (
  data: SubEventCC[] | SubShowCC[] | SubComedianCC[],
  type: ContentName,
) => {
  switch (type) {
    case ContentName.Events:
      return data.map((item) => adaptEventsToCard(item as SubEventCC));
    case ContentName.Shows:
      return data.map((item) => adaptShowsToCard(item as SubShowCC));

    default:
      return data.map((item) => adaptComediansToCard(item as SubComedianCC));
  }
};

export const roundToPoints = (num: number) => Math.round(num * 100) / 100;

export const getTypes = (pathname: string) => {
  const paths = pathname.split('/');
  const mainType = paths[1] as ContentName;
  const listType = paths[3] as ContentName;

  return { mainType, listType };
};

export const round1 = (num: number) => Math.round(num * 10) / 10;
