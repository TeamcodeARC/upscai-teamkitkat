import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { AUTH_MESSAGES } from '../lib/constants';

export function useAuth() {
  const { signIn, signUp, error, clearError, loading } = useAuthStore();

  const handleAuthError = useCallback((error: any) => {
    if (error.code === 'email_not_confirmed') {
      return AUTH_MESSAGES.EMAIL_NOT_CONFIRMED;
    }
    if (error.code === 'over_email_send_rate_limit') {
      return AUTH_MESSAGES.RATE_LIMIT;
    }
    return error.message || AUTH_MESSAGES.DEFAULT_ERROR;
  }, []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  }, [signIn, handleAuthError]);

  const handleSignUp = useCallback(async (email: string, password: string) => {
    try {
      await signUp(email, password);
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  }, [signUp, handleAuthError]);

  return {
    handleSignIn,
    handleSignUp,
    error,
    clearError,
    loading,
  };
}