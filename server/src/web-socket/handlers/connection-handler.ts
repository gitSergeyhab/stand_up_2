import { Server, Socket } from "socket.io";
import { SocketEvent } from "../../const/socket-const";
import { disconnectHandler } from "./disconnect-handler";
import { joinHandler } from "./join-handler";
import { leaveHandler } from "./leave-handler";
import { messageHandler } from "./message-handler";

export const connectionHandler = (socket: Socket, io: Server) => {
    socket.on(SocketEvent.Join, (data) => joinHandler(io, socket, data));
    socket.on(SocketEvent.MessageFromClient, (data) => messageHandler(io, socket, data));
    socket.on(SocketEvent.Leave, (data) => leaveHandler(io, socket, data));
    socket.on(SocketEvent.Disconnect, () => disconnectHandler(io, socket));
}