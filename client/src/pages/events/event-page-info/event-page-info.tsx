import { useLocation, useParams } from 'react-router-dom';
import { AboutBlock } from '../../../components/about-block/about-block';
import { MainPic } from '../../../components/main-pic/main-pic';
import { ResourceBlock } from '../../../components/resource-block/resource-block';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { ViewsBlock } from '../../../components/views-block/views-block';
import { ContentName } from '../../../const/const';
import { TabData } from '../../../const/data';
import { useGetEventByIdQuery } from '../../../store/events-api';
import { ErrorPage } from '../../error-page/error-page';

export function EventPageInfo() {
  const { id } = useParams();
  const { pathname } = useLocation();

  // console.log(id);

  const { data, isError, isLoading, error } = useGetEventByIdQuery(
    id as string,
  );
  console.log(data, 'EventPageInfo');

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data /* || 1 + 1 === 2 */) {
    return <BigSpinner />;
  }

  const {
    eventDateAdded,
    eventId,
    eventName,
    eventStatus,
    totalViews,
    views,
    eventDate,
    eventDescription,
    eventNameEn,eventResources,
    mainPicture,
    placeId,
    placeName,
    userId,
    userNik,
    userPicture,
    placeCity,
    placeCountryId,
    placeCountryName,
    placePicture

  } = data;

  const tabProps = {
    id,
    type: ContentName.Events,
    pathname,
    tabData: TabData[ContentName.Events],
  };

  const about = [
    { point: 'Событие', value: eventName },
    { point: 'Страна', value: placeCountryName },
    { point: 'Город', value: placeCity},
    { point: 'Площадка', value: placeName, href: placeId ? `/places/${placeId}/info`: undefined, src: placePicture  },
    { point: 'Дата', value: eventDate },
    { point: 'Статус', value: eventStatus },
  ];



  return (
    <>
      <Titles native={eventName} en={eventNameEn || ''} />

      <TopTabs tabProps={tabProps} />

      <MainPic src={mainPicture} alt={eventName} />

      <ViewsBlock totalViews={totalViews} views={views} />

      <AboutBlock about={about} />
      <p>{eventDescription}</p>

      <ResourceBlock resources={eventResources} />
    </>
  );
}
