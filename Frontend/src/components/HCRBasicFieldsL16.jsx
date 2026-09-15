const HCRHCRBasicFieldsL16 = ({
  additionalFrom,
  onChange,
  starCategory,
  starCategoryRating,
}) => {
  return (
    <>
      {/* Staff strength */}
      <div className="form-group">
        <label className="hcr-form-label">
          Staff strength
          <span className="required">*</span>
        </label>

        <input
          type="text"
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
      </div>

      {/* Star category */}
      <div className="form-group">
        <label className="hcr-form-label">
          Star category approval by Department of Tourism, Govt. of India
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.starCategory || "0"}
          onChange={(e) => onChange("starCategory", e.target.value)}
          className="input-box"
        >
          <option value="0">--Select--</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>

          {starCategory.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Star category Rating */}
      <div className="form-group">
        <label className="hcr-form-label">
          Star category
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.starCategoryRating || "0"}
          onChange={(e) => onChange("starCategoryRating", e.target.value)}
          className="input-box"
        >
          <option value="0">--Select--</option>
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
      </div>

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
      </div>
    </>
  );
};

export default HCRHCRBasicFieldsL16;
