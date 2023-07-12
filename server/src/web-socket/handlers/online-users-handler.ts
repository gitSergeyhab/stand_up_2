import { Server, Socket } from "socket.io";
import { chatService } from "../../service/chat-service";
import { SocketEvent } from "../../const/socket-const";

export const onlineUsersHandler = async (io: Server, _socket: Socket, roomId: string) => {
    await chatService.UpdateUsersInRoom(io, roomId);
}