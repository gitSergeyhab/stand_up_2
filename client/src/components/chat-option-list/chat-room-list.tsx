import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatOptionLink, ChatOptionUL } from "./chat-option-list-style";
import { getActiveRoom, getRooms } from "../../store/chat-reducer/chat-selectors";
import { Room } from "../../types/chat-types";
import { setActiveRoom, } from "../../store/actions";
import { joinRoom } from "../../utils/chat-utils";
import { getUser } from "../../store/user-reducer/user-selectors";


type ChatRoomListProps = {
  onClose: () => void
}

type ChatRoomProps = ChatRoomListProps & {room: Room}


export function ChatRoom({room,  onClose} : ChatRoomProps) {

  const user = useSelector(getUser);
  const dispatch = useDispatch()
  const activeRoom = useSelector(getActiveRoom);

  console.log({activeRoom, room})

  const color = room.roomId === activeRoom?.roomId ? 'goldenrod' : '#FFF';

  const handleRoomClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    if (!user) return;
    joinRoom({userId: user.id, leaveRoomId: activeRoom?.roomId, joinRoomId: room.roomId});
    dispatch(setActiveRoom(room));
    onClose();
  }
  return (
    <li>
      <ChatOptionLink color={color} to="/" onClick={handleRoomClick}>
        {room.roomName}
      </ChatOptionLink>
    </li>
    )
}


export function ChatRoomList({onClose} : ChatRoomListProps) {
  const rooms = useSelector(getRooms);
  const roomElements = rooms.map((item) => <ChatRoom room={item} key={item.roomId} onClose={onClose}/>);
  return (
    <ChatOptionUL>
      {roomElements}
    </ChatOptionUL>
    )
}
