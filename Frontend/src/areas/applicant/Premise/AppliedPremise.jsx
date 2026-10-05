import React, { useState, useMemo } from "react";
import {
  Building2,
  Building,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Search,
  Download,
  Eye,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Plus,
  Printer,
  FileCheck,
  Award,
  CreditCard,
  Hash,
  UserCheck,
  ArrowRight,
  Maximize2,
  Layers,
  Flame
} from "lucide-react";

export default function AppliedPremise({
  premiseApplications: propPremiseApplications = [],
  onNavigateToHome = () => {},
  onNavigateNewPremise = () => {},
  onNavigateToRenewal = () => {},
  onNavigateToDocumentRevalidate = () => {},
  onViewPremise = () => {},
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [activeDossierModal, setActiveDossierModal] = useState(null);
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState("");

  const triggerToast = (msg) => {
    if (showToast) {
      showToast(msg);
    } else {
      setFeedbackToast(msg);
      setTimeout(() => setFeedbackToast(""), 3500);
    }
  };

  // Comprehensive Delhi eAbkari default premises
  const defaultPremiseApplications = [
    {
      id: "PM-2026-6182",
      premiseName: "Central Delhi Logistics Hub",
      address: "Plot 104, Okhla Industrial Area Phase-III, New Delhi - 110020",
      district: "South East Delhi",
      policeStation: "Okhla PS",
      premiseType: "Bonded Warehouse Store",
      dimensions: "4,500 Sq. Ft. (3 Storage Bays)",
      status: "Approved",
      submittedDate: "15/04/2026",
      fireNocNumber: "DFS/NOC/2026/1842",
      certificateNumber: "DEL-PM-CERT-2026-6182",
      validityPeriod: "01/04/2026 to 31/03/2027",
      currentLevel: "Excise Premises Inspection Wing",
      remarks: "CCTV feed integrated & fire safety clearance validated",
      inspectedBy: "Chief Inspector of Premises, South East Circle",
      appraisalStages: [
        { label: "Site Layout & Perimeter Audit", status: "completed", date: "18/04/2026", officer: "Junior Field Surveyor", note: "Approved boundary and entry/exit clearances" },
        { label: "Delhi Fire Services (DFS) NOC", status: "completed", date: "23/04/2026", officer: "Fire Safety Inspector", note: "DFS/NOC/2026/1842 valid and authenticated" },
        { label: "CCTV Telemetry & Strongroom", status: "completed", date: "29/04/2026", officer: "Excise Security Auditor", note: "Dual-lock vault and 30-day recording feed operational" },
        { label: "Physical Premise Certificate", status: "completed", date: "05/05/2026", officer: "Deputy Commissioner (Premises)", note: "Form P-1 Certificate DEL-PM-CERT-2026-6182 granted" }
      ]
    },
    {
      id: "PM-2026-4401",
      premiseName: "South Delhi Retail Suite A",
      address: "Shop No. 12, Ground Floor, Saket District Centre, New Delhi - 110017",
      district: "South Delhi",
      policeStation: "Saket PS",
      premiseType: "Retail Vend Shop",
      dimensions: "450 Sq. Ft. (Single Vend Floor)",
      status: "Under Physical Inspection",
      submittedDate: "20/05/2026",
      fireNocNumber: "DFS/NOC/2026/3011",
      certificateNumber: null,
      validityPeriod: "Pending Inspection",
      currentLevel: "Field Inspection Wing",
      remarks: "Physical safety layout and locker vault verification in progress",
      inspectedBy: "Field Inspection Officer (South)",
      appraisalStages: [
        { label: "Site Layout & Perimeter Audit", status: "completed", date: "24/05/2026", officer: "Site Scrutiny Officer", note: "Floor layout adheres to minimum setback standards" },
        { label: "Delhi Fire Services (DFS) NOC", status: "completed", date: "29/05/2026", officer: "Fire Safety Team", note: "Fire clearance verified" },
        { label: "CCTV Telemetry & Strongroom", status: "in-progress", date: "Ongoing", officer: "Excise Field Inspector", note: "On-site surveillance testing in progress" },
        { label: "Physical Premise Certificate", status: "pending", date: "Pending", officer: "Deputy Commissioner", note: "Awaiting final inspection clearance" }
      ]
    },
    {
      id: "PM-2026-7890",
      premiseName: "Grand Royal Banquet & Occasions",
      address: "Plot 18, Commercial Belt, Chanakyapuri, New Delhi - 110021",
      district: "New Delhi",
      policeStation: "Chanakyapuri PS",
      premiseType: "Banquet Hall",
      dimensions: "12,000 Sq. Ft. (2 Grand Celebration Halls)",
      status: "Approved",
      submittedDate: "10/03/2026",
      fireNocNumber: "DFS/NOC/2026/0921",
      certificateNumber: "DEL-PM-CERT-2026-7890",
      validityPeriod: "01/04/2026 to 31/03/2027",
      currentLevel: "Excise Premises Inspection Wing",
      remarks: "Dual banquet halls certified for licensed service occasions",
      inspectedBy: "Executive Engineer (Excise Facilities)",
      appraisalStages: [
        { label: "Site Layout & Perimeter Audit", status: "completed", date: "15/03/2026", officer: "Urban Planning Liaison", note: "Commercial zoning & master plan clearance verified" },
        { label: "Delhi Fire Services (DFS) NOC", status: "completed", date: "22/03/2026", officer: "DFS Divisional Officer", note: "Hydrant and automatic sprinkler testing cleared" },
        { label: "CCTV Telemetry & Strongroom", status: "completed", date: "28/03/2026", officer: "Excise Surveillance Officer", note: "All public service areas covered by high-def cameras" },
        { label: "Physical Premise Certificate", status: "completed", date: "02/04/2026", officer: "Deputy Commissioner (Premises)", note: "Form P-1 Certificate DEL-PM-CERT-2026-7890 issued" }
      ]
    },
    {
      id: "PM-2026-3125",
      premiseName: "Vedic Greens Retreat & Farm",
      address: "Farm No. 5, Silver Oak Avenue, MG Road, Mehrauli, New Delhi - 110030",
      district: "South West Delhi",
      policeStation: "Vasant Vihar PS",
      premiseType: "Farmhouse",
      dimensions: "25,000 Sq. Ft. (Lawn & Pavilion Area)",
      status: "Clarification Needed",
      submittedDate: "02/06/2026",
      fireNocNumber: "DFS/NOC/2025/7112 (Expired)",
      certificateNumber: null,
      validityPeriod: "Pending Clarification",
      currentLevel: "Document Revalidation Cell",
      remarks: "Renewal Fire NOC and acoustic decibel demarcation certificate required",
      inspectedBy: "Excise Scrutiny Desk (West)",
      appraisalStages: [
        { label: "Site Layout & Perimeter Audit", status: "completed", date: "06/06/2026", officer: "Zonal Field Surveyor", note: "Demarcation map verified" },
        { label: "Delhi Fire Services (DFS) NOC", status: "in-progress", date: "Query Raised", officer: "Licensing Auditor", note: "Updated 2026-27 Fire NOC certificate required" },
        { label: "CCTV Telemetry & Strongroom", status: "pending", date: "Pending", officer: "Field Team", note: "Pending fire clearance" },
        { label: "Physical Premise Certificate", status: "pending", date: "Pending", officer: "Excise Commissionerate", note: "Pending" }
      ]
    },
    {
      id: "PM-2026-5590",
      premiseName: "West Delhi Distributing Depot",
      address: "B-42, Mayapuri Industrial Area Phase-I, New Delhi - 110064",
      district: "West Delhi",
      policeStation: "Mayapuri PS",
      premiseType: "Bonded Warehouse Store",
      dimensions: "3,000 Sq. Ft. (Wholesale Depot Vault)",
      status: "Approved",
      submittedDate: "28/02/2026",
      fireNocNumber: "DFS/NOC/2026/0449",
      certificateNumber: "DEL-PM-CERT-2026-5590",
      validityPeriod: "01/04/2026 to 31/03/2027",
      currentLevel: "Excise Premises Inspection Wing",
      remarks: "Wholesale spirits storage vault fully validated",
      inspectedBy: "Senior Excise Inspector (Bonds)",
      appraisalStages: [
        { label: "Site Layout & Perimeter Audit", status: "completed", date: "04/03/2026", officer: "Field Surveyor", note: "Industrial zoning and bay capacity cleared" },
        { label: "Delhi Fire Services (DFS) NOC", status: "completed", date: "10/03/2026", officer: "Fire Safety Inspector", note: "Industrial hydrant and hose reel approved" },
        { label: "CCTV Telemetry & Strongroom", status: "completed", date: "17/03/2026", officer: "Bonds Security Officer", note: "Reinforced vault gates and surveillance online" },
        { label: "Physical Premise Certificate", status: "completed", date: "24/03/2026", officer: "Deputy Commissioner (Premises)", note: "Form P-1 Certificate DEL-PM-CERT-2026-5590 granted" }
      ]
    }
  ];

  // Normalized data source
  const dataSource = useMemo(() => {
    const raw =
      Array.isArray(propPremiseApplications) && propPremiseApplications.length > 0
        ? propPremiseApplications
        : defaultPremiseApplications;

    return raw.map((app, index) => {
      const defaultMatch = defaultPremiseApplications.find((d) => d.id === app.id);
      const isApproved = app.status === "Approved";
      const isClarification =
        app.status === "Clarification Needed" || app.status === "Clarification";

      const fallbackStages = [
        {
          label: "Site Layout & Perimeter Audit",
          status: "completed",
          date: app.submittedDate || "15/05/2026",
          officer: "Field Scrutiny Officer",
          note: "Premise boundary verified"
        },
        {
          label: "Delhi Fire Services (DFS) NOC",
          status: isClarification ? "in-progress" : "completed",
          date: isApproved ? "22/05/2026" : "Ongoing",
          officer: "Fire Safety Division",
          note: isClarification ? "Fire NOC clarification required" : "Fire safety certified"
        },
        {
          label: "CCTV Telemetry & Strongroom",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "29/05/2026" : "Scheduled",
          officer: "Excise Security Auditor",
          note: isApproved ? "Perimeter security certified" : "Site visit scheduled"
        },
        {
          label: "Physical Premise Certificate",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "05/06/2026" : "Pending",
          officer: "Deputy Commissioner (Premises)",
          note: isApproved ? "Premise certificate active" : "Pending"
        }
      ];

      return {
        id: app.id || `PM-2026-${7000 + index}`,
        premiseName: app.premiseName || defaultMatch?.premiseName || "Registered Excise Premise",
        address: app.address || defaultMatch?.address || "Industrial Facility, NCT of Delhi - 110020",
        district: app.district || defaultMatch?.district || "South Delhi",
        policeStation: app.policeStation || defaultMatch?.policeStation || "Saket PS",
        premiseType: app.premiseType || defaultMatch?.premiseType || "Bonded Warehouse Store",
        dimensions: app.dimensions || defaultMatch?.dimensions || "3,500 Sq. Ft.",
        status: app.status || "Under Physical Inspection",
        submittedDate: app.submittedDate || "15/05/2026",
        fireNocNumber:
          app.fireNocNumber ||
          defaultMatch?.fireNocNumber ||
          `DFS/NOC/2026/${2000 + index}`,
        certificateNumber:
          app.certificateNumber ||
          defaultMatch?.certificateNumber ||
          (isApproved ? `DEL-PM-CERT-2026-0${index + 1}8` : null),
        validityPeriod:
          app.validityPeriod ||
          defaultMatch?.validityPeriod ||
          (isApproved ? "01/04/2026 to 31/03/2027" : "Pending Inspection"),
        currentLevel:
          app.currentLevel ||
          defaultMatch?.currentLevel ||
          (isApproved ? "Excise Premises Inspection Wing" : "Field Scrutiny Desk"),
        remarks:
          app.remarks ||
          defaultMatch?.remarks ||
          "Premise registration undergoing statutory site inspection",
        inspectedBy:
          app.inspectedBy ||
          defaultMatch?.inspectedBy ||
          "Excise Premise Inspection Division",
        appraisalStages:
          Array.isArray(app.appraisalStages) && app.appraisalStages.length > 0
            ? app.appraisalStages
            : defaultMatch?.appraisalStages || fallbackStages
      };
    });
  }, [propPremiseApplications]);

  // Filtering Logic
  const filteredList = useMemo(() => {
    return dataSource.filter((app) => {
      const id = (app.id || "").toLowerCase();
      const name = (app.premiseName || "").toLowerCase();
      const address = (app.address || "").toLowerCase();
      const district = (app.district || "").toLowerCase();
      const ps = (app.policeStation || "").toLowerCase();
      const type = (app.premiseType || "").toLowerCase();
      const fireNoc = (app.fireNocNumber || "").toLowerCase();
      const search = (searchTerm || "").toLowerCase();

      const matchesSearch =
        !search ||
        id.includes(search) ||
        name.includes(search) ||
        address.includes(search) ||
        district.includes(search) ||
        ps.includes(search) ||
        type.includes(search) ||
        fireNoc.includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        app.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        typeFilter === "ALL" ||
        app.premiseType?.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [dataSource, searchTerm, statusFilter, typeFilter]);

  // Status Badge Component
  const getStatusBadge = (status) => {
    if (status === "Approved" || status.includes("Approved") || status.includes("Validated")) {
      return (
        <span className="renewal-badge emerald">
          <CheckCircle2 style={{ width: 12, height: 12, marginRight: 4, display: "inline" }} />
          Validated & Active
        </span>
      );
    }
    if (status.includes("Clarification") || status.includes("Needed")) {
      return (
        <span className="renewal-badge amber">
          <AlertCircle style={{ width: 12, height: 12, marginRight: 4, display: "inline" }} />
          Clarification Needed
        </span>
      );
    }
    return (
      <span className="renewal-badge blue">
        <Clock style={{ width: 12, height: 12, marginRight: 4, display: "inline" }} />
        Under Inspection
      </span>
    );
  };

  const totalCount = dataSource.length;
  const approvedCount = dataSource.filter((a) => a.status === "Approved").length;
  const underInspectionCount = dataSource.filter((a) => a.status !== "Approved").length;

  return (
    <div className="renewal-page-wrapper">
      {/* Toast Notification Banner */}
      {feedbackToast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 10000,
            background: "#012a52",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 10px 25px -5px rgba(1, 42, 82, 0.4)",
            fontSize: "0.875rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          <CheckCircle2 style={{ color: "#22c55e", width: "18px", height: "18px" }} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* 1. Breadcrumb Bar */}
      <div className="renewal-breadcrumb-bar">
        <div className="renewal-page-container">
          <div className="renewal-breadcrumb-inner">
            <div className="renewal-breadcrumb">
              <button
                type="button"
                className="renewal-breadcrumb-link"
                onClick={() => {
                  if (onNavigateToHome) onNavigateToHome();
                }}
              >
                Dashboard
              </button>
              <span>/</span>
              <span>Physical Infrastructure</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Registered Excise Premises & Bonded Facilities</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="renewal-btn-outline"
                style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}
                onClick={() => {
                  if (onNavigateNewPremise) onNavigateNewPremise();
                }}
              >
                <Plus style={{ width: 13, height: 13 }} />
                <span>Register New Premise</span>
              </button>
              <div className="renewal-emblem-badge">
                <span className="renewal-emblem-dot"></span>
                <span>Government of NCT of Delhi • eAbkari Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="renewal-page-container">
        {/* 2. Hero Section */}
        <div className="renewal-hero-section">
          <div className="renewal-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Physical Premise & Bonded Facility Register 2025–2026</span>
          </div>
          <h1 className="renewal-hero-title">Premise Registrations</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{totalCount}</div>
              <div className="renewal-stat-label">Total Premise Applications</div>
              <div className="renewal-stat-note">Bonded, Retail & Hospitality Sites</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{approvedCount}</div>
              <div className="renewal-stat-label">Validated & Active Premises</div>
              <div className="renewal-stat-note">Form P-1 Certificate Active</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{underInspectionCount}</div>
              <div className="renewal-stat-label">Under Inspection / Scrutiny</div>
              <div className="renewal-stat-note">Field Audit Updates Pending</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <Building style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">Excise Premise Inspection & Certification Register</h2>
              <p className="renewal-section-subtitle">
                Track spatial floorplans, fire department clearances, jurisdiction police station approvals, and authenticated physical premise certificates
              </p>
            </div>
          </div>

          {/* Form Group with Search and Category/Status Filters */}
          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="premiseSearchInput" className="renewal-label">
                <Building2 style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Search & Premise Classification Filter</span>
              </label>
              <span className="renewal-badge-count">
                {filteredList.length} Record{filteredList.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <input
                  id="premiseSearchInput"
                  type="text"
                  placeholder="Search by Premise ID, Name, Address, District, PS, or Fire NOC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="renewal-select"
                  style={{ paddingLeft: "2.5rem" }}
                />
                <Search
                  style={{
                    position: "absolute",
                    left: "0.85rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "#64748b"
                  }}
                />
              </div>

              <div className="renewal-select-wrapper" style={{ width: "230px" }}>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Premise Types</option>
                  <option value="Bonded Warehouse Store">Bonded Warehouse Store</option>
                  <option value="Retail Vend Shop">Retail Vend Shop</option>
                  <option value="Banquet Hall">Banquet Hall</option>
                  <option value="Party Hall">Party Hall</option>
                  <option value="Farmhouse">Farmhouse</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>

              <div className="renewal-select-wrapper" style={{ width: "200px" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Appraisal Statuses</option>
                  <option value="Approved">Approved & Active</option>
                  <option value="Under Physical Inspection">Under Inspection</option>
                  <option value="Clarification Needed">Clarification Needed</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>
            </div>
          </div>

          {/* Table or Empty Canvas */}
          {filteredList.length === 0 ? (
            <div className="renewal-empty-canvas">
              <div className="renewal-empty-centerpiece">
                <div className="renewal-empty-icon-shield">
                  <FileText style={{ width: 34, height: 34 }} />
                </div>
                <div className="renewal-empty-badge-float">
                  <AlertCircle style={{ width: 15, height: 15 }} />
                </div>
              </div>

              <div className="renewal-empty-status-tag">
                <span className="renewal-emblem-dot" style={{ backgroundColor: "#f59e0b" }}></span>
                <span>Premise Register: No Matching Record</span>
              </div>

              <h3 className="renewal-empty-title">No Premise records found</h3>
              <p className="renewal-empty-desc">
                No active premise applications match the current query. Clear search terms or adjust facility type and status filters.
              </p>

              <div className="renewal-empty-actions">
                <button
                  type="button"
                  className="renewal-empty-sample-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                    setTypeFilter("ALL");
                  }}
                >
                  <RefreshCw style={{ width: 14, height: 14 }} />
                  <span>Reset Search Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="renewal-table-wrapper">
              <table className="renewal-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: "140px" }}>Premise ID</th>
                    <th style={{ minWidth: "260px" }}>Premise / Facility Name</th>
                    <th style={{ minWidth: "220px" }}>Classification & Space</th>
                    <th style={{ minWidth: "250px" }}>Physical Location & Police Station</th>
                    <th style={{ minWidth: "110px" }}>Filing Date</th>
                    <th style={{ minWidth: "170px" }}>Inspection Status</th>
                    <th style={{ minWidth: "160px" }}>Inspecting Wing</th>
                    <th style={{ minWidth: "165px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((premise) => {
                    const isApproved = premise.status === "Approved";
                    return (
                      <tr key={premise.id}>
                        {/* Premise ID */}
                        <td style={{ verticalAlign: "top" }}>
                          <span className="renewal-lic-id-tag">{premise.id}</span>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "4px" }}>
                            Registered Facility
                          </span>
                        </td>

                        {/* Facility Name & Safety Details */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.875rem", lineHeight: "1.4" }}>
                            {premise.premiseName}
                          </strong>
                          <span style={{ fontSize: "0.75rem", color: "#475569", marginTop: "3px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Flame style={{ width: 13, height: 13, color: "#e11d48" }} />
                            <span>Fire NOC: <strong style={{ color: "#334155" }}>{premise.fireNocNumber}</strong></span>
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block", marginTop: "1px" }}>
                            Inspection: {premise.inspectedBy}
                          </span>
                        </td>

                        {/* Premise Type & Built Dimensions */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#1e293b", display: "block", fontSize: "0.85rem" }}>
                            {premise.premiseType}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#0369a1", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                            <Maximize2 style={{ width: 12, height: 12 }} />
                            <span>{premise.dimensions}</span>
                          </span>
                        </td>

                        {/* Physical Address & PS Jurisdiction */}
                        <td style={{ verticalAlign: "top" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "5px", fontSize: "0.8125rem", color: "#334155" }}>
                            <MapPin style={{ width: 14, height: 14, color: "#0284c7", marginTop: 2, flexShrink: 0 }} />
                            <span style={{ lineHeight: 1.35 }}>{premise.address}</span>
                          </div>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "3px", paddingLeft: "19px" }}>
                            District: <strong>{premise.district}</strong> • PS: <strong>{premise.policeStation}</strong>
                          </span>
                        </td>

                        {/* Filing Date */}
                        <td style={{ verticalAlign: "top" }}>
                          <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar style={{ width: 13, height: 13, color: "#64748b" }} />
                            <span>{premise.submittedDate}</span>
                          </span>
                        </td>

                        {/* Inspection Status & Progress stages */}
                        <td style={{ verticalAlign: "top" }}>
                          <div>{getStatusBadge(premise.status)}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", marginTop: "6px" }}>
                            {(premise.appraisalStages || []).map((st, sIdx) => {
                              const isDone = st.status === "completed";
                              const isInProg = st.status === "in-progress";
                              return (
                                <div
                                  key={sIdx}
                                  style={{
                                    height: "4px",
                                    borderRadius: "9999px",
                                    backgroundColor: isDone ? "#10b981" : isInProg ? "#0284c7" : "#cbd5e1"
                                  }}
                                  title={`${st.label}: ${st.status}`}
                                />
                              );
                            })}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px" }}>
                            4-Stage Statutory Appraisal
                          </div>
                        </td>

                        {/* Inspecting Wing */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.8125rem" }}>
                            {premise.currentLevel}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#64748b", fontStyle: "italic", display: "block", marginTop: "2px" }}>
                            {premise.remarks}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td style={{ verticalAlign: "top" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <button
                              type="button"
                              className="renewal-btn-primary"
                              style={{
                                justifyContent: "center",
                                padding: "0.45rem 0.8rem",
                                fontSize: "0.78rem"
                              }}
                              onClick={() => {
                                setActiveDossierModal(premise);
                                onViewPremise(premise.id);
                              }}
                            >
                              <FileCheck style={{ width: 14, height: 14 }} />
                              <span>View Dossier</span>
                            </button>

                            {isApproved && (
                              <button
                                type="button"
                                className="renewal-btn-outline"
                                style={{
                                  justifyContent: "center",
                                  padding: "0.45rem 0.8rem",
                                  fontSize: "0.78rem",
                                  borderColor: "#86efac",
                                  backgroundColor: "#f0fdf4",
                                  color: "#166534"
                                }}
                                onClick={() => setActiveCertificateModal(premise)}
                              >
                                <Award style={{ width: 14, height: 14 }} />
                                <span>Premise Pass</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. Pillars & Mandate Info Cards */}
          <div className="renewal-pillar-grid" style={{ marginTop: "2rem" }}>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <Flame style={{ width: 20, height: 20, color: "#e11d48" }} />
              </div>
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">Fire Safety & MCD Compliance</h4>
              <p className="renewal-pillar-desc">
                Mandatory Delhi Fire Services (DFS) clearances, functional fire suppression equipment, and municipal trade authorizations for all licensed units.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">CCTV Telemetry & Strongrooms</h4>
              <p className="renewal-pillar-desc">
                24/7 high-definition digital surveillance with 30-day recorded cloud telemetry and heavy-gauge vault security for bonded storage units.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <Award style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Form P-1 Digital Certificate</h4>
              <p className="renewal-pillar-desc">
                Digitally authenticated Physical Premise Authorization Certificate with encrypted QR verification for statutory inspection compliance.
              </p>
            </div>
          </div>

          {/* Assistance Banner */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Excise Physical Premises Scrutiny Cell & Helpdesk</h4>
              <p className="renewal-assistance-desc">
                Require scheduling for site inspections, acoustic layout clearance, or fire NOC renewals? Contact the Excise Premises Division at GNCTD.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => triggerToast("Connecting to Excise Premise Scrutiny Desk (Toll Free: 1800-11-2009)")}
            >
              <HelpCircle style={{ width: 14, height: 14 }} />
              <span>Contact Premise Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          MODAL 1: PREMISE TECHNICAL DOSSIER MODAL
          ============================================================ */}
      {activeDossierModal && (
        <div className="renewal-modal-overlay" onClick={() => setActiveDossierModal(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="renewal-modal-header">
              <div className="renewal-modal-title">
                <FileCheck style={{ width: 20, height: 20, color: "#0284c7" }} />
                <span>Premise Technical Dossier — {activeDossierModal.id}</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                onClick={() => setActiveDossierModal(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Summary Grid */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Facility Name:</span>
                <span className="renewal-summary-val" style={{ fontWeight: 700, color: "#012a52" }}>
                  {activeDossierModal.premiseName}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Premise Classification:</span>
                <span className="renewal-summary-val">{activeDossierModal.premiseType}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Physical Dimensions:</span>
                <span className="renewal-summary-val" style={{ color: "#0369a1", fontWeight: 700 }}>
                  {activeDossierModal.dimensions}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Physical Address:</span>
                <span className="renewal-summary-val">{activeDossierModal.address}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Police Station & District:</span>
                <span className="renewal-summary-val">
                  {activeDossierModal.policeStation} • {activeDossierModal.district}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Fire Services (DFS) NOC:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#e11d48", fontWeight: 700 }}>
                  {activeDossierModal.fireNocNumber}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Inspection Status:</span>
                <span className="renewal-summary-val">{getStatusBadge(activeDossierModal.status)}</span>
              </div>
            </div>

            {/* Statutory 4-Stage Appraisal Checklist */}
            <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0 0 0.75rem 0", fontWeight: 600 }}>
              Statutory 4-Stage Verification & Scrutiny Stages
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
              {(activeDossierModal.appraisalStages || []).map((stage, idx) => {
                const isCompleted = stage.status === "completed";
                const isInProgress = stage.status === "in-progress";
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: isCompleted ? "#bbf7d0" : isInProgress ? "#bae6fd" : "#e2e8f0",
                      backgroundColor: isCompleted ? "#f0fdf4" : isInProgress ? "#f0f9ff" : "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      {isCompleted ? (
                        <CheckCircle2 style={{ width: 18, height: 18, color: "#16a34a", marginTop: 2, flexShrink: 0 }} />
                      ) : isInProgress ? (
                        <Clock style={{ width: 18, height: 18, color: "#0284c7", marginTop: 2, flexShrink: 0 }} />
                      ) : (
                        <Clock style={{ width: 18, height: 18, color: "#94a3b8", marginTop: 2, flexShrink: 0 }} />
                      )}
                      <div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0f172a" }}>
                          {stage.label}
                        </div>
                        <div style={{ fontSize: "0.725rem", color: "#475569", marginTop: 2 }}>
                          Officer: <span style={{ fontWeight: 600 }}>{stage.officer}</span> • Date: {stage.date}
                        </div>
                        {stage.note && (
                          <div style={{ fontSize: "0.7rem", color: "#64748b", fontStyle: "italic", marginTop: 2 }}>
                            "{stage.note}"
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`renewal-badge ${isCompleted ? "emerald" : isInProgress ? "blue" : "amber"}`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {stage.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1.25rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
              <button
                type="button"
                className="renewal-btn-outline"
                onClick={() => setActiveDossierModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={() => triggerToast(`Premise Technical Dossier for ${activeDossierModal.id} sent to print spooler`)}
              >
                <Printer style={{ width: 14, height: 14 }} />
                <span>Print Dossier Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: OFFICIAL PREMISE AUTHORIZATION CERTIFICATE (FORM P-1)
          ============================================================ */}
      {activeCertificateModal && (
        <div className="renewal-modal-overlay" onClick={() => setActiveCertificateModal(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="renewal-modal-header" style={{ backgroundColor: "#012a52", margin: "-1.75rem -1.75rem 1.25rem -1.75rem", padding: "1.25rem 1.75rem", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
              <div className="renewal-modal-title" style={{ color: "#ffffff" }}>
                <Award style={{ width: 20, height: 20, color: "#38bdf8" }} />
                <span>Physical Premise Authorization Certificate (Form P-1)</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
                onClick={() => setActiveCertificateModal(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Official Pass Content */}
            <div
              style={{
                border: "2px solid #012a52",
                borderRadius: "8px",
                padding: "1.25rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 6px rgba(1, 42, 82, 0.05)"
              }}
            >
              {/* Emblem Header */}
              <div style={{ textAlign: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="National Emblem"
                  style={{ width: "32px", height: "auto", margin: "0 auto 0.4rem auto" }}
                  referrerPolicy="no-referrer"
                />
                <h4 style={{ margin: 0, fontSize: "0.8125rem", color: "#012a52", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  GOVERNMENT OF NATIONAL CAPITAL TERRITORY OF DELHI
                </h4>
                <h5 style={{ margin: "0.15rem 0 0 0", fontSize: "0.725rem", color: "#475569", fontWeight: 600 }}>
                  DEPARTMENT OF EXCISE, ENTERTAINMENT & LUXURY TAX
                </h5>
                <div style={{ marginTop: "0.4rem", display: "inline-block", padding: "0.2rem 0.65rem", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "9999px", fontSize: "0.725rem", fontWeight: 700, color: "#166534" }}>
                  PHYSICAL PREMISE AUTHORIZATION CERTIFICATE • FORM P-1
                </div>
              </div>

              {/* Pass Identifiers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    PREMISE CERTIFICATE NUMBER
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#012a52", fontFamily: "monospace" }}>
                    {activeCertificateModal.certificateNumber || "DEL-PM-CERT-2026-6182"}
                  </span>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    VALIDITY FINANCIAL PERIOD
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#166534" }}>
                    {activeCertificateModal.validityPeriod || "01/04/2026 to 31/03/2027"}
                  </span>
                </div>
              </div>

              {/* Entity Data */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8125rem", color: "#334155", marginBottom: "1rem" }}>
                <div>
                  <strong style={{ color: "#012a52" }}>Certified Facility Name:</strong> {activeCertificateModal.premiseName}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Premise Classification:</strong> {activeCertificateModal.premiseType}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Authorized Built-Up Space:</strong> {activeCertificateModal.dimensions}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Physical Site Address:</strong> {activeCertificateModal.address}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Jurisdiction:</strong> {activeCertificateModal.policeStation}, {activeCertificateModal.district}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Fire Services NOC Ref:</strong> {activeCertificateModal.fireNocNumber}
                </div>
              </div>

              {/* Sign-off footer */}
              <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>Date of Issuance: {activeCertificateModal.submittedDate}</div>
                  <div style={{ fontSize: "0.6875rem", color: "#0284c7", fontWeight: 700, marginTop: "2px" }}>
                    Digitally Signed via GNCTD eAbkari Core
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#012a52" }}>
                    Deputy Commissioner (Premises)
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>
                    Excise Department, GNCT of Delhi
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1.25rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
              <button
                type="button"
                className="renewal-btn-outline"
                onClick={() => setActiveCertificateModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={() => triggerToast(`Downloading Official Form P-1 Certificate for ${activeCertificateModal.premiseName}`)}
              >
                <Download style={{ width: 14, height: 14 }} />
                <span>Download Form P-1 PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
