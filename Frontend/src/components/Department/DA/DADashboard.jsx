import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  FileText,
  X,
  ChevronRight,
  User,
  Briefcase,
  Calendar,
  Info,
} from "lucide-react";
import DAHeader from "./DAHeader.jsx";
import PullApplication from "./PullApplication.jsx";
import ActOnNewLicenseApplication from "./ActOnNewLicenseApplication.jsx";

const INITIAL_DA_APPLICATIONS = [
  {
    id: "APP-EX-2026-0841",
    status: "Pending Scrutiny",
  },
  {
    id: "APP-EX-2026-0842",
    status: "Pending Scrutiny",
  },
  {
    id: "APP-EX-2026-0843",
    status: "Query Raised",
  },
  {
    id: "APP-EX-2026-0844",
    status: "Pending Scrutiny",
  },
  {
    id: "APP-EX-2026-0845",
    status: "Forwarded to AC",
  },
  {
    id: "APP-EX-2026-0846",
    status: "Pending Scrutiny",
  },
  {
    id: "APP-EX-2026-0847",
    status: "Pending Scrutiny",
  },
];

export default function DADashbord({ onLogout, onNavigateHome }) {
  const [applications] = useState(INITIAL_DA_APPLICATIONS);
  const [activeMenu, setActiveMenu] = useState("home");
  const [activeSubMenu, setActiveSubMenu] = useState("da_dashboard");

  const handleMenuSelect = (menuId, subItemId) => {
    setActiveMenu(menuId);
    setActiveSubMenu(subItemId);
  };

  const pendingCount = applications.filter(
    (a) => a.status === "Pending Scrutiny",
  ).length;
  const queryCount = applications.filter(
    (a) => a.status === "Query Raised",
  ).length;
  const forwardedCount = applications.filter(
    (a) => a.status === "Forwarded to AC",
  ).length;

  return (
    <div className="dept-dashboard">
      {/* Header Navigation matching Department Portal Header */}
      <DAHeader
        activeMenu={activeMenu}
        onSelectMenu={handleMenuSelect}
        onLogout={onLogout}
        onNavigateHome={onNavigateHome}
      />

      {activeSubMenu === "pull_application" ||
      activeMenu === "pull_application" ? (
        <div className="dept-dash-main bg-slate-100 min-h-screen">
          <PullApplication />
        </div>
      ) : activeSubMenu === "act_on_new_license_application" ||
        activeMenu === "act_on_new_license_application" ? (
        <div className="dept-dash-main bg-slate-100 min-h-screen">
          <ActOnNewLicenseApplication />
        </div>
      ) : (
        <div className="dept-dash-main">
          <div className="dept-dash-container">
            {/* Welcome Banner matching Department Dashboard */}
            <div className="dept-welcome-banner">
              <div className="welcome-banner-content">
                <div className="welcome-icon-box">
                  <ClipboardCheck size={32} />
                </div>
                <div>
                  <h1 className="welcome-heading">
                    Welcome back, Dealing Assistant 👋
                  </h1>
                  <p className="welcome-subtext">
                    Excise Department, Govt. of NCT of Delhi — Official
                    Application Scrutiny & Verification Portal
                  </p>
                </div>
              </div>

              {/* Computer Screen Illustration Mockup */}
              <div className="welcome-banner-decor welcome-banner-decor-desktop">
                <svg
                  viewBox="0 0 400 280"
                  className="welcome-banner-svg"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="200" cy="245" rx="100" ry="8" fill="#e2e8f0" />
                  <path
                    d="M160 245 C 160 235, 240 235, 240 245 Z"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="185"
                    y="195"
                    width="30"
                    height="45"
                    fill="#e2e8f0"
                    rx="4"
                  />

                  <rect
                    x="80"
                    y="40"
                    width="240"
                    height="160"
                    rx="12"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="85"
                    y="45"
                    width="230"
                    height="15"
                    fill="#f1f5f9"
                    rx="2"
                  />
                  <circle cx="95" cy="52.5" r="3" fill="#ef4444" />
                  <circle cx="103" cy="52.5" r="3" fill="#f59e0b" />
                  <circle cx="111" cy="52.5" r="3" fill="#10b981" />

                  <rect
                    x="92"
                    y="68"
                    width="40"
                    height="115"
                    rx="4"
                    fill="#e2e8f0"
                  />
                  <rect
                    x="97"
                    y="76"
                    width="30"
                    height="6"
                    rx="2"
                    fill="#94a3b8"
                  />
                  <rect
                    x="97"
                    y="88"
                    width="30"
                    height="6"
                    rx="2"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="97"
                    y="100"
                    width="30"
                    height="6"
                    rx="2"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="97"
                    y="112"
                    width="30"
                    height="6"
                    rx="2"
                    fill="#cbd5e1"
                  />

                  <rect
                    x="140"
                    y="68"
                    width="100"
                    height="8"
                    rx="3"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="245"
                    y="68"
                    width="60"
                    height="8"
                    rx="3"
                    fill="#e2e8f0"
                  />

                  <rect
                    x="140"
                    y="88"
                    width="105"
                    height="95"
                    rx="6"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <rect
                    x="155"
                    y="148"
                    width="12"
                    height="25"
                    rx="2"
                    fill="#3b82f6"
                  />
                  <rect
                    x="172"
                    y="133"
                    width="12"
                    height="40"
                    rx="2"
                    fill="#60a5fa"
                  />
                  <rect
                    x="189"
                    y="118"
                    width="12"
                    height="55"
                    rx="2"
                    fill="#93c5fd"
                  />
                  <rect
                    x="206"
                    y="138"
                    width="12"
                    height="35"
                    rx="2"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="223"
                    y="128"
                    width="12"
                    height="45"
                    rx="2"
                    fill="#f1f5f9"
                  />

                  <rect
                    x="250"
                    y="88"
                    width="55"
                    height="55"
                    rx="6"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <circle
                    cx="277.5"
                    cy="115.5"
                    r="16"
                    stroke="#e2e8f0"
                    strokeWidth="6"
                  />
                  <circle
                    cx="277.5"
                    cy="115.5"
                    r="16"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    strokeDasharray="60 100"
                    strokeDashoffset="20"
                  />
                  <circle
                    cx="277.5"
                    cy="115.5"
                    r="16"
                    stroke="#60a5fa"
                    strokeWidth="6"
                    strokeDasharray="30 100"
                    strokeDashoffset="80"
                  />

                  <rect
                    x="250"
                    y="148"
                    width="55"
                    height="35"
                    rx="6"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <rect
                    x="258"
                    y="156"
                    width="38"
                    height="5"
                    rx="2"
                    fill="#e2e8f0"
                  />
                  <rect
                    x="258"
                    y="166"
                    width="28"
                    height="5"
                    rx="2"
                    fill="#cbd5e1"
                  />

                  <g filter="drop-shadow(0px 8px 16px rgba(15, 23, 42, 0.08))">
                    <rect
                      x="25"
                      y="110"
                      width="70"
                      height="50"
                      rx="10"
                      fill="#ffffff"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <circle cx="45" cy="135" r="10" fill="#3b82f6" />
                    <path
                      d="M41 135 L44 138 L50 131"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="62"
                      y="128"
                      width="24"
                      height="4"
                      rx="2"
                      fill="#cbd5e1"
                    />
                    <rect
                      x="62"
                      y="138"
                      width="16"
                      height="4"
                      rx="2"
                      fill="#e2e8f0"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Officer Details Section matching Department Dashboard */}
            <div className="admin-details-card">
              <div className="admin-details-grid">
                {/* Left Column: Officer details */}
                <div className="admin-details-list">
                  <div className="admin-detail-row">
                    <div className="admin-detail-icon-box">
                      <User size={20} />
                    </div>
                    <div className="admin-detail-info">
                      <span className="admin-detail-label">Officer</span>
                      <span className="admin-detail-value">
                        Scrutiny Officer
                      </span>
                    </div>
                  </div>

                  <div className="admin-detail-row">
                    <div className="admin-detail-icon-box">
                      <Briefcase size={20} />
                    </div>
                    <div className="admin-detail-info">
                      <span className="admin-detail-label">Designation</span>
                      <span className="admin-detail-value">
                        Dealing Assistant (DA)
                      </span>
                    </div>
                  </div>

                  <div className="admin-detail-row">
                    <div className="admin-detail-icon-box">
                      <Clock size={20} />
                    </div>
                    <div className="admin-detail-info">
                      <span className="admin-detail-label">Pendency</span>
                      <span
                        className="admin-detail-value"
                        style={{ color: "#2563eb" }}
                      >
                        {pendingCount} Pending Scrutiny
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="admin-details-divider" />

                {/* Right Column: Last Log In */}
                <div className="admin-login-info">
                  <div className="admin-login-icon-box">
                    <Calendar size={24} />
                  </div>
                  <div className="admin-login-text-group">
                    <span className="admin-login-label">Last Log In</span>
                    <span className="admin-login-time">
                      Aug 4 2026 &nbsp;09:30 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid matching Department Dashboard */}
            <div className="dept-stats-grid">
              {/* 1. Pending Scrutiny */}
              <div className="dept-stat-card card-orange">
                <div className="stat-card-inner">
                  <div className="stat-icon-circle">
                    <Clock size={24} />
                  </div>
                  <div className="stat-card-data">
                    <span className="stat-label">Pending Scrutiny</span>
                    <span className="stat-value">{pendingCount}</span>
                    <button className="stat-view-link">
                      Action Required <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Queries Raised */}
              <div className="dept-stat-card card-purple">
                <div className="stat-card-inner">
                  <div className="stat-icon-circle">
                    <HelpCircle size={24} />
                  </div>
                  <div className="stat-card-data">
                    <span className="stat-label">Queries Raised</span>
                    <span className="stat-value">{queryCount}</span>
                    <button className="stat-view-link">
                      Awaiting Applicant <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Forwarded to AC */}
              <div className="dept-stat-card card-green">
                <div className="stat-card-inner">
                  <div className="stat-icon-circle">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="stat-card-data">
                    <span className="stat-label">Forwarded to AC</span>
                    <span className="stat-value">{forwardedCount}</span>
                    <button className="stat-view-link">
                      Scrutiny Passed <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Total Applications */}
              <div className="dept-stat-card card-blue">
                <div className="stat-card-inner">
                  <div className="stat-icon-circle">
                    <FileText size={24} />
                  </div>
                  <div className="stat-card-data">
                    <span className="stat-label">Total Applications</span>
                    <span className="stat-value">{applications.length}</span>
                    <button className="stat-view-link">
                      All Records <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
