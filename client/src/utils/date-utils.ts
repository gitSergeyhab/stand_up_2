import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import parseFormat from 'dayjs/plugin/customParseFormat';
import isBetween  from 'dayjs/plugin/isBetween';
import { FILTER_CURRENT_PLUS_YEAR, FILTER_START_YEAR } from '../const/date';


dayjs.extend(localeData);
dayjs.extend(parseFormat);
dayjs.extend(isBetween);


import('dayjs/locale/ru').then(() => dayjs.locale('ru'));

// const LOCALE = 'ru';

// import(`dayjs/locale/${LOCALE}`)
//   .then(() => {
//     dayjs.locale(LOCALE);
//   });

export const getFormatDate = (date: string, format: string) => (date ? dayjs(date).format(format) : 'no date');
export const getCurrentYear = () => +dayjs().format('YYYY');
export const getDefaultYears = (year?: string) => {
  const currentYear = year ? +year : getCurrentYear();
  const maxYear = currentYear + FILTER_CURRENT_PLUS_YEAR;
  return {currentYear, maxYear, minYear: FILTER_START_YEAR}
}

export const formatRateDate = (date: string) => dayjs(date).format('DD MMMM YYYY  HH:mm');



export const getNextWeek = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  return new Date(tomorrow.setDate(tomorrow.getDate() + 7))
}

export const getNextWeekDatePickerFormat = () => dayjs(getNextWeek()).format('DD.MM.YYYY')

export const getStartDate = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  return new Date(tomorrow.setDate(tomorrow.getDate() - 50000))
}

// const validateDate = ()
const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';
const DEFAULT_START_DATE = '01.01.1800';
const DEFAULT_DATE_TIME_FORMAT = 'DD.MM.YYYY | HH:mm'
const today = dayjs();

const DEFAULT_DATE_FORMAT_FROM_DB = 'YYYY-MM-DD'

export const checkDateCorrect = (date: string|dayjs.Dayjs, format = DEFAULT_DATE_FORMAT ) =>
  dayjs(date, format).isValid();;


type ValidateDateTypes = {
  date: string|dayjs.Dayjs,
  startDate?: string|dayjs.Dayjs,
  endDate?: string|dayjs.Dayjs,
  format?: string
}
export const validateDate = ({date, startDate, endDate, format=DEFAULT_DATE_FORMAT}: ValidateDateTypes ) => {
  const start = dayjs(startDate || DEFAULT_START_DATE, format);
  const end = dayjs(endDate || today, format);
  // const startDateUsed = startDate || DEFAULT_START_DATE;
  // const endDateUsed = endDate || today;
  if ([date, start, end].some((item) => !checkDateCorrect(item))) {
    console.log('BAD DATES')
    return false;
  }
  // const start = dayjs(startDateUsed, format);
  // const end = dayjs(endDateUsed, format);

  return dayjs(date, format).isBetween(start, end, 'day')
}

export const formatDateType = (dateTime: Date|string) => dayjs(dateTime).format(DEFAULT_DATE_TIME_FORMAT);

export const getDateFromString = (str: string|undefined) =>
  (str && (checkDateCorrect(str) || checkDateCorrect(str, DEFAULT_DATE_FORMAT_FROM_DB))) ? dayjs(str).toDate() : null


export const formatDateFromTimeStamp = (timestamp: number|Date) => dayjs(new Date(timestamp)).format(DEFAULT_DATE_TIME_FORMAT);
