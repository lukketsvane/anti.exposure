import React, { useState, useEffect } from 'react';
import styles from '../styles/LeaveAMessageForm.module.css'; // Updated import statement

const LeaveAMessage = () => {
  const [formData, setFormData] = useState({ sender: '', suggestion: '' });
  const [messages, setMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  // Fetch messages when the component mounts and after each successful submission
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/submit-note');
      const data = await response.json();
      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
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
        setFormData({ sender: '', suggestion: '' }); // Reset form
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
    <div className={styles.leaveMessageContainer}>
      {messageSent ? (
        <p>Thanks!</p>
      ) : (
        <form onSubmit={handleSubmit} className="leave-message-form">
          <div>
            <label htmlFor="sender">From:</label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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

      <div>
        <h3>Messages:</h3>
        <ul>
          {messages && messages.map((message, index) => (
            <li key={index}>
              <strong>{message.sender}:</strong> {message.suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveAMessage;
