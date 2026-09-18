import React, { useState } from "react";
import {
  ChevronDown,
  Calendar,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Clock,
  ExternalLink,
  X,
  CreditCard,
  Building2,
  FileCheck,
  ArrowRight,
  HelpCircle,
  FileText,
  Search,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";

export default function RenewalLicense({
  userLicenses = [],
  onRenewLicense = () => {},
  onNavigateToHome = () => {}
}) {
  const [licensingYear, setLicensingYear] = useState("2026-2027");
  const [selectedLicenseForRenewal, setSelectedLicenseForRenewal] = useState(null);
  const [renewedIds, setRenewedIds] = useState({});
  const [showDemoToggle, setShowDemoToggle] = useState(false);

  // Sample records to test the complete renewal flow
  const demoLicenses = [
    {
      id: "ND-25-L10023",
      type: "L-1 Wholesale Vend of Foreign Liquor (IMFL)",
      location: "Okhla Wholesale Logistics Park, South Delhi",
      validTill: "31st March 2026",
      fee: "₹ 45,000",
      status: "Active",
      year: "2026-2027"
    },
    {
      id: "ND-25-L22099",
      type: "L-15 Hotel & Club Bar License",
      location: "Connaught Place Heritage Suite, Central Delhi",
      validTill: "31st March 2026",
      fee: "₹ 75,000",
      status: "Active",
      year: "2026-2027"
    }
  ];

  const activeSource = showDemoToggle ? demoLicenses : userLicenses;

  const filteredLicenses = activeSource.filter(
    (lic) =>
      lic.year === licensingYear || (!lic.year && licensingYear === "2026-2027")
  );

  const handleOpenConfirm = (lic) => {
    setSelectedLicenseForRenewal(lic);
  };

  const handleConfirmRenewal = () => {
    if (selectedLicenseForRenewal) {
      setRenewedIds((prev) => ({
        ...prev,
        [selectedLicenseForRenewal.id]: true
      }));
      onRenewLicense(selectedLicenseForRenewal.id);
      setSelectedLicenseForRenewal(null);
    }
  };

  return (
    <div className="renewal-page-wrapper">
      {/* 1. Breadcrumb Bar - identical to about.css pattern */}
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
              <span>Licensing Wing</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Renewal of Licenses</strong>
            </div>

            <div className="renewal-emblem-badge">
              <span className="renewal-emblem-dot"></span>
              <span>Government of NCT of Delhi • eAbkari Portal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="renewal-page-container">
        {/* 2. Hero Section - identical to about-hero-section in about.css */}
        <div className="renewal-hero-section">
          <div className="renewal-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Annual Licensing Cycle 2026–27</span>
          </div>

          <h1 className="renewal-hero-title">Renewal of Licenses</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>

          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Ensuring statutory clearance, timely annual duty compliance, and seamless operational extension for registered wholesale and retail establishments across the National Capital Territory of Delhi."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip - identical to about-stat-card in about.css */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Calendar style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">{licensingYear}</div>
              <div className="renewal-stat-label">Active Licensing Year</div>
              <div className="renewal-stat-note">Excise Policy FY Period</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap amber">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">Open</div>
              <div className="renewal-stat-label">Submission Window</div>
              <div className="renewal-stat-note">Open till 31st March</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number">100% Online</div>
              <div className="renewal-stat-label">eAbkari Duty Settlement</div>
              <div className="renewal-stat-note">Instant e-Challan Endorsement</div>
            </div>
          </div>
        </div>

        {/* 4. Section Card - identical to about-section-card highlight-card in about.css */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">License Renewal Application</h2>
              <p className="renewal-section-subtitle">
                Select the targeted licensing period to review registered premises and process fee clearance
              </p>
            </div>
          </div>

          <div className="renewal-form-group">
            <div className="renewal-label-row">
              <label htmlFor="licensingYearSelect" className="renewal-label">
                <Calendar style={{ width: 16, height: 16, color: "#0284c7" }} />
                <span>Renewal Applied for the Licensing Year</span>
              </label>
              <span className="renewal-badge-count">
                {filteredLicenses.length} License{filteredLicenses.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="renewal-select-wrapper">
              <select
                id="licensingYearSelect"
                value={licensingYear}
                onChange={(e) => setLicensingYear(e.target.value)}
                className="renewal-select"
              >
                <option value="2026-2027">2026-2027 (Active Licensing Period)</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2027-2028">2027-2028 (Upcoming Cycle)</option>
              </select>
              <ChevronDown className="renewal-select-icon" />
            </div>
          </div>

          {/* Conditional Notice Box: Beautified Canvas with Guidance Cards */}
          {filteredLicenses.length === 0 ? (
            <div className="renewal-empty-canvas">
              {/* Central Glowing Shield Icon */}
              <div className="renewal-empty-centerpiece">
                <div className="renewal-empty-icon-shield">
                  <FileText style={{ width: 34, height: 34 }} />
                </div>
                <div className="renewal-empty-badge-float">
                  <AlertCircle style={{ width: 15, height: 15 }} />
                </div>
              </div>

              {/* Status Tag */}
              <div className="renewal-empty-status-tag">
                <span className="renewal-emblem-dot" style={{ backgroundColor: "#f59e0b" }}></span>
                <span>Excise Register Status: Clean Query</span>
              </div>

              {/* Main Headline & Description */}
              <h3 className="renewal-empty-title">No License data found for {licensingYear}</h3>
              <p className="renewal-empty-desc">
                There are currently no active excise licences recorded under your authenticated profile for FY {licensingYear}. You can preview sample licensed premises below or contact the Excise IT wing to link legacy offline permits.
              </p>

              {/* Action Buttons */}
              <div className="renewal-empty-actions">
                <button
                  type="button"
                  className="renewal-empty-sample-btn"
                  onClick={() => setShowDemoToggle(true)}
                >
                  <Sparkles style={{ width: 15, height: 15 }} />
                  <span>Preview Previous Licenses & Renew</span>
                </button>
              </div>

              {/* Helpful Guidance Cards in the Empty Space */}
              <div className="renewal-empty-hints-grid">
                <div className="renewal-empty-hint-card">
                  <div className="renewal-empty-hint-header">
                    <Calendar style={{ width: 14, height: 14, color: "#0284c7" }} />
                    <span>Check Licensing Cycle</span>
                  </div>
                  <p className="renewal-empty-hint-desc">
                    Confirm if your establishment was registered under an alternative financial period using the dropdown above.
                  </p>
                </div>

                <div className="renewal-empty-hint-card">
                  <div className="renewal-empty-hint-header">
                    <ShieldCheck style={{ width: 14, height: 14, color: "#059669" }} />
                    <span>Pre-requisite Clearances</span>
                  </div>
                  <p className="renewal-empty-hint-desc">
                    Ensure Fire Safety NOC, DPCC Consent, and valid Premise Lease Deed are uploaded for fast-track processing.
                  </p>
                </div>

                <div className="renewal-empty-hint-card">
                  <div className="renewal-empty-hint-header">
                    <CreditCard style={{ width: 14, height: 14, color: "#d97706" }} />
                    <span>e-Challan Integration</span>
                  </div>
                  <p className="renewal-empty-hint-desc">
                    Renewal fees are deposited directly to Delhi Government PAO via Bharatkosh and state cyber treasury gateway.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="renewal-table-wrapper">
                <table className="renewal-table">
                  <thead>
                    <tr>
                      <th>License ID</th>
                      <th>Category & Type</th>
                      <th>Registered Premise</th>
                      <th>Current Validity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLicenses.map((lic) => {
                      const isRenewed = renewedIds[lic.id] || lic.status === "Renewed";
                      return (
                        <tr key={lic.id}>
                          <td>
                            <span className="renewal-lic-id-tag">{lic.id}</span>
                          </td>
                          <td>
                            <strong style={{ color: "#012a52" }}>{lic.type}</strong>
                          </td>
                          <td>{lic.location || "N/A"}</td>
                          <td>{lic.validTill || "31st March 2026"}</td>
                          <td>
                            <span
                              className={`renewal-badge ${
                                isRenewed ? "blue" : "emerald"
                              }`}
                            >
                              {isRenewed ? "Renewed (FY 26-27)" : "Active"}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenConfirm(lic)}
                              disabled={isRenewed}
                              className={`renewal-btn-primary ${
                                isRenewed ? "renewal-btn-disabled" : ""
                              }`}
                            >
                              <RefreshCw style={{ width: 13, height: 13 }} />
                              <span>{isRenewed ? "Fee Cleared" : "Pay & Renew"}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="renewal-btn-outline"
                  onClick={() => setShowDemoToggle(false)}
                >
                  Clear Sample Records
                </button>
              </div>
            </div>
          )}

          {/* 5. Pillars & Regulatory Mandate (matches about-pillar-card in about.css) */}
          <div className="renewal-pillar-grid">
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">Duty Assessment</h4>
              <p className="renewal-pillar-desc">
                Complete all reconciliation of quarterly license fees and excise tax assessment reports.
              </p>
            </div>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">NOC Clearances</h4>
              <p className="renewal-pillar-desc">
                Ensure validity of Fire Safety NOC and Municipal Corporation Trade Licenses for the premises.
              </p>
            </div>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Digital Endorsement</h4>
              <p className="renewal-pillar-desc">
                Immediate generation of QR-enabled digital renewal certificate upon fee clearance.
              </p>
            </div>
          </div>

          {/* Assistance Banner (matches about-grievance-banner in about.css) */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">
                Need Assistance with Legacy License Register?
              </h4>
              <p className="renewal-assistance-desc">
                For older licences not listed under your digital account, connect with the Excise IT Helpdesk.
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-primary"
              onClick={() => alert("Excise IT Helpdesk: Contact 011-23370258 / support-eabkari@delhi.gov.in")}
            >
              <span>Contact Helpdesk</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

        {/* Renewal Confirmation Modal */}
        {selectedLicenseForRenewal && (
          <div className="renewal-modal-overlay">
            <div className="renewal-modal">
              <div className="renewal-modal-header">
                <h3 className="renewal-modal-title">
                  <CreditCard style={{ width: 20, height: 20, color: "#012a52" }} />
                  <span>Confirm License Renewal</span>
                </h3>
                <button
                  type="button"
                  className="renewal-modal-close"
                  onClick={() => setSelectedLicenseForRenewal(null)}
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              <div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">License Number:</span>
                  <span className="renewal-summary-val">{selectedLicenseForRenewal.id}</span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">License Category:</span>
                  <span className="renewal-summary-val">{selectedLicenseForRenewal.type}</span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Renewal Year:</span>
                  <span className="renewal-summary-val">{licensingYear}</span>
                </div>
                <div className="renewal-summary-row">
                  <span className="renewal-summary-label">Prescribed Annual Fee:</span>
                  <span className="renewal-summary-val">{selectedLicenseForRenewal.fee || "₹ 45,000"}</span>
                </div>

                <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>
                  By confirming, you certify that premise compliance certificates and annual excise returns are in good standing as per Delhi Excise Rules.
                </p>
              </div>

              <div className="renewal-modal-footer">
                <button
                  type="button"
                  className="renewal-btn-outline"
                  onClick={() => setSelectedLicenseForRenewal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="renewal-btn-primary"
                  onClick={handleConfirmRenewal}
                >
                  <span>Confirm & Remit Fee</span>
                  <FileCheck style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
