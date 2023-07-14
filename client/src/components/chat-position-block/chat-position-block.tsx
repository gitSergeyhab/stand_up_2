import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { ChatPosition } from "../../const/chat";
import { getChatPosition } from '../../store/chat-reducer/chat-selectors';
import { setChatPosition } from '../../store/actions';

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


function ChartPositionItem({position}: {position: ChatPosition}) {
  const selected = useSelector(getChatPosition);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setChatPosition(position));

  return (
    <ChartPositionItemDiv  props={{position, selected}} onClick={handleClick}/>
  )
}


export function ChatPositionBlock() {
  const colorElements = [ChatPosition.Center, ChatPosition.Right, ChatPosition.Left, ChatPosition.Bottom]
    .map((item) => <ChartPositionItem key={item} position={item} />)

  return (
    <ChartPositionItemWrapper>
      {colorElements}
    </ChartPositionItemWrapper>
  )
}
