import { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { ChatOptionLink, ChatOptionUL } from "./chat-option-list-style";
import { Room, RoomName } from "../../const/chat";

const rooms = Object.values(Room);

type ChatRoomListProps = {
  room: string;
  setRoom: Dispatch<SetStateAction<string>>
}

type ChatRoomProps = ChatRoomListProps & {active: string}


export function ChatRoom({room, setRoom, active} : ChatRoomProps) {

  const color = room === active ? 'goldenrod' : '#FFF';
  const roomName = RoomName[room];


  const handleRoomClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault()
    setRoom(room)
  }
  return (
    <li>
      <ChatOptionLink color={color} to="/" onClick={handleRoomClick}>
        {roomName}
      </ChatOptionLink>
    </li>
    )
}



export function ChatRoomList({room, setRoom} : ChatRoomListProps) {
  const roomElements = rooms.map((item) => <ChatRoom room={item} active={room} setRoom={setRoom}/>)
  return (
    <ChatOptionUL>
      {roomElements}
    </ChatOptionUL>
    )
}
