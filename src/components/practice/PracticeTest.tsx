import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';
import { Clock, Target, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer: number;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Which article of the Indian Constitution deals with the Right to Equality?',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
    correct_answer: 0,
  },
  // More questions will be fetched from the database
];

export function PracticeTest() {
  const { addPracticeTest } = useUserStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testCompleted, setTestCompleted] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correct_answer ? 1 : 0);
    }, 0);

    await addPracticeTest({
      subject: 'General Studies',
      score,
      total_questions: sampleQuestions.length,
      time_taken: 1800 - timeLeft,
    });

    setTestCompleted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      {!testCompleted ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Practice Test</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium mb-4">
                {currentQuestion + 1}. {sampleQuestions[currentQuestion].text}
              </p>
              <div className="space-y-3">
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Previous
              </button>
              {currentQuestion === sampleQuestions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <Target className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Test Completed!</h3>
          <p className="text-gray-600 mb-6">
            Your results have been recorded. Check the Analytics page for detailed insights.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Take Another Test
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}