import { useLocation } from "react-router-dom";
import { useGetPreloadPlacesQuery } from "../../store/form-data-api";
import { Titles } from "../../components/titles/titles";
import { TopTabs } from "../../components/top-tabs/top-tabs";
import { ContentName } from "../../const/const";
import { TabData } from "../../const/data";
import { EventState } from "../../types/event-types";
import { EventForm } from "../../components/forms/event-form";



export function EventChange () {

  const {isError, data} = useGetPreloadPlacesQuery(undefined)
  const {state, pathname} = useLocation() as {state: EventState, pathname: string}


  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }


  const tabProps = {
    id: state.eventId,
    type: ContentName.Events,
    pathname,
    tabData: TabData[ContentName.Events],
  };

  return (
  <>
    <Titles native={state.eventName} en={state.eventNameEn || ''} />

    <TopTabs tabProps={tabProps} />

    <section>
      <EventForm places={data} state={state}/>
    </section>

  </>
  )

}
