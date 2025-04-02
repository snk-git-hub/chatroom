import {WebSocketServer, WebSocket} from 'ws';
const ws = new WebSocketServer ({port:8080});
let userconnected =0;
let allSocket: { socket: WebSocket; id: string }[] = [];

ws.on('connection',(socket)=>{
  
    console.log('Client connected');
    userconnected++;
    const id=`Client-${userconnected}`
    allSocket.push({socket,id});
    socket.on('message',(e)=>{
        console.log(`${id}: `,e.toString());
        
      allSocket.forEach(({socket:clientSocket}) => {
        if (clientSocket !== socket && clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send( `${id}: ${e.toString()}`);
        }
    });}) 

    socket.on('close', () => {
        allSocket=allSocket.filter(client=>client.socket!==socket);
         userconnected--;
         console.log(`${id}: `,"disconnected")
    });
    console.log(userconnected);
})

  
   
