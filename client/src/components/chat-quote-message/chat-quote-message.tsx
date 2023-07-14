import styled from "styled-components";
import { BsFillChatRightQuoteFill } from 'react-icons/bs'
import { SERVER_URL } from "../../const/const";
import { cutText } from "../../utils/utils";


const QuoteLink = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 1rem;
  background-color: #FFF;
  padding: 4px 1rem;
  box-shadow: inset 8px 0 8px 0 #00000089;
  padding: 4px 1rem;
  font-style: italic;
  font-size: 12px;
  text-decoration: none;
  color: inherit;
`;

const QuoteText = styled.div`
width: 100%;
`;

const QuoteUser = styled.div`
  /* height: 100%; */
  height: 1rem;
  color: #FFF;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  border-radius: 4px;
`;

const QuoteImg = styled.img`
  height: 1.5rem;
  object-fit: cover;
  border: 2px solid #000;
  box-shadow: 2px 2px 2px #00000083;
  scale: 1;
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 3;
    z-index: 4;
  }
`;

export const BtnWrapperDiv = styled.div`
  position: absolute;
  right: 1rem;
`;

export const ImgNikWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  /* justify-content: start; */
`

type ChatQuoteMessageProps = {
  quoteId?: string;
  quoteImage?: string;
  quoteText?: string;
  quoteUserNik?: string;
}

export function ChatQuoteMessage({quoteId, quoteImage, quoteText, quoteUserNik}: ChatQuoteMessageProps) {
  if (!quoteId || !quoteUserNik) {
    return null;
  }
  const quoteImg = quoteImage ? <QuoteImg src={`${SERVER_URL}${quoteImage}`}/> : null;
  const quoteUser = <QuoteUser>{quoteUserNik}</QuoteUser>
  const messageText =  quoteText ? <QuoteText>{cutText(quoteText)}</QuoteText> : null;
  const href = `#${quoteId}`;

  return (
    <QuoteLink href={href}>

      <ImgNikWrapper>
        <BsFillChatRightQuoteFill/>
        {quoteImg}
        {quoteUser}
      </ImgNikWrapper>

      {messageText}
    </QuoteLink>
  )
}
