import { useSelector } from 'react-redux';
import { ChartLink, ChatImg, ChatMessageLI, ChatMessageUL, MessageP, TextDiv } from './chat-message-block-style';
import { getUser } from '../../store/user-reducer/user-selectors';
import { Role } from '../../store/actions';
import { DefaultPath, SERVER_URL } from '../../const/const';

const UserColor = {
  ThisUser: 'goldenrod',
  User: '#FFF',
  Admin: '#019f23',
  Moderator: '#22b7f7',
}

type GetColorFromUserData = {
  roles: Role[],
  userAuthId?: string,
  userMessageId?: string,
}
const getColorFromUserData = ({roles, userAuthId, userMessageId}: GetColorFromUserData) => {
  if (userAuthId === userMessageId) {
    return UserColor.ThisUser;
  }
  if (roles.includes(Role.Admin)) {
    return UserColor.Admin;
  }
  if (roles.includes(Role.Moderator)) {
    return UserColor.Moderator;
  }
  return UserColor.User;
}

type Message = {
  id: string;
  userId: string;
  avatar?: string;
  roles: Role[];
  text: string;
  nik: string;
}


function ChatMessage({message}: {message: Message}) {

  const user = useSelector(getUser);
  const id = user?.id;
  const { avatar, roles, text, userId, nik } = message;
  const side = (id === userId) ? 'end' : 'start';
  const userColor = getColorFromUserData({roles, userAuthId: id, userMessageId: userId});


  const textBlock = (
    <TextDiv color={userColor} side={side}>
      <ChartLink color={userColor}  side={side} to={`/users/${userId}`}>{nik}</ChartLink>
      <MessageP> {text} </MessageP>
    </TextDiv>
  );

  const image = <ChatImg color={userColor} src={avatar ? `${SERVER_URL}${avatar}` : DefaultPath.Any}/>;

  const elements = side === 'start' ? <>{image}{textBlock}</> : <>{textBlock}{image}</>

  return (
    <ChatMessageLI side={side}>
      {elements}
    </ChatMessageLI>
  )
}


type ChatMessageBlockProps = {
  color: string,
  messages: Message[]
}

export function ChatMessageBlock({color, messages}: ChatMessageBlockProps) {


  const messageElements = messages.map((item) => <ChatMessage key={item.id} message={item}/> )
  return (
    <ChatMessageUL color={color}>
      {messageElements}
    </ChatMessageUL>
  )
}
