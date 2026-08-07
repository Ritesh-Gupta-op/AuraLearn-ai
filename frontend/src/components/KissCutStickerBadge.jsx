import React from 'react';

/**
 * Special UI Component: Kiss-Cut Sticker Badge (Two-tone set)
 * Crimson filled (cream print) vs Cream tint (crimson print + 2px crimson ring)
 */
export const KissCutStickerBadge = ({
  num = '01',
  name = 'Fraction Addition',
  duration = '45m',
  isCrimson = true,
  Icon,
  hasLiftedCorner = false
}) => {
  return (
    <div className="sticker-die-cut" style={{ width: '100%' }}>
      <div className={`sticker-badge ${isCrimson ? 'sticker-crimson' : 'sticker-cream'}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="sticker-num" style={{ fontFamily: 'League Spartan', fontSize: '1.8rem', fontWeight: 800 }}>
            {num}
          </span>
          {Icon && <Icon className="sticker-icon" size={24} />}
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', lineHeight: 1.2 }}>{name}</h4>
          <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{duration}</span>
        </div>

        {hasLiftedCorner && (
          <>
            <div className="lifted-fold" />
            <div className="peel-hatch-shadow" />
          </>
        )}
      </div>
    </div>
  );
};

export default KissCutStickerBadge;
