import React from 'react';
import {
  ShieldSvg,
  UserSvg,
  LockSvg,
  ArrowRightSvg,
} from "../icons/GlobalIcons.jsx";
import DepartmentHeader from "../DepartmentHeader.jsx";

export default function DepartmentLogin({ onNavigateHome, onLoginSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for login would go here
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="dept-login-page">
      <DepartmentHeader onNavigateHome={onNavigateHome} />
      <div className="dept-login-content-wrapper">
        <div className="dept-login-container">
        <div className="dept-login-card animate-scale-in">
          <div className="dept-login-header">
            <div className="dept-seal-wrapper">
              <ShieldSvg className="dept-shield-icon" />
            </div>
            <h1 className="dept-login-title">Department Portal</h1>
            <p className="dept-login-subtitle">Internal Access Only - Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="dept-login-form">
            <div className="form-group">
              <label className="dept-input-label">Officer ID / Email</label>
              <div className="dept-input-wrapper">
                <UserSvg className="dept-field-icon" />
                <input 
                  type="text" 
                  className="dept-input-field" 
                  placeholder="Enter your credentials"
                  readOnly 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="dept-input-label">Password</label>
              <div className="dept-input-wrapper">
                <LockSvg className="dept-field-icon" />
                <input 
                  type="password" 
                  className="dept-input-field" 
                  placeholder="••••••••"
                  readOnly 
                />
              </div>
            </div>

            <div className="dept-auth-options">
              <label className="dept-checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="label-text">Remember me</span>
              </label>
              <a href="#" className="dept-forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="dept-login-submit-btn">
              SIGN IN TO PORTAL
              <ArrowRightSvg className="icon-sm" />
            </button>
          </form>

          <div className="dept-login-footer">
            <button onClick={onNavigateHome} className="btn-back-home">
              Return to Public Portal
            </button>
          </div>
        </div>
        
        <div className="dept-security-warning">
          <p>WARNING: This system is for the use of authorized users only. Individuals using this computer system without authority, or in excess of their authority, are subject to having all of their activities on this system monitored and recorded by system personnel.</p>
        </div>
      </div>
    </div>
  </div>
  );
}
