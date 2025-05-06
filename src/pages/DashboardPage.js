import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import SyllabusManagement from './SyllabusManagement';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'syllabus':
        return <SyllabusManagement />;
      case 'lecture':
        return (
          <div className="content-container">
            <h1>Lecture Content</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case 'assessments':
        return (
          <div className="content-container">
            <h1>Assessments</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="content-container">
            <h1 className="page-title">Dashboard</h1>
            
            <div className="dashboard-section">
              <h2 className="section-title">Welcome to VTU Faculty Portal</h2>
              <p className="section-description">
                Your AI-powered teaching assistant for intelligent syllabus management.
              </p>
            
              <div className="info-section">
                <h3 className="info-title">Course Progress</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '25%' }}></div>
                  </div>
                  <span className="progress-text">25% complete</span>
                </div>
              </div>
              
              <div className="info-section">
                <h3 className="info-title">Recent Activity</h3>
                <ul className="activity-list">
                  <li className="activity-item">
                    <div className="activity-icon document-icon"></div>
                    <div className="activity-details">
                      <span className="activity-description">Updated lecture content for Module 3</span>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </li>
                  <li className="activity-item">
                    <div className="activity-icon assessment-icon"></div>
                    <div className="activity-details">
                      <span className="activity-description">Generated assessment for Unit 2</span>
                      <span className="activity-time">Yesterday</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title">TeachmateAI</h1>
          <nav className="main-nav">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('syllabus')} 
              className={`nav-link ${activeTab === 'syllabus' ? 'active' : ''}`}
            >
              Syllabus Management
            </button>
            <button 
              onClick={() => setActiveTab('lecture')} 
              className={`nav-link ${activeTab === 'lecture' ? 'active' : ''}`}
            >
              Lecture Content
            </button>
            <button 
              onClick={() => setActiveTab('assessments')} 
              className={`nav-link ${activeTab === 'assessments' ? 'active' : ''}`}
            >
              Assessments
            </button>
          </nav>
          <div className="user-section">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleLogout} className="logout-button">Sign out</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;