
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChatColor, ChatPosition, SocketEvent } from "../../const/chat";
import { ButtonsDiv, ChatHeader, ChatSection, SettingsDiv, SocketConnectedDetector } from "./chat-block-style";
import { ChatColorBlock } from "../chat-color-block/chat-color-block";
import { ChatPositionBlock } from "../chat-position-block/chat-position-block";
import { ActionBtn, HideBtn, SettingBtn } from "../common/common";
import { ChatInput } from "../chat-input/chat-input";
import { ChatMessageBlock } from "../chat-message-block/chat-message-block";
import { ChatRoomList } from "../chat-option-list/chat-room-list";
import { getActiveRoom } from "../../store/chat-reducer/chat-selectors";
import socket from "../../socket-io";
import { User, UserSC } from "../../types/chat-types";
import { adaptSocketUsers } from "../../utils/adapters/chat-adapters";
import { ChatUserList } from "../chat-option-list/chat-user-list";


const REQUEST_USERS_INTERVAL = 60000;

type ChatBlockProps = {
  onHide: () => void;
  hide?: boolean;
}

export function ChatBlock({ onHide, hide }: ChatBlockProps) {

  const activeRoom = useSelector(getActiveRoom);
  const [color, setColor] = useState(ChatColor.Red);
  const [position, setPosition] = useState(ChatPosition.Center);
  const [setting, setSetting] = useState(false);
  const [areUsers, setAreUsers] = useState(false);
  const [areRooms, setAreRooms] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [users, setUsers]  = useState<User[]>([]);

  useEffect(() => {
    const setAdaptedUsers = (data: UserSC[]) => {
      setUsers(adaptSocketUsers(data))
    };
    socket.on(SocketEvent.ResponseUsers, setAdaptedUsers);
    const connect = () => setIsConnected(true);
    const disconnect = () => setIsConnected(false);

    socket.on(SocketEvent.Connect, connect);
    socket.on(SocketEvent.Disconnect, disconnect);

    return () => {
      socket.off(SocketEvent.Connect, connect);
      socket.off(SocketEvent.Disconnect, disconnect);
      socket.off(SocketEvent.ResponseUsers, setAdaptedUsers);
    }
  }, [])

  useEffect(() => {
    const timer = (hide || !isConnected) ? 0 : setInterval(() => socket.emit(SocketEvent.RequestUsers, activeRoom.roomId), REQUEST_USERS_INTERVAL);
    return () => {
      clearInterval(timer);
    }
  }, [activeRoom, hide, isConnected])

  useEffect(() => {
    const closeAllOptions= (evt: MouseEvent) => {
      if (evt.target instanceof Element && !evt.target.closest('.ButtonsDiv')) {
        setAreRooms(false);
        setAreUsers(false);
        setSetting(false);
      }
    }

    document.addEventListener('click', closeAllOptions);
    return () => document.removeEventListener('click', closeAllOptions)
  }, [])

  const handleCloseUserList = () => setAreUsers(false);
  const handleCloseRoomList = () => setAreRooms(false);
  const handleSettingsClick = () => {
    setAreUsers(false);
    setAreRooms(false);
    setSetting((prev) => !prev)
  };
  const handleUsersClick = () => {
    setSetting(false);
    setAreRooms(false);
    setAreUsers((prev) => !prev);
  };
  const handleRoomsClick = () => {
    setSetting(false);
    setAreUsers(false);
    setAreRooms((prev) => !prev);
  };

  const settingsElement = setting ? (
    <SettingsDiv>
      <ChatColorBlock selected={color} setColor={setColor}/>
      <ChatPositionBlock selected={position} setPosition={setPosition} />
    </SettingsDiv>
  ) : null;

  const usersElement = areUsers ?  <ChatUserList users={users} onClose={handleCloseUserList}/> : null;

  const roomElement = areRooms ?  <ChatRoomList  onClose={handleCloseRoomList}/> : null;

  const buttonsElement =  (
    <ButtonsDiv className="ButtonsDiv">
      {settingsElement}
      {usersElement}
      {roomElement}
      <ActionBtn onClick={handleRoomsClick} width={4} sign="чаты" active={areRooms}/>
      <ActionBtn onClick={handleUsersClick} width={5} sign="юзеры" active={areUsers}/>
      <SettingBtn onClick={handleSettingsClick} active={setting} />
      <HideBtn onClick={onHide}/>
    </ButtonsDiv>
  )

  return (
    <ChatSection position={position} hide={hide}>
      <ChatHeader>{activeRoom?.roomName}<SocketConnectedDetector isConnected={isConnected}/></ChatHeader>
      {buttonsElement}
      <ChatMessageBlock color={color}   />
      <ChatInput  />
    </ChatSection>
  )
}
