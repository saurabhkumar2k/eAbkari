import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  FileCheck,
  CheckCircle2,
  Clock,
  Eye,
  Printer,
  X,
  ClipboardList,
  Users,
  ArrowRightLeft,
  FileText,
  Shield,
  Layers,
  Sparkles,
  Download,
  Building2,
  Award
} from "lucide-react";

export default function ViewApplication({
  applications = [],
  onBackToTransfer = () => {},
  onNavigateToChangeDirector = () => {},
  onNavigateToTransferLicense = () => {},
  onNavigateToHome = () => {},
  showToast = () => {}
}) {
  const [searchLedger, setSearchLedger] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [activeDossierModal, setActiveDossierModal] = useState(null);

  // Filtered Applications for "View Application"
  const filteredLedger = useMemo(() => {
    return applications.filter((app) => {
      const q = searchLedger.trim().toLowerCase();
      const matchesSearch =
        !q ||
        app.id.toLowerCase().includes(q) ||
        app.licId.toLowerCase().includes(q) ||
        app.type.toLowerCase().includes(q) ||
        app.newEntity.toLowerCase().includes(q) ||
        app.authorizedPerson.toLowerCase().includes(q) ||
        app.remarks.toLowerCase().includes(q);

      const matchesType =
        filterType === "ALL" ||
        (filterType === "change-director" && app.category === "change-director") ||
        (filterType === "transfer-license" && app.category === "transfer-license");

      const matchesStatus =
        filterStatus === "ALL" ||
        (filterStatus === "Approved" && app.status === "Approved") ||
        (filterStatus === "Under Scrutiny" && app.status !== "Approved");

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [applications, searchLedger, filterType, filterStatus]);

  const totalCount = applications.length;
  const approvedCount = applications.filter((a) => a.status === "Approved").length;
  const underScrutinyCount = applications.filter((a) => a.status !== "Approved").length;

  return (
    <div className="va-page-wrapper">
      {/* 1. Breadcrumb Bar */}
      <div className="va-breadcrumb-bar">
        <div className="va-container">
          <div className="va-breadcrumb-inner">
            <div className="va-breadcrumb">
              <button
                type="button"
                className="va-breadcrumb-link"
                onClick={onNavigateToHome}
              >
                Dashboard
              </button>
              <span>/</span>
              <button
                type="button"
                className="va-breadcrumb-link"
                onClick={onBackToTransfer}
              >
                License Transfer
              </button>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>View Applications Ledger</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <div className="va-emblem-badge">
                <span className="va-emblem-dot"></span>
                <span>Government of NCT of Delhi • eAbkari Core</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="va-container">
        {/* 2. Hero Section */}
        <div className="va-hero-section">
          <div className="va-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Real-Time Petitions & Audit Ledger 2025–2026</span>
          </div>
          <h1 className="va-hero-title">License Transfer & Directorship Applications Ledger</h1>
          <p className="va-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • Government of NCT of Delhi
          </p>
          <div className="va-hero-tagline-box">
            <p className="va-hero-tagline">
              "Track real-time statutory evaluations, character verification reports, field inspection audits, and final competent authority endorsements for all directorship amendments and license transfer petitions across NCT of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="va-stats-grid">
          <div className="va-stat-card">
            <div className="va-stat-icon-wrap blue">
              <ClipboardList style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="va-stat-number">{totalCount}</div>
              <div className="va-stat-label">Total Applications Filed</div>
              <div className="va-stat-note">Form TL-1 & Form TL-2 Petitions</div>
            </div>
          </div>

          <div className="va-stat-card">
            <div className="va-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="va-stat-number">{underScrutinyCount}</div>
              <div className="va-stat-label">Under Scrutiny / Verification</div>
              <div className="va-stat-note">Multi-Stage Statutory Appraisal</div>
            </div>
          </div>

          <div className="va-stat-card">
            <div className="va-stat-icon-wrap emerald">
              <CheckCircle2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="va-stat-number">{approvedCount}</div>
              <div className="va-stat-label">Approved & Endorsed</div>
              <div className="va-stat-note">Gazetted Endorsements Issued</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card */}
        <div className="va-main-card">
          {/* Card Header Row */}
          <div className="va-card-header">
            <div className="va-card-title-group">
              <div className="va-card-icon-box">
                <FileCheck style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <h2 className="va-card-title">Petitions & Applications Ledger</h2>
                <p className="va-card-subtitle">
                  Inspect scrutiny trails, officer audit remarks, verification milestones, and print official dossiers
                </p>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="va-filter-toolbar">
            <div className="va-search-input-wrapper">
              <Search className="va-search-icon" />
              <input
                type="text"
                placeholder="Search by Transaction ID, License Ref, Entity, Director Name, or Desk..."
                value={searchLedger}
                onChange={(e) => setSearchLedger(e.target.value)}
                className="va-search-input"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="va-select"
            >
              <option value="change-director">Change Director Details (Form TL-2)</option>
              <option value="transfer-license">Transfer License to New Applicant (Form TL-1)</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="va-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="Approved">Approved & Endorsed</option>
              <option value="Under Scrutiny">Under Scrutiny</option>
            </select>
          </div>

          {/* Table or Empty State */}
          {filteredLedger.length === 0 ? (
            <div className="va-empty-state">
              <div className="va-empty-icon-wrap">
                <FileText style={{ width: 26, height: 26 }} />
              </div>
              <h4 className="va-empty-title">No Transfer Applications Found</h4>
              <p className="va-empty-desc">
                No petitions match your active search filters. Try adjusting keywords or clearing category/status constraints.
              </p>
              <button
                type="button"
                className="va-btn-outline"
                style={{ marginTop: "0.5rem" }}
                onClick={() => {
                  setSearchLedger("");
                  setFilterType("ALL");
                  setFilterStatus("ALL");
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="va-table-wrapper">
              <table className="va-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: "140px" }}>Transaction ID</th>
                    <th style={{ minWidth: "125px" }}>License Ref</th>
                    <th style={{ minWidth: "185px" }}>Application Type</th>
                    <th style={{ minWidth: "220px" }}>Proposed Entity / Director</th>
                    <th style={{ minWidth: "105px" }}>Filing Date</th>
                    <th style={{ minWidth: "165px" }}>Scrutiny Stage</th>
                    <th style={{ minWidth: "200px" }}>Review Desk & Remarks</th>
                    <th style={{ minWidth: "125px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedger.map((app) => {
                    const isApproved = app.status === "Approved";
                    const isTL2 = app.category === "change-director";
                    return (
                      <tr key={app.id}>
                        {/* Transaction ID */}
                        <td>
                          <span style={{ fontFamily: "ui-monospace, monospace", fontWeight: 800, color: "#012a52", fontSize: "0.85rem" }}>
                            {app.id}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "2px" }}>
                            Fee: {app.fee}
                          </span>
                        </td>

                        {/* License Ref */}
                        <td>
                          <strong style={{ color: "#0f172a", fontFamily: "ui-monospace, monospace" }}>
                            {app.licId}
                          </strong>
                        </td>

                        {/* Application Type */}
                        <td>
                          <span style={{ fontWeight: 700, color: isTL2 ? "#b45309" : "#0369a1", display: "block" }}>
                            {app.type}
                          </span>
                          <span className={`va-category-tag ${isTL2 ? "tl2" : "tl1"}`}>
                            {isTL2 ? "Form TL-2" : "Form TL-1"}
                          </span>
                        </td>

                        {/* Proposed Entity / Person */}
                        <td>
                          <strong style={{ color: "#0f172a", display: "block", fontSize: "0.825rem" }}>
                            {app.newEntity}
                          </strong>
                          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                            Auth: {app.authorizedPerson}
                          </span>
                        </td>

                        {/* Filing Date */}
                        <td>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155" }}>
                            {app.submittedDate}
                          </span>
                        </td>

                        {/* Scrutiny Status */}
                        <td>
                          <span className={`va-status-badge ${isApproved ? "approved" : "scrutiny"}`}>
                            {isApproved ? (
                              <CheckCircle2 style={{ width: 12, height: 12 }} />
                            ) : (
                              <Clock style={{ width: 12, height: 12 }} />
                            )}
                            <span>{app.status}</span>
                          </span>

                          {/* 4 stage mini-progress meter */}
                          <div className="va-progress-grid">
                            {(app.stages || []).map((st, sIdx) => {
                              const isDone = st.status === "completed";
                              const isInProg = st.status === "in-progress";
                              return (
                                <div
                                  key={sIdx}
                                  className={`va-progress-seg ${isDone ? "done" : isInProg ? "in-prog" : "pending"}`}
                                  title={`${st.label}: ${st.status}`}
                                />
                              );
                            })}
                          </div>
                        </td>

                        {/* Review Desk & Remarks */}
                        <td>
                          <strong style={{ color: "#012a52", fontSize: "0.775rem", display: "block" }}>
                            {app.scrutinyDesk}
                          </strong>
                          <span style={{ fontSize: "0.715rem", color: "#64748b", fontStyle: "italic", display: "block", marginTop: "1px", lineHeight: "1.35" }}>
                            {app.remarks}
                          </span>
                        </td>

                        {/* Action Button */}
                        <td style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            className="va-btn-outline"
                            style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", width: "100%", justifyContent: "center" }}
                            onClick={() => setActiveDossierModal(app)}
                          >
                            <Eye style={{ width: 13, height: 13 }} />
                            <span>Dossier</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottom Actions Row */}
          <div className="va-bottom-actions">
           <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Showing {filteredLedger.length} of {applications.length} filed petitions
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          TECHNICAL DOSSIER & AUDIT TRAIL MODAL
          ============================================================ */}
      {activeDossierModal && (
        <div className="va-modal-overlay" onClick={() => setActiveDossierModal(null)}>
          <div className="va-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="va-modal-header">
              <div className="va-modal-title">
                <FileCheck style={{ width: 22, height: 22, color: "#38bdf8" }} />
                <span>Application Dossier — {activeDossierModal.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveDossierModal(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#ffffff" }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="va-modal-body">
              {/* Dossier Summary Grid */}
              <div className="va-dossier-grid">
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Petition Category:</span>
                  <strong style={{ color: "#012a52" }}>{activeDossierModal.type}</strong>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">License Reference:</span>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "#0f172a" }}>
                    {activeDossierModal.licId}
                  </span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Current Holder on Record:</span>
                  <span style={{ color: "#334155" }}>{activeDossierModal.currentEntity}</span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Proposed Transferee / Director:</span>
                  <strong style={{ color: "#0284c7" }}>{activeDossierModal.newEntity}</strong>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Authorized Signatory:</span>
                  <span>{activeDossierModal.authorizedPerson}</span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Identification DIN / PAN:</span>
                  <span style={{ fontFamily: "ui-monospace, monospace", color: "#0f172a" }}>
                    {activeDossierModal.dinPan}
                  </span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Scrutiny Desk:</span>
                  <span style={{ color: "#334155" }}>{activeDossierModal.scrutinyDesk}</span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Filing Date:</span>
                  <span>{activeDossierModal.submittedDate}</span>
                </div>
                <div className="va-dossier-row">
                  <span className="va-dossier-label">Statutory Processing Duty:</span>
                  <strong style={{ color: "#166534" }}>{activeDossierModal.fee} (Paid)</strong>
                </div>
              </div>

              {/* 4-Stage Scrutiny Audit Trail */}
              <div>
                <h4 style={{ margin: "0 0 0.65rem 0", fontSize: "0.85rem", color: "#012a52", fontWeight: 800 }}>
                  4-Stage Departmental Scrutiny Trail
                </h4>
                <div className="va-stages-list">
                  {(activeDossierModal.stages || []).map((stage, sIdx) => {
                    const isCompleted = stage.status === "completed";
                    const isInProgress = stage.status === "in-progress";
                    return (
                      <div
                        key={sIdx}
                        className={`va-stage-card ${isCompleted ? "completed" : isInProgress ? "in-progress" : "pending"}`}
                      >
                        <div>
                          <div className="va-stage-title">{stage.label}</div>
                          <div className="va-stage-meta">
                            Officer: {stage.officer} • Date: {stage.date}
                          </div>
                        </div>
                        <span
                          className={`va-status-badge ${isCompleted ? "approved" : "scrutiny"}`}
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 style={{ width: 11, height: 11 }} />
                          ) : (
                            <Clock style={{ width: 11, height: 11 }} />
                          )}
                          <span>{stage.status}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="va-modal-footer">
              <button
                type="button"
                className="va-btn-outline"
                onClick={() => setActiveDossierModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="va-btn-primary"
                onClick={() => {
                  if (showToast) {
                    showToast(`Printing Dossier for ${activeDossierModal.id}`, "info");
                  }
                }}
              >
                <Printer style={{ width: 14, height: 14 }} />
                <span>Print Dossier Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
