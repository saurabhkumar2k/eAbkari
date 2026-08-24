import React from "react";
import HcrApplicantDetails from "../HCR/HcrApplicantDetail";

export default function HcrApplicantStep({
  applicantForm,
  onChange,
  errors,
  ownerType,
  selectedLicensee,
  currentStep,
  setCurrentStep,
  maxStep = 6,
  onContinue,
  onBack,
}) {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (onContinue) {
      onContinue();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  console.log("HcrApplicantStep - currentStep  ", currentStep)

  return (
    <div className="hcr-form-section animate-fade">

      <div className="hcr-step-header">

        <div>
          <h2 className="hcr-step-title">
            Step {currentStep}: Applicant Personal & Profile Details
          </h2>

          <p className="hcr-step-description">
            Verify legal, identification, demographic, and resident
            contact coordinates for receipt-docket generation.
          </p>
        </div>

        <div className="hcr-license-badge">

          Owner Type:{" "}
          <span className="hcr-license-badge-value">
            {ownerType?.desc || "Not selected"}
          </span>

          <br />

          Licensee:{" "}
          <span className="hcr-license-badge-value">
            {selectedLicensee?.licenseeCatDesc || "Not selected"}
          </span>

        </div>

      </div>
      <div className="hcr-license-card">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">

          <HcrApplicantDetails
            formData={applicantForm}
            onChange={onChange}
            errors={errors}
          />

        </div>

        {/* ================================
          NAVIGATION
      ================================= */}

        <div className="hcr-wizard">

          {/* BACK BUTTON */}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBack}
          >
            <span>Go Back</span>
          </button>

          {/* NEXT BUTTON */}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            disabled={currentStep >= maxStep}
          >
            <span>Proceed to Next Step</span>
          </button>

        </div>
      </div>
    </div>
  );
}