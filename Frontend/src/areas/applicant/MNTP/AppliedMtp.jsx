import React, { useState, useMemo } from "react";
import {
  FlaskConical,
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
  Layers,
  ArrowRight
} from "lucide-react";

export default function AppliedMTP({
  applications: propApplications = [],
  onNavigateToHome = () => {},
  onNavigateToNewMtp = () => {},
  onNavigateToRenewal = () => {},
  onNavigateToDocumentRevalidate = () => {},
  showToast
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classificationFilter, setClassificationFilter] = useState("ALL");

  const [selectedAppForDossier, setSelectedAppForDossier] = useState(null);
  const [selectedAppForCert, setSelectedAppForCert] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState("");

  const triggerToast = (msg) => {
    if (showToast) {
      showToast(msg);
    } else {
      setFeedbackToast(msg);
      setTimeout(() => setFeedbackToast(""), 4000);
    }
  };

  // Comprehensive default M&TP applications under Delhi Excise
  const defaultApplications = [
    {
      id: "MTP-2026-0811",
      unitName: "Bio-Herbal Pharmaceuticals Ltd",
      unitAddress: "Plot No. 42, Okhla Industrial Area Phase-III, South Delhi - 110020",
      premiseType: "Bonded Laboratory (L-1 M&TP)",
      formulation: "Ayurvedic Restorative Elixir (Asava/Arishta)",
      classification: "Ayurvedic",
      spiritType: "Self-generated Alcohol",
      drugLicenseNum: "DL-AYUR-1049-2024",
      requestedQuota: "12,000 Bulk Litres",
      sanctionedQuota: "12,000 Bulk Litres",
      status: "Approved",
      submittedDate: "10/05/2026",
      remarks: "Approved by Chemical Examiner. Spirit allotment quota released for FY 2026-27.",
      scrutinyStages: [
        { label: "Technical Appraisal", status: "completed", date: "12/05/2026", officer: "Drug Control Officer, Zone-IV" },
        { label: "Chemical Clearance", status: "completed", date: "19/05/2026", officer: "Govt Chemical Examiner, CRCL" },
        { label: "Excise Inspection", status: "completed", date: "26/05/2026", officer: "Excise Inspector, M&TP Branch" },
        { label: "Quota Release", status: "completed", date: "02/06/2026", officer: "Deputy Commissioner (Excise)" }
      ],
      orderNumber: "DEL/EX/MTP/SANCTION/2026/089"
    },
    {
      id: "MTP-2026-4409",
      unitName: "Apex Homoeo Laboratories",
      unitAddress: "B-18, Mayapuri Industrial Area Phase-I, West Delhi - 110064",
      premiseType: "Non-Bonded Laboratory (L-2 M&TP)",
      formulation: "Diluted Alcohol Medication Formulations (Mother Tinctures)",
      classification: "Homoeopathic",
      spiritType: "Rectified Spirit (95% v/v)",
      alcoholStrength: "88.5% v/v",
      drugLicenseNum: "DL-HOM-2281-2025",
      requestedQuota: "6,500 Bulk Litres",
      sanctionedQuota: "Pending Sanction",
      status: "Under Technical Review",
      submittedDate: "21/05/2026",
      remarks: "Awaiting chemical analysis report clearance and proof strength certification.",
      scrutinyStages: [
        { label: "Technical Appraisal", status: "completed", date: "24/05/2026", officer: "Excise Technical Evaluator" },
        { label: "Chemical Clearance", status: "in-progress", date: "Ongoing", officer: "Central Revenues Control Laboratory" },
        { label: "Excise Inspection", status: "pending", date: "Scheduled", officer: "Field Scrutiny Team" },
        { label: "Quota Release", status: "pending", date: "Pending", officer: "Excise Commissionerate" }
      ],
      orderNumber: null
    },
    {
      id: "MTP-2026-7732",
      unitName: "Delhi Pharmacopoeia Works",
      unitAddress: "G-4, Lawrence Road Industrial Complex, North-West Delhi - 110035",
      premiseType: "Bonded Laboratory (L-1 M&TP)",
      formulation: "Rectified Medicated Cough Syrup Base (Codeine & Menthol)",
      classification: "Allopathic",
      spiritType: "Extra Neutral Alcohol (ENA 96%)",
      alcoholStrength: "22.5% v/v",
      drugLicenseNum: "DL-MED-9921-2026",
      requestedQuota: "9,000 Bulk Litres",
      sanctionedQuota: "Pending Sanction",
      status: "Chemical Analysis Pending",
      submittedDate: "04/06/2026",
      remarks: "Sample batch delivered to Excise Control Laboratory for qualitative assay testing.",
      scrutinyStages: [
        { label: "Technical Appraisal", status: "completed", date: "06/06/2026", officer: "Drug Control Licensing Authority" },
        { label: "Chemical Clearance", status: "in-progress", date: "Ongoing", officer: "CRCL Excise Wing" },
        { label: "Excise Inspection", status: "pending", date: "Pending", officer: "Excise Inspector" },
        { label: "Quota Release", status: "pending", date: "Pending", officer: "Excise Commissionerate" }
      ],
      orderNumber: null
    },
    {
      id: "MTP-2026-9120",
      unitName: "DermaPure Hygiene & Toiletries Co.",
      unitAddress: "Plot 88, Badli Industrial Area, North Delhi - 110042",
      premiseType: "Toilet Preparation Unit (Non-Bonded)",
      formulation: "Antiseptic Perfumed Skin Wash & Cologne Base",
      classification: "Toilet Preparation",
      spiritType: "Denatured Ethyl Alcohol (Special Denatured)",
      alcoholStrength: "65.0% v/v",
      drugLicenseNum: "DL-COS-5510-2024",
      requestedQuota: "8,000 Bulk Litres",
      sanctionedQuota: "8,000 Bulk Litres",
      status: "Approved",
      submittedDate: "18/04/2026",
      remarks: "Denaturant addition verified by excise officer. Annual spirit quota sanctioned.",
      scrutinyStages: [
        { label: "Technical Appraisal", status: "completed", date: "20/04/2026", officer: "Chemical Scrutiny Committee" },
        { label: "Chemical Clearance", status: "completed", date: "28/04/2026", officer: "Govt Analyst, Delhi" },
        { label: "Excise Inspection", status: "completed", date: "05/05/2026", officer: "Excise Inspector, Badli Zone" },
        { label: "Quota Release", status: "completed", date: "12/05/2026", officer: "Excise Commissionerate" }
      ],
      orderNumber: "DEL/EX/MTP/SANCTION/2026/044"
    }
  ];

  const apps = useMemo(() => {
    const rawList =
      Array.isArray(propApplications) && propApplications.length > 0
        ? propApplications
        : defaultApplications;

    return rawList.map((app, index) => {
      const defaultMatch = defaultApplications.find((d) => d.id === app.id);
      const isApproved = app.status === "Approved";

      const fallbackStages = [
        {
          label: "Technical Appraisal",
          status: "completed",
          date: app.submittedDate || "12/05/2026",
          officer: "Technical Scrutiny Committee"
        },
        {
          label: "Chemical Clearance",
          status: isApproved ? "completed" : "in-progress",
          date: isApproved ? "19/05/2026" : "CRCL Testing",
          officer: "Govt Chemical Examiner, CRCL"
        },
        {
          label: "Excise Inspection",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "26/05/2026" : "Scheduled",
          officer: "Field Scrutiny Team"
        },
        {
          label: "Quota Release",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "02/06/2026" : "Pending",
          officer: "Deputy Commissioner (Excise)"
        }
      ];

      return {
        id: app.id || `MTP-2026-${1000 + index}`,
        unitName: app.unitName || defaultMatch?.unitName || "Pharmaceutical Manufactory",
        unitAddress: app.unitAddress || defaultMatch?.unitAddress || "Plot No. 42, Okhla Industrial Area, New Delhi - 110020",
        premiseType: app.premiseType || defaultMatch?.premiseType || "Bonded Laboratory (L-1 M&TP)",
        formulation: app.formulation || defaultMatch?.formulation || "Alcoholic Medicinal Formulation",
        classification:
          app.classification ||
          defaultMatch?.classification ||
          (app.formulation?.toLowerCase().includes("ayur")
            ? "Ayurvedic"
            : app.formulation?.toLowerCase().includes("homoeo")
            ? "Homoeopathic"
            : "Allopathic"),
        spiritType: app.spiritType || defaultMatch?.spiritType || "Rectified Spirit (95% v/v)",
        alcoholStrength: app.alcoholStrength || defaultMatch?.alcoholStrength || "45% v/v",
        drugLicenseNum: app.drugLicenseNum || defaultMatch?.drugLicenseNum || `DL-MED-${3000 + index}-2026`,
        requestedQuota: app.requestedQuota || defaultMatch?.requestedQuota || "6,000 Bulk Litres",
        sanctionedQuota:
          app.sanctionedQuota ||
          defaultMatch?.sanctionedQuota ||
          (isApproved ? "6,000 Bulk Litres" : "Pending Sanction"),
        status: app.status || "Under Technical Review",
        submittedDate: app.submittedDate || "01/05/2026",
        remarks: app.remarks || "Under review by excise technical wing",
        scrutinyStages:
          Array.isArray(app.scrutinyStages) && app.scrutinyStages.length > 0
            ? app.scrutinyStages
            : defaultMatch?.scrutinyStages || fallbackStages,
        orderNumber:
          app.orderNumber ||
          defaultMatch?.orderNumber ||
          (isApproved ? `DEL/EX/MTP/SANCTION/2026/0${index + 1}2` : null)
      };
    });
  }, [propApplications]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return apps.filter((app) => {
      const q = (searchQuery || "").toLowerCase();
      const matchesQuery =
        (app.id || "").toLowerCase().includes(q) ||
        (app.unitName || "").toLowerCase().includes(q) ||
        (app.formulation || "").toLowerCase().includes(q) ||
        (app.drugLicenseNum && app.drugLicenseNum.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "ALL" ||
        (app.status || "").toLowerCase() === statusFilter.toLowerCase();

      const matchesClassification =
        classificationFilter === "ALL" ||
        (app.classification &&
          app.classification.toLowerCase() === classificationFilter.toLowerCase());

      return matchesQuery && matchesStatus && matchesClassification;
    });
  }, [apps, searchQuery, statusFilter, classificationFilter]);

  // Aggregate statistics
  const stats = useMemo(() => {
    const total = apps.length;
    const approved = apps.filter((a) => a.status === "Approved").length;
    const inReview = apps.filter((a) => a.status !== "Approved").length;
    const totalQuota = "20,000 BL";
    return { total, approved, inReview, totalQuota };
  }, [apps]);

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return <span className="renewal-badge emerald">Approved</span>;
    }
    if (status === "Under Technical Review") {
      return <span className="renewal-badge blue">Technical Review</span>;
    }
    return <span className="renewal-badge amber">Chemical Clearance</span>;
  };

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

      {/* 1. Breadcrumb Bar - identical to RenewalLicense & DocumentRevalidation */}
      <div className="renewal-breadcrumb-bar">
        <div className="renewal-page-container">
          <div className="renewal-breadcrumb-inner">
            <div className="renewal-breadcrumb">
              <button
                type="button"
                className="renewal-breadcrumb-link"
                onClick={onNavigateToHome}
              >
                Dashboard
              </button>
              <span>/</span>
              <span>M&TP</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Applied M&TP Applications</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
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
            <span>M&TP Statutory Scrutiny Register 2026–27</span>
          </div>
          <h1 className="renewal-hero-title">Applied M&TP Applications</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Monitoring statutory technical appraisals, recipe evaluations, chemical laboratory clearances, and annual spirit allotments under the Medicinal and Toilet Preparations (Excise Duties) Act across the National Capital Territory of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <FlaskConical style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{stats.total}</div>
              <div className="renewal-stat-label">Registered Filings</div>
              <div className="renewal-stat-note">Active M&TP Units</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <CheckCircle2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{stats.approved}</div>
              <div className="renewal-stat-label">Quotas Sanctioned</div>
              <div className="renewal-stat-note">Excise Orders Issued</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{stats.inReview}</div>
              <div className="renewal-stat-label">Under Scrutiny</div>
              <div className="renewal-stat-note">Appraisal & Lab Assay</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{stats.totalQuota}</div>
              <div className="renewal-stat-label">Sanctioned Spirit</div>
              <div className="renewal-stat-note">Rectified & ENA Volume</div>
            </div>
          </div>
        </div>

        {/* 4. Section Card */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <FlaskConical style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">Active M&TP Scrutiny Ledger & Spirit Allotment Register</h2>
              <p className="renewal-section-subtitle">
                Track technical formulation appraisals, chemical validation certificates, and official quota sanction orders
              </p>
            </div>
          </div>

          {/* Form Group with Search and Filter Controls */}
          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="mtpSearchInput" className="renewal-label">
                <Search style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Search & Filter M&TP Applications</span>
              </label>
              <span className="renewal-badge-count">
                {filteredApplications.length} Application{filteredApplications.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <input
                  id="mtpSearchInput"
                  type="text"
                  placeholder="Search by Application ID (e.g. MTP-2026-0811), Unit Name, Formulation, or Drug License..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

              <div className="renewal-select-wrapper" style={{ width: "180px" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Technical Review">Under Technical Review</option>
                  <option value="Chemical Analysis Pending">Chemical Analysis</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>

              <div className="renewal-select-wrapper" style={{ width: "180px" }}>
                <select
                  value={classificationFilter}
                  onChange={(e) => setClassificationFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Classifications</option>
                  <option value="Ayurvedic">Ayurvedic</option>
                  <option value="Homoeopathic">Homoeopathic</option>
                  <option value="Allopathic">Allopathic</option>
                  <option value="Toilet Preparation">Toilet Preparation</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>
            </div>
          </div>

          {/* Table or Empty Canvas */}
          {filteredApplications.length === 0 ? (
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
                <span>M&TP Scrutiny Register: Clean Query</span>
              </div>

              <h3 className="renewal-empty-title">No M&TP Applications found</h3>
              <p className="renewal-empty-desc">
                No active records match the current search query or filter classification. You can reset filters or register a new formulation filing.
              </p>

              <div className="renewal-empty-actions">
                <button
                  type="button"
                  className="renewal-empty-sample-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("ALL");
                    setClassificationFilter("ALL");
                  }}
                >
                  <RefreshCw style={{ width: 14, height: 14 }} />
                  <span>Reset Filters</span>
                </button>

                <button
                  type="button"
                  className="renewal-empty-help-btn"
                  onClick={onNavigateToNewMtp}
                >
                  <Plus style={{ width: 14, height: 14 }} />
                  <span>File New M&TP Application</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="renewal-table-wrapper">
              <table className="renewal-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: "150px" }}>Application ID</th>
                    <th style={{ minWidth: "220px" }}>Pharmaceutical Unit</th>
                    <th style={{ minWidth: "250px" }}>Formulation & Alcohol</th>
                    <th style={{ minWidth: "140px" }}>Drug Licence</th>
                    <th style={{ minWidth: "150px" }}>Scrutiny Status</th>
                    <th style={{ minWidth: "160px", textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => {
                    const isApproved = app.status === "Approved";
                    return (
                      <tr key={app.id}>
                        {/* Application ID & Filing Date */}
                        <td style={{ verticalAlign: "top" }}>
                          <span className="renewal-lic-id-tag">{app.id}</span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.72rem",
                              color: "#64748b",
                              marginTop: "4px"
                            }}
                          >
                            Filed: {app.submittedDate}
                          </span>
                        </td>

                        {/* Pharmaceutical Unit & Premise */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.875rem" }}>
                            {app.unitName}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#64748b", marginTop: "2px", display: "inline-block" }}>
                            {app.premiseType}
                          </span>
                        </td>

                        {/* Formulation & Alcohol */}
                        <td style={{ verticalAlign: "top" }}>
                          <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem", lineHeight: "1.35" }}>
                            {app.formulation}
                          </div>
                          <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                            <span className="mtp-strength-tag">
                              {app.alcoholStrength}
                            </span>
                            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                              {app.spiritType}
                            </span>
                          </div>
                        </td>

                        {/* Drug License */}
                        <td style={{ verticalAlign: "top" }}>
                          <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700, color: "#0369a1" }}>
                            {app.drugLicenseNum || "Pending Upload"}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.7rem",
                              color: "#475569",
                              marginTop: "2px"
                            }}
                          >
                            Class: {app.classification}
                          </span>
                        </td>

                        {/* Scrutiny Status */}
                        <td style={{ verticalAlign: "top" }}>
                          <div>{getStatusBadge(app.status)}</div>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.72rem",
                              color: "#64748b",
                              marginTop: "4px",
                              lineHeight: "1.3"
                            }}
                          >
                            {app.remarks}
                          </span>
                        </td>

                       {/* Actions */}
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
                              onClick={() => setSelectedAppForDossier(app)}
                            >
                              <Eye style={{ width: 14, height: 14 }} />
                              <span>View Dossier</span>
                            </button>

                            {isApproved && (
                              <button
                                type="button"
                                className="renewal-btn-outline"
                                style={{
                                  justifyContent: "center",
                                  padding: "0.45rem 0.8rem",
                                  fontSize: "0.78rem"
                                }}
                                onClick={() => setSelectedAppForCert(app)}
                              >
                                <Download style={{ width: 14, height: 14 }} />
                                <span>Sanction Order</span>
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

          {/* 5. Statutory Guidance Pillars */}
          <div className="renewal-pillar-grid" style={{ marginTop: "2rem" }}>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">Formulation & Drug License Scrutiny</h4>
              <p className="renewal-pillar-desc">
                Every medicinal or toilet preparation formula must conform to pharmacopoeial standards and hold an active manufacturing license in Form 25 or 28.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">Chemical Assay & Strength Verification</h4>
              <p className="renewal-pillar-desc">
                Government Chemical Examiner at the CRCL certifies accurate spirit strength (% v/v), testing for non-potable denaturants and restorative stability.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Bonded Laboratory Spirit Indents</h4>
              <p className="renewal-pillar-desc">
                Sanctioned quotas are drawn against authenticated excise transit passes with digital reconciliation of manufacturing vat balances.
              </p>
            </div>
          </div>

          {/* 6. Helpdesk & Assistance Banner */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Questions Regarding M&TP Formulation Clearances?</h4>
              <p className="renewal-assistance-desc">
                Contact the M&TP Scrutiny Cell, Department of Excise, Entertainment & Luxury Tax, Vikas Bhawan, New Delhi.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => alert("Delhi Excise M&TP Technical Cell: 011-23370258 | mtp-excise@delhi.gov.in")}
            >
              <HelpCircle style={{ width: 15, height: 15 }} />
              <span>M&TP Technical Helpdesk</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: M&TP DOSSIER & TECHNICAL APPRAISAL MODAL
          ========================================================================= */}
      {selectedAppForDossier && (
        <div className="renewal-modal-overlay" onClick={() => setSelectedAppForDossier(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "700px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="renewal-modal-header">
              <div className="renewal-modal-title">
                <FlaskConical style={{ width: 20, height: 20, color: "#0284c7" }} />
                <span>M&TP Technical Dossier & Appraisal Details</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                onClick={() => setSelectedAppForDossier(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Application Filing ID:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#0369a1" }}>
                  {selectedAppForDossier.id}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Manufacturing Unit:</span>
                <span className="renewal-summary-val">{selectedAppForDossier.unitName}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Premise Classification:</span>
                <span className="renewal-summary-val">{selectedAppForDossier.premiseType}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Drug Controller License:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace" }}>
                  {selectedAppForDossier.drugLicenseNum}
                </span>
              </div>
            </div>

            {/* Quota & Spirit Details Grid */}
            <div className="mtp-quota-box">
              <div className="mtp-quota-item">
                <span className="mtp-quota-label">Formulation Type</span>
                <span className="mtp-quota-val" style={{ fontSize: "0.95rem" }}>
                  {selectedAppForDossier.classification}
                </span>
              </div>
              <div className="mtp-quota-item">
                <span className="mtp-quota-label">Alcohol Strength</span>
                <span className="mtp-quota-val" style={{ fontSize: "0.95rem", color: "#0284c7" }}>
                  {selectedAppForDossier.alcoholStrength}
                </span>
              </div>
              <div className="mtp-quota-item">
                <span className="mtp-quota-label">Requested Quota</span>
                <span className="mtp-quota-val" style={{ fontSize: "0.95rem" }}>
                  {selectedAppForDossier.requestedQuota}
                </span>
              </div>
              <div className="mtp-quota-item">
                <span className="mtp-quota-label">Sanctioned Quota</span>
                <span
                  className="mtp-quota-val"
                  style={{
                    fontSize: "0.95rem",
                    color: selectedAppForDossier.status === "Approved" ? "#166534" : "#b45309"
                  }}
                >
                  {selectedAppForDossier.sanctionedQuota}
                </span>
              </div>
            </div>

            {/* Scrutiny Milestone Timeline */}
            <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#012a52", margin: "1rem 0 0.5rem 0" }}>
              Statutory Scrutiny Timeline & Officer Sign-offs
            </h4>

            <div className="mtp-timeline">
              {(selectedAppForDossier?.scrutinyStages || []).map((stage, idx) => (
                <div key={idx} className="mtp-timeline-item">
                  <div
                    className={`mtp-timeline-dot ${
                      stage.status === "completed" ? "done" : stage.status === "in-progress" ? "active" : ""
                    }`}
                  />
                  <div className="mtp-timeline-title">
                    {stage.label}{" "}
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: stage.status === "completed" ? "#166534" : stage.status === "in-progress" ? "#0284c7" : "#64748b"
                      }}
                    >
                      ({stage.status.toUpperCase()})
                    </span>
                  </div>
                  <div className="mtp-timeline-desc">
                    Evaluated by: {stage.officer} • Date: {stage.date}
                  </div>
                </div>
              ))}
            </div>

            <div className="renewal-modal-footer">
              <button
                type="button"
                className="renewal-btn-outline"
                onClick={() => setSelectedAppForDossier(null)}
              >
                Close
              </button>
              {selectedAppForDossier.status === "Approved" && (
                <button
                  type="button"
                  className="renewal-btn-primary"
                  onClick={() => {
                    setSelectedAppForCert(selectedAppForDossier);
                    setSelectedAppForDossier(null);
                  }}
                >
                  <FileCheck style={{ width: 14, height: 14 }} />
                  <span>View Official Sanction Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: OFFICIAL SANCTION ORDER / CERTIFICATE MODAL
          ========================================================================= */}
      {selectedAppForCert && (
        <div className="renewal-modal-overlay" onClick={() => setSelectedAppForCert(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="renewal-modal-header">
              <div className="renewal-modal-title">
                <FileCheck style={{ width: 20, height: 20, color: "#166534" }} />
                <span>Official M&TP Spirit Quota Sanction Order</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                onClick={() => setSelectedAppForCert(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Certificate Preview Card */}
            <div className="mtp-cert-preview">
              <div className="mtp-cert-header">
                <div className="mtp-cert-emblem">Government of National Capital Territory of Delhi</div>
                <h3 className="mtp-cert-title">Department of Excise, Entertainment & Luxury Tax</h3>
                <div className="mtp-cert-subtitle">
                  Vikas Bhawan, I.P. Estate, New Delhi - 110002 • eAbkari Portal
                </div>
              </div>

              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    background: "#f0fdf4",
                    color: "#166534",
                    border: "1px solid #bbf7d0",
                    fontWeight: 700,
                    fontSize: "0.8rem"
                  }}
                >
                  ANNUAL SPIRIT QUOTA ALLOTMENT ENDORSEMENT
                </span>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                  Sanction Order Ref: <strong>{selectedAppForCert.orderNumber || "DEL/EX/MTP/SANCTION/2026/089"}</strong>
                </div>
              </div>

              <div style={{ fontSize: "0.825rem", color: "#334155", lineHeight: "1.6", marginBottom: "1rem" }}>
                This is to certify that the formulation dossier submitted by <strong>{selectedAppForCert.unitName}</strong> under Application ID <strong>{selectedAppForCert.id}</strong> has completed chemical laboratory analysis and statutory scrutiny under the M&TP (Excise Duties) Act.
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "12px", marginBottom: "1rem" }}>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Approved Formulation:</span>
                  <span className="renewal-summary-val">{selectedAppForCert.formulation}</span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Approved Spirit Base:</span>
                  <span className="renewal-summary-val">{selectedAppForCert.spiritType} ({selectedAppForCert.alcoholStrength})</span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Sanctioned Annual Quota:</span>
                  <span className="renewal-summary-val" style={{ color: "#166534", fontWeight: 800 }}>
                    {selectedAppForCert.sanctionedQuota}
                  </span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Validity Period:</span>
                  <span className="renewal-summary-val">01-April-2026 to 31-March-2027</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px dashed #cbd5e1", paddingTop: "1rem" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                  Digitally Verified by Delhi eAbkari System<br />
                  Barcode / QR Signature: <strong>DEL-EX-MTP-{selectedAppForCert.id}</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#012a52" }}>
                    Assistant Commissioner (M&TP)
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                    For Excise Commissioner, GNCTD
                  </div>
                </div>
              </div>
            </div>

            <div className="renewal-modal-footer">
              <button
                type="button"
                className="renewal-btn-outline"
                onClick={() => setSelectedAppForCert(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={() => {
                  triggerToast("Sanction Order PDF sent to browser print spooler.");
                  window.print();
                }}
              >
                <Printer style={{ width: 14, height: 14 }} />
                <span>Print Sanction Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
