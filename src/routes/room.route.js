const express = require('express');
const MessageRepository = require('../repositories/message.repository');
const router = express.Router();

// GET /rooms/:roomId/messages
router.get('/:roomId/messages', async (req, res) => {
  try {
    // Extract the room name directly from the URL path
    const { roomId } = req.params;
    const messages = await MessageRepository.getHistoryByRoom(roomId);
    
    res.json(messages);
  } catch (error) {
    console.error('Failed to fetch room history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;