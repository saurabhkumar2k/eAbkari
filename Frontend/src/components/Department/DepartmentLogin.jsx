import React, {useState} from 'react';
import {
  ShieldSvg,
  UserSvg,
  LockSvg,
  ArrowRightSvg,
} from "../icons/GlobalIcons.jsx";
import DepartmentHeader from "../DepartmentHeader.jsx";

export default function DepartmentLogin({ onNavigateHome, onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedId = userId.trim();
    const cleanIdUpper = trimmedId.toUpperCase();

    // Check Password
    if (password !== 'Test@1234') {
      setError('Invalid password. Please enter the correct password (Test@1234).');
      return;
    }

    // Check User ID condition
    if (cleanIdUpper === 'DA') {
      if (onLoginSuccess) {
        onLoginSuccess('DA');
      } else {
        window.location.href = '/dadashboard';
      }
    } else if (cleanIdUpper === 'ADMIN') {
      if (onLoginSuccess) {
        onLoginSuccess('Admin');
      } else {
        window.location.href = '/departmentdashboard';
      }
    } else {
      setError("Invalid Officer ID. Enter 'DA' for DADashbord or 'Admin' for DepartmentDashboard.");
    }
  };

  const handleQuickFill = (id, pwd) => {
    setUserId(id);
    setPassword(pwd);
    setError('');
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs font-semibold rounded text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="dept-login-form">
              <div className="form-group">
                <label className="dept-input-label">Officer ID / Email</label>
                <div className="dept-input-wrapper">
                  <UserSvg className="dept-field-icon" />
                  <input 
                    type="text" 
                    className="dept-input-field" 
                    placeholder="Enter DA or Admin"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (error) setError('');
                    }}
                    required
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    required
                  />
                </div>
              </div>

              {/* Static Login Credentials Hint & Quick Fill
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 my-1">
                <div className="font-bold text-slate-700">Static Portal Access Credentials:</div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('DA', 'Test@1234')}
                    className="px-2 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold rounded border border-sky-300 transition-colors"
                  >
                    DA Login (ID: DA | Pass: Test@1234)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Admin', 'Test@1234')}
                    className="px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold rounded border border-indigo-300 transition-colors"
                  >
                    Admin Login (ID: Admin | Pass: Test@1234)
                  </button>
                </div>
              </div> */}

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
