import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Activate from './pages/Activate';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

/* -------------------- APP CONTENT -------------------- */
function AppContent() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();

  /* -------------------- AUTH CHECK -------------------- */
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (token && email) {
      const adminStatus = role === 'ADMIN' || role === 'ROLE_ADMIN';

      setUser({
        email,
        name: email.split('@')[0],
        role: role || 'USER'
      });

      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    checkAuth();
  }, [location]);

  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    window.addEventListener('localStorageChanged', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('localStorageChanged', checkAuth);
    };
  }, []);

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    window.dispatchEvent(new Event('localStorageChanged'));
  };

  /* -------------------- ROUTE GUARDS -------------------- */
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const AdminRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="app">
      <Navbar
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register />
          }
        />
        <Route path="/activate" element={<Activate />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

/* -------------------- ROOT APP -------------------- */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

