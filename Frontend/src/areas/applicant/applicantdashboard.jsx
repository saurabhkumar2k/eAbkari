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
      <div className="header-container">

        <div className="space-y-2">
          <div className="card-header">
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

          <h3  className="section-title" style={{ marginTop: "12px" }}>
            {license.type}
          </h3>

          <p className="description">
            {license.location}
          </p>
        </div>

        <button className="primary-btn">
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
   <header className="dashboard-header">
    <div className="header-container" style={{ padding: "7px 20px 7px 20px" }} >
    {/* Tier 1: Brand & User Actions */}
    <div className="header-top-row">
      <div
        onClick={onNavigateToHome}
        className="header-brand"
      >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India"
              className="header-logo"
              referrerPolicy="no-referrer"
            />
           <div className="header-divider"></div>
           <div className="header-title-section">
            <h1 className="header-main-title"> Department of Excise </h1>
            <p className="header-tagline"> Government of NCT of Delhi </p>
            </div>
          </div>

         <div className="header-actions">
  {/* Portal Back Button */}
  <button
    onClick={onNavigateToHome}
    className="portal-back-btn"
  >
    <ArrowLeft className="portal-back-icon" />
    <span className="portal-back-text">Portal</span>
  </button>
          </div>
        </div>

        {/* Tier 2: Beautiful Centered Horizontal Navigation with exact button size */}
        <div className="w-full py-1">
          <div className="header-menu-wrapper">
           <div className="header-menu">
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
                        <div className="menu-item-content">
                        <Icon className="menu-item-icon" />
                        <span className="menu-item-label"> {item.label}
                        </span>
                        </div>

                        <ChevronDown className={`dropdown-arrow ${ licenseDropdownOpen ? "dropdown-arrow-open" : "" }`} />
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

                        <ChevronDown className={`dropdown-icon  ${mtpDropdownOpen ? "rotate-180" : ""}`} />
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
    className={`toast-message ${
      toastMessage.type === "success"
        ? "toast-success"
        : "toast-error"
    }`}
  >
    {toastMessage.type === "success" ? (
      <CheckCircle2 className="toast-icon success-icon" />
    ) : (
      <ShieldAlert className="toast-icon error-icon" />
    )}

    <span className="toast-text">{toastMessage.msg}</span>
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
                   <Search className="search-icon" />

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
                     <User className="user-icon" />
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
             <div className="dashboard-card active-applications-card">
              <div className="applications-header">
              <h3 className="applications-title">Active Applications</h3>
              <span className="applications-badge"> 3 Applications Total </span>
              </div>
             </div>
                
                {/* App 1 */}
                <div className="application-card">
                  <div className="application-header">
                  <div>
                  <div className="application-id-row">
                    <span className="application-id-label"> Application ID: </span>
                    <span className="application-id-value"> AP-2026-88021 </span>
                  </div>
                  <h4 className="application-title"> L-1 Wholesale Vend of Indian Liquor </h4>
                  <p className="application-date"> Submitted Date: 14/05/2026 </p>
                  </div>
                  <span className="application-status"> Scrutiny in Progress </span>
                </div>

                  
                  {/* Stepper progress */}
                  <div className="application-progress-grid">
                     {[
                      { label: "Submission", active: true, done: true },
                      { label: "Scrutiny", active: true, done: false },
                      { label: "Inspection", active: false, done: false },
                      { label: "Grant", active: false, done: false }
                    ].map((st, idx) => (
                    <div key={idx} className="progress-step">
                      <div className={`progress-bar ${ st.done
                      ? "progress-done"
                      : st.active
                      ? "progress-active"
                      : "progress-pending"
                    }`}>                       
                    </div> 
                    <p className="progress-label">{st.label}</p>
                    </div>
                  ))}
                  </div>
 

                {/* App 2 */}
                <div className="application-card">
                  <div className="application-header">
                  <div>
                  <div className="application-id-row">
                  <span className="application-id-label"> Application ID: </span>
                  <span className="application-id-value"> AP-2026-44012 </span>
                  </div>
                  <h4 className="application-title"> L-15 Hotel Bar License </h4>
                  <p className="application-date"> Submitted Date: 02/04/2026 </p> 
                  </div>
                  <span className="application-status application-status-success"> Approved &amp; Disbursed </span>
                  </div>
                 
                  <div className="application-progress-grid">
                    {["Submission", "Scrutiny", "Inspection", "Grant"].map((label, idx) => (
                      <div key={idx} className="progress-step">
                      <div className="progress-bar progress-done"></div>
                      <p className="progress-label"> {label} </p>
                      </div>
                    ))}
                  </div>
                </div>

             {/* App 3 */}
             <div className="application-card">
              <div className="application-header">
              <div>
              <div className="application-id-row">
              <span className="application-id-label"> Application ID: </span>
              <span className="application-id-value"> AP-2026-30219</span>
              </div>
              <h4 className="application-title"> L-22 Club Bar License </h4>
              <p className="application-date"> Submitted Date: 29/03/2026 </p>
              </div>
              <span className="application-status application-status-clarification"> Clarification Needed </span>
              </div>
                               
                  <div className="officer-remarks-box">
                    <ShieldAlert className="officer-remarks-icon" />
                    <div>
                      <span className="font-bold">Officer Remarks:</span> Fire Safety NOC is near-expiry. Please submit an updated certified copy in the 
                      <span className="document-revalidate-link"onClick={() => setActiveTab("Document Revalidate")}>Document Revalidate</span> tab to resume scrutiny.
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
                    <div key={lic.id} className="license-card">
                      <div className="license-card-content">
                      <div className="license-card-header">
                        <span className="license-id"> {lic.id} </span>
                        <span className={`license-status ${ isRenewed ? "license-status-renewed" : "license-status-active" }`} >
                        {isRenewed ? "Renewal Completed" : "Active & Renewal Eligible"}
                        </span>
                      </div>
                       <h4 className="license-title">{lic.type}</h4>
                       <div className="license-validity">
                      <Calendar className="license-calendar-icon" />
                      <span> Valid till:{" "} <span className="license-validity-date">
                      {isRenewed ? "31st March 2028" : "31st March 2027"}
                      </span>
                      </span>
                    </div>
                    </div>
                      
                    <div className="renewal-footer">
                      <span className="renewal-fee">Renewal Fee: ₹ 45,000 </span>
                      <button onClick={() => handleRenew(lic.id)} disabled={isRenewed}
                      className={`renewal-btn ${ isRenewed ? "renewal-btn-disabled" : "renewal-btn-active" }`} >
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
            <div className="license-transfer-container">
            <SectionTitle title="License Transfer Portal" 
            subtitle="Apply for change of licensee ownership, management structure, or premises relocation"/>
              {transferSuccess ? (
               <div className="license-transfer-container">
                   <SectionTitle title="License Transfer Portal" 
                   subtitle="Apply for change of licensee ownership, management structure, or premises relocation" />

                <h3 className="transfer-success-title"> Transfer Filed Successfully </h3>
                <p className="transfer-success-message"> Your application for{" "}
                <span className="transfer-type"> {transferForm.type} Transfer </span>{" "} has been registered under Transaction ID{" "}
                <span className="transaction-id"> TR-2026-90812 </span>. The scrutinizing officer will verify transferee credentials within 7 business days.
                </p>
                  <button onClick={() => {
                  setTransferSuccess(false); setTransferForm({ lic: "ND-25-L10023", type: "Ownership",transferee: "", remarks: "", });
                  }} className="transfer-new-request-btn">Create Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTransfer} className="dashboard-card transfer-form">
                  <div className="transfer-form-group">
                  <label className="transfer-form-label"> Select License </label>

    <select
      value={transferForm.lic}
      onChange={(e) =>
        setTransferForm({ ...transferForm, lic: e.target.value })
      }
      className="transfer-form-select"
    >
      {licenses.map((l) => (
        <option key={l.id} value={l.id}>
          {l.id} - {l.type}
        </option>
      ))}
    </select>
  </div>

                 <div className="transfer-form-group">
  <label className="transfer-form-label">
    Transfer Type
  </label>

  <div className="transfer-type-grid">
    {["Ownership", "Premises Relocation"].map(type => (
      <button
        type="button"
        key={type}
        onClick={() => setTransferForm({ ...transferForm, type })}
        className={`transfer-type-btn ${
          transferForm.type === type
            ? "transfer-type-btn-active"
            : "transfer-type-btn-inactive"
        }`}
      >
        <RefreshCw className="transfer-type-icon" />
        <span>{type}</span>
      </button>
    ))}
                  </div>
</div>
                  <div className="transfer-form-group">
  <label className="transfer-form-label">
    {transferForm.type === "Ownership"
      ? "New Transferee Entity Registered Name"
      : "Proposed New Premises Complete Address"}
  </label>

  <input
    type="text"
    placeholder={
      transferForm.type === "Ownership"
        ? "Legal Name of the Transferee entity"
        : "Enter complete new premise layout address"
    }
    value={transferForm.transferee}
    onChange={(e) =>
      setTransferForm({
        ...transferForm,
        transferee: e.target.value,
      })
    }
    className="transfer-form-input"
  />
</div>

                  <div className="transfer-form-group">
  <label className="transfer-form-label">
    Justification for Transfer
  </label>

  <textarea
    rows="3"
    placeholder="Provide a legal brief of reasons for the transfer..."
    value={transferForm.remarks}
    onChange={(e) =>
      setTransferForm({
        ...transferForm,
        remarks: e.target.value,
      })
    }
    className="transfer-form-textarea"
  />
</div>

               <div className="transfer-note-box">
  <Info className="transfer-note-icon" />
  <p>
    Note: A non-refundable transfer processing fee of{" "}
    <span className="transfer-note-fee">₹ 15,000</span> will be applicable
    upon submission of this application.
  </p>
</div>

<button
  type="submit"
  className="transfer-submit-btn"
>
  File Transfer Application
</button>
</form>
)}
</div>
          )}

          {/* DOCUMENT REVALIDATE VIEW */}
          {activeTab === "Document Revalidate" && (
           <div className="document-revalidation-container">
           <SectionTitle title="Document Revalidation"
           subtitle="Renew, re-upload, or verify secondary clearance and compliance certificates for active licenses"/>
              
              <div className="dashboard-card checklist-card">
  <h3 className="checklist-title">
    Clearance Document Checklist
  </h3>
                
<div className="checklist-items">
  {Object.entries(docs).map(([key, item]) => {
    return (
      <div key={key} className="document-card">
        <div className="document-info">
          <div
            className={`document-icon-wrapper ${
              item.type === "verified"
                ? "document-icon-verified"
                : item.type === "expired"
                ? "document-icon-expired"
                : item.type === "uploading"
                ? "document-icon-uploading"
                : "document-icon-pending"
            }`}
          >
            <FileText
              className={`document-icon ${
                item.type === "uploading" ? "document-icon-spin" : ""
              }`}
            />
          </div>
                          <div>
  <h4 className="document-name">
    {item.name}
  </h4>

  <span
    className={`document-status-badge ${
      item.type === "verified"
        ? "document-status-verified"
        : item.type === "expired"
        ? "document-status-expired"
        : item.type === "uploading"
        ? "document-status-uploading"
        : "document-status-pending"
    }`}
  >
    {item.status}
  </span>
</div>
                        </div>

                        <div>
                          {item.type !== "verified" && (
                            <button 
                              onClick={() => handleUpload(key)}
                              disabled={item.type === "uploading"}
                              className="document-action-btn"
                            >
                              {item.type === "uploading" ? (
                                <>Processing...</>
                              ) : (
                                <>
                                  <Upload className="document-action-icon" />
                                  <span>Re-upload Document</span>
                                </>
                              )}
                            </button>
                          )}
                          {item.type === "verified" && (
                           <span className="verified-status-badge">
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
            <div className="profile-container">
  <SectionTitle
    title="Account Profile"
    subtitle="Manage user information, contact details, and registered authorization credentials"
  />
              <div className="dashboard-card profile-card">
  <div className="profile-header">
    <div className="profile-avatar">
      DU
    </div>
                  <div className="profile-user-info">
  <h3 className="profile-user-name">
    Demo User
  </h3>

  <p className="profile-user-role">
    System Administrator • Active since Feb 2026
  </p>
</div>
</div>

                <div className="profile-form-grid">
  <div className="profile-form-group">
    <label className="profile-form-label">
      contact person name
    </label>

    <input
      type="text"
      defaultValue="Demo User"
      className="profile-form-input"
    />
                  </div>
<div className="profile-form-group">
  <label className="profile-form-label">
    official email ID
  </label>

  <input
    type="email"
    defaultValue="demo@email.com"
    className="profile-form-input"
  />
</div>
                  <div className="profile-form-group">
  <label className="profile-form-label">
    mobile number
  </label>

  <input
    type="text"
    defaultValue="+91 9876543210"
    className="profile-form-input"
  />
</div>

<div className="profile-form-group">
  <label className="profile-form-label">
    Excise Dealer Code
  </label>

  <input
    type="text"
    defaultValue="DL-RETAIL-990-26"
    disabled
    className="profile-form-input-disabled"
  />
                  </div>
                  <div className="profile-form-group profile-form-full-width">
  <label className="profile-form-label">
    registered organization address
  </label>

  <textarea
    rows="2"
    defaultValue="Plot 104, Okhla Industrial Area, Phase-III, New Delhi, Pin: 110020"
    className="profile-form-textarea"
  />
</div>

</div>

<div className="profile-actions">
  <button
    onClick={() =>
      showToast(
        "Profile details updated successfully under security reference log!"
      )
    }
    className="profile-save-btn"
  >
    Save Changes
  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHANGE PASSWORD TAB */}
          {activeTab === "ChangePassword" && (
            <div className="password-container">
            <SectionTitle title="Change Password" 
            subtitle="Update your system password regularly to maintain compliant login security standards" />
            <div className="dashboard-card password-card">
            <div className="password-form-group">
            <label className="password-form-label"> current password </label>
            <input type="password" placeholder="••••••••••••" className="password-form-input" />
            </div>
            <div className="password-form-group">
            <label className="password-form-label"> new password </label>
            <input type="password" placeholder="Enter strong characters (min 8)" className="password-form-input" />
            </div>
            <div className="password-form-group">
              <label className="password-form-label"> confirm new password </label>
              <input type="password" placeholder="Re-type new password" className="password-form-input" />
                </div>

                {/* Password strength list */}
                <div className="security-recommendations">
  <span className="security-recommendations-title">
    Security Recommendations
  </span>

  <div className="security-recommendations-grid">
    <div className="security-recommendation-item security-recommendation-success">
      <span>✓</span>
      <span>Min 8 characters long</span>
    </div>
                    <div className="security-recommendation-item security-recommendation-success">
  <span>✓</span>
  <span>1+ Alpha character</span>
</div>

<div className="security-recommendation-item security-recommendation-pending">
  <span>○</span>
  <span>1+ Special char (!,@,#)</span>
</div>

<div className="security-recommendation-item security-recommendation-pending">
  <span>○</span>
  <span>1+ Numeric value</span>
</div>
                  </div>
                </div>

                <div className="password-action-section">
  <button
    onClick={() => {
      showToast("Password changed successfully! Please use new credentials on next login.");
      setActiveTab("Home");
    }}
    className="password-update-btn"
  >
    Confirm & Update Password
  </button>

                </div>
              </div>
            </div>
          )}

          {/* NEW M&TP TAB */}
          {activeTab === "New M&TP" && (
            <div className="mtp-license-container">
  <SectionTitle
    title="Medicinal & Toilet Preparations (M&TP) License"
    subtitle="Apply for a new license to manufacture or store products under the Medicinal and Toilet Preparations (Excise Duties) Act"
  />

              {mtpSubmissionCompleted ? (
                <div className="dashboard-card mtp-success-card">
  <div className="mtp-success-icon-wrapper">
    <CheckCircle2 className="mtp-success-icon" />
  </div>

  <h3 className="mtp-success-title">
    M&TP Application Filed
  </h3>

  <p className="mtp-success-message">
    Your formulation licensing request for{" "}
    <span className="mtp-formulation-name">
      {newMtpData.formulationName}
    </span>{" "}
    has been registered under Application Reference{" "}
    <span className="mtp-reference-id">
      MTP-2026-{Math.floor(1000 + Math.random() * 9000)}
    </span>.
    Technical scrutiny and chemical sample verification has been scheduled.
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
                    className="mtp-reset-btn"
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
                 className="mtp-form-card"
                >
                  <div className="mtp-form-grid">
  <div className="mtp-form-group">
    <label className="mtp-form-label">
      Registered Unit / Manufactory Name *
    </label>

    <input
      type="text"
      value={newMtpData.unitName}
      onChange={(e) =>
        setNewMtpData((p) => ({
          ...p,
          unitName: e.target.value,
        }))
      }
      className="mtp-form-input"
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
