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
import { ErrorPage } from '../../error-page/error-page';
import { useGetShowByIdQuery } from '../../../store/shows-api';
import { LongLink } from '../../../components/common/common-style';

export function ShowPageInfo() {
  const { id } = useParams();
  const { pathname } = useLocation();

  // console.log(id);

  const { data, isError, isLoading, error } = useGetShowByIdQuery(
    id as string,
  );
  console.log(data, 'ShowPageInfo');

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data) {
    return <BigSpinner />;
  }

  const {
    comedianId, comedianNik, comedianNikEn,
    showDateAdded, showId, showName, showDate, showNameEn, showDescription,
    totalViews, views, avgRate, numberOfRate,
    countryId, countryName, countryNameEn,
    eventId, eventName, eventNameEn,
    eventPicture, showPicture, placePicture, comedianPicture,
    languageId, languageName, languageNameEn,
    placeId, placeName, placeNameEn,
    userId, userNik, videos
  } = data;

  console.log({data}, {showDescription})
  const tabProps = {
    id,
    type: ContentName.Shows,
    pathname,
    tabData: TabData[ContentName.Shows],
  };

  const about = [
    { point: 'Шоу', value: showName },
    { point: 'комик', value: comedianNik, href: comedianId ? `/comedians/${comedianId}/info`: undefined, src: comedianPicture },
    { point: 'Событие', value: eventName, href: eventId ? `/events/${eventId}/info`: undefined, src: eventPicture  },
    { point: 'Страна', value: countryName || '' },
    { point: 'Площадка', value: placeName || '', href: placeId ? `/places/${placeId}/info`: undefined, src: placePicture  },
    { point: 'Дата', value: showDate || '' },
  ];

  return (
    <>
      <Titles native={showName} en={showNameEn || ''} />

      <TopTabs tabProps={tabProps} />
      <LongLink
        to={`/shows/${id}/change`}
        state={{
          showId, showName, showNameEn,
          comedianId, comedianNik,
          eventId, eventName,
          placeId, placeName,
          languageId, languageName,
          showDescription, showDate, showPicture
        }}
      >Изменить</LongLink>

      <MainPic src={showPicture} alt={showName} />

      <ViewsBlock totalViews={totalViews} views={views} />

      <AboutBlock about={about} />
      <p>{showDescription}</p>

      {/* <ResourceBlock resources={eventResources} /> */}
    </>
  );
}
