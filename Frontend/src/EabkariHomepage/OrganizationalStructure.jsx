import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  User, 
  Users, 
  Monitor, 
  Shield, 
  FileText, 
  FlaskConical, 
  Factory, 
  ClipboardList, 
  Scale, 
  ShieldCheck, 
  Gavel, 
  BookOpen, 
  Landmark, 
  Calculator, 
  Beaker, 
  Network,
  Award,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Info,
  CheckCircle2,
  Building2,
  Briefcase,
  Layers,
  ArrowDown
} from 'lucide-react';

// Detailed statutory directory of offices & roles
const OFFICERS_DIRECTORY = {
  commissioner: {
    id: 'commissioner',
    title: 'Commissioner',
    subtitle: 'Head of Department (HOD)',
    cadre: 'Indian Administrative Service (IAS)',
    levelBadge: 'Level 1 • Apex Authority',
    wingName: 'Executive Directorate',
    reportsTo: 'Hon’ble Minister of Finance & Lt. Governor of Delhi',
    supervises: 'Dy. Commissioner-I, Dy. Commissioner-II, All Joint Directors & Branch Heads',
    roleDesc: 'Apex administrative, statutory, and appellate authority responsible for overall excise policy formulation, revenue mobilization, and enforcement regulation under the Delhi Excise Act, 2009.',
    keyFunctions: [
      'Statutory policy formulation and excise administration for NCT of Delhi',
      'Appellate authority for licensing disputes, appeals & revision petitions',
      'Overseeing ₹5,000+ Crore annual excise revenue collection & state treasury deposits',
      'Digital governance modernization, e-Abkari single-window portal oversight'
    ]
  },
  dc1: {
    id: 'dc1',
    title: 'Dy. Commissioner - I',
    subtitle: 'Direct Supervision • Wing 1',
    cadre: 'DANICS (Senior Administrative Grade)',
    levelBadge: 'Level 2 • Senior Administration',
    wingName: 'Technical, IT, Enforcement & Policy Wing',
    reportsTo: 'Commissioner (Excise)',
    supervises: 'Joint Director (IT), Sr. Systems Analyst, and 7 Assistant Commissioners',
    roleDesc: 'Direct administrative supervisor of state digital infrastructure (ESCIMS & eAbkari), armed field enforcement teams, brand approvals, wholesale privileges, and statutory policy formulation.',
    keyFunctions: [
      'Oversight of e-Abkari & ESCIMS track-and-trace workflow engines',
      'Field enforcement squads, border interception pickets & anti-bootlegging drives',
      'Wholesale (L-1/L-1F) licensing and statutory spirit transit permits',
      'Statutory litigation defense in High Court and Appellate Tribunal'
    ]
  },
  dc2: {
    id: 'dc2',
    title: 'Dy. Commissioner - II',
    subtitle: 'Direct Supervision • Wing 2',
    cadre: 'DANICS (Senior Administrative Grade)',
    levelBadge: 'Level 2 • Senior Administration',
    wingName: 'Administration, Regulatory, Hospitality & Accounts Wing',
    reportsTo: 'Commissioner (Excise)',
    supervises: '7 Assistant Commissioners, Dy. Controller of Accounts, Chemical Testing Lab',
    roleDesc: 'Supervises establishment administration, excise intelligence bureau, hospitality bar licenses (HCR), confiscation proceedings, government vends, and laboratory chemical testing.',
    keyFunctions: [
      'Excise Intelligence Bureau (EIB) undercover surveillance & inter-agency intelligence',
      'Hotel, Club & Restaurant (HCR) bar licenses and event permits (P-10/L-28)',
      'Confiscation and public auction of seized vehicles and contraband goods',
      'Chemical testing of potable spirits and statutory financial audit control'
    ]
  },
  // Wing 1 (DC-1 Sub-Branches)
  jd_it: {
    id: 'jd_it',
    title: 'Joint Director (IT)',
    subtitle: 'State IT Directorate',
    cadre: 'Information Technology Directorate',
    levelBadge: 'Level 3 • Specialized Directorate',
    wingName: 'IT & Digital Infrastructure (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Sr. Systems Analyst, Database Architects, Software Engineers',
    roleDesc: 'Leads the state digital architecture, cloud infrastructure, network security, and secure API integrations for the eAbkari and ESCIMS single-window systems.',
    keyFunctions: [
      'High-availability cloud architecture for citizen and licensee transactions',
      'Integration with PFMS, e-Challan payment gateways & state treasury',
      'Cybersecurity compliance, disaster recovery & immutable digital audit trails'
    ]
  },
  ssa: {
    id: 'ssa',
    title: 'Sr. Systems Analyst',
    subtitle: 'Core Systems Operations',
    cadre: 'Technical Cadre',
    levelBadge: 'Level 3 • Systems Operations',
    wingName: 'IT & Digital Infrastructure (DC-I)',
    reportsTo: 'Joint Director (IT)',
    supervises: 'System Administrators, Technical Support Engineers',
    roleDesc: 'Manages core database operations, track-and-trace QR validation engines, and software incident triage across all 11 excise administrative zones.',
    keyFunctions: [
      'Track-and-trace 2D barcode scanning verification & depot inventory synchronization',
      'User role permission allocation, digital signature (DSC) key management',
      'Daily transaction reconciliation & audit logs scrutiny'
    ]
  },
  ac_escims: {
    id: 'ac_escims',
    title: 'Asst. Commissioner (ESCIMS)',
    subtitle: 'Supply Chain Track & Trace',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Dealing Assistants, Technical Operators',
    roleDesc: 'Head of Excise Supply Chain Information Management System (ESCIMS), handling end-to-end barcoding from distilleries to retail vends.',
    keyFunctions: [
      'Supply chain barcode & holograms generation',
      'Verification of digital transport passes across bonded warehouses',
      'Real-time retail vend stock balance monitoring'
    ]
  },
  ac_enforcement: {
    id: 'ac_enforcement',
    title: 'Asst. Commissioner (Enforcement)',
    subtitle: 'Law Enforcement & Vigilance',
    cadre: 'Excise Enforcement Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Excise Inspectors, Sub-Inspectors, Armed Mobile Patrol Units',
    roleDesc: 'Directs rapid response task forces, border interception pickets, and anti-bootlegging crackdowns across NCR border entry points.',
    keyFunctions: [
      'Raids against illicit liquor smuggling and spurious trade networks',
      'Border vehicular checkpoints and random highway inspections',
      'Seizure of contraband liquor, registration of FIRs & case tracking'
    ]
  },
  ac_permit: {
    id: 'ac_permit',
    title: 'Asst. Commissioner (Permit)',
    subtitle: 'Permits & Transit Authorisations',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Permit Verification Officers, Dealing Assistants',
    roleDesc: 'Authorizes Import Permits Cum Passes (IP-PL), export permits, transit authorizations, and single-day event liquor permits (P-10/L-28).',
    keyFunctions: [
      'Digital scrutiny & issuance of interstate IP-PL transit passes',
      'Single-day event permits (P-10) for weddings, banquets and public events',
      'Bulk spirit and extra neutral alcohol (ENA) movement permits'
    ]
  },
  ac_ifml: {
    id: 'ac_ifml',
    title: 'Asst. Commissioner (IFML / Brand Reg.)',
    subtitle: 'Brand Registration & MRP',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Brand Scrutiny Officers, Label Assessment Desk',
    roleDesc: 'Regulates Indian Made Foreign Liquor (IMFL) and Imported Foreign Liquor (IFL) brand approvals, label certifications, and statutory MRP registration.',
    keyFunctions: [
      'Evaluation & approval of new liquor brands, bottle sizes & packaging',
      'Bottle label verification, chemical standards compliance & hologram validation',
      'Publication and periodic review of statutory Maximum Retail Price (MRP) lists'
    ]
  },
  ac_mtp: {
    id: 'ac_mtp',
    title: 'Asst. Commissioner (M&TP / Distilleries)',
    subtitle: 'Medicinal, Toilet & Microbreweries',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Resident Brewery/Distillery Inspectors',
    roleDesc: 'Regulates Medicinal and Toilet Preparations containing alcohol, wholesale bonded warehouses, and micro-breweries operating in Delhi.',
    keyFunctions: [
      'Supervision of industrial and medicinal spirit quotas and denaturing',
      'Periodic physical verification of microbrewery batches & brew logs',
      'Bonded warehouse storage licenses and stock audits'
    ]
  },
  ac_policy: {
    id: 'ac_policy',
    title: 'Asst. Commissioner (Policy)',
    subtitle: 'Excise Regime & Legislation',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Policy Analysts, Research Officers',
    roleDesc: 'Drafts annual excise regime proposals, renewal guidelines, statutory notifications, stakeholder consultation white papers, and inter-state treaties.',
    keyFunctions: [
      'Drafting annual excise regime rules & license terms',
      'Economic modeling of excise duty tariffs and state revenue impact',
      'Inter-state coordination and reciprocal tax harmonization'
    ]
  },
  ac_litigation: {
    id: 'ac_litigation',
    title: 'Asst. Commissioner (Litigation)',
    cadre: 'Legal & Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Technical & Enforcement (DC-I)',
    reportsTo: 'Dy. Commissioner - I',
    supervises: 'Legal Assistants, Standing Counsel Liaison Team',
    roleDesc: 'Coordinates departmental legal representation across the Supreme Court of India, Delhi High Court, and the Financial Commissioner Tribunal.',
    keyFunctions: [
      'Drafting and filing official counter-affidavits and compliance petitions',
      'Briefing Senior Standing Counsels and Advocate Generals',
      'Tracking writ petitions, stay orders and statutory appeal outcomes'
    ]
  },
  // Wing 2 (DC-2 Sub-Branches)
  acp_eib: {
    id: 'acp_eib',
    title: 'Asst. Commissioner Police (EIB)',
    subtitle: 'Excise Intelligence Bureau',
    cadre: 'Delhi Police Deputation',
    levelBadge: 'Level 3 • Intelligence & Vigilance',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Police Sub-Inspectors, Intelligence Operatives',
    roleDesc: 'Head of Excise Intelligence Bureau (EIB), coordinating covert surveillance, illicit syndicate tracking, and inter-agency collaboration with DRI and police forces.',
    keyFunctions: [
      'Covert human and technical intelligence on bootlegging networks',
      'Coordination with Delhi Police, NCB, and neighboring state excise teams',
      'Special strike operations against organized counterfeiters'
    ]
  },
  ac_admin: {
    id: 'ac_admin',
    title: 'Asst. Commissioner (Admin & Care Taking)',
    subtitle: 'Personnel, HR & Logistics',
    cadre: 'Administration Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Administrative Officers, Office Superintendents',
    roleDesc: 'Directs departmental human resources, employee postings, service rules, building logistics, RTI disclosures, and public grievances.',
    keyFunctions: [
      'Departmental personnel management, promotions, and postings',
      'Prompt resolution of Right to Information (RTI) and citizen grievances',
      'Departmental procurement, office automation & infrastructure'
    ]
  },
  ac_ctb: {
    id: 'ac_ctb',
    title: 'Asst. Commissioner (CTB / Store)',
    subtitle: 'Care Taking Branch & Stores',
    cadre: 'Administration Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Store Keepers, Physical Assets Team',
    roleDesc: 'Maintains departmental asset registries, vehicle fleet management, building facilities, and security management of Excise Bhavan.',
    keyFunctions: [
      'Government vehicle fleet upkeep and mobility support for enforcement',
      'Stationery, office machinery, and technical inventory control',
      'Physical building security and maintenance contracts'
    ]
  },
  ac_hcr: {
    id: 'ac_hcr',
    title: 'Asst. Commissioner (HCR / Hotels & Bars)',
    subtitle: 'Hospitality Licensing & Bars',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Field Scrutiny Officers, Bar Inspection Squads',
    roleDesc: 'Oversees licensing and operational compliance for Hotels, Clubs, and Restaurants (L-15, L-16, L-17, L-18, etc.) serving liquor in Delhi.',
    keyFunctions: [
      'Scrutiny and digital sanction of hospitality bar licenses',
      'Compliance with Fire Safety NOCs, seating capacity, and permissible hours',
      'Surprise night audits to verify legitimate stock origin and prevent underage service'
    ]
  },
  ac_confiscation: {
    id: 'ac_confiscation',
    title: 'Asst. Commissioner (Confiscation)',
    subtitle: 'Quasi-Judicial Adjudication',
    cadre: 'Legal & Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Confiscation Officers, Auction Committee Members',
    roleDesc: 'Conducts formal quasi-judicial adjudication proceedings for confiscation of seized illicit liquor, conveyances, and vehicles under Section 59/60.',
    keyFunctions: [
      'Adjudication hearings under Delhi Excise Act Section 59/60',
      'Conducting public transparent e-auctions of seized vehicles',
      'Supervision of environmentally safe disposal of seized spurious alcohol'
    ]
  },
  ac_vends: {
    id: 'ac_vends',
    title: 'Asst. Commissioner (L-22, 23 & 30)',
    subtitle: 'Special Retail Privileges & CSD',
    cadre: 'Excise Executive Cadre',
    levelBadge: 'Level 3 • Functional Branch Head',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Vend Inspectors, Retail Audit Team',
    roleDesc: 'Regulates special retail categories including defence / paramilitary CSD canteens (L-22), authorized retail vends (L-23), and customs bonded stores (L-30).',
    keyFunctions: [
      'Licensing and quota control for CSD military liquor vends',
      'Duty exemption verification for armed forces establishments',
      'Compliance monitoring for duty-free and customs bonded stores'
    ]
  },
  gm_excise: {
    id: 'gm_excise',
    title: 'General Manager (Excise)',
    subtitle: 'Government Corporation Vends',
    cadre: 'State Corporation Management',
    levelBadge: 'Level 3 • Commercial Operations',
    wingName: 'Admin & Regulation (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Vend Managers, Corporation Liaison Officers',
    roleDesc: 'Coordinates retail operations across Delhi government corporation vends (DSIIDC, DTTDC, DCCWS, DSCSC) to ensure seamless supply and consumer service.',
    keyFunctions: [
      'Liaison with state corporation liquor store operations',
      'Monitoring stock availability and brand variety for citizens',
      'Standardization of retail store aesthetics and electronic billing'
    ]
  },
  dca: {
    id: 'dca',
    title: 'Dy. Controller of Accounts',
    subtitle: 'Finance, Accounts & Audit',
    cadre: 'State Accounts Service',
    levelBadge: 'Level 3 • Financial Oversight Head',
    wingName: 'Finance & Examination (DC-II)',
    reportsTo: 'Dy. Commissioner - II',
    supervises: 'Accounts Officers, Senior Accountants, Audit Squads',
    roleDesc: 'Heads the department’s financial accounting, statutory revenue reconciliation, CAG audit compliance, and annual budget planning.',
    keyFunctions: [
      'Preparation of department annual budget estimates & revised estimates',
      'Real-time statutory reconciliation of excise duty deposits with RBI/SBI',
      'Replies and remediation for Comptroller and Auditor General (CAG) audits'
    ]
  },
  ao: {
    id: 'ao',
    title: 'Accounts Officer',
    subtitle: 'Treasury & Challan Operations',
    cadre: 'State Accounts Service',
    levelBadge: 'Level 3 • Accounting Operations',
    wingName: 'Finance & Examination (DC-II)',
    reportsTo: 'Dy. Controller of Accounts',
    supervises: 'Accountants, e-Challan Verifiers',
    roleDesc: 'Manages daily treasury challan verification, license fee deposits, licensee bank guarantees, and security refund claims.',
    keyFunctions: [
      'Verification of online e-Challan payments and payment gateway logs',
      'Custody, monitoring, and timely renewal of Licensee Bank Guarantees (BG)',
      'Processing legitimate security refund claims and adjustments'
    ]
  },
  chemical_lab: {
    id: 'chemical_lab',
    title: 'Chemical Examination Lab',
    subtitle: 'Statutory Excise Testing Lab',
    cadre: 'Government Chemical Analyst',
    levelBadge: 'Level 3 • Quality Assurance',
    wingName: 'Finance & Examination (DC-II)',
    reportsTo: 'Dy. Controller of Accounts / DC-II',
    supervises: 'Chemical Analysts, Laboratory Technicians',
    roleDesc: 'Performs scientific laboratory analysis of spirit samples to test alcoholic strength, purity, and detect fatal adulterants like methyl alcohol.',
    keyFunctions: [
      'Gas Chromatography-Mass Spectrometry (GC-MS) purity testing',
      'Issuance of official statutory Chemical Fitness Certificates for brand registration',
      'Testing seized contraband samples to provide conclusive forensic evidence in courts'
    ]
  }
};

const OrganizationalStructure = ({ onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState('diagram'); // 'diagram' or 'interactive'
  const [wingFilter, setWingFilter] = useState('ALL'); // 'ALL', 'WING1', 'WING2'
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  // Filter officers matching search
  const isHighlighted = (id, title, roleDesc = '') => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase();
    return title.toLowerCase().includes(term) || roleDesc.toLowerCase().includes(term);
  };

  const hasSearch = searchTerm.trim().length > 0;

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(0.7, Number((prev + delta).toFixed(1))), 1.3));
  };

  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="org-container">
      {/* Home Navigation */}
      <div className="org-nav-row">
        <button 
          type="button" 
          className="org-btn-back"
          onClick={onNavigateHome}
        >
          <Home className="org-back-icon" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Title Section */}
      <div className="org-header-row">
        <div className="org-header-icon-box">
          <Network className="org-header-icon" />
        </div>
        <div>
          <h2 className="org-header-title">
            ORGANIZATIONAL STRUCTURE
          </h2>
          <p className="org-header-subtitle">
            Department of Excise, Entertainment &amp; Luxury Tax • National Capital Territory of Delhi
          </p>
          <div className="org-header-divider" />
        </div>
      </div>

      {/* View Switcher: Visual Chart vs Tabular Hierarchy */}
      <div className="org-switcher-wrapper">
        <div className="org-switcher-box">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`org-switcher-btn ${activeTab === 'diagram' ? 'active' : ''}`}
          >
            Visual Chart &amp; Interactive Tree
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`org-switcher-btn ${activeTab === 'interactive' ? 'active' : ''}`}
          >
            Tabular Hierarchy
          </button>
        </div>
      </div>

      {activeTab === 'diagram' && (
        /* ========================================================================= */
        /*                       VISUAL CHART CONTROLS BAR                           */
        /* ========================================================================= */
        <div className="org-chart-toolbar">
          {/* Wing Filters */}
          <div className="org-toolbar-filter-group">
            <span className="org-toolbar-label">Show Wing:</span>
            <div className="org-toolbar-pills">
              <button
                type="button"
                className={`org-pill-btn ${wingFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setWingFilter('ALL')}
              >
                All Wings (19 Offices)
              </button>
              <button
                type="button"
                className={`org-pill-btn ${wingFilter === 'WING1' ? 'active' : ''}`}
                onClick={() => setWingFilter('WING1')}
              >
                Wing 1: IT &amp; Technical (DC-I)
              </button>
              <button
                type="button"
                className={`org-pill-btn ${wingFilter === 'WING2' ? 'active' : ''}`}
                onClick={() => setWingFilter('WING2')}
              >
                Wing 2: Admin &amp; Finance (DC-II)
              </button>
            </div>
          </div>

          {/* Search Box & Zoom Actions */}
          <div className="org-toolbar-actions-group">
            <div className="org-search-container">
              <Search className="org-search-icon" />
              <input
                type="text"
                className="org-search-input"
                placeholder="Search officer, branch, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="org-search-clear"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  <X className="org-search-clear-icon" />
                </button>
              )}
            </div>

            <div className="org-zoom-controls">
              <button 
                type="button" 
                className="org-zoom-btn" 
                onClick={() => handleZoom(-0.1)} 
                title="Zoom Out"
                disabled={zoomLevel <= 0.7}
              >
                <ZoomOut className="org-zoom-icon" />
              </button>
              <span className="org-zoom-badge">{Math.round(zoomLevel * 100)}%</span>
              <button 
                type="button" 
                className="org-zoom-btn" 
                onClick={() => handleZoom(0.1)} 
                title="Zoom In"
                disabled={zoomLevel >= 1.3}
              >
                <ZoomIn className="org-zoom-icon" />
              </button>
              <button 
                type="button" 
                className="org-zoom-btn" 
                onClick={handleResetZoom} 
                title="Reset Zoom"
              >
                <RotateCcw className="org-zoom-icon" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ position: 'relative' }}>
        {activeTab === 'diagram' ? (
          /*VISUAL DIAGRAM VIEW*/
          <div className="org-diagram-scroll">
            <div 
              className="org-chart-content"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out'
              }}
            >
              
              {/* Level 1: Core Commissioner Node */}
              <div className="org-tree-apex">
                <div 
                  className={`org-hod-card interactive-node ${isHighlighted('commissioner', OFFICERS_DIRECTORY.commissioner.title, OFFICERS_DIRECTORY.commissioner.roleDesc) ? 'node-highlight' : ''}`}
                  onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.commissioner)}
                  title="Click to view statutory responsibilities"
                >
                  <div className="org-hod-emblem-badge">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                      alt="National Emblem"
                      className="org-emblem-img"
                    />
                  </div>
                  <div className="org-hod-info">
                    <div className="org-badge-apex-tag">Apex Authority • Level 1</div>
                    <h3 className="org-hod-title">Commissioner</h3>
                    <p className="org-hod-tag">Indian Administrative Service (IAS)</p>
                    <p className="org-hod-mandate-hint">Click for full statutory powers &amp; portfolio →</p>
                  </div>
                </div>

                {/* Vertical Trunk Line from Commissioner */}
                <div className="org-trunk-stem">
                  <span className="org-trunk-label">Executive Delegation</span>
                </div>
              </div>

              {/* Central Horizontal Crossbar Connector Line */}
              {wingFilter === 'ALL' ? (
                <div className="org-level1-crossbar-grid">
                  <div className="org-crossbar-half-left" />
                  <div className="org-crossbar-half-right" />
                </div>
              ) : (
                <div className="org-single-stem-down" />
              )}

              {/* Level 2 & 3: Wings Grid with Perfect Symmetrical Alignment */}
              <div className={`org-wings-grid ${wingFilter !== 'ALL' ? 'single-wing' : ''}`}>
                
                {/* ====== WING 1 (DC-I: Technical & IT) ====== */}
                {(wingFilter === 'ALL' || wingFilter === 'WING1') && (
                  <div className="org-wing-column">
                    <div className="org-dc-card-wrapper">
                      <div 
                        className={`org-dc-card interactive-node ${isHighlighted('dc1', OFFICERS_DIRECTORY.dc1.title, OFFICERS_DIRECTORY.dc1.roleDesc) ? 'node-highlight' : ''}`}
                        onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.dc1)}
                        title="Click to inspect Wing 1 supervision portfolio"
                      >
                        <div className="org-dc-icon-box">
                          <User className="org-dc-icon" />
                        </div>
                        <div className="org-dc-content">
                          <div className="org-dc-supervision-badge">Senior Administration • Level 2</div>
                          <h4 className="org-dc-title">Dy. Commissioner - I</h4>
                          <p className="org-dc-desc">Technical, IT, Enforcement &amp; Policy</p>
                          <span className="org-dc-sub-count">8 Subordinate Branches Managed</span>
                        </div>
                      </div>

                      {/* Stem from DC-I down to sub-directorates */}
                      <div className="org-dc-stem">
                        <span className="org-dc-sub-stem-badge">Technical &amp; IT Supervision</span>
                      </div>

                      {/* Sub-crossbar branching cleanly into 1A and 1B */}
                      <div className="org-sub-crossbar-grid">
                        <div className="org-sub-crossbar-left" />
                        <div className="org-sub-crossbar-right" />
                      </div>
                    </div>

                    {/* Equal-Width Directorate Columns under DC-I */}
                    <div className="org-directorates-row">
                      
                      {/* 1A: IT & Digital Systems Directorate */}
                      <div className="org-directorate-card">
                        <div className="org-directorate-header header-it">
                          <div className="org-directorate-header-icon">
                            <Monitor className="icon-xs text-emerald-200" />
                          </div>
                          <div className="org-directorate-header-text">
                            <h4 className="org-directorate-title">IT &amp; Digital Directorate</h4>
                            <span className="org-directorate-subtitle">State Directorate • e-Abkari System</span>
                          </div>
                        </div>

                        <div className="org-directorate-body">
                          {/* Joint Director IT */}
                          <div 
                            className={`org-exec-officer-row it-border interactive-node ${isHighlighted('jd_it', OFFICERS_DIRECTORY.jd_it.title, OFFICERS_DIRECTORY.jd_it.roleDesc) ? 'node-highlight' : ''}`}
                            onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.jd_it)}
                            title="Click to view statutory responsibilities"
                          >
                            <div className="org-exec-icon-box it-bg">
                              <Users className="icon-xs" />
                            </div>
                            <div className="org-exec-content">
                              <span className="org-exec-cadre-tag tag-emerald">State Directorate Head</span>
                              <h5 className="org-exec-title">Joint Director (IT)</h5>
                              <span className="org-exec-desc">e-Abkari Architecture &amp; Integration</span>
                            </div>
                            <ChevronRight className="org-item-arrow" />
                          </div>

                          {/* Sr Systems Analyst */}
                          <div 
                            className={`org-exec-officer-row it-border interactive-node ${isHighlighted('ssa', OFFICERS_DIRECTORY.ssa.title, OFFICERS_DIRECTORY.ssa.roleDesc) ? 'node-highlight' : ''}`}
                            onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.ssa)}
                            title="Click to view statutory responsibilities"
                          >
                            <div className="org-exec-icon-box it-bg">
                              <Monitor className="icon-xs" />
                            </div>
                            <div className="org-exec-content">
                              <span className="org-exec-cadre-tag tag-emerald">Core Technical Operations</span>
                              <h5 className="org-exec-title">Sr. Systems Analyst</h5>
                              <span className="org-exec-desc">ESCIMS &amp; 2D QR Barcode Validation</span>
                            </div>
                            <ChevronRight className="org-item-arrow" />
                          </div>

                          {/* Statutory Digital Modules */}
                          <div className="org-capabilities-divider">
                            <div className="org-capabilities-divider-line" />
                            <span className="org-capabilities-divider-text">System Capabilities</span>
                            <div className="org-capabilities-divider-line" />
                          </div>

                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-emerald-600" />
                            <span>ESCIMS Track &amp; Trace Cloud Platform</span>
                          </div>
                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-emerald-600" />
                            <span>2D Hologram Barcode Verification Engine</span>
                          </div>
                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-emerald-600" />
                            <span>Automated e-Pass &amp; Transport Logistics</span>
                          </div>
                        </div>
                      </div>

                      {/* 1B: Technical & Enforcement Directorate */}
                      <div className="org-directorate-card">
                        <div className="org-directorate-header header-tech">
                          <div className="org-directorate-header-icon">
                            <Shield className="icon-xs text-blue-200" />
                          </div>
                          <div className="org-directorate-header-text">
                            <h4 className="org-directorate-title">Technical &amp; Enforcement</h4>
                            <span className="org-directorate-subtitle">7 Operational Divisions under DC-I</span>
                          </div>
                        </div>

                        <div className="org-directorate-body">
                          {[
                            { key: 'ac_escims', title: 'Asst. Commissioner (ESCIMS)', icon: <Monitor className="icon-xs" />, color: 'icon-blue', tag: 'Supply Chain Tracking' },
                            { key: 'ac_enforcement', title: 'Asst. Commissioner (Enforcement)', icon: <Shield className="icon-xs" />, color: 'icon-red', tag: 'Anti-Smuggling Patrols' },
                            { key: 'ac_permit', title: 'Asst. Commissioner (Permit)', icon: <FileText className="icon-xs" />, color: 'icon-amber', tag: 'IP-PL & Event P-10' },
                            { key: 'ac_ifml', title: 'Asst. Commissioner (IFML)', icon: <FlaskConical className="icon-xs" />, color: 'icon-purple', tag: 'Brand Reg. & MRP' },
                            { key: 'ac_mtp', title: 'Asst. Commissioner (M&TP)', icon: <Factory className="icon-xs" />, color: 'icon-slate', tag: 'Microbrewery & Bonded' },
                            { key: 'ac_policy', title: 'Asst. Commissioner (Policy)', icon: <ClipboardList className="icon-xs" />, color: 'icon-emerald', tag: 'Annual Excise Regime' },
                            { key: 'ac_litigation', title: 'Asst. Commissioner (Litigation)', icon: <Scale className="icon-xs" />, color: 'icon-indigo', tag: 'High Court & Tribunal' },
                          ].map((item) => (
                            <div 
                              key={item.key} 
                              className={`org-item-row interactive-node ${isHighlighted(item.key, item.title, item.tag) ? 'node-highlight' : ''}`}
                              onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY[item.key])}
                              title="Click to view statutory responsibilities"
                            >
                              <div className={`org-item-icon-box ${item.color}`}>
                                {item.icon}
                              </div>
                              <div className="org-item-col">
                                <span className="org-item-label">{item.title}</span>
                                <span className="org-item-tag">{item.tag}</span>
                              </div>
                              <ChevronRight className="org-item-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ====== WING 2 (DC-II: Admin, Regulation & Finance) ====== */}
                {(wingFilter === 'ALL' || wingFilter === 'WING2') && (
                  <div className="org-wing-column">
                    <div className="org-dc-card-wrapper">
                      <div 
                        className={`org-dc-card wing2-accent interactive-node ${isHighlighted('dc2', OFFICERS_DIRECTORY.dc2.title, OFFICERS_DIRECTORY.dc2.roleDesc) ? 'node-highlight' : ''}`}
                        onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.dc2)}
                        title="Click to inspect Wing 2 supervision portfolio"
                      >
                        <div className="org-dc-icon-box">
                          <User className="org-dc-icon" />
                        </div>
                        <div className="org-dc-content">
                          <div className="org-dc-supervision-badge">Senior Administration • Level 2</div>
                          <h4 className="org-dc-title">Dy. Commissioner - II</h4>
                          <p className="org-dc-desc">Administration, Regulation &amp; Finance</p>
                          <span className="org-dc-sub-count">10 Subordinate Branches Managed</span>
                        </div>
                      </div>

                      {/* Stem from DC-II down to sub-directorates */}
                      <div className="org-dc-stem">
                        <span className="org-dc-sub-stem-badge">Admin &amp; Finance Supervision</span>
                      </div>

                      {/* Sub-crossbar branching cleanly into 2A and 2B */}
                      <div className="org-sub-crossbar-grid wing2-sub">
                        <div className="org-sub-crossbar-left" />
                        <div className="org-sub-crossbar-right" />
                      </div>
                    </div>

                    {/* Equal-Width Directorate Columns under DC-II */}
                    <div className="org-directorates-row">
                      
                      {/* 2A: Administration & Regulation Directorate */}
                      <div className="org-directorate-card">
                        <div className="org-directorate-header header-admin">
                          <div className="org-directorate-header-icon">
                            <Landmark className="icon-xs text-teal-200" />
                          </div>
                          <div className="org-directorate-header-text">
                            <h4 className="org-directorate-title">Admin, Hospitality &amp; Vends</h4>
                            <span className="org-directorate-subtitle">7 Operational Divisions under DC-II</span>
                          </div>
                        </div>

                        <div className="org-directorate-body">
                          {[
                            { key: 'acp_eib', title: 'Asst. Commissioner Police (EIB)', icon: <ShieldCheck className="icon-xs" />, color: 'icon-teal', tag: 'Excise Intelligence' },
                            { key: 'ac_admin', title: 'Asst. Commissioner (Admin)', icon: <User className="icon-xs" />, color: 'icon-sky', tag: 'HR, Staff & Grievances' },
                            { key: 'ac_ctb', title: 'Asst. Commissioner (CTB)', icon: <Building2 className="icon-xs" />, color: 'icon-amber', tag: 'Vehicle Fleet & Stores' },
                            { key: 'ac_hcr', title: 'Asst. Commissioner (HCR)', icon: <Users className="icon-xs" />, color: 'icon-violet', tag: 'Hotel, Club & Bar Licenses' },
                            { key: 'ac_confiscation', title: 'Asst. Commissioner (Confiscation)', icon: <Gavel className="icon-xs" />, color: 'icon-amber', tag: 'Vehicle Auctions & Seizures' },
                            { key: 'ac_vends', title: 'Asst. Commissioner (L-22, 23, 30)', icon: <BookOpen className="icon-xs" />, color: 'icon-red', tag: 'Defence CSD & Vends' },
                            { key: 'gm_excise', title: 'GM (Excise / Govt Vends)', icon: <Landmark className="icon-xs" />, color: 'icon-slate', tag: 'State Corporation Vends' },
                          ].map((item) => (
                            <div 
                              key={item.key} 
                              className={`org-item-row interactive-node ${isHighlighted(item.key, item.title, item.tag) ? 'node-highlight' : ''}`}
                              onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY[item.key])}
                              title="Click to view statutory responsibilities"
                            >
                              <div className={`org-item-icon-box ${item.color}`}>
                                {item.icon}
                              </div>
                              <div className="org-item-col">
                                <span className="org-item-label">{item.title}</span>
                                <span className="org-item-tag">{item.tag}</span>
                              </div>
                              <ChevronRight className="org-item-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2B: Finance, Accounts & Scientific Lab Directorate */}
                      <div className="org-directorate-card">
                        <div className="org-directorate-header header-finance">
                          <div className="org-directorate-header-icon">
                            <Calculator className="icon-xs text-purple-200" />
                          </div>
                          <div className="org-directorate-header-text">
                            <h4 className="org-directorate-title">Finance, Accounts &amp; Lab</h4>
                            <span className="org-directorate-subtitle">3 Statutory Units under DC-II</span>
                          </div>
                        </div>

                        <div className="org-directorate-body">
                          {/* Dy Controller of Accounts */}
                          <div 
                            className={`org-exec-officer-row finance-border interactive-node ${isHighlighted('dca', OFFICERS_DIRECTORY.dca.title, OFFICERS_DIRECTORY.dca.roleDesc) ? 'node-highlight' : ''}`}
                            onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.dca)}
                            title="Click to view statutory responsibilities"
                          >
                            <div className="org-exec-icon-box finance-bg">
                              <Calculator className="icon-xs" />
                            </div>
                            <div className="org-exec-content">
                              <span className="org-exec-cadre-tag tag-purple">State Accounts Service</span>
                              <h5 className="org-exec-title">Dy. Controller of Accounts</h5>
                              <span className="org-exec-desc">CAG Audit, Budget &amp; Revenue Reconciliation</span>
                            </div>
                            <ChevronRight className="org-item-arrow" />
                          </div>

                          {/* Accounts Officer */}
                          <div 
                            className={`org-exec-officer-row finance-border interactive-node ${isHighlighted('ao', OFFICERS_DIRECTORY.ao.title, OFFICERS_DIRECTORY.ao.roleDesc) ? 'node-highlight' : ''}`}
                            onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.ao)}
                            title="Click to view statutory responsibilities"
                          >
                            <div className="org-exec-icon-box finance-bg">
                              <User className="icon-xs" />
                            </div>
                            <div className="org-exec-content">
                              <span className="org-exec-cadre-tag tag-purple">State Accounts Operations</span>
                              <h5 className="org-exec-title">Accounts Officer</h5>
                              <span className="org-exec-desc">Treasury Challan &amp; Bank Guarantees</span>
                            </div>
                            <ChevronRight className="org-item-arrow" />
                          </div>

                          {/* Chemical Examination Lab */}
                          <div 
                            className={`org-exec-officer-row finance-border interactive-node ${isHighlighted('chemical_lab', OFFICERS_DIRECTORY.chemical_lab.title, OFFICERS_DIRECTORY.chemical_lab.roleDesc) ? 'node-highlight' : ''}`}
                            onClick={() => setSelectedOfficer(OFFICERS_DIRECTORY.chemical_lab)}
                            title="Click to view statutory responsibilities"
                          >
                            <div className="org-exec-icon-box finance-bg">
                              <Beaker className="icon-xs" />
                            </div>
                            <div className="org-exec-content">
                              <span className="org-exec-cadre-tag tag-purple">Government Chemical Analyst</span>
                              <h5 className="org-exec-title">Chemical Examination Lab</h5>
                              <span className="org-exec-desc">GC-MS Testing &amp; Contraband Forensics</span>
                            </div>
                            <ChevronRight className="org-item-arrow" />
                          </div>

                          {/* Statutory Fiscal & Lab Modules */}
                          <div className="org-capabilities-divider">
                            <div className="org-capabilities-divider-line" />
                            <span className="org-capabilities-divider-text">Statutory Mandate</span>
                            <div className="org-capabilities-divider-line" />
                          </div>

                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-purple-600" />
                            <span>Daily Treasury Duty Reconciliation (RBI/SBI)</span>
                          </div>
                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-purple-600" />
                            <span>Gas Chromatography-Mass Spectrometry (GC-MS)</span>
                          </div>
                          <div className="org-capability-item">
                            <CheckCircle2 className="org-cap-icon-tiny text-purple-600" />
                            <span>Licensee Bank Guarantee Custody &amp; Refunds</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Chart Structure Summary Legend */}
              <div className="org-chart-legend">
                <div className="org-legend-item">
                  <span className="org-legend-pill" style={{ backgroundColor: '#0a2351' }} />
                  <span>Apex Authority (IAS)</span>
                </div>
                <div className="org-legend-item">
                  <span className="org-legend-pill" style={{ backgroundColor: '#1e40af' }} />
                  <span>Senior Administration (DANICS)</span>
                </div>
                <div className="org-legend-item">
                  <span className="org-legend-pill" style={{ backgroundColor: '#047857' }} />
                  <span>IT &amp; Digital Infrastructure</span>
                </div>
                <div className="org-legend-item">
                  <span className="org-legend-pill" style={{ backgroundColor: '#0f766e' }} />
                  <span>Admin &amp; Hospitality</span>
                </div>
                <div className="org-legend-item">
                  <span className="org-legend-pill" style={{ backgroundColor: '#7e22ce' }} />
                  <span>Finance, Accounts &amp; Chemical Lab</span>
                </div>
                <div className="org-legend-item" style={{ color: '#0a2351', fontWeight: 800 }}>
                  <span>• 22 Sanctioned Key Statutory Offices</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /*                     INTERACTIVE TABULAR LIST VIEW                         */
          /* ========================================================================= */
          <div className="org-tabular-card">
            {/* Header info bar */}
            <div className="org-tabular-header">
              <h3 className="org-tabular-header-title">Department Hierarchy Levels &amp; Post Sanctions</h3>
              <p className="org-tabular-header-sub">
                Comprehensive statutory breakdown of gazetted officers and administrative wings under Delhi Excise Act, 2009.
              </p>
            </div>

            <div className="org-tabular-body">
              {/* Row 1: Commissioner */}
              <div className="org-tabular-row">
                <div className="org-tabular-row-top">
                  <span className="org-tabular-badge org-badge-level1">
                    Level 1 (Head of Department)
                  </span>
                  <span className="org-tabular-posts">1 Sanctioned IAS Post</span>
                </div>
                <div className="org-tabular-hod-flex">
                  <div className="org-tabular-hod-icon">
                    <Award className="icon-md text-amber-600" />
                  </div>
                  <div>
                    <h4 className="org-tabular-hod-name">Commissioner (IAS)</h4>
                    <p className="org-tabular-hod-desc">Overall head, statutory regulator and supreme administrative controller of excise regime &amp; luxury tax policies in NCT of Delhi.</p>
                  </div>
                </div>
              </div>

              {/* Row 2: Dy Commissioners */}
              <div className="org-tabular-row">
                <div className="org-tabular-row-top">
                  <span className="org-tabular-badge org-badge-level2">
                    Level 2 (Senior Administration)
                  </span>
                  <span className="org-tabular-posts">2 Sanctioned Senior DANICS Posts</span>
                </div>
                <div className="org-tabular-grid2">
                  <div className="org-tabular-subcard">
                    <p className="org-tabular-subcard-title">Dy. Commissioner - I</p>
                    <p className="org-tabular-subcard-desc">Supervises Joint Director (IT), Technical, ESCIMS Track &amp; Trace, Enforcement &amp; Policy Branches</p>
                  </div>
                  <div className="org-tabular-subcard">
                    <p className="org-tabular-subcard-title">Dy. Commissioner - II</p>
                    <p className="org-tabular-subcard-desc">Supervises Administration, Intelligence (EIB), Hospitality (HCR), Finance, Accounts &amp; Chemical Testing</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Assistant Commissioners */}
              <div className="org-tabular-row">
                <div className="org-tabular-row-top">
                  <span className="org-tabular-badge org-badge-level3">
                    Level 3 (Functional Branch Heads)
                  </span>
                  <span className="org-tabular-posts">17+ Specialized Functional Branches</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Category A */}
                  <div>
                    <h5 className="org-tabular-wing-title">Technical, IT &amp; Enforcement Wing (DC-I)</h5>
                    <div className="org-tabular-wing-grid">
                      {[
                        'Joint Director (IT)',
                        'Sr. Systems Analyst',
                        'Asst. Commissioner (ESCIMS)',
                        'Asst. Commissioner (Enforcement)',
                        'Asst. Commissioner (Permit)',
                        'Asst. Commissioner (IFML)',
                        'Asst. Commissioner (M&TP)',
                        'Asst. Commissioner (Policy)',
                        'Asst. Commissioner (Litigation)',
                      ].map((item, i) => (
                        <div key={i} className="org-tabular-item-pill">
                          <ChevronRight className="icon-tiny text-blue-500 flex-shrink-0" />
                          <span className="org-tabular-item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category B */}
                  <div>
                    <h5 className="org-tabular-wing-title">Admin, Intelligence &amp; Regulation Wing (DC-II)</h5>
                    <div className="org-tabular-wing-grid">
                      {[
                        'Asst. Commissioner Police (EIB)',
                        'Asst. Commissioner (Admin)',
                        'Asst. Commissioner (CTB)',
                        'Asst. Commissioner (HCR)',
                        'Asst. Commissioner (Confiscation)',
                        'Asst. Commissioner (L-22, L-23 and L-30)',
                        'GM (Excise)',
                      ].map((item, i) => (
                        <div key={i} className="org-tabular-item-pill">
                          <ChevronRight className="icon-tiny text-teal-600 flex-shrink-0" />
                          <span className="org-tabular-item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category C */}
                  <div>
                    <h5 className="org-tabular-wing-title">Finance, Treasury &amp; Scientific Examination (DC-II)</h5>
                    <div className="org-tabular-wing-grid">
                      {[
                        'Dy Controller of Accounts',
                        'Accounts Officer',
                        'Chemical Examination Lab',
                      ].map((item, i) => (
                        <div key={i} className="org-tabular-item-pill">
                          <ChevronRight className="icon-tiny text-purple-600 flex-shrink-0" />
                          <span className="org-tabular-item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/*              OFFICER STATUTORY DETAIL INSPECTION MODAL                    */}
      {/* ========================================================================= */}
      {selectedOfficer && (
        <div className="org-modal-overlay" onClick={() => setSelectedOfficer(null)}>
          <div className="org-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="org-modal-header">
              <div className="org-modal-header-brand">
                <div className="org-modal-icon-box">
                  <Briefcase className="icon-md text-amber-400" />
                </div>
                <div>
                  <span className="org-modal-level-tag">{selectedOfficer.levelBadge}</span>
                  <h3 className="org-modal-title">{selectedOfficer.title}</h3>
                  <p className="org-modal-cadre">{selectedOfficer.cadre}</p>
                </div>
              </div>
              <button 
                type="button" 
                className="org-modal-close-btn"
                onClick={() => setSelectedOfficer(null)}
                title="Close Window"
              >
                <X className="icon-sm" />
              </button>
            </div>

            <div className="org-modal-body">
              {/* Hierarchy chain card */}
              <div className="org-modal-chain-card">
                <div className="org-chain-item">
                  <span className="org-chain-label">Directorate Wing:</span>
                  <span className="org-chain-val">{selectedOfficer.wingName}</span>
                </div>
                <div className="org-chain-item">
                  <span className="org-chain-label">Reports To:</span>
                  <span className="org-chain-val text-blue-700 font-bold">{selectedOfficer.reportsTo}</span>
                </div>
                <div className="org-chain-item">
                  <span className="org-chain-label">Supervises:</span>
                  <span className="org-chain-val">{selectedOfficer.supervises}</span>
                </div>
              </div>

              {/* Statutory Role Summary */}
              <div className="org-modal-section">
                <h4 className="org-modal-section-title">Core Statutory Mandate</h4>
                <p className="org-modal-desc">{selectedOfficer.roleDesc}</p>
              </div>

              {/* Key Handled Functions */}
              <div className="org-modal-section">
                <h4 className="org-modal-section-title">Key Operational Functions &amp; Powers</h4>
                <div className="org-modal-functions-list">
                  {selectedOfficer.keyFunctions.map((fn, idx) => (
                    <div key={idx} className="org-function-item">
                      <CheckCircle2 className="org-check-icon" />
                      <span>{fn}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="org-modal-footer">
                <span className="org-modal-footer-notice">
                  Regulated under Delhi Excise Act 2009 &amp; Delhi Excise Rules 2010.
                </span>
                <button 
                  type="button" 
                  className="org-modal-done-btn"
                  onClick={() => setSelectedOfficer(null)}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationalStructure;
