import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const joinHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    const {roomId, userId} = data;
    socket.join(roomId);
    // получить и переслать все ообщения в комнате только отправителю
    const allMessagesFromRoom = await chatService.getMessagesByRoom(roomId);
    socket.emit(SocketEvent.ResponseAllMessages, allMessagesFromRoom);
 
    // если юзер-комнаты нет в БД
    const isUserInRoom = await chatService.checkUserInRoom(userId, roomId);
    // добавить юзера, которы в чат не входил никогда
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
    // если сокета нет в БД (зачит была-есть юзер-комната, но с другим сокетом)
    const isSocketInRoom = await chatService.checkUserInRoomBySocket(socket.id);
    // обновить сокет, что бы при выходе удалять юзера по сокету
    if (!isSocketInRoom) {
        await chatService.updateSocketInDB(socket.id, userId, roomId)
    }
    await chatService.UpdateUsersInRoom(io, roomId);
}