import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weeks = Array.from({ length: 52 }, (_, i) => i);

export function StudyHeatmap() {
  const { studySessions } = useUserStore();

  // Group study sessions by date
  const sessionsByDate = studySessions.reduce((acc, session) => {
    const date = new Date(session.created_at).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += session.duration;
    return acc;
  }, {} as Record<string, number>);

  const getIntensityClass = (minutes: number) => {
    if (minutes === 0) return 'bg-gray-100';
    if (minutes < 60) return 'bg-indigo-100';
    if (minutes < 120) return 'bg-indigo-200';
    if (minutes < 180) return 'bg-indigo-300';
    if (minutes < 240) return 'bg-indigo-400';
    return 'bg-indigo-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Study Activity</h2>
      
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs text-gray-500 w-4">{day}</div>
          ))}
        </div>
        
        <div className="flex gap-1 mt-1">
          {weeks.map(week => (
            <div key={week} className="flex flex-col gap-1">
              {daysOfWeek.map((_, day) => {
                const date = new Date();
                date.setDate(date.getDate() - ((weeks.length - week - 1) * 7 + (6 - day)));
                const dateStr = date.toISOString().split('T')[0];
                const minutes = sessionsByDate[dateStr] || 0;

                return (
                  <div
                    key={day}
                    className={`w-4 h-4 rounded-sm ${getIntensityClass(minutes)}`}
                    title={`${date.toLocaleDateString()}: ${Math.round(minutes / 60)} hours`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-xs text-gray-500">Less</span>
        {[100, 200, 300, 400, 500].map(minutes => (
          <div
            key={minutes}
            className={`w-4 h-4 rounded-sm ${getIntensityClass(minutes)}`}
          />
        ))}
        <span className="text-xs text-gray-500">More</span>
      </div>
    </motion.div>
  );
}