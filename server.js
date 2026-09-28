const http = require('http');
const app = require('./src/app');
const initChatSockets = require('./src/websockets/chat.socket');
const { initRedis } = require('./src/services/redis.service');
const MessageRepository = require('./src/repositories/message.repository');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize both databases simultaneously before starting the web servers
Promise.all([
  initRedis(), 
  MessageRepository.initTable()
]).then(() => {
  initChatSockets(server);
  
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1); // Force a crash so Docker Compose restarts the container
});