import React from "react";
import "../Style/Applicant/DocumentsWithDate.css";
import { Eye, RefreshCcw, Trash2, Upload, FileText } from "lucide-react";



const DocumentUpload = ({
  documents = [],
  uploadedFiles = {},
  handleDocumentFileChange,
  handleValidityDateChange,
  handleDeleteFile,
  errors = {},
  error = {},
}) => {
  // Supports both error prop formats
  const documentErrors = error?.errors || errors?.errors || error || errors || {};

  const getDocId = (doc) => doc.docID ?? doc.docId;

  const isMandatory = (doc) =>
    doc.isMandatory === "Y" ||
    doc.isMandatory === true;

  const getDocumentError = (docId) =>
    documentErrors?.[docId] || "";

  const handleFileChange = (docId, file, event) => {
    if (file) {
      handleDocumentFileChange(docId, file);
    }

    // Allow selecting the same file again
    if (event?.target) {
      event.target.value = "";
    }
  };
console.log("errors prop:", errors);
console.log("error prop:", error);
  return (
    <div className="form-section">
      <h3
        className="form-title"
        style={{ textAlign: "center" }}
      >
        Applicant's Documents
      </h3>

      {documents.length > 0 ? (
        documents.map((doc) => {
          const docId = getDocId(doc);
          const uploaded = uploadedFiles?.[docId];
          const docError = getDocumentError(docId);

          return (
            <div
              key={docId}
              className="doc-portal-container"
            >
              <div className="doc-portal-layout">
                {/* Document description */}
                <div className="doc-info-block">
                  <label className="doc-portal-label">
                    {doc.docDesc}

                    {isMandatory(doc) && (
                      <span
                        className="form-required-mark"
                        aria-hidden="true"
                      >
                        {" "}*
                      </span>
                    )}
                  </label>
 
                </div>

                {/* Document controls */}
                <div className="form-controls-wrapper">
                  {/* Validity date */}
                  {doc.isValid === true &&
                    (uploaded?.file || uploaded?.existingFile) && (
                      <div className="form-field-group">
                        <label
                          htmlFor={`validity-${docId}`}
                          className="form-field-label"
                        >
                          Date of Validity
                        </label>

                        <input
                          id={`validity-${docId}`}
                          type="date"
                          className="form-date-input"
                          value={uploaded?.validityDate || ""}
                          onChange={(e) =>
                            handleValidityDateChange?.(
                              docId,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                  <div className="doc-actions-lane">
                    {/* New uploaded file */}
                    {uploaded?.file ? (
                      <>
                        <div className="doc-file-badge badge-state-staged">
                          <span
                            className="doc-filename-text"
                            title={uploaded.file.name}
                          >
                            {uploaded.file.name}
                          </span>
                        </div>

                        <div className="doc-btn-group">
                          <button
                            type="button"
                            className="portal-btn btn-secondary"
                            onClick={() => {
                              const url =
                                uploaded.previewUrl ||
                                URL.createObjectURL(uploaded.file);

                              window.open(url, "_blank");
                            }}
                          >
                            👁 View
                          </button>

                          <button
                            type="button"
                            className="portal-btn btn-warning"
                            onClick={() =>
                              document
                                .getElementById(`replace-file-${docId}`)
                                ?.click()
                            }
                          >
                            🔄 Replace
                          </button>

                          <input
                            id={`replace-file-${docId}`}
                            type="file"
                            hidden
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileChange(
                                docId,
                                e.target.files?.[0],
                                e
                              )
                            }
                          />

                          <button
                            type="button"
                            className="portal-btn btn-danger"
                            onClick={() =>
                              handleDeleteFile(docId)
                            }
                          >
                            ❌ Delete
                          </button>
                        </div>
                      </>
                    ) : uploaded?.existingFile ? (
                      /* Existing file from database */
                      <>
                        <div className="doc-file-badge badge-state-committed">
                          <span
                            className="doc-filename-text"
                            title={uploaded.existingFile}
                          >
                            {uploaded.existingFile}
                          </span>
                        </div>

                        <div className="doc-btn-group">
                          <button
                            type="button"
                            className="portal-btn btn-secondary"
                            onClick={() => {
                              const fileUrl =
                                `http://localhost:5214/Documents/ApplicationDocuments/${uploaded.existingFile}`;

                              window.open(fileUrl, "_blank");
                            }}
                          >
                            👁 View
                          </button>

                          <button
                            type="button"
                            className="portal-btn btn-warning"
                            onClick={() =>
                              document
                                .getElementById(
                                  `replace-existing-file-${docId}`
                                )
                                ?.click()
                            }
                          >
                            🔄 Replace
                          </button>

                          <input
                            id={`replace-existing-file-${docId}`}
                            type="file"
                            hidden
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileChange(
                                docId,
                                e.target.files?.[0],
                                e
                              )
                            }
                          />

                          <button
                            type="button"
                            className="portal-btn btn-danger"
                            onClick={() =>
                              handleDeleteFile(docId)
                            }
                          >
                            ❌ Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      /* No file uploaded */
                      <>
                        <button
                          type="button"
                          className="portal-btn btn-primary-Doc"
                          onClick={() =>
                            document
                              .getElementById(`upload-file-${docId}`)
                              ?.click()
                          }
                        >
                          📄 Upload Document
                        </button>

                        <input
                          id={`upload-file-${docId}`}
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            handleFileChange(
                              docId,
                              e.target.files?.[0],
                              e
                            )
                          }
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Validation error */}
{error?.[doc.docId] && (
  <div className="error-text-container">
    <span className="error-text-all">
      {error[doc.docId]}
    </span>
  </div>
)}

                {/* <div className="doc-note">
                  (.pdf, .jpg, .jpeg, .png) Max Size: 2MB
                </div> */}
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ fontStyle: "italic" }}>
          No documents available.
        </p>
      )}
    </div>
  );
};




export default DocumentUpload;