import { connect } from 'socket.io-client';
import { SERVER_URL } from './const/const';


const socket = connect(SERVER_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

export default socket;
