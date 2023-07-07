import { SocketEvent } from "../const/chat";
import socket from "../socket-io";
import { Role } from "../store/actions";

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
export const getColorFromUserData = ({roles, userAuthId, userMessageId}: GetColorFromUserData) => {
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


type JoinRoom = {
  userId: string;
  joinRoomId: number;
  leaveRoomId?: number;
}
export const joinRoom = ({ userId, leaveRoomId, joinRoomId }: JoinRoom) => {
  if (leaveRoomId) {
    socket.emit(SocketEvent.Leave, {userId,  roomId: leaveRoomId})
  }
  socket.emit(SocketEvent.Join, {userId,  roomId: joinRoomId})
}
