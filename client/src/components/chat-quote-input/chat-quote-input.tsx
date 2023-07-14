import { useDispatch, useSelector } from "react-redux";
import { BsFillChatRightQuoteFill } from 'react-icons/bs'
import { CloseBtn } from "../common/common";
import { getQuoteMessage } from "../../store/chat-reducer/chat-selectors";
import { setQuoteMessage } from "../../store/actions";
import { SERVER_URL } from "../../const/const";
import { cutText } from "../../utils/utils";
import { BtnWrapperDiv, ImgNikQuoteDiv, QuoteImg, QuoteSection, QuoteText, QuoteUser } from "./chat-quote-input-style";


export function ChatQuoteInput() {
  const message = useSelector(getQuoteMessage);
  const dispatch = useDispatch();

  if (!message) {
    return null;
  }

  const { userNik, image, messageText } = message;

  const handleQuoteDelete = () => dispatch(setQuoteMessage(null))

  const quoteImg = image ? <QuoteImg src={`${SERVER_URL}${image}`}/> : null;
  const quoteUser = <QuoteUser>{userNik}</QuoteUser>
  const quoteText =  messageText ? <QuoteText>{cutText(messageText)}</QuoteText> : null;
  const cancelBtn = <BtnWrapperDiv><CloseBtn onClick={handleQuoteDelete}/></BtnWrapperDiv>

  return (
    <QuoteSection>
      <ImgNikQuoteDiv>
        <BsFillChatRightQuoteFill/>
        {quoteImg}
        {quoteUser}
      </ImgNikQuoteDiv>
      {quoteText}
      {cancelBtn}
    </QuoteSection>
  )
}
