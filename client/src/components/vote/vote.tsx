import { DefaultPath, SERVER_URL } from "../../const/const";
import { FlexDiv } from "../../pages/comedians/sub-comedians/ratings-of-comedian-style";
import { ComedianShowRatingCC } from "../../types/rating-types";
import { formatDateType } from "../../utils/date-utils";
import { trim } from "../../utils/utils";
import { Badge } from "../badge/badge";
import { BadgeSector, DateDiv, ShowLink, SmallImg, UserLink, UserRateDiv, VoteLi, VoteSector } from "./vote-style";



export function Vote({vote}: {vote: ComedianShowRatingCC}) {
  const {
    avgShowRate, showDateRate, showId, showName, showRate,
    totalViews, weeklyViews,
    userId, userNik,
    showPicture, userAvatar
  } = vote;

  const userImg = <SmallImg src={userAvatar ? `${SERVER_URL}${userAvatar}` : DefaultPath.Any}/>
  const showImg = <SmallImg src={showPicture ? `${SERVER_URL}${showPicture}` : DefaultPath.Any}/>

  const dateTime = <DateDiv>{formatDateType(showDateRate)}</DateDiv>
  return (
    <VoteLi>

      <VoteSector>
        <ShowLink to={`/shows/${showId}/info`}>{showImg}{trim(showName)}</ShowLink>
        <BadgeSector>
          <Badge first={avgShowRate} title="средняя оценка"/>
          <Badge first={weeklyViews} second={totalViews} title="просмотры за неделю (и за все время)"/>
        </BadgeSector>

      </VoteSector>
      <VoteSector>
        <FlexDiv>
          <UserRateDiv title="оценка пользователя">{showRate}</UserRateDiv>
          <UserLink to={`/users/${userId}`}>{userImg}{trim(userNik)}</UserLink>
        </FlexDiv>
        {dateTime}
      </VoteSector>

    </VoteLi>
  )
}
