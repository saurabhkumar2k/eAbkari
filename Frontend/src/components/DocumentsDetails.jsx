import React from "react";

const DocumentUpload = ({
  documents = [],
  uploadedFiles = {},
  handleDocumentFileChange,
  handleDeleteFile,
}) => {
  return (
    <div className="form-section">
      <h3 className="form-title" style={{ textAlign: "center" }}>
        Applicant's Documents
      </h3>

      {documents.length > 0 ? (
        documents.map((doc) => {
          const uploaded = uploadedFiles[doc.docId];

          return (
            <div key={doc.docId} className="doc-box">
              <div className="doc-row">

                {/* Document Description */}
                <div className="doc-desc">
                  <label>
                    {doc.docDesc}
                    {doc.isMandatory && (
                      <span style={{ color: "red" }}> *</span>
                    )}
                  </label>
                </div>

                {/* Upload + Actions */}
                <div className="doc-actions">
                  <label className="file-btn">
                    {uploaded?.file?.name || "No file chosen"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleDocumentFileChange(
                          doc.docId,
                          e.target.files[0]
                        )
                      }
                    />
                  </label>

                  {uploaded && (
                    <div className="doc-buttons">
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() =>
                          window.open(uploaded.previewUrl, "_blank")
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteFile(doc.docId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="doc-note">
                (.pdf, .jpg, .jpeg) Max Size: 2MB
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