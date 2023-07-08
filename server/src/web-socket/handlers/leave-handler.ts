import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient } from "../../types";

export const leaveHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    const {roomId} = data;
    socket.leave(roomId);
}