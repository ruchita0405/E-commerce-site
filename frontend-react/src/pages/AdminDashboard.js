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

   useEffect(() => {
       const user = JSON.parse(localStorage.getItem('user'));
       if (!user || !user.email || !user.email.toLowerCase().includes('admin')) {
           showToast('Access denied. Admin only!', 'error');
           setTimeout(() => navigate('/'), 2000);
           return;
       }
       loadUsers();
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [navigate]);

   useEffect(() => {
       filterUsers();
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchTerm, users]);

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
            calculateStats(data);
        } catch (error) {
            console.error('Error loading users:', error);
            showToast('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (userList) => {
        setStats({
            total: userList.length,
            active: userList.filter(u => u.actif).length,
            pending: userList.filter(u => !u.actif).length,
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
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUser(userId);
            showToast('User deleted successfully', 'success');
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('Failed to delete user', 'error');
        }
    };

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

    return (
        <div className="admin-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="admin-header">
                <div>
                    <h1><i className="fas fa-shield-halved"></i> Admin Dashboard</h1>
                    <p>Manage users and system settings</p>
                </div>
                <button onClick={loadUsers} className="btn-refresh">
                    <i className="fas fa-sync-alt"></i> Refresh
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon">
                        <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.active}</h3>
                        <p>Active Users</p>
                    </div>
                </div>
                <div className="stat-card orange">
                    <div className="stat-icon">
                        <i className="fas fa-user-clock"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.pending}</h3>
                        <p>Pending Activation</p>
                    </div>
                </div>
                <div className="stat-card purple">
                    <div className="stat-icon">
                        <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.admins}</h3>
                        <p>Administrators</p>
                    </div>
                </div>
            </div>

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
                                        <i className="fas fa-inbox"></i>
                                        <p>No users found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>
                                        <td>
                                            <div className="user-name">
                                                <i className="fas fa-user-circle"></i>
                                                {user.firstName || 'N/A'}
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role?.roleType?.toLowerCase() || 'user'}`}>
                                                <i className={`fas ${user.role?.roleType === 'ADMIN' ? 'fa-shield-halved' : 'fa-user'}`}></i>
                                                {user.role?.roleType || 'USER'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.actif ? 'active' : 'inactive'}`}>
                                                <i className={`fas ${user.actif ? 'fa-check-circle' : 'fa-clock'}`}></i>
                                                {user.actif ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            {!user.actif && (
                                                <button
                                                    onClick={() => handleActivate(user.id)}
                                                    className="btn-action activate"
                                                    title="Activate User"
                                                >
                                                    <i className="fas fa-check"></i>
                                                </button>
                                            )}
                                            {user.role?.roleType !== 'ADMIN' && (
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn-action delete"
                                                    title="Delete User"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;