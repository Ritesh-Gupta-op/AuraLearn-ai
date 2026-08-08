import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, BarChart2, Video, Brain, Sparkles,
  Users, ClipboardList, Trophy, ArrowRight, Zap
} from 'lucide-react';

const teacherFeatures = [
  { icon: '📝', title: 'Create AI-Assisted Tests', desc: 'Design custom tests with AI-suggested questions tailored to your curriculum.', color: 'rgba(56,189,248,0.12)' },
  { icon: '📊', title: 'Deep Student Analytics', desc: 'Explore per-student performance data, accuracy trends, and at-risk alerts.', color: 'rgba(245,158,11,0.12)' },
  { icon: '🎥', title: 'Conduct Live Classes', desc: 'Generate and share Google Meet links directly from your dashboard.', color: 'rgba(34,197,94,0.12)' },
  { icon: '🎯', title: 'Targeted Interventions', desc: 'Identify struggling students and assign remedial modules with one click.', color: 'rgba(204,43,63,0.12)' },
];

const studentFeatures = [
  { icon: '🤖', title: 'AI-Powered Tutor', desc: 'Search any topic and get a personalized explanation with practice problems.', color: 'rgba(34,197,94,0.12)' },
  { icon: '🎯', title: 'Adaptive Practice', desc: 'Choose Easy, Medium, or Hard — the AI generates questions at your level.', color: 'rgba(56,189,248,0.12)' },
  { icon: '📋', title: 'Take Assigned Tests', desc: 'Complete tests assigned by your teacher and track your progress over time.', color: 'rgba(245,158,11,0.12)' },
  { icon: '🏆', title: 'Progress Tracking', desc: 'See your scores, streaks, and improvement across all subjects.', color: 'rgba(204,43,63,0.12)' },
];

const steps = [
  { num: '01', title: 'Sign in with Google', desc: 'One-click authentication — no passwords needed.' },
  { num: '02', title: 'Choose your role', desc: 'Are you a teacher creating content, or a student ready to learn?' },
  { num: '03', title: 'Start learning or teaching', desc: 'Access your personalised dashboard immediately.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3c9d5', color: '#1A2540' }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
                backgroundColor: 'rgba(204,43,63,0.12)', border: '1px solid #cc2b3f',
                borderRadius: 9999, fontSize: '0.85rem', fontWeight: 800, color: '#cc2b3f',
                textTransform: 'uppercase', marginBottom: 20
              }}>
                <Sparkles size={14} />
                AI-Powered Education Platform
              </div>

              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.05, margin: '16px 0 24px', letterSpacing: '-0.02em', color: '#1A2540', fontWeight: 900 }}>
                LEARN SMARTER.<br />
                <span style={{ color: '#cc2b3f' }}>TEACH BETTER.</span><br />
                TOGETHER.
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#1A2540', marginBottom: 32, maxWidth: 520, lineHeight: 1.6 }}>
                A full-stack adaptive learning platform connecting teachers and students with AI-generated content, real-time analytics, and Google-powered authentication.
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  className="crimson-pill-btn"
                  style={{ fontSize: '1.1rem', padding: '16px 36px', cursor: 'pointer' }}
                  onClick={() => navigate('/auth')}
                >
                  GET STARTED FREE <ArrowRight size={18} />
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  See Features
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div>
              <div className="cream-sheet-card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  {['📊 Analytics', '📝 Create Test', '🤖 AI Tutor'].map((t,i) => (
                    <span key={i} style={{
                      padding: '6px 14px', borderRadius: 9999,
                      backgroundColor: i === 0 ? '#1A2540' : '#ffffff',
                      color: i === 0 ? '#f2e9db' : '#1A2540',
                      border: '1px solid #1A2540',
                      fontSize: '0.8rem', fontWeight: 700
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Students', val: '0', hint: 'Enrolled' },
                    { label: 'Tests', val: '0', hint: 'Created' },
                    { label: 'Avg Score', val: '—', hint: 'Live' },
                  ].map((k,i) => (
                    <div key={i} style={{ backgroundColor: '#ffffff', border: '2px solid #1A2540', borderRadius: 16, padding: 14 }}>
                      <div style={{ fontSize: '0.7rem', color: '#1A2540', fontWeight: 800, textTransform: 'uppercase' }}>{k.label}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#cc2b3f', fontFamily: 'League Spartan' }}>{k.val}</div>
                      <div style={{ fontSize: '0.7rem', color: '#1A2540', opacity: 0.7 }}>{k.hint}</div>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1A2540', borderRadius: 16, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>🤖</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1A2540' }}>AI Tutor</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#1A2540', opacity: 0.85 }}>
                    "Explain any topic clearly and generate practice questions instantly at Easy, Medium, or Hard difficulty."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', borderTop: '2px dashed #1A2540' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              backgroundColor: 'rgba(204,43,63,0.12)', border: '1px solid #cc2b3f',
              borderRadius: 9999, fontSize: '0.85rem', fontWeight: 800, color: '#cc2b3f',
              textTransform: 'uppercase', marginBottom: 16
            }}>
              <Zap size={14} /> Simple Setup
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1A2540', marginBottom: 12 }}>
              UP IN 3 STEPS
            </h2>
            <p style={{ color: '#1A2540', opacity: 0.8, maxWidth: 480, margin: '0 auto' }}>
              No complex onboarding. Sign in with Google and start teaching or learning immediately.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {steps.map((step, i) => (
              <div key={i} className="cream-sheet-card" style={{ padding: 28, position: 'relative' }}>
                <div style={{
                  fontSize: '3.5rem', fontFamily: 'League Spartan', fontWeight: 900,
                  color: 'rgba(26,37,64,0.1)', position: 'absolute', top: 12, right: 16, lineHeight: 1
                }}>{step.num}</div>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  backgroundColor: '#cc2b3f', color: '#f2e9db', border: '2px solid #1A2540',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'League Spartan', fontWeight: 900, fontSize: '1.1rem',
                  marginBottom: 16
                }}>{i + 1}</div>
                <h3 style={{ fontSize: '1.15rem', color: '#1A2540', marginBottom: 8, fontWeight: 800 }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#1A2540', opacity: 0.8, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '80px 0', borderTop: '2px dashed #1A2540' }}>
        <div className="container">

          {/* Teacher features */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#1A2540', color: '#f2e9db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎓</div>
              <span className="badge badge-sky" style={{ fontSize: '0.8rem' }}>For Teachers</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1A2540', marginBottom: 8 }}>
              EVERYTHING YOU NEED TO TEACH EFFECTIVELY
            </h2>
            <p style={{ color: '#1A2540', opacity: 0.8, marginBottom: 32, maxWidth: 560 }}>
              From creating AI-assisted tests to monitoring every student's progress in real time.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {teacherFeatures.map((f, i) => (
                <div key={i} className="cream-sheet-card" style={{ padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', color: '#1A2540', marginBottom: 8, fontWeight: 800 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#1A2540', opacity: 0.8, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student features */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#cc2b3f', color: '#f2e9db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📚</div>
              <span className="badge badge-mint" style={{ fontSize: '0.8rem' }}>For Students</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1A2540', marginBottom: 8 }}>
              LEARN AT YOUR OWN PACE WITH AI
            </h2>
            <p style={{ color: '#1A2540', opacity: 0.8, marginBottom: 32, maxWidth: 560 }}>
              Your personal AI tutor is available 24/7. Ask any topic, practice problems, take tests.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {studentFeatures.map((f, i) => (
                <div key={i} className="cream-sheet-card" style={{ padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', color: '#1A2540', marginBottom: 8, fontWeight: 800 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#1A2540', opacity: 0.8, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#1A2540',
        color: '#f2e9db',
        borderRadius: 24,
        margin: '60px 40px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#f2e9db', marginBottom: 16 }}>
            READY TO TRANSFORM YOUR CLASSROOM?
          </h2>
          <p style={{ color: '#f2e9db', opacity: 0.8, fontSize: '1.1rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Sign in with your Google account and get started in under 60 seconds.
          </p>
          <button
            className="crimson-pill-btn"
            style={{ fontSize: '1.2rem', padding: '18px 42px', cursor: 'pointer' }}
            onClick={() => navigate('/auth')}
          >
            GET STARTED FREE <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 0', textAlign: 'center', color: '#1A2540', opacity: 0.7, fontSize: '0.85rem' }}>
        © 2026 AuraLearn AI • Built with ❤️ + Google Gemini AI
      </footer>
    </div>
  );
}