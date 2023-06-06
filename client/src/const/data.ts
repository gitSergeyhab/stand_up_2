import { ContentName } from './const';

export const TabData = {
  [ContentName.Comedians]: [
    { name: 'Информация', path: 'info' }, // b +one/
    { name: 'Выступления', path: 'shows' }, // b +all/
    { name: 'События', path: 'events' }, // b +all/
    { name: 'Фото', path: 'images' }, //
    { name: 'Оценки', path: 'ratings' }, //
  ],
  [ContentName.Events]: [
    { name: 'Информация', path: 'info' }, //
    { name: 'Выступления', path: 'shows' }, // b +all
    { name: 'Комики', path: 'comedians' }, // b +all
    { name: 'Фото', path: 'images' },
  ],
  [ContentName.Places]: [
    { name: 'Информация', path: 'info' },
    { name: 'Выступления', path: 'shows' }, // b +all
    { name: 'События', path: 'events' }, // b +all
    { name: 'Фото', path: 'images' },
  ],
  [ContentName.Shows]: [
    { name: 'Информация', path: 'info' },
    { name: 'Видео', path: 'movies' },
    { name: 'Фото', path: 'images' },
    { name: 'Оценки', path: 'ratings' },
    { name: 'Отзывы', path: 'reviews' },
  ],

  [ContentName.Users]: [
    { name: 'Информация', path: 'info' },
    { name: 'Фото', path: 'images' },
    { name: 'Оценки', path: 'ratings' },
    { name: 'Отзывы', path: 'reviews' },
  ],
  [ContentName.Countries]: [{ name: 'Информация', path: 'info' }],
  [ContentName.Pictures]: [{ name: 'Информация', path: 'info' }],
};

// export const TabData = {
//   [ContentName.comedians]: [
//     {name: 'Информация', path: 'info' }, // b +one/
//     {name: 'Выступления', path: 'shows' }, // b +all/
//     {name: 'События', path: 'events' }, // b +all/
//     {name: 'Фото', path: 'images' }, //
//     {name: 'Оценки', path: 'ratings' }, //
//   ],
//   [ContentName.events]: [
//     {name: 'Информация', path: 'info' }, //
//     {name: 'Выступления', path: 'shows' }, // b +all
//     {name: 'Комики', path: 'comedians' }, // b +all
//   ],
//   [ContentName.places]: [
//     {name: 'Информация', path: 'info' },
//     {name: 'Выступления', path: 'shows' }, // b +all
//     {name: 'События', path: 'events' }, // b +all
//     {name: 'Фото', path: 'images' },

//   ],
//   [ContentName.shows]: [
//     {name: 'Информация', path: 'info' },
//     {name: 'Видео', path: 'movies' },
//     {name: 'Фото', path: 'images' },
//     {name: 'Оценки', path: 'ratings' },
//     {name: 'Отзывы', path: 'reviews' },
//   ],

//   [ContentName.users]: [
//     {name: 'Информация', path: 'info' },
//     {name: 'Фото', path: 'images' },
//     {name: 'Оценки', path: 'ratings' },
//     {name: 'Отзывы', path: 'reviews' },
//   ],
//   [ContentName.countries]: [{name: 'Информация', path: 'info' }],
//   [ContentName.images]: [{name: 'Информация', path: 'info' }]
// };

export type TabDataType = typeof TabData;
