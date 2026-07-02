import React, { useState } from "react";
import {
  FileText,
  Tag,
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Coins,
  Building2,
  User,
  Briefcase,
  Clock,
  Calendar
} from "lucide-react";

const DepartmentDashboard = ({
  onLogout,
  onNavigateToPermit,
  onNavigateToBrand,
  onNavigateToBottler,
  onNavigateToBrandOwner,
  onNavigateHome
}) => {
  const [toast, setToast] = useState(null);

  const showInfoToast = (message) => {
    setToast({ type: "info", message });
    setTimeout(() => setToast(null), 4000);
  };

  const showSuccessToast = (message) => {
    setToast({ type: "success", message });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="dept-dashboard dept-dashboard-content-only">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border animate-bounce duration-300 ${
          toast.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
          toast.type === "error" ? "bg-rose-50 text-rose-800 border-rose-200" :
          "bg-blue-50 text-blue-800 border-blue-200"
        }`}>
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-3 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="dept-dash-main">
        <div className="dept-dash-container">
          
          {/* Welcome Banner */}
          <div className="dept-welcome-banner">
            
            <div className="welcome-banner-content">
              <div className="welcome-icon-box">
                <ClipboardList className="w-8 h-8" />
              </div>
              <div>
                <h1 className="welcome-heading">
                  Welcome back, Administrator 👋
                </h1>
                <p className="welcome-subtext">
                  Manage Import Permit-cum-Pass and excise operations efficiently, securely, and transparently.
                </p>
              </div>
            </div>

            {/* Computer Screen Illustration Mockup */}
            <div className="welcome-banner-decor hidden md:block">
              <svg viewBox="0 0 400 280" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="200" cy="245" rx="100" ry="8" fill="#e2e8f0" />
                <path d="M160 245 C 160 235, 240 235, 240 245 Z" fill="#cbd5e1" />
                <rect x="185" y="195" width="30" height="45" fill="#e2e8f0" rx="4" />
                
                <rect x="80" y="40" width="240" height="160" rx="12" fill="#cbd5e1" />
                <rect x="85" y="45" width="230" height="15" fill="#f1f5f9" rx="2" />
                <circle cx="95" cy="52.5" r="3" fill="#ef4444" />
                <circle cx="103" cy="52.5" r="3" fill="#f59e0b" />
                <circle cx="111" cy="52.5" r="3" fill="#10b981" />
                
                <rect x="92" y="68" width="40" height="115" rx="4" fill="#e2e8f0" />
                <rect x="97" y="76" width="30" height="6" rx="2" fill="#94a3b8" />
                <rect x="97" y="88" width="30" height="6" rx="2" fill="#cbd5e1" />
                <rect x="97" y="100" width="30" height="6" rx="2" fill="#cbd5e1" />
                <rect x="97" y="112" width="30" height="6" rx="2" fill="#cbd5e1" />
                
                <rect x="140" y="68" width="100" height="8" rx="3" fill="#cbd5e1" />
                <rect x="245" y="68" width="60" height="8" rx="3" fill="#e2e8f0" />
                
                <rect x="140" y="88" width="105" height="95" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <rect x="155" y="148" width="12" height="25" rx="2" fill="#3b82f6" />
                <rect x="172" y="133" width="12" height="40" rx="2" fill="#60a5fa" />
                <rect x="189" y="118" width="12" height="55" rx="2" fill="#93c5fd" />
                <rect x="206" y="138" width="12" height="35" rx="2" fill="#cbd5e1" />
                <rect x="223" y="128" width="12" height="45" rx="2" fill="#f1f5f9" />
                
                <rect x="250" y="88" width="55" height="55" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="277.5" cy="115.5" r="16" stroke="#e2e8f0" strokeWidth="6" />
                <circle cx="277.5" cy="115.5" r="16" stroke="#3b82f6" strokeWidth="6" strokeDasharray="60 100" strokeDashoffset="20" />
                <circle cx="277.5" cy="115.5" r="16" stroke="#60a5fa" strokeWidth="6" strokeDasharray="30 100" strokeDashoffset="80" />
                
                <rect x="250" y="148" width="55" height="35" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <rect x="258" y="156" width="38" height="5" rx="2" fill="#e2e8f0" />
                <rect x="258" y="166" width="28" height="5" rx="2" fill="#cbd5e1" />
                
                <g filter="drop-shadow(0px 8px 16px rgba(15, 23, 42, 0.08))">
                  <rect x="25" y="110" width="70" height="50" rx="10" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1" />
                  <circle cx="45" cy="135" r="10" fill="#3b82f6" />
                  <path d="M41 135 L44 138 L50 131" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="62" y="128" width="24" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="62" y="138" width="16" height="4" rx="2" fill="#e2e8f0" />
                </g>
              </svg>
            </div>

          </div>

          {/* Admin Details Section */}
          <div className="admin-details-card">
            <div className="admin-details-grid">
              
              {/* Left Column: Admin details list */}
              <div className="admin-details-list">
                
                {/* Row 1: Name */}
                <div className="admin-detail-row">
                  <div className="admin-detail-icon-box">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="admin-detail-info">
                    <span className="admin-detail-label">Name</span>
                    <span className="admin-detail-value">Administrator</span>
                  </div>
                </div>

                {/* Row 2: Designation */}
                <div className="admin-detail-row">
                  <div className="admin-detail-icon-box">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="admin-detail-info">
                    <span className="admin-detail-label">Designation</span>
                    <span className="admin-detail-value">System Administrator</span>
                  </div>
                </div>

                {/* Row 3: Pendency */}
                <div className="admin-detail-row">
                  <div className="admin-detail-icon-box">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="admin-detail-info">
                    <span className="admin-detail-label">Pendency</span>
                    <button 
                      onClick={() => {
                        if (onNavigateToPermit) onNavigateToPermit();
                        else showInfoToast("Loading Pending Permits Queue...");
                      }}
                      className="admin-detail-link"
                    >
                      620
                    </button>
                  </div>
                </div>

              </div>

              {/* Vertical Divider */}
              <div className="admin-details-divider" />

              {/* Right Column: Last Log In */}
              <div className="admin-login-info">
                <div className="admin-login-icon-box">
                  <Calendar className="w-7 h-7" />
                </div>
                <div className="admin-login-text-group">
                  <span className="admin-login-label">Last Log In</span>
                  <span className="admin-login-time">Jul 1 2026 &nbsp;12:43 PM</span>
                </div>
              </div>

            </div>
          </div>

          {/* Stats Grid */}
          <div className="dept-stats-grid">
            
            {/* 1. Pending Permits */}
            <div className="dept-stat-card card-blue">
              <div className="stat-card-inner">
                <div className="stat-icon-circle">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="stat-card-data">
                  <span className="stat-label">Pending Permits</span>
                  <span className="stat-value">42</span>
                  <button onClick={() => onNavigateToPermit()} className="stat-view-link">
                    Review Queue <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Registered Brands */}
            <div className="dept-stat-card card-green">
              <div className="stat-card-inner">
                <div className="stat-icon-circle">
                  <Tag className="w-6 h-6" />
                </div>
                <div className="stat-card-data">
                  <span className="stat-label">Registered Brands</span>
                  <span className="stat-value">156</span>
                  <button onClick={() => onNavigateToBrand()} className="stat-view-link">
                    View Brands <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Active Bottlers */}
            <div className="dept-stat-card card-orange">
              <div className="stat-card-inner">
                <div className="stat-icon-circle">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="stat-card-data">
                  <span className="stat-label">Active Bottlers</span>
                  <span className="stat-value">18</span>
                  <button onClick={() => onNavigateToBottler()} className="stat-view-link">
                    Manage Master <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Duty Collected */}
            <div className="dept-stat-card card-purple">
              <div className="stat-card-inner">
                <div className="stat-icon-circle">
                  <Coins className="w-6 h-6" />
                </div>
                <div className="stat-card-data">
                  <span className="stat-label">Excise Revenue</span>
                  <span className="stat-value">₹4.8 Cr</span>
                  <button onClick={() => showSuccessToast("Excise duty records up to date.")} className="stat-view-link">
                    Treasury Ledger <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default DepartmentDashboard;
