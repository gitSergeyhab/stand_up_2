import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { ImgList } from '../../../components/img-list/img-list';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { useGetPicturesQuery } from '../../../store/sub-api';
import { PictureType } from '../../../types/types';
import { getTypes } from '../../../utils/utils';
import { ErrorPage } from '../../error-page/error-page';

export function PagePictureList() {
  const { id } = useParams();

  const { pathname, search } = useLocation();

  const [currentPic, setPic] = useState<PictureType | null>(null);

  const [shownModal, setShownModal] = useState(false);

  const onCloseModal = () => setShownModal(false);

  const handleClickImg = (pic: PictureType) => {
    setShownModal(true);
    setPic(pic);
  };

  const {
    isError,
    isLoading,
    data: res,
    error,
  } = useGetPicturesQuery(pathname + search);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !res) {
    return <BigSpinner />;
  }
  // console.log(res);
  const { count, data, titles } = res;

  const { mainType } = getTypes(pathname);

  const tabProps = { id, type: mainType, pathname };

  const imageModal = shownModal && data && data.length ? (
    <ImageModal
      pictures={data}
      onClose={onCloseModal}
      currentImg={currentPic || data[0]}
      setImg={setPic}
    />
  ) : null;

  return (
    <>
      <Titles native={titles.native} en={titles.en} />

      <TopTabs tabProps={tabProps} />

      <ImgList pictures={data} handleImgClick={handleClickImg} />
      {imageModal}

      {count}
    </>
  );
}
