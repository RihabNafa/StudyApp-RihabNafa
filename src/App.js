
// App.js
import React, { useState } from 'react';
import "./App.css";
import Page1Accueil from "./Page1Accueil";
import Page2NiveauScolaire from "./Page2NiveauScolaire";
import Page3Cours from "./Page3Cours";
import Page4DetailsCours from "./Page4DetailsCours";

const App = () => {
  const [currentPage, setCurrentPage] = useState('page1');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'page1':
        return <Page1Accueil onNavigate={setCurrentPage} />;
      
      case 'page2':
        return (
          <Page2NiveauScolaire 
            onNavigate={setCurrentPage} 
            onSelectYear={setSelectedYear} 
          />
        );
      
      case 'page3':
        return (
          <Page3Cours 
            onNavigate={setCurrentPage} 
            selectedYear={selectedYear} 
            selectedFiliere={selectedFiliere}
            onSelectFiliere={setSelectedFiliere}
            onSelectModule={setSelectedModule} 
          />
        );
      
      case 'page4':
        return (
          <Page4DetailsCours 
            onNavigate={setCurrentPage} 
            selectedModule={selectedModule} 
          />
        );
      
      default:
        return <Page1Accueil onNavigate={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;
