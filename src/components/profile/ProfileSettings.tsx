import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';
import { Camera, Save } from 'lucide-react';

export function ProfileSettings() {
  const { profile, updateProfile } = useUserStore();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    daily_goal_hours: profile?.preferences?.daily_goal_hours || 4,
    preferred_subjects: profile?.preferences?.preferred_subjects || [],
    email_notifications: profile?.preferences?.notification_settings?.email || true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      full_name: formData.full_name,
      preferences: {
        daily_goal_hours: formData.daily_goal_hours,
        preferred_subjects: formData.preferred_subjects,
        notification_settings: {
          email: formData.email_notifications,
          push: true,
        },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profile?.avatar_url || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Study Goal (hours)
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={formData.daily_goal_hours}
            onChange={(e) => setFormData({ ...formData, daily_goal_hours: parseInt(e.target.value) })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.email_notifications}
              onChange={(e) => setFormData({ ...formData, email_notifications: e.target.checked })}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Receive study reminders and progress updates</span>
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </form>
    </motion.div>
  );
}