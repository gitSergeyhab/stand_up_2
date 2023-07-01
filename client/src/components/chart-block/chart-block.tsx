
import { useState } from "react";
import { ChatColor, ChatPosition } from "../../const/chat";
import { ButtonsDiv, ChatSection, SettingsDiv } from "./chart-block-style";
import { ChatColorBlock } from "../chat-color-block/chat-color-block";
import { ChatPositionBlock } from "../chat-position-block/chat-position-block";
import { CloseBtn, HideBtn, SettingBtn } from "../common/common";
import { ChatInput } from "../chat-input/chat-input";
import { ChatMessageBlock } from "../chat-message-block/chat-message-block";




// const messages = [
//   {userId: '1', avatar: '', roles: [Role.Admin], text: 'first text', id: '1', nik: 'admin 1'},
//   {userId: '2', avatar: '', roles: [Role.User], text: 'sec text  2', id: '2', nik: 'user 2'},
//   {userId: '7', avatar: '', roles: [Role.User], text: 'my text ! MAIN!!!', id: '3', nik:'I i iam'},
//   {userId: '3', avatar: '', roles: [Role.Moderator], text: 'first text', id: '4', nik:'moder'},
//   {userId: '2', avatar: '', roles: [Role.User], text: '!!! )))', id: '5', nik:'user 2'},
//   {userId: '1', avatar: '', roles: [Role.Admin], text: 'first text', id: '6', nik: 'admin 1'},
//   {userId: '2', avatar: '', roles: [Role.User], text: 'sec text  2', id: '7', nik: 'user 2'},
//   {userId: '7', avatar: '', roles: [Role.User], text: 'my text ! MAIN!!!', id: '8', nik:'I i iam'},
//   {userId: '3', avatar: '', roles: [Role.Moderator], text: 'first text', id: '9', nik:'moder'},
//   {userId: '2', avatar: '', roles: [Role.User], text: '!!! )))', id: '10', nik:'user 2'},
//   {userId: '1', avatar: '', roles: [Role.Admin], text: 'first text', id: '11', nik: 'admin 1'},
//   {userId: '2', avatar: '', roles: [Role.User], text: 'sec text  2', id: '12', nik: 'user 2'},
//   {userId: '7', avatar: '', roles: [Role.User], text: 'my text ! MAIN!!!', id: '13', nik:'I i iam'},
//   {userId: '3', avatar: '', roles: [Role.Moderator], text: 'first text', id: '14', nik:'moder'},
//   {userId: '2', avatar: '', roles: [Role.User], text: '!!! )))', id: '15', nik:'user 2'},
// ]


type ChatBlockProps = {
  onClose: () => void;
  onHide: () => void;
  hide?: boolean
}

export function ChatBlock({onClose, onHide, hide}: ChatBlockProps) {

  const [color, setColor] = useState(ChatColor.Red);
  const [position, setPosition] = useState(ChatPosition.Center);
  const [setting, setSetting] = useState(false);


  const handleSettingsClick = () => setSetting((prev) => !prev);

  const settingsElement = setting ? (
    <SettingsDiv>
        <ChatColorBlock selected={color} setColor={setColor}/>
        <ChatPositionBlock selected={position} setPosition={setPosition} />
    </SettingsDiv>
  ) : null;

  const buttonsElement =  (
    <ButtonsDiv>
      {settingsElement}
      <SettingBtn onClick={handleSettingsClick} />
      <HideBtn onClick={onHide} disabled={setting}/>
      <CloseBtn onClick={onClose} disabled={setting}/>

    </ButtonsDiv>
  )

  return (
    <ChatSection position={position} hide={hide}>
      {buttonsElement}
      <ChatMessageBlock color={color}  />
      <ChatInput />

    </ChatSection>
  )
}
