

type GetAutoMessage = {
    isJoin?: boolean,
}

/**
 * создает сообщение 'entered the room' / 'left the room'
 * @param param0 {isJoin} - boolean - вошел в room 
 * @returns 
 */
export const getAutoMessage = ({isJoin}: GetAutoMessage) => 
    `${isJoin ? 'entered': 'left'} the room`;
