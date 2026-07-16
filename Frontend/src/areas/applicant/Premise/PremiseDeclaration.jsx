import React from "react";
import { ShieldCheck, FileText, AlertCircle } from "lucide-react";

export default function Step4Declaration({
  premiseName,
  premiseType,
  ownershipType,
  numHalls,
  addressLine1,
  addressLine2,
  stateName,
  district,
  pinCode,
  policeStation,
  ownerFirstName,
  ownerLastName,
  mobileNumber,
  emailId,
  panNumber,
  gstNumber,
  halls,
  uploadedDocs,
  agreedToTerms,
  setAgreedToTerms,
  agreedToInspect,
  setAgreedToInspect,
  agreedToTruth,
  setAgreedToTruth,
  signatureName,
  setSignatureName,
  handleFinalSubmit
}) {
  return (
    <form onSubmit={handleFinalSubmit} className="premise-card-body">
      <div className="premise-card-header">
        <div>
          <h3 className="premise-card-title-text">Step 4: Declarations and Final Submission</h3>
          <p className="premise-card-subtitle-text">Verify your compiled registration details and provide physical safety commitments to file the application.</p>
        </div>
      </div>

      {/* Compilation Summary Review */}
      <div className="premise-review-panel">
        <h4 className="premise-review-heading">
          <ShieldCheck className="premise-review-heading-icon" />
          Compiled Registration Summary Review
        </h4>

        <div className="premise-review-cards">
          
          {/* Basic info */}
          <div className="premise-review-card">
            <span className="premise-review-label">Premise Information</span>
            <p className="premise-review-main">{premiseName}</p>
            <p className="premise-review-detail"><strong>Type:</strong> {premiseType}</p>
            <p className="premise-review-detail"><strong>Ownership:</strong> {ownershipType}</p>
            <p className="premise-review-detail"><strong>Number of Halls:</strong> {numHalls}</p>
          </div>

          {/* Location Address */}
          <div className="premise-review-card">
            <span className="premise-review-label">Physical Location</span>
            <p className="premise-review-main" style={{ fontSize: "0.8125rem" }}>{addressLine1}</p>
            {addressLine2 && <p className="premise-review-detail">{addressLine2}</p>}
            <p className="premise-review-detail"><strong>State/District:</strong> {stateName} / {district}</p>
            <p className="premise-review-detail"><strong>PIN Code:</strong> {pinCode}</p>
            <p className="premise-review-detail"><strong>Jurisdiction PS:</strong> {policeStation}</p>
          </div>

          {/* Applicant Owner */}
          <div className="premise-review-card">
            <span className="premise-review-label">Applicant & Tax identifiers</span>
            <p className="premise-review-main">{ownerFirstName} {ownerLastName}</p>
            <p className="premise-review-detail"><strong>Mobile:</strong> +91 {mobileNumber}</p>
            <p className="premise-review-detail"><strong>Email:</strong> {emailId}</p>
            <p className="premise-review-detail"><strong>PAN ID:</strong> <span className="premise-input-mono">{panNumber}</span></p>
            {gstNumber && <p className="premise-review-detail"><strong>GSTIN:</strong> <span className="premise-input-mono">{gstNumber}</span></p>}
          </div>

        </div>

        {/* Halls Summary Table */}
        <div className="premise-table-container">
          <div className="premise-table-header">
            Registered Halls Dossier List
          </div>
          <table className="premise-table">
            <thead>
              <tr className="premise-table-tr-head">
                <th className="premise-table-th">#</th>
                <th className="premise-table-th">Hall / Room Custom Identifier</th>
                <th className="premise-table-th premise-table-td-center">Configured Capacity (Min-Max)</th>
                <th className="premise-table-th">Location Floor Level</th>
                <th className="premise-table-th premise-table-td-center">Air Conditioning Status</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((h, hIdx) => (
                <tr key={h.id} className="premise-table-tr-body">
                  <td className="premise-table-td premise-table-td-num">{hIdx + 1}</td>
                  <td className="premise-table-td premise-table-td-bold">{h.name || `Hall ${hIdx + 1}`}</td>
                  <td className="premise-table-td premise-table-td-center premise-table-td-mid">{h.minCapacity} - {h.maxCapacity} Persons</td>
                  <td className="premise-table-td premise-table-td-text">{h.floorLevel}</td>
                  <td className="premise-table-td premise-table-td-center">
                    <span className={h.hasAc ? "premise-badge-ac" : "premise-badge-nonac"}>
                      {h.hasAc ? "AC Active" : "Non-AC"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Uploaded Documents List */}
        <div className="premise-review-docs">
          <span className="premise-review-label">Verified Dossier Documents</span>
          <div className="premise-review-docs-list">
            {Object.entries(uploadedDocs).filter(([_, val]) => !!val).map(([key, file]) => (
              <div key={key} className="premise-review-doc-badge">
                <FileText className="premise-help-icon" />
                <span>{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="premise-review-doc-badge-bold">{file.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Compliance Checklist Statements */}
      <div className="premise-compliance-box">
        <h4 className="premise-compliance-title">
          <AlertCircle className="premise-help-icon" />
          Solemn Legal Affirmation declarations
        </h4>

        {/* Check 1 */}
        <label className="premise-compliance-row">
          <input
            type="checkbox"
            checked={agreedToTruth}
            onChange={(e) => setAgreedToTruth(e.target.checked)}
            className="premise-checkbox-input"
          />
          <span className="premise-compliance-text">
            I solemnly declare that the registered premise is situated safe from municipal distance conflicts and matches all physical dimensions described inside the step metrics.
          </span>
        </label>

        {/* Check 2 */}
        <label className="premise-compliance-row">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="premise-checkbox-input"
          />
          <span className="premise-compliance-text">
            I certify that all files, municipal health trade certificates, state fire NOC, and land deeds uploaded inside this dossier represent current, valid, and authentic copies.
          </span>
        </label>

        {/* Check 3 */}
        <label className="premise-compliance-row">
          <input
            type="checkbox"
            checked={agreedToInspect}
            onChange={(e) => setAgreedToInspect(e.target.checked)}
            className="premise-checkbox-input"
          />
          <span className="premise-compliance-text">
            I understand and authorize physical security layouts, door width checks, and emergency safety inspections scheduled by state excise inspectors prior to grant.
          </span>
        </label>
      </div>

      {/* Signature Block */}
      <div className="premise-signature-grid">
        <div>
          <label className="premise-signature-label">
            Digital Signature (Type your Full Name to sign) <span className="premise-mandatory-star">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ramesh Chandra"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            className="premise-signature-input"
            required
          />
          <span className="premise-signature-hint">Your typed signature holds equal binding weight under Information Technology Act.</span>
        </div>
      </div>

    </form>
  );
}
 