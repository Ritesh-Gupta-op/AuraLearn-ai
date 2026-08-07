import React from 'react';
import { Award } from 'lucide-react';

/**
 * Special UI Component: Arced-text instructor seal
 * Crimson circle with dashed cream inner ring, instructor name along top arc,
 * course specialty along bottom arc via SVG textPath, centered line icon.
 */
export const ArcedInstructorSeal = ({
  size = 180,
  topText = "DR. ARYA SHARMA • MASTER INSTRUCTOR",
  bottomText = "ADAPTIVE COGNITIVE SCIENCE"
}) => {
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          {/* Top Arc Path (sweeps clockwise along top) */}
          <path id="topArcPath" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
          {/* Bottom Arc Path (sweeps clockwise left-to-right through bottom so text reads upright) */}
          <path id="bottomArcPath" d="M 175,100 A 75,75 0 0,1 25,100" fill="none" />
        </defs>

        {/* Outer Crimson Seal Circle */}
        <circle cx="100" cy="100" r="95" fill="#cc2b3f" />

        {/* Dashed Cream Inner Ring */}
        <circle cx="100" cy="100" r="78" fill="none" stroke="#f2e9db" strokeWidth="2" strokeDasharray="6 4" />

        {/* Top TextPath */}
        <text fill="#f2e9db" fontSize="10" fontWeight="700" letterSpacing="1.2">
          <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
            {topText}
          </textPath>
        </text>

        {/* Bottom TextPath */}
        <text fill="#f2e9db" fontSize="9" fontWeight="700" letterSpacing="1.2">
          <textPath href="#bottomArcPath" startOffset="50%" textAnchor="middle">
            {bottomText}
          </textPath>
        </text>

        {/* Centered Line Icon */}
        <g transform="translate(86, 86)">
          <Award color="#f2e9db" size={28} />
        </g>
      </svg>
    </div>
  );
};

export default ArcedInstructorSeal;
