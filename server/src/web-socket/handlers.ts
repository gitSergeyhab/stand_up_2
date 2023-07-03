import dayjs from "dayjs";
import { Server, Socket } from "socket.io";

export const Room = {
    Common: 'common',
    Support: 'support'
}

export const SocketUsersOfRoom = new Map([
    [Room.Common, new Map()],
    [Room.Support, new Map()]
]);


const DEFAULT_DATE_TIME_FORMAT = 'DD.MM.YYYY | HH:mm:ss'
export const formatDateFromTimeStamp = (timestamp: number) => dayjs(new Date(timestamp).toLocaleString()).format(DEFAULT_DATE_TIME_FORMAT);
type Message = {
    userId: string;
    avatar?: string;
    roles: string[];
    text: string;
    nik: string;
    room: string;
}

type User = {
    userId: string;
    nik: string;
    roles: string[];
    room: string
}

export const messageHandler = (io: Server, data: Message) => {
    const date = Date.now();
    const {room} = data;
    // io.to(room).emit('response', {...data, id: String(date) + data.userId, date });
    console.log(new Date(), new Date(date), date, formatDateFromTimeStamp(date))
    io.emit('response', {...data, id: String(date) + data.userId, date });


}

export const addUserHandler = (io: Server, socket: Socket, data: User) => {
    console.log({data});

    const room = SocketUsersOfRoom.get(data.room);
    if (!room) return;

    const oldUser = room.get(data.userId);
    if (oldUser) return;
    const date = Date.now();
    socket.join(data.room);
    
    room.set(data.userId, data);
    console.log({SocketUsersOfRoom})
    io.emit('response', {...data, id: String(date) + data.userId, date, text: '', isJoin: true})
}