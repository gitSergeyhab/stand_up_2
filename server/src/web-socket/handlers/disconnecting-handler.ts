import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient,  RoomUserId } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const disconnectingHandler = async (io: Server, socket: Socket) => {
  console.log('_____________disconnectingHandler__________');
  const roomIndexes = await chatService.GetRoomsId();



  const rooms = [...io.sockets.adapter.rooms.keys()];

  console.log({rooms})

//   const roomsUsersId = await chatService.getRoomUserBySocket(socket.id);
//   //если юзера с socket.id нет в комнате - завершить
//   if (!roomsUsersId) return;
}