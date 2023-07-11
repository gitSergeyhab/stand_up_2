import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/user-reducer/user-selectors';
import { DefaultPath, SERVER_URL } from '../../const/const';
import { getColorFromUserData } from '../../utils/chat-utils';
import { formatDateFromTimeStamp } from '../../utils/date-utils';
import { MessageCC } from '../../types/chat-types';
import { Role } from '../../store/actions';
import { ImageCC } from '../../types/pic-types';
import { ChatAttachedImage } from '../chat-attached-image/chat-attached-image';
import { ChartLink, ChatImg, ChatMessageLI, MessageP, TextDiv, UserDateWrapperDiv } from './chat-message-style';



type ChatMessageProps = {
  message: MessageCC;
  setCurrentImg: Dispatch<SetStateAction<ImageCC | null>>
}
export function ChatMessage({message, setCurrentImg}: ChatMessageProps) {

  const user = useSelector(getUser);
  const id = user?.id;
  const { messageAdded, messageAuto, userId, userNik, userRoles, avatar, messageText, image, imgOpen } = message;
  const side = (id === userId) ? 'end' : 'start';
  const userColor = getColorFromUserData({roles: userRoles as Role[], userAuthId: id, userMessageId: userId});
  const formatDate =  formatDateFromTimeStamp(messageAdded);

  if (messageAuto) {
    return <ChatMessageLI>{formatDate} / {userNik} {messageText}</ChatMessageLI>
  }

  const attachedImg = image ? <ChatAttachedImage image={image} setCurrentImg={setCurrentImg} imgOpen={imgOpen}/> : null
  const textBlock = (
    <TextDiv color={userColor} side={side}>
      {attachedImg}
      <UserDateWrapperDiv>
        {formatDate}
        <ChartLink color={userColor}  side={side} to={`/users/${userId}`}>{userNik}</ChartLink>
      </UserDateWrapperDiv>
      <MessageP>{messageText} </MessageP>
    </TextDiv>
  );
  const avatarImg = <ChatImg color={userColor} src={avatar ? `${SERVER_URL}${avatar}` : DefaultPath.Any}/>;
  const elements = side === 'start' ? <>{avatarImg}{textBlock}</> : <>{textBlock}{avatarImg}</>

  return (
    <ChatMessageLI side={side}>
      {elements}
    </ChatMessageLI>
  )
}

