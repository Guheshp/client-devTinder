import { io } from "socket.io-client";
import { Base_URL } from "./constant";

let socket; // 🔥 SINGLE INSTANCE

export const createSocketConnection = () => {
    if (!socket) {
        if (
            location.hostname === 'localhost' ||
            location.hostname === '127.0.0.1'
        ) {
            socket = io(Base_URL, {
                withCredentials: true,
            });
        } else {
            socket = io('/', {
                path: '/socket.io',
            });
        }
    }

    return socket;
};
