import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Search, 
  Filter, 
  Layers, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  FileText, 
  Printer, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  Building, 
  Building2, 
  Scale, 
  Truck, 
  Store, 
  Utensils, 
  Calendar, 
  Clock, 
  BadgeCheck, 
  ChevronDown, 
  ArrowRight, 
  Shield, 
  QrCode, 
  Laptop, 
  Landmark, 
  Users, 
  X, 
  Check, 
  FileCheck, 
  BookOpen, 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Server, 
  ShieldAlert 
} from 'lucide-react';

// Import authentic government HQ image
import hqImage from '../Style/Image/hqImage.jpg';

// Key Live Operational KPI Stats matching About e-Abkari design
const LICENSING_KPIS = [
  { 
    id: "licenses", 
    label: "Regulated Licenses & Permits", 
    value: "26", 
    change: "Active Classes", 
    icon: Store, 
    color: "#0284c7", 
    bg: "#e0f2fe", 
    note: "Wholesale, Retail, HCR & M&TP" 
  },
  { 
    id: "divisions", 
    label: "Major Statutory Divisions", 
    value: "4", 
    change: "Division I - IV", 
    icon: Layers, 
    color: "#d97706", 
    bg: "#fef3c7", 
    note: "Under Delhi Excise Rules, 2010" 
  },
  { 
    id: "workflow", 
    label: "e-Abkari Online Processing", 
    value: "100%", 
    change: "Paperless SLA", 
    icon: Laptop, 
    color: "#059669", 
    bg: "#d1fae5", 
    note: "End-to-End Digital Scrutiny & Sanction" 
  },
  { 
    id: "revenue", 
    label: "State Revenue Mobilized", 
    value: "₹7,250+ Cr", 
    change: "PAO Settled", 
    icon: Landmark, 
    color: "#4f46e5", 
    bg: "#e0e7ff", 
    note: "Direct Treasury State Receipts" 
  },
  { 
    id: "zones", 
    label: "Excise Administrative Zones", 
    value: "11", 
    change: "Full NCT Delhi", 
    icon: Building, 
    color: "#012a52", 
    bg: "#e2e8f0", 
    note: "Covering All 11 Revenue Districts" 
  },
  { 
    id: "traceability", 
    label: "QR Track-and-Trace", 
    value: "100%", 
    change: "Mandatory", 
    icon: QrCode, 
    color: "#0891b2", 
    bg: "#cffafe", 
    note: "2D Barcode Serialization Verified" 
  }
];

// 4 Major Statutory Divisions as defined in the official Excise Classification
export const LICENSE_MAJOR_DIVISIONS = [
  {
    id: 'wholesale',
    romanNumeral: 'I',
    title: 'Wholesale Licenses',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    accentColor: '#0284c7',
    description: 'Wholesale vends and registered bonded warehouse storage licenses for Indian Liquor, Foreign Liquor, and Country Liquor.',
    count: 3,
    codes: ['L1 & L31', 'L1F & L32', 'L3 & L33'],
    governingRules: 'Delhi Excise Rules, 2010 - Chapter III, Rules 23-28'
  },
  {
    id: 'hcr',
    romanNumeral: 'II',
    title: 'HCR (Hotel, Club & Restaurant)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accentColor: '#059669',
    description: 'On-premise service licenses for star hotels, guest houses, independent commercial restaurants, airport arrival/departure transit lounges, luxury tourist trains, and government/civil clubs.',
    count: 8,
    codes: ['L15 & L15F', 'L16 & L16F', 'L17 & L17F', 'L18 & L18F', 'L19 & L19F', 'L20 & L20F', 'L28 & L28F', 'L29 & L29F'],
    governingRules: 'Delhi Excise Rules, 2010 - Chapter IV, Rules 31-40'
  },
  {
    id: 'retail',
    romanNumeral: 'III',
    title: 'Retail Vends (Public Sector)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentColor: '#d97706',
    description: 'Public sector retail vends operated by Delhi State Undertakings (DTTDC, DSIIDC, DCCWS, DSCSC) for over-the-counter sale of sealed bottles at statutory MRP.',
    count: 3,
    codes: ['L6 & L6FG', 'L8', 'L8 & L14'],
    governingRules: 'Delhi Excise Rules, 2010 - Chapter V, Rules 45-52'
  },
  {
    id: 'mtp',
    romanNumeral: 'IV',
    title: 'M&TP (Medicinal & Industrial Spirit / Permits)',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    accentColor: '#7c3aed',
    description: 'Authorisation permits, industrial Specially Denatured Spirit (SDS) possession, pure rectified spirit, retail narcotic drugs, wholesale vends, and warehouses under M&TP Rules.',
    count: 12,
    codes: ['AP', 'P-6', 'P-2', 'P-3', 'P-4', 'P-5', 'DD-11', 'L34', 'L-5 & L-34', 'L25', 'L-4 & L-35', 'L-35'],
    governingRules: 'Medicinal and Toilet Preparations (Excise Duties) Act, 1955 & Delhi M&TP Rules'
  }
];

// Comprehensive Licenses Administered Directory Data (26 Classes across 4 Divisions)
const LICENSES_ADMINISTERED_DATA = [
  // ==========================================
  // I) WHOLESALE
  // ==========================================
  {
    id: 'wholesale-a',
    divisionId: 'wholesale',
    divisionTitle: 'I) Wholesale',
    subLetter: 'A',
    subCategory: 'Wholesale-IMFL',
    code: 'L1 & L31',
    primaryCode: 'L1',
    warehouseCode: 'L31',
    categoryTier: 'I) Wholesale • Wholesale-IMFL',
    title: 'L1 (License for Wholesale Vend of Indian Liquor) and L31 (License for Warehouse for storage of Indian Liquor)',
    authorizedEntity: 'Wholesale Licensees operating registered bonded air-conditioned warehouses',
    operationalScope: 'Wholesale procurement, inventory buffering, and distribution of Indian Liquor (L1) and licensed bonded warehouse storage (L31) for supply to public sector retail vends and licensed hospitality establishments.',
    keyConditions: 'Maintain minimum 5,000 sq.ft. temperature-controlled warehouse, automated 2D barcode scanner infrastructure, bank guarantee, and continuous CCTV feed linked to Excise Central Control Room.',
    status: 'Active & Regulated',
    tier: 'wholesale'
  },
  {
    id: 'wholesale-b',
    divisionId: 'wholesale',
    divisionTitle: 'I) Wholesale',
    subLetter: 'B',
    subCategory: 'Wholesale-IMFL',
    code: 'L1F & L32',
    primaryCode: 'L1F',
    warehouseCode: 'L32',
    categoryTier: 'I) Wholesale • Wholesale-IMFL',
    title: 'L1F (License for Wholesale Vend of Foreign Liquor) & L32 (License for Warehouse for storage of Foreign Liquor)',
    authorizedEntity: 'Authorized Importers and International Consignees holding Customs Clearance',
    operationalScope: 'Wholesale supply of imported Bottled-in-Origin (BIO) foreign liquor (L1F) and registered customs bonded warehouse storage (L32) for supply to star hotels, clubs, and state retail stores.',
    keyConditions: 'Direct authorization from brand owner, Customs Bond Section 59 compliance, batch-wise FSSAI/PHO lab clearances, e-Abkari digital transport permits.',
    status: 'Active & Regulated',
    tier: 'wholesale'
  },
  {
    id: 'wholesale-c',
    divisionId: 'wholesale',
    divisionTitle: 'I) Wholesale',
    subLetter: 'C',
    subCategory: 'Wholesale-CL',
    code: 'L3 & L33',
    primaryCode: 'L3',
    warehouseCode: 'L33',
    categoryTier: 'I) Wholesale • Wholesale-CL',
    title: 'L3 (License for Wholesale Vend of Country Liquor) & L33 (License for Warehouse for storage of Country Liquor)',
    authorizedEntity: 'Designated Government Agency / Authorized Wholesale Supply Contractor',
    operationalScope: 'Exclusive wholesale procurement of Country Liquor (L3) and bonded warehouse storage (L33) for distribution to Corporation retail vends (L-8).',
    keyConditions: 'Batch-by-batch chemical lab test certificates from Govt Chemical Testing Laboratory, tamper-proof crate sealing, strict adherence to state MRP price caps.',
    status: 'Active & Regulated',
    tier: 'wholesale'
  },

  // ==========================================
  // II) HCR (HOTEL, CLUB & RESTAURANT)
  // ==========================================
  {
    id: 'hcr-a',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'A',
    subCategory: 'HCR-Hotel',
    code: 'L15 & L15F',
    primaryCode: 'L15',
    foreignCode: 'L15F',
    categoryTier: 'II) HCR • HCR-Hotel',
    title: 'L15 & L15F (Service of Indian and Foreign Liquor in a hotel or guest house to residents in their rooms)',
    authorizedEntity: 'Hotels classified by Ministry of Tourism (Govt. of India) & Approved Guest Houses',
    operationalScope: 'Service of Indian Liquor (L15) and Foreign Liquor (L15F) in guest rooms and mini-bars exclusively to bona fide residents staying in the hotel.',
    keyConditions: 'Classification certificate from Ministry of Tourism, Delhi Police Licensing clearance, FSSAI registration, and service strictly restricted to registered resident room guests.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-b',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'B',
    subCategory: 'HCR-Restaurant',
    code: 'L16 & L16F',
    primaryCode: 'L16',
    foreignCode: 'L16F',
    categoryTier: 'II) HCR • HCR-Restaurant',
    title: 'L16 & L16F (Service of Indian and Foreign Liquor in a bar or restaurant attached to a hotel)',
    authorizedEntity: 'Bars and Restaurants physically attached to and operated within licensed hotel premises',
    operationalScope: 'Service of Indian Liquor (L16) and Foreign Liquor (L16F) in designated bar counters and dining spaces attached to hotels for consumption on premises.',
    keyConditions: 'Clear physical demarcation of bar area, MCD/NDMC Health Trade License, Fire Safety NOC, prohibition of service to minors under 21 years.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-c',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'C',
    subCategory: 'HCR-Restaurant',
    code: 'L17 & L17F',
    primaryCode: 'L17',
    foreignCode: 'L17F',
    categoryTier: 'II) HCR • HCR-Restaurant',
    title: 'L17 & L17F (Service of Indian and Foreign Liquor in Independent Restaurant)',
    authorizedEntity: 'Standalone Commercial Restaurants holding valid Eating House Licenses',
    operationalScope: 'Service of Indian Liquor (L17) and Foreign Liquor (L17F) on dining tables to patrons inside independent restaurants.',
    keyConditions: 'Minimum 50-cover seating capacity, professional sound-proofing, CCTV monitoring with 30-day archival at entry/exit and cash desk, strictly no takeaway.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-d',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'D',
    subCategory: 'HCR-Restaurant',
    code: 'L18 & L18F',
    primaryCode: 'L18',
    foreignCode: 'L18F',
    categoryTier: 'II) HCR • HCR-Restaurant',
    title: 'L18 & L18F (Service of Indian and Foreign Wine, Beer and Alcopop in independent restaurant)',
    authorizedEntity: 'Independent Casual Dining Restaurants, Bistros & Cafes',
    operationalScope: 'Exclusive on-premise service of mild beverages (Wine, Beer, Alcopops) with food in independent restaurants; no hard liquor or spirits permitted.',
    keyConditions: 'Strict prohibition of high-strength spirits (whisky, vodka, rum); prominent display of low-alcohol license conditions; prescribed operational timings.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-e',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'E',
    subCategory: 'HCR-Restaurant',
    code: 'L19 & L19F',
    primaryCode: 'L19',
    foreignCode: 'L19F',
    categoryTier: 'II) HCR • HCR-Restaurant',
    title: 'L19 & L19F (Round the clock service of Indian and Foreign Liquor in independent restaurant located in arrival/departure area of International Airport)',
    authorizedEntity: 'Restaurant & Lounge Concessionaires at Indira Gandhi International Airport (IGI)',
    operationalScope: '24x7 round-the-clock service of Indian and Foreign Liquor in passenger dining areas and transit lounges located in arrival or departure zones of International Airport.',
    keyConditions: 'Airport operator concession agreement, Bureau of Civil Aviation Security (BCAS) clearance, boarding pass verification, no carryout outside lounge.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-f',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'F',
    subCategory: 'HCR-Restaurant',
    code: 'L20 & L20F',
    primaryCode: 'L20',
    foreignCode: 'L20F',
    categoryTier: 'II) HCR • HCR-Restaurant',
    title: 'L20 & L20F (Service of Indian Liquor & Foreign Liquor in a bar/dining car in a luxury train)',
    authorizedEntity: 'Indian Railway Catering and Tourism Corporation (IRCTC) & Luxury Tourist Train Operators',
    operationalScope: 'Service of Indian and Foreign Liquor in bar cars and dining cars of approved luxury tourist trains (such as Palace on Wheels) within NCT of Delhi limits.',
    keyConditions: 'Approved luxury train tour itinerary, locked pantry bar storage, service strictly limited to bona fide onboard ticketed passengers.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-g',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'G',
    subCategory: 'HCR-Club',
    code: 'L28 & L28F',
    primaryCode: 'L28',
    foreignCode: 'L28F',
    categoryTier: 'II) HCR • HCR-Club',
    title: 'L28 & L28F (Service of Indian and Foreign Liquor in a Club)',
    authorizedEntity: 'Clubs registered under Societies Registration Act, 1860 or Companies Act',
    operationalScope: 'Service of Indian Liquor (L28) and Foreign Liquor (L28F) within club facilities exclusively to permanent/associate members and their bona fide guests.',
    keyConditions: 'Maintenance of physical and digital members register, guest entry rules, non-commercial club charter, strictly no liquor takeout from club premises.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },
  {
    id: 'hcr-h',
    divisionId: 'hcr',
    divisionTitle: 'II) HCR',
    subLetter: 'H',
    subCategory: 'HCR-Club',
    code: 'L29 & L29F',
    primaryCode: 'L29',
    foreignCode: 'L29F',
    categoryTier: 'II) HCR • HCR-Club',
    title: 'L29 & L29F (Service of Indian and Foreign Liquor at a Club/Mess exclusively for Govt. servants/retired Govt. Servants)',
    authorizedEntity: 'Civil Services Messes, Armed Forces Institutions & Government Officers\' Clubs',
    operationalScope: 'Service of Indian and Foreign Liquor on a strictly non-commercial basis to serving and retired Government servants and institutional mess members.',
    keyConditions: 'Membership restricted exclusively to government servants / retired government personnel, non-commercial charter, concessional statutory fee schedule.',
    status: 'Active & Regulated',
    tier: 'hcr'
  },

  // ==========================================
  // III) RETAIL
  // ==========================================
  {
    id: 'retail-a',
    divisionId: 'retail',
    divisionTitle: 'III) Retail',
    subLetter: 'A',
    subCategory: 'Retail-IMFL',
    code: 'L6 & L6FG',
    primaryCode: 'L6',
    foreignCode: 'L6FG',
    categoryTier: 'III) Retail • Retail-IMFL',
    title: 'L6 & L6FG (Retail Vend of Indian Liquor and Foreign Liquor in public sector)',
    authorizedEntity: 'Delhi State Public Sector Undertakings (DTTDC, DSIIDC, DCCWS, DSCSC)',
    operationalScope: 'Retail vend for over-the-counter sale of sealed bottles of Indian Liquor (L6) and Foreign Liquor (L6FG) to consumers at government-notified MRP.',
    keyConditions: 'Walk-in air-conditioned format, electronic point of sale (e-POS) billing with 100% 2D DataMatrix QR barcode verification, strict observance of statutory dry days.',
    status: 'Active & Regulated',
    tier: 'retail'
  },
  {
    id: 'retail-b',
    divisionId: 'retail',
    divisionTitle: 'III) Retail',
    subLetter: 'B',
    subCategory: 'Retail-CL',
    code: 'L8',
    primaryCode: 'L8',
    categoryTier: 'III) Retail • Retail-CL',
    title: 'L8 (Retail Vend of Country Liquor and Delhi Medium Liquor (60 degrees) in public sector)',
    authorizedEntity: 'Designated Delhi Government Public Sector Corporations (DSCSC, DSIIDC, DCCWS)',
    operationalScope: 'Public sector retail vend for sale of quality-certified Country Liquor and 60° Delhi Medium Liquor to consumers in authorized municipal sectors.',
    keyConditions: 'Strict government MRP price caps, non-consumption on premises, barricaded queue control, batch-wise laboratory assay verification.',
    status: 'Active & Regulated',
    tier: 'retail'
  },
  {
    id: 'retail-c',
    divisionId: 'retail',
    divisionTitle: 'III) Retail',
    subLetter: 'C',
    subCategory: 'Retail-CL',
    code: 'L8 & L14',
    primaryCode: 'L8',
    combinedCode: 'L14',
    categoryTier: 'III) Retail • Retail-CL',
    title: 'L8 & L14 (Retail Vend of Country Liquor, Delhi Medium Liquor, Economy Liquor 75 degrees and Beer in public sector)',
    authorizedEntity: 'Delhi State Government Corporations operating composite retail vends',
    operationalScope: 'Integrated public sector vend selling certified Country Liquor, Delhi Medium Liquor (60°), Economy Liquor (75°), and commercial Beers.',
    keyConditions: 'Segregated billing and inventory logs, cold storage provision for beer, prominent display of notified retail rates.',
    status: 'Active & Regulated',
    tier: 'retail'
  },

  // ==========================================
  // IV) M&TP (MEDICINAL & TOILET PREPARATIONS / INDUSTRIAL SPIRIT)
  // ==========================================
  {
    id: 'mtp-a',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'A',
    subCategory: 'M&TP',
    code: 'AP',
    primaryCode: 'AP',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'AP (Authorisation Permit)',
    authorizedEntity: 'Licensed Pharmaceutical Manufacturers, Hospitals, Research Institutions & Chemical Labs',
    operationalScope: 'Statutory Authorisation Permit to import, procure, transport and hold bulk rectified spirit and pure alcohol for medicinal and scientific formulations.',
    keyConditions: 'Sanctioned spirit quota under Medicinal and Toilet Preparations (Excise Duties) Act, physical verification of bonded storage vats, quarterly utilization audit.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-b',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'B',
    subCategory: 'M&TP',
    code: 'P-6',
    primaryCode: 'P-6',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'P-6 (Permit for Possession of Special Denatured Spirit by Industrial Manufacturers)',
    authorizedEntity: 'Industrial Manufacturers (Paints, Varnishes, Inks, Resins, Sanitizers, Chemical Formulations)',
    operationalScope: 'Permit for bulk possession and industrial consumption of Specially Denatured Spirit in approved manufacturing premises.',
    keyConditions: 'Approved industrial manufacturing recipe, DPCC pollution NOC, monthly spirit ledger, chemical denaturant compliance certification.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-c',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'C',
    subCategory: 'M&TP',
    code: 'P-2',
    primaryCode: 'P-2',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'P-2 (Permit for possession of denatured spirit up to limit of one-time possession of 10 Litres)',
    authorizedEntity: 'Artisans, Carpenters, Wood Polishers & Individual Private Users',
    operationalScope: 'One-time possession permit for transport and domestic storage of denatured spirit up to 10 litres for polishing and artisanal purposes.',
    keyConditions: 'One-time permit generation via e-Abkari portal against Aadhaar/ID proof, strictly non-potable denatured spirit, resale strictly prohibited.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-d',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'D',
    subCategory: 'M&TP',
    code: 'P-3',
    primaryCode: 'P-3',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'P-3 (Permit for possession of denatured spirit exceeding the limit of retail sale)',
    authorizedEntity: 'Commercial Workshops, Printing Presses, Leather Tannery Units & Industrial Dry Cleaners',
    operationalScope: 'Commercial permit allowing ongoing possession of denatured spirit in volumes exceeding standard individual retail possession ceiling.',
    keyConditions: 'Valid trade license, secure drum storage with hazardous warning labels, periodic verification by jurisdictional Excise Inspector.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-e',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'E',
    subCategory: 'M&TP',
    code: 'P-4',
    primaryCode: 'P-4',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'P-4 (Permit for possession of Special Denatured Spirit by Industrial manufacturers)',
    authorizedEntity: 'Approved Industrial Enterprises utilizing specific solvent recipes',
    operationalScope: 'Statutory permit for possession and chemical processing of customized Specially Denatured Spirit batches compounded with specialized denaturants.',
    keyConditions: 'Denaturant formula approved by Government Chief Chemist, locked storage tanks under excise custody, non-diversion indemnity bond.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-f',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'F',
    subCategory: 'M&TP',
    code: 'P-5',
    primaryCode: 'P-5',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'P-5 (Permit for possession of rectified spirit exceeding the limit of retail sale)',
    authorizedEntity: 'Registered Homeopathic & Ayurvedic Practitioners, Medical Clinics, Pathology Labs',
    operationalScope: 'Permit to possess un-denatured rectified spirit in excess of retail limit for preparation of medicines, homeopathic dilutions, and laboratory testing.',
    keyConditions: 'Valid professional practitioner or drug license, secured lockable spirit cabinet, compounding register, periodic unannounced excise audits.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-g',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'G',
    subCategory: 'M&TP',
    code: 'DD-11',
    primaryCode: 'DD-11',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'DD-11 (License for Retail of Narcotic Drugs)',
    authorizedEntity: 'Licensed Chemists, Hospital Pharmacies & Authorized Druggists',
    operationalScope: 'Retail dispensing of notified medicinal opium, morphine, and controlled narcotic preparations strictly against valid registered medical prescriptions.',
    keyConditions: 'Strict compliance with Narcotic Drugs and Psychotropic Substances (NDPS) Act, 1985 & Delhi Opium Rules; dual-lock safe; 3-year prescription register.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-h',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'H',
    subCategory: 'M&TP',
    code: 'L34',
    primaryCode: 'L34',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'L34 (Licence for a warehouse for the storage of denatured spirit)',
    authorizedEntity: 'Commercial Chemical Warehouse Operators & Industrial Spirit Stockists',
    operationalScope: 'Licence for establishment and management of a dedicated licensed warehouse for bulk storage and commercial handling of denatured spirits.',
    keyConditions: 'Flame-proof electrical fixtures, spark arrestors, 24/7 CCTV surveillance, boundary safety wall, and environmental clearances.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-i',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'I',
    subCategory: 'M&TP',
    code: 'L-5 & L-34',
    primaryCode: 'L-5',
    combinedCode: 'L-34',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'L-5 (Wholesale vend of Denatured Spirit) License for possession of Denatured Spirit and L-34 (License for warehouse for storage of Denatured Spirit)',
    authorizedEntity: 'Authorized Industrial Wholesale Spirit Dealers and Stockists',
    operationalScope: 'Wholesale vend and commercial possession of denatured spirit coupled with licensed warehouse storage facility (L-34) for industrial distribution.',
    keyConditions: 'Wholesale digital dispatch passes via e-Abkari, verification of purchaser P-3/P-4 permits prior to release, quarterly stock reconciliation.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-j',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'J',
    subCategory: 'M&TP',
    code: 'L25',
    primaryCode: 'L25',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'L25 (License for Retail Vend of denatured spirit including special denatured spirit)',
    authorizedEntity: 'Hardware Merchants, Paint Stores & Specialized Chemical Retailers',
    operationalScope: 'Over-the-counter retail vend of packaged denatured spirit and special denatured spirit to approved artisans, tradesmen, and P-2 permit holders.',
    keyConditions: 'Mandatory standard packaging with prominent warning labels stating "POISON - FOR EXTERNAL USE ONLY", sales register with buyer details.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-k',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'K',
    subCategory: 'M&TP',
    code: 'L-4 & L-35',
    primaryCode: 'L-4',
    combinedCode: 'L-35',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'L-4 (Wholesale vend of Rectified Spirit) License for possession of Rectified Spirit and L-35 (License for warehouse for storage of Rectified Spirit)',
    authorizedEntity: 'Authorized Wholesale Spirit Distributors & Chemical Distilleries',
    operationalScope: 'Wholesale vend and bulk possession of pure un-denatured rectified spirit accompanied by licensed warehouse facility (L-35) for pharmaceutical supply.',
    keyConditions: 'Heavy bank guarantee, calibrated mass flow meters, strict verification of AP and P-5 permits before dispatch, zero tolerance for potable leakage.',
    status: 'Active & Regulated',
    tier: 'mtp'
  },
  {
    id: 'mtp-l',
    divisionId: 'mtp',
    divisionTitle: 'IV) M&TP',
    subLetter: 'L',
    subCategory: 'M&TP',
    code: 'L-35',
    primaryCode: 'L-35',
    categoryTier: 'IV) M&TP • Industrial & Medicinal',
    title: 'L-35 (License for warehouse for storage of Rectified Spirit)',
    authorizedEntity: 'Distillery Companies, Pharmaceutical Formulators & Approved Spirit Warehousing Entities',
    operationalScope: 'Licence for warehouse for dedicated storage of bulk rectified spirit awaiting excise duty assessment or authorized inter-state transfer.',
    keyConditions: 'Joint excise locking mechanism, calibrated dip-tape measurement charts for storage tanks, daily temperature and hydrometer dip records.',
    status: 'Active & Regulated',
    tier: 'mtp'
  }
];

export default function LicensesAdministered({ onNavigateHome }) {
  // Navigation tabs matching About e-Abkari structure
  const [activeTab, setActiveTab] = useState('DIRECTORY'); // 'DIRECTORY' | 'DIVISIONS' | 'PROCEDURE' | 'COMPLIANCE' | 'VERIFICATION'
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedLicenseModal, setSelectedLicenseModal] = useState(null);

  // Filtered licenses directory
  const filteredLicenses = useMemo(() => {
    return LICENSES_ADMINISTERED_DATA.filter(lic => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        lic.code.toLowerCase().includes(q) ||
        lic.title.toLowerCase().includes(q) ||
        lic.authorizedEntity.toLowerCase().includes(q) ||
        (lic.categoryTier && lic.categoryTier.toLowerCase().includes(q)) ||
        (lic.subCategory && lic.subCategory.toLowerCase().includes(q)) ||
        (lic.divisionTitle && lic.divisionTitle.toLowerCase().includes(q));

      const matchesTier = tierFilter === 'all' || lic.tier === tierFilter || lic.divisionId === tierFilter;

      return matchesSearch && matchesTier;
    });
  }, [searchQuery, tierFilter]);

  const handlePrint = () => {
    window.print();
  };

  const handleLinkClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="about-page-wrapper">
      
      {/* 1. Official Government Top Bar */}
      <div className="about-gov-topbar">
        <div className="about-container">
          <div className="about-breadcrumb-inner">
            <div className="about-gov-title">
              <span className="about-pulse-dot"></span>
              <span>Government of NCT of Delhi • Department of Excise, Entertainment &amp; Luxury Tax</span>
            </div>
            <div className="about-gov-ref">
              <span>Statutory Reference: Delhi Excise Act, 2009 &amp; Delhi Excise Rules, 2010</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Breadcrumb & Status Bar */}
      <div className="about-breadcrumb-bar">
        <div className="about-container">
          <div className="about-breadcrumb-inner">
            <div className="about-breadcrumb">
              <button 
                onClick={onNavigateHome || (() => window.location.href = '/')}
                className="about-breadcrumb-link"
              >
                <Home className="about-icon-xs" />
                <span>Home</span>
              </button>
              <ChevronRight className="about-breadcrumb-sep" />
              <span>Facts &amp; Figures</span>
              <ChevronRight className="about-breadcrumb-sep" />
              <span className="about-breadcrumb-active">Licenses Administered</span>
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

      {/* 3. Executive Dashboard Header Banner */}
      <section className="about-hero-section">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <div className="about-hero-tagline-box">
                <span className="about-badge-amber">
                  <Sparkles className="about-icon-xs" />
                  Government of NCT of Delhi
                </span>
                <span className="about-badge-outline">
                  Statutory Licensing Authority
                </span>
              </div>
              
              <h1 className="about-hero-title">
                Licenses Administered
              </h1>
              <p className="about-hero-sub-meta">
                Department of Excise, Entertainment &amp; Luxury Tax • Official Statutory Licensing Compendium
              </p>
              <p className="about-hero-desc">
                Official compendium of all wholesale, retail, hospitality (hotel, club, restaurant), and industrial/medicinal licenses administered under the Delhi Excise Act, 2009 and Delhi Excise Rules, 2010. Featuring 100% paperless e-Abkari processing, transparent qualification criteria, and mandatory 2D QR serialization track-and-trace.
              </p>

              {/* Action Buttons */}
              <div className="about-hero-buttons" style={{ marginTop: '1.25rem' }}>
                <button 
                  onClick={() => {
                    const first = LICENSES_ADMINISTERED_DATA[0];
                    setSelectedLicenseModal(first);
                  }}
                  className="about-btn-primary"
                  title="Open regulatory dossier overview"
                >
                  <Sparkles className="about-icon-xs" />
                  <span>Launch Quick Dossier</span>
                </button>
                <button 
                  onClick={handlePrint}
                  className="about-btn-outline"
                >
                  <Printer className="about-icon-xs" />
                  <span>Print Directory Dossier</span>
                </button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="about-hero-actions-col">
              <div className="about-hero-card">
                <div className="about-hero-img-box">
                  <img 
                    src={hqImage} 
                    alt="Delhi Excise Headquarters, Vikas Bhawan-II" 
                    className="about-hero-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="about-hero-img-overlay" />
                  <div className="about-hero-img-badge">
                    <BadgeCheck className="about-icon-xs text-amber-400" />
                    <span>Central Licensing Authority</span>
                  </div>
                </div>
                <div className="about-hero-img-caption">
                  <h4 className="about-caption-title">Department of Excise Headquarters</h4>
                  <p className="about-caption-address">
                    Government of NCT of Delhi, L-Block, Vikas Bhawan-II, Civil Lines, Delhi - 110054
                  </p>
                </div>
              </div>

              {/* Quick Nav Anchors */}
              <div className="about-hero-nav-btns" style={{ marginTop: '0.75rem' }}>
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
                  <span>Grievance Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real-Time Operations KPI Metric Strip */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {LICENSING_KPIS.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div 
                  key={kpi.id}
                  className="about-stat-card"
                  style={{ borderTop: `3px solid ${kpi.color}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', width: '100%' }}>
                    <div 
                      className="about-stat-icon-wrap"
                      style={{ backgroundColor: kpi.bg }}
                    >
                      <Icon className="about-icon-sm" style={{ color: kpi.color }} />
                    </div>
                    <span className="about-stat-badge">
                      {kpi.change}
                    </span>
                  </div>
                  <div className="about-stat-number">
                    {kpi.value}
                  </div>
                  <div className="about-stat-label">
                    {kpi.label}
                  </div>
                  <div className="about-stat-note">
                    {kpi.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Dashboard Interactive Tabs Bar */}
      <div className="about-tabs-container">
        <div className="about-container">
          <div className="about-tabs-bar">
            {[
              { id: "DIRECTORY", label: "License Directory", icon: Store, count: 26 },
              { id: "DIVISIONS", label: "4 Statutory Divisions", icon: Layers, count: 4 },
              { id: "PROCEDURE", label: "Licensing Lifecycle & Workflow", icon: Laptop },
              { id: "COMPLIANCE", label: "Statutory Terms & Checklist", icon: BookOpen },
              { id: "VERIFICATION", label: "License Verification & Sentinel", icon: ShieldCheck }
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
                  {tab.count !== undefined && (
                    <span className={`facts-tab-count ${isActive ? 'active-count' : ''}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Tab Content Sections */}
      <div className="about-content-sections" style={{ marginTop: '1.75rem' }}>
        <div className="about-container">
          
          {/* ========================================================
              TAB 1: COMPREHENSIVE LICENSE DIRECTORY & SEARCH
              ======================================================== */}
          {activeTab === "DIRECTORY" && (
            <div className="about-section-card">
              <div className="about-section-header">
                <div className="about-section-icon-box">
                  <Store className="about-icon-sm" style={{ color: '#012a52' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="about-badge-tag">
                    Official Compendium • Delhi Excise Rules, 2010
                  </span>
                  <h2 className="about-section-title">
                    Regulated Licenses &amp; Permits Directory
                  </h2>
                  <p className="about-section-subtitle">
                    Search, filter, and inspect operational scopes, authorized entities, and regulatory conditions across all 26 statutory excise licenses.
                  </p>
                </div>
              </div>

              {/* Interactive Search & Filter Controls */}
              <div className="facts-directory-controls">
                {/* Search Bar */}
                <div className="facts-search-wrap">
                  <Search className="facts-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by license code (e.g. L1, L16, P-6), entity, division, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="facts-search-input"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="facts-search-clear"
                      title="Clear search"
                    >
                      <X className="about-icon-xs" />
                    </button>
                  )}
                </div>

                {/* Division Filter Pills */}
                <div className="facts-filter-pills-row">
                  <span className="facts-filter-label">
                    <Filter className="about-icon-xs text-slate-500" />
                    Filter by Division:
                  </span>
                  {[
                    { id: 'all', label: 'All Licenses', count: 26 },
                    { id: 'wholesale', label: 'I) Wholesale', count: 3 },
                    { id: 'hcr', label: 'II) HCR (Hotels, Clubs & Bars)', count: 8 },
                    { id: 'retail', label: 'III) Retail Vends', count: 3 },
                    { id: 'mtp', label: 'IV) M&TP (Industrial & Spirit)', count: 12 }
                  ].map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setTierFilter(pill.id)}
                      className={`facts-pill-btn ${tierFilter === pill.id ? 'active' : ''}`}
                    >
                      <span>{pill.label}</span>
                      <span className="facts-pill-badge">{pill.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Status Header */}
              <div className="facts-results-summary">
                <span className="facts-results-text">
                  Showing <strong>{filteredLicenses.length}</strong> of <strong>{LICENSES_ADMINISTERED_DATA.length}</strong> regulated licenses
                </span>
                {(searchQuery || tierFilter !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setTierFilter('all');
                    }}
                    className="facts-reset-btn"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Licenses Directory Table View */}
              {filteredLicenses.length > 0 ? (
                <div className="facts-table-wrap">
                  <table className="facts-dir-table">
                    <thead>
                      <tr>
                        <th style={{ width: '130px' }}>License Code</th>
                        <th style={{ width: '150px' }}>Division</th>
                        <th>Statutory Designation &amp; Official Scope</th>
                        <th style={{ width: '220px' }}>Authorized Operating Entity</th>
                        <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLicenses.map((lic) => {
                        let codeColorClass = 'badge-blue';
                        if (lic.divisionId === 'wholesale') codeColorClass = 'badge-blue';
                        else if (lic.divisionId === 'hcr') codeColorClass = 'badge-emerald';
                        else if (lic.divisionId === 'retail') codeColorClass = 'badge-amber';
                        else if (lic.divisionId === 'mtp') codeColorClass = 'badge-purple';

                        return (
                          <tr key={lic.id} className="facts-dir-row">
                            <td className="facts-dir-code-col">
                              <span className={`facts-code-badge ${codeColorClass}`}>
                                {lic.code}
                              </span>
                              <div className="facts-status-tag">
                                <span className="facts-dot-green"></span>
                                Active
                              </div>
                            </td>
                            <td className="facts-dir-division-col">
                              <span className="facts-div-chip">
                                {lic.divisionTitle}
                              </span>
                              <div className="facts-subcat-text">{lic.subCategory}</div>
                            </td>
                            <td className="facts-dir-desc-col">
                              <div className="facts-license-title">
                                {lic.title}
                              </div>
                              <p className="facts-license-scope">
                                {lic.operationalScope}
                              </p>
                              <div className="facts-condition-preview">
                                <span className="facts-cond-label">Key Condition:</span> {lic.keyConditions}
                              </div>
                            </td>
                            <td className="facts-dir-entity-col">
                              <div className="facts-entity-box">
                                <Building2 className="about-icon-xs text-slate-500" />
                                <span>{lic.authorizedEntity}</span>
                              </div>
                            </td>
                            <td className="facts-dir-action-col">
                              <button
                                onClick={() => setSelectedLicenseModal(lic)}
                                className="facts-dossier-btn"
                                title={`Inspect detailed statutory dossier for ${lic.code}`}
                              >
                                <span>View Dossier</span>
                                <ArrowRight className="about-icon-xs" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="facts-empty-box">
                  <Info className="about-icon-md text-slate-400" />
                  <h4 className="facts-empty-title">No matching licenses found</h4>
                  <p className="facts-empty-desc">
                    Try refining your search query or reset the division filter to view all 26 licenses.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setTierFilter('all');
                    }}
                    className="about-btn-primary"
                    style={{ marginTop: '0.75rem' }}
                  >
                    Clear Filter Criteria
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 2: 4 MAJOR STATUTORY DIVISIONS (DEEP DIVE)
              ======================================================== */}
          {activeTab === "DIVISIONS" && (
            <div className="about-section-card">
              <div className="about-section-header">
                <div className="about-section-icon-box">
                  <Layers className="about-icon-sm" style={{ color: '#012a52' }} />
                </div>
                <div>
                  <span className="about-badge-tag">
                    Statutory Organization Structure
                  </span>
                  <h2 className="about-section-title">
                    Four Core Regulatory License Divisions
                  </h2>
                  <p className="about-section-subtitle">
                    Under the Delhi Excise Act, 2009, licenses are systematically organized into four distinct operational divisions based on supply-chain hierarchy and public policy.
                  </p>
                </div>
              </div>

              <div className="facts-divisions-grid">
                {LICENSE_MAJOR_DIVISIONS.map((div) => (
                  <div key={div.id} className="facts-division-card">
                    <div className="facts-div-header" style={{ borderLeftColor: div.accentColor }}>
                      <div className="facts-div-roman-box" style={{ backgroundColor: `${div.accentColor}15`, color: div.accentColor }}>
                        {div.romanNumeral}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="facts-div-meta">
                          <span className="facts-div-rules">{div.governingRules}</span>
                          <span className="facts-div-count-pill" style={{ backgroundColor: `${div.accentColor}20`, color: div.accentColor }}>
                            {div.count} License Tiers
                          </span>
                        </div>
                        <h3 className="facts-div-title">{div.title}</h3>
                      </div>
                    </div>

                    <p className="facts-div-desc">
                      {div.description}
                    </p>

                    <div className="facts-div-codes-sec">
                      <span className="facts-div-codes-label">Regulated License Classes:</span>
                      <div className="facts-div-codes-wrap">
                        {div.codes.map((code) => (
                          <button
                            key={code}
                            onClick={() => {
                              const found = LICENSES_ADMINISTERED_DATA.find(l => l.code === code);
                              if (found) setSelectedLicenseModal(found);
                            }}
                            className="facts-div-code-chip"
                          >
                            <span>{code}</span>
                            <ChevronRight className="about-icon-xs text-slate-400" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="facts-div-footer">
                      <button 
                        onClick={() => {
                          setTierFilter(div.id);
                          setActiveTab('DIRECTORY');
                        }}
                        className="facts-div-explore-btn"
                        style={{ color: div.accentColor }}
                      >
                        <span>Filter in Directory</span>
                        <ArrowRight className="about-icon-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: LICENSING LIFECYCLE & WORKFLOW
              ======================================================== */}
          {activeTab === "PROCEDURE" && (
            <div className="about-section-card">
              <div className="about-section-header">
                <div className="about-section-icon-box">
                  <Laptop className="about-icon-sm" style={{ color: '#012a52' }} />
                </div>
                <div>
                  <span className="about-badge-tag">
                    e-Abkari 2.0 Digital Workflow
                  </span>
                  <h2 className="about-section-title">
                    End-to-End Online Licensing Procedure
                  </h2>
                  <p className="about-section-subtitle">
                    All excise license applications, inspections, statutory verifications, and annual renewals are executed 100% digitally through the Delhi e-Abkari portal.
                  </p>
                </div>
              </div>

              {/* 5-Step Process Visual Flow */}
              <div className="facts-workflow-grid">
                {[
                  {
                    step: "01",
                    title: "Online Application & e-Dossier",
                    desc: "Applicant registers on the e-Abkari portal, fills the statutory form, and uploads prescribed documents including PAN, GST, layout blueprints, property ownership/lease deed, and MCD Health Trade License.",
                    time: "Applicant Action",
                    icon: FileText
                  },
                  {
                    step: "02",
                    title: "Multi-Agency Scrutiny & Field Survey",
                    desc: "Department initiates automated document verification followed by a joint physical inspection by the jurisdictional Excise Inspector and Sub-Inspector to verify premise boundaries and safety norms.",
                    time: "Within 7-10 Days",
                    icon: Building2
                  },
                  {
                    step: "03",
                    title: "Security Deposit & Treasury Challan",
                    desc: "Upon preliminary approval, the applicant remits the prescribed statutory license fee and furnishes required bank guarantees via State Bank e-Challan directly reconciled with the PAO Treasury.",
                    time: "Within 3 Days",
                    icon: Landmark
                  },
                  {
                    step: "04",
                    title: "Sanction by Competent Authority",
                    desc: "The Licensing Scrutiny Committee evaluates the inspection dossier and statutory reports for final approval by the Deputy Commissioner of Excise / Commissioner of Excise.",
                    time: "Within 7 Days",
                    icon: Scale
                  },
                  {
                    step: "05",
                    title: "Digital QR License & Barcode Activation",
                    desc: "The digitally signed statutory license certificate with embedded 2D QR verification code is generated, and portal privileges for brand registration and transit passes are unlocked.",
                    time: "Instant Activation",
                    icon: QrCode
                  }
                ].map((st) => {
                  const StIcon = st.icon;
                  return (
                    <div key={st.step} className="facts-workflow-card">
                      <div className="facts-wf-top">
                        <span className="facts-wf-step-num">{st.step}</span>
                        <span className="facts-wf-time-badge">{st.time}</span>
                      </div>
                      <div className="facts-wf-icon-box">
                        <StIcon className="about-icon-sm text-blue-900" />
                      </div>
                      <h4 className="facts-wf-title">{st.title}</h4>
                      <p className="facts-wf-desc">{st.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* SLA Timelines Table under RTS Act */}
              <div className="facts-sla-box" style={{ marginTop: '2.5rem' }}>
                <div className="facts-sla-header">
                  <Clock className="about-icon-sm text-amber-500" />
                  <div>
                    <h3 className="facts-sla-title">
                      Delhi Right to Public Services Act (RTS) — Statutory Timelines
                    </h3>
                    <p className="facts-sla-subtitle">
                      Statutory time bounds guaranteed to citizens and trade under Delhi Excise Citizen's Charter
                    </p>
                  </div>
                </div>

                <div className="facts-sla-table-wrap">
                  <table className="facts-sla-table">
                    <thead>
                      <tr>
                        <th>Service / License Operation</th>
                        <th>Competent Sanctioning Authority</th>
                        <th>Grievance Escalation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Grant of New Wholesale License (L-1/L-1F)</strong></td>
                        <td>Excise Commissioner</td>
                        <td>Secretary (Finance / Excise)</td>
                      </tr>
                      <tr>
                        <td><strong>Grant of Hotel / Restaurant License (L-15 to L-18)</strong></td>
                        <td>Deputy Commissioner (Excise)</td>
                        <td>Excise Commissioner</td>
                      </tr>
                      <tr>
                        <td><strong>Annual License Renewal</strong></td>
                        <td>Assistant Commissioner (Licensing)</td>
                        <td>Deputy Commissioner (Excise)</td>
                      </tr>
                      <tr>
                        <td><strong>Transfer of Premise / Alteration of Boundaries</strong></td>
                        <td>Deputy Commissioner (Excise)</td>
                        <td>Excise Commissioner</td>
                      </tr>
                      <tr>
                        <td><strong>Temporary Event Permit (P-10)</strong></td>
                        <td>Superintendent (Excise)</td>
                        <td>Assistant Commissioner</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: STATUTORY COMPLIANCE & CHECKLIST
              ======================================================== */}
          {activeTab === "COMPLIANCE" && (
            <div className="about-section-card">
              <div className="about-section-header">
                <div className="about-section-icon-box">
                  <BookOpen className="about-icon-sm" style={{ color: '#012a52' }} />
                </div>
                <div>
                  <span className="about-badge-tag">
                    Regulatory Governance
                  </span>
                  <h2 className="about-section-title">
                    Mandatory Statutory Terms &amp; Applicant Checklist
                  </h2>
                  <p className="about-section-subtitle">
                    Essential prerequisites, site guidelines, and statutory mandates enforced under the Delhi Excise Act, 2009 and Delhi Excise Rules, 2010.
                  </p>
                </div>
              </div>

              {/* 4 Compliance Pillars */}
              <div className="facts-compliance-grid">
                <div className="facts-comp-card">
                  <div className="facts-comp-icon-box">
                    <Building className="about-icon-sm text-blue-700" />
                  </div>
                  <h3 className="facts-comp-title">1. Premise &amp; Distance Guidelines</h3>
                  <ul className="facts-comp-list">
                    <li>Premises must conform strictly to Master Plan Delhi (MPD-2021) commercial zoning regulations.</li>
                    <li>Strict adherence to statutory distance norms from schools, colleges, religious places, and major hospitals.</li>
                    <li>Clear architectural blueprints with demarcated storage, serving, and cashier counters.</li>
                  </ul>
                </div>

                <div className="facts-comp-card">
                  <div className="facts-comp-icon-box">
                    <ShieldCheck className="about-icon-sm text-emerald-700" />
                  </div>
                  <h3 className="facts-comp-title">2. Mandatory Multi-Agency Clearances</h3>
                  <ul className="facts-comp-list">
                    <li>Valid Fire Safety Certificate / NOC from the Delhi Fire Service (DFS).</li>
                    <li>Health Trade License issued by the respective Municipal Corporation (MCD/NDMC).</li>
                    <li>Eating House Registration / Certificate from Delhi Police Licensing Branch.</li>
                    <li>Food Safety and Standards Authority of India (FSSAI) valid registration.</li>
                  </ul>
                </div>

                <div className="facts-comp-card">
                  <div className="facts-comp-icon-box">
                    <AlertTriangle className="about-icon-sm text-amber-700" />
                  </div>
                  <h3 className="facts-comp-title">3. Strict Age Restrictions &amp; Signage</h3>
                  <ul className="facts-comp-list">
                    <li>Section 23 strictly prohibits the sale or service of liquor to persons below 21 years of age.</li>
                    <li>Prominent statutory display board at the entrance displaying the minimum legal drinking age warning.</li>
                    <li>Mandatory physical or digital age verification for any patron suspected of being underage.</li>
                  </ul>
                </div>

                <div className="facts-comp-card">
                  <div className="facts-comp-icon-box">
                    <QrCode className="about-icon-sm text-purple-700" />
                  </div>
                  <h3 className="facts-comp-title">4. Real-time Surveillance &amp; Dry Days</h3>
                  <ul className="facts-comp-list">
                    <li>High-definition 24/7 CCTV surveillance covering entrance, bar counter, and billing counter with 30-day archival.</li>
                    <li>Strict compliance with notified Dry Days (Republic Day, Independence Day, Gandhi Jayanti, etc.).</li>
                    <li>100% 2D QR code barcode scanning on all bottles upon receipt and opening.</li>
                  </ul>
                </div>
              </div>

              {/* Document Checklist Box */}
              <div className="facts-checklist-box" style={{ marginTop: '2.5rem' }}>
                <h3 className="facts-checklist-title">
                  <FileCheck className="about-icon-sm text-emerald-600" />
                  <span>Mandatory Applicant Document Checklist</span>
                </h3>
                <div className="facts-checklist-grid">
                  {[
                    "Certificate of Incorporation / Partnership Deed / Trust Deed",
                    "PAN & GST Registration Certificates of Applicant Firm",
                    "Title Deed / Registered Lease Deed (Minimum 3-5 Years) & Non-Encumbrance Certificate",
                    "Key Plan & Site Plan certified by Registered Architect / Chartered Engineer",
                    "Delhi Fire Service (DFS) Fire Safety Inspection NOC",
                    "MCD / NDMC / Cantonment Board Health Trade License",
                    "Delhi Police Licensing Branch Eating House Registration",
                    "Character Verification & Non-Involvement in Excise Crime Affidavit"
                  ].map((item, idx) => (
                    <div key={idx} className="facts-check-item">
                      <CheckCircle2 className="about-icon-xs text-emerald-600" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: LICENSE VERIFICATION & SENTINEL DESK
              ======================================================== */}
          {activeTab === "VERIFICATION" && (
            <div className="about-section-card">
              <div className="about-section-header">
                <div className="about-section-icon-box">
                  <ShieldAlert className="about-icon-sm" style={{ color: '#012a52' }} />
                </div>
                <div>
                  <span className="about-badge-tag">
                    Public Transparency &amp; Consumer Protection
                  </span>
                  <h2 className="about-section-title">
                    Official License Verification &amp; Sentinel Desk
                  </h2>
                  <p className="about-section-subtitle">
                    Verify any licensed vend, hotel, or bar in the NCT of Delhi, verify permissible operational hours, and report regulatory non-compliance.
                  </p>
                </div>
              </div>

              {/* 3-Step Verification Guide */}
              <div className="facts-verif-guide-grid">
                <div className="facts-vg-card">
                  <div className="facts-vg-num">Step 1</div>
                  <h4 className="facts-vg-title">Locate Public Display Board</h4>
                  <p className="facts-vg-desc">
                    Every licensed establishment is legally mandated under Rule 37 to display its official Form of License prominently at the entrance.
                  </p>
                </div>

                <div className="facts-vg-card">
                  <div className="facts-vg-num">Step 2</div>
                  <h4 className="facts-vg-title">Scan 2D QR License Code</h4>
                  <p className="facts-vg-desc">
                    Use any smartphone camera or the m-Abkari Mobile App to scan the encrypted 2D DataMatrix code on the official license certificate.
                  </p>
                </div>

                <div className="facts-vg-card">
                  <div className="facts-vg-num">Step 3</div>
                  <h4 className="facts-vg-title">Verify Online via Portal</h4>
                  <p className="facts-vg-desc">
                    Confirm that the licensee name, trade name, premise address, validity date, and permissible categories match the official portal database.
                  </p>
                </div>
              </div>

              {/* 24x7 Anti-Evasion & Grievance Contact Box */}
              <div className="facts-sentinel-box" style={{ marginTop: '2rem' }}>
                <div className="facts-sentinel-header">
                  <ShieldCheck className="about-icon-md text-amber-400" />
                  <div>
                    <h3 className="facts-sentinel-title">
                      24x7 Excise Anti-Evasion &amp; Citizen Grievance Sentinel
                    </h3>
                    <p className="facts-sentinel-subtitle">
                      Report unauthorized liquor sale, service to minors, counterfeit bottles, or overcharging
                    </p>
                  </div>
                </div>

                <div className="facts-sentinel-grid">
                  <div className="facts-sentinel-card">
                    <PhoneCall className="about-icon-sm text-emerald-400" />
                    <div>
                      <div className="facts-sc-label">Toll-Free Anti-Evasion Hotline</div>
                      <div className="facts-sc-val">1800-11-9922</div>
                      <div className="facts-sc-note">Round-the-Clock (24x7) Toll-Free</div>
                    </div>
                  </div>

                  <div className="facts-sentinel-card">
                    <MessageSquare className="about-icon-sm text-blue-400" />
                    <div>
                      <div className="facts-sc-label">WhatsApp Sentinel Desk</div>
                      <div className="facts-sc-val">+91 9582909090</div>
                      <div className="facts-sc-note">Instant Photo / Video Reporting</div>
                    </div>
                  </div>

                  <div className="facts-sentinel-card">
                    <Mail className="about-icon-sm text-purple-400" />
                    <div>
                      <div className="facts-sc-label">Central Control Room Email</div>
                      <div className="facts-sc-val">excise-controlroom@delhi.gov.in</div>
                      <div className="facts-sc-note">Acknowledged within 24 Hours</div>
                    </div>
                  </div>

                  <div className="facts-sentinel-card">
                    <MapPin className="about-icon-sm text-amber-400" />
                    <div>
                      <div className="facts-sc-label">Physical Inspection Wing</div>
                      <div className="facts-sc-val">Room No. 102, Vikas Bhawan-II</div>
                      <div className="facts-sc-note">Civil Lines, Delhi - 110054</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 7. Interactive License Dossier Pop-Up Modal */}
      {selectedLicenseModal && (
        <div className="facts-modal-backdrop" onClick={() => setSelectedLicenseModal(null)}>
          <div className="facts-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="facts-modal-header">
              <div className="facts-modal-title-wrap">
                <span className="facts-code-badge badge-blue">
                  {selectedLicenseModal.code}
                </span>
                <span className="facts-modal-subtier">
                  {selectedLicenseModal.categoryTier}
                </span>
              </div>
              <button 
                onClick={() => setSelectedLicenseModal(null)}
                className="facts-modal-close"
                title="Close dossier"
              >
                <X className="about-icon-sm" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="facts-modal-body">
              <h3 className="facts-modal-main-title">
                {selectedLicenseModal.title}
              </h3>

              <div className="facts-modal-grid">
                <div className="facts-modal-field">
                  <span className="facts-modal-label">Division / Category:</span>
                  <span className="facts-modal-val bold">{selectedLicenseModal.divisionTitle} • {selectedLicenseModal.subCategory}</span>
                </div>

                <div className="facts-modal-field">
                  <span className="facts-modal-label">Statutory Status:</span>
                  <span className="facts-modal-val green">
                    <span className="facts-dot-green"></span>
                    {selectedLicenseModal.status}
                  </span>
                </div>

                <div className="facts-modal-field full">
                  <span className="facts-modal-label">Authorized Operating Entities:</span>
                  <div className="facts-modal-entity-box">
                    <Building2 className="about-icon-xs text-blue-800" />
                    <span>{selectedLicenseModal.authorizedEntity}</span>
                  </div>
                </div>

                <div className="facts-modal-field full">
                  <span className="facts-modal-label">Permissible Operational Scope:</span>
                  <p className="facts-modal-para">
                    {selectedLicenseModal.operationalScope}
                  </p>
                </div>

                <div className="facts-modal-field full">
                  <span className="facts-modal-label">Key Regulatory Conditions &amp; Inspection Norms:</span>
                  <div className="facts-modal-cond-box">
                    <Info className="about-icon-xs text-amber-700" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p className="facts-modal-cond-text">
                      {selectedLicenseModal.keyConditions}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="facts-modal-footer">
              <button
                onClick={() => window.print()}
                className="about-btn-outline"
              >
                <Printer className="about-icon-xs" />
                <span>Print Dossier</span>
              </button>
              <button
                onClick={() => setSelectedLicenseModal(null)}
                className="about-btn-primary"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
