import { useLocation } from "react-router-dom";
import { Titles } from "../../components/titles/titles";
import { TopTabs } from "../../components/top-tabs/top-tabs";
import { ContentName } from "../../const/const";
import { TabData } from "../../const/data";
import { ShowState } from "../../types/show-types";
import { ShowForm } from "../../components/forms/show-form";



export function ShowChange () {
  const {state} = useLocation() as {state: ShowState}
  const {pathname} = useLocation();

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
      <ShowForm state={state}/>
    </section>

  </>
  )

}
