// Authentication messages
export const AUTH_MESSAGES = {
  EMAIL_NOT_CONFIRMED: 'Please check your email to confirm your account before signing in.',
  RATE_LIMIT: 'Too many attempts. Please try again later.',
  DEFAULT_ERROR: 'An error occurred. Please try again.',
};

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  STUDY_PLAN: '/study-plan',
  PRACTICE: '/practice',
  ANALYTICS: '/analytics',
} as const;