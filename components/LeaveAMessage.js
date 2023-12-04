import React, { useState, useEffect } from 'react';
import Head from 'next/head';
const LeaveAMessage = () => {
  const [formData, setFormData] = useState({ from: '', suggestion: '' });
  const [messages, setMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  // Fetch messages when the component mounts and after each successful submission
  const fetchMessages = async () => {
    const response = await fetch('/api/submit-note');
    const data = await response.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessageSent(true);
        setFormData({ from: '', suggestion: '' }); // Reset form
        fetchMessages(); // Fetch updated messages
      } else {
        setMessageSent(false);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessageSent(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Leave a Message</h2>
      {messageSent ? (
        <p>Thank you for your message!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="from">From:</label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="suggestion">Suggestion for Design:</label>
            <textarea
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Display the list of messages */}
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.from}:</strong> {message.suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveAMessage;
