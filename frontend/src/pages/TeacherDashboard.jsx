import React, { useState, useEffect, useCallback } from 'react';
import {
  collection, addDoc, getDocs, query, where,
  serverTimestamp, doc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';
import CreateTestModal from '../components/CreateTestModal';
import {
  Plus, Users, BarChart2, Video, ClipboardList,
  AlertTriangle, Trash2, Copy, ExternalLink, RefreshCw,
  TrendingUp, TrendingDown, Minus, Search
} from 'lucide-react';

// ── Helper: Toast ─────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };
  return [toast, showToast];
}

// ── Helper: meet link ─────────────────────────────────────────────────────────
function generateMeetLink() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const seg = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TeacherDashboard() {
  const { currentUser, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('classes');
  const [toast, showToast] = useToast();

  // Classes
  const [classes, setClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('Mathematics');
  const [creatingClass, setCreatingClass] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  // Tests
  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [showCreateTest, setShowCreateTest] = useState(false);

  // Analytics / Attempts
  const [attempts, setAttempts] = useState([]);
  const [attemptsLoading, setAttemptsLoading] = useState(false);

  // Meet
  const [meetLink, setMeetLink] = useState('');
  const [searchQ, setSearchQ] = useState('');

  // ── Load teacher's classes ──────────────────────────────────────────────────
  const loadClasses = useCallback(async () => {
    if (!isFirebaseConfigured || !db || !currentUser) return;
    setClassesLoading(true);
    try {
      const q = query(collection(db, 'classes'), where('teacherId', '==', currentUser.uid));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setClasses(list);
      if (list.length > 0 && !selectedClassId) setSelectedClassId(list[0].id);
    } catch (e) {
      console.error('loadClasses error:', e);
    } finally {
      setClassesLoading(false);
    }
  }, [currentUser, selectedClassId]);

  useEffect(() => { loadClasses(); }, [loadClasses]);

  // ── Load tests for selected class ──────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !selectedClassId) return;
    setTestsLoading(true);
    const q = query(collection(db, 'tests'), where('classId', '==', selectedClassId));
    const unsub = onSnapshot(q, (snap) => {
      setTests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTestsLoading(false);
    }, (e) => { console.error(e); setTestsLoading(false); });
    return unsub;
  }, [selectedClassId]);

  // ── Load attempts for analytics ─────────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !selectedClassId) return;
    setAttemptsLoading(true);
    const testIds = tests.map(t => t.id);
    if (testIds.length === 0) { setAttempts([]); setAttemptsLoading(false); return; }

    // Firestore 'in' filter supports up to 10 items
    const q = query(collection(db, 'attempts'), where('classId', '==', selectedClassId));
    const unsub = onSnapshot(q, (snap) => {
      setAttempts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setAttemptsLoading(false);
    }, e => { console.error(e); setAttemptsLoading(false); });
    return unsub;
  }, [selectedClassId, tests]);

  // ── Create class ────────────────────────────────────────────────────────────
  const handleCreateClass = async () => {
    if (!newClassName.trim() || !isFirebaseConfigured) return;
    setCreatingClass(true);
    try {
      const ref = await addDoc(collection(db, 'classes'), {
        name: newClassName.trim(),
        subject: newClassSubject,
        teacherId: currentUser.uid,
        teacherName: userProfile.displayName,
        createdAt: serverTimestamp(),
      });
      showToast(`✅ Class "${newClassName}" created! Share the class ID with students: ${ref.id}`);
      setNewClassName('');
      loadClasses();
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to create class. Please try again.');
    } finally {
      setCreatingClass(false);
    }
  };

  // ── Delete class ────────────────────────────────────────────────────────────
  const handleDeleteClass = async (classId, className) => {
    if (!window.confirm(`Delete class "${className}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'classes', classId));
      if (selectedClassId === classId) setSelectedClassId(null);
      loadClasses();
      showToast(`🗑️ Class "${className}" deleted.`);
    } catch (e) {
      showToast('❌ Failed to delete class.');
    }
  };

  // ── Create test ─────────────────────────────────────────────────────────────
  const handleSaveTest = async (testData) => {
    if (!isFirebaseConfigured || !selectedClassId) return;
    try {
      await addDoc(collection(db, 'tests'), {
        ...testData,
        classId: selectedClassId,
        teacherId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setShowCreateTest(false);
      showToast(`✅ Test "${testData.title}" saved!`);
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to save test.');
    }
  };

  // ── Delete test ─────────────────────────────────────────────────────────────
  const handleDeleteTest = async (testId, testTitle) => {
    if (!window.confirm(`Delete test "${testTitle}"?`)) return;
    try {
      await deleteDoc(doc(db, 'tests', testId));
      showToast(`🗑️ Test deleted.`);
    } catch (e) {
      showToast('❌ Failed to delete test.');
    }
  };

  // ── Analytics computed ──────────────────────────────────────────────────────
  const studentStats = (() => {
    if (attempts.length === 0) return [];
    const byStudent = {};
    attempts.forEach(a => {
      if (!byStudent[a.studentId]) {
        byStudent[a.studentId] = {
          name: a.studentName || 'Unknown',
          email: a.studentEmail || '',
          scores: [],
          attempts: 0,
        };
      }
      byStudent[a.studentId].scores.push((a.score / a.totalQuestions) * 100);
      byStudent[a.studentId].attempts++;
    });
    return Object.entries(byStudent).map(([uid, s]) => ({
      uid,
      name: s.name,
      email: s.email,
      avgScore: Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length),
      attempts: s.attempts,
      isAtRisk: s.scores.reduce((a, b) => a + b, 0) / s.scores.length < 50,
    }));
  })();

  const filteredStats = studentStats.filter(s =>
    s.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQ.toLowerCase())
  );

  const activeClass = classes.find(c => c.id === selectedClassId);

  const SUBJECTS = ['Mathematics','Physics','Chemistry','Biology','History','Computer Science','English','Economics'];
  const TABS = [
    { id: 'classes',   label: 'My Classes',    icon: '🏫' },
    { id: 'tests',     label: 'Tests',         icon: '📝' },
    { id: 'analytics', label: 'Analytics',     icon: '📊' },
    { id: 'meet',      label: 'Conduct Class', icon: '🎥' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', background: 'var(--navy)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--crimson)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              🎓 Teacher Dashboard
            </span>
            <h1 style={{ fontSize: '2rem', color: '#fff', marginTop: 4 }}>
              Welcome, {userProfile?.displayName?.split(' ')[0] || 'Teacher'} 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', marginTop: 4 }}>
              Manage your classes, create tests, and monitor student progress
            </p>
          </div>

          {/* Class selector if multiple */}
          {classes.length > 1 && (
            <select
              value={selectedClassId || ''}
              onChange={e => setSelectedClassId(e.target.value)}
              className="input"
              style={{ width: 'auto', minWidth: 200 }}
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} • {c.subject}</option>
              ))}
            </select>
          )}
        </div>

        {/* Firebase not configured */}
        {!isFirebaseConfigured && (
          <div className="setup-banner">
            <AlertTriangle size={24} color="#fbbf24" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ marginBottom: 4, fontWeight: 700 }}>Firebase not configured</p>
              <p>Add Firebase credentials to <code>frontend/.env</code> to enable real-time data. See <code>.env.example</code> for required vars.</p>
            </div>
          </div>
        )}

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Total Classes', val: classes.length, icon: '🏫', color: '#7dd3fc' },
            { label: 'Total Tests', val: tests.length, icon: '📝', color: '#fbbf24' },
            { label: 'Student Attempts', val: attempts.length, icon: '✍️', color: '#a78bfa' },
            { label: 'At-Risk Students', val: studentStats.filter(s => s.isAtRisk).length, icon: '⚠️', color: '#f87171' },
          ].map((k, i) => (
            <div key={i} className="kpi-card" style={{ borderLeft: `3px solid ${k.color}20` }}>
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
              onClick={() => setActiveTab(t.id)}
              id={`tab-${t.id}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: MY CLASSES ──────────────────────────────────────────────── */}
        {activeTab === 'classes' && (
          <div>
            {/* Create class form */}
            <div className="section-card" style={{ marginBottom: 24 }}>
              <div className="section-title">➕ Create New Class</div>
              <div className="section-sub">Students can join your class using the Class ID</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, alignItems: 'center' }}>
                <input
                  className="input"
                  placeholder="Class name (e.g., Class 10-A, Grade 8 Science)"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreateClass()}
                  id="input-class-name"
                />
                <select
                  className="input"
                  value={newClassSubject}
                  onChange={e => setNewClassSubject(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateClass}
                  disabled={creatingClass || !newClassName.trim() || !isFirebaseConfigured}
                  id="btn-create-class"
                >
                  {creatingClass ? <div className="spinner spinner-sm" /> : <Plus size={16} />}
                  Create
                </button>
              </div>
            </div>

            {/* Classes list */}
            {classesLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="spinner" /></div>
            ) : classes.length === 0 ? (
              <EmptyState
                icon="🏫"
                title="No classes yet"
                desc="Create your first class above. Share the Class ID with your students so they can enroll."
              />
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {classes.map(cls => (
                  <div key={cls.id} className="section-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>{cls.name}</h3>
                          <span className="badge badge-sky">{cls.subject}</span>
                          {cls.id === selectedClassId && <span className="badge badge-mint">Active</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                            ID: {cls.id}
                          </span>
                          <button
                            onClick={() => { navigator.clipboard.writeText(cls.id); showToast('📋 Class ID copied!'); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 2 }}
                            title="Copy Class ID"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedClassId(cls.id)}
                        >
                          Select
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleDeleteClass(cls.id, cls.name)}
                          style={{ color: '#f87171' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: TESTS ───────────────────────────────────────────────────── */}
        {activeTab === 'tests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 className="section-title">Tests {activeClass ? `for ${activeClass.name}` : ''}</h2>
                <p className="section-sub" style={{ margin: 0 }}>
                  Create and manage tests for your students. AI can suggest questions.
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateTest(true)}
                disabled={!selectedClassId || !isFirebaseConfigured}
                id="btn-new-test"
              >
                <Plus size={16} /> New Test
              </button>
            </div>

            {!selectedClassId ? (
              <EmptyState icon="🏫" title="Select a class first" desc="Go to 'My Classes' and select an active class to manage its tests." />
            ) : testsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="spinner" /></div>
            ) : tests.length === 0 ? (
              <EmptyState
                icon="📝"
                title="No tests created yet"
                desc="Click 'New Test' to create your first test. Use AI to automatically suggest questions."
                action={
                  <button className="btn btn-primary" onClick={() => setShowCreateTest(true)} id="btn-create-first-test">
                    <Plus size={16} /> Create First Test
                  </button>
                }
              />
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {tests.map(test => (
                  <div key={test.id} className="section-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>{test.title}</h3>
                          <span className="badge badge-sky">{test.subject}</span>
                          <span className="badge badge-navy">{test.questions?.length || 0} Qs</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {['easy','medium','hard'].map(d => {
                            const count = test.questions?.filter(q => q.difficulty === d).length || 0;
                            return count > 0 ? (
                              <span key={d} className={`badge badge-${d === 'easy' ? 'mint' : d === 'medium' ? 'amber' : 'crimson'}`}>
                                {count} {d}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDeleteTest(test.id, test.title)}
                        style={{ color: '#f87171' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Question preview */}
                    <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                      {test.questions?.slice(0, 2).map((q, i) => (
                        <p key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                          {i + 1}. {q.text}
                        </p>
                      ))}
                      {test.questions?.length > 2 && (
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
                          +{test.questions.length - 2} more questions…
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showCreateTest && (
              <CreateTestModal
                onClose={() => setShowCreateTest(false)}
                onSave={handleSaveTest}
                classId={selectedClassId}
              />
            )}
          </div>
        )}

        {/* ── TAB: ANALYTICS ───────────────────────────────────────────────── */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 className="section-title">📊 Student Analytics {activeClass ? `— ${activeClass.name}` : ''}</h2>
              <p className="section-sub" style={{ margin: 0 }}>
                Real performance data from student test submissions
              </p>
            </div>

            {!selectedClassId ? (
              <EmptyState icon="🏫" title="Select a class first" desc="Select a class from 'My Classes' tab to see its analytics." />
            ) : attemptsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}><div className="spinner" /></div>
            ) : studentStats.length === 0 ? (
              <EmptyState
                icon="📊"
                title="No student data yet"
                desc="Analytics will appear here once students take tests in your class. Assign tests and share your Class ID with students."
              />
            ) : (
              <div>
                {/* Summary KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
                  {[
                    {
                      label: 'Students Attempted',
                      val: studentStats.length,
                      sub: 'Unique students',
                      color: '#7dd3fc'
                    },
                    {
                      label: 'Average Score',
                      val: studentStats.length > 0
                        ? Math.round(studentStats.reduce((a, b) => a + b.avgScore, 0) / studentStats.length) + '%'
                        : '—',
                      sub: 'Across all tests',
                      color: '#4ade80'
                    },
                    {
                      label: 'At-Risk Students',
                      val: studentStats.filter(s => s.isAtRisk).length,
                      sub: 'Avg score < 50%',
                      color: '#f87171'
                    },
                  ].map((k, i) => (
                    <div key={i} className="kpi-card">
                      <div className="kpi-label">{k.label}</div>
                      <div className="kpi-value" style={{ color: k.color }}>{k.val}</div>
                      <div className="kpi-sub">{k.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Search */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      className="input"
                      placeholder="Search student by name or email…"
                      value={searchQ}
                      onChange={e => setSearchQ(e.target.value)}
                      style={{ paddingLeft: 40 }}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="section-card" style={{ overflowX: 'auto', padding: 0 }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ padding: '16px 20px' }}>Student</th>
                        <th style={{ padding: '16px 20px' }}>Avg Score</th>
                        <th style={{ padding: '16px 20px' }}>Attempts</th>
                        <th style={{ padding: '16px 20px' }}>Trend</th>
                        <th style={{ padding: '16px 20px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStats.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                            No matching students found.
                          </td>
                        </tr>
                      ) : (
                        filteredStats.map((s, i) => (
                          <tr key={s.uid}>
                            <td style={{ padding: '14px 20px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                  width: 32, height: 32, borderRadius: '50%',
                                  background: `hsl(${i * 47}, 60%, 40%)`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '0.82rem', fontWeight: 700, color: '#fff', flexShrink: 0
                                }}>
                                  {s.name?.[0]?.toUpperCase() || '?'}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{s.name}</div>
                                  {s.email && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{s.email}</div>}
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{ fontFamily: 'League Spartan', fontSize: '1.1rem', fontWeight: 900, color: s.avgScore >= 70 ? '#4ade80' : s.avgScore >= 50 ? '#fbbf24' : '#f87171' }}>
                                {s.avgScore}%
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.6)' }}>{s.attempts}</td>
                            <td style={{ padding: '14px 20px' }}>
                              {s.avgScore >= 70
                                ? <TrendingUp size={16} color="#4ade80" />
                                : s.avgScore >= 50
                                ? <Minus size={16} color="#fbbf24" />
                                : <TrendingDown size={16} color="#f87171" />
                              }
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span className={`badge ${s.isAtRisk ? 'badge-crimson' : 'badge-mint'}`}>
                                {s.isAtRisk ? '⚠️ At Risk' : '✅ Good'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Recent attempts */}
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: 14 }}>🕒 Recent Attempts</h3>
                  {attempts.slice(0, 8).map((a, i) => (
                    <div key={a.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      flexWrap: 'wrap', gap: 8
                    }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{a.studentName || 'Student'}</span>
                        <span className="badge badge-navy">{a.testTitle || 'Test'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ fontFamily: 'League Spartan', fontWeight: 900, color: (a.score / a.totalQuestions) >= 0.7 ? '#4ade80' : '#f87171' }}>
                          {a.score}/{a.totalQuestions}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                          {a.completedAt?.toDate ? new Date(a.completedAt.toDate()).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: CONDUCT CLASS ────────────────────────────────────────────── */}
        {activeTab === 'meet' && (
          <div style={{ maxWidth: 600 }}>
            <h2 className="section-title">🎥 Conduct Live Class</h2>
            <p className="section-sub">Generate a Google Meet link and share it with your students</p>

            <div className="section-card">
              {/* Meet link generator */}
              <div style={{ marginBottom: 24 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setMeetLink(generateMeetLink())}
                  style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                  id="btn-generate-meet"
                >
                  <Video size={18} /> Generate Google Meet Link
                </button>
              </div>

              {meetLink && (
                <div>
                  <label className="input-label">Your Meeting Link</label>
                  <div style={{
                    display: 'flex', gap: 8, alignItems: 'center',
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: 14, padding: '14px 16px', marginBottom: 16
                  }}>
                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.9rem', color: '#4ade80', wordBreak: 'break-all' }}>
                      {meetLink}
                    </span>
                    <button
                      className="btn btn-mint btn-sm"
                      onClick={() => { navigator.clipboard.writeText(meetLink); showToast('📋 Meet link copied!'); }}
                      id="btn-copy-meet"
                    >
                      <Copy size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                      id="btn-open-meet"
                    >
                      <ExternalLink size={16} /> Open Meet
                    </a>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setMeetLink(generateMeetLink())}
                      style={{ flex: 1 }}
                    >
                      <RefreshCw size={16} /> New Link
                    </button>
                  </div>
                </div>
              )}

              {!meetLink && (
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', marginTop: 8 }}>
                  Click above to generate a random Google Meet link
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="section-card" style={{ marginTop: 16 }}>
              <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: 14 }}>💡 Tips for Live Classes</h3>
              {[
                '📋 Share the Meet link and your Class ID with students before the session',
                '📊 Monitor the Analytics tab during class to see real-time engagement',
                '📝 Create a quick test after class to check comprehension',
                '🎯 Use the AI Tutor to demonstrate topic explanations live',
              ].map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '10px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)'
                }}>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}