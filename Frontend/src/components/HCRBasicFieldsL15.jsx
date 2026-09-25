import { useEffect } from "react";

const HCRHCRBasicFieldsL15 = ({
  additionalFrom,
  onChange,
  starCategory,
  starCategoryRating,
  errors,
}) => {
  useEffect(() => {
    if (additionalFrom.starCategory === "N") {
      onChange("starCategoryRating", "");
    }
    if (additionalFrom.HasStoreProvisionYN === "N") {
      onChange("StoreLocationInHotel", "");
    }
  }, [additionalFrom.starCategory,additionalFrom.HasStoreProvisionYN]);
  return (
    <>
      {/* Total No. Rooms */}
      <div className="form-group">
        <label className="hcr-form-label">
          Total No. Rooms
          <span className="required">*</span>
        </label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Total No Rooms"
          value={additionalFrom.totalRoom || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              onChange("totalRoom", value);
            }
          }}
          maxLength={4}
          className="input-box"
        />
        <div className="error-text-container">
          {errors?.totalRoom && (
            <span className="error-text-all">{errors?.totalRoom}</span>
          )}
        </div>
      </div>

      {/* Staff strength */}
      <div className="form-group">
        <label className="hcr-form-label">
          Staff strength
          <span className="required">*</span>
        </label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Staff strength"
          value={additionalFrom.staffStrength || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              onChange("staffStrength", value);
            }
          }}
          maxLength={3}
          className="input-box"
        />
        <div className="error-text-container">
          {errors?.staffStrength && (
            <span className="error-text-all">{errors?.staffStrength}</span>
          )}
        </div>
      </div>

      {/* Star category */}
      <div className="form-group">
        <label className="hcr-form-label">
          Star category approval by Department of Tourism, Govt. of India
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.starCategory || ""}
          onChange={(e) => onChange("starCategory", e.target.value)}
          className="input-box"
        >
          <option value="">--Select--</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>

          {starCategory.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="error-text-container">
          {errors?.starCategory && (
            <span className="error-text-all">{errors?.starCategory}</span>
          )}
        </div>
      </div>

      {/* Star category Rating */}
      {additionalFrom.starCategory === "Y" && (
        <div className="form-group">
          <label className="hcr-form-label">
            Star category
            <span className="required">*</span>
          </label>

          <select
            value={additionalFrom.starCategoryRating || ""}
            onChange={(e) => onChange("starCategoryRating", e.target.value)}
            className="input-box"
          >
            <option value="">--Select--</option>
            <option value="1">1 Star Hotel</option>
            <option value="2">2 Star Hotel</option>
            <option value="3">3 Star Hotel</option>
            <option value="4">4 Star Hotel</option>
            <option value="5">5 Star Hotel</option>
            <option value="6">Above 5 Star</option>
            <option value="7">Budget Hotel</option>
            <option value="8">Deluxe</option>
            <option value="9">First Class</option>

            {starCategoryRating.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="error-text-container">
            {errors?.starCategoryRating && (
              <span className="error-text-all">
                {errors?.starCategoryRating}
              </span>
            )}
          </div>
        </div>
      )}

      {/* provision for store */}
      <div className="form-group">
        <label className="hcr-form-label">
          Whether the premises have provision for store
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.HasStoreProvisionYN || ""}
          onChange={(e) => onChange("HasStoreProvisionYN", e.target.value)}
          className="input-box"
        >
          <option value="">--Select--</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>

          {starCategory.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="error-text-container">
          {errors?.HasStoreProvisionYN && (
            <span className="error-text-all">
              {errors?.HasStoreProvisionYN}
            </span>
          )}
        </div>
      </div>

      {/* Location of store in Hotel */}
      {additionalFrom.HasStoreProvisionYN === "Y" && (
        <div className="form-group">
          <label className="hcr-form-label">
            Location of store in Hotel
            <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Location of store"
            value={additionalFrom.StoreLocationInHotel || ""}
            onChange={(e) => {
              const value = e.target.value;
              onChange("StoreLocationInHotel", value);
            }}
            className="input-box"
          />

          <div className="error-text-container">
            {errors?.StoreLocationInHotel && (
              <span className="error-text-all">
                {errors?.StoreLocationInHotel}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Educational Institution Distance */}
      <div className="form-group">
        <label className="hcr-form-label">
          Distance of Nearest Educational Institutions (Meters)
          <span className="required">*</span>
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="eduInsDistance"
              value="Less than 100 Meters"
              checked={
                additionalFrom.educationalInsDist === "Less than 100 Meters"
              }
              onChange={(e) => onChange("educationalInsDist", e.target.value)}
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="eduInsDistance"
              value="Above 100 Meters"
              checked={additionalFrom.educationalInsDist === "Above 100 Meters"}
              onChange={(e) => onChange("educationalInsDist", e.target.value)}
            />
            Above 100 Meters
          </label>
        </div>
        <div className="error-text-container">
          {errors?.educationalInsDist && (
            <span className="error-text-all">{errors?.educationalInsDist}</span>
          )}
        </div>
      </div>

      {/* Religious Place Distance */}
      <div className="form-group">
        <label className="hcr-form-label">
          Distance of Nearest Religious Places (Meters)
          <span className="required">*</span>
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="religiousPlaceDistance"
              value="Less than 100 Meters"
              checked={
                additionalFrom.religiousPlaceDist === "Less than 100 Meters"
              }
              onChange={(e) => onChange("religiousPlaceDist", e.target.value)}
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="religiousPlaceDistance"
              value="Above 100 Meters"
              checked={additionalFrom.religiousPlaceDist === "Above 100 Meters"}
              onChange={(e) => onChange("religiousPlaceDist", e.target.value)}
            />
            Above 100 Meters
          </label>
        </div>
        <div className="error-text-container">
          {errors?.religiousPlaceDist && (
            <span className="error-text-all">{errors?.religiousPlaceDist}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default HCRHCRBasicFieldsL15;
