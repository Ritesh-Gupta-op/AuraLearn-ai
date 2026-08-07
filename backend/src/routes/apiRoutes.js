import express from 'express';
import { estimateTheta, selectNextQuestion } from '../services/irtService.js';

const router = express.Router();

// Mock Question Bank
const QUESTION_BANK = [
  { id: 'q1', subject: 'math', name: 'Fraction Addition', alpha: 1.2, beta: -1.0, questionText: 'What is 1/4 + 2/4?', options: ['3/4', '1/2', '3/8', '1/4'], correctAnswer: '3/4' },
  { id: 'q2', subject: 'math', name: 'Quadratic Equations', alpha: 1.8, beta: 0.5, questionText: 'Solve x^2 - 5x + 6 = 0', options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 0, 5'], correctAnswer: 'x = 2, 3' },
  { id: 'q3', subject: 'math', name: 'Calculus Derivatives', alpha: 2.1, beta: 1.5, questionText: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], correctAnswer: 'cos(x)' },
  { id: 'q4', subject: 'math', name: 'Basic Counting', alpha: 0.8, beta: -2.0, questionText: 'What is 5 + 7?', options: ['12', '10', '14', '11'], correctAnswer: '12' },
  { id: 'q5', subject: 'math', name: 'Pythagorean Theorem', alpha: 1.5, beta: 0.0, questionText: 'In a right triangle with legs 3 and 4, hypotenuse is?', options: ['5', '6', '7', '25'], correctAnswer: '5' }
];

router.get('/questions', (req, res) => {
  const { subject = 'math' } = req.query;
  const filtered = QUESTION_BANK.filter(q => q.subject === subject);
  res.json(filtered);
});

router.post('/estimate-theta', (req, res) => {
  const { attempts = [] } = req.body;
  const newTheta = estimateTheta(attempts);
  res.json({ theta: newTheta });
});

router.post('/select-next', (req, res) => {
  const { theta = 0.0, exploredIds = [], subject = 'math' } = req.body;
  const filtered = QUESTION_BANK.filter(q => q.subject === subject);
  const nextQ = selectNextQuestion(theta, filtered, exploredIds);
  res.json({ nextQuestion: nextQ });
});

router.post('/attempts', (req, res) => {
  const attempt = req.body;
  console.log('Received synced attempt:', attempt);
  res.json({ success: true, receivedAt: new Date().toISOString() });
});

export default router;
