import React, { useState } from "react";
import NewLicense from "./NewLicense.jsx";
import {
  Home,
  Award,
  FlaskConical,
  Store,
  Settings,
  User,
  Bell,
  FileCheck,
  Building,
  ShieldCheck,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  LogOut,
  Calendar,
  FileText,
  Upload,
  RefreshCw,
  Plus,
  Compass,
  CheckCircle2,
  Info,
  ShieldAlert
} from "lucide-react";


const menuItems = [
  { id: "Home", label: "Home", icon: Home },
  { id: "License", label: "License", icon: Award },
  { id: "MTP", label: "M&TP", icon: FlaskConical },
  { id: "Dealer", label: "Dealer", icon: Store },
  { id: "Premise", label: "Premise", icon: Building },
  { id: "Profile", label: "Profile & Settings", icon: Settings },
];

const statsData = [
  {
    title: "Applications",
    value: "12",
    icon: FileCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Licenses",
    value: "02",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Premises",
    value: "03",
    icon: Building,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Alerts",
    value: "05",
    icon: Bell,
    color: "bg-purple-100 text-purple-600",
  },
];

const licenses = [
  {
    id: "ND-25-L10023",
    type: "Wholesale Foreign Liquor",
    status: "Approved",
    location: "Model Town Warehouse",
  },
  {
    id: "ND-25-L22099",
    type: "Club Bar License",
    status: "Under Review",
    location: "Connaught Place",
  },
];

/* =========================
   REUSABLE COMPONENTS
========================= */

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="section-title">
        {title}
      </h2>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="dashboard-card stat-card">
      <div className="stat-top">
        <div
          className={`stat-icon ${item.color}`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <span className="view-btn">
          View →
        </span>
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
};

const LicenseCard = ({ license }) => {
  return (
    <div className="license-card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="license-badge badge-blue">
              {license.id}
            </span>

            <span
              className={`license-badge ${
                license.status === "Approved"
                  ? "badge-green"
                  : "badge-amber"
              }`}
            >
              {license.status}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-800" style={{ marginTop: "12px" }}>
            {license.type}
          </h3>

          <p className="text-sm text-slate-500">
            {license.location}
          </p>
        </div>

        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition border-none cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

const Header = ({ activeTab, setActiveTab, onLogout, onNavigateToHome }) => {
  const [licenseDropdownOpen, setLicenseDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mtpDropdownOpen, setMtpDropdownOpen] = useState(false);
  const [dealerDropdownOpen, setDealerDropdownOpen] = useState(false);
  const [premiseDropdownOpen, setPremiseDropdownOpen] = useState(false);

  const isLicenseActive = activeTab === "License" || [
    "New License",
    "Applied License",
    "Renewal License",
    "License Transfer",
    "Document Revalidate"
  ].includes(activeTab);

  const isProfileActive = activeTab === "Profile" || [
    "UserProfile",
    "ChangePassword"
  ].includes(activeTab);

  const isMtpActive = activeTab === "MTP" || [
    "New M&TP",
    "Applied M&TP"
  ].includes(activeTab);

  const isDealerActive = activeTab === "Dealer" || [
    "Dealer Registration",
    "Applied Dealers"
  ].includes(activeTab);

  const isPremiseActive = activeTab === "Premise" || [
    "Register Premise",
    "Applied Premise",
    "New Permit",
    "Applied Permit"
  ].includes(activeTab);

  const licenseSubItems = [
    "New License",
    "Applied License",
    "Renewal License",
    "License Transfer",
    "Document Revalidate"
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        

        {/* Tier 1: Brand & Back Navigation */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-4">
          <div className="flex items-center gap-4 py-1">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India"
              className="h-12 sm:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="h-10 sm:h-12 w-[1px] bg-slate-200"></div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Department of Excise
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold tracking-wide">
                Government of NCT of Delhi
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest py-1.5 px-3 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer transition select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portal</span>
          </button>
        </div>

        {/* Tier 2: Beautiful Centered Horizontal Navigation with exact button size */}
        <div className="w-full py-1">
          <div className="flex items-center justify-center gap-3 mx-auto" style={{ width: "max-content", minWidth: "100%" }}>
            <div className="flex items-center gap-3 justify-center w-full">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === "License" 
                  ? isLicenseActive 
                  : item.id === "Profile"
                    ? isProfileActive
                    : item.id === "MTP"
                      ? isMtpActive
                      : item.id === "Dealer"
                        ? isDealerActive
                        : item.id === "Premise"
                          ? isPremiseActive
                          : activeTab === item.id;

                if (item.id === "License") {
                  return (
                    <div 
                      key={item.id} 
                      className="relative block"
                      onMouseEnter={() => setLicenseDropdownOpen(true)}
                      onMouseLeave={() => setLicenseDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setLicenseDropdownOpen(!licenseDropdownOpen)}
                        className={`sidebar-btn ${isActive ? "active" : ""}`}
                        style={{ width: "190px", flexShrink: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </div>

                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${licenseDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {licenseDropdownOpen && (
                        <div className="license-dropdown">
                          <div className="dropdown-header">
                            <div className="dropdown-header-icon">
                              <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <div className="dropdown-text-group">
                              <h4 className="dropdown-header-title">Excise Licensing Services</h4>
                              <p className="dropdown-header-subtitle">Apply, renew, transfer, or revalidate</p>
                            </div>
                          </div>

                          <div className="dropdown-menu-list">
                            {[
                              { id: "New License", label: "New License", desc: "File a new privilege permit", num: "01" },
                              { id: "Applied License", label: "Applied License", desc: "Track status of pending filings", num: "02" },
                              { id: "Renewal License", label: "Renewal License", desc: "Extend tenure and clear fee dues", num: "03" },
                              { id: "License Transfer", label: "License Transfer", desc: "Transfer authority or relocate shop", num: "04" },
                              { id: "Document Revalidate", label: "Document Revalidate", desc: "Validate expiring NOC documents", num: "05" }
                            ].map((subOption) => {
                              const isSubActive = activeTab === subOption.id;
                              return (
                                <button
                                  key={subOption.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(subOption.id);
                                    setLicenseDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${isSubActive ? "active-submenu" : ""}`}
                                >
                                  <div className="dropdown-item-left">
                                    <div className="dropdown-item-badge">
                                      {subOption.num}
                                    </div>
                                    <div className="dropdown-text-group">
                                      <span className="dropdown-label">{subOption.label}</span>
                                      <span className="dropdown-description">{subOption.desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="dropdown-arrow" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === "MTP") {
                  return (
                    <div 
                      key={item.id} 
                      className="relative block"
                      onMouseEnter={() => setMtpDropdownOpen(true)}
                      onMouseLeave={() => setMtpDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setMtpDropdownOpen(!mtpDropdownOpen)}
                        className={`sidebar-btn ${isActive ? "active" : ""}`}
                        style={{ width: "190px", flexShrink: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </div>

                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${mtpDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {mtpDropdownOpen && (
                        <div className="license-dropdown" style={{ left: "-85px" }}>
                          <div className="dropdown-header">
                            <div className="dropdown-header-icon" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
                              <FlaskConical className="w-5 h-5 text-white" />
                            </div>
                            <div className="dropdown-text-group">
                              <h4 className="dropdown-header-title">M&TP Services</h4>
                              <p className="dropdown-header-subtitle">Medicinal & Toilet Preparations</p>
                            </div>
                          </div>

                          <div className="dropdown-menu-list">
                            {[
                              { id: "New M&TP", label: "New M&TP", desc: "Apply for a new M&TP unit license", num: "01" },
                              { id: "Applied M&TP", label: "Applied M&TP", desc: "Track medical unit formulation and filings", num: "02" }
                            ].map((subOption) => {
                              const isSubActive = activeTab === subOption.id;
                              return (
                                <button
                                  key={subOption.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(subOption.id);
                                    setMtpDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${isSubActive ? "active-submenu" : ""}`}
                                >
                                  <div className="dropdown-item-left">
                                    <div className="dropdown-item-badge">
                                      {subOption.num}
                                    </div>
                                    <div className="dropdown-text-group">
                                      <span className="dropdown-label">{subOption.label}</span>
                                      <span className="dropdown-description">{subOption.desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="dropdown-arrow" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === "Dealer") {
                  return (
                    <div 
                      key={item.id} 
                      className="relative block"
                      onMouseEnter={() => setDealerDropdownOpen(true)}
                      onMouseLeave={() => setDealerDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setDealerDropdownOpen(!dealerDropdownOpen)}
                        className={`sidebar-btn ${isActive ? "active" : ""}`}
                        style={{ width: "190px", flexShrink: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </div>

                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${dealerDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {dealerDropdownOpen && (
                        <div className="license-dropdown" style={{ left: "-40px" }}>
                          <div className="dropdown-header">
                            <div className="dropdown-header-icon" style={{ background: "linear-gradient(135deg, #4f46e5, #4338ca)" }}>
                              <Store className="w-5 h-5 text-white" />
                            </div>
                            <div className="dropdown-text-group">
                              <h4 className="dropdown-header-title">Dealer Services</h4>
                              <p className="dropdown-header-subtitle">Excise registration & status</p>
                            </div>
                          </div>

                          <div className="dropdown-menu-list">
                            {[
                              { id: "Dealer Registration", label: "Dealer Registration", desc: "Register a new excise trade dealer account", num: "01" },
                              { id: "Applied Dealers", label: "Applied Dealers", desc: "Track status of pending trade dealer applications", num: "02" }
                            ].map((subOption) => {
                              const isSubActive = activeTab === subOption.id;
                              return (
                                <button
                                  key={subOption.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(subOption.id);
                                    setDealerDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${isSubActive ? "active-submenu" : ""}`}
                                >
                                  <div className="dropdown-item-left">
                                    <div className="dropdown-item-badge">
                                      {subOption.num}
                                    </div>
                                    <div className="dropdown-text-group">
                                      <span className="dropdown-label">{subOption.label}</span>
                                      <span className="dropdown-description">{subOption.desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="dropdown-arrow" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === "Premise") {
                  return (
                    <div 
                      key={item.id} 
                      className="relative block"
                      onMouseEnter={() => setPremiseDropdownOpen(true)}
                      onMouseLeave={() => setPremiseDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setPremiseDropdownOpen(!premiseDropdownOpen)}
                        className={`sidebar-btn ${isActive ? "active" : ""}`}
                        style={{ width: "190px", flexShrink: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </div>

                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${premiseDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {premiseDropdownOpen && (
                        <div className="license-dropdown" style={{ left: "-50px" }}>
                          <div className="dropdown-header">
                            <div className="dropdown-header-icon" style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                              <Building className="w-5 h-5 text-white" />
                            </div>
                            <div className="dropdown-text-group">
                              <h4 className="dropdown-header-title">Premise & Permits</h4>
                              <p className="dropdown-header-subtitle">Manage premises and local trade permits</p>
                            </div>
                          </div>

                          <div className="dropdown-menu-list">
                            {[
                              { id: "Register Premise", label: "Register Premise", desc: "Register a physical store, depot or warehouse", num: "01" },
                              { id: "Applied Premise", label: "Applied Premise", desc: "Track pending premise verification status", num: "02" },
                              { id: "New Permit", label: "New Permit", desc: "Apply for shipping, transport, or event permits", num: "03" },
                              { id: "Applied Permit", label: "Applied Permit", desc: "View approved transport pass permits", num: "04" }
                            ].map((subOption) => {
                              const isSubActive = activeTab === subOption.id;
                              return (
                                <button
                                  key={subOption.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(subOption.id);
                                    setPremiseDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${isSubActive ? "active-submenu" : ""}`}
                                >
                                  <div className="dropdown-item-left">
                                    <div className="dropdown-item-badge">
                                      {subOption.num}
                                    </div>
                                    <div className="dropdown-text-group">
                                      <span className="dropdown-label">{subOption.label}</span>
                                      <span className="dropdown-description">{subOption.desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="dropdown-arrow" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === "Profile") {
                  return (
                    <div 
                      key={item.id} 
                      className="relative block"
                      onMouseEnter={() => setProfileDropdownOpen(true)}
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className={`sidebar-btn ${isActive ? "active" : ""}`}
                        style={{ width: "190px", flexShrink: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </div>

                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {profileDropdownOpen && (
                        <div className="license-dropdown" style={{ left: "auto", right: 0 }}>
                          <div className="dropdown-header">
                            <div className="dropdown-header-icon" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="dropdown-text-group">
                              <h4 className="dropdown-header-title">Profile & Settings</h4>
                              <p className="dropdown-header-subtitle">Manage account & password</p>
                            </div>
                          </div>

                          <div className="dropdown-menu-list">
                            {[
                              { id: "UserProfile", label: "Profile", desc: "View & edit your profile details", num: "01" },
                              { id: "ChangePassword", label: "Change Password", desc: "Update account access password", num: "02" }
                            ].map((subOption) => {
                              const isSubActive = activeTab === subOption.id;
                              return (
                                <button
                                  key={subOption.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(subOption.id);
                                    setProfileDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${isSubActive ? "active-submenu" : ""}`}
                                >
                                  <div className="dropdown-item-left">
                                    <div className="dropdown-item-badge">
                                      {subOption.num}
                                    </div>
                                    <div className="dropdown-text-group">
                                      <span className="dropdown-label">{subOption.label}</span>
                                      <span className="dropdown-description">{subOption.desc}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="dropdown-arrow" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setLicenseDropdownOpen(false);
                    }}
                    className={`sidebar-btn ${isActive ? "active" : ""}`}
                    style={{ width: "190px", flexShrink: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-[15px] font-semibold">{item.label}</span>
                    </div>

                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

/* =========================
   MAIN COMPONENT
========================= */

export default function ApplicantDashboard({ onLogout, onNavigateToHome }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // States for sub-level views
  const [renewedList, setRenewedList] = useState({});
  const [docs, setDocs] = useState({
    fireNoc: { name: "Fire Safety Certificate (NOC)", status: "Expired on 15 May 2026", type: "expired" },
    mcdLicense: { name: "MCD Trade License Renewed Copy", status: "Clarification Requested", type: "flagged" },
    leaseDeed: { name: "Registered Property Lease Deed", status: "Verified", type: "verified" },
  });
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferForm, setTransferForm] = useState({
    lic: "ND-25-L10023",
    type: "Ownership",
    transferee: "",
    remarks: ""
  });

  // Inline "New License" Wizard States
  const [newLicStep, setNewLicStep] = useState(1);
  const [newLicData, setNewLicData] = useState({
    entityType: "Private Limited",
    licenseType: "L-1 Wholesale Vend of Indian Liquor",
    applicantName: "Delhi Retail & Distribution Corp",
    tradeName: "Okhla Spirits & Beverages",
    pincode: "110020",
    premiseAddress: "Plot 104, Okhla Industrial Area Phase-III, New Delhi",
    hasFireNoc: false,
    hasTaxCompliance: false,
    declarationsChecked: false,
    mcdTradeLicenseNum: "MCD-99120-DEL"
  });
  const [appSubmissionCompleted, setAppSubmissionCompleted] = useState(false);

  // M&TP states
  const [mtpApplications, setMtpApplications] = useState([
    {
      id: "MTP-2026-0811",
      unitName: "Bio-Herbal Pharmaceuticals Ltd",
      formulation: "Ayurvedic Restorative Elixir (Asava/Arishta)",
      alcoholStrength: "11% v/v (Self-generated Alcohol)",
      status: "Approved",
      submittedDate: "10/05/2026",
      remarks: "Ready for spirit allotment quota release"
    },
    {
      id: "MTP-2026-4409",
      unitName: "Apex Homoeo Laboratories",
      formulation: "Diluted Alcohol Medication Formulations",
      alcoholStrength: "90% v/v (Industrial Rectified Spirit)",
      status: "Under Technical Review",
      submittedDate: "21/05/2026",
      remarks: "Awaiting chemical analysis report clearance"
    }
  ]);

  const [newMtpData, setNewMtpData] = useState({
    unitName: "Delhi Pharmaceutical Formulation Works",
    formulationName: "Rectified Medicated Cough Syrup Base",
    formulationType: "Ayurvedic medicine (with self-generated alcohol)",
    spiritType: "Rectified Spirit (95% v/v)",
    annualRequirement: "5000 Litres",
    drugLicenseNum: "DL-MED-9921-2026",
    declarationsChecked: false
  });
  
  const [mtpSubmissionCompleted, setMtpSubmissionCompleted] = useState(false);

  // Dealer states
  const [dealerApplications, setDealerApplications] = useState([
    {
      id: "DLR-2026-9022",
      firmName: "Saraswati Wholesale Wine Merchants",
      licenseType: "L-15 Wholesale custom bond ware-house",
      panNum: "AAACS0811K",
      status: "Approved",
      submittedDate: "12/04/2026",
      remarks: "Trade account active, security earnest money deposited"
    },
    {
      id: "DLR-2026-6130",
      firmName: "Northern India Spirits Retailers",
      licenseType: "L-2 Retail Vend of Beer & Wine",
      panNum: "AABCP1130M",
      status: "Under Assessment",
      submittedDate: "18/05/2026",
      remarks: "Physical stockroom verification in progress"
    }
  ]);

  const [newDealerData, setNewDealerData] = useState({
    firmName: "Vedic Craft Beverages LLP",
    ownerName: "Sumit Sharma",
    licenseType: "L-13 Wholesale import bond storage",
    panNum: "AAPCS9912C",
    gstinNum: "07AAPCS9912C1ZP",
    warehouseAddress: "Plot 24, Kirti Nagar Industrial Area, New Delhi - 110015",
    declarationsChecked: false
  });

  const [dealerSubmissionCompleted, setDealerSubmissionCompleted] = useState(false);

  // Premise states
  const [premiseApplications, setPremiseApplications] = useState([
    {
      id: "PM-2026-6182",
      premiseName: "Central Delhi Logistics Hub",
      address: "Plot 104, Okhla Industrial Area Phase-III, New Delhi - 110020",
      premiseType: "Bonded Warehouse Store",
      dimensions: "4,500 Sq. Ft.",
      status: "Approved",
      submittedDate: "15/04/2026",
      remarks: "CCTV feed integrated & fire clearance obtained"
    },
    {
      id: "PM-2026-4401",
      premiseName: "South Delhi Retail Suite A",
      address: "Shop No. 12, Ground Floor, Saket District Centre, New Delhi - 110017",
      premiseType: "Retail Vend Shop",
      dimensions: "450 Sq. Ft.",
      status: "Under Physical Inspection",
      submittedDate: "20/05/2026",
      remarks: "Physical safety layout and locker vault verification in progress"
    }
  ]);

  const [newPremiseData, setNewPremiseData] = useState({
    premiseName: "West Delhi Distributing Depot",
    ownerName: "Sumit Sharma",
    address: "B-42, Mayapuri Industrial Area Phase-I, New Delhi - 110064",
    premiseType: "Bonded Warehouse Store",
    dimensions: "3,000 Sq. Ft.",
    fireNocNumber: "DFS/NOC/2026/8839",
    securityDepositReceipt: "SD-EXE-99381-2026",
    declarationsChecked: false
  });

  const [premiseSubmissionCompleted, setPremiseSubmissionCompleted] = useState(false);

  // Permit states
  const [permitApplications, setPermitApplications] = useState([
    {
      id: "PRM-2026-0034",
      permitType: "Local Transport Permit (Bulk Movement)",
      sourcePremise: "Central Delhi Logistics Hub (Okhla)",
      destPremise: "North Delhi Retail Depot (Rohini)",
      consignmentDetails: "50 Cases of Premium Indian Spirits (IMFL)",
      carrierLicense: "DL-1LM-8842",
      status: "Approved",
      submittedDate: "10/05/2026",
      remarks: "Valid transport gate pass generated"
    },
    {
      id: "PRM-2026-5381",
      permitType: "Special Event Temporary Permit",
      sourcePremise: "L-13 wholesale import bond storage",
      destPremise: "Vedic Craft Banquet Hall, Chanakyapuri",
      consignmentDetails: "Occasional hospitality service package",
      carrierLicense: "DL-1N-9931",
      status: "Approved",
      submittedDate: "25/05/2026",
      remarks: "Event gate pass valid till 28/05/2026"
    }
  ]);

  const [newPermitData, setNewPermitData] = useState({
    permitType: "Local Transport Permit (Bulk Movement)",
    sourcePremise: "Central Delhi Logistics Hub (Okhla)",
    destPremise: "West Delhi Distributing Depot (Mayapuri)",
    consignmentDetails: "120 Cases of Beer & Light Wines",
    carrierLicense: "DL-1LM-9902",
    declarationsChecked: false
  });

  const [permitSubmissionCompleted, setPermitSubmissionCompleted] = useState(false);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleRenew = (id) => {
    setRenewedList(prev => ({ ...prev, [id]: true }));
    showToast(`Renewal initiated for ${id}! License duty receipt generated and extended successfully.`);
  };

  const handleUpload = (key) => {
    setDocs(prev => ({
      ...prev,
      [key]: { ...prev[key], status: "Uploading & Authenticating with System...", type: "uploading" }
    }));
    
    setTimeout(() => {
      setDocs(prev => ({
        ...prev,
        [key]: { ...prev[key], status: "Verified & System Approved", type: "verified" }
      }));
      showToast(`${key === "fireNoc" ? "Fire NOC" : "MCD License"} has been processed and successfully validated!`);
    }, 1500);
  };

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    if (!transferForm.transferee) {
      showToast("Please enter transferee/address details", "error");
      return;
    }
    setTransferSuccess(true);
    showToast("License Transfer request submitted for departmental review!");
  };

  const filteredLicenses = licenses.filter(
    (item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col relative">

      {/* HEADER WITH CENTERED HORIZONTAL MENU */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        onNavigateToHome={onNavigateToHome}
      />

      {/* TOAST SYSTEM */}
      {toastMessage && (
        <div 
          className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl border ${
            toastMessage.type === "success" 
              ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
              : "bg-red-50 border-red-100 text-red-800"
          } transition-all transform scale-100 animate-fade-in`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span className="text-xs font-bold font-sans">{toastMessage.msg}</span>
        </div>
      )}

      {/* PAGE CONTENT */}
      {activeTab === "New License" ? (
        <div className="flex-grow w-full py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-md p-6 sm:p-8">
              
              {appSubmissionCompleted ? (
                /* SUCCESS SCREEN */
                <div className="text-center py-8 px-4 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Application Submitted Successfully
                    </h2>
                    <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                      Your application for a new excise privilege license has been logged. The Department of Excise, Government of NCT of Delhi will process the inspection shortly.
                    </p>
                  </div>

                  {/* Receipt box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 max-w-md mx-auto text-left space-y-3.5 shadow-sm">
                    <div className="flex justify-between items-center text-xs border-b border-slate-200/60 pb-2.5">
                      <span className="font-bold text-slate-400 uppercase tracking-wider">Transaction Status</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">PAID & FILED</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">Application Ref</span>
                        <span className="font-mono font-extrabold text-slate-800 text-sm">AP-2026-88021</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">License Category</span>
                        <span className="font-bold text-slate-805">{newLicData.licenseType.split(" ")[0]}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">Applicant Entity</span>
                        <span className="font-bold text-slate-800">{newLicData.applicantName || "Delhi Retail & Distribution Corp"}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">Premises Address</span>
                        <span className="font-semibold text-slate-700 leading-tight block">{newLicData.premiseAddress}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">Fee Remitted</span>
                        <span className="font-extrabold text-blue-600">₹ 2,50,000</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">Date Submitted</span>
                        <span className="font-bold text-slate-700">27/05/2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
                    <button 
                      onClick={() => {
                        setAppSubmissionCompleted(false);
                        setNewLicStep(1);
                        setActiveTab("Applied License");
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Track Application Status</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        setAppSubmissionCompleted(false);
                        setNewLicStep(1);
                        setNewLicData({
                          entityType: "Private Limited",
                          licenseType: "L-1 Wholesale Vend of Indian Liquor",
                          applicantName: "",
                          tradeName: "",
                          pincode: "",
                          premiseAddress: "",
                          hasFireNoc: false,
                          hasTaxCompliance: false,
                          declarationsChecked: false,
                          mcdTradeLicenseNum: ""
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer transition"
                    >
                      Apply for Another License
                    </button>
                  </div>
                </div>
              ) : (
                /* IN-PROGRESS STEPS FORM */
                <div className="space-y-6">
                  
                  {/* Step Bubble Indicator */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    {[
                      { step: 1, name: "Brand & Entity" },
                      { step: 2, name: "Premises Info" },
                      { step: 3, name: "Certifications" }
                    ].map((st, idx) => (
                      <React.Fragment key={st.step}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            newLicStep === st.step 
                              ? "bg-blue-600 text-white ring-4 ring-blue-50" 
                              : newLicStep > st.step 
                                ? "bg-emerald-500 text-white" 
                                : "bg-slate-100 text-slate-400"
                          }`}>
                            {newLicStep > st.step ? "✓" : st.step}
                          </div>
                          <span className={`text-xs font-bold hidden sm:inline ${
                            newLicStep === st.step ? "text-slate-800" : "text-slate-400 font-semibold"
                          }`}>
                            {st.name}
                          </span>
                        </div>
                        {idx < 2 && (
                          <div className={`flex-grow h-[2px] mx-2 max-w-[80px] sm:max-w-[120px] ${
                            newLicStep > st.step ? "bg-emerald-400" : "bg-slate-100"
                          }`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">
                      {newLicStep === 1 && "Entity & Licensing Selection"}
                      {newLicStep === 2 && "Premises & Location Specifics"}
                      {newLicStep === 3 && "Compliance Clearance & Final Declarations"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Please enter official verified details to secure the correct evaluation process under the NCT Excise bylaws.
                    </p>
                  </div>

                  {/* STEP 1: Entity & Licensing Selection */}
                  {newLicStep === 1 && (
                    <div className="space-y-4 pt-2">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Applicant Entity Type</label>
                          <select 
                            value={newLicData.entityType}
                            onChange={(e) => setNewLicData({ ...newLicData, entityType: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                          >
                            <option value="Private Limited">Private Limited Company</option>
                            <option value="Partnership">Partnership Firm</option>
                            <option value="Proprietorship">Individual Proprietor</option>
                            <option value="Public Limited">Public Limited Company</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">excise License privilege Category</label>
                          <select 
                            value={newLicData.licenseType}
                            onChange={(e) => setNewLicData({ ...newLicData, licenseType: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                          >
                            <option value="L-1 Wholesale Vend of Indian Liquor">L-1 Wholesale Vend of Indian Liquor</option>
                            <option value="L-15 Hotel Bar License (Star Classified)">L-15 Hotel Bar License (Star Classified)</option>
                            <option value="L-22 Club Bar License (Registered Clubs)">L-22 Club Bar License (Registered Clubs)</option>
                            <option value="L-10 Retail Departmental Store License">L-10 Retail Departmental Store License</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Applicant Registered Entity Name</label>
                        <input 
                          type="text"
                          placeholder="E.g., Delhi Retail & Distribution Corp"
                          value={newLicData.applicantName}
                          onChange={(e) => setNewLicData({ ...newLicData, applicantName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Brand / Proposed Trade Shop Name</label>
                        <input 
                          type="text"
                          placeholder="E.g., Okhla Spirits & Beverages"
                          value={newLicData.tradeName}
                          onChange={(e) => setNewLicData({ ...newLicData, tradeName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Premises & Location Specifics */}
                  {newLicStep === 2 && (
                    <div className="space-y-4 pt-2">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">MCD Trade License Reference Number</label>
                          <input 
                            type="text"
                            placeholder="MCD-99120-DEL"
                            value={newLicData.mcdTradeLicenseNum}
                            onChange={(e) => setNewLicData({ ...newLicData, mcdTradeLicenseNum: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Postal PIN Code</label>
                          <input 
                            type="text"
                            maxLength="6"
                            placeholder="E.g., 110020"
                            value={newLicData.pincode}
                            onChange={(e) => setNewLicData({ ...newLicData, pincode: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Physical Address of Proposed Premise Layout</label>
                        <textarea 
                          rows="3"
                          placeholder="Enter complete building number, lane registration details, and floor level..."
                          value={newLicData.premiseAddress}
                          onChange={(e) => setNewLicData({ ...newLicData, premiseAddress: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-slate-700 font-medium transition resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Compliance Clearance & Final Declarations */}
                  {newLicStep === 3 && (
                    <div className="space-y-5 pt-2">
                      
                      {/* Checkbox clearances */}
                      <div className="space-y-3.5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                        <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Required Clearances Status</span>
                        
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={newLicData.hasFireNoc}
                            onChange={(e) => setNewLicData({ ...newLicData, hasFireNoc: e.target.checked })}
                            className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="text-xs">
                            <span className="block font-bold text-slate-800">Has Fire Safety Certificate (NOC)</span>
                            <span className="text-slate-400 block mt-0.5">Applicant confirms possession of valid and up-to-date Fire Brigade NOC.</span>
                          </div>
                        </label>

                        <div className="h-[1px] bg-slate-200/60 my-2"></div>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={newLicData.hasTaxCompliance}
                            onChange={(e) => setNewLicData({ ...newLicData, hasTaxCompliance: e.target.checked })}
                            className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="text-xs">
                            <span className="block font-bold text-slate-800">No Outstanding VAT / Tax Liabilities Statement</span>
                            <span className="text-slate-400 block mt-0.5">Certify no direct tax dues exist under GNCT excise code.</span>
                          </div>
                        </label>
                      </div>

                      {/* Declaration Checkbox */}
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={newLicData.declarationsChecked}
                            onChange={(e) => setNewLicData({ ...newLicData, declarationsChecked: e.target.checked })}
                            className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <p className="text-xs text-blue-900 font-semibold leading-relaxed">
                            I hereby solemnly declare and verify that the proposed premises are fully compliant with structural and zoning restrictions of NCT Masterplan guidelines. Any discrepancy discovered during the physical inspection will result in the immediate forfeiture of the application processing fees.
                          </p>
                        </label>
                      </div>

                    </div>
                  )}

                  {/* Flow Action Controls */}
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        if (newLicStep === 1) {
                          setActiveTab("Home");
                        } else {
                          setNewLicStep(newLicStep - 1);
                        }
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer transition"
                    >
                      {newLicStep === 1 ? "Cancel Application" : "Back"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (newLicStep < 3) {
                          // Validation check
                          if (newLicStep === 1 && (!newLicData.applicantName || !newLicData.tradeName)) {
                            showToast("Please enter the registered applicant name and trade name.", "error");
                            return;
                          }
                          if (newLicStep === 2 && (!newLicData.premiseAddress || !newLicData.pincode)) {
                            showToast("Please specify the premise warehouse layout address and postal pin code.", "error");
                            return;
                          }
                          setNewLicStep(newLicStep + 1);
                        } else {
                          // Submit
                          if (!newLicData.declarationsChecked) {
                            showToast("Please checkbox the declaration statement to file your application.", "error");
                            return;
                          }
                          setAppSubmissionCompleted(true);
                          showToast("New Application Privileged Draft filed successfully!");
                        }
                      }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition"
                    >
                      {newLicStep === 3 ? "Submit & Pay License Fee (₹ 2.5L)" : "Continue"}
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      ) : 
        activeTab === "New License" ? (
        <NewLicense setActiveTab={setActiveTab} showToast={showToast} />
      ) : false ? (
        <div className="flex-grow w-full py-8 font-sans">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            {appSubmissionCompleted ? (
              /* SUCCESS SCREEN - HIGH-END DESIGN */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-8 animate-fade select-none">
                <div className="relative w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse-subtle">
                  <Check className="w-10 h-10 stroke-[3]" />
                  <span className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-25"></span>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Application Submitted Successfully
                  </h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your application for a new excise privilege license has been logged. The Department of Excise, Government of NCT of Delhi will process the physical inspection shortly.
                  </p>
                </div>

                {/* Structured Receipts Badge */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-sm max-w-lg mx-auto">
                  <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-400 uppercase tracking-widest">Transaction Receipt</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide uppercase">PAID & FILED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs">
                    <div>
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Application Ref</span>
                      <span className="font-mono font-black text-slate-800 text-sm">AP-2026-EX-88021</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">License Category</span>
                      <span className="font-bold text-blue-700 text-sm">
                        {newLicData.licenseType ? newLicData.licenseType.split(" ")[0] : "L-1"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Applicant Entity</span>
                      <span className="font-bold text-slate-800 text-sm">{newLicData.applicantName || "Delhi Retail & Distribution Corp"}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Premises Address</span>
                      <span className="font-semibold text-slate-600 block leading-relaxed">{newLicData.premiseAddress || "Plot 104, Okhla Industrial Area Phase-III, New Delhi"}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Fee Remitted</span>
                      <span className="font-extrabold text-blue-600 text-base">
                        {getPriceFormatted()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Filing Date</span>
                      <span className="font-bold text-slate-700 text-sm">01/06/2026</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={() => {
                      setAppSubmissionCompleted(false);
                      setNewLicStep(1);
                      setActiveTab("Home");
                    }}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer border-none"
                  >
                    Return to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      showToast("PDF license filing receipt generated and saved to device!");
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition cursor-pointer border-none shadow-md"
                  >
                    Print Signed Copy
                  </button>
                </div>
              </div>
            ) : (
              /* PROGRESSIVE 5-STEP LICENSE WIZARD */
              <div className="space-y-8 animate-fade">

                {/* 1. HERO BANNER WITH DELHI SKYLINE ILLUSTRATION AND BREADCRUMB */}
                <div className="new-license-banner p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left part */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-white/90 border border-blue-200 text-blue-600 rounded-2xl shadow-sm flex-shrink-0">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5 text-left">
                      {/* Breadcrumbs */}
                      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                        <span className="cursor-pointer hover:underline" onClick={() => setActiveTab("Home")}>Home</span>
                        <ChevronRight className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-500">License</span>
                        <ChevronRight className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-900">New License Application</span>
                      </nav>
                      
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none science-heading">
                        New License Application
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-semibold">
                        {newLicStep === 2 
                          ? "Let's get started! Select the license category that best fits your requirement."
                          : newLicStep === 3
                            ? "Select the specific operational sub-code or premium endorsement matching your license category."
                            : newLicStep === 4
                              ? "Define your business premises address, coordinates, and physical storage layout configuration."
                              : newLicStep === 5
                                ? "Upload legal registration documents, tax compliance copies and clearance certifications."
                                : newLicStep === 6
                                  ? "Review your application details, make payment of excise tariff fees and file your application."
                                  : "Let's get started! Fill in the basic details to begin your new license application."
                        }
                      </p>
                    </div>
                  </div>

                  {/* Right part: Stylized SVG Delhi Skyline monument illustration */}
                  <div className="w-full md:w-64 lg:w-80 flex-shrink-0 opacity-90 block">
                    <svg viewBox="0 0 320 100" className="w-full h-auto text-blue-800/20 fill-current">
                      {/* Qutub Minar */}
                      <g>
                        <path d="M 40,100 L 48,15 L 52,15 L 60,100 Z" />
                        <rect x="46" y="35" width="8" height="4" rx="1" />
                        <rect x="44" y="60" width="12" height="4" rx="1" />
                        <rect x="42" y="80" width="16" height="4" rx="1" />
                        <line x1="50" y1="15" x2="50" y2="5" stroke="currentColor" strokeWidth="2" />
                      </g>
                      
                      {/* India Gate */}
                      <g>
                        <rect x="100" y="45" width="12" height="55" />
                        <rect x="138" y="45" width="12" height="55" />
                        <rect x="94" y="32" width="62" height="13" />
                        <rect x="90" y="25" width="70" height="7" rx="1" />
                        <path d="M 104,25 C 104,12 146,12 146,25 Z" />
                        <path d="M 112,100 L 112,65 C 112,53 138,53 138,65 L 138,100 Z" />
                      </g>

                      {/* Lotus Temple */}
                      <g>
                        <path d="M 220,100 C 210,60 230,50 230,50 C 230,50 250,60 240,100 Z" />
                        <path d="M 200,100 C 200,70 215,70 220,100 Z" />
                        <path d="M 240,100 C 245,70 260,70 260,100 Z" />
                        <path d="M 185,100 C 195,80 212,85 212,100 Z" />
                        <path d="M 248,100 C 248,85 265,80 275,100 Z" />
                      </g>
                      
                      {/* Baseline ground */}
                      <line x1="10" y1="100" x2="310" y2="100" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                {/* 2. MULTI-STEP PROGRESS BAR (32px vertical spacing) */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 select-none">
                  <div className="relative">
                    {/* Line connectors row */}
                    <div className="absolute top-5 left-0 right-0 -translate-y-1/2 flex items-center z-0 px-8">
                      <div className={newLicStep >= 2 ? "step-dotted-connector-active" : "step-dotted-connector"}></div>
                      <div className={newLicStep >= 3 ? "step-dotted-connector-active" : "step-dotted-connector"}></div>
                      <div className={newLicStep >= 4 ? "step-dotted-connector-active" : "step-dotted-connector"}></div>
                      <div className={newLicStep >= 5 ? "step-dotted-connector-active" : "step-dotted-connector"}></div>
                      <div className={newLicStep >= 6 ? "step-dotted-connector-active" : "step-dotted-connector"}></div>
                    </div>

                    {/* Circles row */}
                    <div className="relative flex justify-between items-start z-10">
                      {[
                        { step: 1, label: "Basic Details", sub: "Entity Selection" },
                        { step: 2, label: "License Category", sub: "Privilege Code" },
                        { step: 3, label: "Select License", sub: "Specific Sub-Type" },
                        { step: 4, label: "Premise Details", sub: "Address & Layout" },
                        { step: 5, label: "Documents", sub: "Verification Copies" },
                        { step: 6, label: "Review & Submit", sub: "Remit & File" }
                      ].map((item) => {
                        const isCompleted = newLicStep > item.step;
                        const isActive = newLicStep === item.step;
                        return (
                          <div key={item.step} className="flex flex-col items-center flex-1 text-center">
                            <div 
                              className={`step-circle-badge ${
                                isCompleted 
                                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" 
                                  : isActive 
                                    ? "blue-gradient-active-step text-white" 
                                    : "bg-slate-50 border-2 border-slate-200 text-slate-400"
                              }`}
                            >
                              {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <span>{item.step}</span>}
                            </div>
                            <span className={`text-[12px] font-extrabold mt-3 block ${isActive ? "text-blue-600" : isCompleted ? "text-emerald-700" : "text-slate-500"}`}>
                              {item.label}
                            </span>
                            <span className="text-[10px] hidden sm:block text-slate-400 mt-0.5 font-semibold">
                              {item.sub}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. ACTIVE STEP DETAIL CONTENT (24px padding / equal heights / custom cards) */}
                <div className="min-h-[340px]">
                  
                  {newLicStep === 1 && (
                    /* STEP 1: BASIC DETAILS CARD */
                    <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 under-blue-accent">
                            Basic Details
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-semibold">Select your organization type and applied license privilege schedules.</p>
                        </div>
                      </div>

                      {/* Field Forms Grid (Two Column Layout) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Owner Type field with field icons and custom arrow inside layout */}
                        <div className="flex flex-col gap-2 relative">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                            Owner Type <span className="text-red-500">*</span>
                          </label>
                          <div className="field-icon-container">
                            <UserCheck className="field-icon-left" />
                            <select
                              value={newLicData.entityType}
                              onChange={(e) => setNewLicData({ ...newLicData, entityType: e.target.value })}
                              className="rounded-custom-field focus:ring-4 focus:ring-blue-100 cursor-pointer"
                            >
                              <option value="Individual Proprietorship">Individual Proprietorship</option>
                              <option value="Partnership Firm">Partnership Firm</option>
                              <option value="Private Limited Company">Private Limited Company</option>
                              <option value="Public Limited Company">Public Limited Company</option>
                              <option value="Society / Trust">Society / Trust</option>
                            </select>
                            <ChevronDown className="custom-select-arrow" />
                          </div>
                          <p className="text-[11px] text-slate-400 font-semibold">Specify the legally incorporated category of applicant business enterprise.</p>
                        </div>

                        {/* Category of License Applied for */}
                        <div className="flex flex-col gap-2 relative">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                            Category of License Applied For <span className="text-red-500">*</span>
                          </label>
                          <div className="field-icon-container">
                            <Award className="field-icon-left" />
                          <select
                              value={newLicData.licenseType}
                              onChange={(e) => {
                                const val = e.target.value;
                                let defaultSub = "L-1 (A) Domestic Registered Indian Spirits Wholesale";
                                if (val.includes("L-10")) {
                                  defaultSub = "L-10 (A) General Departmental Retail Vend";
                                } else if (val.includes("L-15")) {
                                  defaultSub = "L-15 (A) Star Classified Hotel Bar Service";
                                } else if (val.includes("L-22")) {
                                  defaultSub = "L-22 (A) Resident Club & Association Bar Unit";
                                }
                                setNewLicData({ ...newLicData, licenseType: val, selectedSubLicense: defaultSub });
                              }}
                              className="rounded-custom-field focus:ring-4 focus:ring-blue-100 cursor-pointer"
                            >
                              <option value="L-1 (Wholesale Vend of Indian Liquor)">L-1 (Wholesale Vend of Indian Liquor)</option>
                              <option value="L-10 (Retail Departmental Store)">L-10 (Retail Departmental Store)</option>
                              <option value="L-15 (Hotel Bar - Star Classified)">L-15 (Hotel Bar - Star Classified)</option>
                              <option value="L-22 (Club Bar)">L-22 (Club Bar)</option>
                            </select>
                            <ChevronDown className="custom-select-arrow" />
                          </div>
                          <p className="text-[11px] text-slate-400 font-semibold">These categories represent excise divisions governed under GNCTD Act.</p>
                        </div>                
                      </div>
                    </div>
                  )}

                  {newLicStep === 2 && (
                     <LicenseCategory
                  newLicData={newLicData}
                  setNewLicData={setNewLicData}
                  showToast={showToast}
                  getActiveCategory={getActiveCategory}
                />
                  )}

              {newLicStep === 3 && (
                    /* STEP 3: SELECT SPECIFIC PRIVILEGE LICENSE */
                    <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                          <Compass className="w-5 h-5 animate-spin-slow" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 under-blue-accent">
                            Select Specific Privilege License
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-semibold">
                            Choose the specific operational sub-code or premium endorsement matching your license category.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {getSubLicenseOptions().map((opt) => {
                          const isSelected = newLicData.selectedSubLicense === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setNewLicData({ ...newLicData, selectedSubLicense: opt.id });
                                showToast(`Selected operational format: ${opt.title}`);
                              }}
                              className={`text-left rounded-2xl border-2 p-5 flex flex-col justify-between transition h-full relative cursor-pointer group bg-white ${
                                isSelected 
                                  ? "border-blue-600 bg-blue-50/20 shadow-md ring-4 ring-blue-50" 
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/40"
                              }`}
                            >
                              <div className="space-y-4">
                                <div className="flex justify-between items-start gap-2">
                                  <span className={`text-[11px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${
                                    isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                                  }`}>
                                    {opt.code}
                                  </span>
                                  {opt.badge && (
                                    <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                      {opt.badge}
                                    </span>
                                  )}
                                </div>

                                <div className="space-y-1.5">
                                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition">
                                    {opt.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                                    {opt.desc}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between w-full">
                                <span className={`text-xs font-bold ${isSelected ? "text-blue-700" : "text-slate-500"}`}>
                                  {opt.feeText}
                                </span>
                                {isSelected ? (
                                  <div className="p-1 bg-blue-600 text-white rounded-full">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 border border-slate-300 rounded-full group-hover:border-slate-400" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="col-span-full bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                        <div>
                          <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Estimated Total Fee (with premium / exemptions)</p>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">Includes base excise quota combined with your selected sub-license premium category.</p>
                        </div>
                        <span className="text-xl font-black text-blue-700 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl leading-none">
                          {getPriceFormatted()}
                        </span>
                      </div>
                    </div>
                  )}

                  {newLicStep === 4 && (
                    /* STEP 4: PREMISE DETAILS FORM */
                    <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 under-blue-accent">
                            Premise Location & Area Information
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-semibold">Provide legal warehouse/store layout, municipality pin coordinates, and dimensions.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                            Postal Pin code (NCT of Delhi) <span className="text-red-500">*</span>
                          </label>
                          <div className="field-icon-container">
                            <span className="absolute left-4 font-bold text-xs text-slate-400 uppercase">PIN</span>
                            <input
                              type="text"
                              value={newLicData.pincode}
                              onChange={(e) => setNewLicData({ ...newLicData, pincode: e.target.value })}
                              placeholder="e.g. 110020"
                              maxLength={6}
                              className="rounded-custom-field focus:ring-4 focus:ring-blue-100 pl-14 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                            MCD Property / Allied Trade License No <span className="text-red-500">*</span>
                          </label>
                          <div className="field-icon-container">
                            <FileCheck className="field-icon-left" />
                            <input
                              type="text"
                              value={newLicData.mcdTradeLicenseNum}
                              onChange={(e) => setNewLicData({ ...newLicData, mcdTradeLicenseNum: e.target.value })}
                              placeholder="e.g. MCD-99120-DEL"
                              className="rounded-custom-field focus:ring-4 focus:ring-blue-100 text-sm"
                            />
                          </div>
                        </div>

                        <div className="col-span-full flex flex-col gap-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                            Premises Full Registered Warehouse Address <span className="text-red-500">*</span>
                          </label>
                          <div className="field-icon-container">
                            <Building className="field-icon-left top-4 text-blue-600" />
                            <textarea
                              rows={3}
                              value={newLicData.premiseAddress}
                              onChange={(e) => setNewLicData({ ...newLicData, premiseAddress: e.target.value })}
                              placeholder="e.g. Plot 104, Industrial Estate Okhla Phase-3, New Delhi"
                              className="rounded-2xl bg-slate-50 border-1.5 border-slate-200 w-full pl-12 pr-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition focus:ring-4 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {newLicStep === 5 && (
                    /* STEP 5: DOCUMENTS UPLOAD SECTION */
                    <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 under-blue-accent">
                            Document Credentials Validation
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-semibold">Please upload certificates copy in PDF format. Each file must be under 5MB.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          { key: "hasFireNoc", title: "Fire Safety NOC Verification Copy", desc: "Issued by Delhi Fire Services Department" },
                          { key: "hasTaxCompliance", title: "VAT & Commercial Tax Compliance Receipt", desc: "Form 16/18 Trade returns validated statement" }
                        ].map((docItem) => {
                          const isUploaded = newLicData[docItem.key];
                          return (
                            <div 
                              key={docItem.key}
                              className={`border-2 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                                isUploaded ? "bg-emerald-50/50 border-emerald-300" : "bg-slate-50 border-dashed border-slate-300 hover:border-slate-400"
                              }`}
                            >
                              <div className="flex gap-3 items-center">
                                <div className={`p-2 rounded-xl flex-shrink-0 ${isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"}`}>
                                  {isUploaded ? <Check className="w-5 h-5 stroke-[3]" /> : <FileText className="w-5 h-5" />}
                                </div>
                                <div className="text-left">
                                  <h4 className="text-xs font-bold text-slate-800 leading-none">{docItem.title}</h4>
                                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">{docItem.desc}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-end sm:self-auto">
                                {isUploaded ? (
                                  <>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full uppercase tracking-wider">Uploaded</span>
                                    <button 
                                      type="button"
                                      onClick={() => setNewLicData({ ...newLicData, [docItem.key]: false })}
                                      className="text-[11px] font-bold text-red-500 hover:underline border-none bg-transparent cursor-pointer"
                                    >
                                      Remove
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      showToast(`Simulating upload for ${docItem.title}...`);
                                      setTimeout(() => {
                                        setNewLicData(prev => ({ ...prev, [docItem.key]: true }));
                                        showToast(`${docItem.title} verified and uploaded successfully!`, "success");
                                      }, 800);
                                    }}
                                    className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 hover:border-blue-300 text-xs font-extrabold rounded-xl transition cursor-pointer select-none flex items-center gap-1.5"
                                  >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload PDF</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {newLicStep === 6 && (
                    /* STEP 6: FINAL REVIEW & DECLARATION */
                    <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 under-blue-accent">
                            Review & Submit Privilege Application
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-semibold">Please evaluate all structural parameters carefully, checklist terms and remit the fee.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Summary side */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Filing Structure Summary</h4>
                            
                            <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 text-xs py-1 border-t border-slate-105 pt-3">
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Applicant Company</span>
                                <span className="font-extrabold text-slate-800 text-sm leading-none block mt-1">{newLicData.applicantName || "Delhi Retail & Distribution Corp"}</span>
                              </div>
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Owner Entity Class</span>
                                <span className="font-extrabold text-slate-800 text-sm leading-none block mt-1">{newLicData.entityType}</span>
                              </div>
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Excise Category</span>
                                <span className="font-extrabold text-blue-700 text-sm leading-none block mt-1">{newLicData.licenseType || "L-1 Wholesale"}</span>
                              </div>
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Premise Pin</span>
                                <span className="font-mono font-extrabold text-slate-800 text-sm leading-none block mt-1">{newLicData.pincode}</span>
                              </div>
                              <div className="col-span-2 border-t border-dashed border-slate-200 pt-2.5">
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Selected License Format</span>
                                <span className="font-extrabold text-emerald-800 text-xs block mt-1 leading-normal">
                                  {newLicData.selectedSubLicense || "Not Selected"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Declaration Checklist and labels */}
                          <div className="p-1">
                            <label className="flex items-start gap-3 cursor-pointer select-none group">
                              <input
                                type="checkbox"
                                checked={newLicData.declarationsChecked}
                                onChange={(e) => setNewLicData({ ...newLicData, declarationsChecked: e.target.checked })}
                                className="w-4 h-4 mt-0.5 accent-blue-600 rounded cursor-pointer"
                              />
                              <span className="text-xs text-slate-500 font-semibold leading-relaxed group-hover:text-slate-800 transition">
                                I hereby declare that all information furnished is authentic. I understand that misrepresenting physical store warehouse dimension details would lead to summary rejection under Delhi Excise Act 2009.
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Payment widget card right-aligned */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col justify-between space-y-6">
                          <div className="space-y-1">
                            <Coins className="w-6 h-6 text-blue-600 animate-pulse" />
                            <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-widest pt-1">Total Fee Payable</h4>
                            <p className="text-[10px] text-blue-500 font-semibold leading-tight">Privilege excise license registration deposit tariff</p>
                          </div>

                          <div>
                            <span className="block text-2xl font-black text-blue-700 leading-none">
                              {getPriceFormatted()}
                            </span>
                            <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest mt-1 block">GST Inclusive</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

                {/* 4. BLUE INFORMATION ALERT */}
                <div className="blue-info-alert animate-fade select-none text-left">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-blue-950">Filing Instructions Warning</p>
                    <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                      Please ensure all the details provided are correct. You can save as draft and continue later. Draft credentials are saved locally for 30 calendar days.
                    </p>
                  </div>
                </div>

                {/* 5. ACTION CONTROLS / FOOTER BUTTONS (Bottom Right Aligned) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 flex-wrap gap-4 select-none">
                  <button
                    type="button"
                    onClick={() => {
                      if (newLicStep > 1) {
                        setNewLicStep(newLicStep - 1);
                      } else {
                        setActiveTab("Home");
                      }
                    }}
                    className="outline-draft-btn"
                  >
                    <span>{newLicStep === 1 ? "Cancel Application" : "Go Back"}</span>
                  </button>

                  <div className="flex items-center gap-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        showToast("Filing details successfully saved as draft! You can access it anytime from Applied tab.");
                      }}
                      className="outline-draft-btn border-blue-200 hover:border-blue-400 text-blue-700"
                    >
                      <span>Save as Draft</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                     if (newLicStep === 3) {
                          if (!newLicData.selectedSubLicense) {
                            showToast("Please select a specific privilege license operational sub-type.", "error");
                            return;
                          }
                        } else if (newLicStep === 4) {
                          if (!newLicData.premiseAddress || !newLicData.pincode) {
                            showToast("Please enter the postal pin code and full physical premises address.", "error");
                            return;
                          }
                          if (newLicData.pincode.length < 6 || isNaN(newLicData.pincode)) {
                            showToast("Please input a valid 6-digit Delhi postal ZIP code.", "error");
                            return;
                          }
                        } else if (newLicStep === 5) {
                          if (!newLicData.hasFireNoc || !newLicData.hasTaxCompliance) {
                            showToast("Please upload and certify all credentials copies to continue.", "error");
                            return;
                          }
                        } else if (newLicStep === 6) {
                          if (!newLicData.declarationsChecked) {
                            showToast("Please check mark the GNCTD formal declaration checkbox to finalize.", "error");
                            return;
                          }
                          // Fire submit Success
                          setAppSubmissionCompleted(true);
                          showToast("Privilege Excise License Application filed successfully!");
                          return;
                        }

                        // Advance step
                        setNewLicStep(newLicStep + 1);
                      }}
                      className="blue-gradient-next-btn"
                    >
                      <span>
                        {newLicStep === 6 
                          ? `Submit & Pay` 
                          : "Next Step"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      ) : (
        <main className="page-container max-w-7xl mx-auto w-full flex-grow p-6">

          {/* HOME TAB MAIN CONTENT */}
          {activeTab === "Home" && (
            <>
              {/* HERO */}
              <div className="dashboard-card hero-card">
                <div className="hero-gradient">
                  <div className="hero-content mx-auto max-w-7xl">
                    <div>
                      <h1 className="hero-title">
                        Welcome back, Demo User 👋
                      </h1>

                      <p className="hero-description">
                        Manage applications, licenses, premises,
                        and approvals from a single unified portal.
                      </p>
                    </div>

                    <div className="hero-status">
                      <p className="hero-status-label">
                        Account Status
                      </p>

                      <h3 className="hero-status-value">
                        Active
                      </h3>

                      <p className="hero-status-label" style={{ marginTop: "16px" }}>
                        Last Login: Today, 12:18 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <section className="stats-grid mt-6">
                {statsData.map((item, index) => (
                  <StatCard key={index} item={item} />
                ))}
              </section>

              {/* RECENT LICENSES & USER PROFILE */}
              <div className="content-grid mt-6">

                {/* LICENSES */}
                <div className="dashboard-card section-padding">
                  <SectionTitle
                    title="Recent Licenses"
                    subtitle="Monitor and manage active permits"
                  />

                  <div className="search-wrapper">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />

                    <input
                      type="text"
                      placeholder="Search licenses..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="search-input"
                    />
                  </div>

                  <div className="license-list">
                    {filteredLicenses.map((license) => (
                      <LicenseCard
                        key={license.id}
                        license={license}
                      />
                    ))}
                  </div>
                </div>

                {/* PROFILE */}
                <div className="dashboard-card profile-card">
                  <SectionTitle
                    title="Profile"
                    subtitle="User account information"
                  />

                  <div className="profile-wrapper">
                    <div className="profile-avatar-large">
                      <User className="w-14 h-14 text-white" />
                    </div>

                    <h3 className="profile-name">
                      Demo User
                    </h3>

                    <p className="profile-role">
                      System Administrator
                    </p>

                    <div className="profile-details">
                      {[
                        {
                          label: "Email",
                          value: "demo@email.com",
                        },
                        {
                          label: "Mobile",
                          value: "+91 9876543210",
                        },
                        {
                          label: "State",
                          value: "Delhi",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="profile-row"
                        >
                          <span className="profile-label">
                            {item.label}
                          </span>

                          <span className="profile-value">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* APPLIED LICENSE VIEW */}
          {activeTab === "Applied License" && (
            <div className="space-y-6">
              <SectionTitle 
                title="Applied Licenses" 
                subtitle="Track the real-time processing status of your submitted applications" 
              />
              <div className="dashboard-card p-6 space-y-4 bg-white">
                <div className="flex justify-between items-center gap-4 flex-wrap pb-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg">Active Applications</h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">3 Applications Total</span>
                </div>
                
                {/* App 1 */}
                <div className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition bg-white space-y-4">
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Application ID:</span>
                        <span className="text-sm font-bold text-slate-700">AP-2026-88021</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base mt-1">L-1 Wholesale Vend of Indian Liquor</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Submitted Date: 14/05/2026</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                      Scrutiny in Progress
                    </span>
                  </div>
                  
                  {/* Stepper progress */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[
                      { label: "Submission", active: true, done: true },
                      { label: "Scrutiny", active: true, done: false },
                      { label: "Inspection", active: false, done: false },
                      { label: "Grant", active: false, done: false }
                    ].map((st, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className={`h-2 rounded-full ${st.done ? "bg-emerald-500" : st.active ? "bg-amber-500 animate-pulse" : "bg-slate-100"}`}></div>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center">{st.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App 2 */}
                <div className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition bg-white space-y-4">
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Application ID:</span>
                        <span className="text-sm font-bold text-slate-700">AP-2026-44012</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base mt-1">L-15 Hotel Bar License</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Submitted Date: 02/04/2026</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      Approved & Disbursed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {["Submission", "Scrutiny", "Inspection", "Grant"].map((label, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="h-2 rounded-full bg-emerald-500"></div>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App 3 */}
                <div className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition bg-white space-y-4">
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Application ID:</span>
                        <span className="text-sm font-bold text-slate-700">AP-2026-30219</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base mt-1">L-22 Club Bar License</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Submitted Date: 29/03/2026</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100 animate-pulse">
                      Clarification Needed
                    </span>
                  </div>
                  
                  <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-800 font-semibold mb-2">
                    <ShieldAlert className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Officer Remarks:</span> Fire Safety NOC is near-expiry. Please submit an updated certified copy in the <span className="underline cursor-pointer text-blue-600 font-bold" onClick={() => setActiveTab("Document Revalidate")}>Document Revalidate</span> tab to resume scrutiny.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RENEWAL LICENSE VIEW */}
          {activeTab === "Renewal License" && (
            <div className="space-y-6">
              <SectionTitle 
                title="License Renewal" 
                subtitle="Manage end-of-term extensions and annual duty clearances for active licenses" 
              />
              <div className="grid md:grid-cols-2 gap-6">
                {licenses.map((lic) => {
                  const isRenewed = renewedList[lic.id];
                  return (
                    <div key={lic.id} className="dashboard-card p-6 flex flex-col justify-between hover:shadow-md transition bg-white">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600">{lic.id}</span>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${isRenewed ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                            {isRenewed ? "Renewal Completed" : "Active & Renewal Eligible"}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg mt-2">{lic.type}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Valid till: <span className="font-bold text-slate-700">{isRenewed ? "31st March 2028" : "31st March 2027"}</span></span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-bold uppercase">Renewal Fee: ₹ 45,000</span>
                        <button 
                          onClick={() => handleRenew(lic.id)}
                          disabled={isRenewed}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer transition ${
                            isRenewed ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {isRenewed ? "Payment Cleared" : "Pay & Renew Now"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LICENSE TRANSFER VIEW */}
          {activeTab === "License Transfer" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <SectionTitle 
                title="License Transfer Portal" 
                subtitle="Apply for change of licensee ownership, management structure, or premises relocation" 
              />
              
              {transferSuccess ? (
                <div className="dashboard-card p-8 text-center space-y-4 bg-white">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Transfer Filed Successfully</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your application for <span className="font-semibold text-slate-700">{transferForm.type} Transfer</span> has been registered under Transaction ID <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">TR-2026-90812</span>. The scrutinizing officer will verify transferee credentials within 7 business days.
                  </p>
                  <button 
                    onClick={() => {
                      setTransferSuccess(false);
                      setTransferForm({ lic: "ND-25-L10023", type: "Ownership", transferee: "", remarks: "" });
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all"
                  >
                    Create Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTransfer} className="dashboard-card p-6 space-y-5 bg-white">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Select License</label>
                    <select 
                      value={transferForm.lic}
                      onChange={(e) => setTransferForm({ ...transferForm, lic: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-700"
                    >
                      {licenses.map(l => <option key={l.id} value={l.id}>{l.id} - {l.type}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Transfer Type</label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {["Ownership", "Premises Relocation"].map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setTransferForm({ ...transferForm, type })}
                          className={`p-3 rounded-xl border font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                            transferForm.type === type ? "bg-blue-50 border-blue-400 text-blue-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      {transferForm.type === "Ownership" ? "New Transferee Entity Registered Name" : "Proposed New Premises Complete Address"}
                    </label>
                    <input 
                      type="text"
                      placeholder={transferForm.type === "Ownership" ? "Legal Name of the Transferee entity" : "Enter complete new premise layout address"}
                      value={transferForm.transferee}
                      onChange={(e) => setTransferForm({ ...transferForm, transferee: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Justification for Transfer</label>
                    <textarea 
                      rows="3"
                      placeholder="Provide a legal brief of reasons for the transfer..."
                      value={transferForm.remarks}
                      onChange={(e) => setTransferForm({ ...transferForm, remarks: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-700 resize-none"
                    />
                  </div>

                  <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100/70 text-xs text-amber-800 font-semibold leading-relaxed">
                    <Info className="w-5 h-5 text-amber-600 shrink-0" />
                    <p>
                      Note: A non-refundable transfer processing fee of <span className="font-bold">₹ 15,000</span> will be applicable upon submission of this application.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition hover:scale-[1.01]"
                  >
                    File Transfer Application
                  </button>
                </form>
              )}
            </div>
          )}

          {/* DOCUMENT REVALIDATE VIEW */}
          {activeTab === "Document Revalidate" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <SectionTitle 
                title="Document Revalidation" 
                subtitle="Renew, re-upload, or verify secondary clearance and compliance certificates for active licenses" 
              />
              
              <div className="dashboard-card p-6 space-y-4 bg-white">
                <h3 className="font-bold text-slate-800 text-base">Clearance Document Checklist</h3>
                
                <div className="space-y-3 pt-2">
                  {Object.entries(docs).map(([key, item]) => {
                    return (
                      <div key={key} className="border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white hover:border-slate-200 transition">
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl ${
                            item.type === "verified" ? "bg-emerald-50 text-emerald-600" :
                            item.type === "expired" ? "bg-red-50 text-red-600" :
                            item.type === "uploading" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                          }`}>
                            <FileText className={`w-5 h-5 ${item.type === "uploading" ? "animate-spin" : ""}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.name}</h4>
                            <span className={`inline-block text-[11px] font-bold mt-1 px-2.5 py-0.5 rounded-full ${
                              item.type === "verified" ? "bg-emerald-50 text-emerald-700" :
                              item.type === "expired" ? "bg-red-50 text-red-700 animate-pulse" :
                              item.type === "uploading" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>

                        <div>
                          {item.type !== "verified" && (
                            <button 
                              onClick={() => handleUpload(key)}
                              disabled={item.type === "uploading"}
                              className="px-4 py-2 bg-[#0f2a52] hover:bg-slate-900 border-none text-white text-xs font-bold rounded-xl cursor-pointer transition flex items-center gap-1.5"
                            >
                              {item.type === "uploading" ? (
                                <>Processing...</>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Re-upload Document</span>
                                </>
                              )}
                            </button>
                          )}
                          {item.type === "verified" && (
                            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1 font-sans">
                              ✓ Compliance Validated
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* USER PROFILE TAB */}
          {activeTab === "UserProfile" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <SectionTitle 
                title="Account Profile" 
                subtitle="Manage user information, contact details, and registered authorization credentials" 
              />
              <div className="dashboard-card p-6 sm:p-8 bg-white space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-100 pb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                    DU
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-bold text-slate-800">Demo User</h3>
                    <p className="text-xs text-slate-400 font-medium font-sans">System Administrator • Active since Feb 2026</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">contact person name</label>
                    <input 
                      type="text" 
                      defaultValue="Demo User" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">official email ID</label>
                    <input 
                      type="email" 
                      defaultValue="demo@email.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">mobile number</label>
                    <input 
                      type="text" 
                      defaultValue="+91 9876543210" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Excise Dealer Code</label>
                    <input 
                      type="text" 
                      defaultValue="DL-RETAIL-990-26" 
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm cursor-not-allowed font-mono font-bold text-slate-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">registered organization address</label>
                    <textarea 
                      rows="2"
                      defaultValue="Plot 104, Okhla Industrial Area, Phase-III, New Delhi, Pin: 110020" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => showToast("Profile details updated successfully under security reference log!")}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition font-sans"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHANGE PASSWORD TAB */}
          {activeTab === "ChangePassword" && (
            <div className="space-y-6 max-w-xl mx-auto">
              <SectionTitle 
                title="Change Password" 
                subtitle="Update your system password regularly to maintain compliant login security standards" 
              />
              <div className="dashboard-card p-6 sm:p-8 bg-white space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">current password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">new password</label>
                  <input 
                    type="password" 
                    placeholder="Enter strong characters (min 8)" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">confirm new password</label>
                  <input 
                    type="password" 
                    placeholder="Re-type new password" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Password strength list */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Security Recommendations</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span>✓</span>
                      <span>Min 8 characters long</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span>✓</span>
                      <span>1+ Alpha character</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>○</span>
                      <span>1+ Special char (!,@,#)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>○</span>
                      <span>1+ Numeric value</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      showToast("Password changed successfully! Please use new credentials on next login.");
                      setActiveTab("Home");
                    }}
                    className="w-full py-3 bg-[#0f2a52] hover:bg-slate-900 border-none text-white text-xs font-bold rounded-xl cursor-pointer transition font-sans"
                  >
                    Confirm & Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW M&TP TAB */}
          {activeTab === "New M&TP" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <SectionTitle 
                title="Medicinal & Toilet Preparations (M&TP) License" 
                subtitle="Apply for a new license to manufacture or store products under the Medicinal and Toilet Preparations (Excise Duties) Act" 
              />

              {mtpSubmissionCompleted ? (
                <div className="dashboard-card p-8 text-center space-y-4 bg-white">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">M&TP Application Filed</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your formulation licensing request for <span className="font-semibold text-slate-700">{newMtpData.formulationName}</span> has been registered under Application Reference <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">MTP-2026-{Math.floor(1000 + Math.random() * 9000)}</span>. Technical scrutiny and chemical sample verification has been scheduled.
                  </p>
                  <button 
                    onClick={() => {
                      setMtpSubmissionCompleted(false);
                      setNewMtpData({
                        unitName: "Delhi Pharmaceutical Formulation Works",
                        formulationName: "",
                        formulationType: "Ayurvedic medicine (with self-generated alcohol)",
                        spiritType: "Rectified Spirit (95% v/v)",
                        annualRequirement: "5000 Litres",
                        drugLicenseNum: "",
                        declarationsChecked: false
                      });
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all"
                  >
                    File Another Formulation Application
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newMtpData.formulationName || !newMtpData.drugLicenseNum) {
                      showToast("Please fill all required formulation and drug license fields", "error");
                      return;
                    }
                    if (!newMtpData.declarationsChecked) {
                      showToast("Please accept the compliance declaration", "error");
                      return;
                    }

                    // Add to local state list
                    const newAppId = `MTP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    setMtpApplications(prev => [
                      {
                        id: newAppId,
                        unitName: newMtpData.unitName,
                        formulation: newMtpData.formulationName,
                        alcoholStrength: newMtpData.formulationType.includes("self-generated") ? "12% v/v (Self-generated)" : "90% v/v (Rectified Spirit)",
                        status: "Under Technical Review",
                        submittedDate: new Date().toLocaleDateString("en-GB"),
                        remarks: "New application filed under self-declaration standards"
                      },
                      ...prev
                    ]);

                    setMtpSubmissionCompleted(true);
                    showToast(`M&TP application ${newAppId} successfully processed!`);
                  }}
                  className="dashboard-card p-6 sm:p-8 bg-white space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Registered Unit / Manufactory Name *</label>
                      <input 
                        type="text" 
                        value={newMtpData.unitName}
                        onChange={(e) => setNewMtpData(p => ({ ...p, unitName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Delhi Laboratories Pvt Ltd"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Drug License State Reference No. *</label>
                      <input 
                        type="text" 
                        value={newMtpData.drugLicenseNum}
                        onChange={(e) => setNewMtpData(p => ({ ...p, drugLicenseNum: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. DL-DRUG-88229"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Proposed Formulation Brand/Generic Name *</label>
                      <input 
                        type="text" 
                        value={newMtpData.formulationName}
                        onChange={(e) => setNewMtpData(p => ({ ...p, formulationName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Medicated Herbal Syrup base"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Class of Medicinal Preparation *</label>
                      <select 
                        value={newMtpData.formulationType}
                        onChange={(e) => setNewMtpData(p => ({ ...p, formulationType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                      >
                        <option value="Ayurvedic medicine (with self-generated alcohol)">Ayurvedic medicine (with self-generated alcohol)</option>
                        <option value="Allopathic medicinal formulation (with spirit base)">Allopathic medicinal formulation (with spirit base)</option>
                        <option value="Homeopathic medicine tincture">Homeopathic medicine tincture</option>
                        <option value="Toilet preparation (perfume/cologne base)">Toilet preparation (perfume/cologne base)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Type of Alcohol/Spirit Base Required</label>
                      <select 
                        value={newMtpData.spiritType}
                        onChange={(e) => setNewMtpData(p => ({ ...p, spiritType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                      >
                        <option value="Rectified Spirit (95% v/v)">Rectified Spirit (95% v/v)</option>
                        <option value="Absolute Alcohol (99% + v/v)">Absolute Alcohol (99% + v/v)</option>
                        <option value="Denatured Spirit Base">Denatured Spirit Base</option>
                        <option value="Self-generating Herbal Yeast Ferment">Self-generating Herbal Yeast Ferment</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Estimated Annual Quota Requirement (LPL)</label>
                      <input 
                        type="text" 
                        value={newMtpData.annualRequirement}
                        onChange={(e) => setNewMtpData(p => ({ ...p, annualRequirement: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. 5000 Litres"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="mtp-check"
                      checked={newMtpData.declarationsChecked}
                      onChange={(e) => setNewMtpData(p => ({ ...p, declarationsChecked: e.target.checked }))}
                      className="mt-1 accent-blue-600 scale-110 cursor-pointer"
                    />
                    <label htmlFor="mtp-check" className="text-xs text-slate-500 font-semibold select-none leading-relaxed cursor-pointer">
                      I solemnly declare that the formulation ingredients, alcohol strength limits, and manufacturing procedures fulfill Delhi Excise and Drugs & Cosmetics Act rules. All samples will be placed to State Chemical Laboratories for compliance verification prior to dispatch.
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("Home")} 
                      className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition shadow-md"
                    >
                      Submit M&TP Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* APPLIED M&TP TAB */}
          {activeTab === "Applied M&TP" && (
            <div className="space-y-6">
              <SectionTitle 
                title="Active M&TP Scrutiny Ledger" 
                subtitle="Track current technical appraisals, formulation approvals, and spirit allotments for Medicinal & Toilet Preparations" 
              />

              <div className="space-y-4">
                {mtpApplications.map((app) => (
                  <div key={app.id} className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition bg-white shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[#0D9488] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">M&TP UNIT FILING</span>
                          <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base mt-2">{app.unitName}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Formulation:</span> {app.formulation} ({app.alcoholStrength})
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">Filing Registered on: {app.submittedDate}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          app.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          {app.remarks}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                      {[
                        { label: "Technical Appraisal", done: true },
                        { label: "Chemical Clearance", done: app.status === "Approved" },
                        { label: "Excise Inspection", done: app.status === "Approved" },
                        { label: "Quota Release", done: false }
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className={`h-2 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-100"}`}></div>
                          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEALER REGISTRATION TAB */}
          {activeTab === "Dealer Registration" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <SectionTitle 
                title="Excise Dealer & Sub-Dealer Registration" 
                subtitle="File security credentials, warehouse details, and trade classifications to active a registered spirit trade account" 
              />

              {dealerSubmissionCompleted ? (
                <div className="dashboard-card p-8 text-center space-y-4 bg-white">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Trade Dealer Account Submitted</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    The registration request for <span className="font-semibold text-slate-700">{newDealerData.firmName}</span> has been securely logged with security reference log under Application ID <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">DLR-2026-{Math.floor(1000 + Math.random() * 9000)}</span>. PAN & GSTIN integration clearance is currently on-going.
                  </p>
                  <button 
                    onClick={() => {
                      setDealerSubmissionCompleted(false);
                      setNewDealerData({
                        firmName: "",
                        ownerName: "",
                        licenseType: "L-13 Wholesale import bond storage",
                        panNum: "",
                        gstinNum: "",
                        warehouseAddress: "",
                        declarationsChecked: false
                      });
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all"
                  >
                    Register Another Dealer Account
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newDealerData.firmName || !newDealerData.panNum || !newDealerData.gstinNum) {
                      showToast("Please fill all required business and tax identifier fields", "error");
                      return;
                    }
                    if (!newDealerData.declarationsChecked) {
                      showToast("Please accept the compliance & trade declaration", "error");
                      return;
                    }

                    // Add to dealer applications state list
                    const referenceNum = `DLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    setDealerApplications(prev => [
                      {
                        id: referenceNum,
                        firmName: newDealerData.firmName,
                        licenseType: newDealerData.licenseType,
                        panNum: newDealerData.panNum.toUpperCase(),
                        status: "Under Assessment",
                        submittedDate: new Date().toLocaleDateString("en-GB"),
                        remarks: "Verification of bonded store space under technical review"
                      },
                      ...prev
                    ]);

                    setDealerSubmissionCompleted(true);
                    showToast(`Dealer registration ${referenceNum} filed under administrative scrutiny ledger!`);
                  }}
                  className="dashboard-card p-6 sm:p-8 bg-white space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Registered Firm / Business Name *</label>
                      <input 
                        type="text" 
                        value={newDealerData.firmName}
                        onChange={(e) => setNewDealerData(p => ({ ...p, firmName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Imperial Spirits Trade Corp"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Proprietor / Representative Full Name *</label>
                      <input 
                        type="text" 
                        value={newDealerData.ownerName}
                        onChange={(e) => setNewDealerData(p => ({ ...p, ownerName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Ramesh Chandra"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Firm Income Tax PAN *</label>
                      <input 
                        type="text" 
                        value={newDealerData.panNum}
                        onChange={(e) => setNewDealerData(p => ({ ...p, panNum: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. AAACS0409A"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">State GSTIN ID / Code *</label>
                      <input 
                        type="text" 
                        value={newDealerData.gstinNum}
                        onChange={(e) => setNewDealerData(p => ({ ...p, gstinNum: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. 07AAACS0409A1ZP"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Excise Dealer Category Class *</label>
                      <select 
                        value={newDealerData.licenseType}
                        onChange={(e) => setNewDealerData(p => ({ ...p, licenseType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-bold text-slate-750"
                      >
                        <option value="L-13 Wholesale import bond storage">L-13 Wholesale import bond storage</option>
                        <option value="L-15 Wholesale custom bond ware-house">L-15 Wholesale custom bond ware-house</option>
                        <option value="L-2 Retail Vend of Beer & Wine">L-2 Retail Vend of Beer & Wine</option>
                        <option value="L-3 Retail Vend of Indian Liquor">L-3 Retail Vend of Indian Liquor</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Bonded Warehouse / Stockroom Location address *</label>
                      <textarea 
                        rows="2"
                        value={newDealerData.warehouseAddress}
                        onChange={(e) => setNewDealerData(p => ({ ...p, warehouseAddress: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700 resize-none"
                        placeholder="Plot number, industrial cluster, sector, PIN..."
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="dealer-check"
                      checked={newDealerData.declarationsChecked}
                      onChange={(e) => setNewDealerData(p => ({ ...p, declarationsChecked: e.target.checked }))}
                      className="mt-1 accent-indigo-600 scale-110 cursor-pointer"
                    />
                    <label htmlFor="dealer-check" className="text-xs text-slate-500 font-semibold select-none leading-relaxed cursor-pointer">
                      I solemnly affirm that the trade corporation complies fully with tax guidelines, active trade laws, safety regulations, and holds no active excise or customs duty defaults under state or federal laws.
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 font-sans">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("Home")} 
                      className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2.5 bg-[#4f46e5] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition shadow-md"
                    >
                      Register Trade Dealer Account
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* APPLIED DEALERS TAB */}
          {activeTab === "Applied Dealers" && (
            <div className="space-y-6">
              <SectionTitle 
                title="Active Dealer Appraisals Log" 
                subtitle="Track trade registrations, warehouse clearances, and active custom security receipts" 
              />

              <div className="space-y-4">
                {dealerApplications.map((app) => (
                  <div key={app.id} className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition bg-white shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[#4f46e5] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">EXCISE TRADE DEALER</span>
                          <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base mt-2">{app.firmName}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Category Class:</span> {app.licenseType} (PAN: {app.panNum})
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium font-sans">Filing Registered on: {app.submittedDate}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          app.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          {app.remarks}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                      {[
                        { label: "Credentials Audit", done: true },
                        { label: "Tax Clearance Verification", done: true },
                        { label: "Stockroom Security Inspection", done: app.status === "Approved" },
                        { label: "Trade Authorization Active", done: app.status === "Approved" }
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className={`h-2 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-100"}`}></div>
                          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REGISTER PREMISE TAB */}
          {activeTab === "Register Premise" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <SectionTitle 
                title="Register Physical Premise" 
                subtitle="Apply for excise registration and physical verification of a retail, wholesale, or bonded store space" 
              />

              {premiseSubmissionCompleted ? (
                <div className="dashboard-card p-8 text-center space-y-4 bg-white">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Premise Registration Filed</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    The registration dossier for <span className="font-semibold text-slate-700">{newPremiseData.premiseName}</span> has been compiled and saved. Your request ID is <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">PM-2026-{Math.floor(1000 + Math.random() * 9000)}</span>. State safety division dispatchers will reach out for physical measurements.
                  </p>
                  <button 
                    onClick={() => {
                      setPremiseSubmissionCompleted(false);
                      setNewPremiseData({
                        premiseName: "",
                        ownerName: "",
                        address: "",
                        premiseType: "Bonded Warehouse Store",
                        dimensions: "3,000 Sq. Ft.",
                        fireNocNumber: "",
                        securityDepositReceipt: "",
                        declarationsChecked: false
                      });
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all"
                  >
                    Register Another Premise
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newPremiseData.premiseName || !newPremiseData.address || !newPremiseData.fireNocNumber) {
                      showToast("Please fill all required brand, address, and clearance fields", "error");
                      return;
                    }
                    if (!newPremiseData.declarationsChecked) {
                      showToast("Please accept the physical safety compliance bounds", "error");
                      return;
                    }

                    // Add to premise applications state list
                    const referenceNum = `PM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    setPremiseApplications(prev => [
                      {
                        id: referenceNum,
                        premiseName: newPremiseData.premiseName,
                        address: newPremiseData.address,
                        premiseType: newPremiseData.premiseType,
                        dimensions: newPremiseData.dimensions,
                        status: "Under Physical Inspection",
                        submittedDate: new Date().toLocaleDateString("en-GB"),
                        remarks: "Verification of bonded store safety metrics registered"
                      },
                      ...prev
                    ]);

                    setPremiseSubmissionCompleted(true);
                    showToast(`Premise registration filed under ${referenceNum}`);
                  }}
                  className="dashboard-card p-6 sm:p-8 bg-white space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Premise / Trade Depot Name *</label>
                      <input 
                        type="text" 
                        value={newPremiseData.premiseName}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, premiseName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. West Delhi Distributing Depot"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Area / Floor Dimensions *</label>
                      <input 
                        type="text" 
                        value={newPremiseData.dimensions}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, dimensions: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. 3,500 Sq. Ft."
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Fire Safety NOC Reference *</label>
                      <input 
                        type="text" 
                        value={newPremiseData.fireNocNumber}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, fireNocNumber: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. DFS/NOC/2026/XXXX"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Treasury Security Deposit Receipt</label>
                      <input 
                        type="text" 
                        value={newPremiseData.securityDepositReceipt}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, securityDepositReceipt: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. SD-EXE-99381-2026"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Premise Category Classification *</label>
                      <select 
                        value={newPremiseData.premiseType}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, premiseType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-bold text-slate-750"
                      >
                        <option value="Bonded Warehouse Store">Bonded Warehouse Store</option>
                        <option value="Retail Vend Shop">Retail Vend Shop</option>
                        <option value="Micro-brewery Service Deck">Micro-brewery Service Deck</option>
                        <option value="Temporary Permit Bar Ground">Temporary Permit Bar Ground</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Landmark Address & Plot Location *</label>
                      <textarea 
                        rows="2"
                        value={newPremiseData.address}
                        onChange={(e) => setNewPremiseData(p => ({ ...p, address: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700 resize-none"
                        placeholder="Specific road, industrial sector details, block number, Pin code..."
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="premise-check"
                      checked={newPremiseData.declarationsChecked}
                      onChange={(e) => setNewPremiseData(p => ({ ...p, declarationsChecked: e.target.checked }))}
                      className="mt-1 accent-amber-600 scale-110 cursor-pointer"
                    />
                    <label htmlFor="premise-check" className="text-xs text-slate-500 font-semibold select-none leading-relaxed cursor-pointer">
                      I certify that the store premise is safe, possesses lockable warehouses conforming to physical security standards, and matches dimensions described above. I understand and welcome physical surprise audits by state excise agents.
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 font-sans">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("Home")} 
                      className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition shadow-md"
                    >
                      File Premise Registration
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* APPLIED PREMISE TAB */}
          {activeTab === "Applied Premise" && (
            <div className="space-y-6">
              <SectionTitle 
                title="Registered Excise Premises Registry" 
                subtitle="Track current safety certificates, fire audits, and active physical statuses of your warehouses" 
              />

              <div className="space-y-4">
                {premiseApplications.map((app) => (
                  <div key={app.id} className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition bg-white shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[#d97706] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">EXCISE PHYSICAL PREMISE</span>
                          <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base mt-2">{app.premiseName}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Type / Dimension:</span> {app.premiseType} ({app.dimensions})
                        </p>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Location:</span> {app.address}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium font-sans mt-0.5">Application Filed on: {app.submittedDate}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          app.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          {app.remarks}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                      {[
                        { label: "Fire Scrutiny", done: true },
                        { label: "Physical Verification", done: true },
                        { label: "Safety Audit clearance", done: app.status === "Approved" },
                        { label: "Premise Active", done: app.status === "Approved" }
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className={`h-2 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-100"}`}></div>
                          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW PERMIT TAB */}
          {activeTab === "New Permit" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <SectionTitle 
                title="Excise Transport & Special Permit" 
                subtitle="File an application to obtain local bulk cargo movement passes or special single-day trade permits" 
              />

              {permitSubmissionCompleted ? (
                <div className="dashboard-card p-8 text-center space-y-4 bg-white">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Transport Permit Authorized</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    The consignment permit request for <span className="font-semibold text-slate-700">{newPermitData.consignmentDetails}</span> has been processed. Permit transit code: <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">PRM-2026-{Math.floor(1000 + Math.random() * 9000)}</span>. Keep cargo sheets inside carrier <span className="font-semibold font-mono text-slate-700">{newPermitData.carrierLicense}</span> during logistics movement.
                  </p>
                  <button 
                    onClick={() => {
                      setPermitSubmissionCompleted(false);
                      setNewPermitData({
                        permitType: "Local Transport Permit (Bulk Movement)",
                        sourcePremise: "Central Delhi Logistics Hub (Okhla)",
                        destPremise: "West Delhi Distributing Depot (Mayapuri)",
                        consignmentDetails: "",
                        carrierLicense: "",
                        declarationsChecked: false
                      });
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all"
                  >
                    File Another Permit Request
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newPermitData.consignmentDetails || !newPermitData.carrierLicense) {
                      showToast("Please specify cargo description and vehicle carrier license", "error");
                      return;
                    }
                    if (!newPermitData.declarationsChecked) {
                      showToast("Please agree to transport transit regulations", "error");
                      return;
                    }

                    // Add to permit applications list
                    const referenceNum = `PRM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    setPermitApplications(prev => [
                      {
                        id: referenceNum,
                        permitType: newPermitData.permitType,
                        sourcePremise: newPermitData.sourcePremise,
                        destPremise: newPermitData.destPremise,
                        consignmentDetails: newPermitData.consignmentDetails,
                        carrierLicense: newPermitData.carrierLicense.toUpperCase(),
                        status: "Approved",
                        submittedDate: new Date().toLocaleDateString("en-GB"),
                        remarks: "Gate pass printed, routing active"
                      },
                      ...prev
                    ]);

                    setPermitSubmissionCompleted(true);
                    showToast(`Permise transport permit ${referenceNum} processed!`);
                  }}
                  className="dashboard-card p-6 sm:p-8 bg-white space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Class of Excise Permit *</label>
                      <select 
                        value={newPermitData.permitType}
                        onChange={(e) => setNewPermitData(p => ({ ...p, permitType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-bold text-slate-755"
                      >
                        <option value="Local Transport Permit (Bulk Movement)">Local Transport Permit (Bulk Movement)</option>
                        <option value="Import Permit (Out-of-State Customs Movement)">Import Permit (Out-of-State Customs Movement)</option>
                        <option value="Export Transport Gate Pass">Export Transport Gate Pass</option>
                        <option value="Special One-Day Event Temporary Permit">Special One-Day Event Temporary Permit</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Consignment Dispatch Source *</label>
                      <input 
                        type="text" 
                        value={newPermitData.sourcePremise}
                        onChange={(e) => setNewPermitData(p => ({ ...p, sourcePremise: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Okhla Warehouse Center"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Consignment Receiving Destination *</label>
                      <input 
                        type="text" 
                        value={newPermitData.destPremise}
                        onChange={(e) => setNewPermitData(p => ({ ...p, destPremise: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. Vedic Retail Shop, Mayapuri"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Vehicle/Carrier License Number *</label>
                      <input 
                        type="text" 
                        value={newPermitData.carrierLicense}
                        onChange={(e) => setNewPermitData(p => ({ ...p, carrierLicense: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono font-bold text-slate-700"
                        placeholder="e.g. DL-1LM-9902"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Brand / Consignment Contents Summary *</label>
                      <input 
                        type="text" 
                        value={newPermitData.consignmentDetails}
                        onChange={(e) => setNewPermitData(p => ({ ...p, consignmentDetails: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                        placeholder="e.g. 100 cases of Indian Malt Whiskey"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="permit-check"
                      checked={newPermitData.declarationsChecked}
                      onChange={(e) => setNewPermitData(p => ({ ...p, declarationsChecked: e.target.checked }))}
                      className="mt-1 accent-amber-600 scale-110 cursor-pointer"
                    />
                    <label htmlFor="permit-check" className="text-xs text-slate-500 font-semibold select-none leading-relaxed cursor-pointer">
                      I solemnly affirm that this transit belongs exclusively to authorized trade stockroom allocations, and cargo quantities correspond to state excise tax clearances identically.
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 font-sans">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("Home")} 
                      className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition shadow-md"
                    >
                      Process & Print Permit
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* APPLIED PERMIT TAB */}
          {activeTab === "Applied Permit" && (
            <div className="space-y-6">
              <SectionTitle 
                title="Active Transit Gate Pass & Permit Ledger" 
                subtitle="Track active carrier transit licenses, dispatcher routes, and temporary event permits" 
              />

              <div className="space-y-4">
                {permitApplications.map((app) => (
                  <div key={app.id} className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition bg-white shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[#b45309] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">EXCISE TRANSIT PERMIT</span>
                          <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base mt-2">{app.permitType}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Consignment:</span> {app.consignmentDetails}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Carrier Vehicle:</span> {app.carrierLicense}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          <span className="text-slate-400 font-medium font-sans uppercase text-[10px]">Route:</span> From {app.sourcePremise} To {app.destPremise}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium font-sans mt-0.5">Permit Generated on: {app.submittedDate}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          app.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          {app.remarks}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                      {[
                        { label: "Cargo Declaration", done: true },
                        { label: "Tax Stamp Verification", done: true },
                        { label: "Carrier Audit", done: true },
                        { label: "Transit Pass Ready", done: app.status === "Approved" }
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className={`h-2 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-100"}`}></div>
                          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS (MTP, Dealer, Profile, etc. if anyone selects them) */}
          {!["Home", "New License", "Applied License", "Renewal License", "License Transfer", "Document Revalidate", "UserProfile", "ChangePassword", "New M&TP", "Applied M&TP", "Dealer Registration", "Applied Dealers", "Register Premise", "Applied Premise", "New Permit", "Applied Permit"].includes(activeTab) && (
            <div className="dashboard-card section-padding text-center bg-white">
              <h2 className="section-title text-3xl font-bold">
                {activeTab} Module
              </h2>

              <p className="section-subtitle mt-3">
                This module is now fully modular and ready
                for scalable feature integration.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
