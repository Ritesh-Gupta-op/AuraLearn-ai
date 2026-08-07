import React from 'react';

/**
 * Special UI Component: Empty Dated Well
 * Completion state rendered as the sticker's ABSENCE: dashed blossom pink die-cut ring,
 * faint pink silhouette tint, printed numeral, module name, and 'Peeled [date]' timestamp.
 */
export const EmptyDatedWell = ({ num, name, peelDate }) => {
  return (
    <div className="sticker-die-cut" style={{ width: '100%', borderColor: '#EF9CC0' }}>
      <div className="empty-well">
        <span className="well-num">{num}</span>
        <div style={{ margin: '8px 0' }}>
          <div className="well-name">{name}</div>
          <div className="well-peeled">Peeled {peelDate}</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyDatedWell;
