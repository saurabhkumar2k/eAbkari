import React from "react";
import { ChevronLeft, ShieldAlert } from "lucide-react";

export default function HcrDeclarationStep({
  formData,
  formErrors,
  onChange,
  onBack,
  onSubmit,
}) {
  return (
    <div className="hcr-declaration-shell animate-fade text-left">
      <div className="hcr-declaration-notice">
        <div className="hcr-declaration-notice-icon">
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="hcr-declaration-notice-content">
          <p className="hcr-declaration-notice-title">
            Legal Notice & Liability
          </p>
          <p className="hcr-declaration-notice-text">
            Any false claim or misleading declaration submitted may result
            in rejection of the application and other action under the
            applicable excise laws.
          </p>
        </div>
      </div>

      <div className="hcr-declaration-card">
        <div className="hcr-declaration-header">
          <span className="hcr-declaration-badge">Declaration</span>
        </div>

        <div className="hcr-declaration-check-row">
          <input
            type="checkbox"
            id="acceptCheck"
            checked={formData.undertakingAccept || false}
            onChange={(e) =>
              onChange("undertakingAccept", e.target.checked)
            }
            className="hcr-declaration-checkbox"
          />

          <label htmlFor="acceptCheck" className="hcr-declaration-label">
            I declare that the information provided above is true and correct
            to the best of my knowledge and belief. I understand that
            incorrect, incomplete or misleading information may result in
            rejection or cancellation of the license.
          </label>
        </div>

        {formErrors?.undertakingAccept && (
          <p className="hcr-declaration-error">
            {formErrors.undertakingAccept}
          </p>
        )}
      </div>

      <div className="hcr-success-actions">
        <button type="button" onClick={onBack} className="hcr-btn-secondary">
          <ChevronLeft className="w-4 h-4 inline mr-1" />
          Back
        </button>

        <button type="button" onClick={onSubmit} className="hcr-btn-download">
          Submit Application
        </button>
      </div>
    </div>
  );
}