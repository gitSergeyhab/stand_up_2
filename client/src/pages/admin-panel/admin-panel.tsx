import { useState } from 'react'
import { ContentName } from '../../const/const';
import { FormDataCC, useGetPreloadDataQuery } from '../../store/form-data-api';
import { ShowForm,  } from '../../components/forms/show-form';
import { EventForm } from '../../components/forms/event-form';
import { PlaceForm } from '../../components/forms/place-form';
import { ComedianForm } from '../../components/forms/comedian-form';
import { AdminPanelTabs } from '../../components/admin-panel-tabs/admin-panel-tabs';

import "react-datepicker/dist/react-datepicker.css";


type AdminFormProps = {
  currentTab: ContentName,
  data: FormDataCC
}

function AdminForm({currentTab, data}: AdminFormProps) {
  const {comedians, countries, events, places,  languages} = data || {};// SHOW!!!
  console.log(countries)

  switch (currentTab) {
    case ContentName.Shows : return (
      <ShowForm comedians={comedians} events={events} places={places} languages={languages} />)
    case ContentName.Events : return (
      <EventForm places={places}/>)
    case ContentName.Places : return (
      <PlaceForm countries={countries}/>)
    default : return <ComedianForm countries={countries}/>
  }

}

export function AdminPanel() {

  const [currentTab, setCurrentTab] = useState<ContentName>(ContentName.Comedians);

  const { data, isError } = useGetPreloadDataQuery(undefined);

  if (isError) {
    return <h2> Error!!! </h2>
  }
  if (!data) {
    return <h2> Loading... </h2>
  }

  return (
    <section>
      <AdminPanelTabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <h1>Admin Panel </h1>
      <h2>{currentTab} </h2>
      <AdminForm currentTab={currentTab} data={data}/>
    </section>

  )
}
