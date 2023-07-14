import { createReducer } from '@reduxjs/toolkit';
import {  MessageCC, Room } from '../../types/chat-types';
import { setActiveRoom, setChatPosition, setChatState, setQuoteMessage, setRooms, setSocketJoin } from '../actions';
import { ChatPosition } from '../../const/chat';


const DefaultRoom = {roomId: 1, roomName: 'Болталка', roomNameEn: 'chat'}

export type InitialChatState = {
  rooms: Room[];
  activeRoom: Room;
  chatState: boolean;
  isJoin: boolean;
  quoteMessage: MessageCC|null;
  chatPosition: ChatPosition
};

const initialState: InitialChatState = {
  rooms: [DefaultRoom],
  activeRoom: DefaultRoom,
  chatState: false,
  isJoin: false,
  quoteMessage: null,
  chatPosition: ChatPosition.Center
};

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRooms, (state, action) => { state.rooms = action.payload })
    .addCase(setActiveRoom, (state, action) => { state.activeRoom = action.payload })
    .addCase(setChatState, (state, action) => { state.chatState = action.payload })
    .addCase(setSocketJoin, (state) => { state.isJoin = true })
    .addCase(setQuoteMessage, (state, action) => { state.quoteMessage = action.payload })
    .addCase(setChatPosition, (state, action) => { state.chatPosition = action.payload })
});
