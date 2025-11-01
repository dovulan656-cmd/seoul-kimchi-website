/**
 * Simple client-side authentication for admin dashboard
 * Uses localStorage for session management
 */

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function login(password) {
  if (password === ADMIN_PASSWORD) {
    const session = {
      authenticated: true,
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return false;
  
  try {
    const session = JSON.parse(sessionStr);
    
    // Check if session expired
    if (Date.now() - session.timestamp > SESSION_DURATION) {
      logout();
      return false;
    }
    
    return session.authenticated === true;
  } catch (e) {
    logout();
    return false;
  }
}

export function checkAuth() {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return false;
  }
  return true;
}
