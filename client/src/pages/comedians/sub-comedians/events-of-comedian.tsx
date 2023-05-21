
import { Filter } from "../../../components/filters/filter"
import { ContentName, DefaultPageParam, FilterName } from "../../../const/const"
import { useGetIdSearch } from "../../../hooks/use-get-id-search";
import { GridCard, GridCardType } from "../../../components/grid-card/grid-card";
import { CardContainer } from "../../../components/card-container/card-container";
import { TopTabs } from "../../../components/top-tabs/top-tabs";
import { Titles } from "../../../components/titles/titles";
import { EventsOfComedianCardCC, useGetEventsOfComedianQuery } from "../../../store/events-api";
import { Pagination } from "../../../components/pagination/pagination";



const getEventCard = (data: EventsOfComedianCardCC): GridCardType => ({
  extId: data.placeId,
  extName: data.placeName,
  id: data.eventId,
  name: data.eventName,
  picture: data.mainPicture,
  type: ContentName.Events,
  extType: ContentName.Places,
  viewsCount: data.viewsCount,
  date: data.eventDate,
})


export function EventsOfComedian() {

  const { id, search, type, pathname } = useGetIdSearch();

  const { isError, isLoading, data } = useGetEventsOfComedianQuery( {id, search} )

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const {count, data: events, titles} = data;

  const cards = events.map((item) => {
    const card = getEventCard(item)
    return <GridCard key={item.eventId} card={card} />
  })

  const tabProps = { id, type, pathname };

  const { comedianNik, comedianNikEn } = titles

  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native={comedianNik} en={comedianNikEn} />
      <TopTabs tabProps={tabProps} />
      <Filter filters={[FilterName.Year, FilterName.EventStatus]}/>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
