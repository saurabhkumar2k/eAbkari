import React from 'react';

const DepartmentHeader = ({ onNavigateHome }) => {
  return (
    <header className="dept-header">
      <div className="container dept-header-content">
        <div className="dept-brand" onClick={onNavigateHome}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Emblem of India"
            className="brand-logo-img"
          />
          <div className="dept-brand-info">
            <h1 className="dept-header-title">Department of Excise</h1>
            <p className="dept-header-subtitle">Government of NCT of Delhi</p>
          </div>
        </div>
        <div className="dept-portal-badge">
          <span className="badge-dot"></span>
          OFFICIAL PORTAL
        </div>
      </div>
    </header>
  );
};

export default DepartmentHeader;
