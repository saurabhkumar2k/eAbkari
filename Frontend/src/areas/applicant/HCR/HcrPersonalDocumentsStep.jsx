import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import DocumentUploadWithDate from "../../../components/DocumentsDetailsWithDate";
import DocumentUpload from "../../../components/DocumentsDetails";

export default function HcrPersonalDocumentsStep({
  documents,
  uploadedFiles,
  handleDocumentFileChange,
  handleValidityDateChange,
  handleDeleteFile,
  onBack,
  onContinue,
}) {



  
  return (
    <div className="form-group full-width ">
      <div className="hcr-step-header">
        <div>
          <h2 className="hcr-step-title">Step 4: Personal Documents</h2>
          <p className="hcr-step-description">
            Upload your personal documents here.
          </p>
        </div>
      </div>
      <div className="hcr-license-card">

        <DocumentUploadWithDate
          documents={documents}
          uploadedFiles={uploadedFiles}
          handleDocumentFileChange={handleDocumentFileChange}
          handleValidityDateChange={handleValidityDateChange}
          handleDeleteFile={handleDeleteFile}
        />

        <div className="hcr-step-navigation">

          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
          >
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="btn btn-primary"
          >
            Proceed to Site Documents
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}