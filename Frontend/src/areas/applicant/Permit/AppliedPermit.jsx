import React, { useState, useMemo } from "react";
import {
  Truck,
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
  Package,
  QrCode,
  ArrowRight,
  Shield,
  Layers,
  FileBadge
} from "lucide-react";

export default function AppliedPermit({
  permitApplications: propPermitApplications = [],
  onNavigateToHome = () => {},
  onNavigateNewPermit = () => {},
  onNavigateToRenewal = () => {},
  onNavigateToDocumentRevalidate = () => {},
  onViewPermit = () => {},
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

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

  // Comprehensive Delhi eAbkari default transit gate passes and permits
  const defaultPermitApplications = [
    {
      id: "PRM-2026-0034",
      permitType: "Local Transport Permit (Bulk Movement)",
      sourcePremise: "Central Delhi Logistics Hub (Okhla)",
      destPremise: "North Delhi Retail Depot (Rohini)",
      consignmentDetails: "50 Cases of Premium Indian Spirits (IMFL)",
      carrierLicense: "DL-1LM-8842",
      driverName: "Raminder Singh (DL-DRV-4491)",
      status: "Approved",
      submittedDate: "10/05/2026",
      validityPeriod: "10/05/2026 to 14/05/2026",
      gatePassNumber: "DEL-TP-2026-0034",
      currentLevel: "Excise Transit & Gate Scrutiny Cell",
      remarks: "Valid transport gate pass generated & escort cleared",
      inspectedBy: "Senior Transit Inspector, Okhla Gateway",
      appraisalStages: [
        { label: "Cargo Declaration & Invoice Audit", status: "completed", date: "10/05/2026", officer: "Field Scrutiny Officer", note: "Excise duty stamps & batch codes verified" },
        { label: "Tax Stamp & Bond Verification", status: "completed", date: "10/05/2026", officer: "Bond Officer (Okhla)", note: "All 50 cases barcoded and tamper-sealed" },
        { label: "Carrier Vehicle Audit & GPS Sync", status: "completed", date: "11/05/2026", officer: "Transit Telemetry Inspector", note: "Vehicle GPS active; sealed freight compartment approved" },
        { label: "Form T-2 Digital Gate Pass", status: "completed", date: "11/05/2026", officer: "Deputy Commissioner (Transit)", note: "Official Transit Gate Pass DEL-TP-2026-0034 issued" }
      ]
    },
    {
      id: "PRM-2026-5381",
      permitType: "Special Event Temporary Permit",
      sourcePremise: "L-13 Wholesale Import Bond Storage (Dwarka)",
      destPremise: "Vedic Craft Banquet Hall, Chanakyapuri",
      consignmentDetails: "Occasional Hospitality Service Package (25 Cases Craft Beers & Liquors)",
      carrierLicense: "DL-1N-9931",
      driverName: "Manoj Kumar Sharma (DL-DRV-8022)",
      status: "Approved",
      submittedDate: "25/05/2026",
      validityPeriod: "25/05/2026 to 28/05/2026",
      gatePassNumber: "DEL-TP-2026-5381",
      currentLevel: "Special Events Transit Wing",
      remarks: "Event gate pass valid till 28/05/2026 23:59 Hrs",
      inspectedBy: "Excise Officer (Events & Hospitality)",
      appraisalStages: [
        { label: "Cargo Declaration & Invoice Audit", status: "completed", date: "25/05/2026", officer: "Events Permit Officer", note: "P-10 event license cross-checked with venue booking" },
        { label: "Tax Stamp & Bond Verification", status: "completed", date: "25/05/2026", officer: "Bond Officer (Dwarka)", note: "Bond release authorized under special event waiver" },
        { label: "Carrier Vehicle Audit & GPS Sync", status: "completed", date: "26/05/2026", officer: "Transit Field Inspector", note: "Vehicle safety checklist and fire extinguisher certified" },
        { label: "Form T-2 Digital Gate Pass", status: "completed", date: "26/05/2026", officer: "Assistant Commissioner (Permits)", note: "Gate Pass DEL-TP-2026-5381 generated for event dispatch" }
      ]
    },
    {
      id: "PRM-2026-7814",
      permitType: "Inter-Depot Stock Transfer Permit",
      sourcePremise: "South Delhi Bonded Depot (Saket)",
      destPremise: "West Delhi Distributing Depot (Mayapuri)",
      consignmentDetails: "120 Cases of Craft Beer & Table Wine",
      carrierLicense: "DL-1LG-4410",
      driverName: "Harpreet Singh Virk (DL-DRV-9011)",
      status: "Under Transit Verification",
      submittedDate: "02/06/2026",
      validityPeriod: "Pending Inspection",
      gatePassNumber: null,
      currentLevel: "Depot Transit Verification Desk",
      remarks: "Carrier GPS tracking telemetry and weighbridge log verification in progress",
      inspectedBy: "Field Inspection Wing (South Depot)",
      appraisalStages: [
        { label: "Cargo Declaration & Invoice Audit", status: "completed", date: "02/06/2026", officer: "Depot Superintendent", note: "Stock transfer vouchers and requisition verified" },
        { label: "Tax Stamp & Bond Verification", status: "in-progress", date: "03/06/2026", officer: "Excise Auditor", note: "Batch reconciliation with warehouse register ongoing" },
        { label: "Carrier Vehicle Audit & GPS Sync", status: "pending", date: "Pending", officer: "Transport Auditor", note: "Weighbridge test and seal verification pending" },
        { label: "Form T-2 Digital Gate Pass", status: "pending", date: "Pending", officer: "Deputy Commissioner (Transit)", note: "Pending" }
      ]
    },
    {
      id: "PRM-2026-9210",
      permitType: "Import Consignment Transit Pass",
      sourcePremise: "IGI Airport Cargo Air-Bond Terminal",
      destPremise: "Connaught Place Central Retail Vault",
      consignmentDetails: "80 Cartons Imported Scottish Single Malts (Customs Duty Cleared)",
      carrierLicense: "DL-1M-7705",
      driverName: "Satish Chand (DL-DRV-3129)",
      status: "Approved",
      submittedDate: "18/05/2026",
      validityPeriod: "18/05/2026 to 22/05/2026",
      gatePassNumber: "DEL-TP-2026-9210",
      currentLevel: "Excise Customs & Air-Bond Desk",
      remarks: "Air cargo customs clearance cross-verified; QR security seals attached",
      inspectedBy: "Superintendent of Excise (Imports)",
      appraisalStages: [
        { label: "Cargo Declaration & Invoice Audit", status: "completed", date: "18/05/2026", officer: "Customs Excise Liaison", note: "Bill of Entry & import clearance authenticated" },
        { label: "Tax Stamp & Bond Verification", status: "completed", date: "19/05/2026", officer: "Air-Bond Excise Officer", note: "Delhi Excise hologram stamps validated on cartons" },
        { label: "Carrier Vehicle Audit & GPS Sync", status: "completed", date: "19/05/2026", officer: "Armored Logistics Auditor", note: "Tamper-proof container lock & GPS route geofenced" },
        { label: "Form T-2 Digital Gate Pass", status: "completed", date: "20/05/2026", officer: "Joint Commissioner (Excise)", note: "Form T-2 Transit Gate Pass DEL-TP-2026-9210 activated" }
      ]
    },
    {
      id: "PRM-2026-3105",
      permitType: "Occasional Service Permit",
      sourcePremise: "Vedic Retail Licensed Shop (L-2), Block-E Mayapuri",
      destPremise: "The Grand Ballroom, Hotel Imperial, Janpath",
      consignmentDetails: "35 Cases Premium Spirits & Sparkling Wines (Form P-10 Gala)",
      carrierLicense: "DL-2W-5501",
      driverName: "Gurdeep Singh (DL-DRV-1184)",
      status: "Approved",
      submittedDate: "29/05/2026",
      validityPeriod: "29/05/2026 to 01/06/2026",
      gatePassNumber: "DEL-TP-2026-3105",
      currentLevel: "Central Hospitality Dispatch Unit",
      remarks: "P-10 permit venue authorized with municipal banquet endorsement",
      inspectedBy: "Hospitality Liaison Officer",
      appraisalStages: [
        { label: "Cargo Declaration & Invoice Audit", status: "completed", date: "29/05/2026", officer: "Field Scrutiny Officer", note: "Duty paid retail sale invoice verified" },
        { label: "Tax Stamp & Bond Verification", status: "completed", date: "30/05/2026", officer: "Retail Vend Inspector", note: "Duty paid hologram stickers scanned & verified" },
        { label: "Carrier Vehicle Audit & GPS Sync", status: "completed", date: "30/05/2026", officer: "Transit Team", note: "Carrier authorization DL-2W-5501 cleared" },
        { label: "Form T-2 Digital Gate Pass", status: "completed", date: "30/05/2026", officer: "Excise Commissionerate", note: "Form T-2 Gate Pass DEL-TP-2026-3105 authorized" }
      ]
    }
  ];

  // Normalized data source
  const dataSource = useMemo(() => {
    const raw =
      Array.isArray(propPermitApplications) && propPermitApplications.length > 0
        ? propPermitApplications
        : defaultPermitApplications;

    return raw.map((app, index) => {
      const defaultMatch = defaultPermitApplications.find((d) => d.id === app.id);
      const isApproved = app.status === "Approved";
      const isClarification =
        app.status === "Clarification Needed" || app.status === "Clarification";

      const fallbackStages = [
        {
          label: "Cargo Declaration & Invoice Audit",
          status: "completed",
          date: app.submittedDate || "15/05/2026",
          officer: "Field Scrutiny Officer",
          note: "Consignment manifest verified"
        },
        {
          label: "Tax Stamp & Bond Verification",
          status: isClarification ? "in-progress" : isApproved ? "completed" : "in-progress",
          date: isApproved ? "16/05/2026" : "Ongoing",
          officer: "Excise Bond Officer",
          note: isClarification ? "Batch hologram clarification needed" : "Duty payment authenticated"
        },
        {
          label: "Carrier Vehicle Audit & GPS Sync",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "17/05/2026" : "Scheduled",
          officer: "Transit Telemetry Inspector",
          note: isApproved ? "Vehicle geofence & security seal cleared" : "Inspection in progress"
        },
        {
          label: "Form T-2 Digital Gate Pass",
          status: isApproved ? "completed" : "pending",
          date: isApproved ? "18/05/2026" : "Pending",
          officer: "Deputy Commissioner (Transit)",
          note: isApproved ? `Pass DEL-TP-2026-00${index + 1} issued` : "Pending audit completion"
        }
      ];

      return {
        id: app.id || `PRM-2026-${8000 + index}`,
        permitType: app.permitType || defaultMatch?.permitType || "Local Transport Permit (Bulk Movement)",
        sourcePremise: app.sourcePremise || defaultMatch?.sourcePremise || "Central Delhi Logistics Hub",
        destPremise: app.destPremise || defaultMatch?.destPremise || "North Delhi Retail Depot",
        consignmentDetails: app.consignmentDetails || defaultMatch?.consignmentDetails || "Licensed Consignment Stock",
        carrierLicense: app.carrierLicense || defaultMatch?.carrierLicense || "DL-1LM-8842",
        driverName: app.driverName || defaultMatch?.driverName || "Authorized Excise Driver",
        status: app.status || "Under Transit Verification",
        submittedDate: app.submittedDate || defaultMatch?.submittedDate || "15/05/2026",
        validityPeriod:
          app.validityPeriod ||
          defaultMatch?.validityPeriod ||
          (isApproved ? "15/05/2026 to 19/05/2026" : "Pending Verification"),
        gatePassNumber:
          app.gatePassNumber ||
          defaultMatch?.gatePassNumber ||
          (isApproved ? `DEL-TP-2026-${8000 + index}` : null),
        currentLevel:
          app.currentLevel ||
          defaultMatch?.currentLevel ||
          (isApproved ? "Excise Transit & Gate Scrutiny Cell" : "Depot Scrutiny Desk"),
        remarks:
          app.remarks ||
          defaultMatch?.remarks ||
          (isApproved ? "Transit pass generated & geofence active" : "Document verification under scrutiny"),
        inspectedBy:
          app.inspectedBy ||
          defaultMatch?.inspectedBy ||
          "Excise Transit Inspection Wing",
        appraisalStages:
          app.appraisalStages ||
          defaultMatch?.appraisalStages ||
          fallbackStages
      };
    });
  }, [propPermitApplications]);

  // Filtered List
  const filteredList = useMemo(() => {
    return dataSource.filter((item) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.permitType.toLowerCase().includes(q) ||
        item.sourcePremise.toLowerCase().includes(q) ||
        item.destPremise.toLowerCase().includes(q) ||
        item.consignmentDetails.toLowerCase().includes(q) ||
        item.carrierLicense.toLowerCase().includes(q) ||
        item.driverName.toLowerCase().includes(q) ||
        (item.gatePassNumber && item.gatePassNumber.toLowerCase().includes(q)) ||
        item.remarks.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "Approved" && item.status === "Approved") ||
        (statusFilter === "Under Transit Verification" && item.status !== "Approved" && !item.status.includes("Clarification")) ||
        (statusFilter === "Clarification Needed" && item.status.includes("Clarification"));

      const matchesType =
        typeFilter === "ALL" || item.permitType.toLowerCase().includes(typeFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [dataSource, searchTerm, statusFilter, typeFilter]);

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="renewal-badge emerald">
          <CheckCircle2 style={{ width: 12, height: 12 }} />
          Approved & Active
        </span>
      );
    }
    if (status === "Clarification Needed" || status === "Clarification") {
      return (
        <span className="renewal-badge amber">
          <AlertCircle style={{ width: 12, height: 12 }} />
          Clarification Needed
        </span>
      );
    }
    return (
      <span className="renewal-badge blue">
        <Clock style={{ width: 12, height: 12 }} />
        Under Verification
      </span>
    );
  };

  const totalCount = dataSource.length;
  const approvedCount = dataSource.filter((a) => a.status === "Approved").length;
  const underVerificationCount = dataSource.filter((a) => a.status !== "Approved").length;

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
              <span>Consignment & Transit Logistics</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Applied Permit </strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="renewal-btn-outline"
                style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}
                onClick={() => {
                  if (onNavigateNewPermit) onNavigateNewPermit();
                }}
              >
                <Plus style={{ width: 13, height: 13 }} />
                <span>Issue New Permit</span>
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
            <span>Applied Permit </span>
          </div>
          <h1 className="renewal-hero-title">Applied Permit </h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Ensuring statutory transit compliance, digital gate pass authentication (Form T-2), GPS-synchronized carrier route monitoring, tamper-proof excise seal validations, and duty-paid batch clearances for licensed transport movements across the National Capital Territory of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Truck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{totalCount}</div>
              <div className="renewal-stat-label">Total Transit Permits</div>
              <div className="renewal-stat-note">Bulk Movement, Depots & P-10 Events</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{approvedCount}</div>
              <div className="renewal-stat-label">Authorized Active Passes</div>
              <div className="renewal-stat-note">Form T-2 Digital Gate Pass Active</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{underVerificationCount}</div>
              <div className="renewal-stat-label">Under Verification / Scrutiny</div>
              <div className="renewal-stat-note">Route & Carrier Scrutiny Ongoing</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <FileBadge style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">Applied Permit </h2>
              <p className="renewal-section-subtitle">
                Track active carrier transit licenses, dispatcher routes, cargo manifests, escort clearances, and authenticated digital transit gate passes
              </p>
            </div>
          </div>

          {/* Form Group with Search and Category/Status Filters */}
          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="permitSearchInput" className="renewal-label">
                <Truck style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Search & Permit Classification Filter</span>
              </label>
              <span className="renewal-badge-count">
                {filteredList.length} Record{filteredList.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <input
                  id="permitSearchInput"
                  type="text"
                  placeholder="Search by Permit ID, Type, Consignment, Vehicle No, Route, or Driver..."
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

              <div className="renewal-select-wrapper" style={{ width: "240px" }}>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Permit Types</option>
                  <option value="Local Transport Permit">Local Transport Permit</option>
                  <option value="Special Event Temporary Permit">Special Event Temporary Permit</option>
                  <option value="Inter-Depot Stock Transfer">Inter-Depot Stock Transfer</option>
                  <option value="Import Consignment Transit Pass">Import Consignment Transit Pass</option>
                  <option value="Occasional Service Permit">Occasional Service Permit</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>

              <div className="renewal-select-wrapper" style={{ width: "210px" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="renewal-select"
                >
                  <option value="ALL">All Appraisal Statuses</option>
                  <option value="Approved">Approved & Active</option>
                  <option value="Under Transit Verification">Under Verification</option>
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
                <span>Transit Register: No Matching Record</span>
              </div>

              <h3 className="renewal-empty-title">No Transit Permit records found</h3>
              <p className="renewal-empty-desc">
                No active transit applications match the current query. Clear search terms or adjust permit type and status filters.
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
                    <th style={{ minWidth: "140px" }}>Permit ID</th>
                    <th style={{ minWidth: "260px" }}>Permit & Consignment Details</th>
                    <th style={{ minWidth: "210px" }}>Carrier Vehicle & Driver</th>
                    <th style={{ minWidth: "250px" }}>Transit Route & Destination</th>
                    <th style={{ minWidth: "115px" }}>Filing Date</th>
                    <th style={{ minWidth: "175px" }}>Verification Status</th>
                    <th style={{ minWidth: "160px" }}>Dispatch Wing</th>
                    <th style={{ minWidth: "165px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((permit) => {
                    const isApproved = permit.status === "Approved";
                    return (
                      <tr key={permit.id}>
                        {/* Permit ID */}
                        <td style={{ verticalAlign: "top" }}>
                          <span className="renewal-lic-id-tag">{permit.id}</span>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "4px" }}>
                            Transit Gate Pass
                          </span>
                        </td>

                        {/* Permit & Consignment Details */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.875rem", lineHeight: "1.4" }}>
                            {permit.permitType}
                          </strong>
                          <span style={{ fontSize: "0.75rem", color: "#475569", marginTop: "3px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Package style={{ width: 13, height: 13, color: "#0284c7" }} />
                            <span>Consignment: <strong style={{ color: "#334155" }}>{permit.consignmentDetails}</strong></span>
                          </span>
                          {permit.gatePassNumber && (
                            <span style={{ fontSize: "0.72rem", color: "#166534", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                              <QrCode style={{ width: 12, height: 12 }} />
                              <span>Pass Ref: {permit.gatePassNumber}</span>
                            </span>
                          )}
                        </td>

                        {/* Carrier Vehicle & Driver */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#1e293b", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.85rem" }}>
                            <Truck style={{ width: 13, height: 13, color: "#0369a1" }} />
                            <span>{permit.carrierLicense}</span>
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#64748b", display: "block", marginTop: "2px" }}>
                            Driver: <strong>{permit.driverName}</strong>
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 600, display: "block", marginTop: "1px" }}>
                            GPS Telemetry: Active
                          </span>
                        </td>

                        {/* Route Details */}
                        <td style={{ verticalAlign: "top" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "5px", fontSize: "0.8125rem", color: "#334155" }}>
                            <MapPin style={{ width: 14, height: 14, color: "#0284c7", marginTop: 2, flexShrink: 0 }} />
                            <div style={{ lineHeight: 1.35 }}>
                              <div>From: <strong style={{ color: "#0f172a" }}>{permit.sourcePremise}</strong></div>
                              <div style={{ marginTop: "2px", color: "#0284c7", display: "flex", alignItems: "center", gap: "4px" }}>
                                <ArrowRight style={{ width: 12, height: 12 }} />
                                <span>To: <strong style={{ color: "#012a52" }}>{permit.destPremise}</strong></span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Filing Date */}
                        <td style={{ verticalAlign: "top" }}>
                          <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar style={{ width: 13, height: 13, color: "#64748b" }} />
                            <span>{permit.submittedDate}</span>
                          </span>
                        </td>

                        {/* Verification Status & 4-Stage Bar */}
                        <td style={{ verticalAlign: "top" }}>
                          <div>{getStatusBadge(permit.status)}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", marginTop: "6px" }}>
                            {(permit.appraisalStages || []).map((st, sIdx) => {
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
                            4-Stage Statutory Transit Check
                          </div>
                        </td>

                        {/* Dispatch Wing & Remarks */}
                        <td style={{ verticalAlign: "top" }}>
                          <strong style={{ color: "#012a52", display: "block", fontSize: "0.8125rem" }}>
                            {permit.currentLevel}
                          </strong>
                          <span style={{ fontSize: "0.725rem", color: "#64748b", fontStyle: "italic", display: "block", marginTop: "2px" }}>
                            {permit.remarks}
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
                                setActiveDossierModal(permit);
                                onViewPermit(permit.id);
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
                                onClick={() => setActivePassModal(permit)}
                              >
                                <Award style={{ width: 14, height: 14 }} />
                                <span>Transit Pass</span>
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
                <Truck style={{ width: 20, height: 20, color: "#0284c7" }} />
              </div>
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">GPS Geofencing & Telemetry</h4>
              <p className="renewal-pillar-desc">
                Real-time satellite tracking of registered carrier vehicles with electronic geofence route compliance between source and destination premises.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">Duty Paid Holograms & Seals</h4>
              <p className="renewal-pillar-desc">
                High-security holographic serial numbers and tamper-evident container locks cross-verified at municipal and border check-posts.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <Award style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Form T-2 Digital Gate Pass</h4>
              <p className="renewal-pillar-desc">
                Digitally authenticated Excise Transit Permit & Gate Pass with encrypted QR code verification for statutory transit inspection across NCT of Delhi.
              </p>
            </div>
          </div>

          {/* Assistance Banner */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Excise Transit & Carrier Movement Dispatch Desk</h4>
              <p className="renewal-assistance-desc">
                Require route clearance, vehicle substitution, transit extension, or emergency check-post assistance? Contact the Excise Transit Desk at GNCTD.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => triggerToast("Connecting to Excise Transit & Dispatch Control Room (Toll Free: 1800-11-2009)")}
            >
              <HelpCircle style={{ width: 14, height: 14 }} />
              <span>Contact Transit Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          MODAL 1: PERMIT TECHNICAL DOSSIER MODAL
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
                <span>Transit Permit Technical Dossier — {activeDossierModal.id}</span>
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
                <span className="renewal-summary-label">Permit Classification:</span>
                <span className="renewal-summary-val" style={{ fontWeight: 700, color: "#012a52" }}>
                  {activeDossierModal.permitType}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Consignment Manifest:</span>
                <span className="renewal-summary-val">{activeDossierModal.consignmentDetails}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Origin Facility:</span>
                <span className="renewal-summary-val" style={{ color: "#0369a1", fontWeight: 700 }}>
                  {activeDossierModal.sourcePremise}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Destination Facility:</span>
                <span className="renewal-summary-val" style={{ color: "#012a52", fontWeight: 700 }}>
                  {activeDossierModal.destPremise}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Carrier & Driver Details:</span>
                <span className="renewal-summary-val">
                  {activeDossierModal.carrierLicense} • {activeDossierModal.driverName}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Official Pass Reference:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#166534", fontWeight: 700 }}>
                  {activeDossierModal.gatePassNumber || "Pending Issuance"}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Verification Status:</span>
                <span className="renewal-summary-val">{getStatusBadge(activeDossierModal.status)}</span>
              </div>
            </div>

            {/* Statutory 4-Stage Appraisal Checklist */}
            <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0 0 0.75rem 0", fontWeight: 600 }}>
              Statutory 4-Stage Verification & Transit Scrutiny Stages
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
                onClick={() => triggerToast(`Transit Permit Technical Dossier for ${activeDossierModal.id} sent to print spooler`)}
              >
                <Printer style={{ width: 14, height: 14 }} />
                <span>Print Dossier Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: OFFICIAL TRANSIT PASS & GATE PERMIT (FORM T-2)
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
                <span>Excise Transit Pass & Gate Permit (Form T-2)</span>
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
                  EXCISE TRANSIT PASS & CARRIER GATE PERMIT • FORM T-2
                </div>
              </div>

              {/* Pass Identifiers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    TRANSIT PASS NUMBER
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#012a52", fontFamily: "monospace" }}>
                    {activePassModal.gatePassNumber || "DEL-TP-2026-0034"}
                  </span>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", fontWeight: 600, display: "block" }}>
                    TRANSIT VALIDITY WINDOW
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#166534" }}>
                    {activePassModal.validityPeriod || "10/05/2026 to 14/05/2026"}
                  </span>
                </div>
              </div>

              {/* Entity Data */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8125rem", color: "#334155", marginBottom: "1rem" }}>
                <div>
                  <strong style={{ color: "#012a52" }}>Permit Classification:</strong> {activePassModal.permitType}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Consignment Manifest:</strong> {activePassModal.consignmentDetails}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Originating Dispatch Premise:</strong> {activePassModal.sourcePremise}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Destination Consignee Premise:</strong> {activePassModal.destPremise}
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Authorized Carrier Vehicle:</strong> {activePassModal.carrierLicense} (Driver: {activePassModal.driverName})
                </div>
                <div>
                  <strong style={{ color: "#012a52" }}>Security Seals & Hologram Ref:</strong> DL-EX-SEAL-88902 / Tamper-evident lock verified
                </div>
              </div>

              {/* Sign-off footer */}
              <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>Date of Generation: {activePassModal.submittedDate}</div>
                  <div style={{ fontSize: "0.6875rem", color: "#0284c7", fontWeight: 700, marginTop: "2px" }}>
                    Digitally Signed via GNCTD eAbkari Core
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#012a52" }}>
                    Deputy Commissioner (Transit & Enforcement)
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
                onClick={() => triggerToast(`Downloading Official Form T-2 Transit Gate Pass for ${activePassModal.id}`)}
              >
                <Download style={{ width: 14, height: 14 }} />
                <span>Download Form T-2 PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
