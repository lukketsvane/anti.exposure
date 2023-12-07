const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sender, suggestion } = req.body;

    if (!sender || !suggestion) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      await pool.query('INSERT INTO messages (sender, suggestion) VALUES ($1, $2)', [sender, suggestion]);
      res.status(200).json({ message: 'Message stored successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  } else if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM messages');
      res.status(200).json({ messages: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}