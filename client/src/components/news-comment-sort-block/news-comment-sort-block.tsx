import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { ClickButton, SortDiv, SortLi, SortList, SortWrapper } from "./news-comment-sort-block-style";
import { OptionType } from "../../types/types";
import { SmallSpinner2 } from "../spinner/small-spinner";


const Option = {
  new: 'Новые',
  old: 'Старые',
  pop: 'Популярные'
} as {[key: string]: string}

const options = Object.entries(Option).map(([id, name]) => ({id, name})) as OptionType[];

type SortItemProps = {
  option: OptionType;
  hideList: () => void;
  sortType: OptionType;
  setSortType: Dispatch<SetStateAction<OptionType>>;
  handleOffsetReset: () => void;
}

function SortItem({option, hideList, sortType, setSortType, handleOffsetReset}: SortItemProps) {

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
    setSortType(option);
    hideList();
  }
  return <SortLi isActive={isActive} onClick={handleClick}>{option.name}</SortLi>;
}


type CommentSortBlockProps = {
  sortType: OptionType;
  setSortType: Dispatch<SetStateAction<OptionType>>;
  isLoading: boolean;
  handleOffsetReset: () => void;
}

export function NewsCommentSortBlock({isLoading, setSortType, sortType, handleOffsetReset}:CommentSortBlockProps) {
  const [isListShown, setListShown] = useState(false);

  const hideList = () => setListShown(false);
  const handleClickDiv = () => setListShown((prev) => !prev);

  const sortElements = options.map((item) => (
    <SortItem
      key={item.id}
      hideList={hideList}
      option={item}
      setSortType={setSortType}
      sortType={sortType}
      handleOffsetReset={handleOffsetReset}
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
