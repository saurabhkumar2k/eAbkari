import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Building, 
  Check, 
  ShieldCheck,
  FileCheck,
  Power,
  Home,
  Award,
  Store,
  FlaskConical,
  Settings,
  Search,
  Plus,
  ChevronRight,
  ChevronDown,
  Info,
  ExternalLink,
  FileText,
  AlertCircle,
  Calendar,
  Lock,
  ArrowRight,
  Trash2,
  Phone
} from 'lucide-react';

export default function ApplicantDashboard({ onLogout, onNavigateToHome }) {
  // Real-time toast alert state
  const [saveMessage, setSaveMessage] = useState('');

  // Selected tab state
  const [activeTab, setActiveTab] = useState('Home');

  // Profile Form state
  const [profile, setProfile] = useState({
    firstName: 'Demo',
    lastName: 'User',
    fatherHusbandName: 'Demo User',
    occupation: 'Business Owner',
    panNo: 'ABCDE1234F',
    dob: '1990-01-01',
    gender: 'Male',
    address1: '123, Demo Street, Model Town',
    address2: 'Near Metro Station',
    stateUt: 'Delhi',
    district: 'North Delhi',
    subDivision: 'Civil Lines',
    pinCode: '110054',
    mobileNo: '9876543210',
    landLine: '011-12345678',
    emailId: 'demo.user@email.com'
  });

  // Dynamic state arrays for interactive button features
  const [licenses, setLicenses] = useState([
    { id: 'ND-25-L10023', type: 'L-1 (Wholesale Foreign Liquor)', status: 'Approved', issued: '12 Jan 2025', expiry: '11 Jan 2026', premises: 'Model Town Warehouse A' },
    { id: 'ND-25-L15004', type: 'L-15 (Hotel Tavern License)', status: 'Approved', issued: '01 Feb 2025', expiry: '31 Jan 2026', premises: 'Ansal Plaza Suite 4' },
    { id: 'ND-25-L22099', type: 'L-22 (Club Bar License)', status: 'Under Review', issued: 'Pending Decision', expiry: 'Pending', premises: 'Connaught Place Annex' }
  ]);

  const [premises, setPremises] = useState([
    { id: 'PR-9981', address: '123, Model Town, Phase II', subDivision: 'Civil Lines', policeClearance: 'Verified', fireNoc: 'Approved', status: 'Registered' },
    { id: 'PR-4392', address: 'B-4, Ansal Plaza Shopping Arcade', subDivision: 'Defence Colony', policeClearance: 'Verified', fireNoc: 'Approved', status: 'Registered' },
    { id: 'PR-1087', address: 'Flat 12A, Connaught Place Block E', subDivision: 'Chanakyapuri', policeClearance: 'In Progress', fireNoc: 'Under Inspection', status: 'Pending Verification' }
  ]);

  const [dealers, setDealers] = useState([
    { id: 'DL-7730', name: 'Delhi Wholesalers & Spirit Supply Corp.', location: 'Okhla Industrial Area Phase III', contact: '011-26383920', licenseRef: 'L-1-WH-887', status: 'Active' },
    { id: 'DL-5122', name: 'Indraprastha Retail Vends Association', location: 'Mayapuri Phase I', contact: '011-28114050', licenseRef: 'L-2-RT-041', status: 'Active' },
    { id: 'DL-3049', name: 'NCT Golden Bond Bottling & Logistics', location: 'Narela Industrial Zone', contact: '011-27781030', licenseRef: 'L-1-WH-219', status: 'Active' }
  ]);

  const [mtpPermits, setMtpPermits] = useState([
    { id: 'MTP-25-001', prepName: 'Sura (Ayurvedic Medicinal Prep)', spiritType: 'Rectified Spirit 95%', quotaRequested: '5000 L', status: 'Approved', balance: '2450 L' },
    { id: 'MTP-25-002', prepName: 'Eucalyptus Hand Disinfectant Formulation', spiritType: 'Absolute Alcohol 99%', quotaRequested: '12000 L', status: 'Approved', balance: '8100 L' },
    { id: 'MTP-25-003', prepName: 'Homeopathic Ashwagandha Tincture', spiritType: 'Extra Neutral Alcohol (ENA)', quotaRequested: '3000 L', status: 'Under Review', balance: '0 L' }
  ]);

  // Search filter query states
  const [licenseSearch, setLicenseSearch] = useState('');
  const [premiseSearch, setPremiseSearch] = useState('');
  const [dealerSearch, setDealerSearch] = useState('');
  const [mtpSearch, setMtpSearch] = useState('');

  // License category/sub-tab selection state
  const [licenseSubTab, setLicenseSubTab] = useState('New Licenses');
  const [licenseDropdownOpen, setLicenseDropdownOpen] = useState(false);

  // M&TP dropdown and sub-tab states
  const [mtpDropdownOpen, setMtpDropdownOpen] = useState(false);
  const [mtpSubTab, setMtpSubTab] = useState('New M&TP');

  // Dealer dropdown and sub-tab states
  const [dealerDropdownOpen, setDealerDropdownOpen] = useState(false);
  const [dealerSubTab, setDealerSubTab] = useState('Dealer Registration');

  // Profile dropdown and sub-tab states
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileSubTab, setProfileSubTab] = useState('Profile Detail');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Secondary sub-tab states
  const [renewals, setRenewals] = useState([
    { id: 'REN-25-0941', licenseId: 'ND-25-L10023', status: 'Pending Approval', requestedOn: '18 May 2026', duration: '1 Year' }
  ]);
  const [transfers, setTransfers] = useState([
    { id: 'TRF-25-1092', licenseId: 'ND-25-L15004', fromPremises: 'Model Town Warehouse A', toPremises: 'Ansal Plaza Suite 4', status: 'Approved', requestDate: '10 Apr 2026' }
  ]);
  const [documents, setDocuments] = useState([
    { id: 'DOC-01', name: 'Identity Proof / Aadhaar Copy', status: 'Verified', lastUploaded: '2026-01-10' },
    { id: 'DOC-02', name: 'NCT Police Clearance Certificate (PCC)', status: 'Verified', lastUploaded: '2026-01-14' },
    { id: 'DOC-03', name: 'Municipal Fire NOC Copy', status: 'Re-upload Requested', lastUploaded: '2026-01-15' },
    { id: 'DOC-04', name: 'Registered Lease Agreement / Ownership Deed', status: 'Verified', lastUploaded: '2026-01-18' }
  ]);

  // --- RESTORED FORM CREATION STATES ---
  const [newLicenseForm, setNewLicenseForm] = useState({ type: 'L-1 Wholesale FL', premises: '123, Model Town, Phase II', duration: '1 Year' });
  const [newRenewalForm, setNewRenewalForm] = useState({ licenseId: 'ND-25-L10023', duration: '1 Year', remarks: '' });
  const [newTransferForm, setNewTransferForm] = useState({ licenseId: 'ND-25-L10023', targetPremises: 'B-4, Ansal Plaza Shopping Arcade', reason: '' });
  const [newDocRevalForm, setNewDocRevalForm] = useState({ docId: 'DOC-03', fileName: '' });
  const [trackApplicantId, setTrackApplicantId] = useState('');

  const [newPremiseForm, setNewPremiseForm] = useState({ address: '', subDivision: 'Civil Lines' });
  const [newDealerForm, setNewDealerForm] = useState({ dealerId: 'DL-7730', quota: '500' });
  const [newMtpForm, setNewMtpForm] = useState({ prepName: '', spiritType: 'Rectified Spirit 95%', quota: '' });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const triggerToast = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => {
      setSaveMessage('');
    }, 4000);
  };

  // --- MENU ITEMS DEFINITION ---
  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'License', label: 'License', icon: Award },
    { id: 'MTP', label: 'M&TP', icon: FlaskConical },
    { id: 'Dealer', label: 'Dealer', icon: Store },
    { id: 'Profile', label: 'Profile & Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 relative flex flex-col font-sans antialiased text-slate-800 text-left">
      
      {/* Premium Backdrop Glow Effects */}
      <div className="absolute top-[20%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-r from-blue-300/10 to-[#ffd700]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[50%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-[#012a52]/5 to-indigo-300/5 blur-3xl pointer-events-none -z-10" />
      
      {/* Sticky Delhi Excise High-Fidelity Header Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/60 shadow-xs transition-all flex flex-col">
        <div className="max-w-[1300px] w-full mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Delhi National Emblem Logo & Brand Container */}
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-95 transition-all text-left" onClick={onNavigateToHome}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India"
              className="h-12 sm:h-14 w-auto object-contain mr-1 filter transition-all duration-300 hover:scale-[1.03]"
            />

            <div className="flex flex-col items-start justify-center text-left">
              <h1 className="text-base sm:text-lg md:text-xl font-black text-[#0f2a52] tracking-tight leading-tight select-none">Department of Excise</h1>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide mt-0.5 select-none font-sans">Government of NCT of Delhi</p>
            </div>
          </div>

          {/* Minimal Top Header Actions */}
          <div className="flex items-center gap-3">
            {/* Logout button (Circle Power and Log Out Label) */}
            <button 
              type="button" 
              onClick={onLogout}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0f2a52] flex items-center justify-center text-[#0f2a52] group-hover:bg-[#0f2a52] group-hover:text-white transition-all duration-300 shadow-xs flex-shrink-0">
                <Power className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <span className="text-xs font-black text-[#0f2a52] hover:text-amber-600 transition-colors uppercase hidden sm:inline">
                Log Out
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Horizontal Menu Bar at the top of the page under header */}
        <div className="bg-white border-b border-slate-200/55 text-[#0f2a52] select-none shadow-xs py-4">
          <div className="max-w-[1300px] mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 w-full h-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                
                if (item.id === 'License') {
                  return (
                    <div
                      key={item.id}
                      className="relative w-full group"
                      onMouseEnter={() => setLicenseDropdownOpen(true)}
                      onMouseLeave={() => setLicenseDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('License');
                          setLicenseDropdownOpen(!licenseDropdownOpen);
                        }}
                        className={`w-full px-2 sm:px-4 py-4 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ff7e01] text-white shadow-sm font-black' 
                            : 'hover:bg-slate-50 text-[#0f2a52]/85 hover:text-[#0f2a52] border border-slate-100/50 hover:border-slate-200/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-1 min-w-[220px] sm:min-w-[265px] max-w-[calc(100vw-32px)] bg-white text-slate-800 rounded-2xl shadow-xl py-2.5 border border-slate-200/85 z-50 text-left ${
                          licenseDropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'
                        }`}
                      >
                        {[
                          { id: 'New Licenses', label: 'New Licenses' },
                          { id: 'Applied Licenses', label: 'Applied Licenses' },
                          { id: 'Renewal Licenses', label: 'Renewal Licenses' },
                          { id: 'License Transfer', label: 'License Transfer' },
                          { id: 'Document Revalidation', label: 'Document Revalidation' },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('License');
                              setLicenseSubTab(sub.id);
                              setLicenseDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3.5 text-[15px] font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between ${
                              activeTab === 'License' && licenseSubTab === sub.id
                                ? 'bg-emerald-50 text-[#0f2a52] font-black'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f2a52]'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {activeTab === 'License' && licenseSubTab === sub.id && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7e01]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.id === 'Profile') {
                  return (
                    <div
                      key={item.id}
                      className="relative w-full group"
                      onMouseEnter={() => setProfileDropdownOpen(true)}
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('Profile');
                          setProfileDropdownOpen(!profileDropdownOpen);
                        }}
                        className={`w-full px-2 sm:px-4 py-4 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ff7e01] text-white shadow-sm font-black' 
                            : 'hover:bg-slate-50 text-[#0f2a52]/85 hover:text-[#0f2a52] border border-slate-100/50 hover:border-slate-200/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-1 min-w-[200px] bg-white text-slate-800 rounded-2xl shadow-xl py-2.5 border border-slate-200/85 z-50 text-left ${
                          profileDropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'
                        }`}
                      >
                        {[
                          { id: 'Profile Detail', label: 'Profile' },
                          { id: 'Change Password', label: 'Change Password' },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('Profile');
                              setProfileSubTab(sub.id);
                              setProfileDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between ${
                              activeTab === 'Profile' && profileSubTab === sub.id
                                ? 'bg-amber-50 text-[#0f2a52] font-black'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f2a52]'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {activeTab === 'Profile' && profileSubTab === sub.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e01]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.id === 'MTP') {
                  return (
                    <div
                      key={item.id}
                      className="relative w-full group"
                      onMouseEnter={() => setMtpDropdownOpen(true)}
                      onMouseLeave={() => setMtpDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('MTP');
                          setMtpDropdownOpen(!mtpDropdownOpen);
                        }}
                        className={`w-full px-2 sm:px-4 py-4 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ff7e01] text-white shadow-sm font-black' 
                            : 'hover:bg-slate-50 text-[#0f2a52]/85 hover:text-[#0f2a52] border border-slate-100/50 hover:border-slate-200/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-1 min-w-[200px] bg-white text-slate-800 rounded-2xl shadow-xl py-2.5 border border-slate-200/85 z-50 text-left ${
                          mtpDropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'
                        }`}
                      >
                        {[
                          { id: 'New M&TP', label: 'New M&TP' },
                          { id: 'Applied M&TP', label: 'Applied M&TP' },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('MTP');
                              setMtpSubTab(sub.id);
                              setMtpDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3.5 text-[15px] font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between ${
                              activeTab === 'MTP' && mtpSubTab === sub.id
                                ? 'bg-[#ebf3fc] text-[#0f2a52] font-black'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f2a52]'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {activeTab === 'MTP' && mtpSubTab === sub.id && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7e01]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.id === 'Dealer') {
                  return (
                    <div
                      key={item.id}
                      className="relative w-full group"
                      onMouseEnter={() => setDealerDropdownOpen(true)}
                      onMouseLeave={() => setDealerDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('Dealer');
                          setDealerDropdownOpen(!dealerDropdownOpen);
                        }}
                        className={`w-full px-2 sm:px-4 py-4 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ff7e01] text-white shadow-sm font-black' 
                            : 'hover:bg-slate-50 text-[#0f2a52]/85 hover:text-[#0f2a52] border border-slate-100/50 hover:border-slate-200/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-1 min-w-[200px] bg-white text-slate-800 rounded-2xl shadow-xl py-2.5 border border-slate-200/85 z-50 text-left ${
                          dealerDropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'
                        }`}
                      >
                        {[
                          { id: 'Dealer Registration', label: 'Dealer Registration' },
                          { id: 'Applied Dealers', label: 'Applied Dealers' },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('Dealer');
                              setDealerSubTab(sub.id);
                              setDealerDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3.5 text-[15px] font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between ${
                              activeTab === 'Dealer' && dealerSubTab === sub.id
                                ? 'bg-[#ebf3fc] text-[#0f2a52] font-black'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f2a52]'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {activeTab === 'Dealer' && dealerSubTab === sub.id && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7e01]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-2 sm:px-4 py-4 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#ff7e01] text-white shadow-sm font-black' 
                        : 'hover:bg-slate-50 text-[#0f2a52]/85 hover:text-[#0f2a52] border border-slate-100/50 hover:border-slate-200/70'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-6 py-6 md:py-8 flex flex-col justify-start items-stretch space-y-6 overflow-y-auto">

        {/* Toast Save Alert Indicator */}
        {saveMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-800 shadow-sm animate-fade-in flex-shrink-0">
            <div className="p-1.5 rounded-lg bg-emerald-500 text-white flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-wide">{saveMessage}</span>
          </div>
        )}

        {/* CONDITIONAL RENDER BY TABS */}
        
        {/* TAB 1: HOME */}
        {activeTab === 'Home' && (
          <div className="space-y-6 animate-fade-in text-left">
            
            {/* 1. HIGH-FIDELITY APPLICANT PROFILE WELCOME BANNER */}
            <div className="relative bg-[#ebf3fc] rounded-3xl p-6 sm:p-8 md:pb-12 text-slate-800 overflow-hidden shadow-xs border border-blue-100/50 min-h-[160px] md:min-h-[190px] flex flex-col justify-center">
              
              {/* High-Fidelity India Gate Heritage Image Overlay across entire banner */}
              <div className="absolute inset-0 w-full opacity-35 pointer-events-none mix-blend-multiply flex items-end justify-end select-none">
                <img 
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800" 
                  alt="India Gate Delhi"
                  className="w-full h-full object-cover object-right rounded-3xl brightness-75 contrast-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Core Content Layout of Welcome Banner */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 text-left">
                
                {/* Left Profile Icon in Teal color frame */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-[#0d9488] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <User className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

                {/* Mid Section: Headings */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0f2a52] tracking-tight">
                    Welcome, {profile.firstName} {profile.lastName}! <span className="inline-block animate-bounce">👋</span>
                  </h2>
                  <p className="text-xs sm:text-xs text-slate-500 font-bold max-w-xl">
                    Manage your profile, licenses, premises and applications seamlessly.
                  </p>
                  
                  {/* Real-time Subtitles */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1.5 text-[11px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {profile.occupation}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.district}, {profile.stateUt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row of quotes and status badges aligned on bottom */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
                {/* Mantra Card on bottom-left */}
                <div className="bg-white/90 border border-blue-200/50 rounded-2xl p-3 max-w-sm shadow-xs flex flex-col text-left">
                  <p className="text-[10px] font-extrabold text-blue-600 italic">
                    " Accurate information today, Seamless services tomorrow. "
                  </p>
                  <span className="text-[8px] font-black uppercase text-blue-500/80 tracking-widest mt-1">
                    Excise Citizen Portal Mantra
                  </span>
                </div>
              </div>

            </div>

            {/* 2. PREMIUM STATISTIC METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              
              {/* Card 1: My Applications */}
              <div 
                className="bg-white border border-slate-200/50 rounded-3xl p-5 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">My Applications</span>
                    <h3 className="text-3xl font-black text-[#0f2a52] leading-none mt-1">{licenses.length + 9}</h3>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Total Active Filings</span>
                  </div>
                </div>
              </div>
 
              {/* Card 2: Active Licenses */}
              <div 
                className="bg-white border border-slate-200/50 rounded-3xl p-5 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Active Licenses</span>
                    <h3 className="text-3xl font-black text-[#0f2a52] leading-none mt-1 font-mono">
                      0{licenses.filter(l => l.status === 'Approved').length}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Excise Permits Valid</span>
                  </div>
                </div>
              </div>
 
              {/* Card 3: Premises */}
              <div 
                className="bg-white border border-[#012a52]/10 rounded-3xl p-5 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#012a52]/60 uppercase tracking-wider block">Premises</span>
                    <h3 className="text-3xl font-black text-[#0f2a52] leading-none mt-1 font-mono">
                      0{premises.length}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Registered Sites</span>
                  </div>
                </div>
              </div>
 
              {/* Card 4: M&TP Permits */}
              <div 
                className="bg-white border border-[#012a52]/10 rounded-3xl p-5 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#012a52]/60 uppercase tracking-wider block">M&TP Permits</span>
                    <h3 className="text-3xl font-black text-[#0f2a52] leading-none mt-1 font-mono">
                      0{mtpPermits.length}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Alcohol Quotas</span>
                  </div>
                </div>
              </div>
 
            </div>

            {/* Home Portal Directives Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5 text-blue-900">
                  <Info className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Citizen Advisory Panel</h3>
                </div>
              </div>
              <div className="md:w-80 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LICENSE */}
        {activeTab === 'License' && (
          <div className="space-y-6 animate-fade-in text-left">

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Contextual Dynamic Registry Directory */}
              <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                
                {/* Mode header rendering */}
                {licenseSubTab === 'New Licenses' && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="text-sm font-black text-[#012a52] uppercase tracking-wider">My Active Approved Licenses</h4>
                        <p className="text-xs text-slate-400 font-bold mt-0.2">Officially issued and operating excise certificates.</p>
                      </div>
                      
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input 
                          type="text"
                          placeholder="Search active..."
                          value={licenseSearch}
                          onChange={(e) => setLicenseSearch(e.target.value)}
                          className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {licenses
                        .filter(l => l.status === 'Approved')
                        .filter(l => l.type.toLowerCase().includes(licenseSearch.toLowerCase()) || l.id.toLowerCase().includes(licenseSearch.toLowerCase()))
                        .map((lic) => (
                          <div key={lic.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1 text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded bg-[#ebf3fc] text-[#0f2a52] text-[10px] font-black uppercase tracking-widest">{lic.id}</span>
                                <span className="text-xs font-black text-slate-800">{lic.type}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 font-sans">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> registered unit: {lic.premises}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 font-sans">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" /> validity span: {lic.issued} to {lic.expiry}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-250">
                                {lic.status}
                              </span>
                              <button
                                onClick={() => triggerToast(`Downloading secure PDF receipt for ${lic.id}...`)}
                                className="p-1 px-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" /> PDF
                              </button>
                            </div>
                          </div>
                        ))}

                      {licenses.filter(l => l.status === 'Approved').length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6 font-bold">No active approved licenses matching criteria.</p>
                      )}
                    </div>
                  </>
                )}

                {licenseSubTab === 'Applied Licenses' && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Application Filings Under Review</h4>
                        <p className="text-xs text-slate-400 font-bold mt-0.2">In-progress proposals currently being inspected by local commissioners.</p>
                      </div>
                      
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input 
                          type="text"
                          placeholder="Search filings..."
                          value={licenseSearch}
                          onChange={(e) => setLicenseSearch(e.target.value)}
                          className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {licenses
                        .filter(l => l.status === 'Under Review')
                        .filter(l => l.type.toLowerCase().includes(licenseSearch.toLowerCase()) || l.id.toLowerCase().includes(licenseSearch.toLowerCase()))
                        .map((lic) => (
                          <div key={lic.id} className="p-4 border border-blue-105 bg-blue-50/15 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1 text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#012a52] text-[10px] font-black uppercase tracking-widest">{lic.id}</span>
                                <span className="text-xs font-black text-slate-800">{lic.type}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> site premises: {lic.premises}
                              </p>
                              <span className="text-[10px] text-orange-600 font-black tracking-wide block uppercase">
                                Action Required: Verification Pending Inspection
                              </span>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-205 animate-pulse">
                                {lic.status}
                              </span>
                            </div>
                          </div>
                        ))}

                      {licenses.filter(l => l.status === 'Under Review').length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6 font-bold">No active pending filings found.</p>
                      )}
                    </div>
                  </>
                )}

                {licenseSubTab === 'Renewal Licenses' && (
                  <>
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-sm font-black text-[#012a52] uppercase tracking-wider">License Renewal Petitions</h4>
                      <p className="text-xs text-slate-400 font-bold mt-0.2">Historic and active validation extension dockets filed with Delhi State.</p>
                    </div>

                    <div className="space-y-4">
                      {renewals.map((ren) => (
                        <div key={ren.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#012a52] text-[10px] font-black uppercase tracking-widest">{ren.id}</span>
                              <span className="text-xs font-black text-slate-800">Renewal requested for: {ren.licenseId}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                              Requested On: {ren.requestedOn} | Duration requested: {ren.duration}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            {ren.status}
                          </span>
                        </div>
                      ))}

                      {renewals.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6 font-bold">No renewal requests registered currently.</p>
                      )}
                    </div>
                  </>
                )}

                {licenseSubTab === 'License Transfer' && (
                  <>
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Ownership & Premise Relocation Logs</h4>
                      <p className="text-xs text-slate-400 font-bold mt-0.2">Registered history of transfer mandates for active establishments.</p>
                    </div>

                    <div className="space-y-4">
                      {transfers.map((trf) => (
                        <div key={trf.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100/50 pb-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded bg-[#ebf3fc] text-[#0f2a52] text-[10px] font-black uppercase tracking-widest">{trf.id}</span>
                              <span className="text-xs font-black text-slate-800">License: {trf.licenseId}</span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-250">
                              {trf.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                            <div className="bg-slate-100/40 p-2.5 rounded-xl">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase block font-sans">Transferred From:</span>
                              <p className="text-slate-800 truncate font-sans">{trf.fromPremises}</p>
                            </div>
                            <div className="bg-slate-100/40 p-2.5 rounded-xl">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase block font-sans">Transferred To Target:</span>
                              <p className="text-[#0f2a52] truncate font-sans">{trf.toPremises}</p>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold italic font-sans text-right">Filed on {trf.requestDate}</p>
                        </div>
                      ))}

                      {transfers.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6 font-bold">No relocation/transfer records logged yet.</p>
                      )}
                    </div>
                  </>
                )}

                {licenseSubTab === 'Document Revalidation' && (
                  <>
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Required Compliance Dossiers Checklist</h4>
                      <p className="text-xs text-slate-400 font-bold mt-0.2">Mandatory proofs filed with the Department of Excise inspectors.</p>
                    </div>

                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#012a52] text-[10px] font-black uppercase tracking-widest">{doc.id}</span>
                              <span className="text-xs font-black text-slate-800">{doc.name}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold">Last modified physical scanning date: {doc.lastUploaded}</p>
                          </div>
                          
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            doc.status.includes('Verified') 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-250' 
                              : doc.status.includes('Requested') 
                                ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                                : 'bg-amber-100 text-amber-800 border-amber-250'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </div>

              {/* Right Column: Contextually Swapped Action forms */}
              <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col h-fit">
                
                {licenseSubTab === 'New Licenses' && (
                  <form onSubmit={handleApplyLicense} className="space-y-5 text-left">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Excise Application</h3>
                      <p className="text-[11px] text-slate-400 font-bold">Request a new commercial/wholesale liquor license.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">License Category</label>
                      <select
                        value={newLicenseForm.type}
                        onChange={(e) => setNewLicenseForm({ ...newLicenseForm, type: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                      >
                        <option value="L-1 Wholesale FL">L-1 (Wholesale of Foreign Liquor)</option>
                        <option value="L-2 Retail Vend">L-2 (Retail Store Vend)</option>
                        <option value="L-15 Hotel Tavern">L-15 (Hotel Tavern & Lounge Bar)</option>
                        <option value="L-22 Special Club">L-22 (Authorized Member Club Permit)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Proposed Registered Location</label>
                      <select
                        value={newLicenseForm.premises}
                        onChange={(e) => setNewLicenseForm({ ...newLicenseForm, premises: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                      >
                        {premises.map(p => (
                          <option key={p.id} value={p.address}>{p.address.substring(0, 30)}... ({p.id})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">License Duration Mode</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['1 Year', '3 Years', '5 Years'].map((dir) => (
                          <button
                            key={dir}
                            type="button"
                            onClick={() => setNewLicenseForm({ ...newLicenseForm, duration: dir })}
                            className={`p-2 border rounded-xl text-[10px] font-extrabold uppercase tracking-wide cursor-pointer ${
                              newLicenseForm.duration === dir 
                                ? 'bg-[#0f2a52] text-white border-transparent' 
                                : 'border-slate-250 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {dir}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/50 rounded-2xl text-[10px] text-blue-900 border border-blue-500/10 flex gap-2">
                      <Lock className="w-3.5 h-3.5 text-blue-800 flex-shrink-0 mt-0.5" />
                      <span className="font-bold">Applications incur structural NCT application fees. Digital crypto signature stamp will be verification checked on dispatch.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <Plus className="w-4 h-4" /> Submit License Application
                    </button>
                  </form>
                )}

                {licenseSubTab === 'Applied Licenses' && (
                  <div className="space-y-5 text-left">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Fast-Track Status Tracker</h3>
                      <p className="text-[11px] text-slate-400 font-bold">Query excise filing benchmarks using the unique registration sequence reference.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Application Filings Reference</label>
                      <input 
                        type="text"
                        placeholder="e.g. ND-25-L22099"
                        value={trackApplicantId}
                        onChange={(e) => setTrackApplicantId(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 uppercase"
                      />
                    </div>

                    {/* Step layout display */}
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Procedural Status Steps</p>
                      
                      <div className="space-y-3 font-sans">
                        <div className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black mt-0.5 flex-shrink-0">✓</div>
                          <div className="font-bold">
                            <p className="text-[#012a52]">Licensing File Compiled</p>
                            <span className="text-[9px] text-slate-400 font-medium">Stage 1 - Citizen portal upload</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black mt-0.5 flex-shrink-0">✓</div>
                          <div className="font-bold">
                            <p className="text-[#012a52]">Challan Receipts Reconstructed</p>
                            <span className="text-[9px] text-slate-400 font-medium">Stage 2 - Verification of treasury records</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[8px] font-black mt-0.5 flex-shrink-0">•</div>
                          <div className="font-bold">
                            <p className="text-[#012a52] animate-pulse">Physical Site Inspection</p>
                            <span className="text-[9px] text-orange-600 font-black">Stage 3 - In Progress (By Sub-division Inspector)</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs text-slate-350 font-bold">
                          <div className="w-4 h-4 rounded-full border border-slate-200 text-white flex items-center justify-center text-[8px] mt-0.5 flex-shrink-0">4</div>
                          <div>
                            <p className="text-slate-400">Excise Stamp Dispatched</p>
                            <span className="text-[9px] text-slate-300 font-normal">Stage 4 - Certificate ready</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        triggerToast(`Checking real-time database state for ID: ${trackApplicantId || 'ND-25-L22099'}`);
                      }}
                      className="w-full py-2.5 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider text-center"
                    >
                      Connect with Excise Registry
                    </button>
                  </div>
                )}

                {licenseSubTab === 'Renewal Licenses' && (
                  <form onSubmit={handleApplyRenewal} className="space-y-5 text-left font-sans">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">License Renewal Docket</h3>
                      <p className="text-[11px] text-slate-400 font-bold">Extend the validity period of your active excise clearance.</p>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Select Expiring License</label>
                      <select
                        value={newRenewalForm.licenseId}
                        onChange={(e) => setNewRenewalForm({ ...newRenewalForm, licenseId: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      >
                        {licenses.filter(l => l.status === 'Approved').map(l => (
                          <option key={l.id} value={l.id}>{l.id} - {l.type.substring(0, 18)}...</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Renewal Mode Span</label>
                      <select
                        value={newRenewalForm.duration}
                        onChange={(e) => setNewRenewalForm({ ...newRenewalForm, duration: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      >
                        <option value="1 Year">Extend by 1 Year (Standard Mode)</option>
                        <option value="3 Years">Extend by 3 Years (Premium Multi-Year)</option>
                        <option value="5 Years">Extend by 5 Years (Maximum Span)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Audit Remarks</label>
                      <input 
                        type="text"
                        placeholder="No structural premise modifications"
                        value={newRenewalForm.remarks}
                        onChange={(e) => setNewRenewalForm({ ...newRenewalForm, remarks: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold placeholder-slate-400 font-sans"
                      />
                    </div>

                    <div className="p-3 bg-teal-50 rounded-2xl text-[10px] text-teal-900 border border-teal-500/10 flex gap-2">
                      <Lock className="w-3.5 h-3.5 text-teal-800 flex-shrink-0 mt-0.5" />
                      <span className="font-bold">Renewals require matching annual clearance certificates from municipal fire and water boards.</span>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Submit Renewal Petition
                    </button>
                  </form>
                )}

                {licenseSubTab === 'License Transfer' && (
                  <form onSubmit={handleApplyTransfer} className="space-y-5 text-left font-sans">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Premises Transfer Flow</h3>
                      <p className="text-[11px] text-slate-400 font-bold">Shift an existing license registry to a newly verified outlet.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Source License</label>
                      <select
                        value={newTransferForm.licenseId}
                        onChange={(e) => setNewTransferForm({ ...newTransferForm, licenseId: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      >
                        {licenses.filter(l => l.status === 'Approved').map(l => (
                          <option key={l.id} value={l.id}>{l.id} - {l.type.substring(0, 18)}...</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Target Outlet Venue</label>
                      <select
                        value={newTransferForm.targetPremises}
                        onChange={(e) => setNewTransferForm({ ...newTransferForm, targetPremises: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      >
                        {premises.map(p => (
                          <option key={p.id} value={p.address}>{p.address.substring(0, 30)}... ({p.id})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Justification Reason</label>
                      <input 
                        type="text"
                        placeholder="Lease expiry on current depot"
                        value={newTransferForm.reason}
                        onChange={(e) => setNewTransferForm({ ...newTransferForm, reason: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold placeholder-slate-400 font-sans"
                        required
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-2xl text-[10px] text-amber-900 border border-amber-500/10 flex gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-800 flex-shrink-0 mt-0.5" />
                      <span className="font-bold">Ownership transitions must match legal deeds precisely. Retain older files until clearance approval notice arrives.</span>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Initiate Relocation Request
                    </button>
                  </form>
                )}

                {licenseSubTab === 'Document Revalidation' && (
                  <form onSubmit={handleRevalidateDoc} className="space-y-5 text-left font-sans">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider font-sans">Revalidation Portal</h3>
                      <p className="text-[11px] text-slate-400 font-bold">Submit updated scans to override rejected/expired files.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">Dossier File Code</label>
                      <select
                        value={newDocRevalForm.docId}
                        onChange={(e) => setNewDocRevalForm({ ...newDocRevalForm, docId: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      >
                        {documents.map(d => (
                          <option key={d.id} value={d.id}>{d.id} - {d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block">File Attachment Name</label>
                      <input
                        type="text"
                        placeholder="e.g. municipal_firenoc_v5_2026.pdf"
                        value={newDocRevalForm.fileName}
                        onChange={(e) => setNewDocRevalForm({ ...newDocRevalForm, fileName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold placeholder-slate-400 font-sans"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Upload & Revalidate Dossier
                    </button>
                  </form>
                )}

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PREMISE */}
        {activeTab === 'Premise' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Registered Locations Directory */}
              <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Registered Outlets & Offices</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.2">Authorized premises verified under municipal safety & police clearances.</p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search premises..."
                      value={premiseSearch}
                      onChange={(e) => setPremiseSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {premises
                    .filter(p => p.address.toLowerCase().includes(premiseSearch.toLowerCase()) || p.id.toLowerCase().includes(premiseSearch.toLowerCase()))
                    .map((prem) => (
                      <div key={prem.id} className="p-4 border border-slate-100 bg-slate-50/40 rounded-2xl space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100/50 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#012a52] text-[10px] font-black uppercase tracking-widest">{prem.id}</span>
                            <span className="text-xs font-black text-[#012a52]">{prem.subDivision} Zone</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            prem.status === 'Registered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {prem.status}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold">
                          <p className="text-slate-700 italic max-w-md font-sans">"{prem.address}"</p>
                          <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-wider text-slate-400">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className={`w-3.5 h-3.5 ${prem.policeClearance === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`} />
                              Police: {prem.policeClearance}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileCheck className={`w-3.5 h-3.5 ${prem.fireNoc === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`} />
                              Fire NOC: {prem.fireNoc}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {premises.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 font-bold">No registered premises record.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Add Premise */}
              <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-3xl p-6">
                <form onSubmit={handleRegisterPremise} className="space-y-5 text-left">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Register Site</h3>
                    <p className="text-[11px] text-slate-400 font-bold">Declare a proposed commercial warehouse location.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-[#012a52] block">Street Address</label>
                    <textarea
                      placeholder="e.g. Shop G-12, Sector 9, Rohini, New Delhi"
                      value={newPremiseForm.address}
                      onChange={(e) => setNewPremiseForm({ ...newPremiseForm, address: e.target.value })}
                      rows={3}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-[#012a52] block">Delhi Administrative Sub-Division</label>
                    <select
                      value={newPremiseForm.subDivision}
                      onChange={(e) => setNewPremiseForm({ ...newPremiseForm, subDivision: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="Civil Lines">Civil Lines</option>
                      <option value="Chanakyapuri">Chanakyapuri</option>
                      <option value="Defence Colony">Defence Colony</option>
                      <option value="Karol Bagh">Karol Bagh</option>
                      <option value="Vasant Vihar">Vasant Vihar</option>
                    </select>
                  </div>

                  <div className="p-3 bg-amber-50/50 rounded-2xl text-[10px] text-amber-900 border border-amber-500/10 flex gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-800 flex-shrink-0 mt-0.5" />
                    <span className="font-bold">By registering this address, you authorize site inspections from the NCT Excise Inspector Squad.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0f2a52] hover:bg-[#ff7e01] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Register Site Premises
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: DEALER */}
        {activeTab === 'Dealer' && (
          <div className="space-y-6 animate-fade-in text-left">
            {dealerSubTab === 'Dealer Registration' ? (
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Main Column: Wholesaler Linkage Form */}
                <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 font-sans">
                  <form onSubmit={handleLinkDealer} className="space-y-6 text-left font-sans">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-base font-black text-[#012a52] uppercase tracking-wider text-left">Wholesaler Linkage / Dealer Registration</h3>
                      <p className="text-xs text-slate-400 font-bold text-left font-sans">Propose a secure supply channel linkage with registered wholesale depots in Delhi.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Select Wholesaler</label>
                      <select
                        value={newDealerForm.dealerId}
                        onChange={(e) => setNewDealerForm({ ...newDealerForm, dealerId: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans"
                      >
                        {dealers.map(d => (
                          <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Monthly Quota Request (Bulk Litres)</label>
                      <input
                        type="number"
                        placeholder="e.g. 1500"
                        value={newDealerForm.quota}
                        onChange={(e) => setNewDealerForm({ ...newDealerForm, quota: e.target.value })}
                        min="100"
                        max="100000"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder-slate-400 font-sans"
                        required
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl text-xs text-blue-900 border border-blue-500/15 flex gap-2.5">
                      <Lock className="w-5 h-5 text-blue-800 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-blue-950 font-sans">Procurement Bond Regulatory Guidance</span>
                        <p className="text-[11px] text-blue-900/80 font-semibold mt-1 font-sans">Affiliation provides automated stock ledger sync inside your retail pass modules. Once established, dispatch permits will be routed in real-time under NCT excise control.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#ff7e01] hover:bg-[#0f2a52] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 font-sans"
                      >
                        <Plus className="w-4 h-4" /> Establish Procurement Bond
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Column: Advisory / Guidelines */}
                <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                  <div className="border-b border-slate-100 pb-3 text-left">
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Dealer Guidance</h3>
                    <p className="text-[11px] text-slate-400 font-bold font-sans">Key steps to link external logistics supply and wholesale networks.</p>
                  </div>

                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase text-amber-600 block">Quota Verification</span>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed font-sans">Requests for bulk quotas are automatically checked against your base license limit criteria before final verification.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1 font-sans">
                      <span className="text-[10px] font-black uppercase text-amber-600 block">Regulatory Clearances</span>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed font-sans">Each linkage submission has to be acknowledged by the target wholesale dealer before the system processes status changes.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Display Applied Dealers */
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Applied & Associated Wholesale Dealers</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.2">Authorized supply depots in Delhi providing stock distribution channels.</p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search distributors..."
                      value={dealerSearch}
                      onChange={(e) => setDealerSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-4 font-sans">
                  {dealers
                    .filter(d => d.name.toLowerCase().includes(dealerSearch.toLowerCase()) || d.id.toLowerCase().includes(dealerSearch.toLowerCase()) || d.location.toLowerCase().includes(dealerSearch.toLowerCase()))
                    .map((deal) => (
                      <div key={deal.id} className="p-4 border border-slate-100 bg-slate-50/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-slate-50/70 font-sans">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-widest">{deal.id}</span>
                            <h4 className="text-xs font-black text-slate-800">{deal.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 font-sans">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Depot Zone: {deal.location}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold font-sans">
                            Excise License Ref: <span className="text-[#012a52] font-semibold">{deal.licenseRef}</span>
                          </p>
                        </div>

                        <div className="text-right sm:self-auto self-end flex items-center gap-2 text-xs font-extrabold text-slate-800">
                          <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm uppercase tracking-wider text-[10px] font-black">
                            {deal.status}
                          </span>
                        </div>
                      </div>
                    ))}

                  {dealers.filter(d => d.name.toLowerCase().includes(dealerSearch.toLowerCase()) || d.id.toLowerCase().includes(dealerSearch.toLowerCase()) || d.location.toLowerCase().includes(dealerSearch.toLowerCase())).length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 font-bold">No certified wholesalers found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: M&TP */}
        {activeTab === 'MTP' && (
          <div className="space-y-6 animate-fade-in text-left">
            {mtpSubTab === 'New M&TP' ? (
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Main Column: Spirit Indent Request */}
                <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 font-sans">
                  <form onSubmit={handleApplyMtp} className="space-y-6 text-left font-sans">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-base font-black text-[#012a52] uppercase tracking-wider text-left">Spirit Indent Request</h3>
                      <p className="text-xs text-slate-400 font-bold text-left font-sans">Request absolute alcohol allocation for pharmaceutical formulations under NCT of Delhi regulations.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Preparation Formulation Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Tincture Digitalis Co."
                        value={newMtpForm.prepName}
                        onChange={(e) => setNewMtpForm({ ...newMtpForm, prepName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder-slate-400 font-sans"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Alcohol Preparation Base Class</label>
                        <select
                          value={newMtpForm.spiritType}
                          onChange={(e) => setNewMtpForm({ ...newMtpForm, spiritType: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="Rectified Spirit 95%">Rectified Spirit 95% v/v</option>
                          <option value="Absolute Alcohol 99%">Absolute Alcohol 99%</option>
                          <option value="Extra Neutral Alcohol (ENA)">Extra Neutral Alcohol (ENA)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Quantity Requested (Litres)</label>
                        <input
                          type="number"
                          placeholder="e.g. 2500"
                          value={newMtpForm.quota}
                          onChange={(e) => setNewMtpForm({ ...newMtpForm, quota: e.target.value })}
                          min="50"
                          max="100000"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder-slate-400 font-sans"
                          required
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-2xl text-xs text-purple-900 border border-purple-500/15 flex gap-2.5">
                      <FlaskConical className="w-5 h-5 text-purple-800 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-purple-950 font-sans">M&TP Legal Act Of 1955 Compliance Statement</span>
                        <p className="text-[11px] text-purple-900/80 font-semibold mt-1 font-sans">This slot allocation follows strict, certified chemical inspector vetting. All formulation recipes submitted online are directly channeled to NCT Excise Central Laboratories for validation prior to stock issuance dispatch.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#ff7e01] hover:bg-[#0f2a52] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Submit Allocation Docket
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Column: Regulations Info Card */}
                <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                  <div className="border-b border-slate-100 pb-3 text-left">
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">M&TP Advisory Guideline</h3>
                    <p className="text-[11px] text-slate-400 font-bold font-sans">Key operational procedures for formulation license allocation holds.</p>
                  </div>

                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase text-amber-600 block">Vetting Lead Time</span>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed font-sans">Excise commission laboratory screening takes up to 14 working days. You can monitor progress securely within the "Applied M&TP" track state tab.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1 font-sans">
                      <span className="text-[10px] font-black uppercase text-amber-600 block">Required Logbooks</span>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed font-sans">Approved physical premises are required to regularly log precise raw inventory stock levels in Ledger Book Form No. 4 and Form No. 5.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1 font-sans">
                      <span className="text-[10px] font-black uppercase text-amber-600 block">Formulation Integrity</span>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed font-sans">Excise department agents carry out random laboratory inspection audits to verify that the spirit concentrations comply exactly with pharmacopoeia standards.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Display Applied M&TP */
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider">Medicinal & Toilet Preparations Permits</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.2">Rectified spirit allocations tracked under the M&TP Act laws.</p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search formulations..."
                      value={mtpSearch}
                      onChange={(e) => setMtpSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-4 font-sans">
                  {mtpPermits
                    .filter(m => m.prepName.toLowerCase().includes(mtpSearch.toLowerCase()) || m.spiritType.toLowerCase().includes(mtpSearch.toLowerCase()))
                    .map((item) => (
                      <div key={item.id} className="p-5 border border-slate-100 bg-slate-50/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-slate-50/70 font-sans">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 text-[10px] font-black uppercase tracking-widest">{item.id}</span>
                            <span className="text-sm font-black text-[#012a52]">{item.prepName}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-bold flex-wrap font-sans">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 font-semibold font-sans">Spirit Basis:</span>
                              <span className="text-slate-700 font-black font-sans">{item.spiritType}</span>
                            </div>
                            <span className="text-slate-200">|</span>
                            <div className="flex items-center gap-1.5 font-sans">
                              <span className="text-slate-400 font-semibold font-sans">Quota Size:</span>
                              <span className="text-slate-800 font-black font-sans">{item.quotaRequested}</span>
                            </div>
                            <span className="text-slate-200">|</span>
                            <div className="flex items-center gap-1.5 font-sans">
                              <span className="text-slate-400 font-semibold font-sans">Usable Balance:</span>
                              <span className="text-emerald-700 font-black font-sans">{item.balance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}

                  {mtpPermits.filter(m => m.prepName.toLowerCase().includes(mtpSearch.toLowerCase()) || m.spiritType.toLowerCase().includes(mtpSearch.toLowerCase())).length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-10 font-bold font-sans">No medicinal spirit formulations matched your search query.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: PROFILE */}
        {activeTab === 'Profile' && (
          <div className="space-y-6 animate-fade-in text-left">
            {profileSubTab === 'Profile Detail' ? (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                
                {/* Header inside settings panel */}
                <div className="bg-[#0f2a52] text-white p-5 flex items-center gap-3">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-left">Citizen Profile Registry & Secure Records</h3>
                    <p className="text-[11px] text-white/75 font-semibold text-left">Edit your certified credentials to update state government records in real time.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                  
                  {/* Section A: Personal Information */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4">
                      <User className="w-4 h-4 text-blue-900" />
                      <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">Citizen Identity Details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Legal First Name</label>
                        <input 
                          type="text" 
                          value={profile.firstName} 
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Last Name</label>
                        <input 
                          type="text" 
                          value={profile.lastName} 
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Father/Husband Name</label>
                        <input 
                          type="text" 
                          value={profile.fatherHusbandName} 
                          onChange={(e) => handleInputChange('fatherHusbandName', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Occupation</label>
                        <input 
                          type="text" 
                          value={profile.occupation} 
                          onChange={(e) => handleInputChange('occupation', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Date of Birth</label>
                        <input 
                          type="date" 
                          value={profile.dob} 
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Gender Selection</label>
                        <select
                          value={profile.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Addresses */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4">
                      <MapPin className="w-4 h-4 text-blue-900" />
                      <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">Communication & Registered Address</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Address Line 1</label>
                        <input 
                          type="text" 
                          value={profile.address1} 
                          onChange={(e) => handleInputChange('address1', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Address Line 2 (Landmark)</label>
                        <input 
                          type="text" 
                          value={profile.address2} 
                          onChange={(e) => handleInputChange('address2', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">State / UT Jurisdiction</label>
                        <input 
                          type="text" 
                          value={profile.stateUt} 
                          disabled
                          className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">District Zone</label>
                        <input 
                          type="text" 
                          value={profile.district} 
                          onChange={(e) => handleInputChange('district', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Administrative Subdivision</label>
                        <input 
                          type="text" 
                          value={profile.subDivision} 
                          onChange={(e) => handleInputChange('subDivision', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">PIN Code</label>
                        <input 
                          type="text" 
                          value={profile.pinCode} 
                          onChange={(e) => handleInputChange('pinCode', e.target.value)}
                          maxLength={6}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section C: Technical verification */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-blue-900" />
                      <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">Government Tax Authorities Matching</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">National PAN card Number</label>
                        <input 
                          type="text" 
                          value={profile.panNo} 
                          onChange={(e) => handleInputChange('panNo', e.target.value.toUpperCase())}
                          maxLength={10}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black font-sans uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Registered Mobile Contact (+91)</label>
                        <input 
                          type="tel" 
                          value={profile.mobileNo} 
                          onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Applicant Email Address</label>
                        <input 
                          type="email" 
                          value={profile.emailId} 
                          onChange={(e) => handleInputChange('emailId', e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit row */}
                  <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#ff7e01] hover:bg-[#0f2a52] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-sm cursor-pointer"
                    >
                      Save Citizen Legal Records
                    </button>
                  </div>

                </form>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs animate-fade-in">
                {/* Header inside settings panel */}
                <div className="bg-[#0f2a52] text-white p-5 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-left">Change Account Security Password</h3>
                    <p className="text-[11px] text-white/75 font-semibold text-left">Update your login security credentials to maintain NCT Delhi administrative standards.</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4">
                      <Lock className="w-4 h-4 text-blue-900" />
                      <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">Account Password Configuration</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Current Secure Password</label>
                        <input 
                          type="password" 
                          value={passwordForm.currentPassword} 
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">New Security Password</label>
                        <input 
                          type="password" 
                          value={passwordForm.newPassword} 
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-[#012a52] block text-left">Confirm New Password</label>
                        <input 
                          type="password" 
                          value={passwordForm.confirmPassword} 
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit row */}
                  <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#ff7e01] hover:bg-[#0f2a52] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-sm cursor-pointer"
                    >
                      Update Account Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Official Bottom Bar Footer, shifted firmly to the bottom */}
      <footer className="bg-[#061836] py-4 border-t border-white/5 w-full mt-auto flex-shrink-0">
        <div className="max-w-[1300px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 text-[10px] sm:text-xs text-center sm:text-left font-semibold">
            © 2025 Department of Excise, Government of NCT of Delhi. All Rights Reserved.
          </p>
          <p className="text-gray-400 text-[10px] sm:text-xs text-center sm:text-right font-semibold">
            Last Updated: 20 May 2025
          </p>
        </div>
      </footer>

    </div>
  );
}
