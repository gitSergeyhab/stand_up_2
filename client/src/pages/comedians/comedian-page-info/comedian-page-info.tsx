import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { AboutBlock } from '../../../components/about-block/about-block';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { MainPic } from '../../../components/main-pic/main-pic';
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
import { ImgListInfo } from '../../../components/img-list-info/img-list-info';
import { LongLink } from '../../../components/common/common-style';
import { linkifyText } from '../../../utils/format-text';

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
    // avgRate,
    // numberOfRate,
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
    comedianNik,
    comedianId,
    countryId,
    comedianCityEn,
    comedianSecondName,
    comedianSecondNameEn,
    comedianNikEn
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

  const imageListElement = pictures && pictures.length ? (
    <ImgListInfo
      handleImgClick={handleClickImg}
      pictures={pictures.slice(0, 3)}
    />
  ) : null;



  const testText  = `
  По словам женщины, поначалу зрители не вызвали особых подозрений. Были дерзкими, {& Комисаренко #> /comedians/1/info &} но трезвыми и опрятными. «Они просидели практически все мероприятие.{& comedian-test@> http://localhost:5000/images/comedians/olnii-koncert-komika-Slavi-Komissarenko-sostoitsya-vBreste-22-aprelya_1685558128836.jpg&}
  Пять комиков выступили, все шло в штатном режиме, и они ни с того ни с сего посреди выступления молодого комика просто встали и разделись. {&Денис Чужо #>/comedians/4/info&} После того как они разделись, они оделись и ушли», — поделилась Колокол.
   Все это длилось около полутора минут, персонал даже не успел никак отреагировать, отметила она.

  `
  const split = linkifyText(testText);


  return (
    <>
      <Titles
        native={comedianNik}
        en={`${comedianFirstNameEn || ''} ${comedianLastNameEn || ''}`}
      />

      <TopTabs tabProps={tabProps} />

      <LongLink
        to={`/comedians/${id}/change`}
        state={{
          comedianId,
          comedianDateBirth,
          comedianDateDeath,
          comedianDescription,
          comedianSecondName,
          comedianSecondNameEn,
          comedianFirstName,
          comedianLastName,
          comedianLastNameEn,
          comedianFirstNameEn,
          comedianNik,
          comedianNikEn,
          countryId,
          comedianCity,
          comedianCityEn,
          countryName,
          mainPicture
        }}
      >Изменить</LongLink>

      <MainPic
        src={mainPicture}
        alt={`${comedianFirstName} ${comedianLastName || ''}`}
      />

      {/* <Rating avgRate={avgRate} votes={numberOfRate} showId={sh} /> */}

      <ViewsBlock totalViews={totalViews} views={views} />

      <AboutBlock about={goodAbout} />
      <p>{comedianDescription}</p>



{split}
      <ResourceBlock resources={resources} />

      {imageListElement}
      {imageModal}
    </>
  );
}

// my-rate
