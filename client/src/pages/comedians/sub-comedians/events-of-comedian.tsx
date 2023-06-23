import { Filter } from "../../../components/filters/filter"
import {  DefaultPageParam, FilterName } from "../../../const/const"
import { useGetIdSearch } from "../../../hooks/use-get-id-search";
import { GridCard, } from "../../../components/grid-card/grid-card";
import { CardContainer } from "../../../components/card-container/card-container";
import { TopTabs } from "../../../components/top-tabs/top-tabs";
import { Titles } from "../../../components/titles/titles";
import { useGetEventsOfComedianQuery } from "../../../store/events-api";
import { Pagination } from "../../../components/pagination/pagination";
import { CommonAsideContainer } from "../../../components/common/common-style";



// const getEventCard = (data: EventsOfComedianCardCC): GridCardType => ({
//   extId: data.placeId,
//   extName: data.placeName,
//   id: data.eventId,
//   name: data.eventName,
//   picture: data.mainPicture,
//   type: ContentName.Events,
//   extType: ContentName.Places,
//   viewsCount: data.viewsCount,
//   date: data.eventDate,
// })


export function EventsOfComedian() {

  const { id, search, type, pathname } = useGetIdSearch();

  const { isError, isLoading, data } = useGetEventsOfComedianQuery( {id, search} )

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const {count, list, titles} = data;

  const cards = list.map((item) => <GridCard key={item.id} card={item} />
  )

  const tabProps = { id, type, pathname };

  const { native, en } = titles

  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  const filters = [{name: FilterName.Year, title: 'Год события'}, {name: FilterName.EventStatus, title: 'статус события'}]

  return (
    <>
      <Titles native={native} en={en} />
      <TopTabs tabProps={tabProps} />
      <CommonAsideContainer side="left">
        <Filter filters={filters}/>
      </CommonAsideContainer>

      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
