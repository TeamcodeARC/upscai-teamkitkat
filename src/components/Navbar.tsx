import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, BookOpen, PenTool, BarChart2, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const location = useLocation();
  const { signOut } = useAuthStore();

  const links = [
    { to: '/', icon: Brain, label: 'Dashboard' },
    { to: '/study-plan', icon: BookOpen, label: 'Study Plan' },
    { to: '/practice', icon: PenTool, label: 'Practice' },
    { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="font-bold text-xl">UPSC AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
                {location.pathname === link.to && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;