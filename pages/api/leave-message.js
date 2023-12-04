// pages/api/leave-message.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Only allow POST requests
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Extract data from the request body
    const { from, suggestion } = req.body;

    // Add validation for the input data
    if (!from || !suggestion) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // TODO: Add logic to store the message in a database or another storage solution

    console.log('Message Received:', { from, suggestion });
    
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    // Handle any other errors
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
