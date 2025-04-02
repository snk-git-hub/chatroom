"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
let userconnected = 0;
let allSocket = [];
ws.on('connection', (socket) => {
    console.log('Client connected');
    userconnected++;
    const id = `Client-${userconnected}`;
    allSocket.push({ socket, id });
    socket.on('message', (e) => {
        console.log(`${id}: `, e.toString());
        allSocket.forEach(({ socket: clientSocket }) => {
            if (clientSocket !== socket && clientSocket.readyState === ws_1.WebSocket.OPEN) {
                clientSocket.send(`${id}: ${e.toString()}`);
            }
        });
    });
    socket.on('close', () => {
        allSocket = allSocket.filter(client => client.socket !== socket);
        userconnected--;
        console.log(`${id}: `, "disconnected");
    });
    console.log(userconnected);
});
