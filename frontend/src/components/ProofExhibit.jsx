import React from 'react';
import EmptyDatedWell from './EmptyDatedWell';
import { BookOpen, Calculator, Compass, Cpu, Layers, Sparkles, Award, Target } from 'lucide-react';

const MODULES = [
  { num: '01', name: 'Fraction Addition', date: 'Oct 02', icon: Calculator, isCrimson: true },
  { num: '02', name: 'Quadratic Equations', date: 'Oct 09', icon: Compass, isCrimson: false },
  { num: '03', name: 'Calculus Derivatives', date: 'Oct 16', icon: Cpu, isCrimson: true },
  { num: '04', name: 'Basic Counting', date: 'Oct 23', icon: BookOpen, isCrimson: false },
  { num: '05', name: 'Pythagorean Theorem', date: 'Oct 30', icon: Layers, isCrimson: true },
  { num: '06', name: 'Matrix Algebra', date: 'Nov 06', icon: Target, isCrimson: false },
  { num: '07', name: 'Probability Theory', date: 'Nov 13', icon: Sparkles, isCrimson: true },
  { num: '08', name: 'Mastery Synthesis', date: 'Nov 20', icon: Award, isCrimson: false }
];

export const ProofExhibit = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      {/* 1. Finished Backing Sheet Card */}
      <div
        className="cream-sheet-card"
        style={{
          transform: 'rotate(-2deg)',
          padding: '24px',
          border: '2px solid rgba(26, 37, 64, 0.1)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {MODULES.map((m) => (
            <EmptyDatedWell key={m.num} num={m.num} name={m.name} peelDate={m.date} />
          ))}
        </div>
      </div>

      {/* 2. Navy Laptop Lid Overlapping Sheet carrying 8 Peeled Stickers */}
      <div
        style={{
          position: 'relative',
          marginTop: '-180px',
          marginLeft: '40px',
          backgroundColor: '#1A2540',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(26, 37, 64, 0.3)',
          border: '3px solid #f2e9db'
        }}
      >
        <div style={{ textAlign: 'center', color: '#f2e9db', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
          STUDENT LAPTOP LID • 8 PEELED STICKERS
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {MODULES.map((m, idx) => {
            const Icon = m.icon;
            const rotations = [-4, 5, -3, 4, 3, -5, 4, -2];
            return (
              <div
                key={m.num}
                style={{
                  transform: `rotate(${rotations[idx]}deg)`,
                  backgroundColor: m.isCrimson ? '#cc2b3f' : '#f2e9db',
                  color: m.isCrimson ? '#f2e9db' : '#cc2b3f',
                  borderRadius: '12px',
                  padding: '10px',
                  border: m.isCrimson ? 'none' : '2px solid #cc2b3f',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'League Spartan', fontWeight: 800 }}>{m.num}</span>
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, lineHeight: 1.1 }}>{m.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ fontStyle: 'italic', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px', color: '#1A2540' }}>
        * Checkable claim: Every sticker missing from the finished sheet is accounted for on the laptop lid.
      </p>
    </div>
  );
};

export default ProofExhibit;
