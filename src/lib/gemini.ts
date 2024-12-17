import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBknrtY54JBt0h15hzyxPZapXnlJmzLgoM');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateAnswer = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};