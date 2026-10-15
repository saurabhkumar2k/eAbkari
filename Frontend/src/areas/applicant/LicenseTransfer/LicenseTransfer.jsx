import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  ArrowRightLeft,
  Building2,
  Eye,
  ClipboardList,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Search,
  Download,
  RefreshCw,
  HelpCircle,
  Printer,
  FileCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Upload,
  Shield,
  FileBadge,
  Info,
  Calendar,
  MapPin,
  CreditCard,
  Building,
  User
} from "lucide-react";
import ChangeDirector from "./ChangeDirector.jsx";
import ViewApplication from "./ViewApplication.jsx";

export default function LicenseTransfer({
  licenses = [],
  profile = {},
  showToast = () => {},
  onNavigateToHome = () => {}
}) {
  // Dedicated Page Routing: 'cards' (menu) | 'change-director' | 'transfer-license' | 'view-applications'
  const [currentPage, setCurrentPage] = useState("cards");

  // Initial Applications Ledger (Comprehensive Delhi eAbkari sample petitions + runtime submissions)
  const [transferApplications, setTransferApplications] = useState([
    {
      id: "TR-2026-90812",
      licId: "ND-25-L10023",
      type: "Ownership Transfer",
      category: "transfer-license",
      currentEntity: "Kristal Spirits & Allied Ventures Pvt Ltd",
      newEntity: "Apex Beverages India Private Limited",
      authorizedPerson: "Vikram Malhotra (Director)",
      dinPan: "09124482 / AAACA9910F",
      submittedDate: "12/05/2026",
      status: "Under Scrutiny",
      scrutinyDesk: "Excise Licensing & Legal Scrutiny Wing",
      remarks: "Transferee entity police verification and ROC filing validation in progress",
      fee: "₹ 15,000",
      stages: [
        { label: "Application & ROC Scrutiny", status: "completed", date: "12/05/2026", officer: "Superintendent (Licensing)" },
        { label: "Transferee Police Clearance", status: "in-progress", date: "14/05/2026", officer: "Special Cell Police Liaison" },
        { label: "Premise & Inventory Audit", status: "pending", date: "Pending", officer: "Field Inspection Wing" },
        { label: "Excise Endorsement Order", status: "pending", date: "Pending", officer: "Deputy Commissioner (Excise)" }
      ]
    },
    {
      id: "DIR-2026-44120",
      licId: "ND-25-L10023",
      type: "Director Change",
      category: "change-director",
      currentEntity: "Kristal Spirits & Allied Ventures Pvt Ltd",
      newEntity: "Rohitashva Sharma (Appointed Managing Director)",
      authorizedPerson: "Rohitashva Sharma",
      dinPan: "08849201 / BBPPS4019G",
      submittedDate: "20/05/2026",
      status: "Approved",
      scrutinyDesk: "Corporate Directorship Cell",
      remarks: "Board Resolution authenticated; Form DIR-12 updated in master register",
      fee: "₹ 5,000",
      stages: [
        { label: "Board Resolution Validation", status: "completed", date: "20/05/2026", officer: "Legal Registrar" },
        { label: "MCA DIR-12 Cross Check", status: "completed", date: "21/05/2026", officer: "Assistant Commissioner" },
        { label: "Statutory Fee Settlement", status: "completed", date: "21/05/2026", officer: "Excise Accounts Desk" },
        { label: "Directorship Certificate", status: "completed", date: "23/05/2026", officer: "Deputy Commissioner (Excise)" }
      ]
    },
    {
      id: "TR-2026-88195",
      licId: "ND-25-L10023",
      type: "Premises Relocation Transfer",
      category: "transfer-license",
      currentEntity: "Kristal Spirits & Allied Ventures Pvt Ltd",
      newEntity: "New Site: Plot 88, Kirti Nagar Industrial Area, New Delhi - 110015",
      authorizedPerson: "Vishal Devilal Jaiswal",
      dinPan: "08849201 / AAACD1902E",
      submittedDate: "02/06/2026",
      status: "Under Scrutiny",
      scrutinyDesk: "Physical Infrastructure Scrutiny Wing",
      remarks: "Fire Services NOC and site layout inspection scheduled for new warehouse",
      fee: "₹ 15,000",
      stages: [
        { label: "Relocation Petition Scrutiny", status: "completed", date: "02/06/2026", officer: "Field Scrutiny Officer" },
        { label: "DFS Fire Clearance Audit", status: "in-progress", date: "04/06/2026", officer: "Delhi Fire Services Inspector" },
        { label: "Acoustic / Boundary Survey", status: "pending", date: "Pending", officer: "Field Surveyor" },
        { label: "Premise Endorsement Pass", status: "pending", date: "Pending", officer: "Deputy Commissioner (Premises)" }
      ]
    }
  ]);

  // Form 2 State: Transfer License to New Applicant
  const [transferForm, setTransferForm] = useState({
    licId: licenses[0]?.id || "ND-25-L10023",
    transferType: "Ownership Transfer",
    transfereeName: "",
    transfereeLegalStructure: "Private Limited Company",
    transfereeAddress: "",
    transfereePan: "",
    authorizedSignatory: "",
    justification: "",
    uploadedDeed: false
  });

  // Success Dockets
  const [lastSubmissionSuccess, setLastSubmissionSuccess] = useState(null);

  // Handle Submit Form 2: Transfer License to New Applicant
  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    if (!transferForm.transfereeName.trim()) {
      showToast("Please enter new transferee entity legal name", "warning");
      return;
    }

    const txId = `TR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id: txId,
      licId: transferForm.licId,
      type: transferForm.transferType,
      category: "transfer-license",
      currentEntity: "Kristal Spirits & Allied Ventures Pvt Ltd",
      newEntity: transferForm.transfereeName,
      authorizedPerson: transferForm.authorizedSignatory || "Authorized Transferee Signatory",
      dinPan: transferForm.transfereePan || "PAN-Verified",
      submittedDate: new Date().toLocaleDateString("en-GB"),
      status: "Under Scrutiny",
      scrutinyDesk: "Excise Licensing & Legal Scrutiny Wing",
      remarks: "Transferee entity credentials under legal verification",
      fee: "₹ 15,000",
      stages: [
        { label: "Application & ROC Scrutiny", status: "completed", date: new Date().toLocaleDateString("en-GB"), officer: "Superintendent (Licensing)" },
        { label: "Transferee Police Clearance", status: "in-progress", date: "Scheduled", officer: "Special Cell Police Liaison" },
        { label: "Premise & Inventory Audit", status: "pending", date: "Pending", officer: "Field Inspection Wing" },
        { label: "Excise Endorsement Order", status: "pending", date: "Pending", officer: "Deputy Commissioner (Excise)" }
      ]
    };

    setTransferApplications((prev) => [newEntry, ...prev]);
    setLastSubmissionSuccess({
      txId,
      title: "License Transfer Application Filed Successfully",
      message: `Your petition for ${transferForm.transferType} of License ${transferForm.licId} under Form TL-1 has been registered under Transaction ID ${txId}. Scrutinizing officers will verify transferee credentials within 7 business days.`
    });
    showToast(`License Transfer petition ${txId} submitted successfully!`, "success");
  };

  // Service Cards Definition (matching New License categories layout)
  const serviceCards = [
    {
      id: "change-director",
      title: "Change Director (Applicant) Details",
      subtitle: "Corporate Directorship Amendment (Form TL-2)",
      desc: "Amend managing director, partner, authorized signatory, or board representative details with authenticated board resolution.",
      icon: Users
    },
    {
      id: "transfer-license",
      title: "Transfer License to New Applicant",
      subtitle: "Ownership Transfer & Assignment (Form TL-1)",
      desc: "Complete legal assignment, corporate restructuring, or physical premises relocation transfer of the excise license to a new applicant entity.",
      icon: ArrowRightLeft
    },
    {
      id: "view-applications",
      title: "View Application",
      subtitle: "Petitions Ledger & Real-Time Tracking",
      desc: "Track live status of submitted director change petitions, transferee verification audits, scrutiny officer remarks, and download official orders.",
      icon: ClipboardList
    }
  ];

  return (
    <div className="lt-wrapper">
      {/* 1. Header Banner */}
      <div className="lt-header">
        <div className="lt-header-info">
          <div className="lt-badge-pill">
            <Shield style={{ width: 13, height: 13 }} />
            <span>Government of NCT of Delhi • eAbkari Core</span>
          </div>
          <h1 className="lt-header-title">License Transfer & Directorship Management Portal</h1>
          <p className="lt-header-subtitle">
            Statutory portal for filing directorship amendments, corporate board changes, complete ownership transfers, and tracking application scrutiny under the Delhi Excise Act, 2009.
          </p>
        </div>
      </div>

      {/* 2. THE 3 SERVICE CARDS VIEW (MAIN LANDING PAGE) */}
      {currentPage === "cards" && (
        <>
          {/* Quick Metrics Strip */}
          <div className="lt-metrics-grid animate-fade">
            <div className="lt-metric-card">
              <div className="lt-metric-icon blue">
                <Building style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div className="lt-metric-val">{licenses.length || 1}</div>
                <div className="lt-metric-label">Eligible Registered Licenses</div>
                <div className="lt-metric-sub">Wholesale, Retail & Hotel/Bar Units</div>
              </div>
            </div>

            <div className="lt-metric-card">
              <div className="lt-metric-icon amber">
                <Clock style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div className="lt-metric-val">~5 – 7 Days</div>
                <div className="lt-metric-label">Statutory Scrutiny SLA</div>
                <div className="lt-metric-sub">Delhi Excise Rule 38 & 41 Processing</div>
              </div>
            </div>

            <div className="lt-metric-card">
              <div className="lt-metric-icon emerald">
                <ClipboardList style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div className="lt-metric-val">{transferApplications.length}</div>
                <div className="lt-metric-label">Registered Petitions in Ledger</div>
                <div className="lt-metric-sub">Under Verification or Endorsed</div>
              </div>
            </div>
          </div>

          {/* Clickable 3 Service Cards (Matching New License Category Card System) */}
          <div className="basic-details-card animate-fade">
            <div className="section-header">
              <div className="section-header-icon">
                <ArrowRightLeft />
              </div>
              <div className="section-header-content">
                <h2 className="section-title">Select Transfer / Management Service</h2>
                <p className="section-subtitle">
                  Click any service below to open its dedicated page: Change Director, Transfer License, or View Applications.
                </p>
              </div>
            </div>

            <div className="category-grid lt-category-grid">
              {serviceCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      setCurrentPage(card.id);
                      setLastSubmissionSuccess(null);
                      showToast(`Navigating to ${card.title}...`, "info");
                    }}
                    className="category-card"
                  >
                    <div className="category-icon">
                      <IconComponent />
                    </div>
                    <h4 className="category-title">{card.title}</h4>
                    <p className="category-subtitle">{card.subtitle}</p>
                    <div className="category-divider" />
                    <p className="category-description">{card.desc}</p>
                    <div
                      className="category-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage(card.id);
                        setLastSubmissionSuccess(null);
                        showToast(`Navigating to ${card.title}...`, "info");
                      }}
                    >
                      <ChevronRight />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Statutory Guidelines & Compliance Overview */}
          <div className="lt-mandate-card animate-fade">
            <div className="lt-mandate-header">
              <Shield style={{ width: 22, height: 22, color: "#012a52" }} />
              <h3 className="lt-mandate-title">Delhi Excise Statutory Mandate & Regulatory Safeguards</h3>
            </div>
            <div className="lt-mandate-grid">
              <div className="lt-mandate-item">
                <h5>
                  <Users style={{ width: 14, height: 14, color: "#0284c7" }} />
                  <span>Directorship Change Protocol</span>
                </h5>
                <p>
                  Governed under Delhi Excise Rule 41. Reconstitution in the board of directors, partners, or power of attorney must be filed with certified board minutes and MCA Form DIR-12.
                </p>
              </div>

              <div className="lt-mandate-item">
                <h5>
                  <ArrowRightLeft style={{ width: 14, height: 14, color: "#0369a1" }} />
                  <span>Privilege Transfer & Assignment</span>
                </h5>
                <p>
                  Regulated under Section 16 & Rule 38. Complete transfer of excise license privilege to new corporate entities requires character verification and clearance of excise dues.
                </p>
              </div>

              <div className="lt-mandate-item">
                <h5>
                  <ClipboardList style={{ width: 14, height: 14, color: "#15803d" }} />
                  <span>Real-Time Audit & Tracking</span>
                </h5>
                <p>
                  All applications undergo a 4-stage statutory evaluation by Legal Scrutiny, Police Liaison, Field Inspection, and final endorsement by the Deputy Commissioner of Excise.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================
          NEXT PAGE 1: CHANGE DIRECTOR (APPLICANT) DETAILS
          ============================================================ */}
      {currentPage === "change-director" && (
        <ChangeDirector
          licenses={licenses}
          profile={profile}
          onBackToTransfer={() => {
            setCurrentPage("cards");
            setLastSubmissionSuccess(null);
          }}
          onNavigateToHome={onNavigateToHome}
          showToast={showToast}
          onSubmitSuccess={(submissionData) => {
            setTransferApplications((prev) => [
              {
                id: submissionData.txId,
                licId: submissionData.licId,
                type: "Director Details Amendment",
                category: "change-director",
                currentEntity: `${profile.firstName || "MANISH"} ${profile.lastName || "MALIK"}`,
                newEntity: submissionData.newEntity,
                authorizedPerson: submissionData.applicantName,
                dinPan: submissionData.dinPan,
                submittedDate: submissionData.date,
                status: "Under Scrutiny",
                scrutinyDesk: submissionData.scrutinyDesk,
                remarks: submissionData.remarks,
                fee: submissionData.fee,
                stages: [
                  { label: "Application & Identity Scrutiny", status: "completed", date: submissionData.date, officer: "Superintendent (Licensing)" },
                  { label: "Police & Character Verification", status: "in-progress", date: submissionData.date, officer: "Special Branch Police Liaison" },
                  { label: "Field Inspection Audit", status: "pending", date: "Pending", officer: "Excise Inspector (Area)" },
                  { label: "Competent Authority Approval", status: "pending", date: "Pending", officer: "Deputy Commissioner (Excise)" }
                ]
              },
              ...prev
            ]);
          }}
        />
      )}

      {/* ============================================================
          NEXT PAGE 2: TRANSFER LICENSE TO NEW APPLICANT
          ============================================================ */}
      {currentPage === "transfer-license" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Breadcrumb Navigation Bar */}
          <div className="lt-page-nav-bar animate-fade">
            <button
              type="button"
              className="lt-back-btn"
              onClick={() => {
                setCurrentPage("cards");
                setLastSubmissionSuccess(null);
              }}
            >
              <ArrowLeft style={{ width: 15, height: 15 }} />
              <span>Back to License Transfer Options</span>
            </button>

            <div className="lt-page-breadcrumb">
              <button
                type="button"
                className="lt-breadcrumb-link"
                onClick={() => {
                  setCurrentPage("cards");
                  setLastSubmissionSuccess(null);
                }}
              >
                License Transfer
              </button>
              <span>/</span>
              <span className="lt-breadcrumb-current">Transfer License to New Applicant</span>
            </div>

            <div className="lt-nav-quick-actions">
              <button
                type="button"
                className="lt-btn-outline"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                onClick={() => {
                  setCurrentPage("view-applications");
                  setLastSubmissionSuccess(null);
                }}
              >
                <Eye style={{ width: 13, height: 13 }} />
                <span>View Applications Ledger</span>
              </button>
            </div>
          </div>

          {/* Success Screen Or Form TL-1 */}
          {lastSubmissionSuccess ? (
            <div className="lt-content-panel">
              <div className="lt-success-card">
                <div className="lt-success-icon-wrap">
                  <CheckCircle2 style={{ width: 32, height: 32 }} />
                </div>
                <h3 className="lt-success-title">{lastSubmissionSuccess.title}</h3>
                <p className="lt-success-desc">{lastSubmissionSuccess.message}</p>
                <div className="lt-tx-id">Transaction Reference: {lastSubmissionSuccess.txId}</div>

                <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="lt-btn-primary"
                    onClick={() => {
                      setCurrentPage("view-applications");
                      setLastSubmissionSuccess(null);
                    }}
                  >
                    <ClipboardList style={{ width: 15, height: 15 }} />
                    <span>Track in View Application Ledger</span>
                  </button>

                  <button
                    type="button"
                    className="lt-btn-outline"
                    onClick={() => setLastSubmissionSuccess(null)}
                  >
                    <span>File Another Transfer Request</span>
                  </button>

                  <button
                    type="button"
                    className="lt-btn-outline"
                    onClick={() => {
                      setCurrentPage("cards");
                      setLastSubmissionSuccess(null);
                    }}
                  >
                    <ArrowLeft style={{ width: 14, height: 14 }} />
                    <span>Back to Services</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lt-content-panel animate-fade">
              <div className="lt-panel-header">
                <div className="lt-panel-title-group">
                  <div className="lt-panel-icon">
                    <ArrowRightLeft style={{ width: 22, height: 22 }} />
                  </div>
                  <div>
                    <h2 className="lt-panel-title">Form TL-1: Application for Transfer & Assignment of License</h2>
                    <p className="lt-panel-subtitle">
                      Transfer excise license rights to a new corporate entity, partnership restructuring, or site relocation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="lt-btn-outline"
                  onClick={() => {
                    setCurrentPage("view-applications");
                    setLastSubmissionSuccess(null);
                  }}
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                >
                  <Eye style={{ width: 13, height: 13 }} />
                  <span>View Existing Applications</span>
                </button>
              </div>

              {/* Informational Guidance */}
              <div className="lt-info-banner warning">
                <AlertCircle style={{ width: 20, height: 20, color: "#d97706", flexShrink: 0, marginTop: 2 }} />
                <div className="lt-info-content">
                  <h5 style={{ color: "#92400e" }}>Statutory Compliance for License Transfer</h5>
                  <p style={{ color: "#78350f" }}>
                    License transfer entails complete legal assignment. The proposed transferee will undergo statutory character verification, financial audit, and Delhi Police scrutiny. A non-refundable processing fee of <strong>₹ 15,000</strong> is payable upon submission.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitTransfer}>
                <div className="lt-form-grid">
                  {/* Select Target License */}
                  <div className="lt-form-group">
                    <label htmlFor="transferLicenseSelect" className="lt-label">
                      <span>Select License to Transfer</span>
                      <span className="req">*</span>
                    </label>
                    <select
                      id="transferLicenseSelect"
                      value={transferForm.licId}
                      onChange={(e) => setTransferForm({ ...transferForm, licId: e.target.value })}
                      className="lt-select"
                    >
                      {licenses.map((lic) => (
                        <option key={lic.id} value={lic.id}>
                          {lic.id} — {lic.type} ({lic.location || "Delhi NCT"})
                        </option>
                      ))}
                      {licenses.length === 0 && (
                        <option value="ND-25-L10023">ND-25-L10023 — Wholesale Foreign Liquor (L-1)</option>
                      )}
                    </select>
                  </div>

                  {/* Transfer Classification */}
                  <div className="lt-form-group">
                    <label className="lt-label">
                      <span>Transfer Classification Category</span>
                      <span className="req">*</span>
                    </label>
                    <div className="lt-type-picker">
                      {[
                        "Ownership Transfer",
                        "Premises Relocation",
                        "Partnership Restructuring",
                        "Legal Heir Transfer"
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`lt-type-option ${transferForm.transferType === type ? "selected" : ""}`}
                          onClick={() => setTransferForm({ ...transferForm, transferType: type })}
                        >
                          <ArrowRightLeft style={{ width: 14, height: 14 }} />
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transferee Entity Legal Name */}
                  <div className="lt-form-group col-span-2">
                    <label htmlFor="transfereeLegalName" className="lt-label">
                      <span>
                        {transferForm.transferType === "Premises Relocation"
                          ? "New Proposed Facility / Site Name"
                          : "New Transferee Entity Registered Legal Name"}
                      </span>
                      <span className="req">*</span>
                    </label>
                    <input
                      id="transfereeLegalName"
                      type="text"
                      placeholder={
                        transferForm.transferType === "Premises Relocation"
                          ? "e.g. West Delhi Central Logistics Hub, Kirti Nagar"
                          : "e.g. Apex Beverages India Private Limited"
                      }
                      value={transferForm.transfereeName}
                      onChange={(e) => setTransferForm({ ...transferForm, transfereeName: e.target.value })}
                      className="lt-input"
                      required
                    />
                  </div>

                  {/* Legal Entity Structure */}
                  <div className="lt-form-group">
                    <label htmlFor="transfereeStructure" className="lt-label">
                      <span>Transferee Legal Entity Constitution</span>
                    </label>
                    <select
                      id="transfereeStructure"
                      value={transferForm.transfereeLegalStructure}
                      onChange={(e) => setTransferForm({ ...transferForm, transfereeLegalStructure: e.target.value })}
                      className="lt-select"
                    >
                      <option value="Private Limited Company">Private Limited Company (CIN registered)</option>
                      <option value="Limited Liability Partnership">Limited Liability Partnership (LLP)</option>
                      <option value="Partnership Firm">Registered Partnership Firm</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Public Limited Company">Public Limited Company</option>
                    </select>
                  </div>

                  {/* Transferee PAN / GSTIN */}
                  <div className="lt-form-group">
                    <label htmlFor="transfereePan" className="lt-label">
                      <span>Transferee PAN / GSTIN</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      id="transfereePan"
                      type="text"
                      placeholder="e.g. AAACA9910F or 07AAACA9910F1Z5"
                      value={transferForm.transfereePan}
                      onChange={(e) => setTransferForm({ ...transferForm, transfereePan: e.target.value.toUpperCase() })}
                      className="lt-input"
                    />
                  </div>

                  {/* Transferee Registered Office / New Site Address */}
                  <div className="lt-form-group col-span-2">
                    <label htmlFor="transfereeAddress" className="lt-label">
                      <span>Complete Registered Address / Proposed Premise Location</span>
                      <span className="req">*</span>
                    </label>
                    <textarea
                      id="transfereeAddress"
                      rows={2}
                      placeholder="Provide full official address including plot number, commercial complex, district, and pincode..."
                      value={transferForm.transfereeAddress}
                      onChange={(e) => setTransferForm({ ...transferForm, transfereeAddress: e.target.value })}
                      className="lt-textarea"
                    />
                  </div>

                  {/* Authorized Contact Person */}
                  <div className="lt-form-group">
                    <label htmlFor="transfereeSignatory" className="lt-label">
                      <span>Authorized Representative of Transferee</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      id="transfereeSignatory"
                      type="text"
                      placeholder="e.g. Vikram Malhotra (Designated Director)"
                      value={transferForm.authorizedSignatory}
                      onChange={(e) => setTransferForm({ ...transferForm, authorizedSignatory: e.target.value })}
                      className="lt-input"
                    />
                  </div>

                  {/* Transfer Deed / NOC Upload */}
                  <div className="lt-form-group">
                    <label className="lt-label">
                      <span>Deed of Transfer / NOC Agreement Upload</span>
                    </label>
                    <div
                      className={`lt-upload-box ${transferForm.uploadedDeed ? "uploaded" : ""}`}
                      onClick={() => {
                        setTransferForm((p) => ({ ...p, uploadedDeed: !p.uploadedDeed }));
                        showToast(
                          transferForm.uploadedDeed
                            ? "Deed document removed"
                            : "Deed of Transfer & NOC uploaded and authenticated",
                          "info"
                        );
                      }}
                    >
                      {transferForm.uploadedDeed ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#166534" }}>
                          <CheckCircle2 style={{ width: 18, height: 18 }} />
                          <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                            Transfer_Deed_Signed_NOC.pdf (Attached)
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                          <Upload style={{ width: 18, height: 18, color: "#0284c7" }} />
                          <span style={{ fontSize: "0.775rem", fontWeight: 700, color: "#0f172a" }}>
                            Attach Transfer Deed / NOC
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Justification */}
                  <div className="lt-form-group col-span-2">
                    <label htmlFor="transferJustification" className="lt-label">
                      <span>Justification & Legal Grounds for Transfer</span>
                    </label>
                    <textarea
                      id="transferJustification"
                      rows={2}
                      placeholder="Provide legal brief explaining the grounds of transfer, corporate resolution, and continuity of operations..."
                      value={transferForm.justification}
                      onChange={(e) => setTransferForm({ ...transferForm, justification: e.target.value })}
                      className="lt-textarea"
                    />
                  </div>
                </div>

                {/* Statutory Fee Notice & Submit */}
                <div className="lt-form-actions">
                  <div style={{ marginRight: "auto", fontSize: "0.775rem", color: "#64748b" }}>
                    Statutory Transfer Duty: <strong style={{ color: "#012a52" }}>₹ 15,000</strong> (Non-refundable)
                  </div>

                  <button
                    type="button"
                    className="lt-btn-outline"
                    onClick={() => {
                      setTransferForm({
                        licId: licenses[0]?.id || "ND-25-L10023",
                        transferType: "Ownership Transfer",
                        transfereeName: "",
                        transfereeLegalStructure: "Private Limited Company",
                        transfereeAddress: "",
                        transfereePan: "",
                        authorizedSignatory: "",
                        justification: "",
                        uploadedDeed: false
                      });
                      showToast("Form cleared", "info");
                    }}
                  >
                    <RefreshCw style={{ width: 14, height: 14 }} />
                    <span>Reset</span>
                  </button>

                  <button
                    type="button"
                    className="lt-btn-outline"
                    onClick={() => {
                      setCurrentPage("cards");
                      setLastSubmissionSuccess(null);
                    }}
                  >
                    <ArrowLeft style={{ width: 14, height: 14 }} />
                    <span>Back to Options</span>
                  </button>

                  <button type="submit" className="lt-btn-primary">
                    <FileCheck style={{ width: 16, height: 16 }} />
                    <span>File License Transfer Application</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          NEXT PAGE 3: VIEW APPLICATION (LEDGER & STATUS TRACKER)
          ============================================================ */}
      {currentPage === "view-applications" && (
        <ViewApplication
          applications={transferApplications}
          onBackToTransfer={() => {
            setCurrentPage("cards");
            setLastSubmissionSuccess(null);
          }}
          onNavigateToChangeDirector={() => {
            setCurrentPage("change-director");
            setLastSubmissionSuccess(null);
          }}
          onNavigateToTransferLicense={() => {
            setCurrentPage("transfer-license");
            setLastSubmissionSuccess(null);
          }}
          onNavigateToHome={onNavigateToHome}
          showToast={showToast}
        />
      )}

    </div>
  );
}
