import { MessageCC, MessageSC, Room, RoomSC, User, UserSC } from "../../types/chat-types";


export const adaptMessage = (data: MessageSC): MessageCC => ({
  messageAdded: data.message_added,
  messageAuto: data.message_auto ,
  messageId: data.message_id ,
  roomId: data.room_id ,
  userId: data.user_id ,
  userNik: data.user_nik ,
  userRoles: data.user_roles ,
  messageText: data.message_text ,
  avatar: data.avatar,
  image: data.image,

  quoteAdded: data.quote_added,
  quoteId: data.quote_id,
  quoteImage: data.quote_image,
  quoteText: data.quote_text,
  quoteUserId: data.quote_user_id,
  quoteUserNik: data.quote_user_nik
})

export const adaptMessages = (data: MessageSC[]): MessageCC[] => data.map(adaptMessage)

const adaptRoom = (data: RoomSC): Room => ({
  roomId: data.room_id,
  roomName: data.room_name,
  roomNameEn: data.room_name_en
})

export const adaptRooms = (data: RoomSC[]): Room[] => data.map(adaptRoom)

export const adaptSocketUser = (data: UserSC): User => ({
  userNik: data.user_nik,
  userRoles: data.user_roles,
  userId: data.user_id
})

export const adaptSocketUsers = (data: UserSC[]): User[] => data.map(adaptSocketUser)
