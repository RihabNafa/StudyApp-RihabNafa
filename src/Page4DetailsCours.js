import React, { useState } from "react";
import "./App.css";

const Page4DetailsCours = ({ onNavigate, selectedCourse }) => {
  const [selectedType, setSelectedType] = useState('Cours');
  const types = ['Cours', 'Exercices', 'Contrôles', 'EFM', 'EFF'];

  if (!selectedCourse) return null;

  return (
    <div className="page4-container">

      <div className="page3-header">
        <div className="header-left">
          <span style={{color: 'white', fontSize: '1.25rem'}}>👤</span>
        </div>
        <span style={{color: 'white', fontSize: '1.5rem'}}>☰</span>
      </div>

      <div className="page3-content">
        <button onClick={() => onNavigate('page3')} className="btn-retour">
          <span style={{fontSize: '1.25rem'}}>←</span> Retour
        </button>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="type-select"
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="course-detail-card" style={{background: selectedCourse.color}}>
          <div className="course-detail-content">
            <div className="course-icon-large">
              {typeof selectedCourse.icon === 'string' ? (
                <img src={selectedCourse.icon} alt={selectedCourse.name} className="course-img-large" />
              ) : (
                selectedCourse.icon
              )}
            </div>
            <h2 className="course-title-large">{selectedCourse.name}</h2>
            <div className="btn-voir-cours-large">Voir Cours</div>
          </div>
        </div>

        <button className="btn-download">
          <span style={{fontSize: '1.5rem'}}>⬇️</span>
          Télécharger
        </button>

        <div className="content-list">
          <div className="content-item">
            <p className="content-item-text">📄 Chapitre 1 - Introduction</p>
          </div>
          <div className="content-item">
            <p className="content-item-text">📄 Chapitre 2 - Concepts de base</p>
          </div>
          <div className="content-item">
            <p className="content-item-text">📄 Chapitre 3 - Applications pratiques</p>
          </div>
          <div className="content-item">
            <p className="content-item-text">📝 TP 1 - Exercices pratiques</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4DetailsCours;
