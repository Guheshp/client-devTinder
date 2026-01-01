import { io } from "socket.io-client";
import { Base_URL } from "./constant";

export const createSocketConnection = () => {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        return io(Base_URL, {
            withCredentials: true,
        });
    } else {
        return io('/', {
            path: '/socket.io',

        });
    }
};