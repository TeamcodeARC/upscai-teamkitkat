import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 78 },
  { name: 'Week 4', score: 85 },
];

export function PerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ fill: '#4f46e5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}