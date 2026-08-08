import React, { useState, useEffect, useCallback } from 'react';
import {
  collection, addDoc, getDocs, query, where,
  serverTimestamp, onSnapshot
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';
import AITutor from '../components/AITutor';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

// ── Helper: Toast ─────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState('');
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };
  return [toast, showToast];
}

// ── Take Test Sub-View ────────────────────────────────────────────────────────
function TakeTest({ test, onFinish, studentId, studentName, studentEmail, classId }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  const q = test.questions[currentIdx];
  const progress = ((currentIdx + 1) / test.questions.length) * 100;
  const LETTERS = ['A','B','C','D','E'];

  const handleSubmit = () => {
    if (!selected) return;
    const isCorrect = selected === q.correctAnswer;
    const newAnswers = [...answers, { questionIdx: currentIdx, selected, isCorrect }];
    setAnswers(newAnswers);
    setSubmitted(true);

    // Auto-advance after 1.5s if correct
    if (isCorrect) {
      setTimeout(() => advance(newAnswers), 1200);
    }
  };

  const advance = async (finalAnswers = answers) => {
    if (currentIdx + 1 < test.questions.length) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      // Test complete — save attempt
      setSaving(true);
      const score = finalAnswers.filter(a => a.isCorrect).length;
      try {
        if (isFirebaseConfigured && db) {
          await addDoc(collection(db, 'attempts'), {
            testId: test.id,
            testTitle: test.title,
            classId: classId,
            studentId,
            studentName,
            studentEmail,
            answers: finalAnswers,
            score,
            totalQuestions: test.questions.length,
            completedAt: serverTimestamp(),
          });
        }
      } catch (e) {
        console.error('Failed to save attempt:', e);
      } finally {
        setSaving(false);
        setFinished(true);
      }
    }
  };

  if (finished) {
    const score = answers.filter(a => a.isCorrect).length;
    const pct = Math.round((score / test.questions.length) * 100);
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 70 ? '🎉' : pct >= 50 ? '😊' : '📚'}</div>
        <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: 8 }}>Test Complete!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>{test.title}</p>

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '24px 48px', marginBottom: 32
        }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Your Score
          </div>
          <div style={{ fontFamily: 'League Spartan', fontSize: '3rem', fontWeight: 900, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171' }}>
            {score} / {test.questions.length}
          </div>
          <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{pct}%</div>
        </div>

        {/* Per-question summary */}
        <div style={{ marginBottom: 32, textAlign: 'left', maxWidth: 400, margin: '0 auto 32px' }}>
          {test.questions.map((q, i) => {
            const a = answers[i];
            return (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                {a?.isCorrect
                  ? <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                  : <XCircle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                }
                <div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{q.text}</p>
                  {!a?.isCorrect && (
                    <p style={{ fontSize: '0.75rem', color: '#4ade80' }}>✓ {q.correctAnswer}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn btn-secondary" onClick={onFinish}>← Back to Tests</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 580, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#fff' }}>{test.title}</h2>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{test.subject}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'League Spartan', fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>
            {currentIdx + 1} / {test.questions.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>Questions</div>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ marginBottom: 28 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Difficulty badge */}
      {q.difficulty && (
        <div style={{ marginBottom: 12 }}>
          <span className={`badge ${q.difficulty === 'easy' ? 'badge-mint' : q.difficulty === 'medium' ? 'badge-amber' : 'badge-crimson'}`}>
            {q.difficulty === 'easy' ? '🟢' : q.difficulty === 'medium' ? '🟡' : '🔴'} {q.difficulty}
          </span>
        </div>
      )}

      {/* Question */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20, padding: 24, marginBottom: 20
      }}>
        <p style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>
          {q.text}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {q.options.map((opt, i) => {
          let cls = 'answer-option';
          if (submitted) {
            if (opt === q.correctAnswer) cls += ' correct';
            else if (opt === selected && opt !== q.correctAnswer) cls += ' wrong';
          } else if (opt === selected) cls += ' selected';

          return (
            <button
              key={i}
              className={cls}
              onClick={() => !submitted && setSelected(opt)}
              disabled={submitted}
            >
              <span className="answer-letter">{LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div style={{
          background: selected === q.correctAnswer ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${selected === q.correctAnswer ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
          borderRadius: 14, padding: '12px 16px', marginBottom: 16
        }}>
          <p style={{ fontWeight: 700, color: selected === q.correctAnswer ? '#4ade80' : '#f87171', fontSize: '0.9rem' }}>
            {selected === q.correctAnswer ? '🎉 Correct!' : `❌ Incorrect — Correct: ${q.correctAnswer}`}
          </p>
        </div>
      )}

      {/* Actions */}
      {!submitted ? (
        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={handleSubmit}
          disabled={!selected}
          id="btn-submit-test-answer"
        >
          Submit Answer
        </button>
      ) : (
        <button
          className="btn btn-secondary"
          style={{ width: '100%' }}
          onClick={() => advance()}
          disabled={saving}
          id="btn-next-test-question"
        >
          {saving
            ? <><div className="spinner spinner-sm" />Saving…</>
            : currentIdx + 1 === test.questions.length
              ? 'Finish Test ✓'
              : <>Next Question <ArrowRight size={16} /></>
          }
        </button>
      )}
    </div>
  );
}

// ── Main Student Dashboard ────────────────────────────────────────────────────
export default function StudentDashboard() {
  const { currentUser, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('tests');
  const [toast, showToast] = useToast();

  // Enrollment
  const [classId, setClassId] = useState('');
  const [enrollInput, setEnrollInput] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledClass, setEnrolledClass] = useState(null);

  // Tests
  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [activeTest, setActiveTest] = useState(null);

  // Attempts (my history)
  const [myAttempts, setMyAttempts] = useState([]);
  const [attemptsLoading, setAttemptsLoading] = useState(false);

  // ── Load enrolled class from Firestore ────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !currentUser) return;
    const q = query(collection(db, 'enrollments'), where('studentId', '==', currentUser.uid));
    const unsub = onSnapshot(q, async (snap) => {
      if (!snap.empty) {
        const enrollment = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setClassId(enrollment.classId);
        setEnrolledClass(enrollment);
      }
    });
    return unsub;
  }, [currentUser]);

  // ── Load tests for enrolled class ─────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !classId) return;
    setTestsLoading(true);
    const q = query(collection(db, 'tests'), where('classId', '==', classId));
    const unsub = onSnapshot(q, (snap) => {
      setTests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTestsLoading(false);
    }, e => { console.error(e); setTestsLoading(false); });
    return unsub;
  }, [classId]);

  // ── Load my attempts ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !currentUser) return;
    setAttemptsLoading(true);
    const q = query(collection(db, 'attempts'), where('studentId', '==', currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      setMyAttempts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setAttemptsLoading(false);
    }, e => { console.error(e); setAttemptsLoading(false); });
    return unsub;
  }, [currentUser]);

  // ── Enroll in class ───────────────────────────────────────────────────────
  const handleEnroll = async () => {
    const trimmed = enrollInput.trim();
    if (!trimmed || !isFirebaseConfigured) return;
    setEnrolling(true);
    try {
      // Check class exists
      const { doc: docFn, getDoc } = await import('firebase/firestore');
      const classDoc = await (await import('firebase/firestore')).getDoc(
        (await import('firebase/firestore')).doc(db, 'classes', trimmed)
      );
      if (!classDoc.exists()) {
        showToast('❌ Class not found. Check the Class ID and try again.');
        setEnrolling(false);
        return;
      }

      // Check not already enrolled
      const existing = await (await import('firebase/firestore')).getDocs(
        query(collection(db, 'enrollments'),
          where('studentId', '==', currentUser.uid),
          where('classId', '==', trimmed))
      );
      if (!existing.empty) {
        showToast('⚠️ You are already enrolled in this class.');
        setEnrolling(false);
        return;
      }

      await addDoc(collection(db, 'enrollments'), {
        studentId: currentUser.uid,
        studentName: userProfile.displayName,
        studentEmail: userProfile.email,
        classId: trimmed,
        className: classDoc.data().name,
        joinedAt: serverTimestamp(),
      });

      showToast(`✅ Enrolled in "${classDoc.data().name}"!`);
      setEnrollInput('');
    } catch (e) {
      console.error(e);
      showToast('❌ Enrollment failed. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // ── Compute stats ──────────────────────────────────────────────────────────
  const totalScore = myAttempts.reduce((sum, a) => sum + (a.score || 0), 0);
  const totalPossible = myAttempts.reduce((sum, a) => sum + (a.totalQuestions || 0), 0);
  const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  const attemptedTestIds = new Set(myAttempts.map(a => a.testId));
  const pendingTests = tests.filter(t => !attemptedTestIds.has(t.id));
  const completedTests = tests.filter(t => attemptedTestIds.has(t.id));

  const TABS = [
    { id: 'tests',   label: 'My Tests',  icon: '📋' },
    { id: 'tutor',   label: 'AI Tutor',  icon: '🤖' },
    { id: 'progress',label: 'Progress',  icon: '📈' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f3c9d5', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#cc2b3f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            📚 Student Dashboard
          </span>
          <h1 style={{ fontSize: '2.2rem', color: '#1A2540', marginTop: 4, fontWeight: 900 }}>
            HEY, {userProfile?.displayName?.split(' ')[0]?.toUpperCase() || 'STUDENT'} 👋
          </h1>
          <p style={{ color: '#1A2540', opacity: 0.8, fontSize: '0.9rem', marginTop: 4 }}>
            {enrolledClass
              ? `📍 Enrolled in: ${enrolledClass.className}`
              : 'Join a class to access tests assigned by your teacher'}
          </p>
        </div>

        {/* Firebase not configured */}
        {!isFirebaseConfigured && (
          <div className="setup-banner">
            <AlertTriangle size={24} color="#fbbf24" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ marginBottom: 4, fontWeight: 700 }}>Firebase not configured</p>
              <p>Add Firebase credentials to <code>frontend/.env</code>. AI Tutor still works if you have a Gemini key.</p>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Tests Completed', val: myAttempts.length, color: '#7dd3fc', icon: '✅' },
            { label: 'Average Score',   val: myAttempts.length > 0 ? `${avgPct}%` : '—', color: avgPct >= 70 ? '#4ade80' : avgPct >= 50 ? '#fbbf24' : '#f87171', icon: '🎯' },
            { label: 'Pending Tests',   val: pendingTests.length, color: '#fbbf24', icon: '📋' },
          ].map((k, i) => (
            <div key={i} className="kpi-card">
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value" style={{ color: k.color }}>{k.val}</div>
              <div className="kpi-sub">{k.icon}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 28 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => { setActiveTest(null); setActiveTab(t.id); }}
              id={`student-tab-${t.id}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: TESTS ─────────────────────────────────────────────────────── */}
        {activeTab === 'tests' && (
          <>
            {activeTest ? (
              <TakeTest
                test={activeTest}
                onFinish={() => setActiveTest(null)}
                studentId={currentUser.uid}
                studentName={userProfile.displayName}
                studentEmail={userProfile.email}
                classId={classId}
              />
            ) : (
              <div>
                {/* Enroll in class */}
                {!enrolledClass && (
                  <div className="section-card" style={{ marginBottom: 24 }}>
                    <div className="section-title">🏫 Join a Class</div>
                    <div className="section-sub">Enter the Class ID shared by your teacher</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input
                        className="input"
                        placeholder="Paste Class ID here…"
                        value={enrollInput}
                        onChange={e => setEnrollInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleEnroll()}
                        id="input-class-id"
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleEnroll}
                        disabled={enrolling || !enrollInput.trim() || !isFirebaseConfigured}
                        id="btn-enroll"
                      >
                        {enrolling ? <div className="spinner spinner-sm" /> : 'Join'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Pending tests */}
                {testsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="spinner" /></div>
                ) : !classId ? (
                  <EmptyState
                    icon="🏫"
                    title="Not enrolled in any class"
                    desc="Ask your teacher for the Class ID and enter it above to join their class and access tests."
                  />
                ) : pendingTests.length === 0 && completedTests.length === 0 ? (
                  <EmptyState
                    icon="📭"
                    title="No tests assigned yet"
                    desc="Your teacher hasn't created any tests for this class yet. Check back soon, or use the AI Tutor to practise while you wait."
                    action={
                      <button className="btn btn-secondary" onClick={() => setActiveTab('tutor')}>
                        🤖 Open AI Tutor
                      </button>
                    }
                  />
                ) : (
                  <div>
                    {/* Pending */}
                    {pendingTests.length > 0 && (
                      <div style={{ marginBottom: 28 }}>
                        <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: 14 }}>
                          📋 Pending Tests <span className="badge badge-amber" style={{ marginLeft: 8 }}>{pendingTests.length}</span>
                        </h3>
                        <div style={{ display: 'grid', gap: 12 }}>
                          {pendingTests.map(test => (
                            <div key={test.id} className="section-card" style={{ marginBottom: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                <div>
                                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                                    <h3 style={{ fontSize: '1rem', color: '#fff' }}>{test.title}</h3>
                                    <span className="badge badge-sky">{test.subject}</span>
                                  </div>
                                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                    {test.questions?.length || 0} questions
                                    {test.questions?.some(q => q.difficulty) && (
                                      <> • {test.questions.filter(q => q.difficulty === 'easy').length} easy,&nbsp;
                                      {test.questions.filter(q => q.difficulty === 'medium').length} medium,&nbsp;
                                      {test.questions.filter(q => q.difficulty === 'hard').length} hard</>
                                    )}
                                  </p>
                                </div>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => setActiveTest(test)}
                                  id={`btn-take-test-${test.id}`}
                                >
                                  Take Test <ArrowRight size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Completed */}
                    {completedTests.length > 0 && (
                      <div>
                        <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: 14 }}>
                          ✅ Completed Tests
                        </h3>
                        <div style={{ display: 'grid', gap: 12 }}>
                          {completedTests.map(test => {
                            const attempt = myAttempts.find(a => a.testId === test.id);
                            const pct = attempt ? Math.round((attempt.score / attempt.totalQuestions) * 100) : 0;
                            return (
                              <div key={test.id} className="section-card" style={{ marginBottom: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                                  <div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                                      <h3 style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)' }}>{test.title}</h3>
                                      <span className="badge badge-mint">Completed</span>
                                    </div>
                                    {attempt && (
                                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                                        Score: {attempt.score}/{attempt.totalQuestions} ({pct}%)
                                      </p>
                                    )}
                                  </div>
                                  <div style={{ fontFamily: 'League Spartan', fontSize: '1.4rem', fontWeight: 900, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171' }}>
                                    {pct}%
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── TAB: AI TUTOR ──────────────────────────────────────────────────── */}
        {activeTab === 'tutor' && <AITutor />}

        {/* ── TAB: PROGRESS ──────────────────────────────────────────────────── */}
        {activeTab === 'progress' && (
          <div>
            <h2 className="section-title">📈 My Progress</h2>
            <p className="section-sub">Your test history and performance over time</p>

            {attemptsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="spinner" /></div>
            ) : myAttempts.length === 0 ? (
              <EmptyState
                icon="📈"
                title="No test history yet"
                desc="Complete your first test to see your progress here. Your scores, accuracy, and improvement over time will be tracked."
                action={
                  <button className="btn btn-primary" onClick={() => setActiveTab('tests')}>
                    📋 View Available Tests
                  </button>
                }
              />
            ) : (
              <div>
                {/* Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
                  <div className="section-card" style={{ marginBottom: 0 }}>
                    <div className="kpi-label">Total Score (All Tests)</div>
                    <div className="kpi-value" style={{ color: '#7dd3fc' }}>{totalScore} pts</div>
                    <div className="kpi-sub">out of {totalPossible} possible</div>
                    <div className="progress-bar" style={{ marginTop: 12 }}>
                      <div className="progress-fill mint" style={{ width: `${avgPct}%` }} />
                    </div>
                  </div>
                  <div className="section-card" style={{ marginBottom: 0 }}>
                    <div className="kpi-label">Performance Level</div>
                    <div className="kpi-value" style={{ color: avgPct >= 70 ? '#4ade80' : avgPct >= 50 ? '#fbbf24' : '#f87171' }}>
                      {avgPct >= 80 ? '🏆 Excellent' : avgPct >= 70 ? '⭐ Good' : avgPct >= 50 ? '📈 Improving' : '📚 Needs Work'}
                    </div>
                    <div className="kpi-sub">{avgPct}% average across all tests</div>
                  </div>
                </div>

                {/* Attempts list */}
                <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 style={{ fontSize: '1rem', color: '#fff' }}>All Attempts</h3>
                  </div>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ padding: '14px 20px' }}>Test</th>
                        <th style={{ padding: '14px 20px' }}>Score</th>
                        <th style={{ padding: '14px 20px' }}>Result</th>
                        <th style={{ padding: '14px 20px' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAttempts.map((a, i) => {
                        const pct = Math.round((a.score / a.totalQuestions) * 100);
                        return (
                          <tr key={a.id}>
                            <td style={{ padding: '14px 20px', fontWeight: 600, color: '#fff' }}>{a.testTitle || 'Test'}</td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{ fontFamily: 'League Spartan', fontWeight: 900, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171' }}>
                                {a.score}/{a.totalQuestions}
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span className={`badge ${pct >= 70 ? 'badge-mint' : pct >= 50 ? 'badge-amber' : 'badge-crimson'}`}>
                                {pct}%
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
                              {a.completedAt?.toDate ? new Date(a.completedAt.toDate()).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
