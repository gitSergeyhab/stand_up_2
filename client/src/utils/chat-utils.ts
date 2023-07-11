import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
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
  userId?: string;
  joinRoomId: number;
  leaveRoomId?: number;
}
export const joinRoom = ({ userId, leaveRoomId, joinRoomId }: JoinRoom) => {
  if (!userId) return;
  if (leaveRoomId) {
    socket.emit(SocketEvent.Leave, {userId,  roomId: leaveRoomId});
  }
  socket.emit(SocketEvent.Join, {userId,  roomId: joinRoomId});
}

// type SetBlobAsSrc = {
//   setSrc: Dispatch<SetStateAction<string>>;
//   file: File
// }
// export const setBlobAsSrc = ({setSrc, file}: SetBlobAsSrc) => {
//   try {

//     const blob = new Blob([file], {type: 'file'})
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       const {result} = reader;
//       if (result) {
//         setSrc(result as string)
//       }
//     }
//   } catch (err) {
//     console.log({err}, 'setBlobAsSrc')
//     toast.warn('cannot show image')
//   }

// }
