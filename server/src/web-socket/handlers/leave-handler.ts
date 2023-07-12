import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient } from "../../types";
import { chatService } from "../../service/chat-service";

export const leaveHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    const {roomId} = data;
    socket.leave(roomId);
    await chatService.UpdateUsersInRoom(io, roomId);
}