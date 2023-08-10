import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SmallSpinner2 } from "../spinner/small-spinner";
import { COMMENT_LIMIT } from "../../const/const";
import { increaseOffset } from "../../store/news-comments-slice/news-comments-slice";


export const MoreCommentButton = styled.button.attrs({type: 'button'})`
    display: flex;
    justify-content: center;
    border: none;
    width: 100%;
    background-color: inherit;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 5px #0000003e;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
      box-shadow: 2px 2px 10px #0000003e;
    }
    transition: box-shadow .2s ease-in-out;
`;


type NewsCommentsMoreBtnProps = {
  count: number,
  length: number,
  isLoading: boolean
}

export function NewsCommentsMoreBtn({isLoading, count, length}: NewsCommentsMoreBtnProps) {

  const dispatch = useDispatch()

  const handleBtnClick = () => dispatch(increaseOffset())


  const remainingCommentCount = count - length;
  const nextCommentCount = count - length > COMMENT_LIMIT ? COMMENT_LIMIT :  remainingCommentCount;
  const moreBtn = isLoading ? <SmallSpinner2/> :
    <MoreCommentButton onClick={handleBtnClick}>
      Показать еще {nextCommentCount} из оставшихся {remainingCommentCount} комментариев
    </MoreCommentButton>;
  return remainingCommentCount > 0 ? moreBtn : null;
}