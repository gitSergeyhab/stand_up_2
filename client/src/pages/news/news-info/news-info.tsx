import { useParams } from 'react-router-dom';
import { MainPic } from '../../../components/main-pic/main-pic';
import { BigSpinner } from '../../../components/spinner/big-spinner';
import { Titles } from '../../../components/titles/titles';
import { ViewsBlock } from '../../../components/views-block/views-block';
import { ErrorPage } from '../../error-page/error-page';
import { useGetNewsByIdQuery } from '../../../store/news-api';
import { linkifyText } from '../../../utils/format-text';
import { formatDateFromTimeStamp } from '../../../utils/date-utils';
import { LongLink, UserLink } from '../../../components/common/common-style';
import { DateUserDiv } from './news-info-style';



export function NewsPageInfo() {
  const { id } = useParams() as { id: string };

  const { data, isError, isLoading, error } = useGetNewsByIdQuery(id);

  console.log({data})
  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data ) {
    return <BigSpinner />;
  }

  console.log({data})

  const {
    dateAdded, dateUpdated,
    newsId,
    newsText, newsTitle, mainPicture,
    totalViews, weeklyViews,
    userId, userNik,
    // userImg
  } = data;


  const adaptedText = linkifyText(newsText)

  const [formatDateAdded, formatDateChanged] = [dateAdded, dateUpdated].map(formatDateFromTimeStamp)

  const image = mainPicture ? <MainPic src={mainPicture} alt={newsTitle} /> : null;

  return (
    <>
      <Titles native={newsTitle} en="" />

      <LongLink
        to={`/news/${id}/change`}
        state={{ newsId, newsText, newsTitle, mainPicture }}
      >Изменить</LongLink>
      {image}
      {adaptedText}
      <ViewsBlock totalViews={totalViews} views={weeklyViews} />
      <DateUserDiv>
        <UserLink to={`/users/${userId}`}>{userNik}</UserLink>
        <div>
          {formatDateAdded} (изменено {formatDateChanged})
        </div>
      </DateUserDiv>
    </>
  );
}
