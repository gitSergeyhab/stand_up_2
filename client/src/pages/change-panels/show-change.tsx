import { useLocation } from "react-router-dom";
import {  useGetPreloadDataQuery } from "../../store/form-data-api";
import { Titles } from "../../components/titles/titles";
import { TopTabs } from "../../components/top-tabs/top-tabs";
import { ContentName } from "../../const/const";
import { TabData } from "../../const/data";
import { ShowState } from "../../types/show-types";
import { ShowForm } from "../../components/forms/show-form";



export function ShowChange () {

  const {isError, data} = useGetPreloadDataQuery(undefined)
  const {state} = useLocation() as {state: ShowState}
  const {pathname} = useLocation();

  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }

  const { languages, places, comedians, events} = data;
  const tabProps = {
    id: state.comedianId,
    type: ContentName.Shows,
    pathname,
    tabData: TabData[ContentName.Shows],
  };

  return (
  <>
    <Titles native={state.showName} en={state.showNameEn || ''} />

    <TopTabs tabProps={tabProps} />

    <section>
      <ShowForm
        comedians={comedians}
        events={events}
        places={places}
        languages={languages}
        state={state}
      />
    </section>

  </>
  )

}
