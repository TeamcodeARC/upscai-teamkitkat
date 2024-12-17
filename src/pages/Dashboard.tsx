import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Book, Target, Trophy, Plus } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { FocusAreas } from '../components/dashboard/FocusAreas';
import { AIRecommendations } from '../components/dashboard/AIRecommendations';

function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [stats, setStats] = useState({
    aiSessions: 0,
    topicsMastered: 0,
    practiceTests: 0,
    currentRank: 0
  });

  const handleAddProgress = () => {
    setStats(prev => ({
      aiSessions: prev.aiSessions + 1,
      topicsMastered: prev.topicsMastered + 1,
      practiceTests: prev.practiceTests + 1,
      currentRank: Math.max(1, prev.currentRank - 1)
    }));
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={<Brain className="w-8 h-8 text-indigo-600" />}
          title="AI Study Sessions"
          value={stats.aiSessions.toString()}
        />
        <StatCard
          icon={<Book className="w-8 h-8 text-purple-600" />}
          title="Topics Mastered"
          value={stats.topicsMastered.toString()}
        />
        <StatCard
          icon={<Target className="w-8 h-8 text-pink-600" />}
          title="Practice Tests"
          value={stats.practiceTests.toString()}
        />
        <StatCard
          icon={<Trophy className="w-8 h-8 text-yellow-600" />}
          title="Current Rank"
          value={stats.currentRank === 0 ? "-" : `#${stats.currentRank}`}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Performance Trend</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Progress
          </button>
        </div>
        <PerformanceChart />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <FocusAreas />
        <AIRecommendations />
      </motion.div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Progress</h3>
            <p className="mb-6">Click confirm to simulate adding new progress data.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProgress}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;