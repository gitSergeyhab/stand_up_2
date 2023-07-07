import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient, MessageToClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const leaveHandler = async (io: Server, socket: Socket, data: EmptyMessageFromClient) => {
    console.log({data}, 'leaveHandler');
    const {roomId, userId} = data;
    socket.leave(roomId);
    const dbMessageText = getAutoMessage({})
    const messageId = await chatService.addMessage(userId, roomId, dbMessageText, true);
        // если юзер не в комнате - забрать новое сообщение из БД (с дополнительными данными: nik, avatar, date) и 
    const messageDataForClient = await chatService.getMessageDataById(messageId as number);
        // переслать всем кроме отправителя(СОКЕТ) 
    socket.to(roomId).emit(SocketEvent.ResponseOneMessage, messageDataForClient);
        // удалить юзера из комнаты (БД)
    await chatService.deleteUserFromRoom(userId, roomId);
}