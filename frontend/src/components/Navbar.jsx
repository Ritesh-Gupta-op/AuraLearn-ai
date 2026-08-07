import React from 'react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Wordmark Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('landing')}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#cc2b3f',
            color: '#f2e9db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'League Spartan',
            fontWeight: 800,
            fontSize: '1.2rem',
            border: '2px dashed #1A2540'
          }}
        >
          K
        </div>
        <span style={{ fontFamily: 'League Spartan', fontSize: '1.4rem', fontWeight: 800, color: '#1A2540' }}>
          Kiss-Cut Curriculum
        </span>
      </div>

      {/* Navigation & Crimson Enroll Pill Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setActiveTab('quiz')}
          style={{
            background: activeTab === 'quiz' ? '#1A2540' : 'transparent',
            color: activeTab === 'quiz' ? '#f2e9db' : '#1A2540',
            border: '2px solid #1A2540',
            borderRadius: '9999px',
            padding: '8px 18px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Student Quiz PWA
        </button>
        <button
          onClick={() => setActiveTab('teacher')}
          style={{
            background: activeTab === 'teacher' ? '#1A2540' : 'transparent',
            color: activeTab === 'teacher' ? '#f2e9db' : '#1A2540',
            border: '2px solid #1A2540',
            borderRadius: '9999px',
            padding: '8px 18px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Teacher Dashboard
        </button>
        <button onClick={() => setActiveTab('quiz')} className="crimson-pill-btn">
          ENROLL NOW
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
