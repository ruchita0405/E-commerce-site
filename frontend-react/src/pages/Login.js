import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('🔵 Login attempt for:', email);

            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Login successful, response:', data);

                const token = data.bearer || data.token;

                // CRITICAL: Store token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);

                if (data['refresh-token']) {
                    localStorage.setItem('refreshToken', data['refresh-token']);
                }

                // Decode JWT to extract role
                try {
                    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                    console.log('🔵 JWT Payload:', tokenPayload);

                    // Extract role from JWT
                    let userRole = 'USER'; // default

                    if (tokenPayload.role) {
                        userRole = tokenPayload.role;
                    } else if (tokenPayload.authorities) {
                        userRole = Array.isArray(tokenPayload.authorities)
                            ? tokenPayload.authorities[0]
                            : tokenPayload.authorities;
                    } else if (tokenPayload.roles) {
                        userRole = Array.isArray(tokenPayload.roles)
                            ? tokenPayload.roles[0]
                            : tokenPayload.roles;
                    }

                    // CRITICAL: Store role in localStorage
                    console.log('🔵 Extracted role:', userRole);
                    localStorage.setItem('role', userRole);

                    showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');

                    // Redirect based on role
                    setTimeout(() => {
                        if (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN') {
                            console.log('✅ Admin user, redirecting to /admin');
                            navigate('/admin');
                        } else {
                            console.log('✅ Regular user, redirecting to /products');
                            navigate('/products');
                        }
                    }, 1000);

                } catch (decodeError) {
                    console.error('❌ Error decoding JWT:', decodeError);
                    localStorage.setItem('role', 'USER');
                    showToast('Login successful!', 'success');
                    setTimeout(() => navigate('/products'), 1000);
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                showToast(errorData.message || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            showToast('Network error. Please check if backend is running.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;