import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

// ── Protected Route ───────────────────────────────────────────────────────────
function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/auth" replace />;

  // If user is logged in but role not set yet, send to auth to set role
  if (!userProfile) return <Navigate to="/auth" replace />;

  // Role-guard: teacher can't access student routes and vice versa
  if (requiredRole && userProfile.role !== requiredRole) {
    return <Navigate to={userProfile.role === 'teacher' ? '/teacher' : '/student'} replace />;
  }

  return children;
}

// ── Root Redirect (based on auth & role) ─────────────────────────────────────
function RootRedirect() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (currentUser && userProfile) {
    return <Navigate to={userProfile.role === 'teacher' ? '/teacher' : '/student'} replace />;
  }

  return <LandingPage />;
}

// ── Main App ──────────────────────────────────────────────────────────────────
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
