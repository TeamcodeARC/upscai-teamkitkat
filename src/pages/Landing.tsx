import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Brain className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master UPSC with
              <span className="text-indigo-600"> AI-Powered</span> Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your personalized UPSC preparation platform with intelligent study plans, 
              real-time evaluations, and comprehensive performance tracking.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-indigo-600" />}
              title="AI-Powered Learning"
              description="Get personalized study recommendations and adaptive learning paths based on your performance."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-purple-600" />}
              title="Smart Evaluation"
              description="Receive instant, detailed feedback on your answers with specific improvement suggestions."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-pink-600" />}
              title="Performance Analytics"
              description="Track your progress with comprehensive insights and detailed performance metrics."
            />
          </motion.div>
        </div>
      </div>

      {/* Image Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=2070&q=80"
              alt="Study Environment"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join the Future of UPSC Preparation
                </h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Experience a revolutionary approach to civil services examination preparation
                </p>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-semibold"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default Landing;