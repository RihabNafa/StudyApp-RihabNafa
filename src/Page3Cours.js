
// Page3Cours.js - VERSION CORRIGÉE
import React, { useState, useEffect } from "react";
import "./App.css";

const Page3Cours = ({ onNavigate, selectedYear, selectedFiliere, onSelectFiliere, onSelectModule }) => {
  const [filieres, setFilieres] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!selectedYear) return;

    const fetchFilieres = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://podo.b1.ma/api/public/years/${selectedYear.id}/filieres`);
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setFilieres(data.data);
          if (!selectedFiliere) {
            onSelectFiliere(data.data[0]);
          }
        } else {
          setError("Aucune filière disponible");
          setFilieres([]);
        }
      } catch (err) {
        setError("Erreur de connexion");
        console.error('Erreur filieres:', err);
        setFilieres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilieres();
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedFiliere) return;

    const fetchModules = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://podo.b1.ma/api/public/filieres/${selectedFiliere.id}/modules`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setModules(data.data);
          if (data.data.length === 0) {
            setError("Aucun module disponible");
          }
        } else {
          setError("Erreur de chargement");
          setModules([]);
        }
      } catch (err) {
        setError("Erreur de connexion");
        console.error('Erreur modules:', err);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [selectedFiliere]);

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (module.code && module.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getModuleColor = (index) => {
    const colors = [
      'linear-gradient(to bottom right, #60a5fa, #fbbf24)',
      'linear-gradient(to bottom right, #a855f7, #3b82f6)',
      'linear-gradient(to bottom right, #fbbf24, #fb923c)',
      'linear-gradient(to bottom right, #f472b6, #a855f7)',
      'linear-gradient(to bottom right, #22d3ee, #3b82f6)',
      'linear-gradient(to bottom right, #a78bfa, #f472b6)',
      'linear-gradient(to bottom right, #34d399, #14b8a6)',
      'linear-gradient(to bottom right, #fb923c, #f97316)',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="page3-container">
      <div className="page3-header">
        <div className="header-left">
          <span style={{color: 'white', fontSize: '1.25rem'}}>👤</span>
        </div>
        <span style={{color: 'white', fontSize: '1.5rem'}}>☰</span>
      </div>

      <div className="page3-content">
        <div className="page3-nav" style={{flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <button onClick={() => onNavigate('page2')} className="btn-retour" style={{alignSelf: 'flex-start'}}>
            <span style={{fontSize: '1.25rem'}}>←</span> Retour
          </button>

          {selectedYear && (
            <span className={`year-badge-pill year${selectedYear.order || 1}`}>
              {selectedYear.name}
            </span>
          )}
        </div>

        {filieres.length > 0 && (
          <select
            value={selectedFiliere?.id || ''}
            onChange={(e) => {
              const filiere = filieres.find(f => f.id === parseInt(e.target.value));
              onSelectFiliere(filiere);
              setSearchTerm('');
            }}
            className="filiere-select"
          >
            {filieres.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        )}

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>

       
        {!loading && !error && filteredModules.length > 0 && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#f0fdfa',
            borderRadius: '0.5rem',
            textAlign: 'center',
            color: '#0d9488',
            fontWeight: '600'
          }}>
            📚 {filteredModules.length} module{filteredModules.length > 1 ? 's' : ''} disponible{filteredModules.length > 1 ? 's' : ''}
            {searchTerm && ` (recherche: "${searchTerm}")`}
          </div>
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
              Chargement des modules...
            </p>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center', 
            marginTop: '2rem',
            padding: '2rem',
            background: '#fef2f2',
            borderRadius: '1rem',
            border: '2px solid #fca5a5'
          }}>
            <span style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>😕</span>
            <p style={{color: '#dc2626', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>
              {error}
            </p>
            
            <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>
              {error === "Aucune filière disponible" 
                ? "Cette année n'a pas encore de filières configurées" 
                : error === "Aucun module disponible"
                ? "Cette filière n'a pas encore de modules ajoutés"
                : "Veuillez réessayer plus tard"}
            </p>
          </div>
        ) : filteredModules.length > 0 ? (
          <div className="courses-container">
            {filteredModules.map((module, idx) => (
              <button
                key={module.id}
                onClick={() => {
                  onSelectModule(module);
                  onNavigate('page4');
                }}
                className="course-card"
                style={{background: getModuleColor(idx)}}
              >
                <div className="course-content">
                  <div className="course-icon">
                    <span style={{fontSize: '3rem'}}>📚</span>
                  </div>
                  <h3 className="course-name">{module.name}</h3>
                  {module.code && (
                    <p style={{
                      fontSize: '0.9rem', 
                      marginBottom: '1.5rem', 
                      opacity: 0.95,
                      background: 'rgba(255,255,255,0.2)',
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem'
                    }}>
                      📋 {module.code}
                    </p>
                  )}
                  {module.instructor && (
                    <p style={{fontSize: '0.85rem', marginBottom: '1.5rem', opacity: 0.9}}>
                      👨‍🏫 {module.instructor}
                    </p>
                  )}
                  <div className="btn-voir-cours">
                    Voir le contenu
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>
              {searchTerm ? '🔍' : '📭'}
            </span>
            <p style={{color: '#6b7280', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600'}}>
              {searchTerm 
                ? `Aucun module trouvé pour "${searchTerm}"` 
                : 'Aucun module disponible pour cette filière'}
            </p>
            <p style={{color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
              {searchTerm 
                ? 'Essayez avec un autre terme de recherche' 
                : 'Les modules seront ajoutés prochainement'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1.5rem',
                  background: '#14b8a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ✕ Effacer la recherche
              </button>
            )}
          </div>
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

export default Page3Cours;