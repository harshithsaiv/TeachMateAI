import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SyllabusManagement.css';

const SyllabusManagement = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([
    { id: 1, code: 'CSE23407B', name: 'Full Stack Framework', units: 5, completed: 2 },
    { id: 2, code: 'CSE23402', name: 'Design and Analysis of Algorithms', units: 6, completed: 1 },
  ]);
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syllabusContent, setSyllabusContent] = useState({
    units: [],
    references: []
  });

  // Mock data for syllabus content
  const mockSyllabusData = {
    'CSE23407B': {
      units: [
        { id: 1, title: 'Introduction to Full Stack', completed: true },
        { id: 2, title: 'Frontend Frameworks', completed: true },
        { id: 3, title: 'Backend Frameworks', completed: false },
        { id: 4, title: 'Database Integration', completed: false },
        { id: 5, title: 'Deployment & DevOps', completed: false },
      ],
      references: [
        'Full Stack Development by Chris Northwood',
        'The Road to React by Robin Wieruch',
        'Node.js Design Patterns by Mario Casciaro'
      ]
    },
    'CSE23402': {
      units: [
        { id: 1, title: 'Algorithm Analysis', completed: true },
        { id: 2, title: 'Divide and Conquer', completed: false },
        { id: 3, title: 'Greedy Algorithms', completed: false },
        { id: 4, title: 'Dynamic Programming', completed: false },
        { id: 5, title: 'Graph Algorithms', completed: false },
        { id: 6, title: 'NP-Completeness', completed: false },
      ],
      references: [
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Algorithm Design by Jon Kleinberg and Éva Tardos',
        'The Algorithm Design Manual by Steven S. Skiena'
      ]
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSyllabusContent(mockSyllabusData[subject.code]);
  };

  const toggleUnitCompletion = (unitId) => {
    const updatedUnits = syllabusContent.units.map(unit => 
      unit.id === unitId ? { ...unit, completed: !unit.completed } : unit
    );
    
    setSyllabusContent({
      ...syllabusContent,
      units: updatedUnits
    });
    
    // Update the completed units count in the subject list
    const completedCount = updatedUnits.filter(unit => unit.completed).length;
    setSubjects(subjects.map(subject => 
      subject.id === selectedSubject.id ? { ...subject, completed: completedCount } : subject
    ));
  };

  const generateAIContent = () => {
    setIsModalOpen(true);
    // Here you would integrate with AI API (like GPT-4) to generate content
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title" style={{cursor:'pointer'}} onClick={() => navigate('/dashboard')}>TeachmateAI</h1>
          <nav className="main-nav">
            <button className={`nav-link${window.location.pathname === '/dashboard' ? ' active' : ''}`} onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className={`nav-link${window.location.pathname === '/syllabus' ? ' active' : ''}`} onClick={() => navigate('/syllabus')}>Syllabus Management</button>
          </nav>
        </div>
      </header>
      <div className="syllabus-container">
        <h1 className="syllabus-title">Syllabus Management</h1>
        <p className="syllabus-desc">
          Manage and track your course syllabi for different subjects
        </p>

        <div className="syllabus-subjects-grid">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className={`syllabus-subject-card${selectedSubject?.id === subject.id ? ' selected' : ''}`}
            >
              <div className="subject-code">{subject.code}</div>
              <div className="subject-name">{subject.name}</div>
              <div className="progress-label">Progress</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(subject.completed / subject.units) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">{subject.completed} of {subject.units} units</div>
            </div>
          ))}
        </div>

        {selectedSubject && syllabusContent && (
          <div className="syllabus-details-card">
            <div className="syllabus-details-header">
              <div>
                <div className="syllabus-details-title">
                  {selectedSubject.code}: {selectedSubject.name}
                </div>
                <div className="syllabus-details-desc">
                  Syllabus and unit progress tracking
                </div>
              </div>
              <button
                onClick={generateAIContent}
                className="syllabus-ai-btn"
              >
                <svg className="mr-2 -ml-1" height="20" width="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Generate AI Content
              </button>
            </div>
            <div className="syllabus-units-list">
              <h4 className="syllabus-references-title">Units</h4>
              {syllabusContent.units.map((unit) => (
                <div key={unit.id} className="syllabus-unit-row">
                  <input
                    id={`unit-${unit.id}`}
                    type="checkbox"
                    className="syllabus-unit-checkbox"
                    checked={unit.completed}
                    onChange={() => toggleUnitCompletion(unit.id)}
                  />
                  <label
                    htmlFor={`unit-${unit.id}`}
                    className={`syllabus-unit-label${unit.completed ? ' completed' : ''}`}
                  >
                    Unit {unit.id}: {unit.title}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h4 className="syllabus-references-title">References</h4>
              <ul className="syllabus-references-list">
                {syllabusContent.references.map((reference, index) => (
                  <li key={index}>{reference}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal for AI-generated content */}
        {isModalOpen && (
          <>
            <div className="syllabus-modal-backdrop"></div>
            <div className="syllabus-modal-content">
              <h3 className="syllabus-details-title">AI-Generated Content</h3>
              <p className="syllabus-details-desc">
                Our AI is generating lecture content and suggestions based on your syllabus for {selectedSubject?.name}.
              </p>
              <div style={{ margin: '2rem 0' }}>
                <div style={{ height: 16, background: '#e0e7ff', borderRadius: 8, marginBottom: 8, width: '80%' }}></div>
                <div style={{ height: 16, background: '#e0e7ff', borderRadius: 8, marginBottom: 8, width: '60%' }}></div>
                <div style={{ height: 16, background: '#e0e7ff', borderRadius: 8, marginBottom: 8, width: '90%' }}></div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button className="syllabus-ai-btn" onClick={() => setIsModalOpen(false)}>
                  View Generated Content
                </button>
                <button className="syllabus-ai-btn" style={{ background: '#e0e7ff', color: '#6366f1' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SyllabusManagement;