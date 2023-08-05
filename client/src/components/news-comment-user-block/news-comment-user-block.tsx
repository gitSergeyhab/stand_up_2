import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserLink } from "../common/common-style";
import { DefaultPath, SERVER_URL } from "../../const/const";

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

export const Header = styled.h4`
  margin: 0.1rem;
  display: flex;
  align-items: center;
`

type NewsCommentUserBlockProps = {
  userId: string, commentId: string, avatar?: string, userNik: string
}

export function NewsCommentUserBlock({userId, commentId, avatar, userNik}: NewsCommentUserBlockProps) {
  const userAvatar = avatar ? SERVER_URL + avatar : DefaultPath.Any;
  return (
    <ContentWrapperDiv>
      <Link to={`/users/${userId}`} id={`comment-${commentId}`}><SmallImg src={userAvatar}/></Link>
      <Header><UserLink to={`/users/${userId}`}>  {userNik}</UserLink></Header>
    </ContentWrapperDiv>
  )

}
