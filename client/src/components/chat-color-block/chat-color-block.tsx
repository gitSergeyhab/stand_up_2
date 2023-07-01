import { Dispatch, SetStateAction} from 'react';
import styled from "styled-components"
import { ChatColor } from "../../const/chat";

type ChartColorItemPropsLi = {
  color: string,
  selected: string
}

const ChartColorItemLi = styled.li<{props: ChartColorItemPropsLi}>`
  background-color: ${({props}) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 4px;

  transition: scale 0.1s ease-in-out;

  &:hover {
    scale: 1.08;
  }
  border: ${({props}) => props.color === props.selected ? '2px white solid' : 'none'};
  box-shadow: inset 1px 1px 2px #00000059;
`;

const ChartColorItemUl = styled.ul`
  display: grid;
  grid-template-columns: auto auto;
  list-style: none;
  width: min-content;
  margin: 0;
  padding: 0.1rem;
  border: 4px solid rgb(13, 1, 1);
  background-color: #470707;
  box-shadow: 2px 2px 2px #0000007c;
`;



type ChartColorItemProps = ChartColorItemPropsLi & {
  setColor: Dispatch<SetStateAction<string>>
}

function ChartColorItem({color, selected, setColor}: ChartColorItemProps) {
  const handleClick = () => setColor(color);
  console.log({selected}, selected === color)
  return (
    <ChartColorItemLi  props={{color, selected}} onClick={handleClick}/>
  )
}



type ChatColorBlockProps = {
  selected: string;
  setColor: Dispatch<SetStateAction<string>>
}

export function ChatColorBlock({selected, setColor}: ChatColorBlockProps) {
  const colorElements =  Object.values(ChatColor).map((item) =>
    <ChartColorItem key={item} color={item} selected={selected} setColor={setColor} />
  )

  return (
    <ChartColorItemUl>
      {colorElements}
    </ChartColorItemUl>
  )

}
