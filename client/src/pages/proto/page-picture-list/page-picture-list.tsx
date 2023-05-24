import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { ImgList } from '../../../components/img-list/img-list';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { getTypes } from '../../../utils/utils';
import { ErrorPage } from '../../error-page/error-page';
import { ImageCC, useGetImagesQuery } from '../../../store/images-api';
import { ImageFieldMultiUpload } from '../../../components/image-form-multi-upload/image-field-multi-upload';

export function PagePictureList() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { isError, isLoading, data: res, error } = useGetImagesQuery(pathname);

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

  if (isLoading || !res) {
    return <BigSpinner />;
  }

  const { count, data, titles } = res;
  console.log({res})

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
      <ImageFieldMultiUpload/>
      <ImgList pictures={data} handleImgClick={handleClickImg} />
      {imageModal}
      {count}
    </>
  );
}
