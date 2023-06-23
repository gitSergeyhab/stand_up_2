import { useLocation } from "react-router-dom";
import { CardContainer } from "../../../components/card-container/card-container";
import { Filter } from "../../../components/filters/filter";
import { GridCard } from "../../../components/grid-card/grid-card";
import { Pagination } from "../../../components/pagination/pagination";
import { Titles } from "../../../components/titles/titles";
import { ContentName, DefaultPageParam, FilterName } from "../../../const/const";
import { useGetComediansQuery } from "../../../store/comedians-api";
import { ComedianCardCC } from "../../../types/comedian-types";
import { GridCardType } from "../../../types/types";
import { CommonAsideContainer } from "../../../components/common/common-style";


const getComedianCard = (data: ComedianCardCC): GridCardType=> ({
  extId: '',
  extName: data.countryName ? `${data.countryName} ${data.comedianCity ? `(${  data.comedianCity  })` : ''}` : '',
  id: data.comedianId,
  name: data.comedianNik,
  picture: data.mainPicture,
  type: ContentName.Comedians,
  extType: ContentName.Countries,
  viewsCount: data.viewsCount,
})



export function ComediansPage() {

  const { search } = useLocation();

  const { isError, isLoading, data } = useGetComediansQuery(search)

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError || !data) {
    return <h2>Error</h2>
  }

  const {count, list } = data;

  const cards = list.map((item) => {
    const card = getComedianCard(item)
    return <GridCard key={item.comedianId} card={card} />
  })


  const filters = [{name: FilterName.Year, title: 'Год рождения'}, {name: FilterName.Country}]
  const pagination = count > DefaultPageParam.Limit ? <Pagination count={count}/> : null;

  return (
    <>
      <Titles native="Комики" en="Comedians" />
      <CommonAsideContainer side="left">
      <Filter filters={filters}/>
      </CommonAsideContainer>

      <CardContainer> {cards} </CardContainer>
      {pagination}
    </>
  )
}
