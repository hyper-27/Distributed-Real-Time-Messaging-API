const WebSocket = require('ws');
const ChatService = require('../services/chat.service');
const { pubClient, subClient } = require('../services/redis.service');

function initChatSockets(server) {
  const wss = new WebSocket.Server({ 
    server,
    verifyClient: (info, callback) => {
      const requestUrl = new URL(info.req.url, `http://${info.req.headers.host}`);
      if (requestUrl.searchParams.get('token') === 'my-secret-token') {
        callback(true);
      } else {
        callback(false, 401, 'Unauthorized');
      }
    }
  });

  subClient.pSubscribe('room:*', (message, channel) => {
    const targetRoom = channel.split(':')[1];
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.currentRoom === targetRoom) {
        client.send(message);
      }
    });
  });

  wss.on('connection', (socket) => {
    socket.currentRoom = 'lobby';

    // The message handler is now asynchronous
    socket.on('message', async (rawMessage) => {
      try {
        const { type, room, payload } = JSON.parse(rawMessage);

        if (type === 'JOIN') {
          socket.currentRoom = ChatService.processJoin(room);
        }

        if (type === 'MESSAGE') {
          // Await the Service layer to finish saving to Postgres
          const outbound = await ChatService.handleIncomingMessage(socket.currentRoom, payload);
          pubClient.publish(`room:${socket.currentRoom}`, outbound);
        }
      } catch (error) {
        console.error('Message processing failed:', error);
      }
    });
  });

  return wss;
}

module.exports = initChatSockets;