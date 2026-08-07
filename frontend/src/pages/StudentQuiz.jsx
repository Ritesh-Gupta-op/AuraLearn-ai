import React from 'react';
import { useAdaptiveSession } from '../hooks/useAdaptiveSession';
import { useTTS } from '../hooks/useTTS';
import { useSTT } from '../hooks/useSTT';
import KissCutStickerBadge from '../components/KissCutStickerBadge';
import { Volume2, Mic, CheckCircle, RefreshCw } from 'lucide-react';

export const StudentQuiz = () => {
  const { currentQuestion, submitAnswer, theta, loading, attemptHistory } = useAdaptiveSession('student-1', 'math');
  const { speak } = useTTS();
  const { isListening, transcript, startListening } = useSTT();

  if (loading) {
    return (
      <div style={{ text: 'center', padding: '100px 20px', fontFamily: 'Poppins' }}>
        <RefreshCw className="spin" size={40} color="#cc2b3f" />
        <h3 style={{ marginTop: '16px' }}>Loading Adaptive Session from IndexedDB...</h3>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="cream-sheet-card" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
        <CheckCircle size={60} color="#cc2b3f" style={{ margin: '0 auto 16px' }} />
        <h2>All Available Questions Completed!</h2>
        <p style={{ marginTop: '12px', fontSize: '1.1rem' }}>
          Your estimated mastery ability level (Theta θ): <strong>{theta.toFixed(3)}</strong>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Student Progress Header */}
      <div
        className="cream-sheet-card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 30px',
          marginBottom: '30px'
        }}
      >
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cc2b3f', textTransform: 'uppercase' }}>
            IRT 2PL ADAPTIVE ENGINE
          </span>
          <h3 style={{ fontSize: '1.4rem' }}>Student Mastery Ability (θ)</h3>
        </div>
        <div
          style={{
            backgroundColor: '#1A2540',
            color: '#f2e9db',
            borderRadius: '16px',
            padding: '12px 24px',
            fontFamily: 'League Spartan',
            fontSize: '1.8rem',
            fontWeight: 800
          }}
        >
          {theta.toFixed(3)}
        </div>
      </div>

      {/* Adaptive Question Card */}
      <div className="cream-sheet-card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: 700, color: '#cc2b3f' }}>
            Question #{attemptHistory.length + 1} • (Diff β: {currentQuestion.beta || currentQuestion.difficulty_beta}, Disc α: {currentQuestion.alpha || currentQuestion.discrimination_alpha})
          </span>

          {/* Regional Audio Controls */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => speak(currentQuestion.questionText, 'en-IN')}
              style={{
                background: '#1A2540',
                color: '#f2e9db',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Volume2 size={16} /> Listen (Hindi/EN)
            </button>

            <button
              onClick={() => startListening('en-IN')}
              style={{
                background: isListening ? '#cc2b3f' : '#f2e9db',
                color: isListening ? '#f2e9db' : '#1A2540',
                border: '2px solid #1A2540',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mic size={16} /> {isListening ? 'Listening...' : 'Voice Answer'}
            </button>
          </div>
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '28px', color: '#1A2540' }}>
          {currentQuestion.questionText}
        </h2>

        {transcript && (
          <div style={{ backgroundColor: 'rgba(204, 43, 63, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
            Speech Detected: <strong>{transcript}</strong>
          </div>
        )}

        {/* Question Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => submitAnswer(opt)}
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #1A2540',
                borderRadius: '16px',
                padding: '20px',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#1A2540',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                boxShadow: '0 4px 0 #1A2540'
              }}
            >
              <span style={{ color: '#cc2b3f', marginRight: '8px', fontWeight: 800 }}>
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
