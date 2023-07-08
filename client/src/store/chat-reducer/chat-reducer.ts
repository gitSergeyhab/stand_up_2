import { createReducer } from '@reduxjs/toolkit';
import { Room } from '../../types/chat-types';
import { setActiveRoom, setChatState, setRooms } from '../actions';


const DefaultRoom = {roomId: 1, roomName: 'Болталка', roomNameEn: 'chat'}

export type InitialChatState = {
  rooms: Room[];
  activeRoom: Room;
  chatState: boolean
};

const initialState: InitialChatState = {
  rooms: [DefaultRoom],
  activeRoom: DefaultRoom,
  chatState: false
};

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRooms, (state, action) => { state.rooms = action.payload })
    .addCase(setActiveRoom, (state, action) => { state.activeRoom = action.payload })
    .addCase(setChatState, (state, action) => { state.chatState = action.payload })
});
