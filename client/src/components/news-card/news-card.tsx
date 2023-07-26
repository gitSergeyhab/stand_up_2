import styled from "styled-components";
import { Link } from "react-router-dom";
import {FaEye} from 'react-icons/fa'
import { NewsCC } from "../../types/news-types"
import { DefaultPath, SERVER_URL } from "../../const/const";
import { formatDateFromTimeStamp } from "../../utils/date-utils";
import { linkifyShort } from "../../utils/format-text";
import { UserLink } from "../common/common-style";

const cutFirstParagraph = (text: string) => text.split('\n')[0];
const getFirstParagraph = (text: string) =>  linkifyShort(cutFirstParagraph(text))



export const NewsImg = styled.img.attrs({ width: 200, height: 200 })`
  height: auto;
  height: 14rem;
  object-fit: cover;
`

export const NewsArticle = styled.article`
position: relative;
  height: 16rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 4px solid #000;
  box-shadow: 2px -2px 2px #00000081;
  padding: 1rem;
  background-color: #ffffff7d;

  @media(max-width: 700px) {
    flex-direction: column;
    height: auto;
    max-height: 36rem;
  }
`;

export const TextBlock = styled.div`
  width: 100%;
  height: 10rem;
  overflow: hidden;
  display: inline;
  text-indent: 2rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  @media(max-width: 700px) {
    height: auto;
    max-height: 9rem;
  }
`

export const BottomBlock = styled.div`
  padding: .25rem 1rem;
  background-color: rgb(48, 6, 6);
  color: goldenrod;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 1px 1px #00000066;
  margin-top: 4px;
  flex-wrap: wrap;
`



export const TitleLink = styled(Link)`
  text-decoration: none;
  color: #ac7b00;
  font-weight: 700;
  padding-left: 2rem;
  margin-bottom: 8px;
  font-size: 1.35rem;
  transition: color .2s ease-in-out;
  margin-top: 1rem;
  &:visited {
    color: rgb(13, 1, 1);

  }
  &:hover{
    color: #b6860d;
  }
`;

export const FullLink = styled(Link)`
  text-indent: 2rem;
  color: #ac7b00;

  &:visited {
    color: rgb(13, 1, 1);
  }
  &:hover{
    color: #b6860d;
  }
`;

export const TextDiv = styled.div`
  display: flex;
  gap: 0.9rem;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

`

export const ViewsDiv = styled.div`
  height: 1.5rem;
  padding: 0.2rem 0.5rem;
  background-color: #d1af0679;
  position: absolute;
  top: .5rem;
  right: .5rem;

  display: flex;
  align-items: center;
  column-gap: .25rem;
  border-radius: 8px;

`;

type ViewProps = {
  totalViews: string, weeklyViews: string
}
export function View({totalViews, weeklyViews} : ViewProps) {
  return <ViewsDiv title="просмотров за неделю (за всё время)"><FaEye/> {weeklyViews}({totalViews})</ViewsDiv>
}

export function NewsCard({news}: {news: NewsCC}) {

  const {
    dateAdded,
    mainPicture,
    // dateChanged,
    newsId, newsText, newsTitle,
    totalViews, weeklyViews,
    // userImg,
    userId, userNik
  } = news;


  const formatDate =  formatDateFromTimeStamp(dateAdded);

  const newsSrc = mainPicture ? SERVER_URL + mainPicture : DefaultPath.Any;

  const firstP = getFirstParagraph(newsText)
  return (
    <NewsArticle>
      <NewsImg src={newsSrc} alt={newsTitle} />
      <TextDiv>
        <TitleLink to={`/news/${newsId}`}>{newsTitle}</TitleLink>
        <TextBlock>
          {firstP}
        </TextBlock>
        <FullLink to={`/news/${newsId}`}> читать целиком</FullLink>

        <BottomBlock>
        <UserLink to={`/users/${userId}`}>{userNik}</UserLink>
          <span>{formatDate}</span>
        </BottomBlock>
      </TextDiv>
      <View  totalViews={totalViews} weeklyViews={weeklyViews}/>
    </NewsArticle>
  )
}

