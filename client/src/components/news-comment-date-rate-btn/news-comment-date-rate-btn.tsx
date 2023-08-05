import styled from "styled-components";
import { formatDateFromTimeStamp } from "../../utils/date-utils";
import { hiddenStyle } from "../common/common-style";
import { NewsCommentButtons } from "../news-comment-buttons/news-comment-buttons";

export const DateP = styled.div`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  margin: 0;
  font-style: italic;
  font-size: 0.9em;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, #ffffff76 0%, rgba(48,6,6,1) 100%);
  text-align: start;
  padding-right: 1rem;
  color: #000;
  position: relative;
`;

export const DateSpan = styled.span`
  @media(max-width: 500px) {
    ${hiddenStyle}
  }
`;

export const LikeRating = styled.div<{color?: string}>`
  padding: 0 2rem;
  font-weight: 700;
  text-shadow: 1px 0 ;
  ${({color}) => color ? `color: ${color}` : ''};
`;

type NewsCommentDateRateBtnProps = {dateAdded: Date, commentId: string, userId: string}

export function NewsCommentDateRateBtn({dateAdded, commentId, userId}: NewsCommentDateRateBtnProps) {
  const formatDate =  formatDateFromTimeStamp(dateAdded);
  return (
    <DateP>
    <DateSpan>{formatDate}</DateSpan>
    <LikeRating>+12</LikeRating>
    <NewsCommentButtons commentId={commentId} userId={userId} />
  </DateP>
  )
}
