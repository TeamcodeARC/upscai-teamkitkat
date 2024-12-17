import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserStore } from '../../store/userStore';

export function SubjectPerformance() {
  const { practiceTests } = useUserStore();

  const subjectPerformance = practiceTests.reduce((acc, test) => {
    if (!acc[test.subject]) {
      acc[test.subject] = {
        subject: test.subject,
        attempts: 0,
        avgScore: 0,
      };
    }
    
    acc[test.subject].attempts += 1;
    acc[test.subject].avgScore = (
      (acc[test.subject].avgScore * (acc[test.subject].attempts - 1) + 
      (test.score / test.total_questions) * 100) / acc[test.subject].attempts
    );
    
    return acc;
  }, {} as Record<string, { subject: string; attempts: number; avgScore: number; }>);

  const data = Object.values(subjectPerformance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Subject Performance</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border">
                      <p className="font-medium">{data.subject}</p>
                      <p className="text-sm text-gray-600">
                        Average Score: {data.avgScore.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Attempts: {data.attempts}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="avgScore"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              name="Average Score (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}