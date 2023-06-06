import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { AboutBlock } from '../../../components/about-block/about-block';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { ImgList } from '../../../components/img-list/img-list';
import { MainPic } from '../../../components/main-pic/main-pic';
import { Rating } from '../../../components/rating/rating';
import { ResourceBlock } from '../../../components/resource-block/resource-block';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { ContentName } from '../../../const/const';
import { ViewsBlock } from '../../../components/views-block/views-block';
import { TabData } from '../../../const/data';
import { useGetComedianByIdQuery } from '../../../store/comedians-api';
import { ErrorPage } from '../../error-page/error-page';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { ImageCC } from '../../../types/pic-types';

export function ComedianPageInfo() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { isError, isLoading, data: comedian, error } = useGetComedianByIdQuery(id as string);

  const [currentPic, setPic] = useState<ImageCC | null>(null);

  const [shownModal, setShownModal] = useState(false);

  const onCloseModal = () => setShownModal(false);

  const handleClickImg = (pic: ImageCC) => {
    setShownModal(true);
    setPic(pic);
  };

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !comedian /* || 1 + 1 === 2 */) {
    return <BigSpinner />;
  }

  const {
    avgRate,
    numberOfRate,
    views,
    totalViews,
    comedianCity,
    countryName,
    comedianDateBirth,
    comedianDateDeath,
    comedianDescription,
    comedianFirstName,
    comedianLastName,
    comedianLastNameEn,
    comedianFirstNameEn,
    pictures,
    resources,
    mainPicture,
    comedianNik
  } = comedian;

  const about = [
    { point: 'Псевдоним', value: comedianNik },
    { point: 'Имя', value: comedianFirstName },
    { point: 'Фамилия', value: comedianLastName || comedianLastName || '' },
    { point: 'Страна рождения', value: countryName || '' },
    { point: 'Город рождения', value: comedianCity || '' },
    { point: 'Дата рождения', value: comedianDateBirth || '' },
    {
      point: comedianDateDeath ? 'Дата смерти' : '',
      value: comedianDateBirth || '',
    },
  ];



  const goodAbout = about.filter((item) => item.point);

  const tabProps = {
    id,
    type: ContentName.Comedians,
    pathname,
    tabData: TabData[ContentName.Comedians],
  };

  const imageModal = shownModal && pictures && pictures.length ? (
    <ImageModal
      pictures={pictures}
      onClose={onCloseModal}
      currentImg={currentPic || pictures[0]}
      setImg={setPic}
    />
  ) : null;

  // const imageListElement = pictures && pictures.length ? (
  //   <ImgList
  //     handleImgClick={handleClickImg}
  //     pictures={pictures.slice(0, 3)}
  //     isInfo
  //   />
  // ) : null;

  return (
    <>
      <Titles
        native={comedianNik}
        en={`${comedianFirstNameEn || ''} ${comedianLastNameEn || ''}`}
      />

      <TopTabs tabProps={tabProps} />

      <MainPic
        src={mainPicture}
        alt={`${comedianFirstName} ${comedianLastName || ''}`}
      />

      <Rating avgRate={avgRate} votes={numberOfRate} checkedValue={8} />

      <ViewsBlock totalViews={totalViews} views={views} />

      <AboutBlock about={goodAbout} />
      <p>{comedianDescription}</p>

      <ResourceBlock resources={resources} />

      {/* {imageListElement} */}
      {imageModal}
    </>
  );
}

// my-rate
