import React from 'react';
import ProofExhibit from '../components/ProofExhibit';
import KissCutStickerBadge from '../components/KissCutStickerBadge';
import EmptyDatedWell from '../components/EmptyDatedWell';
import ArcedInstructorSeal from '../components/ArcedInstructorSeal';
import { Calculator, Compass, Cpu, BookOpen, Layers, Target, Sparkles, Award } from 'lucide-react';

const MODULES = [
  { num: '01', name: 'Fraction Addition', duration: '45m', icon: Calculator, isCrimson: true, hasLiftedCorner: true },
  { num: '02', name: 'Quadratic Equations', duration: '1h 15m', icon: Compass, isCrimson: false },
  { num: '03', name: 'Calculus Derivatives', duration: '1h 30m', icon: Cpu, isCrimson: true },
  { num: '04', name: 'Basic Counting', duration: '30m', icon: BookOpen, isCrimson: false },
  { num: '05', name: 'Pythagorean Theorem', duration: '1h 00m', icon: Layers, isCrimson: true },
  { num: '06', name: 'Matrix Algebra', duration: '1h 45m', icon: Target, isCrimson: false },
  { num: '07', name: 'Probability Theory', duration: '1h 15m', icon: Sparkles, isCrimson: true },
  { num: '08', name: 'Mastery Synthesis', duration: '2h 00m', icon: Award, isCrimson: false }
];

export const LandingPage = ({ onStartQuiz }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', margin: '60px 0 100px' }}>
        <div>
          {/* Crimson Eyebrow */}
          <span style={{ color: '#cc2b3f', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            MAILED PHYSICAL CURRICULUM
          </span>

          {/* Two-Line Navy League Spartan Headline */}
          <h1 style={{ fontSize: '3.6rem', lineHeight: 1.05, margin: '16px 0 24px', letterSpacing: '-0.02em' }}>
            LEARN BY PEELING.<br />MASTERY YOU CAN HOLD.
          </h1>

          {/* Subline */}
          <p style={{ fontSize: '1.15rem', color: '#1A2540', marginBottom: '28px', maxWidth: '480px' }}>
            Every enrolled student receives an authentic physical kiss-cut sticker sheet in the mail. Advance your mastery by peeling modules as you solve adaptive IRT challenges.
          </p>

          {/* Bordered Stat Chip */}
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
            <span>9 H 20 M</span>
            <span>•</span>
            <span>PEEL AS YOU GO</span>
          </div>

          <div style={{ marginTop: '36px' }}>
            <button onClick={onStartQuiz} className="crimson-pill-btn" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
              START ADAPTIVE SESSION
            </button>
          </div>
        </div>

        {/* Right Column: Proof Exhibit */}
        <div>
          <ProofExhibit />
        </div>
      </section>

      {/* 2. THE CURRICULUM AS A FRESH SHEET */}
      <section style={{ margin: '100px 0' }}>
        <div className="cream-sheet-card">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>YOUR SHEET: EIGHT MODULES</h2>
            <p style={{ color: '#1A2540', opacity: 0.8 }}>
              Checkboard kiss-cut die-cut set. Module 01 corner is pre-lifted for your first peel.
            </p>
          </div>

          {/* 4x2 Grid (2-up on mobile) */}
          <div className="curriculum-grid">
            {MODULES.map((m) => (
              <KissCutStickerBadge
                key={m.num}
                num={m.num}
                name={m.name}
                duration={m.duration}
                isCrimson={m.isCrimson}
                Icon={m.icon}
                hasLiftedCorner={m.hasLiftedCorner}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. THREE-STATE MATERIAL LEGEND */}
      <section style={{ margin: '100px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '40px' }}>
          THREE MATERIAL STATES OF A MODULE
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {/* State 1: Intact Sticker */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <KissCutStickerBadge num="02" name="Quadratic Equations" duration="1h 15m" isCrimson={false} Icon={Compass} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Intact Sticker</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>Module ahead.</p>
          </div>

          {/* State 2: Lifted Corner */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <KissCutStickerBadge num="01" name="Fraction Addition" duration="45m" isCrimson={true} Icon={Calculator} hasLiftedCorner={true} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Lifted Corner</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>The module you peel next.</p>
          </div>

          {/* State 3: Empty Well */}
          <div className="cream-sheet-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ maxWidth: '140px', margin: '0 auto 16px' }}>
              <EmptyDatedWell num="01" name="Fraction Addition" peelDate="Oct 02" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Empty Well</h4>
            <p style={{ fontSize: '0.85rem', color: '#1A2540' }}>Module finished. Date recorded.</p>
          </div>
        </div>
      </section>

      {/* 4. INSTRUCTOR SEAL & BIO */}
      <section style={{ margin: '100px 0', display: 'flex', alignItems: 'center', gap: '40px', backgroundColor: '#f2e9db', padding: '40px', borderRadius: '24px' }}>
        <ArcedInstructorSeal size={200} />
        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>DR. ARYA SHARMA</h3>
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
        <button onClick={onStartQuiz} className="crimson-pill-btn" style={{ fontSize: '1.2rem', padding: '18px 42px' }}>
          ENROLL NOW
        </button>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px', color: '#1A2540', opacity: 0.7, fontSize: '0.85rem' }}>
        © 2026 Adaptive Learning Platform • Kiss-Cut Sticker Curriculum System
      </footer>
    </div>
  );
};

export default LandingPage;
