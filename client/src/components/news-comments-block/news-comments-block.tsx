import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyGetCommentsByNewsIdQuery } from "../../store/news-api"
import { NewsComment } from "../news-comment/news-comment";
import { CommentHeader, CommentSection, CommentUL } from "./news-comments-block-style";
import { CommentInput } from "../comment-input/comment-input";
import { CommentSortBlock } from "../comment-sort-block/comment-sort-block";
import { NewsCommentsDataCC } from "../../types/news-comments-types";
import { NewsCommentsMoreBtn } from "../news-comments-more-btn/news-comments-more-btn";
import { OptionType } from "../../types/types";


export function NewsCommentsBlock({newsId} : {newsId: string}) {

  const [commentData, setCommentData] = useState<NewsCommentsDataCC>({count: 0, list: []});
  const [isLoading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<OptionType>({id: 'pop', name: 'популярные'});
  const [offset, setOffset] = useState(0);

  const [ getComments ] = useLazyGetCommentsByNewsIdQuery();

  useEffect(() => {
    setLoading(true);
    getComments({id: newsId, offset, sort: sortType.id})
      .then(({data}) => {
        if (!data) {
          return;
        }
        setCommentData((prev) => {
          if(!offset) {
            return data
          }
          const {count, list} = data;
          return {
            count,
            list: [...prev.list, ...list]
          }
        })
      })
      .catch(() => toast('Ошиба загрузки данных'))
      .finally(() => setLoading(false))
  }, [offset, sortType, newsId, getComments])


  const {list} = commentData;
  const commentsElements = list.map((item) =>  <NewsComment key={item.commentId} comment={item}/>);

  const handleOffsetReset = () => setOffset(0)

  return(
    <CommentSection>
      <CommentHeader>Комментарии</CommentHeader>
      <CommentInput  newsId={newsId}/>
      <CommentSortBlock
        isLoading={isLoading}
        setSortType={setSortType}
        sortType={sortType}
        handleOffsetReset={handleOffsetReset}
      />
      <CommentUL>{commentsElements}</CommentUL>
      <NewsCommentsMoreBtn
        isLoading={isLoading}
        count={commentData.count}
        length={commentData.list.length}
        setOffset={setOffset}
      />
    </CommentSection>
  )
}
