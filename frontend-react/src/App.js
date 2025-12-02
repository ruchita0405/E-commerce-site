import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check for authentication on app load
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');

        if (token && email) {
            setUser({
                email: email,
                name: email.split('@')[0],
                role: role || 'USER'
            });
            setIsAuthenticated(true);
            setIsAdmin(role === 'ADMIN' || role === 'ROLE_ADMIN');
            console.log('🔵 User authenticated on load:', { email, role });
        }
    }, []);

    const handleLogout = () => {
        console.log('🔵 Logging out user');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    // Re-check authentication when localStorage changes (after login)
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const role = localStorage.getItem('role');

            if (token && email) {
                setUser({
                    email: email,
                    name: email.split('@')[0],
                    role: role || 'USER'
                });
                setIsAuthenticated(true);
                setIsAdmin(role === 'ADMIN' || role === 'ROLE_ADMIN');
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
        };

        // Listen for storage changes
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <Router>
            <div className="app">
                <Navbar
                    isAuthenticated={isAuthenticated}
                    isAdmin={isAdmin}
                    user={user}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />

                    <Route
                        path="/products"
                        element={
                            isAuthenticated ?
                            <Products isAuthenticated={isAuthenticated} /> :
                            <Navigate to="/login" />
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            isAuthenticated ?
                            <Navigate to="/" /> :
                            <Login />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            isAuthenticated ?
                            <Navigate to="/" /> :
                            <Register />
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            isAuthenticated && isAdmin ?
                            <AdminDashboard onLogout={handleLogout} /> :
                            isAuthenticated ?
                            <Navigate to="/" /> :
                            <Navigate to="/login" />
                        }
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;