import {  Dispatch, SetStateAction } from 'react'


import { ContentName } from '../../const/const'
import { Tab, TabButton, TabList } from './admin-panel-tabs-style';

const ADMIN_TABS = [
  ContentName.Comedians, ContentName.Events, ContentName.Places, ContentName.Shows
]

type AdminTabProps = {
  tab: ContentName,
  onTabClick: Dispatch<SetStateAction<ContentName>>
  isCurrent: boolean
}

function AdminTab({tab, onTabClick, isCurrent}: AdminTabProps) {

  const handleTabClick = () => onTabClick(tab);
  return (
    <TabButton onClick={handleTabClick} isCurrent={isCurrent} type='button'>
      {tab}
    </TabButton>
  )
}


type AdminPanelTabsProps = {
  currentTab: ContentName,
  setCurrentTab: Dispatch<SetStateAction<ContentName>>
}
export function AdminPanelTabs ({currentTab, setCurrentTab} : AdminPanelTabsProps) {


  const tabs = ADMIN_TABS.map((item) =>
    <Tab key={item}>
      <AdminTab onTabClick={setCurrentTab} isCurrent={currentTab === item} tab={item}/>
    </Tab>
  )

  return (
    <TabList>
      {tabs}
    </TabList>
  )
}



