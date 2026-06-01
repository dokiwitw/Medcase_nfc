/**
 * Simple authentication utilities for admin access
 * In production, use NextAuth.js or similar for production-grade auth
 */

export interface AdminSession {
  isAuthenticated: boolean;
  timestamp: number;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

const SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function validateCredentials(username: string, password: string): boolean {
  return (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
}

export function createSession(): AdminSession {
  return {
    isAuthenticated: true,
    timestamp: Date.now(),
  };
}

export function isSessionValid(session: AdminSession): boolean {
  const now = Date.now();
  return session.isAuthenticated && now - session.timestamp < SESSION_DURATION;
}

export function getSessionFromStorage(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    const session: AdminSession = JSON.parse(stored);
    if (isSessionValid(session)) {
      return session;
    }
    localStorage.removeItem(SESSION_KEY);
    return null;
  } catch (error) {
    console.error('Error parsing session:', error);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSessionToStorage(session: AdminSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  const session = getSessionFromStorage();
  return session !== null && isSessionValid(session);
}
