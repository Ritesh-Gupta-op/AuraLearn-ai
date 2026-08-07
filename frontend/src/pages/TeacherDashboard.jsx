import React, { useState, useMemo } from 'react';

export default function DynamicTeacherDashboard({ initialData = null }) {
  // State for active class selection
  const [selectedClassId, setSelectedClassId] = useState('class-10a');
  
  // State for dynamic chart metric selection ('theta', 'accuracy', or 'timeSec')
  const [chartMetric, setChartMetric] = useState('theta');

  // Interactive filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Dynamic state for classes dataset
  const [classesData, setClassesData] = useState(
    initialData || {
      'class-10a': {
        id: 'class-10a',
        name: 'Class 10-A',
        subject: 'Mathematics',
        quizzes: [
          { name: 'Quiz 1', theta: -0.8, accuracy: 45, timeSec: 42 },
          { name: 'Quiz 2', theta: -0.4, accuracy: 58, timeSec: 38 },
          { name: 'Quiz 3', theta: -0.1, accuracy: 68, timeSec: 35 },
          { name: 'Quiz 4', theta: 0.25, accuracy: 79, timeSec: 29 },
          { name: 'Quiz 5', theta: 0.58, accuracy: 88, timeSec: 24 },
        ],
        roster: [
          { id: 'st-1', name: 'Ananya Gupta', theta: 1.4, accuracy: 96, quizzesDone: 5, totalQuizzes: 5, lastActive: '10 mins ago', flagMessage: '' },
          { id: 'st-2', name: 'Aarav Sharma', theta: -1.2, accuracy: 38, quizzesDone: 3, totalQuizzes: 5, lastActive: '2 hrs ago', flagMessage: 'Struggling with Fraction Addition' },
          { id: 'st-3', name: 'Devansh Mukherjee', theta: 0.9, accuracy: 84, quizzesDone: 5, totalQuizzes: 5, lastActive: '1 hr ago', flagMessage: '' },
          { id: 'st-4', name: 'Riya Sen', theta: -0.9, accuracy: 42, quizzesDone: 4, totalQuizzes: 5, lastActive: '1 day ago', flagMessage: 'High Drop-off in Quiz 4' },
          { id: 'st-5', name: 'Sneha Roy', theta: 0.8, accuracy: 82, quizzesDone: 5, totalQuizzes: 5, lastActive: '15 mins ago', flagMessage: '' },
          { id: 'st-6', name: 'Vikram Patel', theta: -0.7, accuracy: 45, quizzesDone: 5, totalQuizzes: 5, lastActive: '30 mins ago', flagMessage: 'Slow Response Times (>60s)' },
        ],
      },
      'class-10b': {
        id: 'class-10b',
        name: 'Class 10-B',
        subject: 'Mathematics',
        quizzes: [
          { name: 'Quiz 1', theta: -1.1, accuracy: 38, timeSec: 50 },
          { name: 'Quiz 2', theta: -0.7, accuracy: 48, timeSec: 44 },
          { name: 'Quiz 3', theta: -0.3, accuracy: 59, timeSec: 40 },
          { name: 'Quiz 4', theta: -0.05, accuracy: 66, timeSec: 36 },
          { name: 'Quiz 5', theta: 0.12, accuracy: 72, timeSec: 32 },
        ],
        roster: [
          { id: 'st-7', name: 'Karan Das', theta: -1.5, accuracy: 30, quizzesDone: 2, totalQuizzes: 5, lastActive: '3 days ago', flagMessage: 'Incomplete Quizzes' },
          { id: 'st-8', name: 'Priya Verma', theta: -1.0, accuracy: 40, quizzesDone: 4, totalQuizzes: 5, lastActive: '5 hrs ago', flagMessage: 'Low Fraction Division Score' },
          { id: 'st-9', name: 'Rahul Bose', theta: 0.6, accuracy: 78, quizzesDone: 5, totalQuizzes: 5, lastActive: '4 hrs ago', flagMessage: '' },
        ],
      },
    }
  );

  // Dynamic Interventions Modal & Toast State
  const [modalTarget, setModalTarget] = useState(null);
  const [drillTopic, setDrillTopic] = useState('Fraction Addition & Subtraction (Adaptive Level 1)');
  const [toastMessage, setToastMessage] = useState('');

  // Currently Selected Class Data
  const activeClass = classesData[selectedClassId] || Object.values(classesData)[0];

  // Dynamic metrics calculation
  const dynamicMetrics = useMemo(() => {
    if (!activeClass || !activeClass.roster.length) {
      return { totalStudents: 0, avgTheta: 0, atRiskCount: 0, completionRate: '0%', atRiskStudents: [] };
    }

    const roster = activeClass.roster;
    const totalStudents = roster.length;

    // Calculate dynamic average theta
    const totalTheta = roster.reduce((acc, st) => acc + st.theta, 0);
    const avgTheta = (totalTheta / totalStudents).toFixed(2);

    // Calculate dynamic count of at-risk students (theta < 0 or accuracy < 50%)
    const atRiskStudents = roster.filter((st) => st.theta < 0 || st.accuracy < 50);
    const atRiskCount = atRiskStudents.length;

    // Calculate dynamic completion rate
    const totalPossibleQuizzes = roster.reduce((acc, st) => acc + st.totalQuizzes, 0);
    const totalDoneQuizzes = roster.reduce((acc, st) => acc + st.quizzesDone, 0);
    const completionRate =
      totalPossibleQuizzes > 0
        ? Math.round((totalDoneQuizzes / totalPossibleQuizzes) * 100) + '%'
        : '0%';

    return { totalStudents, avgTheta, atRiskCount, completionRate, atRiskStudents };
  }, [activeClass]);

  // Dynamic roster filtering
  const filteredRoster = useMemo(() => {
    return activeClass.roster.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const isAtRisk = student.theta < 0 || student.accuracy < 50;

      if (statusFilter === 'AT_RISK') return matchesSearch && isAtRisk;
      if (statusFilter === 'PROFICIENT') return matchesSearch && !isAtRisk;
      return matchesSearch;
    });
  }, [activeClass, searchQuery, statusFilter]);

  // Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Dynamic Drill Assignment Trigger
  const handleAssignDrillConfirm = () => {
    if (!modalTarget) return;

    if (modalTarget.isGroup) {
      triggerToast(`Assigned drill "${drillTopic}" to ${dynamicMetrics.atRiskCount} at-risk students!`);
    } else {
      triggerToast(`Assigned drill "${drillTopic}" to ${modalTarget.name}!`);
    }
    setModalTarget(null);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#F3C9D5',
        padding: '32px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Toast Feedback */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              backgroundColor: '#1A2540',
              color: '#FFFFFF',
              padding: '14px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              zIndex: 1000,
            }}
          >
            ✅ {toastMessage}
          </div>
        )}

        {/* Dashboard Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', color: '#CC2B3F', textTransform: 'uppercase' }}>
              Real-Time Analytics & Intervention
            </span>
            <h1 style={{ fontSize: '32px', color: '#1A2540', fontWeight: '900', margin: '4px 0 0' }}>
              Teacher Monitoring Dashboard
            </h1>
          </div>

          {/* Dynamic Class Switcher */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', color: '#1A2540', fontSize: '14px' }}>Active Class:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              style={{
                backgroundColor: '#1A2540',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: '999px',
                fontWeight: '800',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {Object.values(classesData).map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} • {cls.subject}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* KPI Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={kpiCardStyle}>
            <span style={kpiLabelStyle}>Total Enrolled</span>
            <p style={kpiValueStyle}>{dynamicMetrics.totalStudents}</p>
            <span style={{ fontSize: '12px', color: '#22C55E', fontWeight: '700' }}>● Live Session Active</span>
          </div>

          <div style={kpiCardStyle}>
            <span style={kpiLabelStyle}>Class Avg Mastery (θ)</span>
            <p style={{ ...kpiValueStyle, color: Number(dynamicMetrics.avgTheta) >= 0 ? '#16A34A' : '#CC2B3F' }}>
              {dynamicMetrics.avgTheta >= 0 ? `+${dynamicMetrics.avgTheta}` : dynamicMetrics.avgTheta}
            </p>
            <span style={{ fontSize: '12px', color: '#1A2540', opacity: 0.7 }}>Computed IRT Ability Metric</span>
          </div>

          <div style={{ ...kpiCardStyle, borderLeft: '6px solid #EF4444' }}>
            <span style={kpiLabelStyle}>At-Risk Students</span>
            <p style={{ ...kpiValueStyle, color: '#EF4444' }}>{dynamicMetrics.atRiskCount}</p>
            <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '700' }}>
              {dynamicMetrics.atRiskCount > 0 ? 'Requires Action' : 'All Clear'}
            </span>
          </div>

          <div style={kpiCardStyle}>
            <span style={kpiLabelStyle}>Quiz Completion</span>
            <p style={kpiValueStyle}>{dynamicMetrics.completionRate}</p>
            <span style={{ fontSize: '12px', color: '#1A2540', opacity: 0.7 }}>Aggregate Progress</span>
          </div>
        </div>

        {/* Dynamic SVG Chart */}
        <div style={sectionCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '20px', color: '#1A2540', fontWeight: '800', margin: 0 }}>
              Class Mastery Progression Trends
            </h3>

            {/* Metric Switcher */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#E5D6C3', padding: '4px', borderRadius: '999px' }}>
              {['theta', 'accuracy', 'timeSec'].map((metricKey) => (
                <button
                  key={metricKey}
                  onClick={() => setChartMetric(metricKey)}
                  style={metricToggleBtnStyle(chartMetric === metricKey)}
                >
                  {metricKey === 'theta' ? 'Ability (θ)' : metricKey === 'accuracy' ? 'Accuracy (%)' : 'Avg Speed (sec)'}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Plotting */}
          <div style={{ backgroundColor: '#F2E9DB', borderRadius: '16px', padding: '24px 16px', border: '2px solid #1A2540' }}>
            <svg viewBox="0 0 500 160" style={{ width: '100%', height: '220px', overflow: 'visible' }}>
              <line x1="40" y1="20" x2="480" y2="20" stroke="#E2D5CF" strokeDasharray="4" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#E2D5CF" strokeDasharray="4" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#E2D5CF" strokeDasharray="4" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#1A2540" strokeWidth="1.5" />

              {(() => {
                const quizzes = activeClass.quizzes;
                if (!quizzes.length) return null;

                const points = quizzes.map((q, idx) => {
                  const x = 60 + idx * Math.floor(400 / Math.max(quizzes.length - 1, 1));
                  let y = 80;
                  if (chartMetric === 'theta') y = 130 - (q.theta + 1.5) * 40;
                  if (chartMetric === 'accuracy') y = 150 - (q.accuracy / 100) * 120;
                  if (chartMetric === 'timeSec') y = (q.timeSec / 60) * 120;
                  return { x, y, val: chartMetric === 'theta' ? q.theta : chartMetric === 'accuracy' ? `${q.accuracy}%` : `${q.timeSec}s`, label: q.name };
                });

                const pathString = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

                return (
                  <>
                    <path d={pathString} fill="none" stroke={chartMetric === 'theta' ? '#CC2B3F' : chartMetric === 'accuracy' ? '#22C55E' : '#2563EB'} strokeWidth="4" strokeLinecap="round" />
                    {points.map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="6" fill="#1A2540" stroke="#FFFFFF" strokeWidth="2" />
                        <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="10" fontWeight="800" fill="#1A2540">
                          {pt.val}
                        </text>
                        <text x={pt.x} y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1A2540">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* At-Risk Interventions */}
        <div style={{ ...sectionCardStyle, borderLeft: '8px solid #CC2B3F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#1A2540', fontWeight: '800', margin: 0 }}>
                🚨 At-Risk Student Interventions
              </h3>
              <p style={{ fontSize: '13px', color: '#1A2540', opacity: 0.8, margin: '4px 0 0' }}>
                Automated detection based on ability thresholds ($\theta &lt; 0$) and low accuracy.
              </p>
            </div>

            {dynamicMetrics.atRiskStudents.length > 0 && (
              <button
                onClick={() => setModalTarget({ name: 'Entire At-Risk Group', isGroup: true })}
                style={{
                  backgroundColor: '#CC2B3F',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                ⚡ Mass Remedial Assignment
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {dynamicMetrics.atRiskStudents.length === 0 ? (
              <p style={{ padding: '16px', color: '#16A34A', fontWeight: '700', textAlign: 'center', margin: 0 }}>
                🎉 No students currently require immediate intervention!
              </p>
            ) : (
              dynamicMetrics.atRiskStudents.map((st) => (
                <div
                  key={st.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '2px solid #1A2540',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '16px', color: '#1A2540' }}>{st.name}</strong>
                      <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '6px' }}>
                        Accuracy: {st.accuracy}% (θ {st.theta})
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#1A2540', opacity: 0.8, margin: '4px 0 0' }}>
                      ⚠️ {st.flagMessage || 'Triggered alert threshold'} • Active {st.lastActive}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => triggerToast(`Sent custom encouragement nudge to ${st.name}`)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: '2px solid #1A2540',
                        backgroundColor: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      💬 Nudge
                    </button>
                    <button
                      onClick={() => setModalTarget({ id: st.id, name: st.name, isGroup: false })}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: '#1A2540',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      🎯 Target Remedial
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Searchable Roster Table */}
        <div style={sectionCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '20px', color: '#1A2540', fontWeight: '800', margin: 0 }}>
              Class Roster Performance Matrix
            </h3>

            {/* Dynamic Search & Filter Controls */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: '2px solid #1A2540',
                  fontWeight: '600',
                  fontSize: '13px',
                }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: '2px solid #1A2540',
                  fontWeight: '700',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="ALL">All Students</option>
                <option value="AT_RISK">At-Risk Only</option>
                <option value="PROFICIENT">Proficient Only</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1A2540', color: '#1A2540', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Student Name</th>
                  <th style={{ padding: '12px' }}>Ability (θ)</th>
                  <th style={{ padding: '12px' }}>Accuracy</th>
                  <th style={{ padding: '12px' }}>Progress</th>
                  <th style={{ padding: '12px' }}>Status Flag</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#1A2540' }}>
                      No matching student records found.
                    </td>
                  </tr>
                ) : (
                  filteredRoster.map((st) => {
                    const isAtRisk = st.theta < 0 || st.accuracy < 50;
                    return (
                      <tr key={st.id} style={{ borderBottom: '1px solid #E2D5CF', fontSize: '14px', color: '#1A2540' }}>
                        <td style={{ padding: '14px 12px', fontWeight: '700' }}>{st.name}</td>
                        <td style={{ padding: '14px 12px', fontWeight: '800', color: st.theta < 0 ? '#DC2626' : '#16A34A' }}>
                          {st.theta >= 0 ? `+${st.theta}` : st.theta}
                        </td>
                        <td style={{ padding: '14px 12px' }}>{st.accuracy}%</td>
                        <td style={{ padding: '14px 12px' }}>{st.quizzesDone} / {st.totalQuizzes}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: '800',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              backgroundColor: isAtRisk ? '#FEE2E2' : '#DCFCE7',
                              color: isAtRisk ? '#991B1B' : '#166534',
                            }}
                          >
                            {isAtRisk ? 'At-Risk' : 'Proficient'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Drill Modal */}
      {modalTarget && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(26, 37, 64, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: '#F2E9DB',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '460px',
              width: '90%',
              border: '3px solid #1A2540',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <h3 style={{ fontSize: '22px', color: '#1A2540', fontWeight: '800', margin: '0 0 12px' }}>
              Assign Adaptive Remedial Module
            </h3>
            <p style={{ fontSize: '14px', color: '#1A2540', marginBottom: '20px' }}>
              Targeting: <strong>{modalTarget.name}</strong>
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#1A2540', marginBottom: '6px' }}>
                SELECT DRILL MODULE
              </label>
              <select
                value={drillTopic}
                onChange={(e) => setDrillTopic(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #1A2540', fontWeight: '700' }}
              >
                <option>Fraction Addition & Subtraction (Adaptive Level 1)</option>
                <option>Denominator Simplification Basics</option>
                <option>Algebraic Factorization Drill</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setModalTarget(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '999px',
                  border: '2px solid #1A2540',
                  backgroundColor: '#FFFFFF',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDrillConfirm}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#CC2B3F',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling Helper Objects
const kpiCardStyle = {
  backgroundColor: '#F2E9DB',
  borderRadius: '20px',
  padding: '20px',
  border: '2.5px solid #1A2540',
};

const kpiLabelStyle = {
  fontSize: '12px',
  fontWeight: '800',
  color: '#1A2540',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const kpiValueStyle = {
  fontSize: '32px',
  fontWeight: '900',
  color: '#1A2540',
  margin: '8px 0 4px',
};

const sectionCardStyle = {
  backgroundColor: '#F2E9DB',
  borderRadius: '24px',
  padding: '28px',
  border: '2.5px solid #1A2540',
  marginBottom: '28px',
};

const metricToggleBtnStyle = (isActive) => ({
  padding: '6px 14px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '12px',
  fontWeight: '800',
  backgroundColor: isActive ? '#1A2540' : 'transparent',
  color: isActive ? '#FFFFFF' : '#1A2540',
  cursor: 'pointer',
});