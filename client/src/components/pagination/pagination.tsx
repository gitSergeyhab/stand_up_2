import { useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

import { getPageOffset, getPages } from '../../utils/pagination-utils';
import {
  NextPrevPageLink,
  PageContainer,
  PageLink,
  SpaceLink,
} from './pagination-style';
import {
  createNewSearch,
  getFieldFromSearch,
} from '../../utils/navigation-utils';

const DefaultPageParam = {
  Limit: 6,
  Offset: 0,
};

/**
 * из url(search) достает limit и offset
 * @param search location.search
 * @returns - {limit, offset}
 */

const getPageParams = (search: string) => {
  const limit = +(getFieldFromSearch({ field: 'limit', search }) as string)
    || DefaultPageParam.Limit;
  const offset = +(getFieldFromSearch({ field: 'offset', search }) as string)
    || DefaultPageParam.Offset;
  return { limit, offset };
};

export function Pagination({ count }: { count: number }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { limit, offset } = getPageParams(search);

  const { currentPage, pageCount, result } = getPages({ count, limit, offset });

  const handlePageClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    targetPage: number,
  ) => {
    evt.preventDefault();
    const newOffset = getPageOffset({ targetPage, limit }).toString();
    const fields = [
      { name: 'offset', value: newOffset },
      { name: 'limit', value: limit },
    ];

    const newLSearch = createNewSearch({ search, fields, replace: true });
    navigate(`?${newLSearch}`);
  };

  const pagesElements = result.map((item) => {
    if (item.type === 'space') {
      return (
        <SpaceLink key={item.num} to="#">
          ...
        </SpaceLink>
      );
    }
    return (
      <PageLink
        onClick={(evt) => handlePageClick(evt, item.num)}
        current={+(item.num === currentPage)}
        extreme={+(item.num === 1 || item.num === pageCount)}
        key={item.num}
        to={`#${item.num}`}
      >
        {item.num}
      </PageLink>
    );
  });

  return (
    <PageContainer>
      <NextPrevPageLink
        onClick={(evt) => handlePageClick(evt, currentPage - 1)}
        disable={+(currentPage === 1)}
        key="prev"
        to="#1"
      >
        ᐸ
      </NextPrevPageLink>
      {pagesElements}
      <NextPrevPageLink
        onClick={(evt) => handlePageClick(evt, currentPage + 1)}
        disable={+(currentPage === pageCount)}
        key="next"
        to={`#${pageCount}`}
      >
        ᐳ
      </NextPrevPageLink>
    </PageContainer>
  );
}
