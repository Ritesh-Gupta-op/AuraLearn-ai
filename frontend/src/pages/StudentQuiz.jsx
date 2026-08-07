import React, { useState, useEffect } from 'react';

// OpenTDB Category IDs: Math = 19, Science = 17, CS = 18
const SUBJECT_CATEGORIES = {
  Math: 19,
  Science: 17,
  'CS / Coding': 18,
};

// Utility to decode HTML entities returned by the API (e.g. &quot;, &#039;)
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Utility to shuffle options randomly
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function StudentQuiz() {
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch 10 questions dynamically whenever subject changes or quiz restarts
  const fetchQuestions = async (subjectKey) => {
    setLoading(true);
    setError(null);
    setIsCompleted(false);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setStreak(0);

    const categoryId = SUBJECT_CATEGORIES[subjectKey];
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const formattedQuestions = data.results.map((q, idx) => {
          const decodedCorrect = decodeHTML(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map(decodeHTML);
          const allOptions = shuffleArray([...decodedIncorrect, decodedCorrect]);

          return {
            id: idx + 1,
            question: decodeHTML(q.question),
            options: allOptions,
            correctAnswer: decodedCorrect,
          };
        });
        setQuestions(formattedQuestions);
      } else {
        setError('No questions returned from API. Please try again.');
      }
    } catch (err) {
      setError('Failed to load questions. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(selectedSubject);
  }, [selectedSubject]);

  const currentQ = questions[currentIdx];
  const progressPercent = questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0;

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const pointsEarned = isCorrect ? 10 + streak * 2 : 0;

    if (isCorrect) {
      setScore((prev) => prev + pointsEarned);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#F3C9D5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 16px',
        boxSizing: 'border-box'
      }}
    >
      <main
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: '#F2E9DB',
          borderRadius: '28px',
          padding: '36px 32px',
          boxShadow: '0 20px 40px rgba(26, 37, 64, 0.18)',
          border: '3px solid #1A2540',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subject Selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
          {Object.keys(SUBJECT_CATEGORIES).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key)}
              disabled={loading}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '800',
                border: selectedSubject === key ? '2px solid #1A2540' : '1px solid rgba(26,37,64,0.3)',
                backgroundColor: selectedSubject === key ? '#1A2540' : '#FFFFFF',
                color: selectedSubject === key ? '#FFFFFF' : '#1A2540',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#1A2540', fontWeight: '700' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
            Fetching fresh 10-question set for {selectedSubject}...
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: '#CC2B3F', fontWeight: '800', marginBottom: '16px' }}>{error}</p>
            <button
              onClick={() => fetchQuestions(selectedSubject)}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: '#1A2540',
                color: '#FFF',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Active Quiz Container */}
        {!loading && !error && currentQ && !isCompleted && (
          <div>
            {/* Header & Progress Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    color: '#CC2B3F',
                    backgroundColor: 'rgba(204, 43, 63, 0.12)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(204, 43, 63, 0.25)'
                  }}
                >
                  Question {currentIdx + 1} of {questions.length}
                </span>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: '800', fontSize: '15px', color: '#1A2540' }}>
                  {streak > 1 && (
                    <span style={{ backgroundColor: '#FFF0D4', color: '#D97706', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', border: '1px solid #FCD34D' }}>
                      🔥 {streak}x
                    </span>
                  )}
                  <span>
                    🎗️ Score: <strong style={{ color: '#CC2B3F', fontSize: '20px' }}>{score}</strong>
                  </span>
                </div>
              </div>

              <div style={{ width: '100%', height: '10px', backgroundColor: '#E5D6C3', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: '#CC2B3F',
                    borderRadius: '999px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <p style={{ fontSize: '20px', color: '#1A2540', fontWeight: '800', lineHeight: '1.4' }}>
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrectOpt = opt === currentQ.correctAnswer;

                let btnBg = '#FFFFFF';
                let btnColor = '#1A2540';
                let btnBorder = '2px solid #1A2540';

                if (isSubmitted) {
                  if (isCorrectOpt) {
                    btnBg = '#22C55E';
                    btnColor = '#FFFFFF';
                    btnBorder = '2px solid #15803D';
                  } else if (isSelected && !isCorrectOpt) {
                    btnBg = '#EF4444';
                    btnColor = '#FFFFFF';
                    btnBorder = '2px solid #B91C1C';
                  }
                } else if (isSelected) {
                  btnBg = '#CC2B3F';
                  btnColor = '#F2E9DB';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !isSubmitted && setSelectedOption(opt)}
                    style={{
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: '700',
                      borderRadius: '16px',
                      border: btnBorder,
                      backgroundColor: btnBg,
                      color: btnColor,
                      cursor: isSubmitted ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '800',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#CC2B3F',
                  color: '#F2E9DB',
                  cursor: selectedOption ? 'pointer' : 'not-allowed',
                  opacity: selectedOption ? 1 : 0.5
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '800',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#1A2540',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                {currentIdx + 1 === questions.length ? 'See Final Score ➔' : 'Next Question ➔'}
              </button>
            )}
          </div>
        )}

        {/* Completion Modal */}
        {isCompleted && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', color: '#1A2540', fontWeight: '800' }}>Quiz Completed!</h2>
            <p style={{ color: '#1A2540', opacity: 0.8, marginBottom: '24px' }}>
              Subject: {selectedSubject}
            </p>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '24px',
                border: '2px solid #1A2540'
              }}
            >
              <span style={{ fontSize: '12px', color: '#1A2540', fontWeight: '800', textTransform: 'uppercase' }}>
                Total Score
              </span>
              <p style={{ fontSize: '36px', fontWeight: '800', color: '#CC2B3F', margin: '4px 0 0' }}>{score} pts</p>
            </div>

            <button
              onClick={() => fetchQuestions(selectedSubject)}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '800',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: '#CC2B3F',
                color: '#F2E9DB',
                cursor: 'pointer'
              }}
            >
              🔄 Fetch New Question Set
            </button>
          </div>
        )}
      </main>
    </div>
  );
}