import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient, MessageFromClient, MessageToClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const messageHandler = async (io: Server, socket: Socket, data: MessageFromClient) => {
    console.log({data}, 'messageHandler');
    const {roomId, userId, text} = data;
    
    // добавить сообщение в БД
    const messageId = await chatService.addMessage(userId, roomId, text);
    //  забрать новое сообщение из БД (с дополнительными данными: nik, avatar, date) и 
    const messageDataForClient = await chatService.getMessageDataById(messageId as number);
    // переслать всем отправителя(СОКЕТ) 
    io.to(roomId).emit(SocketEvent.ResponseOneMessage, messageDataForClient);

    
}