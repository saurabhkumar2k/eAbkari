import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  ChevronDownSvg, 
  UserSvg, 
  UsersSvg,
  BarChart2Svg, 
  GavelSvg, 
  MessageSquareSvg, 
  MapPinSvg, 
  BookOpenSvg, 
  InfoSvg, 
  FileTextSvg, 
  MenuSvg, 
  XCircleSvg as XSvg 
} from '../Style/images/Icons';

const Header = ({ onSelectView, currentView }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthPage = currentView === 'APPLICANT_REGISTRATION';


  const navLinks = [
    { label: 'About Us', icon: <UsersSvg className="nav-icon-main" />, view: 'HOME' },
    { label: 'Facts & Figures', icon: <BarChart2Svg className="nav-icon-main" />, view: 'HOME' },
    { label: 'Acts, Rules & Orders', icon: <GavelSvg className="nav-icon-main" />, view: 'HOME' },
    { label: 'Right to Information', icon: <InfoSvg className="nav-icon-main" />, view: 'HOME' },
    { label: 'Feedback', icon: <MessageSquareSvg className="nav-icon-main" />, view: 'HOME' },
    { label: 'Track & Trace', icon: <MapPinSvg className="nav-icon-main" />, view: 'HOME' },
    { label: 'User Manuals', icon: <BookOpenSvg className="nav-icon-main" />, view: 'HOME' }
  ];

  // const handleLoginOptionClick = (item) => {
  //   if (item === 'Applicant') {
  //     onSelectView('APPLICANT_LOGIN');
  //   } else {
  //     onSelectView('HOME');
  //   }
  //   setIsLoginOpen(false);
  //   setIsMobileMenuOpen(false);
  // };
const handleLoginOptionClick = (item) => {

  if (item === 'Applicant') {

    navigate("/login");

  } else {

    navigate("/");

  }

  setIsLoginOpen(false);
  setIsMobileMenuOpen(false);
};
  return (
    <header className="header">
      {/* Top Brand Area */}
      <div className="container header-top-area">
        <div className="header-brand-box pointer-cursor" onClick={() => navigate("/")}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Emblem of India"
            className="brand-logo-img"
          />
          <div className="header-brand-info">
            <div>
              <h1 className="header-title">Department of Excise</h1>
              <p className="header-subtitle">Government of NCT of Delhi</p>
            </div>
          </div>
        </div>

        <div className="header-actions">
          {!isAuthPage && (
            <div className="pos-relative desktop-only">
              <button 
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="btn-login"
              >
                <UserSvg className="icon-xs" />
                <span>LOGIN</span>
                <ChevronDownSvg className={`icon-xs transition-icon ${isLoginOpen ? 'is-rotated' : ''}`} />
              </button>
              
              {isLoginOpen && (
                <div className="login-dropdown animate-dropdown">
                  {['Applicant', 'Department', 'Licensee', 'Lab Testing'].map((item) => (
                    <button 
                      key={item} 
                      className={`login-option ${currentView === 'APPLICANT_REGISTRATION' && item === 'Applicant' ? 'active' : ''}`}
                      onClick={() => handleLoginOptionClick(item)}
                    >
                      <UserSvg className="icon-xs" />
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isAuthPage && (
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XSvg /> : <MenuSvg />}
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      {!isAuthPage && (
        <nav className="navbar-main desktop-only">
          <div className="container nav-container-flex">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <a 
                  href="#" 
                  className="nav-link-refined"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  <div className="nav-item-content">
                    {link.icon}
                    <span className="nav-label-text">{link.label}</span>
                    <ChevronDownSvg className="icon-tiny ml-1 opacity-70" />
                  </div>
                </a>
                {index < navLinks.length - 1 && <div className="nav-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu animate-fade">
          <div className="mobile-menu-content">
            <button 
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="mobile-login-btn"
            >
              <UserSvg className="icon-xs" />
              <span className="flex-1 text-left ml-2">LOGIN</span>
              <ChevronDownSvg className={`icon-xs transition-icon ${isLoginOpen ? 'is-rotated' : ''}`} />
            </button>

            {isLoginOpen && (
              <div className="mobile-login-options">
                {['Applicant', 'Department', 'Licensee', 'Lab Testing'].map((item) => (
                  <button 
                    key={item} 
                    className="mobile-login-option"
                    onClick={() => handleLoginOptionClick(item)}
                  >
                    <UserSvg className="mobile-login-icon" />
                    {item}
                  </button>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href="#" 
                className="mobile-nav-link"
               onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
