/**
 * Token generation utilities for NFC cards
 */

import { nanoid } from 'nanoid';

/**
 * Generate a unique token for an NFC card
 * Uses nanoid for secure, URL-safe unique IDs
 */
export function generateCardToken(): string {
  // Generate a 21-character URL-safe string
  return nanoid();
}

/**
 * Validate if a token matches expected format
 */
export function isValidToken(token: string): boolean {
  // nanoid generates 21 characters by default
  return typeof token === 'string' && token.length > 0 && /^[A-Za-z0-9_-]+$/.test(token);
}
