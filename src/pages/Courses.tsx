import React from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, Star, ArrowRight } from 'lucide-react';
import type { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: 'UPSC Foundation',
    description: 'Master the basics of all UPSC subjects with AI-guided learning',
    subjects: ['Polity', 'History', 'Geography', 'Economics'],
    duration_weeks: 12,
    difficulty_level: 'Beginner',
    topics: [
      {
        title: 'Indian Constitution',
        description: 'Understanding the fundamental principles',
        resources: ['Video Lectures', 'Practice Questions', 'Study Notes'],
      },
      // More topics...
    ],
  },
  // More courses...
];

function Courses() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </motion.div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${course.difficulty_level === 'Beginner' ? 'bg-green-100 text-green-800' :
              course.difficulty_level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}
          >
            {course.difficulty_level}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration_weeks} weeks</span>
          </div>
          <div className="flex items-center gap-1">
            <Book className="w-4 h-4" />
            <span>{course.subjects.length} subjects</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {course.subjects.map((subject) => (
            <span
              key={subject}
              className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-sm"
            >
              {subject}
            </span>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default Courses;