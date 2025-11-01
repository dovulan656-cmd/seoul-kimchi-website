'use client';

import { useState, useEffect, useRef } from 'react';
import { matchKeywords } from '../lib/chatbot';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: 'Xin chào! 👋 Tôi là Seoul Bot. Cần giúp gì không?',
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const response = matchKeywords(inputValue);
      const botMsg = {
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div style={{
          position: 'fixed',
          right: '2rem',
          bottom: '6rem',
          width: '20rem',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          height: '20rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#C8102E',
            color: 'white'
          }}>
            <div style={{fontWeight: 600, fontSize: '0.875rem'}}>Seoul Bot</div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '0.25rem'
              }}
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div style={{
            flex: 1,
            padding: '0.75rem',
            overflow: 'auto',
            background: '#f9fafb',
            maxHeight: '14rem'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}
              >
                {msg.sender === 'bot' && (
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: '#C8102E',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <i className="fas fa-robot" style={{fontSize: '0.75rem'}}></i>
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  fontSize: '0.875rem',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  background: msg.sender === 'user' ? '#C8102E' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#1f2937',
                  border: msg.sender === 'bot' ? '1px solid #e5e7eb' : 'none',
                  whiteSpace: 'pre-line'
                }}>
                  <div>{msg.text}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                    opacity: 0.75,
                    textAlign: msg.sender === 'user' ? 'right' : 'left'
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{
            padding: '0.5rem',
            borderTop: '1px solid #e5e7eb',
            background: 'white'
          }}>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} style={{display: 'flex', gap: '0.5rem'}}>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
                placeholder="Nhập tin nhắn..."
                aria-label="Chat input"
              />
              <button
                type="submit"
                style={{
                  background: '#C8102E',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background 0.3s'
                }}
                aria-label="Send message"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
          width: '3.5rem',
          height: '3.5rem',
          background: '#C8102E',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#8B0000';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#C8102E';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <i className="fas fa-comments"></i>
      </button>
    </>
  );
}
