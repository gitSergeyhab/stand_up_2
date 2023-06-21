import { useLocation } from "react-router-dom";
import { useGetPreloadCountriesQuery } from "../../store/form-data-api";
import { Titles } from "../../components/titles/titles";
import { TopTabs } from "../../components/top-tabs/top-tabs";
import { ContentName } from "../../const/const";
import { TabData } from "../../const/data";
import { ComedianState } from "../../types/comedian-types";
import { ComedianForm } from "../../components/forms/comedian-form";



export function ComedianChange () {

  const {isError, data} = useGetPreloadCountriesQuery(undefined)
  const {state} = useLocation() as {state: ComedianState}
  const {pathname} = useLocation();

  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }

  const tabProps = {
    id: state.comedianId,
    type: ContentName.Comedians,
    pathname,
    tabData: TabData[ContentName.Comedians],
  };

  return (
  <>
    <Titles native={state.comedianNik} en={state.comedianNikEn || ''} />

    <TopTabs tabProps={tabProps} />

    <section>
      <ComedianForm countries={data} state={state}/>
    </section>

  </>
  )

}
