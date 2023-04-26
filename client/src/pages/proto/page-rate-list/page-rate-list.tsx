import { useLocation, useParams } from 'react-router-dom';
import { GraphRound } from '../../../components/graph-round/graph-round';
import { BigSpinner } from '../../../components/spinner/big-spinner';

import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { Vote } from '../../../components/vote/vote';
import { useGetRatingsQuery } from '../../../store/sub-api';
import { getTypes } from '../../../utils/utils';
import { ErrorPage } from '../../error-page/error-page';
import { VotesUl } from './page-rate-list-style';

export function PageRatingList() {
  const { id } = useParams();

  const { pathname, search } = useLocation();

  const {
    isError,
    isLoading,
    data: res,
    error,
  } = useGetRatingsQuery(pathname + search);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !res /* || 1 + 1 === 2 */) {
    return <BigSpinner />;
  }

  const { count, rates, stats, titles } = res;

  const { mainType } = getTypes(pathname);

  const tabProps = { id, type: mainType, pathname };

  const ratingElements = rates.map((item) => (
    <Vote key={item.rateId} vote={item} />
  ));
  const rateList = rates.length ? <VotesUl>{ratingElements}</VotesUl> : null;

  return (
    <>
      <Titles native={titles.native} en={titles.en} />

      <TopTabs tabProps={tabProps} />

      <GraphRound stats={stats} />

      {rateList}

      {count}
    </>
  );
}
