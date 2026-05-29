import React from "react";
import {
  Users,
  FileText,
  Bell,
  Wallet,
  Settings,
  MessageSquare,
  User,
  ChevronRight,
  Hourglass,
  ClipboardList,
  LogOut,
  ArrowLeft
} from "lucide-react";

const DepartmentDashboard = ({ onLogout, onNavigateToPermit, onNavigateHome }) => {
  const stats = [
    {
      title: "Total States",
      value: "36",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Permits",
      value: "611",
      icon: <FileText className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Expiring Soon",
      value: "18",
      icon: <Hourglass className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      title: "Total Alerts",
      value: "18",
      icon: <Bell className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  const quickActions = [
    { label: "Directory Data", action: null },
    { label: "Permit/Pass", action: onNavigateToPermit },
    { label: "Licensee Data", action: null },
    { label: "Wallet", action: null },
    { label: "Feedback", action: null },
    { label: "House Keeping", action: null },
  ];

  const notifications = [
    {
      title: "New permit application received for Punjab.",
      time: "2 hours ago",
    },
    {
      title: "Export pass for Kerala is expiring in 3 days.",
      time: "5 hours ago",
    },
    {
      title: "EO requirement updated for Karnataka.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* TOP SUB-HEADER BAR */}
        <div className="flex items-center justify-between pb-4 border-b border-sidebar-line">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest py-2 px-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer transition shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white uppercase tracking-widest border-none py-2 px-3.5 rounded-lg cursor-pointer transition select-none shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* TOP SECTION */}
        <div className="top-grid">

          {/* WELCOME CARD */}
          <div className="dashboard-card welcome-banner">
            <div className="welcome-content">

              {/* LEFT CONTENT */}
              <div className="welcome-left">
                <div className="welcome-icon">
                  <ClipboardList className="w-10 h-10" />
                </div>

                <div>
                  <h1 className="welcome-title">
                    Welcome back, Administrator 👋
                  </h1>

                  <p className="welcome-description">
                    Manage Import Permit-cum-Pass and excise
                    operations efficiently and transparently.
                  </p>
                </div>
              </div>
               
              {/* RIGHT IMAGE */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/India_Gate_in_New_Delhi_03-2016.jpg/640px-India_Gate_in_New_Delhi_03-2016.jpg"
                alt="India Gate"
                className="welcome-image"
              />
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="dashboard-card quick-actions">
            <h2 className="section-title">
              Quick Actions
            </h2>

            <div className="quick-action-list">
              {quickActions.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action || undefined}
                  className="quick-action-btn"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {stats.map((item, index) => {
            let bgClass = "";
            if (item.bg === "bg-blue-100") bgClass = "blue-bg";
            else if (item.bg === "bg-green-100") bgClass = "green-bg";
            else if (item.bg === "bg-orange-100") bgClass = "orange-bg";
            else if (item.bg === "bg-purple-100") bgClass = "purple-bg";

            return (
              <div
                key={index}
                className="dashboard-card stat-card"
              >
                <div className="stat-top">
                  <div className={`stat-icon ${bgClass}`}>
                    {item.icon}
                  </div>

                  <button className="view-link" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                    View all →
                  </button>
                </div>

                <div>
                  <p className="stat-title">
                    {item.title}
                  </p>

                  <h3 className="stat-value">
                    {item.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-grid">

          {/* PROFILE */}
          <div className="dashboard-card profile-card">
            <div className="profile-header">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                My Profile
              </h2>
            </div>

            <div className="profile-body">

              {/* AVATAR */}
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  <User className="w-14 h-14 text-white" />
                </div>
                <span className="profile-status"></span>
              </div>

              {/* DETAILS */}
              <div className="profile-details">
                {[
                  {
                    label: "Name",
                    value: "Administrator",
                  },
                  {
                    label: "Designation",
                    value: "System Administrator",
                  },
                  {
                    label: "Pendency",
                    value: "611",
                    blue: true,
                  },
                  {
                    label: "Last Logged In",
                    value: "May 14, 2026 12:18 PM",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="profile-row"
                  >
                    <span className="profile-label">
                      {item.label}
                    </span>

                    <span
                      className={`profile-value ${
                        item.blue ? "profile-blue" : ""
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="dashboard-card notifications-card">
            <div className="notifications-header">
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Recent Notifications
              </h2>

              <button className="view-link" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                View All
              </button>
            </div>

            <div className="notification-list">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="notification-item"
                >
                  <div className="notification-icon">
                    <Bell className="w-6 h-6" />
                  </div>

                  <div>
                    <p className="notification-title">
                      {item.title}
                    </p>

                    <span className="notification-time">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;