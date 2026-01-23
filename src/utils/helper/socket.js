import { io } from "socket.io-client";
import { SOCKET_URL } from "./constant"; // 👈 Import SOCKET_URL, not Base_URL

export const createSocketConnection = () => {
    // ✅ Always return a NEW connection. 
    // React's useEffect will handle disconnecting it when you leave the page.

    return io(SOCKET_URL, {
        withCredentials: true,
    });
};