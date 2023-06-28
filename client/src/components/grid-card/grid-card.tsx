import { DefaultPath, SERVER_URL } from '../../const/const';
import { GridCardType } from '../../types/types';
import { getFormatDate } from '../../utils/date-utils';
import { roundToPoints } from '../../utils/utils';
import { Badge } from '../badge/badge';
import { AbsoluteDiv, TopLeftDiv } from '../common/common-style';
import { Card, CardContent, CardLink, CardTitleLink, DateCard, ExtLink, ExtNoLink, Img,/* RateCard, */ StatusCard, TitleCard } from './grid-card-style';





export function GridCard({ card }: { card: GridCardType }) {
  const {
    id, name,
    picture,
    extId, extName,
    avgRate,  userRate,  viewsCount, rateCount,
    type, extType,
    date,  status
  } = card;
  const image = picture ? `${SERVER_URL}${picture}` : DefaultPath.Any;
  const to = `/${type}/${id}/info`;
  const toExt = extId ? `/${extType}/${extId || ''}/info` : '';

  const titleElement = <TitleCard> {name} </TitleCard>
  const dateElement = date ? (
    <DateCard> {getFormatDate(date, 'DD.MM.YYYY')} </DateCard>
  ) : null;
  const statusElement = status ? <StatusCard> {status} </StatusCard> : null;


  const rateBadge = avgRate ? (
    <Badge
      first={roundToPoints(avgRate)}
      firstColor='orange'
      second={rateCount}
      secondColor='#FFF'
      title='средняя оценка (количество оценок)'
    />
  ) : null;


  const userRateBadge = userRate ? (
    <Badge
      first={roundToPoints(userRate.rate)}
      firstColor='orange'
      title='ваша оценка'
    />
  ) : null;

  const countBadge = +viewsCount ? (
    <Badge
      first={viewsCount}
      firstColor='#FFF'
      title='количество просмотров'
    />
  ) : null

  const extLink = toExt ? <ExtLink to={toExt}>{extName}</ExtLink> : <ExtNoLink>{extName}</ExtNoLink>;

  return (
    <Card>
      <CardLink to={to}>
        <Img src={image} />
      </CardLink>
      <CardContent>
        <CardTitleLink to={to}>
          {titleElement}
        </CardTitleLink>

        {dateElement}
        {statusElement}
        {extLink}
        <TopLeftDiv>{rateBadge}{countBadge}</TopLeftDiv>
        <AbsoluteDiv height='top' side='right'>{userRateBadge}</AbsoluteDiv>
      </CardContent>
    </Card>
  );
}
