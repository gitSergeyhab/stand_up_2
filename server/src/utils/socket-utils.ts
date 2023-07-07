

type GetAutoMessage = {
    isJoin?: boolean,
}

export const getAutoMessage = ({isJoin}: GetAutoMessage) => 
    `${isJoin ? 'entered': 'left'} the room`;
