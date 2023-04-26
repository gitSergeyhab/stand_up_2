import { DefaultPath } from '../../const/const';
import { DataRateCC } from '../../types/types';
import { formatRateDate } from '../../utils/date-utils';
import {
  AvatarContainer,
  Date,
  MyRate,
  NikDateContainer,
  RateContainer,
  UserImg,
  UserLink,
  VoteLi,
} from './vote-style';

export function Vote({ vote }: { vote: DataRateCC }) {
  const { date, userAvatar, userId, userNik, rate } = vote;

  const formatDate = formatRateDate(date);

  return (
    <VoteLi>
      <AvatarContainer to={`/users/${userId}`}>
        <UserImg src={userAvatar || DefaultPath.Any} alt={userNik} />
      </AvatarContainer>
      <NikDateContainer>
        <UserLink to={`/users/${userId}`}>
          <h3>{userNik}</h3>
        </UserLink>
        <Date>{formatDate}</Date>
      </NikDateContainer>
      <RateContainer>
        <h3>{rate}</h3>
        <MyRate>6</MyRate>
      </RateContainer>
    </VoteLi>
  );
}
