import { useParams, useLocation } from 'react-router-dom';

import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { CardContainer } from '../../../components/card-container/card-container';

import { Filter } from '../../../components/filters/filter';
import { getCardData, getTypes } from '../../../utils/utils';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { ErrorPage } from '../../error-page/error-page';
import { Pagination } from '../../../components/pagination/pagination';
import { UseGetQueryType } from '../../../store/sub-api';

type PageCardFilterListProps = {
  filters: string[];
  // mainType: ContentName;
  // listType: ContentName;
  useGetQuery: UseGetQueryType;
};

/**
 *  возвращает JSXElement - страницу с набором карточек
 * @param param0 {filters, mainType, listType, useGetQuery }:
 * filters - массив фильтров [year, languages  и тд] ;
 * mainType - к чему относится страница (событие/шоу/комик и тд) ;
 * listType - к чему относится карточка (событие/шоу/комик и тд) ;
 * useGetQuery - ф-ция RTK-query, возвращающая {isError, isLoading, data}.
 * @returns JSXElement - страницу с набором карточек
 */

export function PageCardFilterList({ filters, useGetQuery }: PageCardFilterListProps) {
  const { id } = useParams();

  const { pathname, search } = useLocation();

  const { isError, isLoading, data: result, error } = useGetQuery(pathname + search);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !result) {
    return <BigSpinner />;
  }

  const { data, count, titles } = result;

  const { listType, mainType } = getTypes(pathname);

  const cardData = getCardData(data, listType);

  const content = +count
    ? <CardContainer cards={cardData} />
    : (
      <ErrorPage
        altTitles={{ en: '', ru: 'Нет контента, соответствующего параметам' }}
      />
    );

  const tabProps = { id, type: mainType, pathname };

  return (
    <>
      <Titles native={titles.native} en={titles.en} />
      <TopTabs tabProps={tabProps} />
      <Filter filters={filters} />
      {content}
      count: {count}
      <Pagination count={+count} />
    </>
  );
}
