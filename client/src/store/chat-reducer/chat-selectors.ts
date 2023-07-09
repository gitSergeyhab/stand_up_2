import { ReducerName, ReducerType } from '../store';

export const getRooms = (state: ReducerType) => state[ReducerName.Chat].rooms;
export const getActiveRoom = (state: ReducerType) => state[ReducerName.Chat].activeRoom;
export const getChartState = (state: ReducerType) => state[ReducerName.Chat].chatState;
export const getJoin = (state: ReducerType) => state[ReducerName.Chat].isJoin;

