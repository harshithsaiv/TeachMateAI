import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import SyllabusManagement from './SyllabusManagement';

const subjectCards = [
  {
    code: 'CSE23407B',
    name: 'Full Stack Framework',
    professor: 'Dr. Priya Sharma',
  },
  {
    code: 'CSE23402',
    name: 'Design and Analysis of Algorithms',
    professor: 'Dr. Ramesh Kumar',
  },
];

const adminCards = [
  ...subjectCards,
  {
    code: 'CSE23403',
    name: 'Operating Systems',
    professor: 'Dr. Anjali Rao',
  },
  {
    code: 'CSE23404',
    name: 'Database Management Systems',
    professor: 'Dr. Suresh Patil',
  },
  {
    code: 'CSE23405',
    name: 'Computer Networks',
    professor: 'Dr. Meena Gupta',
  },
];

const quickActions = [
  { label: 'Create Lesson Plan', icon: '📝' },
  { label: 'Upload Material', icon: '📤' },
  { label: 'Generate Assessment', icon: '🧾' },
  { label: 'Map Syllabus', icon: '🗺️' },
];

const notifications = [
  { id: 1, message: 'University holiday on May 10th.', date: '2025-05-05' },
  { id: 2, message: 'Submit internal marks by May 15th.', date: '2025-05-04' },
];

const recentActivities = [
  { id: 1, activity: 'Mapped syllabus for CSE23407B', time: 'Today, 10:30 AM' },
  { id: 2, activity: 'Generated assessment for CSE23402', time: 'Yesterday, 4:15 PM' },
  { id: 3, activity: 'Uploaded lecture notes for Full Stack Framework', time: '2 days ago' },
];

const aiRecommendations = [
  'Try using interactive quizzes to boost student engagement in Full Stack Framework.',
  'Consider sharing real-world case studies for Design and Analysis of Algorithms.',
];

const facultyCollaborations = [
  { name: 'Dr. Priya Sharma', subject: 'Full Stack Framework', email: 'priya.sharma@vtu.edu' },
  { name: 'Dr. Ramesh Kumar', subject: 'Design and Analysis of Algorithms', email: 'ramesh.kumar@vtu.edu' },
  { name: 'Dr. Anjali Rao', subject: 'Operating Systems', email: 'anjali.rao@vtu.edu' },
];

const resourceLibrary = [
  { name: 'VTU Syllabus PDF', link: '#' },
  { name: 'Teaching Guidelines', link: '#' },
  { name: 'Sample Question Papers', link: '#' },
  { name: 'Academic Calendar', link: '#' },
];

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
    if (activeTab === 'dashboard') {
      const isAdmin = user?.role === 'admin';
      const cards = isAdmin ? adminCards : subjectCards;
      return (
        <div className="content-container">
          <h1 className="page-title">Dashboard</h1>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action) => (
              <button key={action.label} className="quick-action-btn">
                <span className="quick-action-icon">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>

          {/* Subject Cards - moved up for prominence */}
          <div className="subject-cards-grid modern-cards">
            {cards.map((subject) => (
              <div className="subject-card modern-subject-card" key={subject.code}>
                <div className="subject-card-header">
                  <span className="subject-code">{subject.code}</span>
                </div>
                <div className="subject-card-body">
                  <div className="subject-name">{subject.name}</div>
                  {isAdmin && (
                    <div className="professor-name">Handled by: <b>{subject.professor}</b></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* Notifications & Announcements */}
            <div className="dashboard-card notifications-card">
              <h3>Notifications & Announcements</h3>
              <ul>
                {notifications.map((n) => (
                  <li key={n.id}><span className="notif-date">[{n.date}]</span> {n.message}</li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card activity-card">
              <h3>Recent Activity</h3>
              <ul>
                {recentActivities.map((a) => (
                  <li key={a.id}><span className="activity-time">{a.time}:</span> {a.activity}</li>
                ))}
              </ul>
            </div>

            {/* AI Recommendations */}
            <div className="dashboard-card ai-card">
              <h3>AI Recommendations</h3>
              <ul>
                {aiRecommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* Faculty Collaborations */}
            <div className="dashboard-card faculty-card">
              <h3>Faculty Collaborations</h3>
              <ul>
                {facultyCollaborations.map((f, idx) => (
                  <li key={idx}>
                    <b>{f.name}</b> ({f.subject}) <a href={`mailto:${f.email}`} className="collab-email">✉️</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource Library */}
            <div className="dashboard-card resource-card">
              <h3>Resource Library</h3>
              <ul>
                {resourceLibrary.map((r, idx) => (
                  <li key={idx}><a href={r.link} target="_blank" rel="noopener noreferrer">{r.name}</a></li>
                ))}
              </ul>
            </div>
          </div>

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
              onClick={() => navigate('/syllabus')} 
              className={`nav-link${window.location.pathname === '/syllabus' ? ' active' : ''}`}
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