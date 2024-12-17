import React from 'react';

const focusAreas = [
  { color: 'bg-indigo-600', topic: 'Indian Polity: Constitutional Framework' },
  { color: 'bg-purple-600', topic: 'Economics: Monetary Policy' },
  { color: 'bg-pink-600', topic: 'Geography: Climate Patterns' },
];

export function FocusAreas() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Today's Focus Areas</h2>
      <ul className="space-y-4">
        {focusAreas.map((area, index) => (
          <li key={index} className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${area.color}`} />
            <span>{area.topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}