import React, { useState } from 'react';
import ProofExhibit from '../components/ProofExhibit';
import KissCutStickerBadge from '../components/KissCutStickerBadge';
import EmptyDatedWell from '../components/EmptyDatedWell';
import ArcedInstructorSeal from '../components/ArcedInstructorSeal';
import { 
  Calculator, Compass, Cpu, BookOpen, Layers, 
  Target, Sparkles, Award, QrCode, CheckCircle2, X 
} from 'lucide-react';

const INITIAL_MODULES = [
  { num: '01', name: 'Fraction Addition', duration: '45m', icon: Calculator, isCrimson: true, hasLiftedCorner: true, question: 'What is 1/4 + 2/4?', options: ['3/4', '1/2', '3/8', '2/4'], answer: '3/4' },
  { num: '02', name: 'Quadratic Equations', duration: '1h 15m', icon: Compass, isCrimson: false, question: 'Roots of x² - 5x + 6 = 0?', options: ['x = 2, 3', 'x = -2, -3', 'x = 1, 6', 'x = 0, 5'], answer: 'x = 2, 3' },
  { num: '03', name: 'Calculus Derivatives', duration: '1h 30m', icon: Cpu, isCrimson: true, question: 'What is d/dx (x³)?', options: ['3x²', 'x²', '3x', 'x³/3'], answer: '3x²' },
  { num: '04', name: 'Basic Counting', duration: '30m', icon: BookOpen, isCrimson: false, question: 'Evaluate 5!', options: ['120', '60', '20', '24'], answer: '120' },
  { num: '05', name: 'Pythagorean Theorem', duration: '1h 00m', icon: Layers, isCrimson: true, question: 'In a right triangle with legs 3 & 4, hypotenuse is:', options: ['5', '6', '7', '25'], answer: '5' },
  { num: '06', name: 'Matrix Algebra', duration: '1h 45m', icon: Target, isCrimson: false, question: 'Determinant of 2x2 Identity Matrix?', options: ['1', '0', '2', '-1'], answer: '1' },
  { num: '07', name: 'Probability Theory', duration: '1h 15m', icon: Sparkles, isCrimson: true, question: 'Probability of rolling a 6 on a fair die?', options: ['1/6', '1/2', '1/3', '5/6'], answer: '1/6' },
  { num: '08', name: 'Mastery Synthesis', duration: '2h 00m', icon: Award, isCrimson: false, question: 'Final Synthesis Challenge unlocked upon full completion.', options: ['Start Synthesis', 'Review All', 'Practice', 'Exit'], answer: 'Start Synthesis' }
];

export const LandingPage = ({ onStartQuiz }) => {
  // Functional State
  const [completedModules, setCompletedModules] = useState(['01']); // Module 01 pre-peeled
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [kitCode, setKitCode] = useState('');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null);

  // Handle module click (opens quick interactive quiz)
  const handleStickerClick = (mod) => {
    setSelectedModule(mod);
    setQuizAnswer(null);
    setQuizStatus(null);
  };

  // Submit Answer & Peel Module
  const handleAnswerSubmit = () => {
    if (quizAnswer === selectedModule.answer) {
      setQuizStatus('correct');
      setTimeout(() => {
        if (!completedModules.includes(selectedModule.num)) {
          setCompletedModules([...completedModules, selectedModule.num]);
        }
        setSelectedModule(null);
      }, 1200);
    } else {
      setQuizStatus('incorrect');
    }
  };

  // Sync Physical Sheet
  const handleVerifyKit = (e) => {
    e.preventDefault();
    if (kitCode.trim()) {
      alert(`Physical Sheet #${kitCode.toUpperCase()} successfully linked to your profile!`);
      setShowQRModal(false);
      setKitCode('');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', fontFamily: 'sans-serif' }}>
      
      {/* TOP UTILITY BAR */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => setShowQRModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1A2540',
            color: '#f2e9db',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <QrCode size={16} /> SYNC PHYSICAL KIT
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', margin: '40px 0 100px' }}>
        <div>
          <span style={{ color: '#cc2b3f', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            MAILED PHYSICAL CURRICULUM
          </span>

          <h1 style={{ fontSize: '3.6rem', lineHeight: 1.05, margin: '16px 0 24px', letterSpacing: '-0.02em', color: '#1A2540' }}>
            LEARN BY PEELING.<br />MASTERY YOU CAN HOLD.
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#1A2540', marginBottom: '28px', maxWidth: '480px' }}>
            Every enrolled student receives an authentic physical kiss-cut sticker sheet in the mail. Advance your mastery by peeling modules as you solve adaptive IRT challenges.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              border: '2px dashed #1A2540',
              borderRadius: '9999px',
              padding: '10px 24px',
              backgroundColor: '#f2e9db',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            <span>8 MODULES</span>
            <span>•</span>
            <span>{completedModules.length} / 8 PEELED</span>
            <span>•</span>
            <span>PEEL AS YOU GO</span>
          </div>

          <div style={{ marginTop: '36px' }}>
            <button onClick={onStartQuiz} className="crimson-pill-btn" style={{ fontSize: '1.1rem', padding: '16px 36px', cursor: 'pointer' }}>
              START ADAPTIVE SESSION
            </button>
          </div>
        </div>

        {/* Right Column: Proof Exhibit */}
        <div>
          <ProofExhibit completedCount={completedModules.length} />
        </div>
      </section>

      {/* 2. THE CURRICULUM AS A FRESH SHEET (INTERACTIVE GRID) */}
      <section style={{ margin: '100px 0' }}>
        <div className="cream-sheet-card" style={{ padding: '40px', borderRadius: '24px', backgroundColor: '#f2e9db' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#1A2540' }}>YOUR SHEET: EIGHT MODULES</h2>
            <p style={{ color: '#1A2540', opacity: 0.8 }}>
              Click any module to preview its adaptive challenge and peel the sticker.
            </p>
          </div>

          {/* 4x2 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {INITIAL_MODULES.map((m) => {
              const isPeeled = completedModules.includes(m.num);
              return (
                <div 
                  key={m.num} 
                  onClick={() => handleStickerClick(m)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                >
                  {isPeeled ? (
                    <EmptyDatedWell num={m.num} name={m.name} peelDate="Peeled" />
                  ) : (
                    <KissCutStickerBadge
                      num={m.num}
                      name={m.name}
                      duration={m.duration}
                      isCrimson={m.isCrimson}
                      Icon={m.icon}
                      hasLiftedCorner={m.hasLiftedCorner || m.num === '02'}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THREE-STATE MATERIAL LEGEND */}
      <section style={{ margin: '100px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '40px', color: '#1A2540' }}>
          THREE MATERIAL STATES OF A MODULE
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {/* State 1: Intact Sticker */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f2e9db', borderRadius: '16px' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <KissCutStickerBadge num="02" name="Quadratic Equations" duration="1h 15m" isCrimson={false} Icon={Compass} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#1A2540' }}>Intact Sticker</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>Module ahead.</p>
          </div>

          {/* State 2: Lifted Corner */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f2e9db', borderRadius: '16px' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <KissCutStickerBadge num="01" name="Fraction Addition" duration="45m" isCrimson={true} Icon={Calculator} hasLiftedCorner={true} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#1A2540' }}>Lifted Corner</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>The module you peel next.</p>
          </div>

          {/* State 3: Empty Well */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f2e9db', borderRadius: '16px' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <EmptyDatedWell num="01" name="Fraction Addition" peelDate="Oct 02" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#1A2540' }}>Empty Well</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>Module finished. Date recorded.</p>
          </div>
        </div>
      </section>

      {/* 4. INSTRUCTOR SEAL & BIO */}
      <section style={{ margin: '100px 0', display: 'flex', alignItems: 'center', gap: '40px', backgroundColor: '#f2e9db', padding: '40px', borderRadius: '24px' }}>
        <ArcedInstructorSeal size={200} />
        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#1A2540' }}>DR. ARYA SHARMA</h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#1A2540' }}>
            Pioneer in psychometrics and Item Response Theory (2PL models). Dr. Sharma designed the physical kiss-cut tactile learning method to pair cognitive feedback loops with micro-learning achievements. Every mailed sheet comes certified with her seal of mastery.
          </p>
        </div>
      </section>

      {/* 5. NAVY ENROLL BAND */}
      <section
        style={{
          backgroundColor: '#1A2540',
          color: '#f2e9db',
          padding: '60px 40px',
          borderRadius: '24px',
          borderTop: '8px solid #cc2b3f',
          textAlign: 'center',
          margin: '80px 0'
        }}
      >
        <h2 style={{ color: '#f2e9db', fontSize: '2.8rem', marginBottom: '16px' }}>READY TO START YOUR SHEET?</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
          Lifetime access to 8 adaptive modules (9 h 20 m total duration).
        </p>
        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '32px' }}>
          Your physical kiss-cut sticker sheet will be mailed immediately upon enrollment.
        </p>
        <button onClick={onStartQuiz} className="crimson-pill-btn" style={{ fontSize: '1.2rem', padding: '18px 42px', cursor: 'pointer' }}>
          ENROLL NOW
        </button>
      </section>

      {/* MODAL 1: INTERACTIVE QUIZ PREVIEW */}
      {selectedModule && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', itemsCenter: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFDF6', borderRadius: '24px', border: '4px solid #1A2540', padding: '32px', maxWidth: '480px', width: '100%', position: 'relative' }}>
            <button onClick={() => setSelectedModule(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={24} color="#1A2540" />
            </button>

            <span style={{ color: '#cc2b3f', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              MODULE {selectedModule.num} • ADAPTIVE CHALLENGE
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#1A2540', margin: '8px 0 16px' }}>{selectedModule.name}</h3>
            
            <p style={{ fontWeight: 600, marginBottom: '20px', color: '#1A2540' }}>{selectedModule.question}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {selectedModule.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(opt)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #1A2540',
                    backgroundColor: quizAnswer === opt ? '#ffe066' : '#fff',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizStatus === 'correct' && (
              <div style={{ color: '#2e7d32', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} /> Correct! Peeling sticker...
              </div>
            )}

            {quizStatus === 'incorrect' && (
              <div style={{ color: '#c62828', fontWeight: 700, marginBottom: '16px' }}>
                Incorrect option. Try again!
              </div>
            )}

            <button
              onClick={handleAnswerSubmit}
              disabled={!quizAnswer}
              style={{
                width: '100%',
                backgroundColor: '#cc2b3f',
                color: '#fff',
                border: '2px solid #1A2540',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                opacity: quizAnswer ? 1 : 0.5
              }}
            >
              SUBMIT & PEEL STICKER
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: PHYSICAL KIT VERIFIER */}
      {showQRModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', itemsCenter: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFDF6', borderRadius: '24px', border: '4px solid #1A2540', padding: '32px', maxWidth: '440px', width: '100%', position: 'relative' }}>
            <button onClick={() => setShowQRModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={24} color="#1A2540" />
            </button>

            <h3 style={{ fontSize: '1.5rem', color: '#1A2540', marginBottom: '8px' }}>Sync Physical Sheet</h3>
            <p style={{ fontSize: '0.9rem', color: '#1A2540', opacity: 0.8, marginBottom: '20px' }}>
              Enter the unique 8-character ID printed on the back of your mailed kiss-cut sticker sheet.
            </p>

            <form onSubmit={handleVerifyKit}>
              <input
                type="text"
                placeholder="e.g. KC-9842-X"
                value={kitCode}
                onChange={(e) => setKitCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid #1A2540',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#1A2540',
                  color: '#f2e9db',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                VERIFY & LINK SHEET
              </button>
            </form>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', padding: '30px', color: '#1A2540', opacity: 0.7, fontSize: '0.85rem' }}>
        © 2026 Adaptive Learning Platform • Kiss-Cut Sticker Curriculum System
      </footer>
    </div>
  );
};

export default LandingPage;