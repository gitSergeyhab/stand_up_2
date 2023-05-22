import dayjs from "dayjs";
import { FILTER_CURRENT_PLUS_YEAR, FILTER_START_YEAR } from "../const/date-const";

export const getCurrentYear = () => +dayjs().format('YYYY');

// export const getDefaultYears = (year: string|null) => {
//     const currentYear = year ? +year : getCurrentYear();
//     const maxYear = currentYear + FILTER_CURRENT_PLUS_YEAR;
//     return {currentYear, maxYear, minYear: FILTER_START_YEAR}
// }

export const getDefaultFromToYears = () => {
    const currentYear = getCurrentYear();
    const yearTo = currentYear + FILTER_CURRENT_PLUS_YEAR;
    return {yearFrom: FILTER_START_YEAR, yearTo }
}