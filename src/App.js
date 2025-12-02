import React, { useState } from 'react';
import "./App.css";
import Page1Accueil from "./Page1Accueil";
import Page2NiveauScolaire from "./Page2NiveauScolaire";
import Page3Cours from "./Page3Cours";
import Page4DetailsCours from "./Page4DetailsCours";


const App = () => {
  const [currentPage, setCurrentPage] = useState('page1');
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'page1':
        return <Page1Accueil onNavigate={setCurrentPage} />;
      case 'page2':
        return <Page2NiveauScolaire onNavigate={setCurrentPage} onSelectYear={setSelectedYear} />;
      case 'page3':
        return <Page3Cours onNavigate={setCurrentPage} selectedYear={selectedYear} onSelectCourse={setSelectedCourse} />;
      case 'page4':
        return <Page4DetailsCours onNavigate={setCurrentPage} selectedCourse={selectedCourse} />;
      default:
        return <Page1Accueil onNavigate={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;