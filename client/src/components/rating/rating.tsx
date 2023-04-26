import { useState, Dispatch, SetStateAction } from 'react';
import { round1 } from '../../utils/utils';
import {
  LineDiv,
  RatingInput,
  RatingLabel,
  RatingSection,
  StarsDiv,
  UserRateDiv,
  VotesSpan,
} from './rating-style';

type RadioBtnProps = {
  value: number;
  checkedValue?: number;
  onClick: Dispatch<SetStateAction<number | undefined>>;
};

function RadioBtn({ value, checkedValue, onClick }: RadioBtnProps) {
  const id = `star${value}`;
  const defaultChecked = value === checkedValue;
  const handleClick = () => onClick(value);

  return (
    <>
      <RatingInput
        id={id}
        value={value}
        defaultChecked={defaultChecked}
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
  avgRate: number | null;
  votes: string | null;
  checkedValue?: number;
};

export function Rating({ checkedValue, avgRate, votes }: RatingProps) {
  const starsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [value, setValue] = useState(checkedValue);

  const starsElements = starsArr.map((item) => {
    const star = starsArr.length - item + 1;
    return (
      <RadioBtn
        key={star}
        value={star}
        onClick={setValue}
        checkedValue={checkedValue}
      />
    );
  });

  const votesClient = votes ? +votes : 0;
  const avgRateClient = avgRate ? round1(avgRate) : 0;

  const avgDigit = votesClient ? avgRateClient : '-';

  return (
    <RatingSection>
      <StarsDiv>{starsElements}</StarsDiv>
      <UserRateDiv>{value}</UserRateDiv>

      <AVGLine avgRate={avgRateClient} /* votes={votesClient} */ />
      <UserRateDiv>
        {avgDigit} <VotesSpan>({votesClient})</VotesSpan>{' '}
      </UserRateDiv>
    </RatingSection>
  );
}

// my-rate
