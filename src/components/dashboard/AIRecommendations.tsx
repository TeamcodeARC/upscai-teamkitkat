import React from 'react';
import { Brain, Book, Target } from 'lucide-react';

const recommendations = [
  { icon: Brain, color: 'indigo', text: 'Review Modern History concepts' },
  { icon: Book, color: 'purple', text: 'Take Environment mock test' },
  { icon: Target, color: 'pink', text: 'Practice Ethics case studies' },
];

export function AIRecommendations() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-center gap-4">
            <div className={`p-2 bg-${rec.color}-100 rounded-lg`}>
              <rec.icon className={`w-5 h-5 text-${rec.color}-600`} />
            </div>
            <span>{rec.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}