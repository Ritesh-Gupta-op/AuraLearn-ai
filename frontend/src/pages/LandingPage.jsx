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
    <div style={{ minHeight: '100vh', background: 'var(--grad-hero)' }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div className="hero-eyebrow">
                <Sparkles size={12} />
                AI-Powered Education Platform
              </div>

              <h1 className="hero-h1">
                Learn Smarter.<br />
                <span>Teach Better.</span><br />
                Together.
              </h1>

              <p className="hero-sub">
                A full-stack adaptive learning platform connecting teachers and students
                with AI-generated content, real-time analytics, and Google-powered authentication.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/auth')}
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  See Features
                </button>
              </div>

              {/* Social proof mini */}
              <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex' }}>
                  {['👨‍🏫','👩‍🎓','👨‍🎓','👩‍🏫'].map((e,i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: `hsl(${i*60},60%,45%)`,
                      border: '2px solid #0d1526',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, marginLeft: i > 0 ? -10 : 0
                    }}>{e}</div>
                  ))}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                  Join teachers & students already on the platform
                </p>
              </div>
            </div>

            {/* Right — Floating dashboard preview */}
            <div style={{ position: 'relative' }}>
              <div className="animate-float" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24 }}>
                {/* Mini dashboard mockup */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  {['📊 Analytics', '📝 Create Test', '🤖 AI Tutor'].map((t,i) => (
                    <span key={i} style={{
                      padding: '5px 12px', borderRadius: 99,
                      background: i === 0 ? 'rgba(204,43,63,0.3)' : 'rgba(255,255,255,0.06)',
                      fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)'
                    }}>{t}</span>
                  ))}
                </div>
                {/* KPI row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'Students', val: '—', hint: 'Awaiting enrollment' },
                    { label: 'Tests', val: '—', hint: 'Create your first' },
                    { label: 'Avg Score', val: '—', hint: 'No data yet' },
                  ].map((k,i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 14 }}>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k.label}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', fontFamily: 'League Spartan' }}>{k.val}</div>
                      <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{k.hint}</div>
                    </div>
                  ))}
                </div>
                {/* AI Tutor preview */}
                <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 14, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>🤖</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7dd3fc' }}>AI Tutor</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                    "Explain the Pythagorean theorem with practice problems at medium difficulty…"
                  </p>
                  <div style={{ marginTop: 8, fontSize: '0.72rem', color: 'rgba(56,189,248,0.7)' }}>
                    ✦ Powered by Google Gemini
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: -20, right: -16,
                background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4ade80' }}>Live & Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="hero-eyebrow" style={{ margin: '0 auto 16px' }}>
              <Zap size={12} /> Simple Setup
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
              Up in 3 Steps
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
              No complex onboarding. Sign in with Google and start teaching or learning immediately.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {steps.map((step, i) => (
              <div key={i} className="feature-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  fontSize: '4rem', fontFamily: 'League Spartan', fontWeight: 900,
                  color: 'rgba(255,255,255,0.04)', position: 'absolute', top: 12, right: 16, lineHeight: 1
                }}>{step.num}</div>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--grad-crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'League Spartan', fontWeight: 900, fontSize: '1.1rem', color: '#fff',
                  marginBottom: 16, boxShadow: 'var(--shadow-glow-crimson)'
                }}>{i + 1}</div>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">

          {/* Teacher features */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎓</div>
              <span className="badge badge-sky" style={{ fontSize: '0.78rem' }}>For Teachers</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
              Everything you need to teach effectively
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 40, maxWidth: 560 }}>
              From creating AI-assisted tests to monitoring every student's progress in real time.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {teacherFeatures.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student features */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📚</div>
              <span className="badge badge-mint" style={{ fontSize: '0.78rem' }}>For Students</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
              Learn at your own pace with AI
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 40, maxWidth: 560 }}>
              Your personal AI tutor is available 24/7. Ask any topic, practice problems, take tests.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {studentFeatures.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(135deg, rgba(204,43,63,0.12) 0%, rgba(45,26,64,0.3) 100%)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>
            <Sparkles size={12} /> 100% Free to Start
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            Ready to transform your classroom?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            Sign in with your Google account and get started in under 60 seconds.
          </p>
          <button
            className="btn btn-primary btn-lg animate-pulse-glow"
            onClick={() => navigate('/auth')}
          >
            Get Started — It's Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)' }}>
          © 2026 EduAI Platform • Built with ❤️ + Google Gemini AI
        </p>
      </footer>
    </div>
  );
}