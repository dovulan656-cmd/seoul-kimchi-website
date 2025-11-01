'use client';

import { useState, useEffect } from 'react';

/**
 * Dark Mode Hook
 * Quản lý dark mode state với localStorage persistence
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage và system preference
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved !== null) {
      setIsDark(saved === 'true');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update localStorage
    localStorage.setItem('darkMode', isDark.toString());
    
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggle = () => setIsDark(!isDark);
  const enable = () => setIsDark(true);
  const disable = () => setIsDark(false);

  return {
    isDark,
    toggle,
    enable,
    disable,
    mounted
  };
}

export default useDarkMode;

