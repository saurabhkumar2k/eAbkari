import React from "react";

export default function L30HomeDetails({
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
      <div className="l30-grey-header">Home Details</div>

      {/* Form Card */}
      <div className="l30-form-card">
        <div className="l30-home-grid">
          {/* License / Excise Year */}
          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">License / Excise Year</label>
            <select
              value={formData.exciseYear || "2026-2027"}
              onChange={(e) => handleFieldChange("exciseYear", e.target.value)}
              className="l30-input l30-input-sm"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          {/* Category of License Applied for */}
          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">Category of License Applied for</label>
            <select
              value={formData.categoryApplied || "L30 (Licence for possession of liquor at home in excess of individual possession limit)"}
              disabled
              className="l30-input l30-input-disabled"
            >
              <option value="L30 (Licence for possession of liquor at home in excess of individual possession limit)">
                L30 (Licence for possession of liquor at home in excess of individual possession limit)
              </option>
            </select>
          </div>

          {/* Home Name * */}
          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">
              Home Name <span className="l30-req">*</span>
            </label>
            <input
              type="text"
              value={formData.homeName || ""}
              onChange={(e) => handleFieldChange("homeName", e.target.value)}
              className="l30-input"
              placeholder="home name"
            />
          </div>

          {/* Home Address 1 * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Address 1 <span className="l30-req">*</span>
            </label>
            <input
              type="text"
              value={formData.homeAddress1 || ""}
              onChange={(e) => handleFieldChange("homeAddress1", e.target.value)}
              className="l30-input"
              placeholder="Home Address 1"
            />
          </div>

          {/* Home Address 2 * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Address 2 <span className="l30-req">*</span>
            </label>
            <input
              type="text"
              value={formData.homeAddress2 || ""}
              onChange={(e) => handleFieldChange("homeAddress2", e.target.value)}
              className="l30-input"
              placeholder="Home Address 2"
            />
          </div>

          {/* Home State * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home State <span className="l30-req">*</span>
            </label>
            <select
              value={formData.homeState || "Delhi"}
              onChange={(e) => handleFieldChange("homeState", e.target.value)}
              className="l30-input"
            >
              <option value="Delhi">Delhi</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Punjab">Punjab</option>
            </select>
          </div>

          {/* Home District * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home District <span className="l30-req">*</span>
            </label>
            <select
              value={formData.homeDistrict || "NEW DELHI"}
              onChange={(e) => handleFieldChange("homeDistrict", e.target.value)}
              className="l30-input"
            >
              <option value="NEW DELHI">NEW DELHI</option>
              <option value="WEST DELHI">WEST DELHI</option>
              <option value="NORTH DELHI">NORTH DELHI</option>
              <option value="SOUTH DELHI">SOUTH DELHI</option>
              <option value="EAST DELHI">EAST DELHI</option>
              <option value="CENTRAL DELHI">CENTRAL DELHI</option>
            </select>
          </div>

          {/* Home Sub Division * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Sub Division <span className="l30-req">*</span>
            </label>
            <select
              value={formData.homeSubDivision || "Chanakya Puri"}
              onChange={(e) => handleFieldChange("homeSubDivision", e.target.value)}
              className="l30-input"
            >
              <option value="Chanakya Puri">Chanakya Puri</option>
              <option value="Vasant Vihar">Vasant Vihar</option>
              <option value="Punjabi Bagh">Punjabi Bagh</option>
              <option value="Patel Nagar">Patel Nagar</option>
              <option value="Civil Lines">Civil Lines</option>
            </select>
          </div>

          {/* Home Police Station * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Police Station <span className="l30-req">*</span>
            </label>
            <select
              value={formData.homePoliceStation || "PARLIAMENT STREET"}
              onChange={(e) => handleFieldChange("homePoliceStation", e.target.value)}
              className="l30-input"
            >
              <option value="PARLIAMENT STREET">PARLIAMENT STREET</option>
              <option value="CHANAKYAPURI">CHANAKYAPURI</option>
              <option value="CONNAUGHT PLACE">CONNAUGHT PLACE</option>
              <option value="TILAK MARG">TILAK MARG</option>
              <option value="TUGHLAK ROAD">TUGHLAK ROAD</option>
            </select>
          </div>

          {/* Home PIN * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home PIN <span className="l30-req">*</span>
            </label>
            <input
              type="text"
              value={formData.homePin || ""}
              onChange={(e) => handleFieldChange("homePin", e.target.value)}
              className="l30-input"
              placeholder="110768"
            />
          </div>

          {/* Home Constituency Area * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Constituency Area <span className="l30-req">*</span>
            </label>
            <select
              value={formData.homeConstituency || "Delhi Cantonment"}
              onChange={(e) => handleFieldChange("homeConstituency", e.target.value)}
              className="l30-input"
            >
              <option value="Delhi Cantonment">Delhi Cantonment</option>
              <option value="New Delhi">New Delhi</option>
              <option value="RK Puram">RK Puram</option>
              <option value="Rajinder Nagar">Rajinder Nagar</option>
            </select>
          </div>

          {/* Home Ward Name */}
          <div className="l30-form-group">
            <label className="l30-form-label">Home Ward Name</label>
            <input
              type="text"
              value={formData.homeWardName || ""}
              onChange={(e) => handleFieldChange("homeWardName", e.target.value)}
              className="l30-input"
              placeholder="DWARKA C WARD NAME"
            />
          </div>

          {/* Home Email * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Email <span className="l30-req">*</span>
            </label>
            <input
              type="email"
              value={formData.homeEmail || ""}
              onChange={(e) => handleFieldChange("homeEmail", e.target.value)}
              className="l30-input"
              placeholder="gjm@gmail.com"
            />
          </div>

          {/* Home Mobile * */}
          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Mobile <span className="l30-req">*</span>
            </label>
            <input
              type="text"
              value={formData.homeMobile || ""}
              onChange={(e) => handleFieldChange("homeMobile", e.target.value)}
              className="l30-input"
              placeholder="6897554353"
            />
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
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="l30-btn-next"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
