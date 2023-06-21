import { useLocation } from "react-router-dom";
import { PlaceForm } from "../../components/forms/place-form";
import { useGetPreloadCountriesQuery } from "../../store/form-data-api";
import { PlaceState } from "../../types/place-types";
import { Titles } from "../../components/titles/titles";
import { TopTabs } from "../../components/top-tabs/top-tabs";
import { ContentName } from "../../const/const";
import { TabData } from "../../const/data";



export function PlaceChange () {

  const {isError, data} = useGetPreloadCountriesQuery(undefined)
  const {state, pathname} = useLocation() as {state: PlaceState, pathname: string}

  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }

  const tabProps = {
    id: state.placeId,
    type: ContentName.Places,
    pathname,
    tabData: TabData[ContentName.Places],
  };

  return (
  <>
    <Titles native={state.placeName} en={state.placeNameEn || ''} />

    <TopTabs tabProps={tabProps} />

    <section>
      <PlaceForm countries={data} state={state}/>
    </section>

  </>
  )

}
