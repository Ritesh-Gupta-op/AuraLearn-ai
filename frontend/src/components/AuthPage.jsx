import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [role, setRole] = useState('teacher'); // 'teacher' or 'student'
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Form State (Dynamic Input Handling)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    classCode: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (isSigningUp && !formData.fullName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (isSigningUp && role === 'student' && !formData.classCode) {
      setErrorMessage('Please enter a valid Class Join Code.');
      return;
    }

    // Construct Payload for API
    const authPayload = {
      role,
      email: formData.email,
      password: formData.password,
      ...(isSigningUp && { fullName: formData.fullName }),
      ...(isSigningUp && role === 'student' && { classCode: formData.classCode }),
    };

    // Trigger parent success callback or route navigation
    if (onLoginSuccess) {
      onLoginSuccess(authPayload);
    } else {
      alert(`Successfully ${isSigningUp ? 'registered' : 'logged in'} as ${role.toUpperCase()}!`);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F3C9D5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#F2E9DB',
          borderRadius: '28px',
          border: '3px solid #1A2540',
          padding: '36px 28px',
          boxShadow: '0 16px 32px rgba(26,37,64,0.12)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.12em',
              color: '#CC2B3F',
              textTransform: 'uppercase',
            }}
          >
            Kiss-Cut Curriculum
          </span>
          <h1
            style={{
              fontSize: '28px',
              color: '#1A2540',
              fontWeight: '900',
              margin: '6px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            {isSigningUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ fontSize: '14px', color: '#1A2540', opacity: 0.7, margin: '6px 0 0' }}>
            {isSigningUp ? 'Sign up to get started' : 'Please enter your credentials'}
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#E5D6C3',
            borderRadius: '999px',
            padding: '4px',
            marginBottom: '24px',
            border: '1.5px solid #1A2540',
          }}
        >
          <button
            type="button"
            onClick={() => { setRole('teacher'); setErrorMessage(''); }}
            style={roleToggleBtnStyle(role === 'teacher')}
          >
            🍎 Teacher
          </button>
          <button
            type="button"
            onClick={() => { setRole('student'); setErrorMessage(''); }}
            style={roleToggleBtnStyle(role === 'student')}
          >
            🎓 Student
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: '1.5px solid #991B1B',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '20px',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSigningUp && (
            <div>
              <label style={labelStyle}>FULL NAME</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Alex Morgan"
                value={formData.fullName}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              placeholder="name@school.edu"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>PASSWORD</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          {/* Student Specific Join Code Input */}
          {isSigningUp && role === 'student' && (
            <div>
              <label style={labelStyle}>CLASS JOIN CODE</label>
              <input
                type="text"
                name="classCode"
                placeholder="e.g. MATH-10A"
                value={formData.classCode}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#1A2540',
              color: '#FFFFFF',
              padding: '14px',
              borderRadius: '999px',
              fontWeight: '800',
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 6px 16px rgba(26,37,64,0.2)',
              transition: 'transform 0.1s ease',
            }}
          >
            {isSigningUp ? `Register as ${role === 'teacher' ? 'Teacher' : 'Student'}` : 'Sign In'}
          </button>
        </form>

        {/* Auth Mode Switcher */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: '#1A2540', fontWeight: '600', margin: 0 }}>
            {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSigningUp(!isSigningUp);
                setErrorMessage('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#CC2B3F',
                fontWeight: '800',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: '13px',
              }}
            >
              {isSigningUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Styling Helper Objects
const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '800',
  color: '#1A2540',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '2px solid #1A2540',
  backgroundColor: '#FFFFFF',
  fontSize: '14px',
  fontWeight: '600',
  color: '#1A2540',
  outline: 'none',
  boxSizing: 'border-box',
};

const roleToggleBtnStyle = (isActive) => ({
  flex: 1,
  padding: '10px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '13px',
  fontWeight: '800',
  backgroundColor: isActive ? '#1A2540' : 'transparent',
  color: isActive ? '#FFFFFF' : '#1A2540',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
});