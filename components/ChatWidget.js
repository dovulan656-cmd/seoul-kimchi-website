'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { matchKeywords } from '../lib/chatbot';
import { CONTACT } from '../lib/config';
import { 
  trackChatbotOpened, 
  trackMessageSent, 
  trackQuickReply, 
  trackProductViewed,
  trackProductClicked 
} from '../lib/analytics';
import Link from 'next/link';

const STORAGE_KEY = 'seoulkimchi_chatHistory';
const MAX_HISTORY = 50; // Giới hạn số message lưu

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const history = JSON.parse(saved);
          if (Array.isArray(history) && history.length > 0) {
            setMessages(history.slice(-20)); // Load last 20 messages
          }
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        const toSave = messages.slice(-MAX_HISTORY); // Only save last 50
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  // Welcome message when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: 'Xin chào! 👋 Tôi là Seoul Bot. Cần giúp gì không?',
        sender: 'bot',
        type: 'text',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
      trackChatbotOpened();
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Quick reply suggestions
  const quickReplies = useMemo(() => [
    { text: 'Xem sản phẩm', query: 'xem sản phẩm' },
    { text: 'Giá cả', query: 'giá' },
    { text: 'Liên hệ', query: 'liên hệ' },
    { text: 'Đặt hàng', query: 'đặt hàng' }
  ], []);

  const sendMessage = useCallback((text = null) => {
    const messageToSend = text || inputValue.trim();
    if (!messageToSend) return;

    const userMsg = {
      text: messageToSend,
      sender: 'user',
      type: 'text',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputValue('');
    setIsTyping(true);

    // Track message sent
    if (text) {
      trackQuickReply(text);
    } else {
      trackMessageSent(messageToSend);
    }

    // Simulate typing delay
    setTimeout(() => {
      try {
        const response = matchKeywords(messageToSend);
        setIsTyping(false);
        
        // Handle response object with type and metadata
        const botMsg = {
          text: response.text || response,
          sender: 'bot',
          type: response.type || 'text',
          metadata: response.metadata || {},
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMsg]);
        
        // Track product views if products are shown
        if (response.type === 'products' && response.metadata?.products) {
          response.metadata.products.forEach(product => {
            trackProductViewed(product.id, product.name);
          });
        }
      } catch (error) {
        console.error('Chatbot error:', error);
        setIsTyping(false);
        setMessages(prev => [...prev, {
          text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          sender: 'bot',
          type: 'text',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 800 + Math.random() * 400); // 800-1200ms for more natural feel
  }, [inputValue]);

  const clearHistory = useCallback(() => {
    setMessages([{
      text: 'Xin chào! 👋 Tôi là Seoul Bot. Cần giúp gì không?',
      sender: 'bot',
      type: 'text',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Product Card Component
  const ProductCard = useCallback(({ product }) => {
    const handleClick = () => {
      trackProductClicked(product.id, product.name);
    };

    return (
      <Link 
        href={`/products#${product.id}`}
        onClick={handleClick}
        style={{
          display: 'block',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          marginBottom: '0.75rem',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#C8102E';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(200, 16, 46, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0.75rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '🌶️';
                e.target.parentElement.style.fontSize = '2rem';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
                lineHeight: '1.4',
                wordBreak: 'break-word'
              }}>
                {product.name}
              </h4>
              {product.badge && (
                <span style={{
                  background: '#C8102E',
                  color: 'white',
                  fontSize: '0.625rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {product.badge}
                </span>
              )}
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: '0.25rem 0',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.description}
            </p>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#C8102E',
              marginTop: '0.5rem'
            }}>
              {product.price}
            </div>
          </div>
        </div>
      </Link>
    );
  }, []);

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
          right: 'clamp(1rem, 2vw, 2rem)',
          bottom: '6rem',
          width: 'clamp(280px, 20rem, 90vw)',
          maxWidth: '20rem',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          height: 'clamp(300px, 20rem, 70vh)',
          maxHeight: '500px'
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
            <div style={{fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <i className="fas fa-robot"></i> Seoul Bot
            </div>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              {messages.length > 1 && (
                <button
                  onClick={clearHistory}
                  style={{
                    padding: '0.375rem',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem'
                  }}
                  aria-label="Clear history"
                  title="Xóa lịch sử chat"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
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
                  flexDirection: 'column',
                  marginBottom: '0.75rem'
                }}
              >
                {/* Text message */}
                <div style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.5rem',
                  marginBottom: (msg.type === 'products' && msg.metadata?.products) ? '0.75rem' : '0'
                }}>
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
                  {msg.text && (
                    <div style={{
                      maxWidth: '75%',
                      fontSize: '0.875rem',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      background: msg.sender === 'user' ? '#C8102E' : 'white',
                      color: msg.sender === 'user' ? 'white' : '#1f2937',
                      border: msg.sender === 'bot' ? '1px solid #e5e7eb' : 'none',
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word'
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
                  )}
                </div>
                
                {/* Product cards */}
                {msg.sender === 'bot' && msg.type === 'products' && msg.metadata?.products && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginLeft: '2.5rem'
                  }}>
                    {msg.metadata.products.map((product, pIdx) => (
                      <ProductCard key={`${product.id}-${pIdx}`} product={product} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
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
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  gap: '0.25rem',
                  alignItems: 'center'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#9ca3af',
                    animation: 'typingDot 1.4s infinite',
                    display: 'inline-block'
                  }}></span>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#9ca3af',
                    animation: 'typingDot 1.4s infinite 0.2s',
                    display: 'inline-block'
                  }}></span>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#9ca3af',
                    animation: 'typingDot 1.4s infinite 0.4s',
                    display: 'inline-block'
                  }}></span>
                </div>
              </div>
            )}
            
            {/* Quick Replies - Show when no messages or after welcome */}
            {!isTyping && (messages.length === 1 || messages.length === 0) && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      trackQuickReply(reply.text);
                      sendMessage(reply.query);
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: 'white',
                      border: '1px solid #C8102E',
                      color: '#C8102E',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#C8102E';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.color = '#C8102E';
                    }}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
            <div aria-live="polite" aria-atomic="true" style={{position: 'absolute', left: '-9999px'}}>
              {messages.length > 0 && `Message ${messages.length} received`}
            </div>
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
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  opacity: isTyping ? 0.6 : 1,
                  cursor: isTyping ? 'not-allowed' : 'text'
                }}
                placeholder={isTyping ? "Bot đang trả lời..." : "Nhập tin nhắn..."}
                aria-label="Chat input"
                aria-busy={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                style={{
                  background: (isTyping || !inputValue.trim()) ? '#9ca3af' : '#C8102E',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: (isTyping || !inputValue.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background 0.3s',
                  opacity: (isTyping || !inputValue.trim()) ? 0.6 : 1
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
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          right: 'clamp(1rem, 2vw, 2rem)',
          bottom: '2rem',
          width: 'clamp(3rem, 3.5rem, 4rem)',
          height: 'clamp(3rem, 3.5rem, 4rem)',
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
          transition: 'all 0.3s',
          fontSize: '1.25rem'
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
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>
    </>
  );
}
