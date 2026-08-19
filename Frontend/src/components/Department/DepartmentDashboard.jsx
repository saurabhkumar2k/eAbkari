import React, { useState, useEffect } from "react";
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
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  Edit2,
  Trash2
} from "lucide-react";
import OwnerTypeMaster from "./OwnerTypeMaster.jsx";
import LicenseTitleMaster from "./LicenseTitleMaster.jsx";
import UserCreation from "./UserCreation.jsx";
import UserHierarchy from "./UserHierarchy.jsx";

const DepartmentDashboard = ({
  onLogout,
  onNavigateToPermit,
  onNavigateToBrand,
  onNavigateToBottler,
  onNavigateToBrandOwner,
  onNavigateHome
}) => {
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const urlParams = new URLSearchParams(window.location.search);
  const activeDirectory = urlParams.get("directory");

  // Reset filter when directory changes
  useEffect(() => {
    setStatusFilter("all");
    setSearchTerm("");
  }, [activeDirectory]);

  const showInfoToast = (message) => {
    setToast({ type: "info", message });
    setTimeout(() => setToast(null), 4000);
  };

  const showSuccessToast = (message) => {
    setToast({ type: "success", message });
    setTimeout(() => setToast(null), 4000);
  };

  // Directories database
  const directoriesData = {
    "excise-license": {
      title: "Excise License Directory",
      description: "Search and view registered excise licenses, category status, and active validity periods.",
      headers: ["License Number", "Licensee Name", "Category", "Status", "Issue Date", "Expiry Date"],
      filters: ["All", "Active", "Suspended", "Expired"],
      items: [
        { id: "LIC-2026-0089", name: "Crown Beverage Retailers", cat: "L-2 (Retail Vend)", status: "Active", date1: "01/04/2026", date2: "31/03/2027" },
        { id: "LIC-2026-1142", name: "Indo-Global Distributors", cat: "L-1 (Wholesale)", status: "Active", date1: "15/04/2026", date2: "31/03/2027" },
        { id: "LIC-2025-9981", name: "Royal Plaza Hotel & Bar", cat: "L-15 (Hotel)", status: "Active", date1: "01/05/2025", date2: "30/04/2026" },
        { id: "LIC-2026-0453", name: "A-one Wines & Spirits", cat: "L-2 (Retail Vend)", status: "Suspended", date1: "12/04/2026", date2: "31/03/2027" },
        { id: "LIC-2024-8840", name: "Elite Club Tavern", cat: "L-17 (Restaurant)", status: "Expired", date1: "01/04/2024", date2: "31/03/2025" },
        { id: "LIC-2026-0742", name: "Capital Distilleries Ltd", cat: "L-1 (Wholesale)", status: "Active", date1: "20/05/2026", date2: "31/03/2027" }
      ]
    },
    "site-location": {
      title: "Site Location Directory",
      description: "Comprehensive registry of approved retail locations, warehouses, and storage depots.",
      headers: ["Location ID", "Site Name", "Address / Zone", "District", "Assigned License", "Status"],
      filters: ["All", "Approved", "Pending", "Non-Compliant"],
      items: [
        { id: "LOC-DEL-01", name: "Connaught Place Outlet", cat: "Zone 1 - Inner Circle", date1: "New Delhi", date2: "LIC-2026-0089", status: "Approved" },
        { id: "LOC-DEL-02", name: "Mayur Vihar Warehouse", cat: "Zone 4 - Industrial", date1: "East Delhi", date2: "LIC-2026-1142", status: "Approved" },
        { id: "LOC-DEL-03", name: "Saket Mall Lounge", cat: "Zone 9 - Commercial", date1: "South Delhi", date2: "LIC-2025-9981", status: "Approved" },
        { id: "LOC-DEL-04", name: "Rohini Sector-8 Store", cat: "Zone 12 - Suburb", date1: "North West", date2: "Pending Review", status: "Pending" },
        { id: "LOC-DEL-05", name: "Karol Bagh Depot", cat: "Zone 3 - Central", date1: "Central Delhi", date2: "Suspended", status: "Non-Compliant" }
      ]
    },
    "excise-location": {
      title: "Excise Location Directory",
      description: "Excise administrative offices, border verification gates, and customs checkpoints.",
      headers: ["Office Code", "Location Name", "Facility Type", "Officer in Charge", "Region", "Status"],
      filters: ["All", "Operational", "Intermittent", "Maintenance"],
      items: [
        { id: "EX-OFF-HQ", name: "Excise Commission HQ", cat: "Headquarters", date1: "I.P. Estate, Delhi", date2: "124 Officers", status: "Operational" },
        { id: "EX-GATE-01", name: "Singhu Border Checkpost", cat: "Verification Gate", date1: "N.H. 1 Corridor", date2: "32 Officers", status: "Operational" },
        { id: "EX-GATE-04", name: "Ghazipur Entry Point", cat: "Verification Gate", date1: "Delhi-UP Border", date2: "28 Officers", status: "Operational" },
        { id: "EX-DEP-BOND", name: "Okhla Bonded Warehouse", cat: "Customs Depot", date1: "Okhla Phase-III", date2: "45 Officers", status: "Operational" },
        { id: "EX-LAB-01", name: "Chemical Analysis Lab", cat: "Testing Facility", date1: "Moti Nagar, Delhi", date2: "12 Technicians", status: "Maintenance" }
      ]
    },
    "vehicle": {
      title: "Authorized Vehicle Directory",
      description: "Active transit vehicles authorized for bulk spirit or packaged liquor transport.",
      headers: ["Vehicle Number", "Transporter Name", "Transit Permit", "Capacity", "Assigned Route", "Status"],
      filters: ["All", "Online", "Offline", "Unscheduled"],
      items: [
        { id: "DL-1GA-4482", name: "Delhi Logistics Corp", cat: "TP-2026-9902", date1: "12,000 Litres", date2: "HQ to Connaught Place", status: "Online" },
        { id: "DL-1GB-7811", name: "Swift Carrier Services", cat: "TP-2026-3401", date1: "8,500 Litres", date2: "Okhla Depot to Saket", status: "Online" },
        { id: "HR-55A-9012", name: "Northern Bulk Carriers", cat: "TP-2026-0043", date1: "15,000 Litres", date2: "Haryana Border to Okhla", status: "Online" },
        { id: "DL-3CA-5561", name: "Super Speed Freight", cat: "None (Idle)", date1: "10,000 Litres", date2: "No Active Transit", status: "Offline" },
        { id: "UP-16T-3450", name: "Ghazipur Roadlines", cat: "TP-2026-8812", date1: "12,000 Litres", date2: "UP Border to Connaught", status: "Offline" }
      ]
    },
    "packaged-fl": {
      title: "Packaged FL Directory",
      description: "Directory of registered Foreign Liquor (FL) labels and batch registration catalog.",
      headers: ["Brand Name", "Origin", "SKU Size", "Registration Code", "ABV %", "Status"],
      filters: ["All", "Approved", "Renewal Due", "Inactive"],
      items: [
        { id: "Royal Stag Select", name: "India (Domestic)", cat: "750 ml", date1: "REG-FL-990", date2: "42.8%", status: "Approved" },
        { id: "Glenfiddich 12Y", name: "Scotland (Imported)", cat: "750 ml", date1: "REG-FL-112", date2: "40.0%", status: "Approved" },
        { id: "Absolut Vodka", name: "Sweden (Imported)", cat: "750 ml", date1: "REG-FL-554", date2: "40.0%", status: "Approved" },
        { id: "Bacardi Superior", name: "Puerto Rico", cat: "1000 ml", date1: "REG-FL-881", date2: "37.5%", status: "Renewal Due" },
        { id: "Jacob's Creek Shiraz", name: "Australia", cat: "750 ml", date1: "REG-FL-044", date2: "13.5%", status: "Approved" }
      ]
    },
    "others": {
      title: "Misc. Registry Directory",
      description: "Miscellaneous operational databases, security logs, and auxiliary department registers.",
      headers: ["Registry Name", "Reference Code", "Custodian Department", "Last Updated", "Active Entries", "Status"],
      filters: ["All", "Active", "Archived"],
      items: [
        { id: "Temporary Bar Permits", name: "REG-AUX-TBP", cat: "L-28 Licensing Wing", date1: "19/07/2026", date2: "412 Active Permits", status: "Active" },
        { id: "Label Sample Catalog", name: "REG-AUX-LSC", cat: "Excise Chemical Lab", date1: "18/07/2026", date2: "1,560 Registered Labels", status: "Active" },
        { id: "Transporter Blacklist", name: "REG-SEC-TBL", cat: "Enforcement Wing", date1: "05/06/2026", date2: "14 Banned Vehicles", status: "Active" },
        { id: "Legacy Records Index", name: "REG-HIS-LRI", cat: "Archives Division", date1: "12/12/2024", date2: "24,800 Paper Dossiers", status: "Archived" }
      ]
    }
  };

  const isDirectoryView = activeDirectory && directoriesData[activeDirectory];
  const dir = isDirectoryView ? directoriesData[activeDirectory] : null;

  // Filter items
  const filteredItems = dir
    ? dir.items.filter((item) => {
        const matchesSearch = Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus =
          statusFilter === "all" ||
          item.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
      })
    : [];

  return (
    <div className="dept-dashboard dept-dashboard-content-only">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`dept-toast ${
          toast.type === "success" ? "dept-toast-success" :
          toast.type === "error" ? "dept-toast-error" :
          "dept-toast-info"
        }`}>
          {toast.type === "success" && <CheckCircle2 className="dept-toast-icon-success" />}
          {toast.type === "error" && <AlertCircle className="dept-toast-icon-error" />}
          {toast.type === "info" && <Info className="dept-toast-icon-info" />}
          <span className="dept-toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="dept-toast-close">
            <X className="dept-toast-close-icon" />
          </button>
        </div>
      )}

      <div className="dept-dash-main">
        <div className="dept-dash-container">
          
          {activeDirectory === "owner-type" ? (
            <OwnerTypeMaster />
          ) : activeDirectory === "license-title" ? (
            <LicenseTitleMaster />
          ) : activeDirectory === "user-creation" || activeDirectory === "new-user-creation" ? (
            <UserCreation onBack={() => window.location.href = "/departmentdashboard"} />
           ) : activeDirectory === "flow-hierarchy" || activeDirectory === "user-hierarchy" ? (
            <UserHierarchy onBack={() => window.location.href = "/departmentdashboard"} />
          ) : isDirectoryView ? (
            /* DIRECTORY VIEW */
            <div className="dept-dir-container">
              
              {/* Back Bar */}
              <div className="dept-dir-back-bar">
                <div className="dept-dir-back-info">
                  <button
                    onClick={() => window.location.href = "/departmentdashboard"}
                    className="dept-dir-back-btn"
                    title="Back to Dashboard"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h1 className="dept-dir-title">{dir.title}</h1>
                    <p className="dept-dir-desc">{dir.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.location.href = "/departmentdashboard"}
                  className="dept-dir-action-btn"
                >
                  Back to Dashboard
                </button>
              </div>

              {/* Search and Filters panel */}
              <div className="dept-dir-panel">
                <div className="dept-dir-panel-content">
                  {/* Search Bar */}
                  <div className="dept-dir-search-wrap">
                    <Search className="dept-dir-search-icon" />
                    <input
                      type="text"
                      placeholder={`Search ${dir.title.toLowerCase()}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="dept-dir-search-input"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="dept-dir-search-clear"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Status Filters */}
                  <div className="dept-dir-filters">
                    <span className="dept-dir-filter-label">
                      <Filter className="h-3.5 w-3.5" /> Status:
                    </span>
                    {dir.filters.map((f) => (
                      <button
                        key={f}
                        onClick={() => setStatusFilter(f.toLowerCase())}
                        className={`dept-dir-filter-btn ${statusFilter === f.toLowerCase() ? "active" : ""}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="dept-dir-table-wrap">
                <div className="dept-dir-table-scroll">
                  <table className="dept-dir-table">
                    <thead>
                      <tr>
                        {dir.headers.map((h, i) => (
                          <th key={i}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={dir.headers.length} style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                            <div style={{ maxWidth: '20rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ height: '3rem', width: '3rem', borderRadius: '9999px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                                <Search style={{ height: '1.25rem', width: '1.25rem', color: '#94a3b8' }} />
                              </div>
                              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>No matching directories found</p>
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Try resetting the status filter or using different terms.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredItems.map((item, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 700, color: '#312e81', fontFamily: 'monospace' }}>
                              {item.id}
                            </td>
                            <td style={{ fontWeight: 600, color: '#1e293b' }}>
                              {item.name}
                            </td>
                            <td style={{ color: '#475569' }}>
                              {item.cat}
                            </td>
                            <td style={{ color: '#64748b' }}>
                              {item.date1}
                            </td>
                            <td style={{ color: '#475569', fontWeight: 500 }}>
                              {item.date2}
                            </td>
                            <td>
                              <span className={`dept-dir-badge ${
                                ["active", "approved", "operational", "online"].includes(item.status.toLowerCase())
                                  ? "badge-approved"
                                  : ["suspended", "pending", "intermittent", "renewal due", "maintenance"].includes(item.status.toLowerCase())
                                  ? "badge-pending"
                                  : "badge-rejected"
                              }`}>
                                <span className="dept-dir-badge-dot"></span>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Statistics Footer */}
                <div className="dept-dir-footer">
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    Showing {filteredItems.length} of {dir.items.length} total entries
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, fontFamily: 'monospace' }}>
                    SECURE_DIRECTORY_LEDGER_OK
                  </span>
                </div>
              </div>

            </div>
          ) : (
            /* STANDARD DASHBOARD CONTENT */
            <>
              {/* Welcome Banner */}
              <div className="dept-welcome-banner">
                
                <div className="welcome-banner-content">
                  <div className="welcome-icon-box">
                    <ClipboardList />
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
                <div className="welcome-banner-decor welcome-banner-decor-desktop">
                  <svg viewBox="0 0 400 280" className="welcome-banner-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <User />
                      </div>
                      <div className="admin-detail-info">
                        <span className="admin-detail-label">Name</span>
                        <span className="admin-detail-value">Administrator</span>
                      </div>
                    </div>

                    {/* Row 2: Designation */}
                    <div className="admin-detail-row">
                      <div className="admin-detail-icon-box">
                        <Briefcase />
                      </div>
                      <div className="admin-detail-info">
                        <span className="admin-detail-label">Designation</span>
                        <span className="admin-detail-value">System Administrator</span>
                      </div>
                    </div>

                    {/* Row 3: Pendency */}
                    <div className="admin-detail-row">
                      <div className="admin-detail-icon-box">
                        <Clock />
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
                      <Calendar />
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
                      <FileText />
                    </div>
                    <div className="stat-card-data">
                      <span className="stat-label">Pending Permits</span>
                      <span className="stat-value">42</span>
                      <button onClick={() => onNavigateToPermit()} className="stat-view-link">
                        Review Queue <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Registered Brands */}
                <div className="dept-stat-card card-green">
                  <div className="stat-card-inner">
                    <div className="stat-icon-circle">
                      <Tag />
                    </div>
                    <div className="stat-card-data">
                      <span className="stat-label">Registered Brands</span>
                      <span className="stat-value">156</span>
                      <button onClick={() => onNavigateToBrand()} className="stat-view-link">
                        View Brands <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Active Bottlers */}
                <div className="dept-stat-card card-orange">
                  <div className="stat-card-inner">
                    <div className="stat-icon-circle">
                      <Building2 />
                    </div>
                    <div className="stat-card-data">
                      <span className="stat-label">Active Bottlers</span>
                      <span className="stat-value">18</span>
                      <button onClick={() => onNavigateToBottler()} className="stat-view-link">
                        Manage Master <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Duty Collected */}
                <div className="dept-stat-card card-purple">
                  <div className="stat-card-inner">
                    <div className="stat-icon-circle">
                      <Coins />
                    </div>
                    <div className="stat-card-data">
                      <span className="stat-label">Excise Revenue</span>
                      <span className="stat-value">₹4.8 Cr</span>
                      <button onClick={() => showSuccessToast("Excise duty records up to date.")} className="stat-view-link">
                        Treasury Ledger <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default DepartmentDashboard;
