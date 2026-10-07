import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import DocumentUpload from "../../../components/DocumentsDetails";
import DocumentUploadWithDate from "../../../components/DocumentsDetailsWithDate";

export default function HcrSiteDocumentsStep({
  documents,
  uploadedFiles,
  handleDocumentFileChange,
  handleValidityDateChange,
  handleDeleteFile,
  errors,
  onBack,
  onContinue,
}) {
  return (
    <div className="form-group full-width ">
      <div className="hcr-step-header">
        <div>
          <h2 className="hcr-step-title">Step 5: Site Documents</h2>
          <p className="hcr-step-description">
            Upload your site documents here.
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
          error={errors.errors}
        />
        <div className="error-text-container">
          {errors.isValid === false && <span className="error-text-all">{errors.globalError}</span>}
        </div>

        <div className="hcr-step-navigation">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="btn btn-primary"
          >
            Proceed to Declaration
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
