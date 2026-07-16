import React from "react";
import { Info } from "lucide-react";

export default function Step1PremiseDetails({
  premiseName,
  setPremiseName,
  premiseType,
  setPremiseType,
  numHalls,
  setNumHalls,
  ownershipType,
  setOwnershipType,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  stateName,
  setStateName,
  district,
  setDistrict,
  policeStation,
  setPoliceStation,
  pinCode,
  setPinCode,
  ownerFirstName,
  setOwnerFirstName,
  ownerLastName,
  setOwnerLastName,
  mobileNumber,
  setMobileNumber,
  emailId,
  setEmailId,
  panNumber,
  setPanNumber,
  gstNumber,
  setGstNumber,
  districts,
  policeStations
}) {
  return (
    <div className="premise-card-body">
      <div className="premise-card-header">
        <div>
          <h3 className="premise-card-title-text">Step 1: Premise Details (Single Premise)</h3>
          <p className="premise-card-subtitle-text">Please provide the basic details of the premise and applicant.</p>
        </div>
        <div className="premise-mandatory-badge">
          <Info className="premise-help-icon" />
          <span>Fields marked with <span className="premise-mandatory-star">*</span> are mandatory</span>
        </div>
      </div>

      {/* Part 1: Basic Premise Information */}
      <div className="premise-section">
        <h4 className="premise-section-heading">
          1. Basic Premise Information
        </h4>
        
        <div className="premise-grid-4">
          
          {/* Premise Name */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              Premise Name <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter premise name"
              value={premiseName}
              onChange={(e) => setPremiseName(e.target.value)}
              className="premise-input"
              required
            />
          </div>

          {/* Premise Type */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              Premise Type <span className="premise-mandatory-star">*</span>
            </label>
            <select
              value={premiseType}
              onChange={(e) => setPremiseType(e.target.value)}
              className="premise-select"
              required
            >
              <option value="">-- Select Premise Type --</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Party Hall">Party Hall</option>
              <option value="Farmhouse">Farmhouse</option>
            </select>
            
            {/* Interactive Radio selectors beneath */}
            <div className="premise-radio-group">
              {["Banquet Hall", "Party Hall", "Farmhouse"].map((t) => (
                <label key={t} className="premise-radio-label">
                  <input
                    type="radio"
                    name="premiseTypeRadios"
                    checked={premiseType === t}
                    onChange={() => setPremiseType(t)}
                    className="premise-radio-input"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Number of Halls in Premise */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              Number of Halls in Premise <span className="premise-mandatory-star">*</span>
            </label>
            <div className="premise-number-wrapper">
              <input
                type="number"
                min="1"
                max="10"
                value={numHalls}
                onChange={(e) => setNumHalls(Math.max(1, parseInt(e.target.value) || 1))}
                className="premise-input"
                required
              />
              <div className="premise-number-arrows">
                <button 
                  type="button" 
                  onClick={() => setNumHalls(p => p + 1)} 
                  className="premise-arrow-btn"
                >
                  ▲
                </button>
                <button 
                  type="button" 
                  onClick={() => setNumHalls(p => Math.max(1, p - 1))} 
                  className="premise-arrow-btn"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Ownership Type */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              Ownership Type <span className="premise-mandatory-star">*</span>
            </label>
            <div className="premise-radio-group">
              {["Owned", "Rented"].map((o) => (
                <label key={o} className="premise-radio-label-lg">
                  <input
                    type="radio"
                    name="ownershipType"
                    value={o}
                    checked={ownershipType === o}
                    onChange={(e) => setOwnershipType(e.target.value)}
                    className="premise-radio-input"
                  />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Part 2: Premise Address */}
      <div className="premise-section">
        <h4 className="premise-section-heading">
          2. Premise Address
        </h4>

        <div className="premise-grid-4">
          
          {/* Address Line 1 */}
          <div className="premise-col-span-2 premise-form-group">
            <label className="premise-label">
              Address Line 1 <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter address line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="premise-input"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div className="premise-col-span-2 premise-form-group">
            <label className="premise-label">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter address line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="premise-input"
            />
          </div>

          {/* State */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              State <span className="premise-mandatory-star">*</span>
            </label>
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="premise-select"
              required
            >
              <option value="">-- Select State --</option>
              <option value="Delhi">Delhi (NCT)</option>
            </select>
          </div>

          {/* District */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              District <span className="premise-mandatory-star">*</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="premise-select"
              required
            >
              <option value="">-- Select District --</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Police Station */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              Police Station <span className="premise-mandatory-star">*</span>
            </label>
            <select
              value={policeStation}
              onChange={(e) => setPoliceStation(e.target.value)}
              className="premise-select"
              required
            >
              <option value="">-- Select Police Station --</option>
              {policeStations.map((ps) => (
                <option key={ps} value={ps}>{ps}</option>
              ))}
            </select>
          </div>

          {/* PIN Code */}
          <div className="premise-col-span-1 premise-form-group">
            <label className="premise-label">
              PIN Code <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6 digit PIN code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
              className="premise-input"
              required
            />
          </div>

        </div>
      </div>

      {/* Part 3: Applicant Information */}
      <div className="premise-section">
        <h4 className="premise-section-heading">
          3. Applicant Information
        </h4>

        <div className="premise-grid-4">
          
          {/* First Name */}
          <div className="premise-form-group">
            <label className="premise-label">
              First Name of Owner <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={ownerFirstName}
              onChange={(e) => setOwnerFirstName(e.target.value)}
              className="premise-input"
              required
            />
          </div>

          {/* Last Name */}
          <div className="premise-form-group">
            <label className="premise-label">
              Last Name of Owner <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={ownerLastName}
              onChange={(e) => setOwnerLastName(e.target.value)}
              className="premise-input"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="premise-form-group">
            <label className="premise-label">
              Mobile Number <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              maxLength={10}
              placeholder="Enter 10 digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              className="premise-input"
              required
            />
          </div>

          {/* Email ID */}
          <div className="premise-form-group">
            <label className="premise-label">
              Email ID <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="premise-input"
              required
            />
          </div>

        </div>
      </div>

      {/* Part 4: Tax Information */}
      <div className="premise-section">
        <h4 className="premise-section-heading">
          4. Tax Information
        </h4>

        <div className="premise-grid-2">
          
          {/* PAN Number */}
          <div className="premise-form-group">
            <label className="premise-label">
              PAN Number <span className="premise-mandatory-star">*</span>
            </label>
            <input
              type="text"
              maxLength={10}
              placeholder="Enter PAN number"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.toUpperCase())}
              className="premise-input premise-input-mono"
              required
            />
          </div>

          {/* GST Number */}
          <div className="premise-form-group">
            <label className="premise-label">
              GST Number (Optional)
            </label>
            <input
              type="text"
              maxLength={15}
              placeholder="Enter GST number (if applicable)"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.toUpperCase())}
              className="premise-input premise-input-mono"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
