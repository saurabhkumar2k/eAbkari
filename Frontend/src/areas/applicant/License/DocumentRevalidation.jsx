import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  Search,
  Eye,
  Clock,
  Building2,
  RefreshCw,
  Download,
  ShieldCheck,
  Calendar,
  HelpCircle,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function DocumentRevalidation({
  setActiveTab,
  showToast,
  onNavigateToHome = () => {},
  onNavigateToRenewal = () => {}
}) {
  const [selectedYear, setSelectedYear] = useState("2025-2026");
  const [searchTerm, setSearchTerm] = useState("");

  // Primary license records matching Delhi Excise eAbkari portal & the user's provided specification
  const [licenses, setLicenses] = useState([
    {
      id: "doc-1",
      license: "L1 (License for Wholesale Vend of Indian Liquor) and L31 (License for Warehouse for storage of Indian Liquor)",
      licenseNo: "01/2024/0786",
      siteName: "MOHAN MEAKIN LIMITED UP",
      finYear: "2025-2026",
      status: "Document Validation Needed",
      documents: [
        {
          id: "doc-fire",
          name: "Delhi Fire Service Safety Clearance NOC",
          type: "Fire Safety",
          validTill: "31-Mar-2025",
          status: "Validation Needed",
          fileName: "Fire_NOC_2024_25.pdf",
          fileSize: "1.8 MB"
        },
        {
          id: "doc-dpcc",
          name: "DPCC Consent to Operate (CTO) Clearance",
          type: "Pollution Control",
          validTill: "15-Apr-2025",
          status: "Validation Needed",
          fileName: "DPCC_Consent_Warehouse.pdf",
          fileSize: "2.4 MB"
        },
        {
          id: "doc-fssai",
          name: "FSSAI Food Safety & Standards Central License",
          type: "Food Safety",
          validTill: "31-Dec-2026",
          status: "Validated",
          fileName: "FSSAI_Central_100230110022.pdf",
          fileSize: "980 KB"
        },
        {
          id: "doc-lease",
          name: "Registered Warehouse Lease & Possession Agreement",
          type: "Premise Title",
          validTill: "31-Mar-2028",
          status: "Validated",
          fileName: "Registered_Lease_UP_Del.pdf",
          fileSize: "4.1 MB"
        },
        {
          id: "doc-gst",
          name: "Annual GST Compliance & Tax Clearance Certificate",
          type: "Taxation",
          validTill: "31-Mar-2025",
          status: "Validation Needed",
          fileName: "GSTR_Tax_Clearance_24_25.pdf",
          fileSize: "1.2 MB"
        }
      ],
      uploadedLicenseCopy: null
    }
  ]);

  const [activeRevalModal, setActiveRevalModal] = useState(null);
  const [activeUploadModal, setActiveUploadModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDate, setUploadDate] = useState("2026-03-31");
  const [uploadRemarks, setUploadRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState("");

  const triggerToast = (msg) => {
    if (showToast) {
      showToast(msg);
    } else {
      setFeedbackToast(msg);
      setTimeout(() => setFeedbackToast(""), 4000);
    }
  };

  // Open Document Revalidation checklist modal
  const handleOpenRevalidate = (lic) => {
    setActiveRevalModal({ ...lic });
  };

  // Open Upload License Copy modal
  const handleOpenUpload = (lic) => {
    setActiveUploadModal({ ...lic });
    setSelectedFile(null);
    setUploadRemarks("");
  };

  // Handle re-upload of a specific document inside the Revalidation modal
  const handleReuploadDocItem = (docId) => {
    if (!activeRevalModal) return;
    const updatedDocs = activeRevalModal.documents.map((d) => {
      if (d.id === docId) {
        return {
          ...d,
          status: "Validated",
          validTill: "31-Mar-2026",
          fileName: `${d.type.replace(/\s+/g, "_")}_Revalidated_2025_26.pdf`
        };
      }
      return d;
    });

    setActiveRevalModal({
      ...activeRevalModal,
      documents: updatedDocs
    });

    triggerToast("Document updated and marked ready for revalidation!");
  };

  // Submit complete revalidation application
  const handleSubmitRevalidation = () => {
    if (!activeRevalModal) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setLicenses((prev) =>
        prev.map((item) => {
          if (item.id === activeRevalModal.id) {
            return {
              ...item,
              status: "Revalidation In Review",
              documents: activeRevalModal.documents
            };
          }
          return item;
        })
      );
      setIsSubmitting(false);
      setActiveRevalModal(null);
      triggerToast(
        `Revalidation package for Licence No ${activeRevalModal.licenseNo} submitted to Excise DA successfully.`
      );
    }, 600);
  };

  // Submit Uploaded License Copy
  const handleSubmitLicenseCopy = (e) => {
    e.preventDefault();
    if (!activeUploadModal) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setLicenses((prev) =>
        prev.map((item) => {
          if (item.id === activeUploadModal.id) {
            return {
              ...item,
              uploadedLicenseCopy: {
                fileName: selectedFile ? selectedFile.name : `Signed_Licence_${item.licenseNo.replace(/\//g, "_")}.pdf`,
                uploadDate: new Date().toLocaleDateString("en-IN"),
                validTill: uploadDate,
                remarks: uploadRemarks || "Official signed copy uploaded by licensee"
              }
            };
          }
          return item;
        })
      );
      setIsSubmitting(false);
      setActiveUploadModal(null);
      triggerToast(
        `Signed Licence Copy for ${activeUploadModal.licenseNo} uploaded successfully.`
      );
    }, 600);
  };

  // Filtered records
  const filteredLicenses = licenses.filter((lic) => {
    const matchesYear = selectedYear === "All" || lic.finYear === selectedYear;
    const matchesSearch =
      lic.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.siteName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const getStatusBadge = (status) => {
    if (status === "Validated" || status.includes("Validated")) {
      return <span className="renewal-badge emerald">Validated</span>;
    }
    if (status.includes("Review")) {
      return <span className="renewal-badge blue">In Review</span>;
    }
    return <span className="renewal-badge amber">{status}</span>;
  };

  return (
    <div className="renewal-page-wrapper">
      {/* Toast Notification Banner if stand-alone */}
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

      {/* 1. Breadcrumb Bar - identical to renewallicense.jsx pattern */}
      <div className="renewal-breadcrumb-bar">
        <div className="renewal-page-container">
          <div className="renewal-breadcrumb-inner">
            <div className="renewal-breadcrumb">
              <button
                type="button"
                className="renewal-breadcrumb-link"
                onClick={() => {
                  if (onNavigateToHome) onNavigateToHome();
                  else if (setActiveTab) setActiveTab("Home");
                }}
              >
                Dashboard
              </button>
              <span>/</span>
              <span>Licensing Wing</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Document Revalidation</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="renewal-emblem-badge">
                <span className="renewal-emblem-dot"></span>
                <span>Government of NCT of Delhi • eAbkari Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="renewal-page-container">
        {/* 2. Hero Section - identical to renewallicense.jsx */}
        <div className="renewal-hero-section">
          <div className="renewal-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Document Compliance Cycle 2025–2026</span>
          </div>
          <h1 className="renewal-hero-title">Document Revalidation</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Ensuring statutory clearance validation, annual Fire Safety NOC, DPCC Consent, Premise Clearances, and authenticated license copy endorsements for registered establishments across the National Capital Territory of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip - identical to renewallicense.jsx */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Calendar style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{selectedYear}</div>
              <div className="renewal-stat-label">Active Financial Cycle</div>
              <div className="renewal-stat-note">Statutory Compliance Period</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">Action Required</div>
              <div className="renewal-stat-label">Revalidation Status</div>
              <div className="renewal-stat-note">Clearance Updates Pending</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">100% Online</div>
              <div className="renewal-stat-label">Digital Verification</div>
              <div className="renewal-stat-note">Direct Excise DA Assessment</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card - identical to renewallicense.jsx highlight-card */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">License Document Revalidation Register</h2>
              <p className="renewal-section-subtitle">
                Review statutory certificates, upload renewed clearances, and submit verified documentation for excise endorsement
              </p>
            </div>
          </div>

          {/* Form Group with Search and Year Filter */}
          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="finYearSelect" className="renewal-label">
                <Calendar style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Search & Financial Year Filter</span>
              </label>
              <span className="renewal-badge-count">
                {filteredLicenses.length} Record{filteredLicenses.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search by License, Licence No (e.g. 01/2024/0786), or Site Name..."
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

              <div className="renewal-select-wrapper" style={{ width: "200px" }}>
                <select
                  id="finYearSelect"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="renewal-select"
                >
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="All">All Cycles</option>
                </select>
                <ChevronDown className="renewal-select-icon" />
              </div>
            </div>
          </div>

          {/* Table or Empty Canvas */}
          {filteredLicenses.length === 0 ? (
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
                <span>Document Register: No Matching Record</span>
              </div>

              <h3 className="renewal-empty-title">No Document Revalidation records found</h3>
              <p className="renewal-empty-desc">
                No active records match the current query for FY {selectedYear}. Clear search terms or switch the financial cycle above.
              </p>

              <div className="renewal-empty-actions">
                <button
                  type="button"
                  className="renewal-empty-sample-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedYear("2025-2026");
                  }}
                >
                  <RefreshCw style={{ width: 14, height: 14 }} />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="renewal-table-wrapper">
              <table className="renewal-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: "260px" }}>License</th>
                    <th style={{ minWidth: "130px" }}>Licence No</th>
                    <th style={{ minWidth: "180px" }}>Site Name</th>
                    <th style={{ minWidth: "100px" }}>Fin Year</th>
                    <th style={{ minWidth: "160px" }}>Status</th>
                    <th style={{ minWidth: "165px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLicenses.map((lic) => (
                    <tr key={lic.id}>
                      <td style={{ verticalAlign: "top" }}>
                        <strong style={{ color: "#012a52", display: "block", fontSize: "0.875rem", lineHeight: "1.4" }}>
                          {lic.license}
                        </strong>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px", display: "inline-block" }}>
                          Wholesale Vend & Bonded Warehouse Storage Division
                        </span>
                      </td>

                      <td style={{ verticalAlign: "top" }}>
                        <span className="renewal-lic-id-tag">{lic.licenseNo}</span>
                      </td>

                      <td style={{ verticalAlign: "top" }}>
                        <strong style={{ color: "#1e293b", display: "block", fontSize: "0.875rem" }}>
                          {lic.siteName}
                        </strong>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          Registered Bonded Facility
                        </span>
                      </td>

                      <td style={{ verticalAlign: "top" }}>
                        <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.875rem" }}>
                          {lic.finYear}
                        </span>
                      </td>

                      <td style={{ verticalAlign: "top" }}>
                        <div>{getStatusBadge(lic.status)}</div>
                        {lic.uploadedLicenseCopy && (
                          <div
                            style={{
                              fontSize: "0.725rem",
                              color: "#166534",
                              marginTop: "6px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontWeight: 600
                            }}
                          >
                            <FileCheck style={{ width: "13px", height: "13px" }} />
                            <span>Copy Attached: {lic.uploadedLicenseCopy.fileName}</span>
                          </div>
                        )}
                      </td>

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
                            onClick={() => handleOpenRevalidate(lic)}
                          >
                            <FileCheck style={{ width: 14, height: 14 }} />
                            <span>Document Revalidate</span>
                          </button>

                          <button
                            type="button"
                            className="renewal-btn-outline"
                            style={{
                              justifyContent: "center",
                              padding: "0.45rem 0.8rem",
                              fontSize: "0.78rem"
                            }}
                            onClick={() => handleOpenUpload(lic)}
                          >
                            <Upload style={{ width: 14, height: 14 }} />
                            <span>Upload License Copy</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. Pillars & Mandate Info Cards - identical to renewallicense.jsx */}
          <div className="renewal-pillar-grid" style={{ marginTop: "2rem" }}>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">Fire Safety & Structural NOC</h4>
              <p className="renewal-pillar-desc">
                Premises must hold an active safety clearance certificate issued by the Delhi Fire Service or local municipal jurisdiction.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">Pollution & Trade Clearances</h4>
              <p className="renewal-pillar-desc">
                Valid Consent to Operate (CTO) issued by the DPCC and active FSSAI central regulatory licenses for wholesale premises.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Signed License Endorsement</h4>
              <p className="renewal-pillar-desc">
                A clear scanned copy of the physically or digitally signed excise license document for the relevant financial assessment year.
              </p>
            </div>
          </div>

          {/* Grievance / Assistance Banner - identical to renewallicense.jsx */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Need Guidance with Statutory Document Revalidation?</h4>
              <p className="renewal-assistance-desc">
                Access the Government of NCT of Delhi Excise Helpdesk for compliance clarifications or document verification escalation.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => alert("Delhi Excise IT Helpdesk: Contact 011-23370258 | Email: excise-help@delhi.gov.in")}
            >
              <HelpCircle style={{ width: 15, height: 15 }} />
              <span>Excise Document Helpdesk</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: DOCUMENT REVALIDATION CHECKLIST MODAL (renewal-modal styled)
          ========================================================================= */}
      {activeRevalModal && (
        <div className="renewal-modal-overlay" onClick={() => setActiveRevalModal(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="renewal-modal-header">
              <div className="renewal-modal-title">
                <FileCheck style={{ width: 20, height: 20, color: "#0284c7" }} />
                <span>Statutory Clearance Revalidation</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                onClick={() => setActiveRevalModal(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Licence No:</span>
                <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#0369a1" }}>
                  {activeRevalModal.licenseNo}
                </span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Site Name:</span>
                <span className="renewal-summary-val">{activeRevalModal.siteName}</span>
              </div>
              <div className="renewal-summary-row">
                <span className="renewal-summary-label">Licensing Financial Year:</span>
                <span className="renewal-summary-val">{activeRevalModal.finYear}</span>
              </div>
            </div>

            <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0 0 1rem 0" }}>
              The following statutory compliance certificates require annual verification. Re-upload expired or amended clearances to maintain valid licensing status.
            </p>

            {/* Checklist Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "320px", overflowY: "auto", paddingRight: "4px" }}>
              {activeRevalModal.documents.map((doc) => {
                const isValidated = doc.status === "Validated";
                return (
                  <div
                    key={doc.id}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: isValidated ? "#bbf7d0" : "#fed7aa",
                      backgroundColor: isValidated ? "#f0fdf4" : "#fffbeb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          backgroundColor: isValidated ? "#dcfce7" : "#fef3c7",
                          color: isValidated ? "#166534" : "#b45309",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        <FileText style={{ width: "16px", height: "16px" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#012a52" }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                          Type: {doc.type} • Valid Till: <strong style={{ color: isValidated ? "#166534" : "#b45309" }}>{doc.validTill}</strong>
                        </div>
                        {doc.fileName && (
                          <div style={{ fontSize: "0.7rem", color: "#475569", marginTop: "2px" }}>
                            File: {doc.fileName} ({doc.fileSize})
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {isValidated ? (
                        <span className="renewal-badge emerald" style={{ fontSize: "0.7rem" }}>
                          ✓ Validated
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="renewal-btn-primary"
                          style={{ padding: "4px 10px", fontSize: "0.75rem", backgroundColor: "#0284c7" }}
                          onClick={() => handleReuploadDocItem(doc.id)}
                        >
                          <Upload style={{ width: "12px", height: "12px" }} />
                          <span>Re-upload</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="renewal-modal-footer">
              <button
                type="button"
                className="renewal-btn-outline"
                onClick={() => setActiveRevalModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={handleSubmitRevalidation}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting to Excise DA..." : "Submit Revalidation Package"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: UPLOAD LICENSE COPY MODAL (renewal-modal styled)
          ========================================================================= */}
      {activeUploadModal && (
        <div className="renewal-modal-overlay" onClick={() => setActiveUploadModal(null)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "560px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="renewal-modal-header">
              <div className="renewal-modal-title">
                <Upload style={{ width: 20, height: 20, color: "#0284c7" }} />
                <span>Upload Signed License Copy</span>
              </div>
              <button
                type="button"
                className="renewal-modal-close"
                onClick={() => setActiveUploadModal(null)}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <form onSubmit={handleSubmitLicenseCopy}>
              <div style={{ marginBottom: "1.25rem" }}>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Licence No:</span>
                  <span className="renewal-summary-val" style={{ fontFamily: "monospace", color: "#0369a1" }}>
                    {activeUploadModal.licenseNo}
                  </span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Establishment:</span>
                  <span className="renewal-summary-val">{activeUploadModal.siteName}</span>
                </div>
              </div>

              {/* Upload Drop Area */}
              <div
                style={{
                  border: "2px dashed #cbd5e1",
                  borderRadius: "8px",
                  padding: "1.75rem 1.25rem",
                  textAlign: "center",
                  backgroundColor: "#f8fafc",
                  cursor: "pointer",
                  marginBottom: "1.25rem",
                  transition: "border-color 0.2s, background-color 0.2s"
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".pdf,.jpg,.jpeg,.png";
                  input.onchange = (ev) => {
                    if (ev.target.files && ev.target.files[0]) {
                      setSelectedFile(ev.target.files[0]);
                    }
                  };
                  input.click();
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px auto"
                  }}
                >
                  <Upload style={{ width: 22, height: 22 }} />
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#012a52" }}>
                  {selectedFile ? selectedFile.name : "Click to select or drag & drop signed license PDF"}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Accepted Formats: PDF, JPG, PNG (Max Size: 10MB). Ensure signature & excise stamp are clear.
                </p>
              </div>

              <div className="renewal-form-group" style={{ marginBottom: "1rem" }}>
                <label className="renewal-label" style={{ marginBottom: "0.35rem" }}>
                  Endorsement Validity Date
                </label>
                <input
                  type="date"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  className="renewal-select"
                />
              </div>

              <div className="renewal-form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="renewal-label" style={{ marginBottom: "0.35rem" }}>
                  Remarks / Notes for Excise Officer
                </label>
                <textarea
                  rows={3}
                  value={uploadRemarks}
                  onChange={(e) => setUploadRemarks(e.target.value)}
                  placeholder="e.g. Duly signed renewal copy along with official treasury challan receipt..."
                  className="renewal-select"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="renewal-modal-footer">
                <button
                  type="button"
                  className="renewal-btn-outline"
                  onClick={() => setActiveUploadModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="renewal-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading Document..." : "Upload & Save Endorsement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
