import React, { useState } from 'react';
import { 
  Building, 
  Building2, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Scale, 
  FileText, 
  FileCheck, 
  Users, 
  Award, 
  Wine, 
  Truck, 
  Landmark, 
  Laptop, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Search, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Clock, 
  AlertTriangle, 
  Gavel, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  Target,
  Home,
  MessageSquare,
  Eye,
  BarChart3,
  Server,
  QrCode,
  Check,
  Filter,
  Info,
  ChevronDown
} from 'lucide-react';

// Import our generated authentic images
import hqImage from '../Style/Image/hqImage.jpg';
import controlRoomImage from '../Style/Image/controlRoomImage.jpg';
import labTestingImage from '../Style/Image/labTestingImage.jpg';
import facilitationDeskImage from '../Style/Image/facilitationDeskImage.jpg';

// Import AboutUsModal to allow seamless quick view from the dashboard
import AboutUsModal from './AboutUsModal.jsx';

// Live Operational KPI Stats
const DASHBOARD_KPIS = [
  { 
    id: "licenses", 
    label: "Regulated Licenses & Permits", 
    value: "360+", 
    trend: "positive",
    icon: Wine, 
    color: "#0284c7",
    bg: "#e0f2fe",
    // note: "L-1 Wholesale, Retail & Hospitality Bars" 
  },
  { 
    id: "brands", 
    label: "Registered & Verified Brands", 
    value: "1,700+", 
    trend: "positive",
    icon: Award, 
    color: "#d97706",
    bg: "#fef3c7",
    // note: "Statutory MRP & Label Master Certified" 
  },
  { 
    id: "revenue", 
    label: "State Revenue Mobilized", 
    value: "₹7,250+ Cr", 
    trend: "positive",
    icon: Landmark, 
    color: "#059669",
    bg: "#d1fae5",
    // note: "Direct State Treasury e-Challan Receipts" 
  },
  { 
    id: "transit", 
    label: "Daily Digital Transit Passes", 
    value: "4,800+", 
    trend: "neutral",
    icon: Truck, 
    color: "#4f46e5",
    bg: "#e0e7ff",
    // note: "Geo-fenced IP-PL Import/Export Passes" 
  },
  { 
    id: "zones", 
    label: "Excise Administrative Zones", 
    value: "11", 
    trend: "neutral",
    icon: Building, 
    color: "#012a52",
    bg: "#e2e8f0",
    // note: "Covering All 11 Revenue Districts" 
  },
  { 
    id: "grievance", 
    label: "Citizen Grievance Redressal", 
    value: "98.6%", 
    trend: "positive",
    icon: ShieldCheck, 
    color: "#0891b2",
    bg: "#cffafe",
    // note: "24x7 Anti-Evasion & Public Desk" 
  }
];

// The 9 Core Statutory Roles & Responsibilities
const ROLES_DATA = [
  {
    id: "liquor-reg",
    title: "Liquor Regulation & Supply Chain Oversight",
    category: "regulatory",
    icon: Wine,
    badge: "Statutory Scope",
    desc: "Comprehensive monitoring and regulation of all liquor-related operations including distillation, wholesale storage, transit passes, bonded warehouses, and licensed retail point-of-sale activities across the National Capital Territory of Delhi.",
    tags: ["Potable Alcohol", "Vends & Depots", "Supply Integrity", "Delhi Excise Act 2009"],
    branches: ["Excise Operations Branch", "Warehousing Wing"]
  },
  {
    id: "licence-admin",
    title: "Licence Administration & Renewal",
    category: "licensing",
    icon: FileCheck,
    badge: "Grant & Oversight",
    desc: "Online processing, thorough eligibility verification, issuance, annual renewal, premise alterations, and partner changes for wholesale (L-1/L-1F), retail vends, and hotel/restaurant/club (L-3/L-4/L-5) excise licenses.",
    tags: ["L-1 Wholesale", "Hotel & Restaurant Bars", "Online Renewal", "Premise Verification"],
    branches: ["Licensing Branch", "Inspection Wing"]
  },
  {
    id: "brand-reg",
    title: "Brand Registration & Price Fixation",
    category: "licensing",
    icon: Award,
    badge: "Price & Label Master",
    desc: "Rigorous verification of liquor brand applications, label scrutiny, chemical purity testing, master registration of bottlers and brand owners, and publication of statutory Maximum Retail Prices (MRP) for consumer protection.",
    tags: ["Label Scrutiny", "MRP Determination", "Bottler Tie-ups", "Chemical Standards"],
    branches: ["Brand Approval Committee", "Accounts & Pricing Wing"]
  },
  {
    id: "dealer-mgmt",
    title: "Establishment & Vend Profiling",
    category: "regulatory",
    icon: Building2,
    badge: "Entity Oversight",
    desc: "Real-time compliance monitoring, geo-tagging, stock reconciliation, and periodic background audits of wholesale bonded warehouses, retail vends, distilleries, hotels, clubs, and restaurant bars.",
    tags: ["Bonded Warehouses", "Hospitality Bars", "Geo-tagged Vends", "Stock Audits"],
    branches: ["Field Verification Squads", "Zonal Excise Officers"]
  },
  {
    id: "inspection-comp",
    title: "Inspection, Chemical Testing & Anti-Adulteration",
    category: "quality",
    icon: ShieldCheck,
    badge: "Public Health",
    desc: "Rigorous laboratory testing of liquor batches, sudden spot inspections of retail and hospitality establishments, bar premise verifications, and strict anti-spurious testing to protect citizen health and eliminate illicit spirits.",
    tags: ["Chemical Testing", "Anti-Spurious Audits", "Lab Certification", "Zero Adulteration"],
    branches: ["Government Chemical Laboratory", "Enforcement Squads"]
  },
  {
    id: "permit-mgmt",
    title: "Permit Management & Inter-State Transit",
    category: "regulatory",
    icon: Truck,
    badge: "Passes & Transit",
    desc: "Instant digital generation and QR validation of Import Permits Cum Passes (IP-PL), bulk spirit tanker transport authorizations, bonded export passes, and single-day event permits (P-10/L-28).",
    tags: ["IP-PL Transit", "Bulk Spirit Tankers", "Event P-10 Permits", "QR Validation"],
    branches: ["Permit & Transit Branch", "Border Checkpoint Units"]
  },
  {
    id: "revenue-admin",
    title: "Excise Revenue Administration & Treasury Settlement",
    category: "revenue",
    icon: Landmark,
    badge: "Treasury Mobilization",
    desc: "Assessment, real-time collection, and reconciliation of statutory excise duties, licensing fees, compounding fines, and digital e-Challan receipts contributing directly to the Government of NCT of Delhi treasury.",
    tags: ["Excise Duty", "e-Challan Integration", "PAO Reconciliation", "Revenue Audit"],
    branches: ["Accounts Branch", "PAO Coordination Cell"]
  },
  {
    id: "enforcement",
    title: "Enforcement & Anti-Evasion Vigilance",
    category: "enforcement",
    icon: Shield,
    badge: "Vigilance & Law",
    desc: "Active field surveillance, actionable intelligence gathering, mobile interception squads, inter-state border policing, and zero-tolerance prosecution against liquor smuggling, non-duty-paid liquor, and bootlegging.",
    tags: ["Anti-Smuggling", "Vigilance Squads", "Border Checkposts", "Seizure Operations"],
    branches: ["Excise Intelligence Bureau (EIB)", "Enforcement Division"]
  },
  {
    id: "digital-delivery",
    title: "Digital Service Delivery via e-Abkari Portal",
    category: "digital",
    icon: Laptop,
    badge: "Unified IT Engine",
    desc: "Delivering citizen-centric, paperless, and time-bound online services with automated approvals, SMS/email alerts, online payments, digital pass generation, and transparent workflow status tracking.",
    tags: ["Unified Portal", "Automated Workflows", "Open Data", "Citizen Ease"],
    branches: ["IT & e-Governance Cell", "System Administration Team"]
  }
];

// Interactive 6-Stage Supply Chain Pipeline
const SUPPLY_CHAIN_STAGES = [
  {
    step: 1,
    title: "Distilleries & Bottlers",
    icon: Building2,
    desc: "Production in licensed manufacturing units, batch registration, and statutory quality testing.",
    tech: "Batch Master Database"
  },
  {
    step: 2,
    title: "2D QR Serialization",
    icon: QrCode,
    desc: "Cryptographic 2D Data-Matrix QR barcode affixed to every bottle cap with secure checksum.",
    tech: "Secure UID Barcode Generation"
  },
  {
    step: 3,
    title: "Bonded Warehouses (L-1)",
    icon: Landmark,
    desc: "Receipt scan into wholesale bonded warehouses, stock reconciliation, and duty assessment.",
    tech: "Automated Inward Stock Ledger"
  },
  {
    step: 4,
    title: "Geo-fenced IP-PL Transit",
    icon: Truck,
    desc: "Digital transit pass generation with pre-authorized delivery route and GPS vehicle checkpoint.",
    tech: "Digital IP-PL Pass & Geofencing"
  },
  {
    step: 5,
    title: "Retail Vends & Bars",
    icon: Wine,
    desc: "Discharge scan at retail counters and hotel/club bars; real-time inventory deduction.",
    tech: "Point-of-Sale (POS) Integration"
  },
  {
    step: 6,
    title: "Citizen & Sentinel Scan",
    icon: ShieldCheck,
    desc: "Consumer authenticity check via mobile scan, eliminating counterfeit or duty-evaded bottles.",
    tech: "m-Sachet Public Verification"
  }
];

// Department Facilities Showcase
const FACILITIES_DATA = [
  {
    id: "hq",
    title: "Department Administrative Headquarters",
    subtitle: "Vikas Bhawan, I.P. Estate, New Delhi",
    image: hqImage,
    badge: "Secretariat & Registry",
    desc: "The nerve center of Delhi Excise administration housing the Office of the Excise Commissioner, Deputy Commissioners, Licensing Branches, and Legal Adjudication wings.",
    specs: ["Commissioner Secretariat", "Licensing Scrutiny Chambers", "Legal & Appellate Court"]
  },
  {
    id: "control-room",
    title: "Central e-Abkari Command & Control Room",
    subtitle: "24x7 Digital Operations & Monitoring Center",
    image: controlRoomImage,
    badge: "Real-Time IT Sentinel",
    desc: "State-of-the-art technology operations hub monitoring real-time transit passes, 2D barcode batch scans, server telemetry, and border intercept coordination.",
    specs: ["Real-time GIS Tracking", "2D Barcode Verification Grid", "e-Challan Settlement Monitor"]
  },
  {
    id: "lab",
    title: "Statutory Chemical Testing Laboratory",
    subtitle: "Analytical Quality & Anti-Adulteration Center",
    image: labTestingImage,
    badge: "Accredited Laboratory",
    desc: "Equipped with high-precision gas chromatography, mass spectrometers, and chemical distillation columns for testing spirit purity, methanol presence, and compliance.",
    specs: ["Gas Chromatography (GC)", "Anti-Adulteration Testing", "100% Batch Certification"]
  },
  {
    id: "facilitation",
    title: "Citizen & Licensee Facilitation Center",
    subtitle: "Single-Window Public Service Counters",
    image: facilitationDeskImage,
    badge: "Public Front Desk",
    desc: "Dedicated facilitation center providing in-person assistance for online applications, document docket submission, licensee queries, and grievance filings.",
    specs: ["Single Window Assistance", "Document Verification Desk", "Grievance Reception"]
  }
];

export default function AboutUsPage({ onNavigateHome, onNavigateToView }) {
  // Active Dashboard Tab state
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  // Category filter state for Roles tab
  const [activeRoleCategory, setActiveRoleCategory] = useState("all");
  // Search query for Roles & Services
  const [searchQuery, setSearchQuery] = useState("");
  // Interactive Supply Chain stage selection
  const [activeSupplyStage, setActiveSupplyStage] = useState(1);
  // Modal State to open AboutUsModal from within the dashboard
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (path) => {
    if (window.location.pathname !== path) {
      window.location.href = path;
    }
  };

  // Filter roles based on category and search query
  const filteredRoles = ROLES_DATA.filter((role) => {
    const matchesCategory = activeRoleCategory === 'all' || role.category === activeRoleCategory;
    const matchesSearch = !searchQuery || 
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="about-page-wrapper">
      {/* 1. Top Operational Bar & Breadcrumb */}
      <div className="about-breadcrumb-bar">
        <div className="about-container">
          <div className="about-breadcrumb-inner">
            <div className="about-breadcrumb">
              <button 
                onClick={() => onNavigateHome ? onNavigateHome() : (window.location.href = "/")}
                className="about-breadcrumb-link"
              >
                <Home className="about-icon-xs" />
                <span>Home</span>
              </button>
              <ChevronRight className="about-breadcrumb-sep" />
              <span className="about-breadcrumb-curr">About Us</span>
              <ChevronRight className="about-breadcrumb-sep" />
              <span className="about-breadcrumb-active">e-Abkari Governance Dashboard</span>
            </div>

            <div className="about-status-group">
              <div className="about-emblem-badge">
                <span className="about-emblem-dot" />
                <span>e-Abkari 2.0 Engine Live &amp; Active</span>
              </div>
              <div className="about-status-pill">
                <Server className="about-icon-xs" />
                <span>PAO Treasury Synchronized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Dashboard Header Banner */}
      <section className="about-hero-section">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <div className="about-hero-tagline-box">
                <span className="about-badge-amber">
                  <Sparkles className="about-icon-xs" />
                  Government of NCT of Delhi
                </span>
                {/* <span className="about-badge-outline">
                  Statutory Regulatory Authority
                </span> */}
              </div>
              
              <h1 className="about-hero-title">
                About Delhi e-Abkari Dashboard
              </h1>
              <p className="about-hero-sub-meta">
                Department of Excise, Entertainment &amp; Luxury Tax • Official Governance &amp; Operations Portal
              </p>
              <p className="about-hero-desc">
                Pioneering 100% paperless digital administration, 2D barcode serialization track-and-trace, strict anti-adulteration chemical scrutiny, and robust revenue mobilization under the Delhi Excise Act, 2009.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="about-hero-actions-col">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="about-hero-modal-btn"
                title="Open floating pop-up window overview"
              >
                <Sparkles className="about-icon-sm" />
                <span>Open Quick Modal Overview</span>
              </button>

              <div className="about-hero-nav-btns">
                <button 
                  onClick={() => handleLinkClick('/organizational-structure')}
                  className="about-hero-nav-btn"
                >
                  <Users className="about-icon-xs" />
                  <span>Org Structure</span>
                </button>
                <button 
                  onClick={() => handleLinkClick('/staff')}
                  className="about-hero-nav-btn"
                >
                  <Building className="about-icon-xs" />
                  <span>Staff Directory</span>
                </button>
                <button 
                  onClick={() => handleLinkClick('/feedback')}
                  className="about-hero-nav-btn"
                >
                  <MessageSquare className="about-icon-xs" />
                  <span>Feedback Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real-Time Operations KPI Metric Strip */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-grid">
            {DASHBOARD_KPIS.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div 
                  key={kpi.id}
                  className="about-stat-card"
                  style={{ borderTop: `3px solid ${kpi.color}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div 
                      className="about-stat-icon-wrap"
                      style={{ backgroundColor: kpi.bg }}
                    >
                      <Icon className="about-icon-sm" style={{ color: kpi.color }} />
                    </div>
                    {/* <span className="about-stat-badge">
                      {kpi.change}
                    </span> */}
                  </div>
                  <div className="about-stat-number">
                    {kpi.value}
                  </div>
                  <div className="about-stat-label">
                    {kpi.label}
                  </div>
                  {/* <div className="about-stat-note">
                    {kpi.note}
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Dashboard Interactive Tabs Bar */}
      <div className="about-tabs-container">
        <div className="about-container">
          <div className="about-tabs-bar">
            {[
              { id: "OVERVIEW", label: "Executive Overview", icon: Landmark },
              { id: "ARCHITECTURE", label: "e-Abkari 2.0 Track & Trace", icon: Laptop },
              { id: "REGULATORY_MATRIX", label: "9 Core Regulatory Pillars", icon: Scale },
              { id: "STATUTORY_FRAMEWORK", label: "Delhi Excise Act 2009", icon: BookOpen },
              { id: "FACILITIES", label: "Facilities & Photo Gallery", icon: Building },
              { id: "PUBLIC_HELPLINE", label: "24x7 Anti-Evasion Sentinel", icon: ShieldAlert }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`about-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon className="about-tab-icon" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Tab Content Sections */}
      <div className="about-content-sections">
        <div className="about-container">
        
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="about-section-card">
            <div className="about-section-header">
              <div>
                <span className="about-badge-tag">
                  Department Profile &amp; Governance Mandate
                </span>
                <h2 className="about-section-title">
                  Regulating Spirit, Safeguarding Health, Securing Public Revenue
                </h2>
                <p className="about-section-subtitle">
                  The Department of Excise, Entertainment &amp; Luxury Tax is a key revenue-earning regulatory wing of the Government of National Capital Territory of Delhi. Charged with administering the Delhi Excise Act, 2009 and Delhi Excise Rules, 2010, the department balances legitimate commercial trade with public order, social harm minimization, and consumer safety.
                </p>
              </div>
              {/* <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="about-btn-primary"
                >
                  <Sparkles className="about-icon-xs" />
                  <span>Launch Pop-Up Modal</span>
                </button>
              </div> */}
            </div>

            {/* Vision & Mission Cards */}
            <div className="about-vm-grid">
              <div className="about-vm-card vision">
                <div className="about-vm-header">
                  <div className="about-vm-icon-box vision">
                    <Target className="about-icon-md" />
                  </div>
                  <div>
                    <span className="about-vm-label">Strategic Roadmap</span>
                    <h3 className="about-vm-title">Our Vision</h3>
                  </div>
                </div>
                <p className="about-vm-body">
                  "To establish Delhi as a benchmark for digitally transparent, socially responsible, and technologically secure excise administration in India, completely preventing illicit liquor while delivering world-class, corruption-free public services."
                </p>
              </div>

              <div className="about-vm-card mission">
                <div className="about-vm-header">
                  <div className="about-vm-icon-box mission">
                    <Compass className="about-icon-md" />
                  </div>
                  <div>
                    <span className="about-vm-label">Daily Commitments</span>
                    <h3 className="about-vm-title">Our Mission</h3>
                  </div>
                </div>
                <p className="about-vm-body">
                  "To enforce statutory excise laws rigorously, ensure 100% supply-chain traceability via 2D serialization, prevent chemical adulteration, eliminate revenue leakage through instant e-Challans, and provide time-bound approvals to stakeholders."
                </p>
              </div>
            </div>

            {/* 4 Core Departmental Tenets */}
            <div className="about-values-block">
              <h3 className="about-values-heading">
                Core Departmental Tenets
              </h3>
              <div className="about-values-grid">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Public Health Sentinel",
                    desc: "Zero tolerance for spurious alcohol or toxic spirit through accredited laboratory chemical testing."
                  },
                  {
                    icon: Laptop,
                    title: "100% Digital Workflow",
                    desc: "Complete elimination of physical queues; all licenses, permits, passes, and renewals are paperless."
                  },
                  {
                    icon: Scale,
                    title: "Fair Legal Enforcement",
                    desc: "Vigilant intelligence gathering, 24x7 border intercept teams, and strict anti-smuggling prosecutions."
                  },
                  {
                    icon: Landmark,
                    title: "Fiscal Optimization",
                    desc: "Seamless reconciliation of statutory state duties directly into Delhi Treasury via PAO integration."
                  }
                ].map((p, idx) => {
                  const PIcon = p.icon;
                  return (
                    <div key={idx} className="about-value-item">
                      <div className="about-value-icon">
                        <PIcon className="about-icon-sm" />
                      </div>
                      <h4 className="about-value-title">{p.title}</h4>
                      <p className="about-value-text">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Headquarters Preview Tile */}
            <div className="about-hq-tile">
              <div className="about-hq-grid">
                <div className="about-hq-img-wrap">
                  <img 
                    src={hqImage} 
                    alt="Delhi Excise Secretariat Vikas Bhawan"
                    className="about-hq-img"
                  />
                </div>
                <div className="about-hq-body">
                  <div>
                    <span className="about-badge-tag">
                      Department Headquarters
                    </span>
                    <h3 className="about-section-title">
                      Department of Excise, Government of NCT of Delhi, L & N Block, Vikas Bhawan, I.P.Estate, New Delhi – 110002
                    </h3>
                    <p className="about-section-subtitle">
                      Situated at the heart of New Delhi, Vikas Bhawan houses the senior executive hierarchy including the Commissioner of Excise, Special Commissioners, Joint Commissioners, and the Central Chemical Laboratory.
                    </p>
                    <div className="about-hq-meta-grid">
                      <div className="about-hq-meta-item">
                        <span className="about-hq-meta-label">Jurisdiction</span>
                        <span className="about-hq-meta-val">Whole of NCT Delhi</span>
                      </div>
                      <div className="about-hq-meta-item">
                        <span className="about-hq-meta-label">Public Hours</span>
                        <span className="about-hq-meta-val">10:00 AM - 1:00 PM</span>
                      </div>
                      <div className="about-hq-meta-item">
                        <span className="about-hq-meta-label">Helpline</span>
                        <span className="about-hq-meta-val"> 011-23370705, 011-23379752</span>
                      </div>
                    </div>
                  </div>

                  <div className="about-hq-actions">
                    <button 
                      onClick={() => handleLinkClick('/organizational-structure')}
                      className="about-btn-primary"
                    >
                      <Users className="about-icon-xs" />
                      <span>View Organizational Hierarchy</span>
                    </button>
                    <button 
                      onClick={() => handleLinkClick('/staff')}
                      className="about-btn-outline"
                    >
                      <Building className="about-icon-xs" />
                      <span>View Staff Directory</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: e-Abkari 2.0 Track & Trace Architecture */}
        {activeTab === "ARCHITECTURE" && (
          <div className="about-section-card">
            <span className="about-badge-tag">
              Digital Infrastructure
            </span>
            <h2 className="about-section-title">
              Delhi e-Abkari 2.0 Track &amp; Trace Ecosystem
            </h2>
            <p className="about-section-subtitle">
              Delhi e-Abkari is a mission-mode digital transformation initiative that tracks the entire life-cycle of potable liquor from out-of-state distilleries and overseas imports to retail consumers, safeguarding state revenues and eradicating counterfeit alcohol.
            </p>

            {/* 4 Architectural Pillars */}
            <div className="about-digital-grid" style={{ marginTop: '1.5rem' }}>
              {[
                {
                  icon: QrCode,
                  title: "2D Barcode Serialization",
                  desc: "Every single bottle receives a unique, non-replicable 2D Data Matrix code verified at inward, transit, and retail checkout points."
                },
                {
                  icon: Truck,
                  title: "Geo-Fenced IP-PL Transit",
                  desc: "Digital Import Permits Cum Passes (IP-PL) specify authorized transit routes, vehicle registration, and driver credentials."
                },
                {
                  icon: Laptop,
                  title: "Automated Approvals",
                  desc: "Role-based digital routing across Dealing Assistant, Superintendent, and Deputy Commissioner tiers with SLA tracking."
                },
                {
                  icon: Landmark,
                  title: "Direct PAO Settlement",
                  desc: "Statutory duties, compounding fees, and annual tenders settled via real-time SBI e-Pay and PAO treasury reconciliation."
                }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="about-digital-card">
                    <div className="about-digital-icon">
                      <ItemIcon className="about-icon-md" style={{ color: '#0284c7' }} />
                    </div>
                    <h4 className="about-digital-title">{item.title}</h4>
                    <p className="about-digital-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Supply Chain Flow */}
            <div className="about-pipeline-flow">
              <div className="about-pipeline-header">
                <div>
                  <h3 className="about-section-title" style={{ fontSize: '1.15rem' }}>
                    End-to-End Liquor Traceability Pipeline
                  </h3>
                  <p className="about-section-subtitle" style={{ margin: 0 }}>
                    Click any stage to view the underlying technology and statutory compliance checkpoints
                  </p>
                </div>
                <span className="about-badge-tag emerald" style={{ margin: 0 }}>
                  100% Cryptographically Validated
                </span>
              </div>

              {/* Stage Stepper Buttons */}
              <div className="about-pipeline-grid">
                {SUPPLY_CHAIN_STAGES.map((s) => {
                  const StepIcon = s.icon;
                  const isSelected = activeSupplyStage === s.step;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActiveSupplyStage(s.step)}
                      className={`about-pipeline-step-btn ${isSelected ? 'active' : ''}`}
                    >
                      <div className="about-pipeline-step-top">
                        <span className="about-pipeline-step-badge">
                          Stage {s.step}
                        </span>
                        <StepIcon className="about-icon-xs" />
                      </div>
                      <div className="about-pipeline-step-title">{s.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Stage Detail Box */}
              {(() => {
                const cur = SUPPLY_CHAIN_STAGES.find(s => s.step === activeSupplyStage) || SUPPLY_CHAIN_STAGES[0];
                const CurIcon = cur.icon;
                return (
                  <div className="about-pipeline-detail-card">
                    <div className="about-pipeline-detail-left">
                      <div className="about-pipeline-detail-icon">
                        <CurIcon className="about-icon-lg" />
                      </div>
                      <div>
                        <div className="about-pipeline-detail-heading">
                          <span className="about-pipeline-detail-step-num">Stage {cur.step} of 6</span>
                          <span style={{ color: '#94a3b8' }}>•</span>
                          <h4 className="about-pipeline-detail-title">{cur.title}</h4>
                        </div>
                        <p className="about-pipeline-detail-desc">{cur.desc}</p>
                      </div>
                    </div>
                    <div className="about-pipeline-tech-box">
                      <span className="about-pipeline-tech-label">Core Tech Engine</span>
                      <span className="about-pipeline-tech-name">{cur.tech}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 3: 9 CORE REGULATORY PILLARS */}
        {activeTab === "REGULATORY_MATRIX" && (
          <div className="about-section-card">
            <div className="about-section-header">
              <div>
                <span className="about-badge-tag">
                  Statutory Framework
                </span>
                <h2 className="about-section-title">
                  9 Core Roles &amp; Responsibilities
                </h2>
                <p className="about-section-subtitle">
                  Filter by statutory domain or search specific keywords (e.g. "wholesale", "chemical", "transit", "enforcement").
                </p>
              </div>

              {/* Search Bar */}
              <div className="about-roles-search-wrap">
                <Search className="about-roles-search-icon" />
                <input 
                  type="text"
                  placeholder="Search regulatory mandates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="about-roles-search-input"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="about-roles-search-clear"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="about-filter-bar">
              {[
                { id: "all", label: "All 9 Pillars" },
                { id: "regulatory", label: "Regulatory Oversight" },
                { id: "licensing", label: "Licensing & Brands" },
                { id: "quality", label: "Quality & Testing" },
                { id: "revenue", label: "Excise Revenue" },
                { id: "enforcement", label: "Vigilance & Enforcement" },
                { id: "digital", label: "e-Abkari Digital" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveRoleCategory(c.id)}
                  className={`about-filter-btn ${activeRoleCategory === c.id ? 'active' : ''}`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Filtered Roles Grid */}
            <div className="about-roles-grid">
              {filteredRoles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <div key={role.id} className="about-role-card">
                    <div>
                      <div className="about-role-card-header">
                        <div className="about-role-icon-box">
                          <RoleIcon className="about-icon-md" style={{ color: '#0284c7' }} />
                        </div>
                        <span className="about-role-badge">
                          {role.badge}
                        </span>
                      </div>
                      <h4 className="about-role-title">
                        {role.title}
                      </h4>
                      <p className="about-role-desc">
                        {role.desc}
                      </p>
                    </div>

                    <div className="about-roles-footer-nodal">
                      <div className="about-role-tags">
                        {role.tags.map((t, idx) => (
                          <span key={idx} className="about-role-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginTop: '0.5rem' }}>
                        Nodal Wing: <span>{role.branches.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredRoles.length === 0 && (
              <div className="about-empty-box">
                <AlertTriangle className="about-icon-lg" style={{ color: '#f59e0b', margin: '0 auto' }} />
                <h4 className="about-empty-title">No matching responsibilities found</h4>
                <p className="about-empty-desc">Try changing the category or clearing the search query.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveRoleCategory("all"); }}
                  className="about-reset-btn"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STATUTORY MANDATE & LEGAL CODE */}
        {activeTab === "STATUTORY_FRAMEWORK" && (
          <div className="about-section-card">
            <span className="about-badge-tag">
              Statutory Authority &amp; Legislative Architecture
            </span>
            <h2 className="about-section-title">
              Delhi Excise Act, 2009 &amp; Delhi Excise Rules, 2010
            </h2>
            <p className="about-section-subtitle">
              The Department operates under the exclusive constitutional mandate granted to state governments under Entry 8 of the State List (List II, Seventh Schedule to the Constitution of India).
            </p>

            {/* Legal Pillars */}
            <div className="about-legal-grid">
              <div className="about-legal-card">
                <div className="about-legal-header">
                  <Scale className="about-icon-md" style={{ color: '#012a52' }} />
                  <h3 className="about-legal-title">Constitutional Anchor</h3>
                </div>
                <span className="about-legal-anchor">Entry 8, List II (State List)</span>
                <p className="about-legal-text">
                  Exclusive legislative competence on intoxicating liquors, including production, manufacture, possession, transport, purchase, and sale.
                </p>
              </div>

              <div className="about-legal-card">
                <div className="about-legal-header">
                  <BookOpen className="about-icon-md" style={{ color: '#012a52' }} />
                  <h3 className="about-legal-title">Delhi Excise Act, 2009</h3>
                </div>
                <span className="about-legal-anchor">Delhi Act No. 07 of 2010</span>
                <p className="about-legal-text">
                  An Act to consolidate, amend, and modernize the law relating to excise duty, regulation of intoxicating liquor, and penalties for evasion in NCT of Delhi.
                </p>
              </div>

              <div className="about-legal-card">
                <div className="about-legal-header">
                  <Gavel className="about-icon-md" style={{ color: '#012a52' }} />
                  <h3 className="about-legal-title">Delhi Excise Rules, 2010</h3>
                </div>
                <span className="about-legal-anchor">Statutory Subordinate Legislation</span>
                <p className="about-legal-text">
                  Prescribes licensing fees, vend distance norms from religious and educational sites, laboratory sampling standards, and procedural guidelines.
                </p>
              </div>
            </div>

            {/* Penal Code Highlight Banner */}
            <div className="about-penal-banner">
              <AlertTriangle className="about-icon-md" style={{ color: '#e11d48', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 className="about-penal-title">
                  Zero Tolerance Penal Provisions Against Illicit &amp; Non-Duty Paid Spirits
                </h4>
                <p className="about-penal-text">
                  Under Section 33 and Section 38 of the Delhi Excise Act, 2009, unlawful import, export, transport, manufacture, or possession of non-duty-paid liquor carries mandatory rigorous imprisonment extending up to six months or three years, along with minimum fines of ₹50,000 to ₹1,00,000, and confiscation of conveyance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FACILITIES & PHOTO GALLERY */}
        {activeTab === "FACILITIES" && (
          <div className="about-section-card">
            <span className="about-badge-tag">
              Infrastructure &amp; Operations
            </span>
            <h2 className="about-section-title">
              Key Department Facilities &amp; Operational Wings
            </h2>
            <p className="about-section-subtitle">
              High-resolution photographic documentation of the institutional infrastructure powering the Delhi Excise Department and e-Abkari digital ecosystem.
            </p>

            <div className="about-facilities-grid">
              {FACILITIES_DATA.map((fac) => (
                <div 
                  key={fac.id}
                  className="about-facility-card"
                >
                  <div className="about-facility-img-wrap">
                    <img 
                      src={fac.image} 
                      alt={fac.title}
                      className="about-facility-img"
                    />
                    <div className="about-facility-badge">
                      {fac.badge}
                    </div>
                  </div>
                  
                  <div className="about-facility-body">
                    <div>
                      <h3 className="about-facility-title">{fac.title}</h3>
                      <p className="about-facility-sub">{fac.subtitle}</p>
                      <p className="about-facility-desc">{fac.desc}</p>
                    </div>

                    <div className="about-facility-footer">
                      <div className="about-facility-specs-label">Key Capabilities</div>
                      <div className="about-facility-specs-list">
                        {fac.specs.map((sp, sidx) => (
                          <span key={sidx} className="about-facility-spec-chip">
                            ✓ {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: 24x7 ANTI-EVASION SENTINEL & HELPLINE */}
        {activeTab === "PUBLIC_HELPLINE" && (
          <div className="about-section-card">
            <span className="about-badge-tag rose">
              Vigilance &amp; Citizen Support
            </span>
            <h2 className="about-section-title">
              24x7 Anti-Evasion Sentinel &amp; Public Grievance Desk
            </h2>
            <p className="about-section-subtitle">
              Citizens and stakeholders can report illicit liquor, counterfeit bottles, illegal bootlegging, or service delays directly to the Excise Intelligence Bureau.
            </p>

            <div className="about-helpline-grid">
              <div className="about-helpline-card rose">
                <div className="about-helpline-icon-box rose">
                  <PhoneCall className="about-icon-md" />
                </div>
                <h3 className="about-helpline-title">Toll-Free Helpline</h3>
                <div className="about-helpline-val rose"> 011-23370705, 011-23379752</div>
                <p className="about-helpline-note">24 Hours / 7 Days a week anonymous reporting</p>
              </div>

              <div className="about-helpline-card sky">
                <div className="about-helpline-icon-box sky">
                  <Mail className="about-icon-md" />
                </div>
                <h3 className="about-helpline-title">Excise Grievance Email</h3>
                <div className="about-helpline-val sky">helpdesk-delhiexcise@delhi.gov.in</div>
                <p className="about-helpline-note">Monitored directly by the Commissioner Secretariat</p>
              </div>

              <div className="about-helpline-card emerald">
                <div className="about-helpline-icon-box emerald">
                  <Clock className="about-icon-md" />
                </div>
                <h3 className="about-helpline-title">Public Hearing Hours</h3>
                <div className="about-helpline-val emerald">10:00 AM – 1:00 PM</div>
                <p className="about-helpline-note">All working days at Vikas Bhawan, I.P. Estate</p>
              </div>
            </div>

            {/* Online Feedback CTA */}
            <div className="about-feedback-banner">
              <div>
                <h4 className="about-feedback-title">Submit Online Feedback</h4>
                <p className="about-feedback-desc">
                  File an official ticket online with automated tracking number and SMS updates.
                </p>
              </div>
              <button 
                onClick={() => handleLinkClick('/feedback')}
                className="about-btn-primary"
              >
                <MessageSquare className="about-icon-xs" style={{ color: '#fbbf24' }} />
                <span>File Citizen Feedback</span>
              </button>
            </div>
          </div>
        )}

        </div>
      </div>

      {/* Embedded Floating AboutUsModal (Can be opened anywhere from the dashboard button) */}
      <AboutUsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenExploreServices={() => {
          setIsModalOpen(false);
          if (onNavigateToView) onNavigateToView("EXPLORE_SERVICES");
        }}
        onNavigate={(path) => {
          setIsModalOpen(false);
          handleLinkClick(path);
        }}
      />
    </div>
  );
}
