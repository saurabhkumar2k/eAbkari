import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Building,
  Target,
  Compass,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Wine,
  FileCheck,
  Award,
  Building2,
  ClipboardCheck,
  Truck,
  Landmark,
  Laptop,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Users,
  ChevronRight,
  Activity,
  Layers,
  HelpCircle
} from "lucide-react";

// Key statistical metrics for the modern official service portal
const STATS = [
  { label: "Regulated Licenses & Permits", value: "360+", icon: Wine, color: "text-sky-600", bg: "bg-sky-50" },
  { label: "Approved Liquor Brands", value: "1,700+", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "eAbkari Digital Workflow", value: "100%", icon: Laptop, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Excise Administrative Zones", value: "11", icon: Landmark, color: "text-indigo-600", bg: "bg-indigo-50" }
];

// 9 Core Roles and Responsibilities as requested
const ROLES_DATA = [
  {
    id: "liquor-reg",
    title: "Liquor Regulation",
    icon: Wine,
    badge: "Regulatory Scope",
    desc: "Comprehensive monitoring and regulation of liquor-related activities including distillation, import, export, storage, transport, and commercial sale of potable and industrial spirits across Delhi.",
    tags: ["Potable Alcohol", "Vends & Depots", "Statutory Compliance"]
  },
  {
    id: "licence-admin",
    title: "Licence Administration",
    icon: FileCheck,
    badge: "Grant & Renewals",
    desc: "End-to-end administration, eligibility evaluation, digital issuance, annual renewal, amendment, and transfers for wholesale (L-1/L-1F), retail, and hospitality liquor licenses.",
    tags: ["L-1 Wholesale", "Bar Licenses", "Premise Transfers"]
  },
  {
    id: "brand-reg",
    title: "Brand Registration",
    icon: Award,
    badge: "Price & Label Master",
    desc: "Formal brand approval, bottle label scrutiny, chemical lab standard verification, brand ownership registration, and publication of statutory Maximum Retail Price (MRP) listings.",
    tags: ["Label Verification", "MRP Publication", "Bottler Tie-ups"]
  },
  {
    id: "dealer-mgmt",
    title: "Dealer & Establishment Management",
    icon: Building2,
    badge: "Entity Oversight",
    desc: "Periodic verification, profiling, and compliance tracking of licensed establishments, bonded warehouses, retail outlets, distilleries, hotels, clubs, and restaurant bars.",
    tags: ["Hotel & Club Bars", "Bonded Warehouses", "Site Inspections"]
  },
  {
    id: "inspection-comp",
    title: "Inspection & Compliance",
    icon: ClipboardCheck,
    badge: "Quality Assurance",
    desc: "Regular field inspections, anti-adulteration spot audits, stock reconciliation, bar premise verifications, and compliance enforcement across all licensed points of sale.",
    tags: ["Sample Testing", "Stock Audits", "Bar Scrutiny"]
  },
  {
    id: "permit-mgmt",
    title: "Permit Management",
    icon: Truck,
    badge: "Passes & Transit",
    desc: "Real-time issuance and QR verification of transit Import Permits Cum Passes (IP-PL), bulk spirit transport authorisations, and single-day temporary event permits (P-10/L-28).",
    tags: ["IP-PL Transit", "Bulk Spirit Tankers", "Event P-10 Permits"]
  },
  {
    id: "revenue-admin",
    title: "Excise Revenue Administration",
    icon: Landmark,
    badge: "Treasury Mobilization",
    desc: "Assessment, real-time collection, and reconciliation of statutory excise duties, licensing fees, compounding fines, and digital e-Challan receipts contributing to state revenue.",
    tags: ["Excise Duty", "e-Challan Receipts", "State Treasury"]
  },
  {
    id: "enforcement",
    title: "Enforcement",
    icon: ShieldAlert,
    badge: "Vigilance & Law",
    desc: "Active surveillance, intelligence gathering, mobile interception squads, and rigorous legal action against illicit liquor smuggling, counterfeit trade, and bootlegging.",
    tags: ["Anti-Smuggling", "Vigilance Squads", "Seizure Operations"]
  },
  {
    id: "digital-delivery",
    title: "Digital Service Delivery",
    icon: Laptop,
    badge: "eAbkari Unified Engine",
    desc: "Delivering citizen-centric, paperless, and time-bound online services with automated approvals, SMS/email alerts, online payments, and transparent status tracking.",
    tags: ["Single-Window Portal", "Automated Workflows", "Open Data"]
  }
];

// Digital Journey Steps for eAbkari
const DIGITAL_JOURNEY = [
  {
    step: 1,
    title: "Register",
    desc: "Create unified applicant/establishment credentials with OTP verification.",
    icon: Users
  },
  {
    step: 2,
    title: "Apply",
    desc: "Select privilege category and submit structured application details.",
    icon: FileCheck
  },
  {
    step: 3,
    title: "Submit Documents",
    desc: "Upload certified dockets, site layouts, Fire NOCs, and financial bonds.",
    icon: Layers
  },
  {
    step: 4,
    title: "Verification",
    desc: "Automated scrutiny by Dealing Assistant (DA) & field inspection officers.",
    icon: ClipboardCheck
  },
  {
    step: 5,
    title: "Payment",
    desc: "Generate e-Challan and pay statutory duties through secure digital gateways.",
    icon: Landmark
  },
  {
    step: 6,
    title: "Approval",
    desc: "Multi-tier administrative review and final digital sanction by Competent Authority.",
    icon: ShieldCheck
  },
  {
    step: 7,
    title: "Licence",
    desc: "Instant automated download of cryptographically signed, QR-coded License/Permit.",
    icon: Award
  }
];

export default function AboutUsModal({ 
  isOpen, 
  onClose, 
  onOpenExploreServices,
  onNavigate 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedJourneyStep, setSelectedJourneyStep] = useState(1);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (path) => {
    onClose();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleExploreServicesClick = () => {
    onClose();
    if (onOpenExploreServices) {
      onOpenExploreServices();
    }
  };

  // Filter roles based on search keyword
  const filteredRoles = ROLES_DATA.filter((role) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      role.title.toLowerCase().includes(term) ||
      role.desc.toLowerCase().includes(term) ||
      role.tags.some((t) => t.toLowerCase().includes(term)) ||
      role.badge.toLowerCase().includes(term)
    );
  });

  return (
    <div className="aum-backdrop" onClick={onClose}>
      <div 
        className="aum-modal-window" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            TOP WINDOW HEADER BAR
            ========================================================================= */}
        <div className="aum-window-header">
          <div className="aum-header-left">
            <div className="aum-window-badge">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Government of NCT of Delhi • Department of Excise</span>
            </div>
            <h2 className="aum-window-title">
              About the Department &amp; Governance Overview
            </h2>
          </div>

          <div className="aum-header-controls">
            <button 
              onClick={onClose}
              className="aum-close-btn"
              title="Close About Us Window (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            NAVIGATION TABS & SEARCH SUB-HEADER
            ========================================================================= */}
        <div className="aum-sub-header">
          <div className="aum-search-box">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search mandates, responsibilities (e.g., Regulation, Licence, Brand, Revenue, Enforcement)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="aum-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="aum-clear-search"
              >
                Clear
              </button>
            )}
          </div>

          <div className="aum-tabs-bar">
            {[
              { id: "ALL", label: "🌟 Complete Overview" },
              { id: "ABOUT", label: "🏛️ About Department" },
              { id: "VISION", label: "🎯 Vision & Mission" },
              { id: "ROLES", label: "⚖️ Roles & Responsibilities" },
              { id: "DIGITAL", label: "💻 Digital eAbkari Services" },
              { id: "LINKS", label: "⚡ Quick Governance Links" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`aum-tab-chip ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SCROLLABLE BODY CONTENT
            ========================================================================= */}
        <div className="aum-body-content">

          {/* Quick Statistics Strip (Modern Portal Design Recommendation) */}
          <div className="aum-stats-strip">
            {STATS.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="aum-stat-card">
                  <div className="aum-stat-icon-wrap">
                    <StatIcon className="w-5 h-5 text-sky-700" />
                  </div>
                  <div className="aum-stat-info">
                    <div className="aum-stat-val">{stat.value}</div>
                    <div className="aum-stat-lbl">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =======================================================================
              SECTION 1: 🏛️ ABOUT THE DEPARTMENT
              ======================================================================= */}
          {(activeTab === "ALL" || activeTab === "ABOUT") && (
            <section className="aum-section">
              <div className="aum-section-heading">
                <div className="aum-heading-icon">
                  <Building className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h3 className="aum-heading-title">1. 🏛️ About the Department</h3>
                  <span className="aum-heading-subtitle">Statutory Role &amp; Administrative Mandate</span>
                </div>
              </div>

              <div className="aum-intro-card">
                <p className="aum-intro-lead">
                  The Excise Department is responsible for the administration and enforcement of excise laws and regulations. The department regulates liquor-related activities, manages licensing and permits, monitors licensed establishments and dealers, and works to ensure compliance with applicable laws and departmental requirements.
                </p>

                <div className="aum-pillars-grid">
                  <div className="aum-pillar-item">
                    <div className="aum-pillar-badge">Mandate 01</div>
                    <h4>Regulatory Enforcement</h4>
                    <p>Maintaining stringent legal control over potable and industrial alcohol from manufacturing to retail dispensation.</p>
                  </div>

                  <div className="aum-pillar-item">
                    <div className="aum-pillar-badge">Mandate 02</div>
                    <h4>Revenue Optimization</h4>
                    <p>Mobilizing statutory state revenue with automated transparent fee collection, compounding receipts, and duty reconciliation.</p>
                  </div>

                  <div className="aum-pillar-item">
                    <div className="aum-pillar-badge">Mandate 03</div>
                    <h4>Citizen Safety &amp; Quality</h4>
                    <p>Ensuring zero tolerance for spurious or adulterated liquor through chemical verification, barcode tracing, and vigilant enforcement.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =======================================================================
              SECTION 2: 🎯 VISION & MISSION
              ======================================================================= */}
          {(activeTab === "ALL" || activeTab === "VISION") && (
            <section className="aum-section">
              <div className="aum-section-heading">
                <div className="aum-heading-icon">
                  <Target className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h3 className="aum-heading-title">2. 🎯 Vision &amp; Mission</h3>
                  <span className="aum-heading-subtitle">Our Strategic Purpose &amp; Operational Objectives</span>
                </div>
              </div>

              <div className="aum-vm-grid">
                {/* Vision Box */}
                <div className="aum-vm-card aum-vision-card">
                  <div className="aum-vm-header">
                    <div className="aum-vm-icon-box vision-icon">
                      <Compass className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <span className="aum-vm-label">Our Guiding North Star</span>
                      <h4 className="aum-vm-title">Vision</h4>
                    </div>
                  </div>
                  <blockquote className="aum-vm-quote">
                    "To provide transparent, efficient, technology-enabled and responsible excise administration while ensuring effective regulatory compliance."
                  </blockquote>
                  <div className="aum-vm-foot">
                    <span className="aum-vm-pill">Transparency</span>
                    <span className="aum-vm-pill">Efficiency</span>
                    <span className="aum-vm-pill">Compliance</span>
                  </div>
                </div>

                {/* Mission Box */}
                <div className="aum-vm-card aum-mission-card">
                  <div className="aum-vm-header">
                    <div className="aum-vm-icon-box mission-icon">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="aum-vm-label">Action-Oriented Commitments</span>
                      <h4 className="aum-vm-title">Mission</h4>
                    </div>
                  </div>
                  <ul className="aum-mission-list">
                    <li>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ensure effective implementation of excise laws and regulations.</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Provide transparent and efficient licensing services.</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Strengthen monitoring and compliance mechanisms.</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Promote digital delivery of departmental services.</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Improve citizen and stakeholder experience.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* =======================================================================
              SECTION 3: ⚖️ ROLES & RESPONSIBILITIES
              ======================================================================= */}
          {(activeTab === "ALL" || activeTab === "ROLES") && (
            <section className="aum-section">
              <div className="aum-section-heading">
                <div className="aum-heading-icon">
                  <Scale className="w-5 h-5 text-sky-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="aum-heading-title">3. ⚖️ Roles &amp; Responsibilities</h3>
                      <span className="aum-heading-subtitle">Major Functions Administered by the Excise Department</span>
                    </div>
                    <span className="aum-count-pill">{filteredRoles.length} Functions</span>
                  </div>
                </div>
              </div>

              {filteredRoles.length > 0 ? (
                <div className="aum-roles-grid">
                  {filteredRoles.map((role) => {
                    const RoleIcon = role.icon;
                    return (
                      <div key={role.id} className="aum-role-card">
                        <div className="aum-role-header">
                          <div className="aum-role-icon-box">
                            <RoleIcon className="w-5 h-5 text-sky-700" />
                          </div>
                          <span className="aum-role-badge">{role.badge}</span>
                        </div>
                        <h4 className="aum-role-title">{role.title}</h4>
                        <p className="aum-role-desc">{role.desc}</p>
                        <div className="aum-role-tags">
                          {role.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="aum-role-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="aum-empty-state">
                  <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
                  <h4>No responsibilities found matching "{searchTerm}"</h4>
                  <p>Try clearing your search term to see all departmental functions.</p>
                </div>
              )}
            </section>
          )}

          {/* =======================================================================
              SECTION 4: 💻 DIGITAL TRANSFORMATION / eABKARI
              ======================================================================= */}
          {(activeTab === "ALL" || activeTab === "DIGITAL") && (
            <section className="aum-section">
              <div className="aum-section-heading">
                <div className="aum-heading-icon">
                  <Laptop className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h3 className="aum-heading-title">4. 💻 Digital Excise Services (eAbkari)</h3>
                  <span className="aum-heading-subtitle">Digital Transformation &amp; Single-Window Architecture</span>
                </div>
              </div>

              {/* Introduction Banner */}
              <div className="aum-digital-intro-card">
                <div className="aum-digital-intro-content">
                  <span className="aum-digital-badge">eAbkari Unified Engine</span>
                  <h4>Digital Excise Services</h4>
                  <p>
                    <strong>eAbkari</strong> provides a unified digital platform for accessing Excise Department services, submitting applications, managing licences, registering brands, making payments, tracking applications, and accessing departmental information online.
                  </p>
                </div>
                <button 
                  onClick={handleExploreServicesClick}
                  className="aum-btn-explore-now"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Digital Journey */}
              <div className="aum-journey-wrapper">
                <div className="aum-journey-heading-row">
                  <div>
                    <h5 className="aum-journey-title">The Complete e-Service Journey</h5>
                    <p className="aum-journey-subtitle">
                      Step-by-step transparent progression from initial applicant onboarding to final QR-coded license grant:
                    </p>
                  </div>
                  <span className="aum-journey-tag">7-Step Online Flow</span>
                </div>

                {/* Stepper Timeline Grid */}
                <div className="aum-journey-grid">
                  {DIGITAL_JOURNEY.map((st) => {
                    const StepIcon = st.icon;
                    const isSelected = selectedJourneyStep === st.step;
                    return (
                      <div 
                        key={st.step} 
                        className={`aum-journey-card ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedJourneyStep(st.step)}
                      >
                        <div className="aum-journey-step-num">
                          <span>0{st.step}</span>
                          {st.step < 7 && <ChevronRight className="aum-journey-arrow" />}
                        </div>
                        <div className="aum-journey-icon-wrap">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <h6 className="aum-journey-step-title">{st.title}</h6>
                        <p className="aum-journey-step-desc">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Active Step Highlight Callout */}
                <div className="aum-journey-active-callout">
                  <div className="aum-active-num-badge">
                    Phase 0{selectedJourneyStep}
                  </div>
                  <div className="aum-active-text">
                    <strong>{DIGITAL_JOURNEY[selectedJourneyStep - 1].title}: </strong>
                    <span>{DIGITAL_JOURNEY[selectedJourneyStep - 1].desc}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =======================================================================
              SECTION 5: ⚡ QUICK GOVERNANCE LINKS (Modern Portal Design)
              ======================================================================= */}
          {(activeTab === "ALL" || activeTab === "LINKS") && (
            <section className="aum-section">
              <div className="aum-section-heading">
                <div className="aum-heading-icon">
                  <Building2 className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h3 className="aum-heading-title">5. ⚡ Quick Governance Links &amp; Direct Directories</h3>
                  <span className="aum-heading-subtitle">Navigate to Detailed Portals, Directories &amp; Gazettes</span>
                </div>
              </div>

              <div className="aum-links-grid">
                <div 
                  className="aum-link-card"
                  onClick={() => handleLinkClick("/staff")}
                >
                  <div className="aum-link-left">
                    <div className="aum-link-icon-box">
                      <Users className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h5>Department Staff Directory</h5>
                      <p>View telephone extensions, nodal officers, and branch in-charges.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>

                <div 
                  className="aum-link-card"
                  onClick={() => handleLinkClick("/organizational-structure")}
                >
                  <div className="aum-link-left">
                    <div className="aum-link-icon-box">
                      <Layers className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h5>Organizational Hierarchy</h5>
                      <p>Structure of Excise Commissioner, Deputy Commissioners, and DA Desks.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>

                <div 
                  className="aum-link-card"
                  onClick={() => handleLinkClick("/excise-commissioner")}
                >
                  <div className="aum-link-left">
                    <div className="aum-link-icon-box">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h5>Excise Commissioner Profile</h5>
                      <p>Profile of the Commissioner and executive leadership message.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>

                <div 
                  className="aum-link-card"
                  onClick={handleExploreServicesClick}
                >
                  <div className="aum-link-left">
                    <div className="aum-link-icon-box">
                      <Laptop className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h5>Explore All 360+ Services</h5>
                      <p>Full directory of licenses, permits, brand masters, and DA workflows.</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </section>
          )}

        </div>

        {/* =========================================================================
            MODAL WINDOW FOOTER
            ========================================================================= */}
        <div className="aum-window-footer">
          <div className="aum-footer-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Government of NCT of Delhi • Department of Excise, Entertainment &amp; Luxury Tax</span>
          </div>
          <div className="aum-footer-actions">
            <button 
              onClick={handleExploreServicesClick}
              className="aum-footer-services-btn"
            >
              Explore e-Services Directory
            </button>
            <button 
              onClick={onClose} 
              className="aum-footer-close-btn"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
