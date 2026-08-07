/**
 * Firestore Collection Definitions & Interfaces
 * 
 * 1. users: { uid, role: 'student'|'teacher'|'parent', name, phone, classCode }
 * 2. classes: { id, teacherId, gradeLevel, section, subject }
 * 3. content_metadata: { id, subject, chapter, difficulty_beta: float, discrimination_alpha: float, contentType: 'video'|'quiz'|'reading', videoUrl: string (cdn), language: 'hi'|'ta'|'en' }
 * 4. attempts_live: { studentId, contentId, correct: bool, timeTakenMs: int, theta: float, timestamp: timestamp }
 */

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  CLASSES: 'classes',
  CONTENT_METADATA: 'content_metadata',
  ATTEMPTS_LIVE: 'attempts_live'
};

export const FIRESTORE_SECURITY_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid != null;
    }
  }
}
`;
