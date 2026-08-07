import { useState, useEffect } from 'react';
import { db, queueAttempt, seedOfflineContent } from '../store/db';
import { estimateTheta, selectNextQuestion } from '../services/irtBridge';

export function useAdaptiveSession(studentId = 'student-1', subject = 'math') {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [theta, setTheta] = useState(0.0);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  // Load local theta or fetch from Firestore / Dexie
  useEffect(() => {
    const init = async () => {
      await seedOfflineContent();
      const local = await db.localTheta.get(studentId);
      let currentThetaVal = 0.0;
      if (local) {
        currentThetaVal = local.value;
        setTheta(currentThetaVal);
      }
      
      // Fetch contents from Dexie DB
      const loadedQuestions = await db.contents.where({ subject }).toArray();
      setQuestions(loadedQuestions);
      
      const first = selectNextQuestion(currentThetaVal, loadedQuestions, []);
      setCurrentQuestion(first);
      setLoading(false);
    };
    init();
  }, [studentId, subject]);

  const submitAnswer = async (selectedOption) => {
    if (!currentQuestion) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAttempt = {
      ...currentQuestion,
      isCorrect,
      timeTakenMs: 5000
    };
    const updatedHistory = [...attemptHistory, newAttempt];
    
    // Update Theta locally using IRT
    const newTheta = estimateTheta(updatedHistory);
    setTheta(newTheta);
    
    // Save local state to Dexie
    await db.localTheta.put({ studentId, value: newTheta });
    await queueAttempt({
      studentId,
      contentId: currentQuestion.id,
      isCorrect,
      thetaBefore: theta,
      thetaAfter: newTheta
    });
    
    // Select next question
    const exploredIds = updatedHistory.map(a => a.id);
    const nextQ = selectNextQuestion(newTheta, questions, exploredIds);
    setCurrentQuestion(nextQ);
    setAttemptHistory(updatedHistory);
  };

  return { currentQuestion, submitAnswer, theta, loading, attemptHistory };
}
