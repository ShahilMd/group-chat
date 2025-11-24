import { io } from 'socket.io-client';

export function connectWS() {
    return io('https://group-chat-bec9.onrender.com');
}
