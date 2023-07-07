import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient, MessageToClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const joinHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    console.log({data}, 'joinHandler');
    const {roomId, userId} = data;
    socket.join(roomId);
    
    // получить и переслать все ообщения в комнате только отправителю
    const allMessagesFromRoom = await chatService.getMessagesByRoom(roomId);
    socket.emit(SocketEvent.ResponseAllMessages, allMessagesFromRoom);
 
    const isUserInRoom = await chatService.checkUserInRoom(userId, roomId);
    if (!isUserInRoom) {
        // техт, который бойдет в бд, но на клиент выводится не должен
        const dbMessageText = getAutoMessage({isJoin: true})
        const messageId = await chatService.addMessage(userId, roomId, dbMessageText, true);
        // если юзер не в комнате - забрать новое сообщение из БД (с дополнительными данными: nik, avatar, date) и 
        const messageDataForClient = await chatService.getMessageDataById(messageId as number);
        // переслать всем кроме отправителя(СОКЕТ) 
        socket.to(roomId).emit(SocketEvent.ResponseOneMessage, messageDataForClient);
        // добавить юзера в комнату (БД)
        await chatService.insertUserToRoom(userId, roomId, socket.id);

        // const socketIndexes = chatService.getUserSocketIndexesOfRoom(io, roomId);
        // const usersInRoom = await chatService.getUsersBySocketIndexes(socketIndexes);
        // console.log({usersInRoom})
    }

    const socketIndexes = chatService.getUserSocketIndexesOfRoom(io, roomId);
    const usersInRoom = await chatService.getUsersBySocketIndexes(socketIndexes);
    console.log({usersInRoom}, '_____________!______________')
    
}