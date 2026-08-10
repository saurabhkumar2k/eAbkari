import React, { useState, useRef } from "react";
import { 
  FileText, 
  Trash2, 
  Eye, 
  Check, 
  AlertCircle, 
  Upload,
  Info 
} from "lucide-react";

export default function IdentityDetailsPage({ formData, onChange, errors = {}, showToast }) {
  const fileInputRef = useRef(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Fallback defaults
  const currentIdProof = formData.idProofType || "";
  const currentIdNumber = formData.idNumber || "";
  const uploadedFileName = formData.idProofFileName || "";

  // Standard official Identification items
  const ID_PROOF_OPTIONS = [
    { value: "Aadhaar Card", label: "Aadhaar Card (UIDAI)" },
    { value: "Voter ID Card", label: "Voter ID / Election Card" },
    { value: "PAN Card", label: "Income Tax PAN Card" },
    { value: "Passport", label: "Indian Passport" },
    { value: "Driving License", label: "Driving License (RTO)" }
  ];

  // Handles standard file upload trigger
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        if (showToast) {
          showToast("File size expands over the 2MB limit. Please upload a smaller file.", "error");
        } else {
          alert("File size exceeds 2MB limit");
        }
        return;
      }
      onChange("idProofFileName", file.name);
      // Give a dummy content URL for mock viewing
      onChange("idProofFileUrl", URL.createObjectURL(file) || "#");
      if (showToast) showToast(`Successfully uploaded: ${file.name}`, "success");
    }
  };

  const handleDeleteFile = () => {
    onChange("idProofFileName", "");
    onChange("idProofFileUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (showToast) showToast("Uploaded document removed", "success");
  };

  const triggerUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveDoc = () => {
    if (!currentIdProof) {
      if (showToast) showToast("Please select a valid ID Proof type", "error");
      return;
    }
    if (!currentIdNumber.trim()) {
      if (showToast) showToast("Please enter a valid ID Number", "error");
      return;
    }
    if (!uploadedFileName) {
      if (showToast) showToast("Please choose & upload your ID Proof Document first", "error");
      return;
    }
    if (showToast) showToast("Identity details saved successfully!", "success");
  };

  return (
    <div className="identity-page">
      {/* Centered blue heading banner using identity-banner */}
      <div className="identity-banner">
        <h2>Identity Details</h2>
      </div>

      <div className="identity-card">
        {/* Row 1: ID Proof Dropdown & ID Number Input using identity-grid */}
        <div className="identity-grid">
          {/* Id Proof Selector */}
          <div className="identity-form-group">
            <label className="identity-field-label">
              Id Proof <span className="identity-required-star">*</span>
            </label>
            <div className="identity-select-wrapper">
              <select
                value={currentIdProof}
                onChange={(e) => onChange("idProofType", e.target.value)}
                className={`identity-select ${
                  errors.idProofType ? "identity-input-error" : ""
                }`}
              >
                <option value="">--Select--</option>
                {ID_PROOF_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.idProofType && (
              <p className="identity-error-text">{errors.idProofType}</p>
            )}
          </div>

          {/* Id Number Field */}
          <div className="identity-form-group">
            <label className="identity-field-label">
              Id Number <span className="identity-required-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Identification Ref number"
              className={`identity-input ${
                errors.idNumber ? "identity-input-error" : ""
              }`}
              value={currentIdNumber}
              onChange={(e) => onChange("idNumber", e.target.value.toUpperCase())}
            />
            {errors.idNumber && (
              <p className="identity-error-text">{errors.idNumber}</p>
            )}
          </div>
        </div>

        {/* Action Table matching the Blueprint screenshot exactly with modern gov upload-table wrapping */}
        <div className="identity-upload-table-wrap">
          <table className="identity-upload-table">
            <thead>
              <tr className="identity-table-header-row">
                <th colSpan="2" className="identity-th-main">
                  Applicant's Document
                </th>
                <th className="identity-th-action">
                  Click To
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="identity-table-body-row">
                {/* ID Proof Doc Label Cell */}
                <td className="identity-td-label">
                  ID Proof Doc
                </td>

                {/* File Uploader Cell */}
                <td className="identity-td-file">
                  <div className="identity-file-upload-box">
                    <div className="identity-file-row">
                      <button
                        type="button"
                        onClick={triggerUploadClick}
                        className="identity-btn-upload"
                      >
                        <Upload style={{ width: '1rem', height: '1rem', color: '#334155' }} />
                        <span>Choose File</span>
                      </button>
                      <span className="identity-file-name">
                        {uploadedFileName || "No file chosen"}
                      </span>
                    </div>
                    {/* Size and specs feedback notice */}
                    <p className="identity-file-specs">
                      (.pdf,.JPG/.JPEG) Max Size: 2MB
                    </p>
                  </div>
                  {/* Hidden input element */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {errors.idProofFileName && (
                    <p className="identity-error-text identity-error-center">{errors.idProofFileName}</p>
                  )}
                </td>

                {/* Action View/Delete Cell */}
                <td className="identity-td-actions">
                  <div className="identity-action-links">
                    {/* View Document */}
                    {uploadedFileName ? (
                      <button
                        type="button"
                        onClick={() => setPreviewModalOpen(true)}
                        className="identity-action-btn identity-action-view"
                        title="View Document"
                      >
                        <Eye style={{ width: '1rem', height: '1rem' }} />
                        <span>View</span>
                      </button>
                    ) : (
                      <span className="identity-action-disabled">
                        <Eye style={{ width: '1rem', height: '1rem' }} />
                        <span>View</span>
                      </span>
                    )}

                    {/* Delete Document */}
                    {uploadedFileName ? (
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="identity-action-btn identity-action-delete"
                        title="Delete Document"
                      >
                        <Trash2 style={{ width: '1rem', height: '1rem' }} />
                        <span>Delete</span>
                      </button>
                    ) : (
                      <span className="identity-action-disabled">
                        <Trash2 style={{ width: '1rem', height: '1rem' }} />
                        <span>Delete</span>
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Save footer aligned beautifully with Save button class */}
        <div className="identity-save-footer">
          <button
            type="button"
            onClick={handleSaveDoc}
            className="identity-btn-save"
          >
            Save
          </button>
        </div>
      </div>

      {/* Styled File preview Modal popup */}
      {previewModalOpen && (
        <div className="identity-modal-overlay">
          <div className="identity-modal-card">
            {/* Modal Title bar */}
            <div className="identity-modal-header">
              <h4 className="identity-modal-title">
                ID Proof Verification Preview
              </h4>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="identity-modal-close"
              >
                Close (✖)
              </button>
            </div>
            {/* Modal Body Info and preview canvas */}
            <div className="identity-modal-body">
              <div className="identity-modal-badge">
                <Check style={{ width: '1rem', height: '1rem', color: '#059669' }} />
                <span>Document Active & Approved</span>
              </div>
              
              <div className="identity-preview-doc-box">
                <FileText style={{ width: '4rem', height: '4rem', color: '#0a3861' }} />
                <p className="identity-doc-name">{uploadedFileName}</p>
                <p className="identity-doc-meta">
                  TYPE: PDF/IMAGE • SIZE: MOCK VERIFIED • REGISTERED PASS
                </p>
              </div>

              <p className="identity-modal-notice">
                Official PDF/JPEG layout verification is approved instantly. In case of discrepancies during physical inspection, the licensee stays personally liable under the Delhi Excise Act, 2009.
              </p>
              
              <div className="identity-modal-footer">
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="identity-modal-btn-done"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
