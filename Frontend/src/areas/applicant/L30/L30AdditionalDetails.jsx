import React from "react";

export default function L30AdditionalDetails({
  formData = {},
  onChange,
  onNext,
  onPrevious
}) {
  const handleFieldChange = (field, val) => {
    if (onChange) {
      onChange(field, val);
    }
  };

  return (
    <div className="l30-home-wrapper">
      {/* Grey Title Header */}
      <div className="l30-grey-header">Additional Details</div>

      {/* Form Card */}
      <div className="l30-form-card">
        <div className="l30-home-grid">
          {/* L30 Licence last Granted/ Renewed * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              L30 Licence last Granted/ Renewed <span className="l30-req">*</span>
            </label>
            <select
              value={formData.lastGranted || "Fresh"}
              onChange={(e) => handleFieldChange("lastGranted", e.target.value)}
              className="l30-input"
            >
              <option value="Fresh">Fresh</option>
              <option value="Granted">Granted</option>
              <option value="Renewed">Renewed</option>
            </select>
          </div>

          {/* Licence Valid For * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Licence Valid For <span className="l30-req">*</span>
            </label>
            <select
              value={formData.validFor || "5 Years"}
              onChange={(e) => handleFieldChange("validFor", e.target.value)}
              className="l30-input"
            >
              <option value="5 Years">5 Years</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
            </select>
          </div>

          {/* Commercial Activity Radio */}
          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">
              Whether there is any commercial activity going on the address where L30 applied for
            </label>
            <div className="l30-radio-group">
              <label className="l30-radio-label">
                <input
                  type="radio"
                  name="commercialActivity"
                  value="Yes"
                  checked={formData.commercialActivity === "Yes"}
                  onChange={(e) => handleFieldChange("commercialActivity", e.target.value)}
                  className="l30-radio-input"
                />
                Yes
              </label>
              <label className="l30-radio-label">
                <input
                  type="radio"
                  name="commercialActivity"
                  value="No"
                  checked={formData.commercialActivity === "No" || !formData.commercialActivity}
                  onChange={(e) => handleFieldChange("commercialActivity", e.target.value)}
                  className="l30-radio-input"
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="l30-action-footer">
          {onPrevious && (
            <button
              type="button"
              onClick={onPrevious}
              className="l30-btn-prev"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="l30-btn-update"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
