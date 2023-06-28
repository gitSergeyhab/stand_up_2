import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { round1 } from '../../utils/utils';
import { LineDiv, RatingInput, RatingLabel, RatingSection, StarsDiv, UserRateDiv, VotesSpan } from './rating-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { usePostShowRateMutation } from '../../store/shows-api';
import { RatingCC } from '../../types/user-types';


const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type RadioBtnProps = {
  value: number;
  checkedValue?: number;
  showId: string;
};

function RadioBtn({ value, checkedValue,  showId }: RadioBtnProps) {
  const id = `star${value}`;

  const [rateShow] = usePostShowRateMutation()

  const handleClick = () => {
    rateShow({rate: value, showId })
      .then(() => toast.success(`оценка  ${value} добавлена`))
      .catch(() => toast.error('что-то пошло не так, попробуйте позже'))
  }

  return (
    <>
      <RatingInput
        id={id}
        value={value}
        defaultChecked={value === checkedValue}
        onClick={handleClick}
      />
      <RatingLabel htmlFor={id} />
    </>
  );
}


type AVGLineProps = { avgRate: number/* ; votes: number */ };

function AVGLine({ avgRate/* , votes */ }: AVGLineProps) {
  const size = avgRate * 10;
  return <LineDiv size={size} />;
}



type RatingProps = {
  avgRate?: number;
  votes?: string|number;
  showId: string;
  userRate?: RatingCC
};

export function Rating({  avgRate, votes, showId, userRate }: RatingProps) {

  const user = useSelector(getUser)

  const starsElements =  STARS.map((item) => {
    const star = STARS.length - item + 1;
    return (
      <RadioBtn
        key={star}
        value={star}
        checkedValue={userRate?.rate}
        showId={showId}
      />
    );
  });

  const votesClient = votes ? +votes : 0;
  const avgRateClient = avgRate ? round1(avgRate) : 0;

  const avgDigit = votesClient ? avgRateClient : '-';

    const activeBlock = user ?
    <><StarsDiv>{starsElements}</StarsDiv><UserRateDiv>{userRate?.rate}</UserRateDiv></> : null;
  return (
    <RatingSection>
      {activeBlock}
      <AVGLine avgRate={avgRateClient} /* votes={votesClient} */ />
      <UserRateDiv>
        {avgDigit}<VotesSpan>({votesClient})</VotesSpan>{' '}
      </UserRateDiv>
    </RatingSection>
  );
}

