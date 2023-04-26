import { GetPageNumArgs } from '../types/types';

export const getPageNum = ({ count, limit, offset }: GetPageNumArgs) => {
  const pageCount = Math.ceil(count / limit);
  const currentPageMax = Math.floor(pageCount - (count - offset) / limit) + 1;
  const currentPage = currentPageMax > pageCount ? pageCount : currentPageMax;
  return { pageCount, currentPage };
};

const fillSpaces = (numbers: number[]) => {
  const spaces: number[] = [];
  const result: { num: number; type: 'num' | 'space' }[] = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] - 1 > numbers[i]) {
      spaces.push(numbers[i]);
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    if (spaces.some((sp) => sp === numbers[i])) {
      result.push(
        { num: numbers[i], type: 'num' },
        { num: numbers[i] + 1, type: 'space' },
      );
    } else {
      result.push({ num: numbers[i], type: 'num' });
    }
  }

  return result;
};

export const getPages = ({ count, limit, offset }: GetPageNumArgs) => {
  const { pageCount, currentPage } = getPageNum({ count, limit, offset });

  const firstPage = pageCount && currentPage > 1 ? 1 : null;
  const lastPage = pageCount > 1 && currentPage < pageCount ? pageCount : null;

  const [firstCentralPageX, lastCentralPageX] = [
    currentPage - 1,
    currentPage + 1,
  ];
  const firstCentralPage = firstCentralPageX > 1 ? firstCentralPageX : null;
  const lastCentralPage = lastCentralPageX < pageCount ? lastCentralPageX : null;
  const beforePage = currentPage > 3 ? Math.floor((currentPage + 1) / 2) : null;
  const afterPage = currentPage < pageCount - 2
    ? Math.ceil((currentPage + pageCount) / 2)
    : null;

  const pages = [
    firstPage,
    beforePage,
    firstCentralPage,
    currentPage,
    lastCentralPage,
    afterPage,
    lastPage,
  ].filter((p) => p);
  const result = fillSpaces(pages as number[]);

  return { result, pageCount, currentPage };
};

export type GetPageQueryArgs = { targetPage: number; limit: number };
export const getPageOffset = ({ targetPage, limit }: GetPageQueryArgs) => limit * (targetPage - 1);
