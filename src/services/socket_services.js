import {io} from 'socket.io-client';
import {SOCKET_URL} from '../config';
import debugLogs from '../utils/debugLogs';

class SocketService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      debugLogs('initializing socket', this.socket);
      this.socket.on('connect', data => {
        debugLogs('socket connected', data);
      });
      this.socket.on('disconnect', data => {
        debugLogs('socket disconnected', data);
      });
      this.socket.on('error', data => {
        debugLogs('socket error', data);
      });
    } catch (error) {
      debugLogs('socket is not initialized', error);
    }
  };

  emit = (event, data = {}) => {
    try {
      this.socket.emit(event, data);
    } catch (error) {
      debugLogs('socket emit error', error);
    }
  };

  on = (event, cb) => {
    try {
      this.socket.on(event, cb);
    } catch (error) {
      debugLogs('socket on error', error);
    }
  };

  removeListener = listenerName => {
    try {
      this.socket.removeListener(listenerName);
    } catch (error) {
      debugLogs('socket remove listener error', error);
    }
  };
}

const socketService = new SocketService();

export default socketService;
