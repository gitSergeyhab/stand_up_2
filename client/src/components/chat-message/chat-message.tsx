import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsChatQuoteFill } from 'react-icons/bs'
import { AiOutlinePicture, AiTwotonePicture } from 'react-icons/ai';
import { getUser } from '../../store/user-reducer/user-selectors';
import { DefaultPath, SERVER_URL } from '../../const/const';
import { getColorFromUserData } from '../../utils/chat-utils';
import { formatDateFromTimeStamp } from '../../utils/date-utils';
import { MessageCC } from '../../types/chat-types';
import { Role, setQuoteMessage } from '../../store/actions';
import { ImageCC } from '../../types/pic-types';
import { ChatAttachedImage } from '../chat-attached-image/chat-attached-image';
import { ChartLink, ChatImg, ChatMessageLI, ImageBtn, MainMessage, MessageTextDiv, QuoteButton, TextDiv, UserDateWrapperDiv } from './chat-message-style';
import { ChatQuoteMessage } from '../chat-quote-message/chat-quote-message';
import { getRowLinkedText } from '../../utils/utils';
import { getChatPosition } from '../../store/chat-reducer/chat-selectors';
import { ChatPosition } from '../../const/chat';


type ChatMessageProps = {
  message: MessageCC;
  setCurrentImg: Dispatch<SetStateAction<ImageCC | null>>
}
export function ChatMessage({message, setCurrentImg}: ChatMessageProps) {

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const id = user?.id;
  const {
    messageAdded, messageAuto, userId, userNik, userRoles, avatar, messageText, image, messageId,
    imgOpen,
    quoteImage, quoteText, quoteUserNik, quoteId
    } = message;
  const side = (id === userId) ? 'end' : 'start';

  const [isOpen, setIsOpen] = useState(imgOpen);
  const position = useSelector(getChatPosition);

  const isBreak = [ChatPosition.Left, ChatPosition.Right].includes(position);

  const handleSetQuote = () => dispatch(setQuoteMessage(message));
  const handleOpenClick = () => setIsOpen((prev) => !prev)
  const showPicImg = imgOpen ? <AiTwotonePicture/> : <AiOutlinePicture/>;
  const userColor = getColorFromUserData({roles: userRoles as Role[], userAuthId: id, userMessageId: userId});
  const formatDate =  formatDateFromTimeStamp(messageAdded);
  const messageP = messageText ? <MessageTextDiv isBreak={isBreak}>{getRowLinkedText(messageText)} </MessageTextDiv> : null;

  if (messageAuto) {
    return <ChatMessageLI>{formatDate} / {userNik} {messageText}</ChatMessageLI>
  }

  const quoteMessage = <ChatQuoteMessage
    quoteId={quoteId}
    quoteImage={quoteImage}
    quoteText={quoteText}
    quoteUserNik={quoteUserNik}
  />
  const attachedImg = (image && isOpen) ? <ChatAttachedImage image={image} setCurrentImg={setCurrentImg}/> : null;
  const showPicBtn = !image ? null : <ImageBtn onClick={handleOpenClick}  type="button">{showPicImg}</ImageBtn>;

  const textBlock = (
    <TextDiv color={userColor} side={side} >
      {quoteMessage}
      {attachedImg}
      <UserDateWrapperDiv position={position}>
        <QuoteButton onClick={handleSetQuote}>
          <BsChatQuoteFill/>
        </QuoteButton>
        {showPicBtn}
        {formatDate}
        <ChartLink
          color={userColor}
          id={messageId}
          side={side}
          to={`/users/${userId}`}
        >{userNik}</ChartLink>
      </UserDateWrapperDiv>
      {messageP}
    </TextDiv>
  );

  const avatarImg = <ChatImg color={userColor} src={avatar ? `${SERVER_URL}${avatar}` : DefaultPath.Any}/>;
  const elements = side === 'start' ?
    <MainMessage side={side}>{avatarImg}{textBlock}</MainMessage> :
    <MainMessage side={side}>{textBlock}{avatarImg}</MainMessage>

  return (
    <ChatMessageLI side={side}>
      {elements}
    </ChatMessageLI>
  )
}

