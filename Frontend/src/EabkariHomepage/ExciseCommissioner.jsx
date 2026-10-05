import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Phone, 
  Mail, 
  Printer, 
  Copy, 
  Check, 
  Shield, 
  Scale, 
  Award, 
  Building2, 
  MapPin, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  FileText, 
  BadgeCheck, 
  Briefcase, 
  Landmark, 
  Cpu, 
  Gavel, 
  TrendingUp, 
  Info,
  Calendar,
  Share2
} from 'lucide-react';

const ExciseCommissioner = ({ onNavigateHome }) => {
  const [copied, setCopied] = useState(false);

  // Official verified details from Delhi Excise Department
  const HOD_DATA = {
    title: "HEAD OF DEPARTMENT",
    name: "Shri Ravi Jha, IAS",
    cadre: "Indian Administrative Service (IAS)",
    designation: "Commissioner of Excise / Head of Department",
    department: "Department of Excise, Entertainment & Luxury Tax",
    government: "Government of National Capital Territory of Delhi",
    address: {
      line1: "L & N Block, Vikas Bhawan",
      line2: "I.P. Estate, New Delhi – 110002"
    },
    contact: {
      phone: "011-23378088",
      fax: "011-23370220",
      email: "cexcise@nic.in"
    },
    tenure: {
      fromDate: "15/07/2024",
      toDate: "Serving (Current)",
      status: "Active"
    },
    lastUpdated: "13 August 2026",
    officialSourceUrl: "https://excise.delhi.gov.in/excise/contact-us"
  };

  // Statutory Responsibilities grounded in Delhi Excise Act, 2009
  const KEY_RESPONSIBILITIES = [
    {
      id: "licensing",
      title: "Licensing & Regulation",
      actRef: "Chapters IV & V • Rules 2010",
      colorClass: "blue",
      icon: Shield,
      summary: "Grant, renewal, amendment, and regulation of statutory licenses across wholesale, retail, hospitality (HCR), and industrial/medicinal categories.",
      duties: [
        "Administering wholesale supply vends (L-1/L-1F) and bonded storage warehouses.",
        "Sanctioning hotel, club, and restaurant (HCR) on-premise service privileges.",
        "Overseeing retail liquor distribution through state public sector corporations."
      ]
    },
    {
      id: "revenue",
      title: "Revenue Protection",
      actRef: "Chapter VI • Sections 26-32",
      colorClass: "amber",
      icon: TrendingUp,
      summary: "Safeguarding and maximizing legitimate state excise revenue collection (exceeding ₹5,000+ Crore annually) for NCT of Delhi.",
      duties: [
        "Assessment and recovery of state excise duties, import/export pass fees, and permit fees.",
        "Daily reconciliation with the Principal Accounts Office (PAO) and State Treasury.",
        "Prevention of tax evasion through rigorous chemical spirit volume metering."
      ]
    },
    {
      id: "enforcement",
      title: "Enforcement & Compliance",
      actRef: "Chapters VII & VIII • Penalties",
      colorClass: "red",
      icon: Scale,
      summary: "Directing the Excise Intelligence Bureau (EIB) and armed enforcement squads in anti-bootlegging and border interception drives.",
      duties: [
        "Combating interstate liquor smuggling and illicit non-duty paid spirits.",
        "Cracking down on adulterated liquor and unauthorized micro-distillation.",
        "Ordering seizure, impounding of conveyances, and criminal prosecutions under the Act."
      ]
    },
    {
      id: "egovernance",
      title: "E-Governance Modernization",
      actRef: "Digital India • e-Abkari Portal",
      colorClass: "cyan",
      icon: Cpu,
      summary: "Spearheading 100% paperless e-Abkari digital processing, ESCIMS track-and-trace barcodes, and transparent citizen services.",
      duties: [
        "Mandatory 2D QR serialization tracking every bottle from distillery to consumer point-of-sale.",
        "Faceless online license application filing, electronic renewals, and biometric verification.",
        "Real-time supply chain analytics and inventory monitoring across NCT of Delhi."
      ]
    },
    {
      id: "administration",
      title: "Excise Administration",
      actRef: "Section 3 & 4 • Apex HOD",
      colorClass: "emerald",
      icon: Building2,
      summary: "Apex administrative leadership governing departmental establishment, cadre allocations, and inter-agency state coordination.",
      duties: [
        "Controlling the departmental cadre of Deputy Commissioners, Assistant Commissioners, and Inspectors.",
        "Administration of the State Chemical Testing Laboratory for potability certification.",
        "Formulating statutory circulars, gazette orders, and public advisory notices."
      ]
    },
    {
      id: "oversight",
      title: "Regulatory Oversight & Appeals",
      actRef: "Section 72 • Appellate Forum",
      colorClass: "purple",
      icon: Gavel,
      summary: "Chief controlling authority and apex appellate forum for hearing statutory appeals and revision petitions under the Delhi Excise Act.",
      duties: [
        "Adjudicating appeals against licensing cancellation and suspension orders.",
        "Deciding revision petitions regarding confiscated vehicles and seized properties.",
        "Ensuring constitutional fairness and adherence to principles of natural justice."
      ]
    }
  ];

  const handleCopyContact = () => {
    const textToCopy = `Head of Department: ${HOD_DATA.name}\n${HOD_DATA.designation}\n${HOD_DATA.department}\n${HOD_DATA.government}\nAddress: ${HOD_DATA.address.line1}, ${HOD_DATA.address.line2}\nPhone: ${HOD_DATA.contact.phone}\nFax: ${HOD_DATA.contact.fax}\nEmail: ${HOD_DATA.contact.email}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="hod-wrapper">
      
      {/* 1. Top Operational Bar & Breadcrumb */}
      <div className="hod-breadcrumb-bar">
        <div className="hod-container">
          <div className="hod-breadcrumb-inner">
            <div className="hod-breadcrumb-nav">
              <button 
                onClick={onNavigateHome}
                className="hod-breadcrumb-btn"
                title="Back to e-Abkari Home"
              >
                <Home className="w-3.5 h-3.5 text-slate-500" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>About Us</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="hod-breadcrumb-active">Head of Department</span>
            </div>
            
            <div className="hod-status-pill">
              <span className="hod-pulse-dot"></span>
              <span>Delhi Excise Act, 2009 • Statutory Apex Authority</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Hero Banner */}
      <section className="hod-hero-section">
        <div className="hod-container">
          <div className="hod-hero-content">
            <div className="hod-badges-row">
              <span className="hod-badge-solid">
                Apex Leadership
              </span>
              <span className="hod-badge-outline">
                Government of NCT of Delhi
              </span>
              <span className="hod-badge-outline">
                Chief Controlling Authority
              </span>
            </div>

            <h1 className="hod-hero-title">
              Head of Department
            </h1>
            <p className="hod-hero-subtitle">
              Office of the Excise Commissioner • Department of Excise, Entertainment &amp; Luxury Tax
            </p>
            <p className="hod-hero-desc">
              The Excise Commissioner is the chief controlling authority for matters connected with the administration of the Delhi Excise Act, 2009. Leading state excise regulation, revenue mobilization, anti-illicit enforcement, and 100% paperless e-Abkari digital governance for the National Capital Territory of Delhi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Profile Card + Responsibilities Panel */}
      <div className="hod-container hod-main-section">
        
        {/* ========================================================
            A. MASTER PROFILE CARD
            ======================================================== */}
        <div className="hod-profile-card">
          <div className="hod-card-header-bar">
            <h2 className="hod-card-header-title">
              <Award className="w-4 h-4 text-amber-400" />
              <span>HEAD OF DEPARTMENT (HOD) PROFILE</span>
            </h2>
            <span className="hod-card-header-badge">
              Active Incumbent • IAS AGMUT Cadre
            </span>
          </div>

          <div className="hod-profile-body">
            <div className="hod-profile-grid">
              
              {/* Officer Portrait & Insignia Frame */}
              <div className="hod-portrait-column">
                <div className="hod-portrait-frame">
                  <div className="hod-portrait-crest">
                    <span className="hod-portrait-initials">RJ</span>
                  </div>
                  <div className="hod-portrait-title">Excise Commissioner</div>
                  <div className="hod-portrait-caption">Government of NCT of Delhi</div>
                  <div className="hod-portrait-tag">
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Apex Executive</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium">
                  Official Secretariat Desk
                </div>
              </div>

              {/* Officer Details & Contact Grid */}
              <div className="hod-details-column">
                <div className="hod-name-row">
                  <h3 className="hod-officer-name">
                    {HOD_DATA.name}
                    <span className="hod-cadre-tag">
                      IAS
                    </span>
                  </h3>
                </div>

                <div className="hod-officer-designation">
                  {HOD_DATA.designation}
                </div>

                <div className="hod-department-name">
                  {HOD_DATA.department}
                </div>

                <div className="hod-government-name">
                  {HOD_DATA.government}
                </div>

                {/* Direct Contact Info Grid */}
                <div className="hod-contact-grid">
                  
                  {/* Phone */}
                  <div className="hod-contact-box">
                    <div className="hod-contact-icon phone">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="hod-contact-label">Telephone (Office)</div>
                      <div className="hod-contact-value">
                        <a href={`tel:${HOD_DATA.contact.phone}`} className="hod-contact-link">
                          {HOD_DATA.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="hod-contact-box">
                    <div className="hod-contact-icon location">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="hod-contact-label">Telefax</div>
                      <div className="hod-contact-value">
                        <span>{HOD_DATA.contact.fax}</span>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="hod-contact-box">
                    <div className="hod-contact-icon email">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="hod-contact-label">Official Email</div>
                      <div className="hod-contact-value">
                        <a href={`mailto:${HOD_DATA.contact.email}`} className="hod-contact-link">
                          {HOD_DATA.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="hod-contact-box" style={{ gridColumn: 'span 1' }}>
                    <div className="hod-contact-icon location">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="hod-contact-label">Department Address</div>
                      <div className="hod-contact-value text-xs font-semibold leading-relaxed">
                        {HOD_DATA.address.line1}, {HOD_DATA.address.line2}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Bar */}
                <div className="hod-action-bar">
                  <div className="hod-quick-links">
                    <button 
                      onClick={() => window.location.href = '/organizational-structure'}
                      className="hod-action-btn"
                    >
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Organizational Hierarchy</span>
                    </button>
                    <button 
                      onClick={() => window.location.href = '/staff'}
                      className="hod-action-btn"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                      <span>Staff Cadre Registry</span>
                    </button>
                    <button 
                      onClick={() => window.location.href = '/licenses-administered'}
                      className="hod-action-btn"
                    >
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Licenses Administered</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            B. ROLE OF THE EXCISE COMMISSIONER SECTION
            ======================================================== */}
        <div className="hod-role-quote-card">
          <div className="hod-role-quote-header">
            <BadgeCheck className="w-5 h-5 text-sky-600" />
            <h3 className="hod-role-quote-title">
              Role of the Excise Commissioner
            </h3>
            <span className="hod-role-quote-badge">
              Statutory Mandate
            </span>
          </div>

          <p className="hod-role-quote-text">
            “The Excise Commissioner is the chief controlling authority for matters connected with the administration of the Delhi Excise Act, 2009. The role includes regulation and monitoring of the manufacture, possession, import, export, transport, sale and consumption of liquor and other intoxicants, protection of excise revenue, prevention of illegal trade and illicit distillation, and implementation of e-governance in excise administration.”
          </p>

          <div className="hod-role-quote-ref">
            <Scale className="w-4 h-4 text-slate-500" />
            <span>Statutory Source: Delhi Excise Act, 2009 (Sections 3 &amp; 4) • Delhi Excise Rules, 2010</span>
          </div>
        </div>

        {/* ========================================================
            C. KEY RESPONSIBILITIES PANEL (BENTO GRID)
            ======================================================== */}
        <div className="hod-section-header">
          <div className="hod-section-title-wrap">
            <div className="hod-section-icon-box">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="hod-section-title">
                Key Statutory Responsibilities
              </h3>
              <p className="hod-section-subtitle">
                Institutional mandates grounded in the provisions of the Delhi Excise Act, 2009
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>6 Core Operational Pillars</span>
          </div>
        </div>

        <div className="hod-resp-grid">
          {KEY_RESPONSIBILITIES.map((resp) => {
            const Icon = resp.icon;
            return (
              <div key={resp.id} className="hod-resp-card">
                <div className="hod-resp-card-top">
                  <div className={`hod-resp-icon-box ${resp.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="hod-resp-act-badge">
                    {resp.actRef}
                  </span>
                </div>

                <h4 className="hod-resp-title">
                  {resp.title}
                </h4>

                <p className="hod-resp-desc">
                  {resp.summary}
                </p>

                <ul className="hod-resp-bullets">
                  {resp.duties.map((duty, idx) => (
                    <li key={idx} className="hod-resp-bullet-item">
                      <Check className="w-3.5 h-3.5 hod-bullet-check" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            D. OFFICIAL INCUMBENCY RECORD TABLE
            ======================================================== */}
        <div className="hod-section-header">
          <div className="hod-section-title-wrap">
            <div className="hod-section-icon-box">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="hod-section-title">
                Incumbency &amp; Tenure Record
              </h3>
              <p className="hod-section-subtitle">
                Official tenure log for the post of Commissioner (Excise), GNCTD
              </p>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 font-medium">
            Cadre Post: AGMUT Cadre (IAS)
          </div>
        </div>

        <div className="hod-incumbency-card">
          <div className="overflow-x-auto">
            <table className="hod-incumbency-table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>SI No.</th>
                  <th>Excise Commissioner Name</th>
                  <th>Cadre &amp; Designation</th>
                  <th style={{ width: '150px', textAlign: 'center' }}>From Date</th>
                  <th style={{ width: '150px', textAlign: 'center' }}>To Date</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hod-incumbency-row">
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>01</td>
                  <td style={{ fontWeight: 800, color: '#012a52' }}>
                    {HOD_DATA.name}
                  </td>
                  <td>
                    <span className="font-semibold">{HOD_DATA.designation}</span>
                    <div className="text-xs text-slate-500">{HOD_DATA.cadre}</div>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>
                    {HOD_DATA.tenure.fromDate}
                  </td>
                  <td style={{ textAlign: 'center', color: '#64748b' }}>
                    {HOD_DATA.tenure.toDate}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="hod-active-tag">
                      <span className="hod-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                      Serving
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================
            E. LAST UPDATED & OFFICIAL SOURCE VERIFICATION BAR
            ======================================================== */}
        <div className="hod-last-updated-bar">
          <div className="hod-update-meta">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>
              Last Updated: <strong className="hod-update-date">{HOD_DATA.lastUpdated}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span>
              Maintained from official Department directory:
            </span>
            <a 
              href={HOD_DATA.officialSourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hod-source-link"
            >
              <span>excise.delhi.gov.in/excise/contact-us</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Government of NCT of Delhi • e-Abkari Portal
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExciseCommissioner;
