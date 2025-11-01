'use client';

import { useDarkMode } from '../hooks/useDarkMode';

/**
 * Dark Mode Toggle Component
 * Button để toggle dark mode
 */
export default function DarkModeToggle({ className = '' }) {
  const { isDark, toggle, mounted } = useDarkMode();

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <button
        className={`dark-mode-toggle ${className}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          fontSize: '1.25rem',
          color: 'inherit',
          borderRadius: '0.5rem',
          transition: 'all 0.3s ease'
        }}
        aria-label="Toggle dark mode"
        disabled
      >
        <i className="fas fa-circle-notch fa-spin"></i>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`dark-mode-toggle ${className}`}
      style={{
        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        fontSize: '1.25rem',
        color: isDark ? '#fbbf24' : '#1f2937',
        borderRadius: '0.5rem',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.5rem',
        height: '2.5rem'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.background = isDark 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.05)';
      }}
    >
      {isDark ? (
        <i className="fas fa-sun" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-moon" aria-hidden="true"></i>
      )}
    </button>
  );
}

