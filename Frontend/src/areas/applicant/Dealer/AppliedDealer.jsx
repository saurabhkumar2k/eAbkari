import React, { useState, useMemo } from "react";
import {
  Store,
  Building2,
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
  MapPin,
  CreditCard,
  Hash,
  UserCheck,
  ArrowRight
} from "lucide-react";

export default function AppliedDealer({
  dealerApplications: propDealerApplications = [],
  onNavigateToHome = () => {},
  onNavigateNewDealer = () => {},
  onNavigateAppliedLicense = () => {},
  onNavigateToRenewal = () => {},
  onNavigateToDocumentRevalidate = () => {},
  onViewDealer = () => {},
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [activeDossierModal, setActiveDossierModal] = useState(null);
  const [activePassModal, setActivePassModal] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState("");

  const triggerToast = (msg) => {
    if (showToast) {
      showToast(msg);
    } else {
      setFeedbackToast(msg);
      setTimeout(() => setFeedbackToast(""), 3500);
    }
  };

  // Comprehensive default dataset matching Delhi Excise eAbkari Portal standards
  const defaultDealerApplications = [
    {
      id: "DLR-2026-9022",
      firmName: "Saraswati Wholesale Wine Merchants",
      ownerName: "Rajinder K. Saraswati",
      licenseType: "L-15 Wholesale Custom Bond Warehouse",
      categoryClass: "Wholesale",
      panNum: "AAACS0811K",
      gstinNum: "07AAACS0811K1Z2",
      warehouseAddress: "Plot 42, Mohan Cooperative Industrial Estate, Mathura Road, South Delhi - 110044",
      status: "Approved",
      submittedDate: "12/04/2026",
      securityDeposit: "₹ 5,00,000 (Verified & Deposited)",
      approvalPassNo: "DEL-DLR-AUTH-2026-0922",
      validityPeriod: "01/04/2026 to 31/03/2027",
      currentLevel: "Excise Commissionerate",
      remarks: "account active, security earnest money deposited",
      appraisalStages: [
        { label: "Credentials Audit", status: "completed", date: "15/04/2026", officer: "Registrar of Firms", note: "PAN, GSTIN & CIN KYC cleared" },
        { label: "Tax Clearance Verification", status: "completed", date: "22/04/2026", officer: "Commercial Tax Officer", note: "Delhi GST & VAT clearances verified without default" },
        { label: "Stockroom Security Inspection", status: "completed", date: "29/04/2026", officer: "Excise Inspector (Bonds)", note: "CCTV surveillance & perimeter safety compliant" },
        { label: "Authorization Active", status: "completed", date: "05/05/2026", officer: "Deputy Commissioner (Trade)", note: "Dealer Pass DEL-DLR-AUTH-2026-0922 issued" }
      ]
    },
    {
      id: "DLR-2026-6130",
      firmName: "Northern India Spirits Retailers LLP",
      ownerName: "Vikram Ahuja",
      licenseType: "L-2 Retail Vend of Beer & Wine",
      categoryClass: "Retail",
      panNum: "AABCP1130M",
      gstinNum: "07AABCP1130M1ZK",
      warehouseAddress: "Unit 108, DLF Industrial Complex, Kirti Nagar, West Delhi - 110015",
      status: "Under Assessment",
      submittedDate: "18/05/2026",
      securityDeposit: "₹ 3,00,000 (Under Scrutiny)",
      approvalPassNo: null,
      validityPeriod: "Pending Approval",
      currentLevel: "Field Inspection Wing",
      remarks: "Physical stockroom verification in progress",
      appraisalStages: [
        { label: "Credentials Audit", status: "completed", date: "21/05/2026", officer: "Scrutiny Desk", note: "Corporate charter and partnership deed verified" },
        { label: "Tax Clearance Verification", status: "completed", date: "28/05/2026", officer: "Revenue Audit Cell", note: "No active commercial tax default recorded" },
        { label: "Stockroom Security Inspection", status: "in-progress", date: "Ongoing", officer: "Field Scrutiny Team", note: "On-site premises audit scheduled" },
        { label: "Authorization Active", status: "pending", date: "Pending", officer: "Excise Commissionerate", note: "Awaiting final inspection clearance" }
      ]
    },
    {
      id: "DLR-2026-3398",
      firmName: "Vedic Craft Beverages LLP",
      ownerName: "Sumit Sharma",
      licenseType: "L-13 Wholesale Import Bond Storage",
      categoryClass: "Wholesale",
      panNum: "AAPCS9912C",
      gstinNum: "07AAPCS9912C1ZP",
      warehouseAddress: "Plot 24, Kirti Nagar Industrial Area, West Delhi - 110015",
      status: "Clarification Needed",
      submittedDate: "02/06/2026",
      securityDeposit: "₹ 5,00,000 (Pending Submission)",
      approvalPassNo: null,
      validityPeriod: "Pending Clarification",
      currentLevel: "Document Revalidation Cell",
      remarks: "Updated fire safety NOC required for warehouse facility",
      appraisalStages: [
        { label: "Credentials Audit", status: "completed", date: "05/06/2026", officer: "Scrutiny Desk", note: "Identity credentials found in order" },
        { label: "Tax Clearance Verification", status: "in-progress", date: "Query Raised", officer: "Licensing Auditor", note: "Fire safety NOC renewal certificate requested" },
        { label: "Stockroom Security Inspection", status: "pending", date: "Pending", officer: "Field Team", note: "Pending document clearance" },
        { label: "Authorization Active", status: "pending", date: "Pending", officer: "Excise Commissionerate", note: "Pending" }
      ]
    },
    {
      id: "DLR-2026-1184",
      firmName: "Apex Capital Distillers & Traders Pvt Ltd",
      ownerName: "Manish Singhal",
      licenseType: "L-1 Wholesale Vend of Indian Liquor",
      categoryClass: "Wholesale",
      panNum: "AABCA4419E",
      gstinNum: "07AABCA4419E1Z8",
      warehouseAddress: "G-12, Lawrence Road Industrial Area, North Delhi - 110035",
      status: "Approved",
      submittedDate: "14/03/2026",
      securityDeposit: "₹ 10,00,000 (Verified & Deposited)",
      approvalPassNo: "DEL-DLR-AUTH-2026-0118",
      validityPeriod: "01/04/2026 to 31/03/2027",
      currentLevel: "Excise Commissionerate",
      remarks: "Authorized wholesale distributor pass active",
      appraisalStages: [
        { label: "Credentials Audit", status: "completed", date: "17/03/2026", officer: "Corporate Registrar Cell", note: "Verified with RoC and Income Tax Master" },
        { label: "Tax Clearance Verification", status: "completed", date: "24/03/2026", officer: "VAT Audit Officer", note: "Tax assessment clear for last 3 financial years" },
        { label: "Stockroom Security Inspection", status: "completed", date: "31/03/2026", officer: "Excise Field Inspector", note: "Barcoded bay storage and security locks approved" },
        { label: "Authorization Active", status: "completed", date: "05/04/2026", officer: "Excise Commissioner", note: "Pass DEL-DLR-AUTH-2026-0118 issued" }
      ]
    }
  ];

  // Normalized data source
  const dataSource = useMemo(() => {
    const raw =
      Array.isArray(propDealerApplications) && propDealerApplications.length > 0
        ? propDealerApplications
        : defaultDealerApplications;

    return raw.map((app, index) => {
      const defaultMatch = defaultDealerApplications.find((d) => d.id === app.id);
      const isApproved = app.status === "Approved";
      const isClarification =
        app.status === "Clarification Needed" || app.status === "Clarification";

      const fallbackStages = [
        {
          label: "Credentials Audit",
          status: "completed",
          date: app.submittedDate || "15/05/2026",
          officer: "Scrutiny Desk",
          note: "Identity credentials verified"
        },
        {
          label: "Tax Clearance Verification",
          status: isClarification ? "in-progress" : "completed",
          date: isApproved ? "22/05/2026" : "Ongoing",
          officer: "Revenue Audit Cell",
          note: isClarification ? "Clarification pending" : "Clearance verified"
        },
        {
          label: "Stockroom Security Inspection",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "29/05/2026" : "Scheduled",
          officer: "Excise Inspector (Bonds)",
          note: isApproved ? "Security certified" : "Site visit scheduled"
        },
        {
          label: "Authorization Active",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "05/06/2026" : "Pending",
          officer: "Deputy Commissioner (Trade)",
          note: isApproved ? "pass released" : "Pending"
        }
      ];

      return {
        id: app.id || `DLR-2026-${8000 + index}`,
        firmName: app.firmName || defaultMatch?.firmName || "Registered Corporation",
        ownerName: app.ownerName || defaultMatch?.ownerName || "Authorized Signatory",
        licenseType: app.licenseType || defaultMatch?.licenseType || "L-15 Wholesale Bond Warehouse",
        categoryClass:
          app.categoryClass ||
          defaultMatch?.categoryClass ||
          (app.licenseType?.toLowerCase().includes("retail") ? "Retail" : "Wholesale"),
        panNum: app.panNum || defaultMatch?.panNum || `AAPCD${1000 + index}K`,
        gstinNum: app.gstinNum || defaultMatch?.gstinNum || `07AAPCD${1000 + index}K1Z4`,
        warehouseAddress:
          app.warehouseAddress ||
          defaultMatch?.warehouseAddress ||
          "Industrial Warehouse Area, NCT of Delhi - 110020",
        status: app.status || "Under Assessment",
        submittedDate: app.submittedDate || "15/05/2026",
        securityDeposit:
          app.securityDeposit ||
          defaultMatch?.securityDeposit ||
          (isApproved ? "₹ 5,00,000 (Verified)" : "₹ 5,00,000 (Under Scrutiny)"),
        approvalPassNo:
          app.approvalPassNo ||
          defaultMatch?.approvalPassNo ||
          (isApproved ? `DEL-DLR-AUTH-2026-0${index + 1}2` : null),
        validityPeriod:
          app.validityPeriod ||
          defaultMatch?.validityPeriod ||
          (isApproved ? "01/04/2026 to 31/03/2027" : "Pending Clearance"),
        currentLevel:
          app.currentLevel ||
          defaultMatch?.currentLevel ||
          (isApproved ? "Excise Commissionerate" : "Scrutiny Cell"),
        remarks:
          app.remarks ||
          defaultMatch?.remarks ||
          "Dealer registration undergoing regulatory audit",
        appraisalStages:
          Array.isArray(app.appraisalStages) && app.appraisalStages.length > 0
            ? app.appraisalStages
            : defaultMatch?.appraisalStages || fallbackStages
      };
    });
  }, [propDealerApplications]);

  // Filtering Logic
  const filteredList = useMemo(() => {
    return dataSource.filter((app) => {
      const id = (app.id || "").toLowerCase();
      const firm = (app.firmName || "").toLowerCase();
      const owner = (app.ownerName || "").toLowerCase();
      const type = (app.licenseType || "").toLowerCase();
      const pan = (app.panNum || "").toLowerCase();
      const gstin = (app.gstinNum || "").toLowerCase();
      const warehouse = (app.warehouseAddress || "").toLowerCase();
      const search = (searchTerm || "").toLowerCase();

      const matchesSearch =
        !search ||
        id.includes(search) ||
        firm.includes(search) ||
        owner.includes(search) ||
        type.includes(search) ||
        pan.includes(search) ||
        gstin.includes(search) ||
        warehouse.includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        app.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesCategory =
        categoryFilter === "ALL" ||
        app.categoryClass?.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [dataSource, searchTerm, statusFilter, categoryFilter]);

  // Status Badge Component exactly matching DocumentRevalidation.jsx
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
        In Review / Assessment
      </span>
    );
  };

  const totalCount = dataSource.length;
  const approvedCount = dataSource.filter((a) => a.status === "Approved").length;
  const underReviewCount = dataSource.filter((a) => a.status !== "Approved").length;

  return (
    <div className="renewal-page-wrapper">
      {/* Toast Notification Banner (identical to DocumentRevalidation.jsx) */}
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

      {/* 1. Breadcrumb Bar - identical to DocumentRevalidation.jsx */}
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
              <span>Licensing Wing</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Applied Dealers Registrations</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="renewal-btn-outline"
                style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}
                onClick={() => {
                  if (onNavigateNewDealer) onNavigateNewDealer();
                }}
              >
                <Plus style={{ width: 13, height: 13 }} />
                <span>Register New Dealer</span>
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
        {/* 2. Hero Section - identical to DocumentRevalidation.jsx */}
        <div className="renewal-hero-section">
          <div className="renewal-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Wholesale & Retail Dealer Wing 2025–2026</span>
          </div>
          <h1 className="renewal-hero-title">Dealer Registrations & Authorizations</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Ensuring statutory dealer compliance, bonded warehouse inspection certifications, earnest money deposit verifications, and authenticated dealer authorization passes for registered liquor trading establishments across the National Capital Territory of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip - identical to DocumentRevalidation.jsx */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Store style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{totalCount}</div>
              <div className="renewal-stat-label">Total Dealer Filings</div>
              <div className="renewal-stat-note">& Wholesale Accounts</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{approvedCount}</div>
              <div className="renewal-stat-label">Active & Authorized Dealers</div>
              <div className="renewal-stat-note">Digital Pass Form D-1 Issued</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{underReviewCount}</div>
              <div className="renewal-stat-label">Under Scrutiny / Review</div>
              <div className="renewal-stat-note">Clearance Updates Pending</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card - identical to DocumentRevalidation.jsx highlight-card */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">Excise Dealer Registration Register</h2>
              <p className="renewal-section-subtitle">
                Review corporate credentials, inspect warehouse clearances, audit tax clearances, and issue digitally verified authorization passes
              </p>
            </div>
          </div>

          {/* Form Group with Search and Category/Status Filters */}
          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="dealerSearchInput" className="renewal-label">
                <Store style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Search & Category Filter</span>
              </label>
              <span className="renewal-badge-count">
                {filteredList.length} Record{filteredList.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <input
                  id="dealerSearchInput"
                  type="text"
                  placeholder="Search by Dealer ID, Firm Name, Proprietor, PAN, GSTIN, or Warehouse..."
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

              <div className="renewal-select-wrapper" style={{ width: "220px" }}>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Classes</option>
                  <option value="Wholesale">Wholesale (L-1/L-13/L-15)</option>
                  <option value="Retail">Retail Vends (L-2)</option>
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
                  <option value="Under Assessment">Under Assessment</option>
                  <option value="Clarification Needed">Clarification Needed</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>
            </div>
          </div>

          {/* Table or Empty Canvas (identical to DocumentRevalidation.jsx) */}
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
                <span>Dealer Register: No Matching Record</span>
              </div>

              <h3 className="renewal-empty-title">No Dealer records found</h3>
              <p className="renewal-empty-desc">
                No active dealer applications match the current query. Clear search terms or adjust category and status filters.
              </p>

              <div className="renewal-empty-actions">
                <button
                  type="button"
                  className="renewal-empty-sample-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                    setCategoryFilter("ALL");
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
                    <th style={{ minWidth: "140px" }}>Dealer ID</th>
                    <th style={{ minWidth: "260px" }}>Trading Corporation & Proprietor</th>
                    <th style={{ minWidth: "220px" }}>License Class</th>
                    <th style={{ minWidth: "230px" }}>Bonded Storage Premises</th>
                    <th style={{ minWidth: "110px" }}>Filing Date</th>
                    <th style={{ minWidth: "170px" }}>Appraisal Status</th>
                    <th style={{ minWidth: "160px" }}>Scrutiny Desk</th>
                    <th style={{ minWidth: "165px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((dealer) => {
                    const isApproved = dealer.status === "Approved";
                    return (
                      <tr key={dealer.id}>
                        {/* Dealer ID */}
                        <td style={{ verticalAlign: "top" }}>
                          <span className="renewal-lic-id-tag">{dealer.id}</span>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "4px" }}>
                            Registered Trader
                          </span>
                        </td>

                        {/* Trading Corporation & Proprietor */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.875rem", lineHeight: "1.4" }}>
                            {dealer.firmName}
                          </strong>
                          <span style={{ fontSize: "0.75rem", color: "#475569", marginTop: "3px", display: "block" }}>
                            Proprietor: <strong style={{ color: "#334155" }}>{dealer.ownerName}</strong>
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "ui-monospace, monospace", display: "block", marginTop: "1px" }}>
                            PAN: {dealer.panNum} • GST: {dealer.gstinNum}
                          </span>
                        </td>

                        {/* License Category */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#1e293b", display: "block", fontSize: "0.85rem" }}>
                            {dealer.licenseType}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#0369a1", fontWeight: 600, display: "inline-block", marginTop: "2px" }}>
                            {dealer.categoryClass} Category • {dealer.securityDeposit}
                          </span>
                        </td>

                        {/* Bonded Storage Warehouse Premises */}
                        <td style={{ verticalAlign: "top" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "5px", fontSize: "0.8125rem", color: "#334155" }}>
                            <MapPin style={{ width: 14, height: 14, color: "#0284c7", marginTop: 2, flexShrink: 0 }} />
                            <span style={{ lineHeight: 1.35 }}>{dealer.warehouseAddress}</span>
                          </div>
                        </td>

                        {/* Filing Date */}
                        <td style={{ verticalAlign: "top" }}>
                          <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar style={{ width: 13, height: 13, color: "#64748b" }} />
                            <span>{dealer.submittedDate}</span>
                          </span>
                        </td>

                        {/* Appraisal Status & Progress stages */}
                        <td style={{ verticalAlign: "top" }}>
                          <div>{getStatusBadge(dealer.status)}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", marginTop: "6px" }}>
                            {(dealer.appraisalStages || []).map((st, sIdx) => {
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

                        {/* Scrutiny Desk */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.8125rem" }}>
                            {dealer.currentLevel}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#64748b", fontStyle: "italic", display: "block", marginTop: "2px" }}>
                            {dealer.remarks}
                          </span>
                        </td>

                        {/* Action Buttons matching DocumentRevalidation.jsx */}
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
                                setActiveDossierModal(dealer);
                                onViewDealer(dealer.id);
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
                                onClick={() => setActivePassModal(dealer)}
                              >
                                <Award style={{ width: 14, height: 14 }} />
                                <span>Pass</span>
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

          {/* 5. Pillars & Mandate Info Cards - identical to DocumentRevalidation.jsx */}
          <div className="renewal-pillar-grid" style={{ marginTop: "2rem" }}>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">Bonded Storage Compliance</h4>
              <p className="renewal-pillar-desc">
                Physical warehouse perimeter security, tamper-evident bay locks, and high-definition CCTV telemetry certified by the Excise Inspectorate.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <CheckCircle2 style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">Tax & Revenue Clearances</h4>
              <p className="renewal-pillar-desc">
                Continuous real-time verification of Delhi GST returns, commercial VAT history, and earnest security deposits held in government treasury.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <FileCheck style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Digital Authorization Pass</h4>
              <p className="renewal-pillar-desc">
                Immediate issuance of Form D-1 Excise Pass with encrypted QR authentication for movement and wholesale receipt of spirits.
              </p>
            </div>
          </div>

          {/* Grievance / Assistance Banner - identical to DocumentRevalidation.jsx */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Excise Dealer Helpdesk & Scrutiny Cell</h4>
              <p className="renewal-assistance-desc">
                Encountering discrepancies in warehouse inspection scheduling or earnest money credit? Contact the Licensing Division at eAbkari GNCTD.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => triggerToast("Connecting to Excise Dealer Scrutiny Desk (Toll Free: 1800-11-2009)")}
            >
              <HelpCircle style={{ width: 14, height: 14 }} />
              <span>Contact Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          MODAL 1: DEALER TECHNICAL DOSSIER MODAL (renewal.css modal)
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
                <span>Dealer Technical Dossier — {activeDossierModal.id}</span>
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
                <span className="renewal-summary-label">Trading Entity:</span>
                <span className="renewal-summary-val" style={{ fontWeight: 700, color: "#012a52" }}>
                  {activeDossierModal.firmName}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Proprietor / Signatory:</span>
                <span className="renewal-summary-val">
                  {activeDossierModal.ownerName} (PAN: {activeDossierModal.panNum})
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">GSTIN Identification:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#0369a1" }}>
                  {activeDossierModal.gstinNum}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">License Category Class:</span>
                <span className="renewal-summary-val">{activeDossierModal.licenseType}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Earnest Security Deposit:</span>
                <span className="renewal-summary-val" style={{ color: "#166534", fontWeight: 700 }}>
                  {activeDossierModal.securityDeposit}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Bonded Storage Facility:</span>
                <span className="renewal-summary-val">{activeDossierModal.warehouseAddress}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Appraisal Status:</span>
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
                onClick={() => triggerToast(`Dealer Technical Dossier for ${activeDossierModal.id} sent to print spooler`)}
              >
                <Printer style={{ width: 14, height: 14 }} />
                <span>Print Dossier Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: OFFICIAL DEALER AUTHORIZATION PASS (renewal.css modal)
          ============================================================ */}
      {activePassModal && (
        <div className="renewal-modal-overlay" onClick={() => setActivePassModal(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="renewal-modal-header" style={{ backgroundColor: "#012a52", margin: "-1.75rem -1.75rem 1.25rem -1.75rem", padding: "1.25rem 1.75rem", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
              <div className="renewal-modal-title" style={{ color: "#ffffff" }}>
                <Award style={{ width: 20, height: 20, color: "#38bdf8" }} />
                <span>Excise Dealer Authorization Pass (Form D-1)</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
                onClick={() => setActivePassModal(null)}
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
                  DEALER AUTHORIZATION CERTIFICATE • FORM D-1
                </div>
              </div>

              {/* Pass Identifiers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    PASS AUTHORIZATION NUMBER
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#012a52", fontFamily: "monospace" }}>
                    {activePassModal.approvalPassNo || "DEL-DLR-AUTH-2026-0922"}
                  </span>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    VALIDITY FINANCIAL PERIOD
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#166534" }}>
                    {activePassModal.validityPeriod || "01/04/2026 to 31/03/2027"}
                  </span>
                </div>
              </div>

              {/* Entity Data */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8125rem", color: "#334155", marginBottom: "1rem" }}>
                <div>
                  <strong style={{ color: "#012a52" }}>Authorized Trading Corporation:</strong> {activePassModal.firmName}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Proprietor / Representative:</strong> {activePassModal.ownerName} (PAN: {activePassModal.panNum})
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>State GSTIN:</strong> {activePassModal.gstinNum}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Licensed Class:</strong> {activePassModal.licenseType}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Approved Storage Warehouse:</strong> {activePassModal.warehouseAddress}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Earnest Money Treasury Receipt:</strong> {activePassModal.securityDeposit}
                </div>
              </div>

              {/* Sign-off footer */}
              <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>Date of Issuance: {activePassModal.submittedDate}</div>
                  <div style={{ fontSize: "0.6875rem", color: "#0284c7", fontWeight: 700, marginTop: "2px" }}>
                    Digitally Signed via GNCTD eAbkari Core
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#012a52" }}>
                    Deputy Commissioner (Trade)
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
                onClick={() => setActivePassModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={() => triggerToast(`Downloading Official Pass for ${activePassModal.id}`)}
              >
                <Download style={{ width: 14, height: 14 }} />
                <span>Download Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
