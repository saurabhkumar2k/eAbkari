import React, { useMemo } from "react";

const getValidityDate = (financialYear, years) => {
  const match = /^(\d{4})-(\d{4})$/.exec(financialYear || "");

  if (
    !match ||
    Number(match[2]) !== Number(match[1]) + 1 ||
    !years
  ) {
    return "";
  }

  // Display validity up to 31 March based on the selected period.
  const date = new Date(
    Number(match[1]) + Number(years),
    2,
    31
  );

  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

export default function L30AdditionalDetails({
  formData = {},
  onChange,
  onNext,
  onPrevious,
  saving = false,
  saveError = "",
  saveSuccess = ""
}) {
  const validFor = formData.validFor || "5";

  const validityDate = useMemo(
    () =>
      getValidityDate(
        formData.exciseYear || "2026-2027",
        validFor
      ),
    [formData.exciseYear, validFor]
  );

  const handleFieldChange = (field, value) => {
    onChange?.(field, value);
  };

  return (
    <div className="l30-home-wrapper">
      <div className="l30-grey-header">Additional Details</div>

      <div className="l30-form-card">
        <div className="l30-home-grid">
          <div className="l30-form-group">
            <label
              className="l30-form-label"
              htmlFor="l30-valid-for"
            >
              Licence Valid For <span className="l30-req">*</span>
            </label>

            <select
              id="l30-valid-for"
              value={validFor}
              onChange={(e) =>
                handleFieldChange("validFor", e.target.value)
              }
              className="l30-input"
            >
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
            </select>
          </div>

          <div className="l30-form-group">
            <label
              className="l30-form-label"
              htmlFor="l30-valid-up-to"
            >
              Licence Valid Up To
            </label>

            <input
              id="l30-valid-up-to"
              type="text"
              value={validityDate}
              readOnly
              className="l30-input"
              placeholder="Calculated from financial year"
            />
          </div>

          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">
              Whether there is any commercial activity at the
              address where L-30 is applied for?
              <span className="l30-req"> *</span>
            </label>

            <div className="l30-radio-group">
              <label className="l30-radio-label">
                <input
                  type="radio"
                  name="commercialActivity"
                  value="N"
                  checked={
                    (formData.commercialActivity || "N") === "N"
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "commercialActivity",
                      e.target.value
                    )
                  }
                  className="l30-radio-input"
                />
                No
              </label>

              <label className="l30-radio-label">
                <input
                  type="radio"
                  name="commercialActivity"
                  value="Y"
                  checked={formData.commercialActivity === "Y"}
                  onChange={(e) =>
                    handleFieldChange(
                      "commercialActivity",
                      e.target.value
                    )
                  }
                  className="l30-radio-input"
                />
                Yes
              </label>
            </div>
          </div>
        </div>

        {saveError && (
          <div
            role="alert"
            className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700"
          >
            {saveError}
          </div>
        )}

        {saveSuccess && (
          <div
            role="status"
            className="mt-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700"
          >
            {saveSuccess}
          </div>
        )}

        <div className="l30-action-footer">
          {onPrevious && (
            <button
              type="button"
              onClick={onPrevious}
              className="l30-btn-prev"
              disabled={saving}
            >
              Previous
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            className="l30-btn-update"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save and Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}