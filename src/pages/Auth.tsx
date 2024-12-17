import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignIn, handleSignUp, error, clearError, loading } = useAuth();

  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleSignIn(email, password);
      } else {
        await handleSignUp(email, password);
      }
    } catch (error) {
      // Error is already handled by the hook
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          {isLogin ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            icon={isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            loading={loading}
            className="w-full"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;