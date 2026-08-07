import Dexie from 'dexie';

export const db = new Dexie('AdaptiveDB');

db.version(1).stores({
  contents: 'id, subject, language, difficulty_beta',
  attemptsQueue: '++id, studentId, synced', // ++id is auto-increment
  localTheta: 'studentId, value',
  badges: 'id, awardedAt',
  users: 'id, role'
});

export const registerSync = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register('sync-attempts');
    } catch (e) {
      console.warn('Background sync registration failed, will retry online:', e);
    }
  }
};

export const queueAttempt = async (attempt) => {
  await db.attemptsQueue.add({ ...attempt, synced: false, createdAt: Date.now() });
  await registerSync(); // trigger background sync
};

// Seed initial content into IndexedDB for offline capability
export const seedOfflineContent = async () => {
  const count = await db.contents.count();
  if (count === 0) {
    await db.contents.bulkAdd([
      { id: 'q1', subject: 'math', name: 'Fraction Addition', difficulty_beta: -1.0, discrimination_alpha: 1.2, contentType: 'quiz', language: 'en', questionText: 'What is 1/4 + 2/4?', options: ['3/4', '1/2', '3/8', '1/4'], correctAnswer: '3/4', duration: '45m' },
      { id: 'q2', subject: 'math', name: 'Quadratic Equations', difficulty_beta: 0.5, discrimination_alpha: 1.8, contentType: 'quiz', language: 'en', questionText: 'Solve x^2 - 5x + 6 = 0', options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 0, 5'], correctAnswer: 'x = 2, 3', duration: '1h 15m' },
      { id: 'q3', subject: 'math', name: 'Calculus Derivatives', difficulty_beta: 1.5, discrimination_alpha: 2.1, contentType: 'quiz', language: 'en', questionText: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], correctAnswer: 'cos(x)', duration: '1h 30m' },
      { id: 'q4', subject: 'math', name: 'Basic Counting', difficulty_beta: -2.0, discrimination_alpha: 0.8, contentType: 'quiz', language: 'en', questionText: 'What is 5 + 7?', options: ['12', '10', '14', '11'], correctAnswer: '12', duration: '30m' },
      { id: 'q5', subject: 'math', name: 'Pythagorean Theorem', difficulty_beta: 0.0, discrimination_alpha: 1.5, contentType: 'quiz', language: 'en', questionText: 'In a right triangle with legs 3 and 4, hypotenuse is?', options: ['5', '6', '7', '25'], correctAnswer: '5', duration: '1h 00m' }
    ]);
  }
};
