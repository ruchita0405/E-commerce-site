import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { getAllUsers, deleteUser, activateUser } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0,
        admins: 0
    });

    const navigate = useNavigate();

    /* -------------------- AUTH + INITIAL LOAD -------------------- */
    useEffect(() => {
        const role = localStorage.getItem('role');
        const email = localStorage.getItem('email');

        console.log('🔍 Admin Dashboard auth:', { role, email });

        // Uncomment later for security
        // if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
        //     showToast('Access denied. Admin only!', 'error');
        //     setTimeout(() => navigate('/'), 2000);
        //     return;
        // }

        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- SEARCH FILTER -------------------- */
    useEffect(() => {
        filterUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, users]);

    /* -------------------- HELPERS -------------------- */
    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const calculateStats = (userList) => {
        setStats({
            total: userList.length,
            active: userList.filter(u => u.isActif || u.actif).length,
            pending: userList.filter(u => !(u.isActif || u.actif)).length,
            admins: userList.filter(u => u.role?.roleType === 'ADMIN').length
        });
    };

    const filterUsers = () => {
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user =>
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filtered);
    };

    /* -------------------- API CALLS -------------------- */
    const loadUsers = async () => {
        setLoading(true);
        try {
            console.log('📡 Fetching users...');
            const data = await getAllUsers();
            console.log('✅ Users loaded:', data);
            setUsers(data);
            calculateStats(data);
        } catch (error) {
            console.error('❌ Error loading users:', error);
            showToast('Failed to load users. Backend may not be running.', 'error');
            setUsers([]);
            setStats({ total: 0, active: 0, pending: 0, admins: 0 });
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async (userId) => {
        try {
            await activateUser(userId);
            showToast('User activated successfully', 'success');
            loadUsers();
        } catch (error) {
            console.error('Error activating user:', error);
            showToast('Failed to activate user', 'error');
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(userId);
            showToast('User deleted successfully', 'success');
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('Failed to delete user', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    /* -------------------- LOADING -------------------- */
    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-spinner">
                    <div className="spinner-large"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    /* -------------------- UI -------------------- */
    return (
        <div className="admin-container">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1><i className="fas fa-shield-halved"></i> Admin Dashboard</h1>
                    <p>Manage users and system settings</p>
                    <small style={{ color: '#6ee7b7' }}>
                        {localStorage.getItem('email')} | {localStorage.getItem('role')}
                    </small>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={loadUsers} className="btn-refresh">
                        <i className="fas fa-sync-alt"></i> Refresh
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn-refresh"
                        style={{ background: '#ef4444' }}
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                {[
                    { label: 'Total Users', value: stats.total, icon: 'fa-users', color: 'blue' },
                    { label: 'Active Users', value: stats.active, icon: 'fa-user-check', color: 'green' },
                    { label: 'Pending Activation', value: stats.pending, icon: 'fa-user-clock', color: 'orange' },
                    { label: 'Administrators', value: stats.admins, icon: 'fa-user-shield', color: 'purple' }
                ].map((s, i) => (
                    <div key={i} className={`stat-card ${s.color}`}>
                        <div className="stat-icon">
                            <i className={`fas ${s.icon}`}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{s.value}</h3>
                            <p>{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Table */}
            <div className="users-section">
                <div className="section-header">
                    <h2><i className="fas fa-users-cog"></i> User Management</h2>
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {users.length === 0 ? (
                    <div className="no-users-box">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h3>No Users Found</h3>
                        <p>Backend may not be running or database is empty.</p>
                        <button onClick={loadUsers} className="btn-refresh">
                            <i className="fas fa-sync-alt"></i> Retry
                        </button>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="no-data">
                                            No users match your search
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>#{user.id}</td>
                                            <td>{user.firstName || 'N/A'}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role?.roleType || 'USER'}</td>
                                            <td>
                                                {(user.isActif || user.actif) ? 'Active' : 'Inactive'}
                                            </td>
                                            <td className="actions">
                                                {!(user.isActif || user.actif) && (
                                                    <button
                                                        onClick={() => handleActivate(user.id)}
                                                        className="btn-action activate"
                                                    >
                                                        ✔
                                                    </button>
                                                )}
                                                {user.role?.roleType !== 'ADMIN' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="btn-action delete"
                                                    >
                                                        🗑
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
