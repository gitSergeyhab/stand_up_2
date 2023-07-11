import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient, MessageToClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const joinHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
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
        // если юзер не в комнате - 
        // забрать новое сообщение из БД (с дополнительными данными: nik, avatar, date)
        const messageDataForClient = await chatService.getMessageDataById(messageId);
        // и переслать всем кроме отправителя(СОКЕТ) 
        socket.to(roomId).emit(SocketEvent.ResponseOneMessage, messageDataForClient);
        // добавить юзера в комнату (БД)
        await chatService.insertUserToRoom(userId, roomId, socket.id);
    }
    await chatService.UpdateUsersInRoom(io, roomId)

    // // получить список socket_id юзеров в этой комнате
    // const socketIndexesInRoom = chatService.getUserSocketIndexesOfRoom(io, roomId); 
    // // получить список user_id юзеров в этой комнате
    // const usersInRoom = await chatService.getUsersBySocketIndexes(socketIndexesInRoom);
    // // отправить всем в комнате список юзеров
    // io.in(roomId).emit(SocketEvent.ResponseUsers, usersInRoom);
}