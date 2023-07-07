import { createReducer } from '@reduxjs/toolkit';
import { Room } from '../../types/chat-types';
import { setActiveRoom, setChatState, setRooms } from '../actions';
import { ChatState } from '../../const/chat';


const DefaultRoom = {roomId: 1, roomName: 'Болталка', roomNameEn: 'Support'}

export type InitialChatState = {
  rooms: Room[];
  activeRoom: Room | null;
  chatState: string
};

const initialState: InitialChatState = {
  rooms: [DefaultRoom],
  activeRoom: DefaultRoom,
  chatState: ChatState.Close
};

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRooms, (state, action) => { state.rooms = action.payload })
    .addCase(setActiveRoom, (state, action) => { state.activeRoom = action.payload })
    .addCase(setChatState, (state, action) => { state.chatState = action.payload })
});
