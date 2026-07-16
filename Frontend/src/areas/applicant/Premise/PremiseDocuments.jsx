import React from "react";
import { CheckCircle2, FileCheck, Trash2, Upload } from "lucide-react";

export default function Step3Documents({
  uploadedDocs,
  uploadProgress,
  triggerDocUpload,
  removeDoc
}) {
  return (
    <div className="premise-card-body">
      <div className="premise-card-header">
        <div>
          <h3 className="premise-card-title-text">Step 3: Document Compliance</h3>
          <p className="premise-card-subtitle-text">Provide verified legal documents to establish ownership, state safety bounds, and municipal trade rights.</p>
        </div>
        <div className="premise-doc-header">
          <FileCheck className="premise-help-icon" />
          <span>Upload size limit: 5 MB per document</span>
        </div>
      </div>

      <div className="premise-docs-stack">
        {[
          { key: "ownershipProof", label: "Proof of ownership / Property Deed / Lease Agreement", req: true, desc: "Submit certified PDF copy of property registration or lease agreement valid for at least 1 year." },
          { key: "fireNoc", label: "Delhi Fire Service NOC Clearance Certificate", req: true, desc: "Submit current, unexpired fire safety NOC issued by NCT Delhi Fire Services." },
          { key: "mcdLicense", label: "MCD Trade License / Health Trade Certificate", req: true, desc: "Submit current Health Eating House or Trade license copy from Municipal Corporation of Delhi." },
          { key: "sitePlan", label: "Architectural Site Plan of Premise", req: false, desc: "Optional blueprinted site map of halls, exits, entrances, and parking boundaries." },
          { key: "panProof", label: "Owner/Firm PAN & Aadhaar Authorization Proof", req: true, desc: "Government photo ID and tax registration document." }
        ].map((doc) => {
          const isUploaded = !!uploadedDocs[doc.key];
          const progress = uploadProgress[doc.key];
          const isUploading = progress > 0 && progress < 100;

          return (
            <div key={doc.key} className="premise-doc-row">
              <div className="premise-doc-info">
                <h4 className="premise-doc-title">
                  {doc.label}
                  {doc.req && <span className="premise-mandatory-star">*</span>}
                </h4>
                <p className="premise-doc-desc">{doc.desc}</p>

                {/* Upload progression indicator */}
                {isUploading && (
                  <div>
                    <div className="premise-progress-container">
                      <div className="premise-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="premise-progress-text">Uploading dossier: {progress}%</span>
                  </div>
                )}

                {/* Done state badge */}
                {isUploaded && !isUploading && (
                  <div className="premise-uploaded-tag">
                    <CheckCircle2 className="premise-help-icon" />
                    <span>Dossier file: {uploadedDocs[doc.key].name} ({uploadedDocs[doc.key].size})</span>
                  </div>
                )}
              </div>

              <div className="premise-doc-actions">
                {isUploaded ? (
                  <button
                    type="button"
                    onClick={() => removeDoc(doc.key)}
                    className="premise-btn-remove"
                  >
                    <Trash2 className="premise-help-icon" />
                    <span>Remove File</span>
                  </button>
                ) : (
                  <div className="premise-upload-trigger">
                    <input
                      type="file"
                      id={`file-${doc.key}`}
                      className="premise-hidden-input"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          triggerDocUpload(doc.key, file.name);
                        }
                      }}
                    />
                    <label
                      htmlFor={`file-${doc.key}`}
                      className="premise-upload-label"
                    >
                      <Upload className="premise-upload-icon" />
                      <span>Select & Upload File</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
