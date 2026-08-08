import React from 'react';

/**
 * Reusable beautiful empty state component
 * @param {string} icon - emoji icon
 * @param {string} title - main headline
 * @param {string} desc - supporting description
 * @param {React.ReactNode} action - optional CTA button
 */
export default function EmptyState({ icon = '📭', title, desc, action }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      textAlign: 'center',
      gap: 16,
    }}>
      {/* Icon ring */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 24,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        marginBottom: 8,
      }}>
        {icon}
      </div>

      <h3 style={{
        fontSize: '1.15rem',
        fontFamily: 'League Spartan',
        color: '#ffffff',
        fontWeight: 800,
      }}>
        {title}
      </h3>

      {desc && (
        <p style={{
          fontSize: '0.88rem',
          color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.6,
          maxWidth: 380,
        }}>
          {desc}
        </p>
      )}

      {action && (
        <div style={{ marginTop: 8 }}>
          {action}
        </div>
      )}
    </div>
  );
}
