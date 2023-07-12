export const ChatColor = {
  Light: '#fbecda',
  Dark: '#222',
  // Black: '#000',
  Red: 'rgb(27, 17, 17)',
  Yellow: '#f9de9b'
}

export const ChatPosition = {
  Center: 'center',
  Left: 'left',
  Right: 'right',
  Bottom: 'bottom',
}

export const enum ChatState {
  Open = 'Open',
  Close = 'Close',
  Hide = 'Hide',
}


export const SocketEvent = {
  Join: 'join',
  Leave: 'leave',
  ResponseOneMessage: 'response:one',
  ResponseAllMessages: 'response:all',
  MessageFromClient: 'message',
  Connect: 'connect',
  Disconnect: 'disconnect',
  ResponseUsers: 'response:users',
  RequestUsers: 'request:users'
}
