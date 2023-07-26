import { useState } from 'react'
import { ContentName } from '../../const/const';
import { ShowForm,  } from '../../components/forms/show-form';
import { EventForm } from '../../components/forms/event-form';
import { PlaceForm } from '../../components/forms/place-form';
import { ComedianForm } from '../../components/forms/comedian-form';
import { AdminPanelTabs } from '../../components/admin-panel-tabs/admin-panel-tabs';

import "react-datepicker/dist/react-datepicker.css";
import { NewsForm } from '../../components/forms/news-form';


type AdminFormProps = {
  currentTab: ContentName,
}

function AdminForm({currentTab}: AdminFormProps) {

  switch (currentTab) {
    case ContentName.Shows : return <ShowForm />
    case ContentName.Events : return <EventForm />
    case ContentName.Places : return  <PlaceForm />
    case ContentName.News: return <NewsForm/>
    default : return <ComedianForm />
  }

}

export function AdminPanel() {

  const [currentTab, setCurrentTab] = useState<ContentName>(ContentName.Comedians);



  return (
    <section>
      <AdminPanelTabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <h1>Admin Panel </h1>
      <h2>{currentTab} </h2>
      <AdminForm currentTab={currentTab}/>
    </section>

  )
}
