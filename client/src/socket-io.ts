import { connect } from 'socket.io-client';
import { SERVER_URL } from './const/const';


const socket = connect(SERVER_URL);

export default socket;
