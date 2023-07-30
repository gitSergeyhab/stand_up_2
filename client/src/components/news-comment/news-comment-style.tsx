import styled from "styled-components";
import { LongButton, hiddenStyle } from "../common/common-style";


export const CommentLi = styled.li`
  width: 100%;
  box-shadow: 1px 1px 1px #0000002a;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
`;
export const CommentUL = styled.ul`
  list-style: none;
  padding: 0 0 0 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
`;

export const TextP = styled.p`
  width: 100%;
  padding: 0.25rem;
  margin: 0;
  text-indent: 1rem;
`;

export const Header = styled.h4`
  margin: 0.1rem;
  display: flex;
  align-items: center;
`

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

export const  SmallImg = styled.img`
  height: 2.2rem;
  object-fit: cover;
  border-radius: 0.75rem;
`;

export const ContentWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
`;



export const CommentImage = styled.img`
  max-height: 20rem;
  display: flex;
  object-fit: cover;
  text-align: center;
  margin: auto;
  max-width: 100%;
  margin-bottom: .5rem;
  box-shadow: 4px 4px 2px #0000007b;
`;

export const CommonCommentDiv = styled.div`
  width: 100%;
  box-shadow: -1px 1px 10px #00000080;
  padding: 1rem 0 0 1rem;
  position: relative;

`;

export const ShowMoreBtn = styled(LongButton).attrs({type: 'button'})`
  color: #000;
  font-weight: 700;
  background: linear-gradient(90deg, #300606a9 0%, #ffffff76 100%);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.5) -1px 1px 10px;
`;


export const LikeRating = styled.div<{color?: string}>`
  padding: 0 2rem;
  font-weight: 700;
  text-shadow: 1px 0 ;
  ${({color}) => color ? `color: ${color}` : ''};

`

export const DateSpan = styled.span`
  @media(max-width: 500px) {
    ${hiddenStyle}
  }
`;
