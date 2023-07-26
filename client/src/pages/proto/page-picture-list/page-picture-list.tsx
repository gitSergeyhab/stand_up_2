import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ImageModal } from '../../../components/image-modal/image-modal';
import { ImgList } from '../../../components/img-list/img-list';
import { Titles } from '../../../components/titles/titles';
import { TopTabs } from '../../../components/top-tabs/top-tabs';
import { getTypes } from '../../../utils/utils';
import { ErrorPage } from '../../error-page/error-page';
import { useGetImagesQuery} from '../../../store/images-api';
import { ImageFieldMultiUpload } from '../../../components/image-form-multi-upload/image-field-multi-upload';
import { ImageCC} from '../../../types/pic-types';

import { BigSpinner } from '../../../components/spinner/big-spinner';
import { SideDeletingPanel } from '../../../components/side-deleting-panel/side-deleting-panel';
import { CommonAsideContainer } from '../../../components/common/common-style';
import { CopyPathBtn } from '../../../components/copy-path-btn/copy-path-btn';


export function PagePictureList() {

  const { id } = useParams();
  const { pathname } = useLocation();
  const { data, isError, isLoading } = useGetImagesQuery({pathname})
  const [currentPic, setPic] = useState<ImageCC | null>(null);
  const [shownModal, setShownModal] = useState(false);
  const [isPressed, setPressed] = useState(false);

  const [idList, setIdList] = useState<string[]>([]);
  const [areMarkersHidden, setMarkersHidden] = useState(true)

  const onCloseModal = () => setShownModal(false);
  const handleClickImg = (pic: ImageCC) => {
    setShownModal(true);
    setPic(pic);
  };

  if (isError) {
    return <ErrorPage altTitles={{ en: 'Image Error', ru: 'Ошибка загрузки изображений'}}/>
  }

  if (isLoading || !data) {
    return <BigSpinner/>
  }

  const { mainType } = getTypes(pathname);
  const tabProps = { id, type: mainType, pathname };

  const imageModal = shownModal && data.list && data.list.length ? (
    <ImageModal
      pictures={data.list}
      onClose={onCloseModal}
      currentImg={currentPic || data.list[0]}
      setImg={setPic}
    />
  ) : null;


  return (
    <>
      <Titles native={data.titles.native} en={data.titles.en} />
      <TopTabs tabProps={tabProps} />
      <CommonAsideContainer side="right">
        <ImageFieldMultiUpload/>
        <SideDeletingPanel
            idList={idList}
            setIdList={setIdList}
            hidden={areMarkersHidden}
            setHidden={setMarkersHidden}
        />
        <CopyPathBtn isPressed={isPressed} setPressed={setPressed}/>
      </CommonAsideContainer>

      <ImgList
        pictures={data.list}
        handleImgClick={handleClickImg}
        idList={idList}
        setIdList={setIdList}
        hidden={areMarkersHidden}
        isPressed={isPressed}
      />

      {imageModal}
    </>
  );
}

