import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function StatCard({ icon, title, value }: StatCardProps) {
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