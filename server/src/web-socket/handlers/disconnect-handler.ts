import { Server, Socket } from "socket.io";
import { chatService } from "../../service/chat-service";


export const disconnectHandler = async (io: Server, socket: Socket) => {
    await chatService.deleteUserFromRoomBySocket(socket.id);
}


// export const disconnectHandler = async (io: Server, socket: Socket) => {
//     const roomsUsersId = await chatService.getRoomUserBySocket(socket.id);
//     //если юзера с socket.id нет в комнате - завершить
//     if (!roomsUsersId) return;
//     const dbMessageText = getAutoMessage({})
//     const {room_id, user_id} = roomsUsersId;
//     const messageId = await chatService.addMessage(user_id, room_id, dbMessageText, true);
//     if (!messageId) return;
//     const messageFromDB = await chatService.getMessageDataById(messageId);
//     //отпрвить по каждой строччке из бд сообщение, что юзер покинул комнату 
//     //- на данный момент строка всего 1 (юзер изначально 1, и сейчас он может находиться только в 1 комнате)
//     const roomId = messageFromDB.room_id
//     socket.to(roomId).emit(SocketEvent.ResponseOneMessage, messageFromDB);
//     await chatService.deleteUserFromRoomBySocket(socket.id);
// }