'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Toast Notification Component
 * Hiển thị thông báo tạm thời ở góc màn hình
 */

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '400px',
        width: '100%'
      }}
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState(null);
  const toastRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto dismiss after duration
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  // Touch/Mouse handlers for swipe
  const handleStart = (clientX) => {
    isDragging.current = true;
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging.current || startX === null) return;
    
    const deltaX = clientX - startX;
    const maxSwipe = 400; // Max swipe distance
    
    if (deltaX > 0) {
      // Swiping right (dismiss)
      setTranslateX(Math.min(deltaX, maxSwipe));
    } else {
      // Swiping left (cancel)
      setTranslateX(Math.max(deltaX, -maxSwipe * 0.3));
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    // If swiped more than 50% of width, dismiss
    if (Math.abs(translateX) > 150) {
      handleClose();
    } else {
      // Spring back
      setTranslateX(0);
    }
    
    setStartX(null);
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events (for desktop)
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging.current]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for exit animation
  };

  const getToastStyles = () => {
    const baseStyle = {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1rem 1.25rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      minWidth: '300px',
      maxWidth: '400px',
      border: '1px solid',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isVisible && !isExiting 
        ? `translateX(${translateX}px)` 
        : `translateX(400px)`,
      opacity: isVisible && !isExiting ? Math.max(0, 1 - Math.abs(translateX) / 400) : 0,
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'pan-y',
      cursor: isDragging.current ? 'grabbing' : 'grab',
      transition: isDragging.current ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
    };

    switch (toast.type) {
      case 'success':
        return {
          ...baseStyle,
          borderColor: '#10b981',
          backgroundColor: '#f0fdf4'
        };
      case 'error':
        return {
          ...baseStyle,
          borderColor: '#ef4444',
          backgroundColor: '#fef2f2'
        };
      case 'warning':
        return {
          ...baseStyle,
          borderColor: '#f59e0b',
          backgroundColor: '#fffbeb'
        };
      case 'info':
      default:
        return {
          ...baseStyle,
          borderColor: '#3b82f6',
          backgroundColor: '#eff6ff'
        };
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getTitleColor = () => {
    switch (toast.type) {
      case 'success':
        return '#065f46';
      case 'error':
        return '#991b1b';
      case 'warning':
        return '#92400e';
      case 'info':
      default:
        return '#1e40af';
    }
  };

  return (
    <div 
      ref={toastRef}
      style={getToastStyles()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Progress bar for auto-dismiss */}
      {toast.duration && toast.duration > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(to right, ${getTitleColor()}, ${getTitleColor()}80)`,
            animation: `toast-progress ${toast.duration}ms linear`,
            transformOrigin: 'left'
          }}
        />
      )}

      <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{getIcon()}</div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <h4
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              margin: 0,
              marginBottom: '0.25rem',
              color: getTitleColor()
            }}
          >
            {toast.title}
          </h4>
        )}
        <p
          style={{
            fontSize: '0.875rem',
            margin: 0,
            color: '#4b5563',
            lineHeight: '1.5',
            wordBreak: 'break-word'
          }}
        >
          {toast.message}
        </p>
      </div>

      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          fontSize: '1.25rem',
          color: '#6b7280',
          flexShrink: 0,
          lineHeight: 1,
          transition: 'color 0.2s'
        }}
        aria-label="Đóng thông báo"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#1f2937';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6b7280';
        }}
      >
        ×
      </button>
    </div>
  );
};

// Toast priorities
export const TOAST_PRIORITY = {
  CRITICAL: 0,
  HIGH: 1,
  NORMAL: 2,
  LOW: 3
};

// Sound effects for notifications
const soundContext = typeof window !== 'undefined' && typeof AudioContext !== 'undefined' 
  ? new (window.AudioContext || window.webkitAudioContext)() 
  : null;

function playToastSound(type) {
  if (!soundContext || typeof window === 'undefined') return;

  try {
    // Create simple beep sound
    const oscillator = soundContext.createOscillator();
    const gainNode = soundContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(soundContext.destination);
    
    // Different frequencies for different types
    const frequencies = {
      success: 523.25, // C5
      error: 220,      // A3
      warning: 392,     // G4
      info: 440        // A4
    };
    
    oscillator.frequency.value = frequencies[type] || 440;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, soundContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, soundContext.currentTime + 0.3);
    
    oscillator.start(soundContext.currentTime);
    oscillator.stop(soundContext.currentTime + 0.3);
  } catch (error) {
    console.warn('Failed to play toast sound:', error);
  }
}

// Toast Manager - Singleton pattern with priority queue
class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
    this.maxToasts = 5;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  notify() {
    this.listeners.forEach((callback) => callback([...this.toasts]));
  }

  add(toast) {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title || null,
      message: toast.message || '',
      duration: toast.duration !== undefined ? toast.duration : 5000,
      priority: toast.priority !== undefined ? toast.priority : TOAST_PRIORITY.NORMAL,
      sound: toast.sound || false
    };

    // Insert based on priority (lower number = higher priority)
    const insertIndex = this.toasts.findIndex(t => t.priority > newToast.priority);
    if (insertIndex === -1) {
      this.toasts.push(newToast);
    } else {
      this.toasts.splice(insertIndex, 0, newToast);
    }

    // Remove oldest if at max (keep high priority toasts)
    if (this.toasts.length > this.maxToasts) {
      // Remove lowest priority toasts first
      const lowPriorityIndex = this.toasts.findLastIndex(t => t.priority === TOAST_PRIORITY.LOW);
      if (lowPriorityIndex !== -1) {
        this.toasts.splice(lowPriorityIndex, 1);
      } else {
        // If no low priority, remove oldest normal priority
        const normalPriorityIndex = this.toasts.findLastIndex(t => t.priority === TOAST_PRIORITY.NORMAL);
        if (normalPriorityIndex !== -1) {
          this.toasts.splice(normalPriorityIndex, 1);
        } else {
          // Last resort: remove oldest
          this.toasts.shift();
        }
      }
    }

    // Play sound if requested
    if (newToast.sound) {
      playToastSound(newToast.type);
    }

    this.notify();

    return id;
  }

  remove(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

const toastManager = new ToastManager();

// React Hook
export function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    // Initial state sync
    setToasts([...toastManager.toasts]);
    return unsubscribe;
  }, []);

  const showToast = (options) => {
    return toastManager.add(options);
  };

  const removeToast = (id) => {
    toastManager.remove(id);
  };

  const clearToasts = () => {
    toastManager.clear();
  };

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
    ToastContainer: () => toasts.length > 0 ? <ToastContainer toasts={toasts} removeToast={removeToast} /> : null
  };
}

// Convenience functions
export const toast = {
  success: (message, title = 'Thành công', duration = 5000, options = {}) => {
    return toastManager.add({ 
      type: 'success', 
      message, 
      title, 
      duration,
      priority: options.priority || TOAST_PRIORITY.NORMAL,
      sound: options.sound || false
    });
  },
  error: (message, title = 'Lỗi', duration = 7000, options = {}) => {
    return toastManager.add({ 
      type: 'error', 
      message, 
      title, 
      duration,
      priority: options.priority || TOAST_PRIORITY.HIGH,
      sound: options.sound || false
    });
  },
  warning: (message, title = 'Cảnh báo', duration = 6000, options = {}) => {
    return toastManager.add({ 
      type: 'warning', 
      message, 
      title, 
      duration,
      priority: options.priority || TOAST_PRIORITY.NORMAL,
      sound: options.sound || false
    });
  },
  info: (message, title = 'Thông tin', duration = 5000, options = {}) => {
    return toastManager.add({ 
      type: 'info', 
      message, 
      title, 
      duration,
      priority: options.priority || TOAST_PRIORITY.LOW,
      sound: options.sound || false
    });
  },
  critical: (message, title = 'Quan trọng', duration = 10000, options = {}) => {
    return toastManager.add({ 
      type: 'error', 
      message, 
      title, 
      duration,
      priority: TOAST_PRIORITY.CRITICAL,
      sound: options.sound !== false // Default to true for critical
    });
  }
};

export default useToast;

