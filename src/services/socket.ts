import { io, Socket } from 'socket.io-client';
import { useSocketStore } from '@/stores/socket';
import {
  SOCKET_EVENT_CONNECT,
  SOCKET_EVENT_DISCONNECT,
  SOCKET_EVENT_MESSAGE,
} from './const';
import type { Message } from '@/stores/socket';


//Init Socket service
const URL = import.meta.env.VITE_WS_URL;

const current: Socket = io(URL, {
  autoConnect: false,
});

export function useSocket() {
  const socketStore = useSocketStore();

  current.on(SOCKET_EVENT_CONNECT, () => {
    console.log('Connected to Socket.io server');
  });

  current.on(SOCKET_EVENT_DISCONNECT, () => {
    console.log('Disconnected from Socket.io server');
  });

  current.on(SOCKET_EVENT_MESSAGE, (message: Message) => {
    socketStore.addMessage(message);
  });

  const asyncConnect = async () => {
    current.connect();
  }
  

  return {
    // Expose any additional methods or properties you need
    current,
    asyncConnect
  };
}