import imglogo from  "./images/students-illustration.png";
import "./App.css";
const Page1Accueil = ({ onNavigate }) => {
  return (
    <div className="page1-container">
      
      <div className="page1-header">
        <div className="header-left">
          <span style={{color: 'white', fontSize: '1.25rem'}}>👤</span>
          <span style={{color: 'white', fontSize: '1.25rem'}}>☰</span>
        </div>
        <div className="header-right">
          <span style={{fontSize: '1.5rem'}}>🎓</span>
        </div>
      </div>

      <div className="page1-decoration"></div>

      <div className="page1-content">
        <h1 className="page1-title">Bienvenue à</h1>
        <h2 className="page1-subtitle">votre Espace</h2>
        <h2 className="page1-subtitle">Étudiant</h2>
        <h3 className="page1-subtitle">OFPPT !</h3>

        <div className="page1-logo">
          <span><img src={imglogo} /></span>
        </div>

        <button onClick={() => onNavigate('page2')} className="btn-decouvrir">
          Découvrir
          <span style={{fontSize: '1.5rem'}}>→</span>
        </button>
      </div>
    </div>
  );
};
export default Page1Accueil;