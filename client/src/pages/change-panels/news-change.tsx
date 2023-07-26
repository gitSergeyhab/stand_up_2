import { useLocation } from "react-router-dom";
import { useGetPreloadCountriesQuery } from "../../store/form-data-api";
import { Titles } from "../../components/titles/titles";
import { NewsForm } from "../../components/forms/news-form";
import { NewsState } from "../../types/news-types";



export function NewsChange () {

  const {isError, data} = useGetPreloadCountriesQuery(undefined)
  const {state} = useLocation() as {state: NewsState}

  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }



  return (
  <>
    <Titles native={state.newsTitle} en="" />
    <section>
      <NewsForm state={state}/>
    </section>
  </>
  )

}
