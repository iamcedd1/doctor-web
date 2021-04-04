// UTILS
import openSocket from "socket.io-client";
export const socket = openSocket(window.NOTIFICATION_URL, {
    path: "/api/subscriptions",
    transports: ["websocket"],
});