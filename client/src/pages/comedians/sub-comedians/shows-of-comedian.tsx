import { Filter } from "../../../components/filters/filter"
import { DefaultPageParam, FilterName } from "../../../const/const"
import { useGetIdSearch } from "../../../hooks/use-get-id-search";
import {  useGetShowsOfComedianQuery } from "../../../store/shows-api"
import { GridCard } from "../../../components/grid-card/grid-card";
import { CardContainer } from "../../../components/card-container/card-container";
import { TopTabs } from "../../../components/top-tabs/top-tabs";
import { Titles } from "../../../components/titles/titles";
import { Pagination } from "../../../components/pagination/pagination";



export function ShowsOfComedian() {

  const { id, search, type, pathname } = useGetIdSearch();
  const { isError, isLoading, data } = useGetShowsOfComedianQuery( {id, search} )

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const {count, list, titles} = data;
  const cards = list.map((item) =>   <GridCard key={item.id} card={item} />)
  const tabProps = { id, type, pathname };
  const { native, en } = titles;
  const filters = [{name: FilterName.Year, title: 'Год выступления'}]
  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native={native} en={en} />
      <TopTabs tabProps={tabProps} />
      <Filter filters={filters}/>
      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>

  )
}
