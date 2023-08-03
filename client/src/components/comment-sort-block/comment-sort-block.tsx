import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { createNewSearch, getFieldFromSearch } from "../../utils/navigation-utils";
import { ClickButton, SortDiv, SortLi, SortList, SortWrapper } from "./comment-sort-block-style";
import { OptionType } from "../../types/types";


const Option = {
  new: 'Новые',
  old: 'Старые',
  pop: 'Популярные'
} as {[key: string]: string}

const getSortParam = (param?: string) => {
  if (!param) return {id: 'pop', name: Option.pop};
  return {id: param || 'pop', name:  Option[param] || Option.pop }
}

const getSortParamFromSearch = (search: string) => {
  const defaultSortParam = getFieldFromSearch({field: 'sort', search}) as string;
  return getSortParam(defaultSortParam);
}

const options = Object.entries(Option).map(([id, name]) => ({id, name})) as OptionType[];


function SortItem({option, hideList}: {option: OptionType, hideList: () => void}) {

  const {search} = useLocation();
  const navigate = useNavigate();
  const {id, name} = option;
  const sortId = getSortParamFromSearch(search).id;
  const isActive = sortId === id;

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
    const newSearch = createNewSearch({search, fields: [{name: 'sort', value: id}], replace: true})
    navigate(`?${newSearch}`);
    hideList();
  }

  return <SortLi isActive={isActive} onClick={handleClick}>{name}</SortLi>;
}



export function CommentSortBlock() {
  const { search } = useLocation();
  const sortParam = getSortParamFromSearch(search);
  const [isListShown, setListShown] = useState(false);

  const hideList = () => setListShown(false);
  const handleClickDiv = () => setListShown((prev) => !prev)

  const sortElements = options.map((item) => <SortItem key={item.id} hideList={hideList} option={item}/>)
  const sortList = isListShown ? <SortList>{sortElements}</SortList> : null;
  const arrow = isListShown ? <IoIosArrowUp/> : <IoIosArrowDown/>;

  return (
    <SortWrapper >
      <SortDiv id="comment-sort-element">
        <ClickButton onClick={handleClickDiv}>
          {sortParam.name}
          {arrow}
        </ClickButton>
        {sortList}
      </SortDiv>
    </SortWrapper>
  )
}
