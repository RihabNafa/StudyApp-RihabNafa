
// Page4DetailsCours.js
import React, { useState, useEffect } from "react";
import "./App.css";

const Page4DetailsCours = ({ onNavigate, selectedModule }) => {
  const [selectedType, setSelectedType] = useState('Cours');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const types = ['Cours', 'CC', 'EFM'];

  useEffect(() => {
    if (!selectedModule) return;
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = '';
        
        switch(selectedType) {
          case 'Cours':
            url = `https://podo.b1.ma/api/public/modules/${selectedModule.id}/courses`;
            break;
          case 'CC':
            url = `https://podo.b1.ma/api/public/modules/${selectedModule.id}/ccs`;
            break;
          case 'EFM':
            url = `https://podo.b1.ma/api/public/modules/${selectedModule.id}/efms`;
            break;
          default:
            return;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setContent(data.data || []);
        } else {
          setError("Erreur de chargement");
        }
      } catch (err) {
        setError("Erreur de connexion");
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedModule, selectedType]);

  if (!selectedModule) return null;

  const handleDownload = (item) => {
    if (!item.file_path) {
      alert("Aucun fichier disponible");
      return;
    }
    
    let fullUrl = item.file_path;
    if (!fullUrl.startsWith('http')) {
      fullUrl = `https://podo.b1.ma${fullUrl}`;
    }
    
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadAll = () => {
    if (content.length === 0) {
      alert("Aucun contenu disponible");
      return;
    }
    
    content.forEach((item, index) => {
      if (item.file_path) {
        setTimeout(() => handleDownload(item), index * 500);
      }
    });
  };

  const getModuleColor = () => {
    const colors = [
      'linear-gradient(to bottom right, #60a5fa, #fbbf24)',
      'linear-gradient(to bottom right, #a855f7, #3b82f6)',
      'linear-gradient(to bottom right, #fbbf24, #fb923c)',
    ];
    return colors[selectedModule.id % colors.length];
  };

  const getIcon = () => {
    switch(selectedType) {
      case 'Cours': return '📚';
      case 'CC': return '📝';
      case 'EFM': return '📄';
      default: return '📚';
    }
  };

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

        <div className="course-detail-card" style={{background: getModuleColor()}}>
          <div className="course-detail-content">
            <div className="course-icon-large">
              <span style={{fontSize: '4rem'}}>📚</span>
            </div>
            <h2 className="course-title-large">
              {selectedModule.name}
            </h2>
            
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '1rem',
              borderRadius: '0.75rem',
              marginTop: '1rem'
            }}>
              {selectedModule.code && (
                <p style={{fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600'}}>
                  📋 Code: {selectedModule.code}
                </p>
              )}
              {selectedModule.instructor && (
                <p style={{fontSize: '0.95rem'}}>
                  👨‍🏫 {selectedModule.instructor}
                </p>
              )}
            </div>
          </div>
        </div>

        {content.length > 0 && (
          <button 
            className="btn-download"
            onClick={handleDownloadAll}
          >
            <span style={{fontSize: '1.5rem'}}>⬇️</span>
            Télécharger tout ({content.length})
          </button>
        )}

        {loading ? (
          <div style={{
            textAlign: 'center', 
            padding: '3rem',
            background: 'white',
            borderRadius: '1rem',
            marginTop: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
              Chargement...
            </p>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center', 
            marginTop: '2rem',
            padding: '2rem',
            background: '#fee2e2',
            borderRadius: '1rem',
            border: '2px solid #ef4444'
          }}>
            <span style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>⚠️</span>
            <p style={{color: '#dc2626', fontSize: '1.1rem', fontWeight: '600'}}>
              {error}
            </p>
          </div>
        ) : (
          <>
            {content.length > 0 ? (
              <div className="content-list">
                {content.map((item, index) => (
                  <div 
                    key={item.id || index}
                    onClick={() => handleDownload(item)}
                    className="content-item"
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <div style={{flex: 1}}>
                        <p className="content-item-text">
                          {getIcon()} {item.title}
                        </p>
                        {item.description && (
                          <p style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem'}}>
                            {item.description}
                          </p>
                        )}
                        {item.year && (
                          <p style={{fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem'}}>
                            📅 Année: {item.year}
                          </p>
                        )}
                      </div>
                      {item.file_path && (
                        <div style={{
                          background: '#14b8a6',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          marginLeft: '1rem',
                          whiteSpace: 'nowrap'
                        }}>
                          📥 Télécharger
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center', 
                marginTop: '3rem',
                padding: '2rem',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>📭</span>
                <p style={{color: '#6b7280', fontSize: '1.1rem', marginBottom: '0.5rem'}}>
                  Aucun {selectedType.toLowerCase()} disponible
                </p>
                <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>
                  Les contenus seront ajoutés prochainement
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Page4DetailsCours;