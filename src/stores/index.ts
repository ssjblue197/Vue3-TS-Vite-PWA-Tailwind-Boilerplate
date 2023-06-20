import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { io } from 'socket.io-client';

const pinia = createPinia();
//Init Socket service
const URL = import.meta.env.VITE_WS_URL;

export const socket = io(URL, {
  autoConnect: false,
});

// Attach the Socket.io instance to the Pinia store
pinia.use(({ store }) => {
  store.socket = socket;
});

pinia.use(piniaPluginPersistedstate);

export default pinia;
