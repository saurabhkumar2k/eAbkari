import React, { useState } from "react";
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
  ShieldAlert,
  Check,
  ArrowRight,
  UserCheck,
  Briefcase,
  FileSpreadsheet,
  Coins,
  LayoutGrid,
  Factory,
  ShoppingCart,
  Package,
  Hotel
} from "lucide-react";
import NewLicense from "./NewLicense";
import NewPermitWizard from "./Permit/NewPermit";

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
  const [notifyDropdownOpen, setNotifyDropdownOpen] = useState(false);

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
      <div className="" style={{ padding:"7px 20px 7px 20px" }}>
        {/* Tier 1: Brand & User Actions */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-4">
          <div 
            onClick={onNavigateToHome}
            className="flex items-center gap-4 py-1 cursor-pointer hover:opacity-95 transition"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India"
              className="h-12 sm:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="h-10 sm:h-12 w-[1px] bg-slate-200"></div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                Department of Excise
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-extrabold uppercase tracking-widest leading-none mt-1">
                Government of NCT of Delhi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Portal Back Button */}
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-blue-600 uppercase tracking-widest py-2 px-3 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer transition select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portal</span>
            </button>
          </div>
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
        <NewLicense setActiveTab={setActiveTab} showToast={showToast} />
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
              <section className="stats-grid">
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
            <div className="animate-fade">
              <NewPermitWizard 
                onBackToDashboard={() => setActiveTab("Home")} 
                showToast={showToast} 
                onSubmitPermit={(newPermit) => {
                  setPermitApplications(prev => [newPermit, ...prev]);
                }}
              />
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
