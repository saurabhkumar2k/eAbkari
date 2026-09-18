import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Shield,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Building2,
  Layers,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IndianRupee,
  Clock,
  Sparkles,
  Server,
  FileCheck,
  FileSpreadsheet,
  BadgeAlert,
  Scale,
  Eye,
  Download
} from 'lucide-react';

// Subject Areas data based on official Excise branches & e-Abkari workflows
const RTI_SUBJECT_AREAS = [
  {
    id: 'licensing',
    title: 'LICENSING',
    branch: 'Licensing Branch (Wholesale / Retail / HCR)',
    icon: FileCheck,
    iconColor: '#0284c7',
    iconBg: '#f0f9ff',
    iconBorder: '#e0f2fe',
    summary: 'Records relating to Excise licences',
    description:
      'Information concerning applications, grant procedures, renewal protocols, and compliance status for various excise licenses administered under the Delhi Excise Act, 2009.',
    sampleRecords: [
      'L-1 / L-1F Wholesale licensing procedures & registers',
      'Retail vends (L-6, L-7, L-8, L-9, L-10) records',
      'Hotel, Club & Restaurant (HCR / L-15 to L-21) permits',
      'Microbrewery (L-11) and craft brewery conditions',
      'Sanctioned location lists and approved vend registers'
    ]
  },
  {
    id: 'permits',
    title: 'PERMITS',
    branch: 'Permit & Pass Cell',
    icon: Layers,
    iconColor: '#0d9488',
    iconBg: '#f0fdfa',
    iconBorder: '#ccfbf1',
    summary: 'Information concerning applicable permit processes',
    description:
      'Procedures, criteria, and documentation regarding transit, import, export, and special event permits issued by the Department under the Delhi Excise Rules, 2010.',
    sampleRecords: [
      'Import Permits for Bulk Spirit & Packaged Foreign Liquor (FL)',
      'Transport Permits (TP) & Export Passes (EP) verification',
      'Temporary P-10 liquor serving permits for social events & parties',
      'Permit fees, processing timelines, and clearance logs'
    ]
  },
  {
    id: 'department-records',
    title: 'DEPARTMENT RECORDS',
    branch: 'General Administration & Establishment Branch',
    icon: Building2,
    iconColor: '#4f46e5',
    iconBg: '#eef2ff',
    iconBorder: '#e0e7ff',
    summary: 'Records held by relevant branches',
    description:
      'Statutory administrative records, cadre deployment, sanctioned strength, public notices, and administrative governance records maintained across departmental offices.',
    sampleRecords: [
      'Sanctioned staff strength & establishment details',
      'Tender notices, procurement files & work orders',
      'Administrative rosters and public citizen charters',
      'Disposal files, public grievance resolution registers'
    ]
  },
  {
    id: 'orders-circulars',
    title: 'ORDERS / CIRCULARS',
    branch: 'Policy & Legal Cell',
    icon: FileText,
    iconColor: '#ea580c',
    iconBg: '#fff7ed',
    iconBorder: '#ffedd5',
    summary: 'Departmental orders, notifications and circulars',
    description:
      'Comprehensive public repositories of official gazette notifications, statutory directives, annual excise policy circulars, and departmental compliance orders.',
    sampleRecords: [
      'Annual Excise Policy notifications and guidelines',
      'Dry days schedules and national holiday closures',
      'Bar timing regulations, MRP directives, and public notices',
      'Statutory amendments to Delhi Excise Rules, 2010'
    ]
  },
  {
    id: 'accounts',
    title: 'ACCOUNTS',
    branch: 'Accounts & Audit Branch',
    icon: IndianRupee,
    iconColor: '#059669',
    iconBg: '#ecfdf5',
    iconBorder: '#d1fae5',
    summary: 'Information relating to Accounts Branch',
    description:
      'Fiscal records concerning excise revenue receipts, license fee collections, duty deposits, bank challans, and audited state exchequer contributions.',
    sampleRecords: [
      'Excise duty collection aggregates and revenue statements',
      'License fee schedules, assessment norms & tender deposits',
      'Treasury deposit challans and payment reconciliation',
      'Internal audit compliance summaries & audit observations'
    ]
  },
  {
    id: 'eib',
    title: 'EIB',
    branch: 'Excise Intelligence Bureau (Enforcement)',
    icon: Shield,
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    iconBorder: '#fee2e2',
    summary: 'Information held by the concerned EIB branch',
    description:
      'Records maintained by the enforcement wing regarding enforcement inspections, seizure statistics, confiscation orders, and regulatory vigilance (subject to statutory exemptions).',
    sampleRecords: [
      'Statistical reports of illicit liquor seizures in NCT of Delhi',
      'Confiscated vehicle auction notifications and outcomes',
      'Routine inspection protocols for licensed premises',
      'Disposed departmental inquiry records not exempted under Sec 8'
    ]
  },
  {
    id: 'computer-eabkari',
    title: 'COMPUTER / E-ABKARI',
    branch: 'Computer / Information Technology Branch',
    icon: Server,
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
    iconBorder: '#ede9fe',
    summary: 'Information held by the Computer Branch',
    description:
      'Information concerning the e-Abkari digital platform, ESCIMS (Excise Supply Chain Information Management System), 2D barcode track & trace systems, and portal uptime.',
    sampleRecords: [
      'e-Abkari single-window portal technical architecture & workflows',
      'Track and Trace (ESCIMS) QR/barcode security parameters',
      'Portal uptime statistics, system integration guidelines',
      'Digital service level agreement (SLA) monitoring reports'
    ]
  }
];

export default function RightToInformation({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'subjects' | 'process' | 'authorities'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Filter subject areas based on search query
  const filteredSubjectAreas = useMemo(() => {
    if (!searchQuery.trim()) return RTI_SUBJECT_AREAS;
    const q = searchQuery.toLowerCase();
    return RTI_SUBJECT_AREAS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.branch.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.sampleRecords.some((rec) => rec.toLowerCase().includes(q))
    );
  }, [searchQuery]);


  return (
    <div className="rti-page-wrapper">
      {/* 1. Top Breadcrumb & Statutory Status Bar */}
      <div className="rti-breadcrumb-bar">
        <div className="rti-container">
          <div className="rti-breadcrumb-inner">
            <div className="rti-breadcrumb-nav">
              <button
                type="button"
                onClick={onNavigateHome ? onNavigateHome : () => (window.location.href = '/')}
                className="rti-breadcrumb-btn"
              >
                <Home className="icon-xs" />
                <span>Home</span>
              </button>
              <ChevronRight className="rti-breadcrumb-separator" />
              <span className="rti-breadcrumb-crumb">Public Transparency</span>
              <ChevronRight className="rti-breadcrumb-separator" />
              <span className="rti-breadcrumb-active">Right to Information (RTI)</span>
            </div>

            <div className="rti-breadcrumb-status-group">
              <div className="rti-status-pill">
                <span className="rti-pulse-dot" />
                <span>RTI Act, 2005 • Central Act No. 22 of 2005</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Hero Banner */}
      <section className="rti-hero-section">
        <div className="rti-container">
          <div className="rti-hero-content">
            <div className="rti-badges-row">
              <span className="rti-badge-solid">
                <Sparkles className="icon-xs" />
                Statutory Transparency Portal
              </span>
              <span className="rti-badge-outline">
                Public Authority Under Section 2(h)
              </span>
              <span className="rti-badge-outline">
                GNCTD Single-Window Governance
              </span>
            </div>

            <h1 className="rti-hero-title">
              RIGHT TO INFORMATION (RTI)
            </h1>
            <p className="rti-hero-subtitle">
              Department of Excise, Entertainment &amp; Luxury Tax, GNCTD
            </p>

            {/* Official Motto Quote Box as specified */}
            <div className="rti-hero-quote-box">
              <p className="rti-hero-quote">
                &ldquo;Promoting transparency, accountability and citizens&apos; access to information under the Right to Information Act, 2005.&rdquo;
              </p>
              <p className="rti-hero-desc">
                The Department states that RTI covers access to information held by or under the control of a public authority, including inspection of work/documents/records and obtaining extracts or copies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive KPI & Metrics Strip */}
      <div className="rti-stats-section">
        <div className="rti-container">
          <div className="rti-stats-grid">
            <div className="rti-stat-card">
              <div className="rti-stat-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                <Clock className="icon-md" />
              </div>
              <div className="rti-stat-info">
                {/* <span className="rti-stat-value">30</span> */}
                <span className="rti-stat-label">Statutory Time Limit</span>
                <span className="rti-stat-sub">48 hrs for life &amp; liberty</span>
              </div>
            </div>

            <div className="rti-stat-card">
              <div className="rti-stat-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <Layers className="icon-md" />
              </div>
              <div className="rti-stat-info">
                {/* <span className="rti-stat-value">₹10 /-</span>
                <span className="rti-stat-label">Application Fee</span>
                <span className="rti-stat-sub">BPL applicants exempt</span> */}
              </div>
            </div>

            <div className="rti-stat-card">
              <div className="rti-stat-icon-box" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                <Layers className="icon-md" />
              </div>
              <div className="rti-stat-info">
                <span className="rti-stat-value">7 Branches</span>
                <span className="rti-stat-label">Subject Areas</span>
                <span className="rti-stat-sub">Licensing, Permits, Accounts &amp; EIB</span>
              </div>
            </div>

            <div className="rti-stat-card">
              <div className="rti-stat-icon-box" style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                <Server className="icon-md" />
              </div>
              <div className="rti-stat-info">
                <span className="rti-stat-value">100% Online</span>
                <span className="rti-stat-label">Delhi RTI Portal</span>
                <span className="rti-stat-sub">rtionline.delhigovt.nic.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Navigation Tabs */}
      <div className="rti-container">
        <div className="rti-tabs-container">
          <div className="rti-tabs-bar">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`rti-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <Info className="icon-xs" />
              <span>About the RTI Act, 2005</span>
              <span className="rti-tab-badge">Legal Scope</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('subjects')}
              className={`rti-tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            >
              <FileSpreadsheet className="icon-xs" />
              <span>What Information Can Be Requested?</span>
              <span className="rti-tab-badge">7 Subject Areas</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ABOUT THE RTI ACT, 2005 (Requirement 2)                           */}
        {activeTab === 'overview' && (
          <div>
            <div className="rti-card">
              <div className="rti-card-header">
                <h2 className="rti-card-header-title">
                  <Shield className="icon-sm icon-amber" />
                  <span>Your Right to Information</span>
                </h2>
               </div>

              <div className="rti-card-body">
                <div className="rti-overview-lead-container">
                  <p className="rti-overview-lead">
                    The Right to Information Act, 2005 enables citizens to seek information from public authorities and is intended to promote transparency and accountability in government functioning.
                  </p>
                  <p className="rti-overview-body">
                    Under RTI, citizens may seek access to departmental records and documents, inspect relevant records/work, and obtain extracts or copies of information held by the public authority. The Department of Excise, Entertainment &amp; Luxury Tax, Government of NCT of Delhi is a statutory public authority bound to provide information held by it or under its administrative control, subject to the lawful exemptions stipulated under the Act.
                  </p>
                </div>

                {/* Scope Grid: What is "Information" vs "Right to Information" */}
                <div className="rti-scope-grid">
                  {/* Definition of Information */}
                  <div className="rti-scope-box">
                    <div className="rti-scope-header">
                      <div className="rti-scope-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                        <FileText className="icon-sm" />
                      </div>
                      <h3 className="rti-scope-title">Definition of &ldquo;Information&rdquo; [Sec 2(f)]</h3>
                    </div>
                    <p className="rti-scope-desc">
                      Any material in any form held by or under the control of the Department of Excise, GNCTD:
                    </p>
                    <ul className="rti-scope-list">
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span>Departmental records, documents, memos, emails &amp; official correspondence</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span>Opinions, official advices, press releases, circulars, and departmental orders</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span>Logbooks, contracts, statutory reports, papers, samples, and physical models</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span>Data material held in electronic form (e-Abkari databases, server logs, reports)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Citizen's Right */}
                  <div className="rti-scope-box">
                    <div className="rti-scope-header">
                      <div className="rti-scope-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                        <Eye className="icon-sm" />
                      </div>
                      <h3 className="rti-scope-title">Citizen&apos;s Rights Under RTI [Sec 2(j)]</h3>
                    </div>
                    <p className="rti-scope-desc">
                      The right to access information accessible under the Act which is held by the Department:
                    </p>
                    <ul className="rti-scope-list">
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span><strong>Inspection of work, documents, and records:</strong> Citizens can physically inspect non-exempt departmental files</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span><strong>Taking notes &amp; extracts:</strong> Taking handwritten notes or extracts from approved departmental registers</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span><strong>Certified true copies:</strong> Obtaining certified copies of documents, orders, notifications, or challans</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span><strong>Certified samples of material:</strong> Obtaining certified samples where authorized by the statutory framework</span>
                      </li>
                      <li className="rti-scope-list-item">
                        <CheckCircle2 className="rti-scope-bullet-icon" />
                        <span><strong>Electronic modes:</strong> Obtaining information in diskettes, USB drives, printouts, or email transcripts</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Statutory Proactive Disclosure Box */}
                <div className="rti-disclosure-box">
                  <div className="rti-disclosure-icon-box">
                    <Scale className="rti-disclosure-icon" />
                  </div>
                  <div className="rti-disclosure-content">
                    <h4 className="rti-disclosure-title">
                      Proactive Disclosures (Suo-Motu Disclosures under Section 4(1)(b))
                    </h4>
                    <p className="rti-disclosure-text">
                      To ensure maximum transparency without requiring individual applications, the Department of Excise publishes manuals, lists of licensed vends, acts &amp; rules, circulars, organizational directories, and budget allocations on the official departmental portal and e-Abkari portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WHAT INFORMATION CAN BE REQUESTED? (Requirement 3)                 */}
        {/* ========================================================================= */}
        {activeTab === 'subjects' && (
          <div>
            <div className="rti-card">
              <div className="rti-card-header">
                <div>
                  <h2 className="rti-card-header-title">
                    <FileSpreadsheet className="icon-sm icon-amber" />
                    <span>What Information Can Be Requested?</span>
                  </h2>
                  <p className="rti-card-header-sub">
                    Especially useful for e-Abkari portal users, licensees, applicants, and general citizens
                  </p>
                </div>
                <span className="rti-card-header-badge">
                  {filteredSubjectAreas.length} Subject Areas Available
                </span>
              </div>

              <div className="rti-card-body">
                {/* Search & Filter Toolbar */}
                <div className="rti-subject-toolbar">
                  <div className="rti-search-box">
                    <Search className="rti-search-icon" />
                    <input
                      type="text"
                      placeholder="Search subject areas (e.g., licensing, permit, accounts, eib)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rti-search-input"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="rti-search-clear"
                        title="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="rti-search-count">
                    Showing {filteredSubjectAreas.length} of {RTI_SUBJECT_AREAS.length} categorized areas
                  </div>
                </div>

                {/* Subject Areas Grid */}
                <div className="rti-subjects-grid">
                  {filteredSubjectAreas.map((subject) => {
                    const IconComponent = subject.icon;
                    return (
                      <div key={subject.id} className="rti-subject-card">
                        <div className="rti-subject-card-top">
                          <div
                            className="rti-subject-icon-box"
                            style={{
                              backgroundColor: subject.iconBg,
                              color: subject.iconColor,
                              border: `1px solid ${subject.iconBorder}`
                            }}
                          >
                            <IconComponent className="rti-subject-icon" />
                          </div>
                          <span className="rti-subject-branch-tag">{subject.branch}</span>
                        </div>

                        <h3 className="rti-subject-title">{subject.title}</h3>
                        <p className="rti-subject-summary">{subject.summary}</p>
                        <p className="rti-subject-desc">{subject.description}</p>

                        <div className="rti-subject-records-footer">
                          <div className="rti-subject-records-title">
                            <FileCheck className="rti-subject-records-icon" />
                            <span>Indicative Records in this Branch:</span>
                          </div>
                          <div className="rti-subject-pills">
                            {subject.sampleRecords.map((rec, i) => (
                              <span key={i} className="rti-record-pill">
                                {rec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* STATUTORY CAVEAT / DISCLAIMER AS STRICTLY MANDATED */}
                <div className="rti-caveat-box">
                  <div className="rti-caveat-icon-box">
                    <AlertTriangle className="icon-sm" />
                  </div>
                  <div className="rti-caveat-content">
                    <h4 className="rti-caveat-title">
                      Important Statutory Notice on Subject Areas &amp; Disclosure
                    </h4>
                    <p className="rti-caveat-text">
                      The above listings are presented as <strong>examples of subject areas</strong> administered by the Department of Excise, Entertainment &amp; Luxury Tax, GNCTD. <strong>They do not constitute a promise or legal guarantee that every requested record must be disclosed.</strong>
                    </p>
                    <p className="rti-caveat-text">
                      Statutory exemptions under <strong>Sections 8 and 9 of the Right to Information Act, 2005</strong> apply. Information such as commercial confidence, trade secrets, ongoing law enforcement investigation records by the Excise Intelligence Bureau where disclosure would impede apprehension or prosecution, cabinet papers prior to decision, and third-party personal information without substantiated public interest are legally exempt from disclosure.
                    </p>
                    <div className="rti-caveat-badges">
                      <span className="rti-exemption-badge">Section 8(1)(d) - Commercial Confidence &amp; Trade Secrets</span>
                      <span className="rti-exemption-badge">Section 8(1)(h) - Ongoing Law Enforcement / EIB Inquiries</span>
                      <span className="rti-exemption-badge">Section 8(1)(j) - Personal Privacy Protection</span>
                      <span className="rti-exemption-badge">Section 10 - Severability Clause Applicable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      {/* ========================================================================= */}
      {/* APPLICATION TEMPLATE MODAL                                                */}
      {/* ========================================================================= */}
      {showApplicationModal && (
        <div className="rti-modal-backdrop">
          <div className="rti-modal-dialog">
            {/* Modal Header */}
            <div className="rti-modal-header">
              <div className="rti-modal-title-wrap">
                <FileText className="icon-sm icon-amber" />
                <h3 className="rti-modal-title">
                  Sample Form of RTI Application (Sec 6(1))
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowApplicationModal(false)}
                className="rti-modal-close-btn"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

           

            {/* Modal Footer */}
            <div className="rti-modal-footer">
              <p className="rti-modal-footer-note">
                Print or copy this draft for physical submission with ₹10 IPO.
              </p>
              <div className="rti-modal-actions">
                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="rti-modal-btn rti-modal-btn-copy"
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="icon-xs" style={{ color: '#047857' }} />
                      <span className="rti-text-copied">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="icon-xs" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="rti-modal-btn rti-modal-btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
