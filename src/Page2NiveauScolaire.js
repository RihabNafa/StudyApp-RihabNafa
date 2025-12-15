
// Page2NiveauScolaire.js
import React, { useState, useEffect } from "react";
import "./App.css";
import imglogo from "./images/students-illustration.png";

export default function Page2NiveauScolaire({ onNavigate, onSelectYear }) {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://podo.b1.ma/api/public/years');
        const data = await response.json();
        
        if (data.success) {
          setYears(data.data);
        } else {
          setError("Erreur lors du chargement des années");
        }
      } catch (err) {
        setError("Impossible de se connecter à l'API");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, []);

  const getYearColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="page2-container">
      <div className="page2-header">
        <div className="page2-header-icons">
          <button 
            onClick={() => onNavigate('page1')}  
            style={{
              cursor:"pointer",
              border:"1px solid white",
              borderRadius:"20px",
              padding:"5px 15px",
              marginTop:"115px",
              marginLeft:"10px",
              color:"#0d9488",
              background:"white",
              fontWeight:"600"
            }}
          >
            <span style={{fontSize: '1.25rem'}}>←</span> Retour
          </button>
        </div>

        <h2 className="page2-title">📚 Niveaux Scolaires</h2>
      </div>

      <div className="page2-content">
        <div className="carousel-container">
          <div className="carousel-image">
            <img src={imglogo} alt="Students" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
          </div>
          <div className="carousel-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div className="years-container">
          {loading && (
            <div style={{
              textAlign: 'center', 
              padding: '3rem',
              background: 'white',
              borderRadius: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f4f6',
                borderTop: '4px solid #14b8a6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p style={{color: '#6b7280', fontSize: '1.1rem'}}>
                Chargement des années...
              </p>
            </div>
          )}
          
          {error && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#fee2e2',
              borderRadius: '1.5rem',
              border: '2px solid #ef4444'
            }}>
              <span style={{fontSize: '3rem', display: 'block', marginBottom: '1rem'}}>😕</span>
              <p style={{color: '#dc2626', fontWeight: '600'}}>{error}</p>
            </div>
          )}

          {!loading && !error && years.map((year, index) => (
            <button
              key={year.id}
              className="year-button"
              style={{
                background: getYearColor(index),
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => {
                onSelectYear(year);
                onNavigate("page3");
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}></div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>
                  {year.name}
                </span>
                
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
