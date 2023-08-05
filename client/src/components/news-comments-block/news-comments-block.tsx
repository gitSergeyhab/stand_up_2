import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetCommentsByNewsIdQuery } from "../../store/news-api"
import { NewsComment } from "../news-comment/news-comment";
import { CommentHeader, CommentSection, CommentUL } from "./news-comments-block-style";
import { NewsCommentInput } from "../news-comment-input/news-comment-input";
import { NewsCommentSortBlock } from "../news-comment-sort-block/news-comment-sort-block";
import { NewsCommentsDataCC } from "../../types/news-comments-types";
import { NewsCommentsMoreBtn } from "../news-comments-more-btn/news-comments-more-btn";
import { OptionType } from "../../types/types";
import { NewsCommentFake } from "../news-comment-fake/news-comment-fake";
import { getFakeCommentData } from "../../store/comment-reducer/comment-selectors";
import { setFakeCommentData } from "../../store/actions";


export function NewsCommentsBlock({newsId} : {newsId: string}) {

  const [commentData, setCommentData] = useState<NewsCommentsDataCC>({count: 0, list: []});
  const [isLoading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<OptionType>({id: 'pop', name: 'популярные'});
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch()
  const fakeCommentData = useSelector(getFakeCommentData)
  const [ getComments ] = useLazyGetCommentsByNewsIdQuery({
    // selectFromResult: ({data}) => ({
    //   data: {
    //     ...data,
    //     list: data?.list.filter((item) => item.commentId !== fakeCommentData?.commentId)
    //   }
    // })
   });

  useEffect(() => {
    dispatch(setFakeCommentData(undefined))
  }, [dispatch])

  useEffect(() => {

    setLoading(true);
    getComments({id: newsId, offset, sort: sortType.id})
      .then(({data}) => {
        if (!data) {
          return;
        }

        console.log({data}, 'in useEffect', {fakeCommentData})
        // чтоб не рендерить 2 раза добавленный root comment
        const filteredCData = {...data, list: data.list.filter((item) => item.commentId !== fakeCommentData?.commentId)}
        // console.log({fakeCommentData, data})
        setCommentData((prev) => {
          if(!offset) {
            return filteredCData
          }
          const {count, list} = filteredCData;
          return {
            count,
            list: [...prev.list, ...list]
          }
        })
      })
      .catch(() => toast('Ошиба загрузки данных'))
      .finally(() => setLoading(false))
  }, [offset, sortType, newsId, getComments, fakeCommentData])


  const {list} = commentData;
  const commentsElements = list.map((item) =>  <NewsComment key={item.commentId} comment={item}/>);

  const commentsLength =  fakeCommentData ? commentData.list.length + 1 : commentData.list.length

  const handleOffsetReset = () => setOffset(0)

  return(
    <CommentSection>
      <CommentHeader>Комментарии</CommentHeader>
      <NewsCommentInput  newsId={newsId}/>
      <NewsCommentSortBlock
        isLoading={isLoading}
        setSortType={setSortType}
        sortType={sortType}
        handleOffsetReset={handleOffsetReset}
      />
      <CommentUL>
        <NewsCommentFake />
        {commentsElements}
      </CommentUL>
      <NewsCommentsMoreBtn
        isLoading={isLoading}
        count={commentData.count}
        length={commentsLength}
        setOffset={setOffset}
      />
    </CommentSection>
  )
}
