import { Server, Socket } from "socket.io";
import { ImageFile, MessageFromClient } from "../../types";
import { chatService } from "../../service/chat-service";
import { SocketEvent } from "../../const/socket-const";
import { imageService } from "../../service/image-service";
import { ImageType } from "../../const/const";
import { getNewFileName } from "../../utils/utils";

export const messageHandler = async (io: Server, socket: Socket, data: MessageFromClient) => {
    const {roomId, userId, text, fileData} = data;

    let imageId = '';
    console.log({imageId, fileData})
    if (fileData) {
        console.log({fileData}, '+++++______________+++++++++++++++')
        const {file, name, size, type} = fileData;
        const filename = getNewFileName(name)
        await imageService.saveFile(file, filename, type, ImageType.chat);
        const fileInfo: ImageFile = {
            destination: `/image/chat/`,
            filename,
            mimetype: type,
            size,
        }
        imageId = await imageService.createImage({file: fileInfo, dir: ImageType.chat, type: ImageType.images}) as string;
        // src = `images/${ImageType.chat}/` // если выживу, продолжить отсюда
    }
    console.log({imageId})

    console.log({fileData}, '++++++++++++++++++++')
    // добавить сообщение в БД
    const messageId = await chatService.addMessage(userId, roomId, text, false, imageId);
    //  забрать новое сообщение из БД (с дополнительными данными: nik, avatar, image, date) и 
    const messageDataForClient = await chatService.getMessageDataById(messageId as number);
    // переслать всем отправителя(СОКЕТ) 
    io.to(roomId).emit(SocketEvent.ResponseOneMessage, {...messageDataForClient});  

}