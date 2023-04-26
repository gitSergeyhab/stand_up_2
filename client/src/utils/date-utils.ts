import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

import('dayjs/locale/ru').then(() => dayjs.locale('ru'));

// const LOCALE = 'ru';

// import(`dayjs/locale/${LOCALE}`)
//   .then(() => {
//     dayjs.locale(LOCALE);
//   });

export const getFormatDate = (date: string, format: string) => (date ? dayjs(date).format(format) : 'no date');
export const getCurrentYear = () => +dayjs().format('YYYY');

export const formatRateDate = (date: string) => dayjs(date).format('DD MMMM YYYY  HH:mm');
