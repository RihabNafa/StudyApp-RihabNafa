import React, { useState } from "react";
import imgPYTHON from  "./images/python-logo.png";
import imgPHP from  "./images/php-logo.png";
import imgJS from  "./images/js-logo.png";
import imgLARAVEL from  "./images/laravel-logo.png";
import imgREACT from  "./images/react-logo.png";
import imgAGILE from  "./images/agile-logo.png";

import "./App.css";

const Page3Cours = ({ onNavigate, selectedYear, onSelectCourse }) => {
  const [selectedFiliere, setSelectedFiliere] = useState('Dev_Digital');
  const [searchTerm, setSearchTerm] = useState('');

  const filieres = ['Dev_Digital', 'Gestion', 'Electro-Mecanique', 'Diagnostique', 'Logistique'];

  const coursData = {
    Dev_Digital: {
      1: [
        { name: 'Python', icon: imgPYTHON, color: 'linear-gradient(to bottom right, #60a5fa, #fbbf24)' },
        { name: 'PHP', icon: imgPHP, color: 'linear-gradient(to bottom right, #a855f7, #3b82f6)' },
        { name: 'JavaScript', icon: imgJS, color: 'linear-gradient(to bottom right, #fbbf24, #fb923c)' }
      ],
      2: [
        { name: 'Laravel', icon: imgLARAVEL, color: 'linear-gradient(to bottom right, #f472b6, #a855f7)' },
        { name: 'React', icon: imgREACT, color: 'linear-gradient(to bottom right, #22d3ee, #3b82f6)' },
        { name: 'AGILE', icon: imgAGILE, color: 'linear-gradient(to bottom right, #a78bfa, #f472b6)' }
      ]
    },
    Gestion: {
      1: [
        { name: 'Comptabilité', icon: '💰', color: 'linear-gradient(to bottom right, #4ade80, #10b981)' },
        { name: 'Marketing', icon: '📊', color: 'linear-gradient(to bottom right, #60a5fa, #6366f1)' }
      ],
      2: [
        { name: 'Finance', icon: '💵', color: 'linear-gradient(to bottom right, #34d399, #14b8a6)' },
        { name: 'Management', icon: '👔', color: 'linear-gradient(to bottom right, #818cf8, #a855f7)' }
      ],
      3: [
        { name: 'Audit', icon: '📋', color: 'linear-gradient(to bottom right, #a78bfa, #f472b6)' }
      ]
    }
  };

  const currentCourses = coursData[selectedFiliere]?.[selectedYear] || [];
  const filteredCourses = currentCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const yearNames = { 1: '1ère Année', 2: '2 ème Année', 3: '3 ème Année' };

  return (
    <div className="page3-container">
      <div className="page3-header">
        <div className="header-left">
          <span style={{color: 'white', fontSize: '1.25rem'}}>👤</span>
        </div>
        <span style={{color: 'white', fontSize: '1.5rem'}}>☰</span>
      </div>

      <div className="page3-content">
        <div className="page3-nav">
          <button onClick={() => onNavigate('page2')} className="btn-retour">
            <span style={{fontSize: '1.25rem'}}>←</span> Retour
          </button>

          <span className={`year-badge-pill year${selectedYear}`}>
            {yearNames[selectedYear]}
          </span>

          <span style={{color: '#9ca3af', fontSize: '1.5rem'}}>⚙️</span>
        </div>

        <select
          value={selectedFiliere}
          onChange={(e) => setSelectedFiliere(e.target.value)}
          className="filiere-select"
        >
          {filieres.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche un module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>

        <div className="courses-container">
          {filteredCourses.map((course, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectCourse(course);
                onNavigate('page4');
              }}
              className="course-card"
              style={{background: course.color}}
            >
              <div className="course-content">
                <div className="course-icon">
                  {typeof course.icon === 'string' ? (
                    <img src={course.icon} alt={course.name} className="course-img" />
                  ) : (
                    course.icon
                  )}
                </div>
                <h3 className="course-name">{course.name}</h3>
                <div className="btn-voir-cours">Voir Cours</div>
              </div>
            </button>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="no-results">Aucun cours trouvé 😕</p>
        )}
      </div>
    </div>
  );
};

export default Page3Cours;
