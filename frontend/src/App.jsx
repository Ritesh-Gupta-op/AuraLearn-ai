import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import StudentQuiz from './pages/StudentQuiz';
import TeacherDashboard from './pages/TeacherDashboard';

export function App() {
  const [activeTab, setActiveTab] = useState('landing');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3c9d5' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'landing' && <LandingPage onStartQuiz={() => setActiveTab('quiz')} />}
        {activeTab === 'quiz' && <StudentQuiz />}
        {activeTab === 'teacher' && <TeacherDashboard />}
      </main>
    </div>
  );
}

export default App;
