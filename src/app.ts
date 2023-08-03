// import express from 'express';
// import { Server } from 'http';
// import { Socket, Server as SocketServer } from 'socket.io';

// const app = express();
// const server: Server = new Server(app);
// const io: SocketServer = new SocketServer(server, {
//   allowEIO3: true,
//   cors: {
//       origin: true,
//       credentials: true
//   },
// });

// const port: number = 3000;

// io.on('connection', (socket: Socket) => {
//     socket.on('join', (data: { roomName: string }) => {
//       console.log('asdfsf');
//         const roomName: string = data.roomName;
//         socket.join(roomName);
//         socket.to(roomName).broadcast.emit('new-user', data);

//         socket.on('disconnect', (data) => {
          
//           console.log(data);
          
//             socket.to(roomName).broadcast.emit('bye-user', data);
//         }); 
//     });
// });

// server.listen(port, () => {
//     console.log(`Server running port ${port}`);
// });

import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
});

const port = 3000;

io.on('connection', (socket: Socket) => {
  socket.on('join', (data: { roomName: string }) => {
    const roomName = data.roomName;
    socket.join(roomName);
    (socket.to(roomName) as any).broadcast?.emit('new-user', data);

    socket.on('disconnect', () => {
      (socket.to(roomName) as any).broadcast?.emit('bye-user', data);
    });
  });
});

server.listen(port, () => {
  console.log(`Server running port ${port}`);
});