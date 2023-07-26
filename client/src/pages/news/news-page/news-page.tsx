import { useLocation } from "react-router-dom";
import { CommonAsideContainer } from "../../../components/common/common-style";
import { Pagination } from "../../../components/pagination/pagination";
import { Titles } from "../../../components/titles/titles";
import { DefaultPageParam } from "../../../const/const";
import { useGetNewsListQuery } from "../../../store/news-api";
import { NewsCard } from "../../../components/news-card/news-card";
import { NewsContainerUl } from "./news-page-style";
import { RadioNews } from "../../../components/sorters/radio-news/radio-news";





export function NewsPage() {
  const { search } = useLocation();

  const { isError, isLoading, data } = useGetNewsListQuery(search)

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const  {count, list} = data;


  console.log({data}, '____________NewsPage')
  const cards = list.map((item) => <NewsCard key={item.newsId} news={item}/>)

  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;


  return (
    <>
      <Titles native="Новости" en="" />

      <CommonAsideContainer side="right">
        <RadioNews/>
      </CommonAsideContainer>

      <NewsContainerUl> {cards} </NewsContainerUl>
      {pagination}
    </>
  )
}
