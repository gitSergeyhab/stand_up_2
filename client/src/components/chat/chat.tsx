import { useState } from 'react'
import { BottomButton } from "./chat-style";
import { ChatBlock } from '../chart-block/chart-block';



export function Chat() {
  const [open, setOpen] = useState(true); //= !

  const handleChartOpen = () => setOpen(true);
  const handleChartClose = () => setOpen(false);

  const chatSection = open ? <ChatBlock  onClose={handleChartClose}/> : null;
  const chatButton = open ? null : <BottomButton onClick={handleChartOpen}>открыть чат</BottomButton>;

  return (
    <>
      {chatSection}
      {chatButton}
    </>
  )
}
