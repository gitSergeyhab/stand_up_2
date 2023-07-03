import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { ChatOptionLink, ChatOptionUL } from "./chat-option-list-style";
import { Role } from "../../store/actions";
import { getUser } from "../../store/user-reducer/user-selectors";
import { getColorFromUserData } from "../../utils/chat-utils";
import socket from "../../socket-io";


type User = {
  nik: string;
  userId: string;
  roles: Role[]
}

export function ChatOption({user}: {user: User}) {

  const authUser = useSelector(getUser)
  const {nik, roles, userId} = user;

  const userColor = getColorFromUserData({roles, userAuthId: authUser?.id, userMessageId: userId});
  return <li><ChatOptionLink color={userColor} to={`/users/${userId}`}>{nik}</ChatOptionLink></li>
}

export function ChatOptionList() {

  const [users, setUsers]  = useState<User[]>([]);


  useEffect(() => {
    socket.on('users', (user) => {
      setUsers((prev) => [...prev, user] );
    })
  }, [])
  const optionElements = users.map((item) => <ChatOption key={item.userId} user={item}/>)

  return (
    <ChatOptionUL>
      {optionElements}
    </ChatOptionUL>
  )
}
