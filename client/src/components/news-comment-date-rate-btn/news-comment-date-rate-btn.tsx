import styled from "styled-components";
import { formatDateFromTimeStamp } from "../../utils/date-utils";
import { hiddenStyle } from "../common/common-style";
import { NewsCommentButtons } from "../news-comment-buttons/news-comment-buttons";
import { ChildCommentCC } from "../../types/news-comments-types";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0.25rem 0;
  display: flex;
  margin: 0;
  font-style: italic;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, #ffffff76 0%, rgba(48,6,6,1) 100%);
  text-align: start;
  color: #000;
  position: relative;
  min-height: 1.5rem;
  @media(max-width: 500px) {
    background: rgba(48,6,6,1);
  }
`;

export const DateSpan = styled.span`
  font-size: 0.9rem;
  @media(max-width: 900px) {
    font-size: 0.8rem;
  }
  @media(max-width: 500px) {
    ${hiddenStyle}
  }
`;



type NewsCommentDateRateBtnProps = {
  comment: ChildCommentCC
}

export function NewsCommentDateRateBtn({comment}: NewsCommentDateRateBtnProps) {
  const { dateAdded } = comment;
  const formatDate =  formatDateFromTimeStamp(dateAdded);

  return (
  <Wrapper >
    <DateSpan className="del-marker">{formatDate}</DateSpan>

    <NewsCommentButtons comment={comment} />
  </Wrapper>
  )
}
