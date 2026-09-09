import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Home, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import {
  ShieldSvg,
  UserSvg,
  LockSvg,
  HeadphonesSvg,
  GlobeSvg,
  ChevronDownSvg,
  EyeSvg
} from "../icons/GlobalIcons.jsx";

import DepartmentHeader from "../DepartmentHeader.jsx";



const DEPT_LOGIN_API_URL = 'http://localhost:5214/api/Login/DeptLogin';
export default function DepartmentLogin({ onNavigateHome, onLoginSuccess }) {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedId = userId.trim();
    const cleanIdUpper = trimmedId.toUpperCase();
    try {
      const response = await fetch(DEPT_LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userId.trim(),
          password: password.trim()
        })
      });




      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      console.log("API Response:", data);

      // // Check Password
      // if (password !== 'Test@1234') {
      //   setError('Invalid password. Please enter the correct password (Test@1234).');
      //   return;
      // }

      // Check User ID condition
      if (data.userRole.toUpperCase() === 'DA') {
        if (onLoginSuccess) {
          onLoginSuccess('DA');
        } else {
          window.location.href = '/dadashboard';
        }
      } else if (data.userRole.toUpperCase() === 'ADMIN') {
        if (onLoginSuccess) {
          onLoginSuccess('Admin');
        } else {
          window.location.href = '/departmentdashboard';
        }
      } else {
        setError("Invalid Officer ID. Enter 'DA' for DADashboard or 'Admin' for DepartmentDashboard.");
      }
    } catch (error) {

    }
    //API Call

  };

  const handleQuickFill = (id, pwd) => {
    setUserId(id);
    setPassword(pwd);
    setError('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left Side: Department Branding & Information */}
        <div className="login-info-panel">
          <div className="login-info-content">
            <div className="login-dept-header">
              <div className="login-dept-box">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="Emblem of India"
                  className="login-emblem"
                />
                <div>
                  <h2 className="login-dept-title">Department of Excise</h2>
                  <p className="login-dept-subtitle">Government of NCT of Delhi</p>
                </div>
              </div>
            </div>

            <div className="welcome-section">
              {/* <div className="licensee-portal-tag">
                <ShieldCheck className="licensee-sparkle-icon" />
                <span>eAbkari Official Officer Portal</span>
              </div> */}
              <h1 className="welcome-title">Department Portal</h1>
              <p className="welcome-subtitle">
                Official internal administrative access for authorized excise officers, dealing assistants, and statutory authorities.
              </p>
              <div className="welcome-line" />
            </div>

            <div className="info-feature-list">
              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <ShieldSvg className="icon-md" />
                </div>
                <div>
                  <h3 className="feature-title-white">Authorized &amp; Monitored Access</h3>
                  <p className="feature-desc-white">Restricted departmental access with role-based security and audit logs</p>
                </div>
              </div>
              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <UserSvg className="icon-md" />
                </div>
                <div>
                  <h3 className="feature-title-white">Dealing Assistant &amp; Admin Workflows</h3>
                  <p className="feature-desc-white">Dedicated portals for application processing, verification, and approvals</p>
                </div>
              </div>
              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <HeadphonesSvg className="icon-md" />
                </div>
                <div>
                  <h3 className="feature-title-white">Internal Department Helpdesk</h3>
                  <p className="feature-desc-white">Dedicated technical support for excise officers and zonal administrators</p>
                </div>
              </div>
            </div>
          </div>

          <div className="login-info-footer">
            <p className="login-footer-text">© 2024 Department of Excise, Government of NCT of Delhi. All rights reserved.</p>
          </div>

          {/* Decorative Background Image */}
          <img
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1000"
            alt="Central Secretariat"
            className="login-panel-bg"
          />
          <div className="login-panel-overlay" />
        </div>

        {/* Right Side: Department Form Panel */}
        <div className="login-form-panel">
          <div className="licensee-top-bar">
            <button type="button" className="licensee-home-btn" onClick={onNavigateHome} >
              <Home className="licensee-home-icon" />
              <span>Home</span>
            </button>
            <div className="licensee-top-actions">
              <button type="button" className="lang-btn">
                <GlobeSvg className="icon-xs" />
                <span>English</span>
                <ChevronDownSvg className="icon-xs" />
              </button>
            </div>
          </div>

          <div className="login-form-container">
            <div className="login-form-box">
              <div className="form-header-icon-circle">
                <ShieldSvg className="icon-lg login-color-primary" />
              </div>

              <h1 className="login-form-title">Department Login</h1>
              <p className="login-form-subtitle">Internal Access Only - Authorized Personnel Only</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form className="login-form-fields" onSubmit={handleSubmit}>
                <div className="dept-input-wrapper">
                  <UserSvg className="dept-field-icon" />
                  <input
                    id='userId'
                    type="text"
                    className="dept-input-field"
                    placeholder=""
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (error) setError('');
                    }}
                    required
                  />
                  <label htmlFor="userId">User ID</label>
                </div>

                <div className="form-field">
                    <div className="dept-input-wrapper">
                      <LockSvg className="dept-field-icon" />
                      <input  id='Password' type={showPassword ? 'text' : 'password'} className="dept-input-field" placeholder="" value={password} 
                      onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }} required/>
                          <label htmlFor="Password">Password</label>
                        <button type="button" className="password-toggle-btn" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? (
                      <EyeSvg className="icon-sm" />
                      ) : (
                      <EyeSvg className="icon-sm" />
                      )}
                   </button>
                   </div>
                </div>

                {/* Static Credentials Quick Fill Helper Box */}
                {/* <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 my-1">
                  <div className="font-semibold text-slate-700 flex items-center justify-between text-[11px]">
                    <span>Static Portal Access Credentials:</span>
                    <span className="text-[10px] text-slate-500 font-normal">Click to fill</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('DA', 'Test@1234')}
                      className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold rounded border border-sky-200 transition-colors text-left"
                    >
                      <div className="text-[10px] text-sky-600 font-normal">Dealing Assistant</div>
                      <div>ID: DA | Test@1234</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickFill('Admin', 'Test@1234')}
                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded border border-indigo-200 transition-colors text-left"
                    >
                      <div className="text-[10px] text-indigo-600 font-normal">Excise Admin</div>
                      <div>ID: Admin | Test@1234</div>
                    </button>
                  </div>
                </div> */}

                <div className="login-options-row">
                  <label className="checkbox-flex-label">
                    <input
                      type="checkbox"
                      className="reg-checkbox-small"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => alert("For official password reset, please contact the Excise Department System Administrator.")}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="login-btn-submit"
                >
                  <LockSvg className="icon-xs margin-right-small" />
                  SIGN IN TO DEPARTMENT PORTAL
                </button>

                {/* <div className="divider-container">
                  <div className="divider-line-box">
                    <div className="divider-line"></div>
                  </div>
                  <div className="divider-text-box">
                    <span className="divider-text">OR</span>
                  </div>
                </div> */}

                {/* <button
                  type="button"
                  className="login-btn-new-account"
                  onClick={onNavigateHome}
                >
                  Return to Public Portal
                </button> */}
              </form>
            </div>

            <div className="gov-seal-footer">
              <div className="gov-seal-box">
                <ShieldSvg className="icon-sm login-color-primary" />
                <div>
                  <h4 className="gov-footer-title">Official Departmental Gateway</h4>
                  <p className="gov-footer-desc">Restricted internal system for authorized Government of NCT of Delhi officers.</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-2 max-w-[440px] leading-relaxed">
              WARNING: This system is for the use of authorized users only. Unauthorized access is prohibited and subject to monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
