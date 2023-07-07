
import { useState, } from "react";
import { useSelector } from "react-redux";
import { ChatColor, ChatPosition } from "../../const/chat";
import { ButtonsDiv, ChatHeader, ChatSection, SettingsDiv } from "./chat-block-style";
import { ChatColorBlock } from "../chat-color-block/chat-color-block";
import { ChatPositionBlock } from "../chat-position-block/chat-position-block";
import { ActionBtn, CloseBtn, HideBtn, SettingBtn } from "../common/common";
import { ChatInput } from "../chat-input/chat-input";
import { ChatMessageBlock } from "../chat-message-block/chat-message-block";
import { ChatOptionList } from "../chat-option-list/chat-option-list";
import { ChatRoomList } from "../chat-option-list/chat-room-list";
import { getActiveRoom } from "../../store/chat-reducer/chat-selectors";



type ChatBlockProps = {
  onClose: () => void;
  onHide: () => void;
  hide?: boolean;
}

export function ChatBlock({onClose, onHide, hide/* , room, setRoom */}: ChatBlockProps) {

  const [color, setColor] = useState(ChatColor.Red);
  const [position, setPosition] = useState(ChatPosition.Center);
  const [setting, setSetting] = useState(false);
  const [users, setUsers] = useState(false);
  const [rooms, setRooms] = useState(false);

  const activeRoom = useSelector(getActiveRoom);

  const handleCloseUserList = () => setUsers(false);
  const handleCloseRoomList = () => setRooms(false);

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

  const usersElement = users ?  <ChatOptionList onClose={handleCloseUserList}/> : null;

  const roomElement = rooms ?  <ChatRoomList  onClose={handleCloseRoomList}/> : null;

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
      <ChatHeader>{activeRoom?.roomName}</ChatHeader>
      {buttonsElement}
      <ChatMessageBlock color={color}   />
      <ChatInput  />

    </ChatSection>
  )
}
