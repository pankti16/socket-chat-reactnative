/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {SocketProvider} from './src/socket';
import ChatScreen from './src/screens/chat_screen';
import {useEffect} from 'react';
import socketService from './src/services/socket_services';

const App = () => {
  useEffect(() => {
    socketService.initializeSocket();
  }, []);
  return (
    // <SocketProvider>
    <ChatScreen />
    // </SocketProvider>
  );
};

export default App;
