
import { useState, Dispatch, SetStateAction } from "react";
import { ChatColor, ChatPosition, Room, RoomName } from "../../const/chat";
import { ButtonsDiv, ChatHeader, ChatSection, SettingsDiv } from "./chat-block-style";
import { ChatColorBlock } from "../chat-color-block/chat-color-block";
import { ChatPositionBlock } from "../chat-position-block/chat-position-block";
import { ActionBtn, CloseBtn, HideBtn, SettingBtn } from "../common/common";
import { ChatInput } from "../chat-input/chat-input";
import { ChatMessageBlock } from "../chat-message-block/chat-message-block";
import { ChatOptionList } from "../chat-option-list/chat-option-list";
import { ChatRoomList } from "../chat-option-list/chat-room-list";




const psesdo = [
  {userId: '1', nik: 'user 1', roles: ['USER', 'ADMIN']},
  {userId: '2', nik: 'user 22', roles: ['USER' ]},
  {userId: '3', nik: 'user 333', roles: [ 'ADMIN', 'MODERATOR']},
  {userId: '4', nik: 'user 4444', roles: ['USER', ]},
  {userId: '5', nik: 'user 1', roles: ['MODERATOR']},
  {userId: '6', nik: 'user 22', roles: ['USER',  'MODERATOR']},
  {userId: '7', nik: 'user 333', roles: ['USER']},
  {userId: '8', nik: 'user44445655885hfhfhhhhodk j', roles: ['USER',  'MODERATOR']},
  {userId: '9', nik: 'user 1', roles: ['USER']},
  {userId: '10', nik: 'user 22', roles: ['USER', ]},
  {userId: '11', nik: 'user 333', roles: ['MODERATOR']},
  {userId: '12', nik: 'user 4444', roles: [ 'ADMIN']},
]


type ChatBlockProps = {
  onClose: () => void;
  onHide: () => void;
  hide?: boolean;
  room: string,
  setRoom: Dispatch<SetStateAction<string>>

}

export function ChatBlock({onClose, onHide, hide, room, setRoom}: ChatBlockProps) {

  const [color, setColor] = useState(ChatColor.Red);
  const [position, setPosition] = useState(ChatPosition.Center);
  const [setting, setSetting] = useState(false);
  const [users, setUsers] = useState(false);
  const [rooms, setRooms] = useState(false);


  const handleSettingsClick = () => {
    setUsers(false);
    setRooms(false);
    setSetting((prev) => !prev)
  };

  const handleUsersClick = () => {
    setSetting(false);
    setRooms(false);
    setUsers((prev) => !prev);
  };

  const handleRoomsClick = () => {
    setSetting(false);
    setUsers(false);
    setRooms((prev) => !prev);
  };

  const settingsElement = setting ? (
    <SettingsDiv>
      <ChatColorBlock selected={color} setColor={setColor}/>
      <ChatPositionBlock selected={position} setPosition={setPosition} />
    </SettingsDiv>
  ) : null;

  const usersElement = users ?  <ChatOptionList/> : null;

  const roomElement = rooms ?  <ChatRoomList room={room} setRoom ={setRoom}/> : null;
  const roomName = RoomName[room]

  const buttonsElement =  (
    <ButtonsDiv>
      {settingsElement}
      {usersElement}
      {roomElement}
      <ActionBtn onClick={handleRoomsClick} width={4} sign="чаты" active={rooms}/>
      <ActionBtn onClick={handleUsersClick} width={5} sign="юзеры" active={users}/>
      <SettingBtn onClick={handleSettingsClick} active={setting} />
      <HideBtn onClick={onHide} disabled={setting}/>
      <CloseBtn onClick={onClose} disabled={setting}/>
    </ButtonsDiv>
  )

  return (
    <ChatSection position={position} hide={hide}>
      <ChatHeader>{roomName}</ChatHeader>
      {buttonsElement}
      <ChatMessageBlock color={color} room={room}  />
      <ChatInput room={room} />

    </ChatSection>
  )
}
