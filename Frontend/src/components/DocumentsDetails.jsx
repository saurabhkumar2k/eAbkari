import React from "react";

const DocumentUpload = ({
  documents = [],
  uploadedFiles = {},
  handleDocumentFileChange,
  handleDeleteFile,
}) => {
  return (
    <div className="form-section">

      {/* ========================================= */}
      {/* TITLE */}
      {/* ========================================= */}

      <h3
        className="form-title"
        style={{ textAlign: "center" }}
      >
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
          const uploaded =
            uploadedFiles[doc.docId];

          return (
            <div
              key={doc.docId}
              className="doc-box"
            >

              {/* ========================================= */}
              {/* DOCUMENT ROW */}
              {/* ========================================= */}

              <div className="doc-row">


                {/* ========================================= */}
                {/* DOCUMENT DESCRIPTION */}
                {/* ========================================= */}

                <div className="doc-desc">

                  <label>
                    {doc.docDesc}

                    {doc.isMandatory && (
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        {" "}*
                      </span>
                    )}
                  </label>

                </div>


                {/* ========================================= */}
                {/* DOCUMENT ACTIONS */}
                {/* ========================================= */}

                <div className="doc-actions">


                  {/* ================================================= */}
                  {/* CASE 1 : NEW FILE SELECTED */}
                  {/* ================================================= */}

                  {uploaded?.file ? (

                    <>

                      {/* NEW FILE NAME */}

                      <span className="file-name">
                        {uploaded.file.name}
                      </span>


                      <div className="doc-buttons">


                        {/* ============================= */}
                        {/* VIEW NEW FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="view-btn"
                          onClick={() => {

                            const url =
                              uploaded.previewUrl ||
                              URL.createObjectURL(
                                uploaded.file
                              );

                            console.log(
                              "Opening new file:",
                              url
                            );

                            window.open(
                              url,
                              "_blank"
                            );

                          }}
                        >
                          👁 View
                        </button>


                        {/* ============================= */}
                        {/* REPLACE NEW FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="file-btn"
                          onClick={() => {

                            document
                              .getElementById(
                                `replace-file-${doc.docId}`
                              )
                              ?.click();

                          }}
                        >
                          🔄 Replace
                        </button>


                        <input
                          id={`replace-file-${doc.docId}`}
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {

                            const file =
                              e.target.files?.[0] ||
                              null;

                            console.log(
                              "Replacement file:",
                              file
                            );

                            if (file) {

                              handleDocumentFileChange(
                                doc.docId,
                                file
                              );

                            }

                            /*
                             * Same file dobara select
                             * karne ke liye
                             */
                            e.target.value = "";

                          }}
                        />


                        {/* ============================= */}
                        {/* DELETE NEW FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteFile(
                              doc.docId
                            )
                          }
                        >
                          ❌ Delete
                        </button>

                      </div>

                    </>


                  ) : uploaded?.existingFile ? (


                    /* ================================================= */
                    /* CASE 2 : EXISTING FILE FROM DATABASE */
                    /* ================================================= */

                    <>

                      {/* EXISTING FILE NAME */}

                      <span className="file-name">
                        {uploaded.existingFile}
                      </span>


                      <div className="doc-buttons">


                        {/* ============================= */}
                        {/* VIEW EXISTING FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="view-btn"
                          onClick={() => {

                            const fileUrl =
                              `http://localhost:5214/Documents/ApplicationDocuments/${uploaded.existingFile}`;

                            console.log(
                              "Opening existing file:",
                              fileUrl
                            );

                            window.open(
                              fileUrl,
                              "_blank"
                            );

                          }}
                        >
                          👁 View
                        </button>


                        {/* ============================= */}
                        {/* REPLACE EXISTING FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="file-btn"
                          onClick={() => {

                            document
                              .getElementById(
                                `replace-existing-file-${doc.docId}`
                              )
                              ?.click();

                          }}
                        >
                          🔄 Replace
                        </button>


                        <input
                          id={`replace-existing-file-${doc.docId}`}
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {

                            const file =
                              e.target.files?.[0] ||
                              null;

                            console.log(
                              "Selected replacement file:",
                              file
                            );

                            if (file) {

                              handleDocumentFileChange(
                                doc.docId,
                                file
                              );

                            }

                            /*
                             * Same file dobara select
                             * karne ke liye
                             */
                            e.target.value = "";

                          }}
                        />


                        {/* ============================= */}
                        {/* DELETE EXISTING FILE */}
                        {/* ============================= */}

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteFile(
                              doc.docId
                            )
                          }
                        >
                          ❌ Delete
                        </button>

                      </div>

                    </>


                  ) : (


                    /* ================================================= */
                    /* CASE 3 : NO FILE */
                    /* ================================================= */

                    <>

                      {/* UPLOAD BUTTON */}

                      <button
                        type="button"
                        className="file-btn"
                        onClick={() => {

                          document
                            .getElementById(
                              `upload-file-${doc.docId}`
                            )
                            ?.click();

                        }}
                      >
                        📄 Upload File
                      </button>


                      <input
                        id={`upload-file-${doc.docId}`}
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {

                          const file =
                            e.target.files?.[0] ||
                            null;

                          console.log(
                            "Selected file:",
                            file
                          );

                          if (file) {

                            handleDocumentFileChange(
                              doc.docId,
                              file
                            );

                          }

                          e.target.value = "";

                        }}
                      />

                    </>

                  )}

                </div>

              </div>


              {/* ========================================= */}
              {/* FILE NOTE */}
              {/* ========================================= */}

              <div className="doc-note">
                (.pdf, .jpg, .jpeg, .png)
                {" "}
                Max Size: 2MB
              </div>

            </div>
          );

        })

      ) : (

        <p
          style={{
            fontStyle: "italic"
          }}
        >
          No documents available.
        </p>

      )}

    </div>
  );
};

export default DocumentUpload;