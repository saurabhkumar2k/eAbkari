import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Printer,
  X,
  Edit2,
  Save,
  Building,
  Building2,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Award,
  Sparkles,
  FileCheck,
  User,
  ShieldAlert,
  FileBadge,
  Cpu,
  Layers
} from "lucide-react";

export default function ChangeDirector({
  licenses = [],
  profile = {},
  onBackToTransfer = () => {},
  onNavigateToHome = () => {},
  showToast = () => {},
  onSubmitSuccess = () => {}
}) {
  // IP Address from screenshot
  const ipAddress = "10.128.68.93";

  // Editable / Display state matching the exact values and fields from the screenshot
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    firstName: "MANISH",
    lastName: "MALIK",
    fatherHusbandName: "LACHMI NARAIN MALIK",
    occupation: "business",
    panNo: "AA******5E",
    dateOfBirth: "01/01/1980",
    gender: "Male",
    addressLine1: "HOUSE NO. 8, SOUTH PATEL NAGAR, NEW DELHI",
    addressLine2: "",
    stateUT: "Delhi",
    district: "West",
    subDivision: "Patel Nagar",
    pin: "110008",
    mobile: "9811671185",
    landLine: "",
    email: "Santoshpillai@mohanmakin.com",
    convicted: "No"
  });

  // Photo & Signature previews or fallback
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  // State for show licenses toggle (default matching the screenshot: "No License data found.")
  const [showLiveLicenses, setShowLiveLicenses] = useState(false);

  // Success Modal State
  const [submissionModal, setSubmissionModal] = useState(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const txId = `DIR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const submissionData = {
      txId,
      applicantName: `${details.firstName} ${details.lastName}`,
      pan: details.panNo,
      date: new Date().toLocaleDateString("en-GB"),
      licId: licenses[0]?.id || "ND-25-L10023",
      category: "change-director",
      type: "Director Details Amendment",
      newEntity: `${details.firstName} ${details.lastName} (Director)`,
      dinPan: `${details.panNo} / DIR-AMEND`,
      status: "Under Scrutiny",
      scrutinyDesk: "Corporate Directorship Cell, GNCTD",
      remarks: "Directorship amendment filed for all active registered licenses",
      fee: "₹ 5,000"
    };

    setSubmissionModal(submissionData);

    if (onSubmitSuccess) {
      onSubmitSuccess(submissionData);
    }

    if (showToast) {
      showToast(`Director change request ${txId} submitted successfully!`, "success");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      if (showToast) showToast("Photo uploaded successfully", "info");
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSignaturePreview(url);
      if (showToast) showToast("Signature uploaded successfully", "info");
    }
  };

  return (
    <div className="cdd-page-wrapper">
      {/* 1. Breadcrumb Bar */}
      <div className="cdd-breadcrumb-bar">
        <div className="cdd-container">
          <div className="cdd-breadcrumb-inner">
            <div className="cdd-breadcrumb">
              <button type="button" className="cdd-breadcrumb-link" onClick={onNavigateToHome}>
                Dashboard
              </button>
              <span>/</span>
              <button type="button" className="cdd-breadcrumb-link" onClick={onBackToTransfer}>
                License Transfer
              </button>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Change Director (Applicant) Details</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <div className="cdd-emblem-badge">
                <span className="cdd-emblem-dot"></span>
                <span>Government of NCT of Delhi • eAbkari Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cdd-container">
        {/* 2. Hero Section */}
        <div className="cdd-hero-section">
          <div className="cdd-badge-inline">
            <span>Official Portal</span>
            <span>•</span>
            <span>Amendment of Directorship & Authorized Signatories 2025–2026</span>
          </div>
          <h1 className="cdd-hero-title">Change Director (Applicant) Details</h1>
          <p className="cdd-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • Government of NCT of Delhi
          </p>
          <div className="cdd-hero-tagline-box">
            <p className="cdd-hero-tagline">
              "In case of multiple Licenses, the Director details will be changed for all active registered Licenses. For transferring selective License(s) to new registered Applicant, please use 'License Transfer &rarr; Transfer License to New Applicant' link from Menu bar! The application is subject to the approval of competent authority!"
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="cdd-stats-grid">
          <div className="cdd-stat-card">
            <div className="cdd-stat-icon-wrap blue">
              <UserCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="cdd-stat-number">{details.firstName} {details.lastName}</div>
              <div className="cdd-stat-label">Active Applicant Director</div>
            </div>
          </div>

          <div className="cdd-stat-card">
            <div className="cdd-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="cdd-stat-number">
                {licenses.length > 0 ? `${licenses.length} Active Licenses` : "Registered Licenses"}
              </div>
              <div className="cdd-stat-label">Statutory License Scope</div>
              <div className="cdd-stat-note">Amendment applies across all registered units</div>
            </div>
          </div>

          <div className="cdd-stat-card">
            <div className="cdd-stat-icon-wrap amber">
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="cdd-stat-number">Corporate Directorship Cell</div>
              <div className="cdd-stat-label">Competent Authority Desk</div>
              <div className="cdd-stat-note">Excise Commissionerate, GNCTD</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card */}
        <div className="cdd-main-card">
          {/* ============================================================
              1. BASIC DETAILS SECTION (Website Style)
              ============================================================ */}
          <div className="cdd-basic-details-wrapper">
            {/* Enhanced Basic Details Header Bar */}
            <div className="cdd-section-header">
              <div className="cdd-section-header-title">
                <User style={{ width: 18, height: 18, color: "#93c5fd" }} />
                <span>Basic Details</span>
              </div>
              <div className="cdd-section-header-badge">
                <CheckCircle2 style={{ width: 12, height: 12, color: "#4ade80" }} />
                <span>Verified Demographic Record</span>
              </div>
            </div>

            {/* 4-Column Grid Table */}
            <div className="cdd-details-card">
              <table className="cdd-table">
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <tbody>
                  {/* ROW 1: Headers */}
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Father/Husband Name</th>
                    <th>Occupation</th>
                  </tr>
                  {/* ROW 1: Values */}
                  <tr>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.firstName}
                          onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.firstName
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.lastName}
                          onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.lastName
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.fatherHusbandName}
                          onChange={(e) => setDetails({ ...details, fatherHusbandName: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.fatherHusbandName
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.occupation}
                          onChange={(e) => setDetails({ ...details, occupation: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.occupation
                      )}
                    </td>
                  </tr>

                  {/* ROW 2: Headers */}
                  <tr>
                    <th>PAN No.</th>
                    <th>Date Of Birth</th>
                    <th>Gender</th>
                    <th>AddressLine 1</th>
                  </tr>
                  {/* ROW 2: Values */}
                  <tr>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.panNo}
                          onChange={(e) => setDetails({ ...details, panNo: e.target.value.toUpperCase() })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.panNo
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.dateOfBirth}
                          onChange={(e) => setDetails({ ...details, dateOfBirth: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.dateOfBirth
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          value={details.gender}
                          onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        details.gender
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.addressLine1}
                          onChange={(e) => setDetails({ ...details, addressLine1: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.addressLine1
                      )}
                    </td>
                  </tr>

                  {/* ROW 3: Headers */}
                  <tr>
                    <th>Address Line2</th>
                    <th>StateUT</th>
                    <th>District</th>
                    <th>Sub-division</th>
                  </tr>
                  {/* ROW 3: Values */}
                  <tr>
                    <td className={details.addressLine2 ? "" : "empty-cell"}>
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                          value={details.addressLine2}
                          onChange={(e) => setDetails({ ...details, addressLine2: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.addressLine2 || "—"
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.stateUT}
                          onChange={(e) => setDetails({ ...details, stateUT: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.stateUT
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.district}
                          onChange={(e) => setDetails({ ...details, district: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.district
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.subDivision}
                          onChange={(e) => setDetails({ ...details, subDivision: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.subDivision
                      )}
                    </td>
                  </tr>

                  {/* ROW 4: Headers */}
                  <tr>
                    <th>PIN</th>
                    <th>Mobile</th>
                    <th>LandLine</th>
                    <th>Email</th>
                  </tr>
                  {/* ROW 4: Values */}
                  <tr>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={details.pin}
                          onChange={(e) => setDetails({ ...details, pin: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.pin
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={details.mobile}
                          onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.mobile
                      )}
                    </td>
                    <td className={details.landLine ? "" : "empty-cell"}>
                      {isEditing ? (
                        <input
                          type="tel"
                          placeholder="Landline (Optional)"
                          value={details.landLine}
                          onChange={(e) => setDetails({ ...details, landLine: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.landLine || "—"
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="email"
                          value={details.email}
                          onChange={(e) => setDetails({ ...details, email: e.target.value })}
                          style={{ width: "100%", padding: "6px 10px", border: "1px solid #94a3b8", borderRadius: "6px" }}
                        />
                      ) : (
                        details.email
                      )}
                    </td>
                  </tr>

                  {/* ROW 5: Conviction Question (Header across all 4 columns) */}
                  <tr className="cdd-conviction-row">
                    <th colSpan={4}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <ShieldAlert style={{ width: 16, height: 16, color: "#d97706", shrink: 0 }} />
                        <span>Has the Applicant ever been Convicted of any Offence Punishable under Delhi Excise Act, as was Previously Applicable to Delhi</span>
                      </div>
                    </th>
                  </tr>
                  {/* ROW 5: Value */}
                  <tr>
                    <td colSpan={4}>
                      {isEditing ? (
                        <select
                          value={details.convicted}
                          onChange={(e) => setDetails({ ...details, convicted: e.target.value })}
                          style={{ padding: "6px 14px", border: "1px solid #94a3b8", borderRadius: "6px", fontWeight: 700 }}
                        >
                          <option value="No">No (Clear Record)</option>
                          <option value="Yes">Yes (Convicted)</option>
                        </select>
                      ) : (
                        <div className="cdd-conviction-badge clear">
                          <CheckCircle2 style={{ width: 14, height: 14, color: "#166534" }} />
                          <span>No prior excise offences recorded in NCT Delhi</span>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* ROW 6: Photo & Signature Headers (2 columns each) */}
                  <tr>
                    <th colSpan={2}>Photo</th>
                    <th colSpan={2}>Signature</th>
                  </tr>
                  {/* ROW 6: Photo & Signature Preview / Fallback matching website card */}
                  <tr>
                    <td colSpan={2}>
                      <div className="cdd-media-container">
                        {photoPreview ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img
                              src={photoPreview}
                              alt="Director Photo"
                              style={{ width: "76px", height: "76px", objectFit: "cover", borderRadius: "8px", border: "1.5px solid #0284c7" }}
                            />
                            <div>
                              <div className="cdd-media-badge">Uploaded</div>
                              {isEditing && (
                                <label style={{ display: "block", marginTop: "4px", fontSize: "0.72rem", color: "#0284c7", cursor: "pointer", textDecoration: "underline" }}>
                                  Replace Photo
                                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                                </label>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div className="cdd-media-frame">
                              <User style={{ width: 28, height: 28, color: "#94a3b8" }} />
                              <span className="cdd-media-label">Photo</span>
                            </div>
                            <div>
                              <div className="cdd-media-badge">Official Record</div>
                              {isEditing && (
                                <label style={{ display: "block", marginTop: "6px", fontSize: "0.72rem", color: "#0284c7", cursor: "pointer", textDecoration: "underline", fontWeight: 700 }}>
                                  Upload Photo
                                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td colSpan={2}>
                      <div className="cdd-media-container">
                        {signaturePreview ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img
                              src={signaturePreview}
                              alt="Director Signature"
                              style={{ height: "48px", maxWidth: "160px", objectFit: "contain", borderRadius: "6px", border: "1.5px solid #0284c7", backgroundColor: "#f8fafc", padding: "4px" }}
                            />
                            <div>
                              <div className="cdd-media-badge">Uploaded</div>
                              {isEditing && (
                                <label style={{ display: "block", marginTop: "4px", fontSize: "0.72rem", color: "#0284c7", cursor: "pointer", textDecoration: "underline" }}>
                                  Replace Signature
                                  <input type="file" accept="image/*" onChange={handleSignatureUpload} style={{ display: "none" }} />
                                </label>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div className="cdd-media-sig-frame">
                              <span style={{ fontSize: "1.1rem", fontFamily: "cursive", color: "#64748b" }}>M. Malik</span>
                              <span className="cdd-media-label">Signature</span>
                            </div>
                            <div>
                              <div className="cdd-media-badge">Digital Signature</div>
                              {isEditing && (
                                <label style={{ display: "block", marginTop: "6px", fontSize: "0.72rem", color: "#0284c7", cursor: "pointer", textDecoration: "underline", fontWeight: 700 }}>
                                  Upload Signature
                                  <input type="file" accept="image/*" onChange={handleSignatureUpload} style={{ display: "none" }} />
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================
              2. REGISTERED LICENSES SECTION (Website Style)
              ============================================================ */}
          <div className="cdd-licenses-section">
            <div className="cdd-licenses-header-row">
              <div className="cdd-licenses-title-group">
                <div className="cdd-licenses-icon-wrap">
                  <Award style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <h3 className="cdd-licenses-title">Registered Licenses</h3>
                  <p className="cdd-licenses-subtitle">
                    Active excise licenses and establishments registered under the applicant directorship
                  </p>
                </div>
              </div>

              {licenses.length > 0 && (
                <button
                  type="button"
                  className="cdd-btn-outline"
                  onClick={() => setShowLiveLicenses(!showLiveLicenses)}
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.85rem" }}
                >
                  <Layers style={{ width: 13, height: 13 }} />
                  <span>{showLiveLicenses ? "Licenses Require Directory Change" : `Show ${licenses.length} Live Licenses`}</span>
                </button>
              )}
            </div>

            {/* License Card Box */}
            <div className="cdd-license-card-box">
              {showLiveLicenses && licenses.length > 0 ? (
                <div>
                  <table className="cdd-active-lic-table">
                    <thead>
                      <tr>
                        <th>License ID</th>
                        <th>Type / Category</th>
                        <th>Premise Location</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {licenses.map((lic) => (
                        <tr key={lic.id}>
                          <td style={{ fontWeight: 700, color: "#012a52", fontFamily: "ui-monospace, monospace" }}>
                            {lic.id}
                          </td>
                          <td style={{ fontWeight: 600 }}>{lic.type}</td>
                          <td>{lic.location || "Delhi NCT Logistics Hub"}</td>
                          <td>
                            <span className="cdd-lic-status-badge">
                              <CheckCircle2 style={{ width: 11, height: 11 }} />
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="cdd-empty-license-state">
                  <div className="cdd-empty-icon-wrap">
                    <FileBadge style={{ width: 26, height: 26 }} />
                  </div>
                  <p className="cdd-no-license-text">No License data found.</p>
                  <p className="cdd-no-license-sub">
                    There are currently no active registered excise licenses linked directly to this applicant ID. Changes will automatically apply when new licenses are issued.
                  </p>
                </div>
              )}
            </div>

            {/* Statutory Advisory Notice Box (Website Alert Banner) */}
            <div className="cdd-notice-box">
              <div className="cdd-notice-icon-box">
                <AlertTriangle style={{ width: 20, height: 20 }} />
              </div>
              <div className="cdd-notice-content">
                <h4 className="cdd-notice-heading">Statutory Directorship Amendment Advisory</h4>
                <p className="cdd-notice-text">
                  In case of multiple Licenses, the Director details will be changed for all active registered Licenses. For transferring selective License(s) to new registered Applicant, please use 'License Transfer &rarr; Transfer License to New Applicant' link from Menu bar! The application is subject to the approval of competent authority!
                </p>
              </div>
            </div>

            {/* ============================================================
                3. SUBMIT CSS (Website Primary Action Button)
                ============================================================ */}
            <div className="cdd-submit-container">
              <div className="cdd-submit-btn-row">
                <button
                  type="button"
                  className="cdd-submit-btn"
                  onClick={handleSubmit}
                >
                  <FileCheck style={{ width: 18, height: 18 }} />
                  <span>Submit Director Amendment Petition</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
