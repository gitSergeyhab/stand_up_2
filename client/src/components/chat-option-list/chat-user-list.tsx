
import { useSelector } from "react-redux";
import { ChatOptionLink, ChatOptionUL } from "./chat-option-list-style";
import { getUser } from "../../store/user-reducer/user-selectors";
import { getColorFromUserData } from "../../utils/chat-utils";
import { User } from "../../types/chat-types";



type UserOptionProps = {
  user: User,
  onClose: ()=>void
}
export function ChatUser({user, onClose}: UserOptionProps) {
  const authUser = useSelector(getUser)
  const {userNik, userRoles, userId} = user;
  const userColor = getColorFromUserData({roles: userRoles, userAuthId: authUser?.id, userMessageId: userId});

  return <li><ChatOptionLink color={userColor} to={`/users/${userId}`} onClick={onClose}>{userNik}</ChatOptionLink></li>
}


type ChatUserListProps = {
  users: User[],
  onClose: () => void
}


export function ChatUserList({onClose, users}: ChatUserListProps) {
  const optionElements = users.map((item) => <ChatUser key={item.userId} user={item} onClose={onClose}/>)

  return (
    <ChatOptionUL>
      {optionElements}
    </ChatOptionUL>
  )
}
