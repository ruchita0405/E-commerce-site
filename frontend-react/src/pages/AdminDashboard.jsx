import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
      navigate('/');
      return;
    }

    // Fetch admin data here (when you have admin endpoints)
    // For now, showing placeholder data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = () => {
    // Placeholder - replace with actual API call
    setStats({
      totalUsers: 15,
      activeUsers: 12,
      inactiveUsers: 3
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1e293b, #6b21a8, #1e293b)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          🔐 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(to right, #ef4444, #dc2626)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Total Users Card */}
        <div style={{
          padding: '30px',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>Total Users</h3>
          <p style={{ color: '#93c5fd', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {stats.totalUsers}
          </p>
        </div>

        {/* Active Users Card */}
        <div style={{
          padding: '30px',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>Active Users</h3>
          <p style={{ color: '#6ee7b7', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {stats.activeUsers}
          </p>
        </div>

        {/* Inactive Users Card */}
        <div style={{
          padding: '30px',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏸️</div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>Inactive Users</h3>
          <p style={{ color: '#fca5a5', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {stats.inactiveUsers}
          </p>
        </div>
      </div>

      {/* Admin Features */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '30px'
      }}>
        <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>
          Admin Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <button style={{
            padding: '20px',
            background: 'linear-gradient(to right, #a855f7, #ec4899)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            📊 View All Users
          </button>

          <button style={{
            padding: '20px',
            background: 'linear-gradient(to right, #3b82f6, #2563eb)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            📧 Manage Emails
          </button>

          <button style={{
            padding: '20px',
            background: 'linear-gradient(to right, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            🔑 Reset Passwords
          </button>

          <button style={{
            padding: '20px',
            background: 'linear-gradient(to right, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            ⚙️ System Settings
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        marginTop: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '30px'
      }}>
        <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>
          📝 Recent Activity
        </h2>
        <div style={{ color: '#d1d5db' }}>
          <p style={{ padding: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            🟢 New user registered: user@example.com
          </p>
          <p style={{ padding: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            🔵 User activated account: newuser@example.com
          </p>
          <p style={{ padding: '15px' }}>
            🟡 Password reset requested: help@example.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;