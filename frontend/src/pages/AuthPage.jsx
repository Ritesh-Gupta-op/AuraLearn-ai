import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, ArrowRight, Loader } from 'lucide-react';

// Google logo SVG inline
const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function AuthPage() {
  const { currentUser, userProfile, loading, isFirebaseConfigured, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null); // 'teacher' | 'student'
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && currentUser && userProfile) {
      navigate(userProfile.role === 'teacher' ? '/teacher' : '/student', { replace: true });
    }
  }, [currentUser, userProfile, loading, navigate]);

  const handleGoogleSignIn = async () => {
    if (!selectedRole) {
      setError('Please choose whether you are a Teacher or Student first.');
      return;
    }
    setError('');
    setSigningIn(true);
    try {
      const user = await signInWithGoogle(selectedRole);
      // navigation happens via useEffect above once profile is set
    } catch (err) {
      console.error('Sign-in error detail:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.message?.includes('not configured')) {
        setError(err.message);
      } else {
        setError(`Sign-in error (${err.code || 'unknown'}): ${err.message || 'Please try again.'}`);
      }
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f3c9d5',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60,
            borderRadius: 16,
            backgroundColor: '#cc2b3f',
            color: '#f2e9db',
            border: '2px dashed #1A2540',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 28,
          }}>
            🎓
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#1A2540', marginBottom: 8, fontWeight: 900 }}>WELCOME TO EDUAI</h1>
          <p style={{ color: '#1A2540', opacity: 0.8, fontSize: '0.95rem' }}>
            Sign in with Google to access your personalized dashboard
          </p>
        </div>

        {/* Firebase not configured banner */}
        {!isFirebaseConfigured && (
          <div className="setup-banner" style={{ marginBottom: 24, backgroundColor: '#fef3c7', border: '2px solid #1A2540' }}>
            <AlertTriangle size={24} color="#92400e" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ marginBottom: 4, fontWeight: 800, color: '#92400e' }}>Firebase not configured yet</p>
              <p style={{ color: '#1A2540', fontSize: '0.85rem' }}>
                Copy <code>frontend/.env.example</code> → <code>frontend/.env</code> and fill in your Firebase credentials.
              </p>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="cream-sheet-card" style={{ padding: '36px 32px' }}>

          {/* Step 1: Role selector */}
          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontSize: '0.75rem', fontWeight: 800, color: '#1A2540',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12
            }}>
              Step 1 — I am a…
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

              {/* Teacher card */}
              <div
                className={`role-card teacher ${selectedRole === 'teacher' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('teacher')}
                role="button"
                aria-pressed={selectedRole === 'teacher'}
                id="role-teacher"
              >
                <div className="role-icon teacher">🎓</div>
                <div style={{ fontFamily: 'League Spartan', fontSize: '1.1rem', fontWeight: 800, color: '#1A2540', marginBottom: 4 }}>Teacher</div>
                <p style={{ fontSize: '0.78rem', color: '#1A2540', opacity: 0.8, lineHeight: 1.4 }}>
                  Create tests, track students, conduct classes
                </p>
                {selectedRole === 'teacher' && (
                  <div style={{ marginTop: 12 }}>
                    <span className="badge badge-navy">✓ Selected</span>
                  </div>
                )}
              </div>

              {/* Student card */}
              <div
                className={`role-card student ${selectedRole === 'student' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('student')}
                role="button"
                aria-pressed={selectedRole === 'student'}
                id="role-student"
              >
                <div className="role-icon student">📚</div>
                <div style={{ fontFamily: 'League Spartan', fontSize: '1.1rem', fontWeight: 800, color: '#1A2540', marginBottom: 4 }}>Student</div>
                <p style={{ fontSize: '0.78rem', color: '#1A2540', opacity: 0.8, lineHeight: 1.4 }}>
                  Take tests, use AI tutor, track progress
                </p>
                {selectedRole === 'student' && (
                  <div style={{ marginTop: 12 }}>
                    <span className="badge badge-navy">✓ Selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 28 }} />

          {/* Step 2: Google Sign-In */}
          <div>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16
            }}>
              Step 2 — Continue with Google
            </p>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 16,
                color: '#f87171', fontSize: '0.85rem', display: 'flex', gap: 8, alignItems: 'flex-start'
              }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-google-signin"
              className="btn btn-google"
              style={{ width: '100%', justifyContent: 'center', gap: 12 }}
              onClick={handleGoogleSignIn}
              disabled={signingIn || !isFirebaseConfigured}
            >
              {signingIn ? (
                <>
                  <div className="spinner spinner-sm" style={{ borderTopColor: '#cc2b3f' }} />
                  Signing in…
                </>
              ) : (
                <>
                  <GoogleLogo />
                  Continue with Google
                </>
              )}
            </button>

            {!selectedRole && (
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>
                ↑ Select your role first
              </p>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: 24 }}>
          By signing in you agree to our Terms of Service and Privacy Policy.
          <br />Your role (teacher/student) is saved to your account on first sign-in.
        </p>
      </div>
    </div>
  );
}
