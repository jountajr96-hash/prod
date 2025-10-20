import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectManager from './ProjectManager';
import './AdminDashboard.css';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'projects', label: 'Manage Projects', icon: 'fas fa-folder-open' },
    { id: 'featured', label: 'Featured Project', icon: 'fas fa-star' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logos">
            <img src="/images/akk.png" alt="AKK Logo" className="sidebar-logo" />
            <img src="/images/hprodd.png" alt="Hanchi Production" className="sidebar-logo" />
          </div>
          <h2 className="sidebar-title">Admin Panel</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <i className={item.icon}></i>
              <span className="nav-text">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className={`fas ${sidebarOpen ? 'fas fa-times' : 'fas fa-bars'}`}></i>
            </button>
            <div className="header-title">
              <h1>{menuItems.find(item => item.id === activeTab)?.label}</h1>
              <p>Manage your content efficiently</p>
            </div>
          </div>
          
          <div className="header-right">
            <div className="admin-info">
              <div className="admin-avatar">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="admin-details">
                <span className="admin-name">Admin</span>
                <span className="admin-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'featured' && (
            <div className="coming-soon">
              <div className="coming-soon-content">
                <i className="fas fa-star"></i>
                <h2>Featured Project Manager</h2>
                <p>This feature is coming soon!</p>
                <p>You'll be able to manage your featured projects here.</p>
              </div>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="coming-soon">
              <div className="coming-soon-content">
                <i className="fas fa-chart-bar"></i>
                <h2>Analytics Dashboard</h2>
                <p>View detailed analytics and insights about your projects.</p>
                <div className="stats-preview">
                  <div className="stat-card">
                    <i className="fas fa-eye"></i>
                    <span>1,234 Views</span>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-download"></i>
                    <span>56 Downloads</span>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-heart"></i>
                    <span>89 Likes</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="coming-soon">
              <div className="coming-soon-content">
                <i className="fas fa-cog"></i>
                <h2>Settings</h2>
                <p>Configure your admin panel preferences.</p>
                <div className="settings-preview">
                  <div className="setting-item">
                    <label>Dark Mode</label>
                    <div className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Email Notifications</label>
                    <div className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;