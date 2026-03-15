/**
 * Authentication Configuration
 * 
 * Centralized place to manage password requirements and other auth-related settings.
 */
export const AUTH_CONFIG = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecial: true, // Special characters: !@#$%^&* etc.
  },
  emailSuggestions: [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "icloud.com",
    "protonmail.com",
    "live.com"
  ],
};
