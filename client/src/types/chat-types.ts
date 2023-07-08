import { Role } from "../store/actions";

export type ChatState = 'open' | 'close' | 'hide';

export type MessageSC = {
  message_id: string,
  avatar?: string,
  user_id: string,
  user_nik: string,
  room_id: string,
  message_text?: string,
  message_auto: boolean,
  message_added: Date,
  user_roles: string[]
}



export type MessageCC = {
  messageId: string,
  avatar?: string,
  userId: string,
  userNik: string,
  roomId: string,
  messageText?: string,
  messageAuto: boolean,
  messageAdded: Date,
  userRoles: string[]
}

export type RoomSC = {
  room_id: number;
  room_name: string;
  room_name_en: string;
}

export type Room = {
  roomId: number;
  roomName: string;
  roomNameEn: string;
}

export type UserSC = {
  user_nik: string;
  user_id: string;
  user_roles: Role[]
}

export type User = {
  userNik: string;
  userId: string;
  userRoles: Role[]
}
