import { DefaultPath, SERVER_URL } from '../../const/const';
import { GridCardType } from '../../types/types';
import { getFormatDate } from '../../utils/date-utils';
import { roundToPoints } from '../../utils/utils';
import { Badge, BadgeSquireDiv } from '../badge/badge';
import { AbsoluteDiv, SmallSup, TopLeftDiv } from '../common/common-style';
import { Card, CardContent, CardLink, CardTitleLink, DateCard, ExtLink, ExtNoLink, Img,/* RateCard, */ StatusCard, TitleCard } from './grid-card-style';





export function GridCard({ card }: { card: GridCardType }) {
  const {
    id, name,
    picture,
    extId, extName,
    avgRate,  userRate, rateCount, totalViews, weeklyViews,
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
      type='rate'
    />
  ) : null;




  const userRateBadge = userRate ? (
    <BadgeSquireDiv title='моя оценка'>{userRate.rate} <SmallSup>★</SmallSup></BadgeSquireDiv>
  ) : null;

  const viewsBadge = (totalViews && +totalViews) ? (
    <Badge
      first={weeklyViews || 0}
      firstColor='#FFF'
      title='количество просмотров за неделю (и за всё время)'
      second={totalViews}
      secondColor='#ddb31b'
    />
  ) : null;

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
        <TopLeftDiv>{rateBadge}{viewsBadge}</TopLeftDiv>
        <AbsoluteDiv height='top' side='right'>{userRateBadge}</AbsoluteDiv>
      </CardContent>
    </Card>
  );
}
