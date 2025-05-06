import React, { useState } from 'react';
import './SyllabusManagement.css';

const SyllabusManagement = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', units: 5, completed: 2 },
    { id: 2, code: 'CS201', name: 'Data Structures and Algorithms', units: 6, completed: 1 },
    { id: 3, code: 'CS301', name: 'Database Management Systems', units: 5, completed: 0 },
  ]);
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syllabusContent, setSyllabusContent] = useState({
    units: [],
    references: []
  });

  // Mock data for syllabus content
  const mockSyllabusData = {
    'CS101': {
      units: [
        { id: 1, title: 'Introduction to Computing', completed: true },
        { id: 2, title: 'Basic Programming Concepts', completed: true },
        { id: 3, title: 'Control Structures', completed: false },
        { id: 4, title: 'Functions and Procedures', completed: false },
        { id: 5, title: 'Arrays and Data Structures', completed: false },
      ],
      references: [
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Computer Science: An Overview by J. Glenn Brookshear',
        'Programming in C by Kernighan and Ritchie'
      ]
    },
    'CS201': {
      units: [
        { id: 1, title: 'Introduction to Data Structures', completed: true },
        { id: 2, title: 'Arrays and Linked Lists', completed: false },
        { id: 3, title: 'Stacks and Queues', completed: false },
        { id: 4, title: 'Trees and Graphs', completed: false },
        { id: 5, title: 'Sorting Algorithms', completed: false },
        { id: 6, title: 'Searching Algorithms', completed: false },
      ],
      references: [
        'Data Structures Using C by Reema Thareja',
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Data Structures and Algorithm Analysis in C++ by Mark Allen Weiss'
      ]
    },
    'CS301': {
      units: [
        { id: 1, title: 'Database Concepts', completed: false },
        { id: 2, title: 'Entity-Relationship Model', completed: false },
        { id: 3, title: 'Relational Model', completed: false },
        { id: 4, title: 'SQL', completed: false },
        { id: 5, title: 'Normalization and Database Design', completed: false },
      ],
      references: [
        'Database System Concepts by Silberschatz, Korth, and Sudarshan',
        'Fundamentals of Database Systems by Elmasri and Navathe',
        'Database Management Systems by Raghu Ramakrishnan'
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
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Syllabus Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track your course syllabi for different subjects
        </p>
      
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 ${
                selectedSubject?.id === subject.id ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-indigo-500 p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{subject.code}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{subject.name}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-indigo-600">{subject.completed} of {subject.units} units</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${(subject.completed / subject.units) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedSubject && syllabusContent && (
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedSubject.code}: {selectedSubject.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Syllabus and unit progress tracking
                  </p>
                </div>
                <button
                  onClick={generateAIContent}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Generate AI Content
                </button>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-md leading-6 font-medium text-gray-900 mb-4">Units</h4>
                <div className="space-y-4">
                  {syllabusContent.units.map((unit) => (
                    <div 
                      key={unit.id} 
                      className="flex items-start"
                    >
                      <div className="flex items-center h-6">
                        <input
                          id={`unit-${unit.id}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={unit.completed}
                          onChange={() => toggleUnitCompletion(unit.id)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label 
                          htmlFor={`unit-${unit.id}`} 
                          className={`font-medium ${unit.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}
                        >
                          Unit {unit.id}: {unit.title}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="text-md leading-6 font-medium text-gray-900 mt-8 mb-4">References</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {syllabusContent.references.map((reference, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Modal for AI-generated content */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        AI-Generated Content
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Our AI is generating lecture content and suggestions based on your syllabus for {selectedSubject?.name}.
                        </p>
                        <div className="mt-4">
                          <div className="animate-pulse flex flex-col space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    View Generated Content
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusManagement;