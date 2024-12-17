import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const subjects = [
  {
    title: 'Indian Polity',
    progress: 75,
    nextTopic: 'Fundamental Rights',
    timeEstimate: '2 hours',
  },
  {
    title: 'Indian History',
    progress: 60,
    nextTopic: 'Modern India',
    timeEstimate: '3 hours',
  },
  {
    title: 'Geography',
    progress: 45,
    nextTopic: 'Climate',
    timeEstimate: '1.5 hours',
  },
];

function StudyPlan() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{subject.title}</h3>
              <div className="text-sm text-gray-600">
                Progress: {subject.progress}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Next: {subject.nextTopic}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{subject.timeEstimate}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default StudyPlan;