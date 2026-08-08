import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { currentUser, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isLanding = location.pathname === '/';
  const isAuth    = location.pathname === '/auth';

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setSigningOut(false);
    }
  };

  const avatarInitial = userProfile?.displayName?.[0]?.toUpperCase() || '?';

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo" onClick={() => navigate('/')}>
        <div className="nav-logo-mark">E</div>
        <span className="nav-logo-text">EduAI</span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Unauthenticated: landing or auth page */}
        {!currentUser && isLanding && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/auth')}
          >
            Get Started →
          </button>
        )}

        {/* Authenticated user */}
        {currentUser && userProfile && (
          <>
            {/* Role badge */}
            <span className={`badge ${userProfile.role === 'teacher' ? 'badge-sky' : 'badge-mint'}`}>
              {userProfile.role === 'teacher' ? '🎓 Teacher' : '📚 Student'}
            </span>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={userProfile.displayName}
                  className="nav-avatar"
                />
              ) : (
                <div className="nav-avatar-placeholder">{avatarInitial}</div>
              )}
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userProfile.displayName?.split(' ')[0]}
              </span>
            </div>

            {/* Sign out */}
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleSignOut}
              disabled={signingOut}
              style={{ gap: 6 }}
            >
              <LogOut size={14} />
              {signingOut ? 'Signing out…' : 'Sign Out'}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
