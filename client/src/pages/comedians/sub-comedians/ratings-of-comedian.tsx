import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GraphRound } from "../../../components/graph-round/graph-round";
import { BigSpinner } from "../../../components/spinner/big-spinner";
import { Titles } from "../../../components/titles/titles";
import { TopTabs } from "../../../components/top-tabs/top-tabs";
import { getTypes } from "../../../utils/utils";
import { ErrorPage } from "../../error-page/error-page";
import { useGetShowsRatingDataByComedianIdQuery, useLazyGetShowsRatingsByComedianIdQuery } from "../../../store/comedians-api";
import { ClearButton, DigitSideDiv, GraphDiv, GraphSection, ShowMoreButtonWrapper, TextSideDiv } from "./ratings-of-comedian-style";
import { ComedianShowRatingCountCC } from "../../../types/rating-types";
import { LongButton } from "../../../components/common/common-style";
import { LimitSelector } from "../../../components/limit-selector/limit-selector";
import { ArrowScrollUp } from "../../../components/arrow-scroll-up/arrow-scroll-up";
import { Vote } from "../../../components/vote/vote";
import { VoteUL } from "../../../components/vote/vote-style";


export function RatingsOfComedian() {
  const { id } = useParams() as {id: string};
  const { pathname } = useLocation();

  const [digit, setDigit] = useState(0)
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [listData, setListData] = useState<ComedianShowRatingCountCC>({count: 0, list: []})

  const [getRatings] = useLazyGetShowsRatingsByComedianIdQuery()

  const {isError, isLoading, data: graphData, error} =
    useGetShowsRatingDataByComedianIdQuery(id);



  useEffect(() => {
    getRatings({id, digit, offset, limit})
      .then(({data}) => {
        if (!data) {
          return;
        }
        setListData((prev) => {
          const {count, list} = data;
          // если offset === 0 полностью обновить данные
          if(!offset) {
            return data
          }
          // иначе добавить в лист(в старые данные) новые данные
          return {
            count,
            list: [...prev.list, ...list]
          }
        })
      })
      .catch(() => toast('Ошиба загрузки данных'))
  }, [digit, id, offset, getRatings, limit])

  const handleBtnClear = () => {
    setDigit(0);
    setOffset(0);
  }
  const onDigitClick = (num: number) => {
    setDigit(num);
    setOffset(0)
  }

  if (isError ) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !graphData || !listData) {
    return <BigSpinner />;
  }


  const { mainType } = getTypes(pathname);

  const tabProps = { id, type: mainType, pathname };
  const {graph, titles} = graphData;
  const {list, count} = listData;


  const handleUploadVotesBtnClick = () => {
    setOffset((prev) => prev + limit );
  }


  const voteElements = list.map((item) => <Vote key={item.showRatingId} vote={item} />)

  const voteList = <VoteUL>{voteElements}</VoteUL>



  const digitSideElement = digit ?
    <>{digit}<ClearButton onClick={handleBtnClear}>Показать все оценки</ClearButton></> :
    'Все оценки';


  const showMoreBtn = (listData.list.length < listData.count) ? (
    <ShowMoreButtonWrapper>
      <LongButton onClick={handleUploadVotesBtnClick}>Еще оценки</LongButton>
    </ShowMoreButtonWrapper>
  ) : null


  return (
    <>
      <Titles native={titles.native} en={titles.en} />

      <TopTabs tabProps={tabProps} />

      <GraphSection>
      <TextSideDiv>Оценки пользователей</TextSideDiv>

        <GraphDiv>
          <GraphRound stats={graph} onDigitClick={onDigitClick} />
        </GraphDiv>
        <DigitSideDiv>
          {digitSideElement}
        </DigitSideDiv>
      </GraphSection>
      <LimitSelector setLimit={setLimit}/>

      {voteList}

      {count}
      {showMoreBtn}
      <ArrowScrollUp/>
    </>
  );
}
