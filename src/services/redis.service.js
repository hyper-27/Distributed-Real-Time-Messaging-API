const { createClient } = require('redis');

// Create the publishing client pointing to your local Docker container
const pubClient = createClient({ url: 'redis://redis:6379' });

// Duplicate it to create the dedicated listening client
const subClient = pubClient.duplicate();

async function initRedis() {
  pubClient.on('error', (err) => console.error('Redis Pub Error', err));
  subClient.on('error', (err) => console.error('Redis Sub Error', err));

  await pubClient.connect();
  await subClient.connect();
  console.log('Successfully connected to Redis Pub/Sub');
}

module.exports = { pubClient, subClient, initRedis };