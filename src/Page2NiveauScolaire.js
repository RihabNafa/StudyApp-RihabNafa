import React from "react";
import "./App.css";
import imglogo from  "./images/students-illustration.png";
export default function Page2NiveauScolaire({ onNavigate, onSelectYear }) {
  return (
    <div className="page2-container">

      {/* HEADER */}
      <div className="page2-header">
        <div className="page2-header-icons">
          
           <button onClick={() => onNavigate('page1')}  style={{cursor:"pointer",border:"1px solid white",borderRadius:"20px",padding:"5px",marginTop:"115px",marginLeft:"10px",color:"#0d9488"}}>
            <span style={{fontSize: '1.25rem'}}>←</span> Retour
          </button>
          
        </div>

        <h2 className="page2-title">Niveaux Scolaires</h2>
      </div>

      {/* CONTENT */}
      <div className="page2-content">

        {/* CAROUSEL */}
        <div className="carousel-container">
          <div className="carousel-image"><img src={imglogo}/></div>
          <div className="carousel-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        {/* YEARS */}
        <div className="years-container">

          <button
            className="year-button year1"
            onClick={() => {
              onSelectYear(1);
              onNavigate("page3");
            }}
          >
            <div className="year-info">
              <span className="year-icon">1️⃣</span>
              <span>1ère Année</span>
            </div>
            <span className="year-badge">Nouveau</span>
          </button>

          <button
            className="year-button year2"
            onClick={() => {
              onSelectYear(2);
              onNavigate("page3");
            }}
          >
            <div className="year-info">
              <span className="year-icon">2️⃣</span>
              <span>2ème Année</span>
            </div>
            <span className="year-badge">Populaire</span>
          </button>

          <button
            className="year-button year3"
            onClick={() => {
              onSelectYear(3);
              onNavigate("page3");
            }}
          >
            <div className="year-info">
              <span className="year-icon">3️⃣</span>
              <span>3ème Année</span>
            </div>
            <span className="year-badge">Avancé</span>
          </button>

        </div>

      </div>
    </div>
  );
}
