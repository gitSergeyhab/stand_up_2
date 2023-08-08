import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDispatch, useSelector } from "react-redux";
import { ClickButton, SortDiv, SortLi, SortList, SortWrapper } from "./news-comment-sort-block-style";
import { OptionType } from "../../types/types";
import { SmallSpinner2 } from "../spinner/small-spinner";
import { getNewsCommentsData } from "../../store/news-comments-slice/news-comment-selectors";
import { setOffset, setSortType } from "../../store/news-comments-slice/news-comments-slice";


const Option = {
  new: 'Новые',
  old: 'Старые',
  pop: 'Популярные'
} as {[key: string]: string}

const options = Object.entries(Option).map(([id, name]) => ({id, name})) as OptionType[];

type SortItemProps = {
  option: OptionType;
  hideList: () => void;

}

function SortItem({option, hideList}: SortItemProps) {
  const dispatch = useDispatch()
  const {sortType} = useSelector(getNewsCommentsData);

  const handleOffsetReset = () => dispatch(setOffset(0))

  const isActive = sortType.id === option.id;

  useEffect(() => {
    const closeMenuOnPageClick = (evt: MouseEvent) => {
      if (evt.target instanceof Element && !evt.target.closest('#comment-sort-element')) {
        hideList();
      }
    };
    document.addEventListener('click', closeMenuOnPageClick);
    return () => document.removeEventListener('click', closeMenuOnPageClick);
  });

  const handleClick = () => {
    handleOffsetReset();
    dispatch(setSortType(option));
    hideList();
  }
  return <SortLi isActive={isActive} onClick={handleClick}>{option.name}</SortLi>;
}




export function NewsCommentSortBlock() {
  const [isListShown, setListShown] = useState(false);
  const {sortType, isLoading} = useSelector(getNewsCommentsData)

  const hideList = () => setListShown(false);
  const handleClickDiv = () => setListShown((prev) => !prev);

  const sortElements = options.map((item) => (
    <SortItem
      key={item.id}
      hideList={hideList}
      option={item}
    />
  ));

  const sortList = isListShown ? <SortList>{sortElements}</SortList> : null;
  const arrow = isListShown ? <IoIosArrowUp/> : <IoIosArrowDown/>;
  const btnContent = isLoading ? <SmallSpinner2/> : <>{sortType.name}{arrow}</>;

  return (
    <SortWrapper >
      <SortDiv id="comment-sort-element">
        <ClickButton onClick={handleClickDiv}>{btnContent}</ClickButton>
        {sortList}
      </SortDiv>
    </SortWrapper>
  )
}
