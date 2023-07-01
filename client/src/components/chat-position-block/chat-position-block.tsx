import { Dispatch, SetStateAction} from 'react';
import styled from "styled-components"
import { ChatPosition } from "../../const/chat";

type ChartPositionItemDivProps = {
  position: string,
  selected: string
}

const ChartPositionItemDiv = styled.div<{props: ChartPositionItemDivProps}>`
  grid-area: ${({props}) => props.position};
  border-radius: 4px;

  transition: scale 0.1s ease-in-out;

  &:hover {
    scale: 1.08;
    box-shadow: inset 2px 2px 2px #ffffff6c;
  }
  background-color: ${({props}) => props.position === props.selected ? '#FFF' : ''};
  border: 2px solid #FFF;
`;

const ChartPositionItemWrapper = styled.div`
  display: grid;
  grid-template-areas:
   "left center center center right"
   "left center center center right"
   "left center center center right"
   ". bottom bottom bottom ."
   ;
  width: 70px;
  height: 70px;
  padding: 0.1rem;
  border: 4px solid rgb(13, 1, 1);
  background-color: #470707;
  box-shadow: 2px 2px 2px #0000007c;
`;



type ChartPositionItemProps = ChartPositionItemDivProps & {
  setPosition: Dispatch<SetStateAction<string>>
}

function ChartPositionItem({position, selected, setPosition}: ChartPositionItemProps) {
  const handleClick = () => setPosition(position);
  console.log(position)
  return (
    <ChartPositionItemDiv  props={{position, selected}} onClick={handleClick}/>
  )
}



type ChatPositionBlockProps = {
  selected: string;
  setPosition: Dispatch<SetStateAction<string>>
}

export function ChatPositionBlock({selected, setPosition}: ChatPositionBlockProps) {
  const colorElements =  Object.values(ChatPosition).map((item) =>
    <ChartPositionItem key={item} position={item} selected={selected} setPosition={setPosition} />
  )

  return (
    <ChartPositionItemWrapper>
      {colorElements}
    </ChartPositionItemWrapper>
  )

}
