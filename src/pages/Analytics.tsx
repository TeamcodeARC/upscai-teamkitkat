import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Clock } from 'lucide-react';

const performanceData = [
  { subject: 'Polity', score: 85 },
  { subject: 'History', score: 72 },
  { subject: 'Geography', score: 68 },
  { subject: 'Economics', score: 76 },
  { subject: 'Science', score: 82 },
];

function Analytics() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Subject-wise Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatsCard
          icon={<Target className="w-6 h-6 text-indigo-600" />}
          title="Average Score"
          value="76.6%"
        />
        <StatsCard
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          title="Improvement"
          value="+12%"
        />
        <StatsCard
          icon={<Clock className="w-6 h-6 text-purple-600" />}
          title="Study Hours"
          value="128"
        />
      </motion.div>
    </div>
  );
}

function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;