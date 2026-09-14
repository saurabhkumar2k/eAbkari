import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Printer,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Users,
  Briefcase,
  Shield,
  Scale,
  Award,
  Landmark,
  Building,
  MapPin,
  Clock,
  Layers,
  FileText,
  BadgeCheck,
  TrendingUp,
  X,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

// Import official headquarters photo for right hero card
import hqImage from '../Style/Image/hqImage.jpg';


// Master Statutory Cadre Registry for Department of Excise, Entertainment & Luxury Tax, GNCTD
const CADRE_REGISTRY = [
  {
    id: 'ec_ias',
    sr: 1,
    name: 'Excise Commissioner',
    cadreType: 'IAS',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 14 (Apex Executive)',
    sanctioned: 1,
    filled: 1,
    vacant: 0,
    status: 'full',
    authority: 'Ministry of Home Affairs / GNCTD',
    recruitmentMode: 'Cadre Allocation / Deputation from AGMUT Cadre (MHA)',
    statutoryRole: 'Head of Department (HOD) and Apex Statutory Appellate Authority under Delhi Excise Act, 2009.',
    duties: [
      'Overall administrative control of Excise, Entertainment & Luxury Tax Department across NCT of Delhi.',
      'Statutory appellate jurisdiction over orders passed by Deputy Commissioners & Licensing authorities.',
      'Supervises ₹5,000+ Crore annual state excise revenue collection and statutory PAO reconciliation.',
      'Formulation of state excise policy, retail quotas, and inter-state distillery bilateral pacts.'
    ],
    jurisdiction: 'Headquarters • Vikas Bhawan Secretariat (NCT of Delhi)'
  },
  {
    id: 'addl_ec_charge',
    sr: 2,
    name: 'Addl. Excise Commissioner (Addl. Charge)',
    cadreType: 'IAS',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 13 (Senior Administrative)',
    sanctioned: 0,
    filled: 1,
    vacant: 0,
    isExcess: true,
    status: 'excess',
    authority: 'GNCTD Services Department',
    recruitmentMode: 'Additional Charge assignment by Competent Authority',
    statutoryRole: 'Special administrative supervisor for fast-track statutory and inter-departmental affairs.',
    duties: [
      'Assisting Commissioner on multi-agency enforcement operations (Delhi Police & NCB coordination).',
      'High-level audit monitoring, public accounts committee (PAC) compliance.',
      'Strategic policy evaluation for supply-chain digitisation.'
    ],
    jurisdiction: 'Headquarters • Vikas Bhawan Secretariat'
  },
  {
    id: 'addl_ec_dept',
    sr: 3,
    name: 'Addl. Excise Commissioner',
    cadreType: 'Departmental',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 13 (Senior Administrative Grade)',
    sanctioned: 1,
    filled: 1,
    vacant: 0,
    status: 'full',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: 'Promotion through Departmental Promotion Committee (DPC) from Joint Commissioner rank',
    statutoryRole: 'Principal Departmental Executive overseeing wholesale, distillery, and statutory regulatory operations.',
    duties: [
      'Direct administration of wholesale bonded warehouses (BWH) and out-of-state distilleries.',
      'Statutory brand approvals, MRP fixation, and label registration verification under Rule 32.',
      'Administration of departmental inquiries and disciplinary proceedings.'
    ],
    jurisdiction: 'Headquarters • Vikas Bhawan Secretariat'
  },
  {
    id: 'jc_pcs',
    sr: 4,
    name: 'Joint Commissioner',
    subName: 'PCS / DANICS Stream',
    cadreType: 'PCS',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 12 (Junior Administrative Grade)',
    sanctioned: 1,
    filled: 0,
    vacant: 1,
    status: 'vacant',
    authority: 'DANICS / Services Dept',
    recruitmentMode: 'Deputation from Delhi, Andaman & Nicobar Islands Civil Service (DANICS)',
    statutoryRole: 'Direct supervision of state-wide armed enforcement, border intercept squads, and intelligence.',
    duties: [
      'Operational command of 24/7 Anti-Evasion squads and 21 inter-state border check-posts.',
      'Prosecution oversight for serious offenses under Section 33 and Section 38 (bootlegging & illicit spirit).',
      'Liaison with Central Narcotics Bureau and state border police forces.'
    ],
    jurisdiction: 'Headquarters & State Enforcement Wing'
  },
  {
    id: 'jc_dept',
    sr: 4,
    name: 'Joint Commissioner',
    subName: 'Departmental Stream',
    cadreType: 'Departmental',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 12 (Junior Administrative Grade)',
    sanctioned: 1,
    filled: 1,
    vacant: 0,
    status: 'full',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: 'Promotion through DPC from Deputy Commissioner rank',
    statutoryRole: 'Supervision of Hospitality (HCR), Chemical Laboratory, and luxury tax matters.',
    duties: [
      'Licensing regulation of Hotel, Club & Restaurant (HCR - L-15, L-16, L-17) licenses across Delhi.',
      'Central Chemical Testing Laboratory oversight to ensure zero toxicity in commercial spirits.',
      'Appeals scrutiny and statutory compound fee assessments.'
    ],
    jurisdiction: 'Headquarters • Vikas Bhawan Secretariat'
  },
  {
    id: 'dc_pcs',
    sr: 5,
    name: 'Deputy Commissioner Excise',
    subName: 'PCS / DANICS Stream',
    cadreType: 'PCS',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 11 (Senior Time Scale)',
    sanctioned: 1,
    filled: 0,
    vacant: 1,
    status: 'vacant',
    authority: 'DANICS / Services Dept',
    recruitmentMode: 'Deputation from DANICS pool',
    statutoryRole: 'Quasi-judicial district administration and confiscation proceedings.',
    duties: [
      'Adjudication of seized non-duty-paid liquor vehicles under Section 59 of Delhi Excise Act.',
      'Zonal administrative inspections and compounding of minor regulatory breaches.',
      'Supervision of district intelligence reports.'
    ],
    jurisdiction: 'Zonal Administration & Quasi-Judicial Courts'
  },
  {
    id: 'dc_dept',
    sr: 5,
    name: 'Deputy Commissioner Excise',
    subName: 'Departmental Stream',
    cadreType: 'Departmental',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 11 (Senior Time Scale)',
    sanctioned: 3,
    filled: 3,
    vacant: 0,
    status: 'full',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: 'Promotion through DPC from Assistant Commissioner rank',
    statutoryRole: 'Key functional pillars: ESCIMS IT infrastructure, Policy & Licensing, and Accounts/Treasury.',
    duties: [
      'DC (IT & Track-and-Trace): Digital single-window portal and 2D barcode encryption engines.',
      'DC (Policy & Licenses): Processing new vend applications, renewals, and statutory covenants.',
      'DC (Accounts & PAO): Statutory duty collection, bank guarantee management, and revenue audits.'
    ],
    jurisdiction: 'Headquarters • Vikas Bhawan (IT, Policy & Accounts Wings)'
  },
  {
    id: 'ac_pcs',
    sr: 6,
    name: 'Assistant Commissioner Excise',
    subName: 'PCS / State Civil Services',
    cadreType: 'PCS',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 10 (Junior Time Scale)',
    sanctioned: 2,
    filled: 0,
    vacant: 2,
    status: 'vacant',
    authority: 'State Civil Services / Services Dept',
    recruitmentMode: 'Deputation / Transfer from State Civil Services',
    statutoryRole: 'Field coordination and special audit inquiries across retail vends and micro-breweries.',
    duties: [
      'Independent inquiry officer for public grievances and licensee show-cause notices.',
      'Coordinating multi-zone inspection drives during festival seasons and election dry days.',
      'Supervising transit permit issuances across northern inter-state corridors.'
    ],
    jurisdiction: 'Zonal Circles & Field Outposts'
  },
  {
    id: 'ac_dept',
    sr: 6,
    name: 'Assistant Commissioner Excise',
    subName: 'Departmental Stream',
    cadreType: 'Departmental',
    // group: 'Group A',
    groupCode: 'ga',
    payLevel: 'Level 10 (Junior Time Scale)',
    sanctioned: 15,
    filled: 14,
    vacant: 1,
    status: 'operational',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: 'Promotion through DPC from Excise Officer cadre',
    statutoryRole: 'Direct administrative heads of 11 Excise District Zones and specialized headquarters branches.',
    duties: [
      'Branch heads: AC (Permit), AC (BWH Wholesale), AC (HCR), AC (Enforcement), AC (Care Taking).',
      'Granting Import Permits Cum Passes (IP-PL) and Transport Passes under strict digital validation.',
      'Conducting random surprise inspections of retail liquor vends and bar registers.'
    ],
    jurisdiction: '11 Excise District Zones & Vikas Bhawan Branches'
  },
  {
    id: 'eo_dept',
    sr: 7,
    name: 'Excise Officers (EO)',
    subName: 'Circle Superintendents & Squad Leaders',
    cadreType: 'Departmental',
    // group: 'Group B',
    groupCode: 'gb',
    payLevel: 'Level 8 (Pay Band 2 • Gazetted)',
    sanctioned: 61,
    filled: 45,
    vacant: 16,
    status: 'deficit',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: '50% Direct Recruitment through DSSSB / 50% Promotion from Excise Inspectors',
    statutoryRole: 'Superintendent level officers executing search, seizure, warehouse custody, and audit protocols.',
    duties: [
      'In-charge of bonded warehouses: Overseeing inward consignments and release authorization.',
      'Supervising raid squads during enforcement operations against bootlegging syndicates.',
      'Verifying stock registers, daily sales summaries, and point-of-sale scanner integrity at retail vends.',
      'Drawing laboratory samples of spirits for forensic chemical analysis.'
    ],
    jurisdiction: 'Circles, Bonded Warehouses, Depots & Flying Squads'
  },
  {
    id: 'ei_dept',
    sr: 8,
    name: 'Excise Inspectors (EI)',
    subName: 'Frontline Field Enforcement & Inspection',
    cadreType: 'Departmental',
    // group: 'Group C',
    groupCode: 'gc',
    payLevel: 'Level 7 (Pay Band 2 • Executive)',
    sanctioned: 238,
    filled: 191,
    vacant: 47,
    status: 'operational',
    authority: 'Departmental Cadre (GNCTD)',
    recruitmentMode: 'Direct Recruitment via DSSSB Combined Graduate Level Examination',
    statutoryRole: 'The core operational frontline ensuring 24/7 law enforcement, barcode verification, and border security.',
    duties: [
      '24/7 static and mobile patrolling at 21 inter-state border check-points.',
      'Real-time scanning and cryptographic verification of 2D Data Matrix barcodes on liquor bottles.',
      'Inspecting retail vends, bars, pubs, microbreweries, and event venues for statutory compliance.',
      'First responders to citizen grievances, anti-smuggling seizures, and FIR registrations.'
    ],
    jurisdiction: 'State-wide Field Force, 21 Border Pickets, 500+ Retail Outlets'
  }
];

// Deployment statistics across NCT of Delhi
const DEPLOYMENT_WINGS = [
  {
    id: 'border_squads',
    title: '21 Inter-State Border Outposts & Flying Squads',
    subtitle: 'Singhu, Tikri, Badarpur, Ghazipur, Apsara, Kapashera corridors',
    officers: '112 Active Personnel',
    timing: '24 Hours / 7 Days a Week',
    desc: 'Round-the-clock armed patrolling, intercepting non-duty-paid smuggled liquor from neighboring states, vehicle inspection, and computerized transit permit verification.'
  },
  {
    id: 'zonal_circles',
    title: '11 Administrative Excise District Circles',
    subtitle: 'North, South, East, West, New Delhi, Central, Shahdara, etc.',
    officers: '74 Active Personnel',
    timing: '09:30 AM - 06:00 PM (plus evening vend audits)',
    desc: 'Supervision of 500+ government-run retail liquor vends, random inventory reconciliation, age-verification compliance, and CCTV surveillance monitoring.'
  },
  {
    id: 'bwh_warehouses',
    title: 'Bonded Warehouses & Wholesale Depots',
    subtitle: 'Major logistical hubs & corporate distributors',
    officers: '28 Active Personnel',
    timing: 'Inward dispatch shifts (08:00 AM - 08:00 PM)',
    desc: 'Stationed on-site at wholesale depots to ensure every inbound case is digitally registered, scanned, and authenticated into the e-Abkari supply chain database.'
  },
  {
    id: 'secretariat_hq',
    title: 'Headquarters Secretariat & IT Directorate',
    subtitle: 'Vikas Bhawan, I.P. Estate, New Delhi',
    officers: '34 Active Personnel',
    timing: 'Standard State Administrative Hours',
    desc: 'State licensing administration, statutory policy formulation, appellate court registers, e-Abkari single-window portal maintenance, and Treasury revenue settlements.'
  },
  {
    id: 'chemical_lab',
    title: 'Central Excise Chemical Testing Laboratory',
    subtitle: 'Forensic spirit analysis & quality assurance wing',
    officers: '8 Specialist Personnel',
    timing: 'Daily laboratory batch processing',
    desc: 'Gas chromatography, spectrophotometry, and chemical verification of ethyl alcohol purity, ensuring zero harmful chemicals or adulterated spirits enter Delhi markets.'
  }
];

// Recruitment pipeline overview for the 69 vacancies
const RECRUITMENT_PIPELINE = [
  {
    id: 'dsssb_direct',
    agency: 'DSSSB (Delhi Subordinate Services Selection Board)',
    vacancies: '55 Posts',
    badge: 'Direct Recruitment',
    variant: 'blue',
    desc: 'Formal requisition submitted for 47 Excise Inspectors and 8 Excise Officers through Combined Graduate Level examination. Tier-1 and Tier-2 tests in progress.'
  },
  {
    id: 'dpc_internal',
    agency: 'Departmental Promotion Committee (DPC)',
    vacancies: '9 Posts',
    badge: 'Merit Promotion',
    variant: 'purple',
    desc: 'Departmental promotion pipeline from Senior Inspectors to Excise Officers (8 posts) and Senior Excise Officers to Assistant Commissioner (1 post).'
  },
  {
    id: 'services_deputation',
    agency: 'GNCTD Services Department / MHA',
    vacancies: '5 Posts',
    badge: 'Cadre Deputation',
    variant: 'emerald',
    desc: 'Requisition with Joint Cadre Authority (AGMUT/DANICS) for 1 Joint Commissioner, 1 Deputy Commissioner, and 2 Assistant Commissioners (PCS cadre).'
  }
];

const Staff = ({ onNavigateHome }) => {
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState('ROSTER'); // 'ROSTER' | 'CARDS' | 'GROUPS' | 'VACANCY' | 'DEPLOYMENTS'
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('ALL'); // 'ALL' | 'IAS' | 'PCS' | 'Departmental'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'FULL' | 'VACANT'
  const [sortColumn, setSortColumn] = useState('sr');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCadre, setSelectedCadre] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Handle Home Navigation
  const handleHomeClick = useCallback(() => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/');
    }
  }, [onNavigateHome, navigate]);

  // Handle Sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort cadres
  const filteredCadres = useMemo(() => {
    return CADRE_REGISTRY.filter(item => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSub = item.subName ? item.subName.toLowerCase().includes(q) : false;
        const matchType = item.cadreType.toLowerCase().includes(q);
        const matchRole = item.statutoryRole.toLowerCase().includes(q);
        const matchGroup = item.group.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchType && !matchRole && !matchGroup) {
          return false;
        }
      }

      // Service Filter
      if (serviceFilter !== 'ALL') {
        if (item.cadreType !== serviceFilter) return false;
      }

      // Status Filter
      if (statusFilter === 'FULL') {
        if (item.vacant > 0) return false;
      } else if (statusFilter === 'VACANT') {
        if (item.vacant === 0) return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchQuery, serviceFilter, statusFilter, sortColumn, sortDirection]);

  // Aggregate Totals
  const totals = useMemo(() => {
    return {
      sanctioned: 325,
      filled: 256,
      vacant: 69,
      fillRate: '78.8%'
    };
  }, []);

  // CSV Export utility
  const handleExportCSV = () => {
    const headers = ['Sr.No', 'Name of Cadre', 'Sub Cadre', 'Cadre Type', 'Group', 'Sanctioned Posts', 'Filled Posts', 'Vacant/Excess', 'Fill Rate %', 'Pay Scale', 'Primary Role'];
    const rows = CADRE_REGISTRY.map(c => {
      const rate = c.sanctioned > 0 ? Math.round((c.filled / c.sanctioned) * 100) : 100;
      return [
        c.sr,
        `"${c.name}"`,
        `"${c.subName || '-'}"`,
        c.cadreType,
        c.group,
        c.sanctioned,
        c.filled,
        c.vacant,
        `${rate}%`,
        `"${c.payLevel}"`,
        `"${c.statutoryRole.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Delhi_Excise_Staff_Strength_Cadre_Roster_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Official Cadre Roster exported successfully as CSV');
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Print utility
  const handlePrint = () => {
    window.print();
  };

  // Grouped cadres for Group-wise tab
  const groupedData = useMemo(() => {
    return {
      groupA: {
        title: "Group 'A' Apex & Gazetted Leadership",
        subtitle: 'Policy formulation, statutory adjudication, departmental management & regulatory supervision',
        code: 'ga',
        sanctioned: 26,
        filled: 20,
        vacant: 6,
        cadres: CADRE_REGISTRY.filter(c => c.group === 'Group A')
      },
      groupB: {
        title: "Group 'B' Gazetted Supervisory Cadre",
        subtitle: 'Circle superintendents, wholesale depot in-charges, search & raid squad leaders',
        code: 'gb',
        sanctioned: 61,
        filled: 45,
        vacant: 16,
        cadres: CADRE_REGISTRY.filter(c => c.group === 'Group B')
      },
      groupC: {
        title: "Group 'C' Executive Field Enforcement Force",
        subtitle: 'Frontline 24/7 border checking, 2D QR code scanning, vend inspection & anti-bootlegging drives',
        code: 'gc',
        sanctioned: 238,
        filled: 191,
        vacant: 47,
        cadres: CADRE_REGISTRY.filter(c => c.group === 'Group C')
      }
    };
  }, []);

  return (
    <div className="staff-page-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#012a52',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          fontWeight: '600'
        }}>
          <CheckCircle2 style={{ width: '1.125rem', height: '1.125rem', color: '#facc15' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumb Navigation Bar (Matches about-breadcrumb-bar) */}
      <div className="staff-breadcrumb-bar">
        <div className="staff-container">
          <div className="staff-breadcrumb-inner">
            <div className="staff-breadcrumb">
              <button type="button" onClick={handleHomeClick} className="staff-breadcrumb-link">
                <Home style={{ width: '0.8125rem', height: '0.8125rem' }} />
                <span>Home</span>
              </button>
              <ChevronRight className="staff-breadcrumb-sep" />
              <button type="button" onClick={() => navigate('/about-us')} className="staff-breadcrumb-link">
                About Us
              </button>
              <ChevronRight className="staff-breadcrumb-sep" />
              <span className="staff-breadcrumb-current">Staff Strength &amp; Cadre Directory</span>
            </div>
            <div className="staff-emblem-badge">
              <span className="staff-emblem-dot" />
              <span>Department of Excise, GNCTD • Establishment Wing</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Hero Section (Matches about-hero-section) */}
      <section className="staff-hero-section">
        <div className="staff-container">
          <div className="staff-hero-grid">
            {/* Left Column: Title & Actions */}
            <div>
              <div className="staff-badge-inline">
                <Shield style={{ width: '0.75rem', height: '0.75rem', color: '#f59e0b' }} />
                <span>Statutory Establishment Roster</span>
              </div>
              <h1 className="staff-hero-title">
                Cadre Strength &amp; Personnel Directory
              </h1>
              <p className="staff-hero-subtitle">
                Department of Excise, Entertainment &amp; Luxury Tax • Government of NCT of Delhi
              </p>
              
              <div className="staff-hero-tagline-box">
                <p className="staff-hero-tagline">
                  &ldquo;Ensuring regulatory vigilance, robust state revenue mobilization, and flawless enforcement through 325 sanctioned statutory posts across the National Capital Territory.&rdquo;
                </p>
              </div>

              <div className="staff-hero-buttons">
                {/* <button 
                  type="button" 
                  onClick={handleExportCSV}
                  className="staff-btn-primary"
                  title="Download official CSV data sheet"
                >
                  <Download style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Export Cadre CSV</span>
                </button> */}
                {/* <button 
                  type="button" 
                  onClick={handlePrint}
                  className="staff-btn-outline"
                  title="Print official departmental roster"
                >
                  <Printer style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Print Roster</span>
                </button> */}
                <button 
                  type="button" 
                  onClick={() => navigate('/organizational-structure')}
                  className="staff-btn-outline"
                >
                  <Layers style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Org Hierarchy</span>
                </button>
              </div>
            </div>

            {/* Right Column: Featured HQ Photo Card (Matches about-hero-card) */}
            <div>
              <div className="staff-hero-card">
                <div className="staff-hero-img-box">
                  <img 
                    src={hqImage} 
                    alt="Vikas Bhawan Headquarters" 
                    className="staff-hero-img" 
                  />
                  <div className="staff-hero-img-overlay" />
                  <div className="staff-hero-img-badge">
                    <Building style={{ width: '0.8125rem', height: '0.8125rem', color: '#facc15' }} />
                    <span>Headquarters Secretariat</span>
                  </div>
                </div>
                <div className="staff-hero-img-caption">
                  <div>
                    <h3 className="staff-caption-title">Excise Directorate &amp; Appellate Courts</h3>
                    <p className="staff-caption-address">Vikas Bhawan, I.P. Estate, New Delhi - 110002</p>
                  </div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
                    Active Office
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metric Stats Strip (Floating Overlap - Matches about-stats-section) */}
      <section className="staff-stats-section">
        <div className="staff-container">
          <div className="staff-stats-grid">
            {/* Stat 1: Sanctioned Strength */}
            <div 
              className="staff-stat-card"
              style={{ borderTop: '3px solid #0284c7' }}
              onClick={() => { setServiceFilter('ALL'); setStatusFilter('ALL'); setSearchQuery(''); }}
              title="Click to reset filters"
            >
              <div className="staff-stat-top">
                <div className="staff-stat-icon-wrap" style={{ backgroundColor: '#e0f2fe' }}>
                  <Briefcase style={{ width: '1.25rem', height: '1.25rem', color: '#0284c7' }} />
                </div>
                <span className="staff-stat-badge">Statutory Ceiling</span>
              </div>
              <div>
                <div className="staff-stat-number">{totals.sanctioned}</div>
                <div className="staff-stat-label">Sanctioned Strength</div>
                <div className="staff-stat-note">Authorized departmental establishment</div>
              </div>
            </div>

            {/* Stat 2: In Position */}
            <div 
              className={`staff-stat-card ${statusFilter === 'FULL' ? 'active-filter' : ''}`}
              style={{ borderTop: '3px solid #059669' }}
              onClick={() => setStatusFilter(prev => prev === 'FULL' ? 'ALL' : 'FULL')}
              title="Click to view fully staffed cadres"
            >
              <div className="staff-stat-top">
                <div className="staff-stat-icon-wrap" style={{ backgroundColor: '#ecfdf5' }}>
                  <Users style={{ width: '1.25rem', height: '1.25rem', color: '#059669' }} />
                </div>
                <span className="staff-stat-badge emerald">{totals.fillRate} Fill Rate</span>
              </div>
              <div>
                <div className="staff-stat-number" style={{ color: '#059669' }}>{totals.filled}</div>
                <div className="staff-stat-label">Officers in Position</div>
                <div className="staff-stat-note">Active operational personnel</div>
              </div>
            </div>

            {/* Stat 3: Requisitions & Vacancies */}
            <div 
              className={`staff-stat-card ${statusFilter === 'VACANT' ? 'active-filter' : ''}`}
              style={{ borderTop: '3px solid #d97706' }}
              onClick={() => setStatusFilter(prev => prev === 'VACANT' ? 'ALL' : 'VACANT')}
              title="Click to filter cadres with open vacancies"
            >
              <div className="staff-stat-top">
                <div className="staff-stat-icon-wrap" style={{ backgroundColor: '#fffbeb' }}>
                  <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#d97706' }} />
                </div>
                <span className="staff-stat-badge amber">Requisitions Sent</span>
              </div>
              <div>
                <div className="staff-stat-number" style={{ color: '#d97706' }}>{totals.vacant}</div>
                <div className="staff-stat-label">Vacancies in Pipeline</div>
                <div className="staff-stat-note">Active DSSSB &amp; DPC files</div>
              </div>
            </div>

            {/* Stat 4: Frontline Force */}
            <div 
              className="staff-stat-card"
              style={{ borderTop: '3px solid #7c3aed' }}
              onClick={() => setActiveTab('DEPLOYMENTS')}
              title="Click to view deployment wings"
            >
              <div className="staff-stat-top">
                <div className="staff-stat-icon-wrap" style={{ backgroundColor: '#f5f3ff' }}>
                  <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#7c3aed' }} />
                </div>
                <span className="staff-stat-badge purple">24/7 Field Force</span>
              </div>
              <div>
                <div className="staff-stat-number" style={{ color: '#7c3aed' }}>236</div>
                <div className="staff-stat-label">Frontline Vigilance Squads</div>
                <div className="staff-stat-note">21 Border checkposts &amp; circles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dashboard Interactive Tabs Bar (Matches about-tabs-bar) */}
      <div className="staff-tabs-container">
        <div className="staff-container">
          {/* <div className="staff-tabs-bar">
            {[
              { id: 'ROSTER', label: 'Cadre Roster (Table)', icon: FileText, count: filteredCadres.length },
            //   { id: 'CARDS', label: 'Cadre Cards (Grid)', icon: Users },
            //   { id: 'GROUPS', label: 'Group Classifications (A, B, C)', icon: Award },
              { id: 'VACANCY', label: 'Vacancy & DSSSB Pipeline', icon: TrendingUp, count: 69 },
              { id: 'DEPLOYMENTS', label: 'Field Deployment Footprint', icon: MapPin }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`staff-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon className="staff-tab-icon" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="staff-tab-count">{tab.count}</span>
                  )}
                </button>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* 5. Main Content Area */}
      <div className="staff-content-sections">
        <div className="staff-container">
          {/* TAB 1: CADRE ROSTER (INTERACTIVE TABLE) */}
          {activeTab === 'ROSTER' && (
            <div className="staff-section-card">
              <div className="staff-section-header">
                <div>
                  <span className="staff-badge-tag">
                    <Shield style={{ width: '0.6875rem', height: '0.6875rem' }} />
                    <span>Official Establishment Roster</span>
                  </span>
                  <h2 className="staff-section-title">
                    Sanctioned vs. Operational Cadre Breakdown
                  </h2>
                  <p className="staff-section-subtitle">
                    Complete statutory roster specifying authorized cadre strength, filled posts, vacancies, service classifications, and operational fill percentages across all administrative tiers.
                  </p>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="staff-toolbar">
                <div className="staff-toolbar-left">
                  <div className="staff-search-box">
                    <Search className="staff-search-icon" />
                    <input 
                      type="text"
                      placeholder="Search designation, cadre, service type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="staff-search-input"
                    />
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={() => setSearchQuery('')}
                        className="staff-search-clear"
                      >
                        <X style={{ width: '0.75rem', height: '0.75rem' }} />
                      </button>
                    )}
                  </div>
                </div>
                </div>

              {/* Table */}
              <div className="staff-table-wrapper">
                <table className="staff-table">
                  <thead>
                    <tr>
                      <th className="staff-th text-center" style={{ width: '3.5rem' }}>
                        Sr.
                      </th>
                      <th 
                        className="staff-th sortable" 
                        onClick={() => handleSort('name')}
                        style={{ minWidth: '15rem' }}
                      >
                        <div className="staff-th-content">
                          <span>Name of Cadre &amp; Stream</span>
                          <ArrowUpDown style={{ width: '0.75rem', height: '0.75rem' }} />
                        </div>
                      </th>
                      <th className="staff-th text-center" style={{ width: '7rem' }}>
                        Service
                      </th>
                      <th className="staff-th text-center" style={{ width: '6rem' }}>
                        Group
                      </th>
                      <th 
                        className="staff-th text-center sortable"
                        onClick={() => handleSort('sanctioned')}
                        style={{ width: '7.5rem' }}
                      >
                        <div className="staff-th-content" style={{ justifyContent: 'center' }}>
                          <span>Sanctioned</span>
                          <ArrowUpDown style={{ width: '0.75rem', height: '0.75rem' }} />
                        </div>
                      </th>
                      <th 
                        className="staff-th text-center sortable"
                        onClick={() => handleSort('filled')}
                        style={{ width: '6.5rem' }}
                      >
                        <div className="staff-th-content" style={{ justifyContent: 'center' }}>
                          <span>Filled</span>
                          <ArrowUpDown style={{ width: '0.75rem', height: '0.75rem' }} />
                        </div>
                      </th>
                      {/* <th 
                        className="staff-th text-center sortable"
                        onClick={() => handleSort('vacant')}
                        style={{ width: '8rem' }}
                      >
                        <div className="staff-th-content" style={{ justifyContent: 'center' }}>
                          <span>Vacant / Excess</span>
                          <ArrowUpDown style={{ width: '0.75rem', height: '0.75rem' }} />
                        </div>
                      </th> */}
                      <th className="staff-th" style={{ width: '10rem' }}>
                        Fill Rate Status
                      </th>
                      <th className="staff-th text-center" style={{ width: '6rem' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="staff-tbody">
                    {filteredCadres.map((row) => {
                      const fillPct = row.sanctioned > 0 
                        ? Math.round((row.filled / row.sanctioned) * 100) 
                        : 100;
                      
                      let fillBarColor = '#10b981';
                      if (fillPct < 50) fillBarColor = '#ef4444';
                      else if (fillPct < 85) fillBarColor = '#f59e0b';

                      const isZeroFilled = row.sanctioned > 0 && row.filled === 0;

                      return (
                        <tr key={row.id} className={isZeroFilled ? 'highlight-zero' : ''}>
                          {/* <td className="staff-td text-center staff-td-sr">
                            {row.sr}
                          </td> */}
                          <td className="staff-td">
                            <button 
                              type="button" 
                              onClick={() => setSelectedCadre(row)}
                              className="staff-cadre-title-link"
                            >
                              <span>{row.name}</span>
                              {/* <span className={`staff-cadre-group-tag ${row.groupCode}`}>
                                {row.group}
                              </span> */}
                            </button>
                            {row.subName && (
                              <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: '500', marginTop: '0.15rem' }}>
                                {row.subName}
                              </div>
                            )}
                          </td>
                          <td className="staff-td text-center">
                            <span className={`staff-service-badge ${row.cadreType.toLowerCase()}`}>
                              {row.cadreType}
                            </span>
                          </td>
                          <td className="staff-td text-center" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                            {row.group}
                          </td>
                          <td className="staff-td text-center staff-num-bold">
                            {row.sanctioned}
                          </td>
                          <td className="staff-td text-center staff-num-filled">
                            {row.filled}
                          </td>
                          <td className="staff-td text-center">
                            {row.isExcess ? (
                              <span className="staff-num-vacant excess">1 (Addl Charge)</span>
                            ) : row.vacant === 0 ? (
                              <span className="staff-num-vacant zero">0</span>
                            ) : (
                              <span className="staff-num-vacant alert">
                                {row.vacant} Vacant
                              </span>
                            )}
                          </td>
                          <td className="staff-td">
                            <div className="staff-fill-rate-cell">
                              <div className="staff-mini-bar-track">
                                <div 
                                  className="staff-mini-bar-fill" 
                                  style={{ 
                                    width: `${Math.min(fillPct, 100)}%`,
                                    backgroundColor: fillBarColor 
                                  }} 
                                />
                              </div>
                              <span className="staff-fill-label" style={{ color: fillBarColor }}>
                                {fillPct}%
                              </span>
                            </div>
                          </td>
                          <td className="staff-td text-center">
                            <button 
                              type="button" 
                              onClick={() => setSelectedCadre(row)}
                              className="staff-row-action-btn"
                              title="View statutory profile & responsibilities"
                            >
                              <Info style={{ width: '0.6875rem', height: '0.6875rem' }} />
                              <span>Profile</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="staff-tfoot">
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'left' }}>
                        TOTAL STATUTORY STRENGTH (DELHI EXCISE DEPARTMENT)
                      </td>
                      <td style={{ textAlign: 'center', color: '#facc15' }}>
                        {totals.sanctioned}
                      </td>
                      <td style={{ textAlign: 'center', color: '#6ee7b7' }}>
                        {totals.filled}
                      </td>
                      <td style={{ textAlign: 'center', color: '#fca5a5' }}>
                        {totals.vacant}
                      </td>
                      <td colSpan="2" style={{ textAlign: 'left', color: '#cbd5e1', fontSize: '0.75rem' }}>
                        Overall Fill Rate: <strong style={{ color: '#ffffff' }}>{totals.fillRate}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {filteredCadres.length === 0 && (
                <div className="staff-empty-state">
                  <AlertCircle className="staff-empty-icon" />
                  <h3 className="staff-empty-title">No matching cadres found</h3>
                  <p className="staff-empty-desc">Try changing your search keywords or resetting filters.</p>
                  <button 
                    type="button" 
                    onClick={() => { setSearchQuery(''); setServiceFilter('ALL'); setStatusFilter('ALL'); }}
                    className="staff-empty-reset-btn"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CADRE CARDS (GRID VIEW) */}
          {activeTab === 'CARDS' && (
            <div className="staff-section-card">
              <div className="staff-section-header">
                <div>
                  <span className="staff-badge-tag">
                    <Users style={{ width: '0.6875rem', height: '0.6875rem' }} />
                    <span>Visual Cadre Directory</span>
                  </span>
                  <h2 className="staff-section-title">
                    Cadre Operational Specifications
                  </h2>
                  <p className="staff-section-subtitle">
                    Explore cadre cards displaying executive responsibilities, pay matrices, and operational capacities.
                  </p>
                </div>
              </div>

              <div className="staff-cadre-grid">
                {filteredCadres.map((cadre) => {
                  const fillPct = cadre.sanctioned > 0 
                    ? Math.round((cadre.filled / cadre.sanctioned) * 100) 
                    : 100;
                  return (
                    <div key={cadre.id} className="staff-cadre-card">
                      <div>
                        <div className="staff-cadre-card-header">
                          <div>
                            <h3 className="staff-cadre-card-title">{cadre.name}</h3>
                            {cadre.subName && (
                              <p className="staff-cadre-card-subtitle">{cadre.subName}</p>
                            )}
                          </div>
                          <span className={`staff-service-badge ${cadre.cadreType.toLowerCase()}`}>
                            {cadre.cadreType}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.5', margin: '0.5rem 0' }}>
                          {cadre.statutoryRole}
                        </p>

                        <div className="staff-cadre-card-stats">
                          <div className="staff-cadre-stat-box">
                            <span className="staff-cadre-stat-label">Sanctioned</span>
                            <span className="staff-cadre-stat-val">{cadre.sanctioned}</span>
                          </div>
                          <div className="staff-cadre-stat-box">
                            <span className="staff-cadre-stat-label">Filled</span>
                            <span className="staff-cadre-stat-val" style={{ color: '#059669' }}>{cadre.filled}</span>
                          </div>
                          <div className="staff-cadre-stat-box">
                            <span className="staff-cadre-stat-label">Vacant</span>
                            <span className="staff-cadre-stat-val" style={{ color: cadre.vacant > 0 ? '#dc2626' : '#94a3b8' }}>
                              {cadre.vacant}
                            </span>
                          </div>
                        </div>

                        <div style={{ margin: '0.5rem 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            <span style={{ color: '#64748b' }}>Operational Capacity</span>
                            <span style={{ color: fillPct >= 80 ? '#059669' : fillPct >= 50 ? '#d97706' : '#dc2626' }}>
                              {fillPct}%
                            </span>
                          </div>
                          <div className="staff-mini-bar-track" style={{ height: '0.375rem' }}>
                            <div 
                              className="staff-mini-bar-fill" 
                              style={{ 
                                width: `${Math.min(fillPct, 100)}%`,
                                backgroundColor: fillPct >= 80 ? '#10b981' : fillPct >= 50 ? '#f59e0b' : '#ef4444' 
                              }} 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="staff-cadre-card-footer">
                        <span style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b' }}>
                          {cadre.payLevel}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => setSelectedCadre(cadre)}
                          className="staff-row-action-btn"
                        >
                          <Info style={{ width: '0.6875rem', height: '0.6875rem' }} />
                          <span>View Profile</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: GROUP CLASSIFICATIONS */}
          {activeTab === 'GROUPS' && (
            <div className="staff-section-card">
              <div className="staff-section-header">
                <div>
                  <span className="staff-badge-tag">
                    <Award style={{ width: '0.6875rem', height: '0.6875rem' }} />
                    <span>7th CPC Classification</span>
                  </span>
                  <h2 className="staff-section-title">
                    Group 'A', 'B' &amp; 'C' Cadre Hierarchy
                  </h2>
                  <p className="staff-section-subtitle">
                    Statutory tier distribution categorizing executive policy leadership, gazetted supervisory superintendents, and frontline vigilance inspectors.
                  </p>
                </div>
              </div>

              <div className="staff-groups-container">
                {Object.values(groupedData).map((grp, idx) => {
                  const fillRate = Math.round((grp.filled / grp.sanctioned) * 100);
                  return (
                    <div key={idx} className="staff-group-panel">
                      <div className="staff-group-panel-header">
                        <div className="staff-group-header-left">
                          <div className={`staff-group-icon-circle ${grp.code}`}>
                            {grp.code === 'ga' ? 'A' : grp.code === 'gb' ? 'B' : 'C'}
                          </div>
                          <div>
                            <h3 className="staff-group-title">{grp.title}</h3>
                            <p className="staff-group-subtitle">{grp.subtitle}</p>
                          </div>
                        </div>

                        <div className="staff-group-stat-chips">
                          <span className="staff-group-chip">
                            Sanctioned: <strong>{grp.sanctioned}</strong>
                          </span>
                          <span className="staff-group-chip" style={{ color: '#059669' }}>
                            In Position: <strong>{grp.filled}</strong>
                          </span>
                          <span className="staff-group-chip" style={{ color: '#dc2626' }}>
                            Vacant: <strong>{grp.vacant}</strong>
                          </span>
                          <span className="staff-group-chip" style={{ backgroundColor: '#eff6ff', color: '#0369a1' }}>
                            Fill Rate: <strong>{fillRate}%</strong>
                          </span>
                        </div>
                      </div>

                      <div className="staff-group-cadres-list">
                        {grp.cadres.map(c => (
                          <div key={c.id} className="staff-group-cadre-row">
                            <div>
                              <div className="staff-group-cadre-name">{c.name}</div>
                              <div className="staff-group-cadre-service">
                                {c.cadreType} • {c.payLevel}
                              </div>
                            </div>
                            <div className="staff-group-cadre-numbers">
                              <div className="staff-group-cadre-count">
                                {c.filled} / {c.sanctioned}
                              </div>
                              {c.vacant > 0 ? (
                                <div className="staff-group-cadre-vacant">
                                  {c.vacant} Vacant
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: '700' }}>
                                  Full
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: VACANCY & RECRUITMENT PIPELINE */}
          {activeTab === 'VACANCY' && (
            <div className="staff-section-card">
              <div className="staff-section-header">
                <div>
                  <span className="staff-badge-tag amber">
                    <TrendingUp style={{ width: '0.6875rem', height: '0.6875rem' }} />
                    <span>Human Resource Audit</span>
                  </span>
                  <h2 className="staff-section-title">
                    Active Recruitment &amp; Requisition Pipeline (69 Open Posts)
                  </h2>
                  <p className="staff-section-subtitle">
                    Requisitions submitted to DSSSB, Departmental Promotion Committees, and the Joint Cadre Authority to fill operational vacancies and maintain 100% border coverage.
                  </p>
                </div>
              </div>

              <div className="staff-vacancy-container">
                <div className="staff-vacancy-banner">
                  <div>
                    <h3 className="staff-vacancy-banner-title">
                      Active Recruitment Tracking • Q3 2026 Audit
                    </h3>
                    <p className="staff-vacancy-banner-desc">
                      The Department of Excise operates with a strict recruitment schedule in coordination with DSSSB, Services Department, and UPSC. Formal requisitions for all 69 open posts are under active process.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSelectedCadre(CADRE_REGISTRY.find(c => c.id === 'ei_dept'))}
                    className="staff-btn-primary"
                    style={{ flexShrink: 0 }}
                  >
                    <Info style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Inspect Inspector Cadre</span>
                  </button>
                </div>

                <div className="staff-vacancy-cards-grid">
                  {RECRUITMENT_PIPELINE.map((pipe) => (
                    <div key={pipe.id} className="staff-pipeline-card">
                      <span className={`staff-pipeline-badge ${pipe.variant}`}>
                        {pipe.badge}
                      </span>
                      <h4 className="staff-pipeline-agency">{pipe.agency}</h4>
                      <div className="staff-pipeline-count">{pipe.vacancies}</div>
                      <p className="staff-pipeline-desc">{pipe.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Breakdown Table */}
                <div className="staff-table-wrapper" style={{ marginTop: '1rem' }}>
                  <table className="staff-table">
                    <thead>
                      <tr>
                        <th className="staff-th">Cadre Designation</th>
                        <th className="staff-th text-center">Group</th>
                        <th className="staff-th text-center">Sanctioned</th>
                        <th className="staff-th text-center">Vacancies</th>
                        <th className="staff-th">Controlling / Requisition Authority</th>
                        <th className="staff-th">Recruitment Mechanism</th>
                      </tr>
                    </thead>
                    <tbody className="staff-tbody">
                      {CADRE_REGISTRY.filter(c => c.vacant > 0).map(c => (
                        <tr key={c.id}>
                          <td className="staff-td">
                            <span style={{ fontWeight: '700', color: '#012a52' }}>{c.name}</span>
                            {c.subName && <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>{c.subName}</span>}
                          </td>
                          <td className="staff-td text-center">
                            <span className={`staff-cadre-group-tag ${c.groupCode}`}>{c.group}</span>
                          </td>
                          <td className="staff-td text-center staff-num-bold">{c.sanctioned}</td>
                          <td className="staff-td text-center staff-num-vacant alert">{c.vacant}</td>
                          <td className="staff-td" style={{ fontSize: '0.75rem', fontWeight: '600' }}>{c.authority}</td>
                          <td className="staff-td" style={{ fontSize: '0.75rem', color: '#475569' }}>{c.recruitmentMode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FIELD DEPLOYMENT FOOTPRINT */}
          {activeTab === 'DEPLOYMENTS' && (
            <div className="staff-section-card">
              <div className="staff-section-header">
                <div>
                  <span className="staff-badge-tag emerald">
                    <MapPin style={{ width: '0.6875rem', height: '0.6875rem' }} />
                    <span>State-Wide Operational Deployment</span>
                  </span>
                  <h2 className="staff-section-title">
                    Operational Field Force &amp; Jurisdictional Footprint
                  </h2>
                  <p className="staff-section-subtitle">
                    Deployment distribution of active excise personnel across 21 inter-state border outposts, 11 administrative district zones, bonded wholesale depots, and specialized wings.
                  </p>
                </div>
              </div>

              <div className="staff-deployment-grid">
                {DEPLOYMENT_WINGS.map((wing) => (
                  <div key={wing.id} className="staff-deploy-card">
                    <div>
                      <div className="staff-deploy-top">
                        <div className="staff-deploy-icon-box">
                          <MapPin style={{ width: '1.25rem', height: '1.25rem' }} />
                        </div>
                        <div>
                          <h4 className="staff-deploy-title">{wing.title}</h4>
                          <p className="staff-deploy-subtitle">{wing.subtitle}</p>
                        </div>
                      </div>

                      <p className="staff-deploy-desc">{wing.desc}</p>
                    </div>

                    <div className="staff-deploy-stats-row">
                      <span className="staff-deploy-officers-badge">
                        {wing.officers}
                      </span>
                      <span className="staff-deploy-hours">
                        {wing.timing}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Cadre Detail Modal (Matches about-modal) */}
      {selectedCadre && (
        <div 
          className="staff-modal-backdrop"
          onClick={() => setSelectedCadre(null)}
        >
          <div 
            className="staff-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="staff-modal-header">
              <button 
                type="button" 
                onClick={() => setSelectedCadre(null)}
                className="staff-modal-close-btn"
                title="Close modal"
              >
                <X style={{ width: '1rem', height: '1rem' }} />
              </button>

              <div className="staff-modal-header-badge">
                <Award style={{ width: '0.8125rem', height: '0.8125rem' }} />
                <span>Statutory Cadre Specification</span>
              </div>
              <h2 className="staff-modal-title">
                {selectedCadre.name}
              </h2>
              <div className="staff-modal-service">
                {selectedCadre.subName || selectedCadre.cadreType} • {selectedCadre.group} • {selectedCadre.payLevel}
              </div>
            </div>

            {/* Modal Body */}
            <div className="staff-modal-body">
              {/* Strength Stats */}
              <div className="staff-modal-stats-grid">
                <div>
                  <div className="staff-modal-stat-title">Sanctioned</div>
                  <div className="staff-modal-stat-num">{selectedCadre.sanctioned}</div>
                </div>
                <div>
                  <div className="staff-modal-stat-title">In Position</div>
                  <div className="staff-modal-stat-num filled">{selectedCadre.filled}</div>
                </div>
                <div>
                  {/* <div className="staff-modal-stat-title">Vacant / Excess</div>
                  <div className={`staff-modal-stat-num ${selectedCadre.vacant > 0 ? 'vacant' : ''}`}>
                    {selectedCadre.vacant}
                  </div> */}
                </div>
              </div>

              {/* Administrative Meta */}
              <div className="staff-modal-info-box">
                <div className="staff-modal-meta-grid">
                  <div className="staff-modal-meta-item">
                    <span className="staff-modal-meta-label">Controlling Authority</span>
                    <span className="staff-modal-meta-val">{selectedCadre.authority}</span>
                  </div>
                  <div className="staff-modal-meta-item">
                    <span className="staff-modal-meta-label">Recruitment Mechanism</span>
                    <span className="staff-modal-meta-val">{selectedCadre.recruitmentMode}</span>
                  </div>
                  <div className="staff-modal-meta-item" style={{ gridColumn: 'span 2' }}>
                    <span className="staff-modal-meta-label">Primary Posting Jurisdiction</span>
                    <span className="staff-modal-meta-val">{selectedCadre.jurisdiction}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Duties */}
              <div>
                <h4 className="staff-modal-section-title">
                  <Scale style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Key Statutory Responsibilities (Delhi Excise Act 2009)</span>
                </h4>
                <ul className="staff-modal-responsibilities-list">
                  {selectedCadre.duties.map((duty, didx) => (
                    <li key={didx} className="staff-modal-resp-item">
                      <CheckCircle2 className="staff-modal-resp-bullet" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="staff-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedCadre(null)}
                className="staff-btn-primary"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
