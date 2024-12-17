import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StudyPlan from './pages/StudyPlan';
import Practice from './pages/Practice';
import Analytics from './pages/Analytics';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';

function App() {
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          useAuthStore.setState({ user: session.user, session });
        } else {
          useAuthStore.setState({ user: null, session: null });
        }
        useAuthStore.setState({ loading: false });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-.5s]" />
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {user && <Navbar />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={user ? 'container mx-auto px-4 py-8' : ''}
        >
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Landing />} />
            <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
            <Route
              path="/study-plan"
              element={user ? <StudyPlan /> : <Navigate to="/auth" />}
            />
            <Route
              path="/practice"
              element={user ? <Practice /> : <Navigate to="/auth" />}
            />
            <Route
              path="/analytics"
              element={user ? <Analytics /> : <Navigate to="/auth" />}
            />
          </Routes>
        </motion.div>
      </div>
    </BrowserRouter>
  );
}

export default App;