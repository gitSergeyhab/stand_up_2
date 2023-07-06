import { Server } from "http";
import { Socket } from "socket.io";
import { EmptyMessageFromClient } from "../../types";
import { chatService } from "../../service/chat-service";

export const joinHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    console.log({data});
    const {roomId, userId} = data;
    socket.join(roomId);
    const messageId = await chatService.addMessage(userId, roomId, '', true);
    console.log({messageId});

    // if (!room) return;

    // const oldUser = room.get(data.userId);
    // if (oldUser) return;
    // const date = Date.now();
    // socket.join(data.room);
    
    // room.set(data.userId, data);
    // console.log({SocketUsersOfRoom})
    // io.emit('response', {...data, id: String(date) + data.userId, date, text: '', isJoin: true})
}