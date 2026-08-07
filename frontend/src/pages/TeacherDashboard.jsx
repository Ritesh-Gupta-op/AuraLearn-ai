import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { io } from 'socket.io-client';
import { AlertTriangle, Send, UserCheck, ShieldAlert } from 'lucide-react';

const MOCK_CLASS_DATA = [
  { attempt: 'Quiz 1', avgTheta: -0.8 },
  { attempt: 'Quiz 2', avgTheta: -0.4 },
  { attempt: 'Quiz 3', avgTheta: -0.1 },
  { attempt: 'Quiz 4', avgTheta: 0.25 },
  { attempt: 'Quiz 5', avgTheta: 0.6 }
];

const MOCK_STUDENTS = [
  { id: 's1', name: 'Rahul Kumar', theta: -0.75, lastActive: '4 days ago', atRisk: true, phone: '+919876543210' },
  { id: 's2', name: 'Priya Sharma', theta: 0.85, lastActive: '2 hours ago', atRisk: false, phone: '+919876543211' },
  { id: 's3', name: 'Anish Verma', theta: -0.62, lastActive: '5 days ago', atRisk: true, phone: '+919876543212' },
  { id: 's4', name: 'Deepa Nair', theta: 0.40, lastActive: '1 day ago', atRisk: false, phone: '+919876543213' }
];

export const TeacherDashboard = () => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Connect to Socket.io backend
    const socket = io('http://localhost:8080');
    socket.emit('join-class', 'class-123');

    socket.on('risk-alert', (riskyData) => {
      console.log('Received real-time risk alerts:', riskyData);
      setAlerts(riskyData);
    });

    return () => socket.disconnect();
  }, []);

  const sendSMSWarning = (studentName, phone) => {
    alert(`[Twilio Webhook Triggered] Sent SMS alert to ${studentName} (${phone}): "Notice: Your theta score is below benchmark (-0.5). Please complete your assigned sticker module today."`);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <span style={{ color: '#cc2b3f', fontWeight: 700, letterSpacing: '0.05em' }}>
            REAL-TIME ANALYTICS & INTERVENTION
          </span>
          <h1 style={{ fontSize: '2.5rem' }}>TEACHER MONITORING DASHBOARD</h1>
        </div>

        <div
          style={{
            backgroundColor: '#1A2540',
            color: '#f2e9db',
            borderRadius: '9999px',
            padding: '10px 24px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <UserCheck size={18} color="#EF9CC0" /> Class 10-A • Math
        </div>
      </div>

      {/* Class Average Theta Progress Chart */}
      <div className="cream-sheet-card" style={{ padding: '30px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Class Average Mastery Progression (θ)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={MOCK_CLASS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3c9d5" />
              <XAxis dataKey="attempt" stroke="#1A2540" />
              <YAxis domain={[-1.5, 1.5]} stroke="#1A2540" />
              <Tooltip />
              <Line type="monotone" dataKey="avgTheta" stroke="#cc2b3f" strokeWidth={3} dot={{ r: 6, fill: '#1A2540' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* At-Risk Students & Interventions Table */}
      <div className="cream-sheet-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <ShieldAlert color="#cc2b3f" size={28} />
          <h3 style={{ fontSize: '1.5rem' }}>At-Risk Student Monitoring (Red Alert Filter)</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #1A2540' }}>
              <th style={{ padding: '12px', fontWeight: 700 }}>STUDENT NAME</th>
              <th style={{ padding: '12px', fontWeight: 700 }}>CURRENT THETA (θ)</th>
              <th style={{ padding: '12px', fontWeight: 700 }}>LAST ACTIVE</th>
              <th style={{ padding: '12px', fontWeight: 700 }}>STATUS</th>
              <th style={{ padding: '12px', fontWeight: 700 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid rgba(26, 37, 64, 0.1)' }}>
                <td style={{ padding: '16px 12px', fontWeight: 600 }}>{s.name}</td>
                <td
                  style={{
                    padding: '16px 12px',
                    fontWeight: 800,
                    color: s.theta < -0.5 ? '#cc2b3f' : '#1A2540'
                  }}
                >
                  {s.theta.toFixed(2)}
                </td>
                <td style={{ padding: '16px 12px' }}>{s.lastActive}</td>
                <td style={{ padding: '16px 12px' }}>
                  {s.atRisk ? (
                    <span
                      style={{
                        backgroundColor: '#cc2b3f',
                        color: '#f2e9db',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <AlertTriangle size={12} /> RED ALERT
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: '#1A2540',
                        color: '#f2e9db',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}
                    >
                      ON TRACK
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 12px' }}>
                  {s.atRisk && (
                    <button
                      onClick={() => sendSMSWarning(s.name, s.phone)}
                      style={{
                        backgroundColor: '#cc2b3f',
                        color: '#f2e9db',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Send size={14} /> Send SMS
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
