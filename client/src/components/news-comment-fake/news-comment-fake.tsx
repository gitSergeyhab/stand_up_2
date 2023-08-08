import { useSelector } from "react-redux";
import { NewsComment } from "../news-comment/news-comment"
import { getUser } from "../../store/user-reducer/user-selectors";
import { NewsCommentFakeData } from "../../types/types";
import { AuthUserTypeCC } from '../../types/user-types';
import { NewsCommentCC } from "../../types/news-comments-types";
import { getFakeCommentData } from "../../store/news-comments-slice/news-comment-selectors";
// import { getFakeCommentData } from "../../store/comment-reducer/comment-selectors";


const getComment = (
  {newsId, text, image, user, rootCommentId, commentId}: NewsCommentFakeData
  & {user: AuthUserTypeCC|null}
  &  {rootCommentId?: string}
  ): NewsCommentCC => {
  const date = new Date();
  return {
    commentId,
    dateAdded: date,
    dateUpdated: date,
    newsId,
    newsTitle: 'never mind',
    text,
    userId: user?.id || '',
    userNik: user?.nik || '',
    avatar: user?.avatar || '',
    childCommentCount: '0',
    image,
    rootCommentId
  }
}



export function NewsCommentFake() {
  const user = useSelector(getUser);
  const commentData = useSelector(getFakeCommentData);
  if (!commentData) return null;
  const currentTime = Date.now();
  console.log({currentTime}, commentData.timeStamp)
  if (currentTime > commentData.timeStamp + 1000) {
    return null;
  }
  const rootId = commentData.rootCommentId; // проверить, есть ли корневой коммент
  const comment = getComment({ user, ...commentData })
  // рендерит, только те, у кого нет рут, т.е. только сами рут
  return rootId ? null : <NewsComment isFake comment={comment} />
}
