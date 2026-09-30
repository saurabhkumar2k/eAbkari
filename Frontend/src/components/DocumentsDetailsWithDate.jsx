import React from "react";
import { useState } from "react";
import "../Style/Applicant/DocumentsWithDate.css";
import { Eye, RefreshCcw, Trash2, Upload, FileText } from "lucide-react";

const DocumentUploadWithDate = ({
  documents = [],
  uploadedFiles = {},
  handleDocumentFileChange,
  handleValidityDateChange,
  handleDeleteFile,
}) => {
  // const [date, setDate] = useState("");
  console.log(documents)

  // const handleChange = (e) => {
  //   debugger;
  //   const { name, value, type, checked } = e.target;

  //   let fieldValue = type === "checkbox" ? checked : value;

  //   setDate((prev) => ({
  //     ...prev,
  //     [name]: fieldValue,
  //   }));
  // };

  return (
    <div className="form-section">
      {/* ========================================= */}
      {/* TITLE */}
      {/* ========================================= */}

      <h3 className="form-title" style={{ textAlign: "center" }}>
        Applicant's Documents
      </h3>

      {/* ========================================= */}
      {/* DOCUMENT LIST */}
      {/* ========================================= */}

      {documents.length > 0 ? (
        documents.map((doc) => {
          /*
           * Existing/new uploaded file information
           */
          const uploaded = uploadedFiles[doc.docId];

          return (
            <div key={doc.docId} className="doc-portal-container">
              <div className="doc-portal-layout">
                {/* DOCUMENT DESCRIPTION SECTION */}
                <div className="doc-info-block">
                  <label className="doc-portal-label">
                    {doc.docDesc} - {doc.isValid}
                    {doc.isMandatory && (
                      <span className="form-required-mark" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    )}
                  </label>
                </div>

                {/* CONTROLS & META CONTAINER */}
                <div className="form-controls-wrapper">
                  {/* DATE OF VALIDITY FIELD */}
                  {/* {(uploaded?.file || uploaded?.existingFile) && (
            <div className="form-field-group">
              <label htmlFor={`validity-${doc.docId}`} className="form-field-label">
                Date of Validity
              </label>
              <input
                id={`validity-${doc.docId}`}
                type="date"
                className="form-date-input"
                value={uploaded?.validityDate || ""}
                onChange={(e) => {
                  if (handleValidityDateChange) {
                    handleValidityDateChange(doc.docId, e.target.value);
                  }
                }}
              />
            </div>
          )} */}
                  {doc.isValid === true &&
                    (uploaded?.file || uploaded?.existingFile) && (
                      <div className="form-field-group">
                        <label
                          htmlFor={`validity-${doc.docId}`}
                          className="form-field-label"
                        >
                          Date of Validity
                        </label>
                        <input
                          id={`validity-${doc.docId}`}
                          type="date"
                          className="form-date-input"
                          value={uploaded?.validityDate || ""}
                          onChange={(e) =>
                            handleValidityDateChange?.(
                              doc.docId,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    )}

                  {/* DYNAMIC ACTION STAGES */}
                  <div className="doc-actions-lane">
                    {uploaded?.file ? (
                      /* ================================================= */
                      /* CASE 1 : NEW FILE SELECTED                        */
                      /* ================================================= */
                      <>
                        <div className="doc-file-badge badge-state-staged">
                          <FileText size={15} className="doc-icon-left" />
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
                                (uploaded.file
                                  ? URL.createObjectURL(uploaded.file)
                                  : "");
                              console.log("Opening staging file:", url);
                              window.open(url, "_blank");
                            }}
                          >
                            <Eye size={15} /> View
                          </button>

                          <button
                            type="button"
                            className="portal-btn btn-warning"
                            onClick={() => {
                              document
                                .getElementById(`replace-file-${doc.docId}`)
                                ?.click();
                            }}
                          >
                            <RefreshCcw size={15} /> Replace
                          </button>

                          <input
                            id={`replace-file-${doc.docId}`}
                            type="file"
                            hidden
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file)
                                handleDocumentFileChange(doc.docId, file);
                              e.target.value = "";
                            }}
                          />

                          <button
                            type="button"
                            className="portal-btn btn-danger"
                            onClick={() => handleDeleteFile(doc.docId)}
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </>
                    ) : uploaded?.existingFile ? (
                      /* ================================================= */
                      /* CASE 2 : EXISTING FILE FROM DATABASE              */
                      /* ================================================= */
                      <>
                        <div className="doc-file-badge badge-state-committed">
                          <FileText size={15} className="doc-icon-left" />
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
                              const fileUrl = `http://localhost:5214/Documents/ApplicationDocuments/${uploaded.existingFile}`;
                              window.open(fileUrl, "_blank");
                            }}
                          >
                            <Eye size={15} /> View
                          </button>

                          <button
                            type="button"
                            className="portal-btn btn-warning"
                            onClick={() => {
                              document
                                .getElementById(
                                  `replace-existing-file-${doc.docId}`,
                                )
                                ?.click();
                            }}
                          >
                            <RefreshCcw size={15} /> Replace
                          </button>

                          <input
                            id={`replace-existing-file-${doc.docId}`}
                            type="file"
                            hidden
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file)
                                handleDocumentFileChange(doc.docId, file);
                              e.target.value = "";
                            }}
                          />

                          <button
                            type="button"
                            className="portal-btn btn-danger"
                            onClick={() => handleDeleteFile(doc.docId)}
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      /* ================================================= */
                      /* CASE 3 : NO FILE                                  */
                      /* ================================================= */
                      <>
                        <button
                          type="button"
                          className="portal-btn btn-primary-Doc"
                          onClick={() => {
                            document
                              .getElementById(`upload-file-${doc.docId}`)
                              ?.click();
                          }}
                        >
                          <Upload size={15} /> Upload Document
                        </button>
                        <input
                          id={`upload-file-${doc.docId}`}
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file) handleDocumentFileChange(doc.docId, file);
                            e.target.value = "";
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p
          style={{
            fontStyle: "italic",
          }}
        >
          No documents available.
        </p>
      )}
    </div>
  );
};

export default DocumentUploadWithDate;
