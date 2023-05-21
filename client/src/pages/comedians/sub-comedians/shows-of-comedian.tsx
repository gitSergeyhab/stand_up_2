import { Filter } from "../../../components/filters/filter"
import { ContentName, DefaultPageParam, FilterName } from "../../../const/const"
import { useGetIdSearch } from "../../../hooks/use-get-id-search";
import { ShowsOfComedianCardCC, useGetShowsOfComedianQuery } from "../../../store/shows-api"
import { GridCard, GridCardType } from "../../../components/grid-card/grid-card";
import { CardContainer } from "../../../components/card-container/card-container";
import { TopTabs } from "../../../components/top-tabs/top-tabs";
import { Titles } from "../../../components/titles/titles";
import { Pagination } from "../../../components/pagination/pagination";


const getShowCard = (data: ShowsOfComedianCardCC): GridCardType => ({
  avgRate: data.avgShowRate,
  extId: data.comedianId,
  extName: data.comedianNik,
  id: data.showId,
  name: data.showName,
  picture: data.mainPicture,
  type: ContentName.Shows,
  extType: ContentName.Comedians,
  viewsCount: data.viewsCount,
  date: data.showDate,
  rateCount: data.rateCount,
})


export function ShowsOfComedian() {

  const { id, search, type, pathname } = useGetIdSearch();

  const { isError, isLoading, data } = useGetShowsOfComedianQuery( {id, search} )

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const {count, data: shows, titles} = data;

  const cards = shows.map((item) =>  {
    const card = getShowCard(item)
    return <GridCard key={item.showId} card={card} />
  })

  const tabProps = { id, type, pathname };

  const { comedianNik, comedianNikEn } = titles

  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;


  return (
    <>
      <Titles native={comedianNik} en={comedianNikEn} />
      <TopTabs tabProps={tabProps} />
      <Filter filters={[FilterName.Year]}/>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>

  )
}
