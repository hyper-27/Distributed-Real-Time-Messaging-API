const { Pool } = require('pg');

// Create a connection pool pointing to your local Docker container
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'secret',
  port: 5432,
});

class MessageRepository {
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        room VARCHAR(50) NOT NULL,
        payload TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('Postgres messages table ready');
  }
  // Add this method inside your MessageRepository class
static async getHistoryByRoom(room, limit = 50) {
  const query = `
    SELECT * FROM messages 
    WHERE room = $1 
    ORDER BY created_at DESC 
    LIMIT $2;
  `;
  const result = await pool.query(query, [room, limit]);
  // Reverse the array so the oldest message in the batch appears first
  return result.rows.reverse();
}
  static async saveMessage(room, payload) {
    const query = `INSERT INTO messages (room, payload) VALUES ($1, $2) RETURNING *;`;
    const values = [room, payload];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = MessageRepository;