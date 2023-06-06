import { useLocation } from "react-router-dom";
import { CardContainer } from "../../../components/card-container/card-container";
import { Filter } from "../../../components/filters/filter";
import { GridCard } from "../../../components/grid-card/grid-card";
import { Pagination } from "../../../components/pagination/pagination";
import { Titles } from "../../../components/titles/titles";
import { DefaultPageParam, FilterName } from "../../../const/const";
import { useGetShowsQuery } from "../../../store/shows-api";



export function ShowsPage() {

  const { search } = useLocation();

  const { isError, isLoading, data } = useGetShowsQuery(search)

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  console.log({data})
  const  {count, list} = data;


  const cards = list.map((item) => <GridCard key={item.id} card={item} />)


  const filters = [{name: FilterName.Year, title: 'Год выступленя'}]
  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native="Выступления" en="Shows" />
      <Filter filters={filters}/>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
