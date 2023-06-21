import { useLocation } from "react-router-dom";
import { CardContainer } from "../../../components/card-container/card-container";
import { Filter } from "../../../components/filters/filter";
import { GridCard } from "../../../components/grid-card/grid-card";
import { Pagination } from "../../../components/pagination/pagination";
import { Titles } from "../../../components/titles/titles";
import { DefaultPageParam, FilterName } from "../../../const/const";

import { useGetEventsQuery } from "../../../store/events-api";







export function EventsPage() {

  const { search } = useLocation();

  const { isError, isLoading, data } = useGetEventsQuery(search)

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const  {count, list} = data;

  console.log({data})


  const cards = list.map((item) => <GridCard key={item.id} card={item} />)


  const filters = [{name: FilterName.Year, title: 'Год рождения'}]
  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native="События" en="Events" />
      <Filter filters={filters}/>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
