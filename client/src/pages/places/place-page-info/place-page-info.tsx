import {  useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { AboutBlock, AboutRowType } from '../../../components/about-block/about-block';
import { MainPic } from '../../../components/main-pic/main-pic';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { ViewsBlock } from '../../../components/views-block/views-block';
import { ContentName } from '../../../const/const';
import { TabData } from '../../../const/data';
import { ErrorPage } from '../../error-page/error-page';
import { useGetPlaceByIdQuery } from '../../../store/places-api';
import { ResourceBlock } from '../../../components/resource-block/resource-block';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { ImageCC } from '../../../types/pic-types';
import { ImgListInfo } from '../../../components/img-list-info/img-list-info';
import { LongLink } from '../../../components/common/common-style';

export function PlacePageInfo() {
  const { id } = useParams() as { id: string };
  const { pathname } = useLocation();

  const [currentPic, setPic] = useState<ImageCC | null>(null);
  const [shownModal, setShownModal] = useState(false);

  const onCloseModal = () => setShownModal(false);

  const handleClickImg = (pic: ImageCC) => {
    setShownModal(true);
    setPic(pic);
  };

  const { data, isError, isLoading, error } = useGetPlaceByIdQuery(id);
  console.log(data, 'PlacePageInfo');

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data /* || 1 + 1 === 2 */) {
    return <BigSpinner />;
  }

  const {
    placeDateAdded, placeDateClosed, placeDateFounded,
    placeId, placeName, placeNameEn,
    totalViews, views,
    countryId, countryName, countryNameEn,
    mainPicture, userPicture,
    pictures, resources,
    placeCity, placeCityEn,
    placeDescription,
    userId, userNik
  } = data;

  console.log({data, mainPicture})

  const tabProps = {
    id,
    type: ContentName.Places,
    pathname,
    tabData: TabData[ContentName.Places],
  };

  const imageModal = shownModal && pictures && pictures.length ? (
    <ImageModal
      pictures={pictures as unknown as ImageCC[]}
      onClose={onCloseModal}
      currentImg={currentPic || pictures[0]}
      setImg={setPic}
    />
  ) : null;

  const about: AboutRowType[] = [
    { point: 'Название', value: placeName, src: mainPicture},
    { point: 'Страна', value: countryName },
    { point: 'Город', value: placeCity  || placeCityEn },
    { point: 'Основан', value: placeDateFounded },
    { point: 'Закрыт', value: placeDateClosed },
  ];

  const imageListElement = pictures && pictures.length ? (
    <ImgListInfo
      handleImgClick={handleClickImg}
      pictures={pictures.slice(0, 3)}
    />
  ) : null;

  return (
    <>
      <Titles native={placeName} en={placeNameEn || ''} />

      <TopTabs tabProps={tabProps} />
      <LongLink
        to={`/places/${id}/change`}
        state={{
          placeId,
          placeName, placeNameEn,
          countryId, countryName, placeCity, placeCityEn,
          mainPicture,
          placeDescription,
          placeDateClosed, placeDateFounded
        }}
      >Изменить</LongLink>

      <MainPic src={mainPicture} alt={placeName} />

      <ViewsBlock totalViews={totalViews} views={views} />

      <AboutBlock about={about} />
      <p>{placeDescription}</p>

      <ResourceBlock resources={resources} />

      {imageListElement}
      {imageModal}

    </>
  );
}
