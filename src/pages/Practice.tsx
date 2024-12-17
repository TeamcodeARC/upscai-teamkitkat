import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateAnswer } from '../lib/gemini';
import { Send, Loader } from 'lucide-react';

function Practice() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await generateAnswer(question);
      setAnswer(response);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">AI-Powered Answer Evaluation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write your answer
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your answer here..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit for Evaluation
              </>
            )}
          </button>
        </form>
      </motion.div>

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4">AI Feedback</h3>
          <div className="prose max-w-none">
            <p>{answer}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Practice;