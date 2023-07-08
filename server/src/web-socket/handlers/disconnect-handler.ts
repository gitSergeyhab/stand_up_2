import { Server, Socket } from "socket.io";
import { EmptyMessageFromClient, MessageToClient, RoomUserId } from "../../types";
import { chatService } from "../../service/chat-service";
import { getAutoMessage } from "../../utils/socket-utils";
import { SocketEvent } from "../../const/socket-const";

export const disconnectHandler = async (io: Server, socket: Socket) => {
    const roomsUsersId = await chatService.getRoomUserBySocket(socket.id);
    //если юзера с socket.id нет в комнате - завершить
    if (!roomsUsersId || !roomsUsersId.length) return;
    await chatService.deleteUserFromRoomBySocket(socket.id);

    const dbMessageText = getAutoMessage({})
    const messageIndexes = await chatService.addMessages(roomsUsersId as RoomUserId[], dbMessageText, true);
    if (!messageIndexes) return;
    const messagesDataForClient = await chatService.getMessagesDataById(messageIndexes);
    //отпрвить по каждой строччке из бд сообщение, что юзер покинул комнату 
    //- на данный момент строка всего 1 (юзер изначально 1, и сейчас он может находиться только в 1 комнате)
    messagesDataForClient.forEach((item) => {
        socket.to(item.room_id).emit(SocketEvent.ResponseOneMessage, item)
    })
}