// pages/api/submit-note.js

// In-memory storage (this will reset when the server restarts)
let messages = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { from, suggestion } = req.body;

    // Add the new message to the array
    messages.push({ from, suggestion });

    res.status(200).json({ messages });
  } else if (req.method === 'GET') {
    // Return all messages
    res.status(200).json({ messages });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
