import React, { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { Modal } from '../ui/Modal';
import { Clock, BookOpen, Star } from 'lucide-react';

interface AddStudySessionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStudySession({ isOpen, onClose }: AddStudySessionProps) {
  const { addStudySession } = useUserStore();
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    duration: 30,
    confidence_level: 3,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addStudySession(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Study Session">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="240"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confidence Level (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, confidence_level: level })}
                className={`p-2 rounded-lg flex-1 ${
                  formData.confidence_level === level
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Session
        </button>
      </form>
    </Modal>
  );
}