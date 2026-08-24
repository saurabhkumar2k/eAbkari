import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import RestaurantDetails from "../../../components/RestaurantDetails";
import "./HcrRestaurantStep.css";

export default function HcrRestaurantStep({
  siteForm,
  states,
  districts,
  subDivisions,
  policeStations,
  errors,
  onChange,
  onBack,
  onContinue,
  onClose,
}) {
  const handleBackClick = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  const handleContinueClick = () => {
    if (typeof onContinue === "function") {
      onContinue();
    }
  };

  return (
    <div className="hcr-form-section animate-fade">
      <div className="hcr-step-header">
        <div>
          <h2 className="hcr-step-title">Step 2: Restaurant / Site Details</h2>
          <p className="hcr-step-description">
            Enter the restaurant premises and location details.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            className="hcr-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="hcr-license-card">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <RestaurantDetails
            siteForm={siteForm}
            states={states}
            districts={districts}
            subDivisions={subDivisions}
            policeStations={policeStations}
            errors={errors}
            onChange={onChange}
          />
        </div>

        <div className="hcr-wizard">
          <button
            type="button"
            onClick={handleBackClick}
            className="btn btn-secondary"
          >
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            type="button"
            onClick={handleContinueClick}
            className="btn btn-primary"
          >
            Proceed to Additional Details
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}