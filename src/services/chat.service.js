const MessageRepository = require('../repositories/message.repository');

class ChatService {
  static processJoin(requestedRoom) {
    return requestedRoom.toLowerCase().trim();
  }

  static async handleIncomingMessage(room, payload) {
    // 1. Persist to Postgres via the Repository layer
    const savedRecord = await MessageRepository.saveMessage(room, payload);

    // 2. Build the broadcast envelope using the authoritative database values
    const messageData = {
      type: 'BROADCAST',
      room: savedRecord.room,
      payload: savedRecord.payload,
      id: savedRecord.id,
      timestamp: savedRecord.created_at
    };
    
    return JSON.stringify(messageData);
  }
}

module.exports = ChatService;