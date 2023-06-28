import { useLocation } from "react-router-dom";
import { CardContainer } from "../../../components/card-container/card-container";
import { Filter } from "../../../components/filters/filter";
import { GridCard } from "../../../components/grid-card/grid-card";
import { Pagination } from "../../../components/pagination/pagination";
import { Titles } from "../../../components/titles/titles";
import { DefaultPageParam, FilterName } from "../../../const/const";
import { useGetShowsQuery } from "../../../store/shows-api";
import { CommonAsideContainer } from "../../../components/common/common-style";



export function ShowsPage() {

  const { search } = useLocation();



  const { isError, isLoading, data } = useGetShowsQuery(search);
  console.log({data})

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }


  const  {count, list} = data;


  const cards = list.map((item) => <GridCard key={item.id} card={item}  />)


  const filters = [{name: FilterName.Year, title: 'Год выступленя'}, {name: FilterName.Language, title: 'Язык'}]
  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native="Выступления" en="Shows" />
      <CommonAsideContainer side="left">
        <Filter filters={filters}/>
      </CommonAsideContainer>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
