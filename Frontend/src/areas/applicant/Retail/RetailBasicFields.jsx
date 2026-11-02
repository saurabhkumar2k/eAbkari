import { useEffect } from "react";

import {
  Warehouse,
  Building2,
  Home,
  User,
  ChevronDown,
  MapPinned,
  Hash,
  Map,
  Shield,
  Mail,
  Phone,
  PhoneCall,
  FileText,
  Calendar,
  Clock3,
  Store,
} from "lucide-react";

const RetailBasicFields = ({
  additionalFrom,
  onChange,
  //   starCategory,
  //   starCategoryRating,
  hoursOfSaleList,
  errors,
  ConstitutionType,
  states = [],
  districts = [],
  subDivisions = [],
  policeStations = [],
}) => {
  useEffect(() => {
    if (additionalFrom.starCategory === "N") {
      onChange("starCategoryRating", "");
    }
  }, [additionalFrom.starCategory]);

  return (
    <>
      {/* Number Of Club Member */}

      <div>
        <h1 className="section-title">Address of Owner of the Premise</h1>
      </div>

      <br></br>

      <div className="reg-field">
        <label className="reg-label">
          Address Line 1 <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Home className="w-4 h-4 text-blue-600" />
          </div>

          <input
            type="text"
            className="reg-input"
            value={additionalFrom.OwnerPremiseAddress1}
            onChange={(e) => onChange("OwnerPremiseAddress1", e.target.value)}
            placeholder="Enter Address Line 1"
          />
        </div>
        {errors.OwnerPremiseAddress1 && (
          <p className="error-text">{errors.OwnerPremiseAddress1}</p>
        )}
      </div>

      <div className="reg-field">
        <label className="reg-label">
          Address Line 2 <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Home className="w-4 h-4 text-blue-600" />
          </div>

          <input
            type="text"
            className="reg-input"
            value={additionalFrom.OwnerPremiseAddress2}
            onChange={(e) => onChange("OwnerPremiseAddress2", e.target.value)}
            placeholder="Enter Address Line 2"
          />
        </div>
        {errors.OwnerPremiseAddress2 && (
          <p className="error-text">{errors.OwnerPremiseAddress2}</p>
        )}
      </div>

      {/* State */}
      <div className="reg-field">
        <label className="reg-label">
          State <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinned className="w-4 h-4 text-blue-600" />
          </div>

          <select
            className="reg-select"
            name="OwnerPremiseState"
            value={additionalFrom.OwnerPremiseState}
            onChange={(e) =>
              onChange("OwnerPremiseState", e.target.value.trim())
            }
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state.sid} value={state.stateCode.trim()}>
                {state.stateName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {errors.OwnerPremiseState && (
          <p className="error-text">{errors.OwnerPremiseState}</p>
        )}
      </div>

      {/* District */}
      <div className="reg-field">
        <label className="reg-label">
          District <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>

          <select
            className="reg-select"
            value={additionalFrom.OwnerPremiseDistrict}
            disabled={!additionalFrom.OwnerPremiseState}
            onChange={(e) => onChange("OwnerPremiseDistrict", e.target.value)}
          >
            <option value="">Select District</option>

            {(districts || []).map((d) => (
              <option key={d.did} value={d.districtCode.trim()}>
                {d.districtName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {errors.OwnerPremiseDistrict && (
          <p className="error-text">{errors.OwnerPremiseDistrict}</p>
        )}
      </div>

      {/* Sub Division */}
      <div className="reg-field">
        <label className="reg-label">
          Sub Division <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Map className="w-4 h-4 text-blue-600" />
          </div>

          <select
            className="reg-select"
            value={additionalFrom.OwnerPremiseSubDivisionCode}
            onChange={(e) =>
              onChange("OwnerPremiseSubDivisionCode", e.target.value)
            }
          >
            <option value="">Select Sub Division</option>

            {(subDivisions || []).map((s) => (
              <option key={s.subDivisionCode} value={s.subDivisionCode.trim()}>
                {s.subDivisionName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {errors.OwnerPremiseSubDivisionCode && (
          <p className="error-text">{errors.OwnerPremiseSubDivisionCode}</p>
        )}
      </div>

      {/* Police Station */}
      <div className="reg-field">
        <label className="reg-label">
          Police Station <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Shield className="w-4 h-4 text-blue-600" />
          </div>

          <select
            className="reg-select"
            value={additionalFrom.OwnerPremisePSCode || ""}
            onChange={(e) => onChange("OwnerPremisePSCode", e.target.value)}
          >
            <option value="">Select Police Station</option>

            {(policeStations || []).map((p) => (
              <option key={p.psCode} value={p.psCode.trim()}>
                {p.psName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {errors.OwnerPremisePSCode && (
          <p className="error-text">{errors.OwnerPremisePSCode}</p>
        )}
      </div>

      {/* PIN */}
      <div className="reg-field">
        <label className="reg-label">
          PIN Code <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Hash className="w-4 h-4 text-blue-600" />
          </div>

          <input
            type="text"
            className="reg-input"
            maxLength={6}
            value={additionalFrom.OwnerPremisePin}
            onChange={(e) =>
              onChange("OwnerPremisePin", e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter PIN Code"
          />
        </div>
        {errors.OwnerPremisePin && (
          <p className="error-text">{errors.OwnerPremisePin}</p>
        )}
      </div>

      {/* Mobile */}
      <div className="reg-field">
        <label className="reg-label">
          Mobile <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <Phone className="w-4 h-4 text-blue-600" />
          </div>

          <input
            type="text"
            className="reg-input"
            maxLength={10}
            placeholder="Enter Mobile Number"
            value={additionalFrom.OwnerPremiseMobile}
            onChange={(e) =>
              onChange("OwnerPremiseMobile", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
        {errors.OwnerPremiseMobile && (
          <p className="error-text">{errors.OwnerPremiseMobile}</p>
        )}
      </div>

      <br></br>

      <div>
        <h1 className="section-title">
          Measurement of Carpet Area of Premises in feet
        </h1>
      </div>

      {/* Length */}
      <div className="reg-field">
        <label className="reg-label">
          Length (Ft) <span className="required">*</span>
        </label>

        <input
          type="text"
          className="reg-input"
          maxLength={6}
          placeholder="Enter Premise Length"
          value={additionalFrom.ProposedPremiseLength ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            // Allow numbers and one decimal point
            if (/^\d{0,3}(\.\d{0,2})?$/.test(value) || value === "") {
              onChange("ProposedPremiseLength", value);
            }
          }}
        />
      </div>

      {/* Breadth */}
      <div className="reg-field">
        <length className="reg-label">
          Breadth(Ft) <span className="required">*</span>
        </length>

        <input
          type="text"
          className="reg-input"
          maxLength={6}
          placeholder="Enter Premise Breadth"
          value={additionalFrom.ProposedPremiseBreath ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            // Allow numbers and one decimal point
            if (/^\d{0,3}(\.\d{0,2})?$/.test(value) || value === "") {
              onChange("ProposedPremiseBreath", value);
            }
          }}
        />
      </div>

      {/* Height */}
      <div className="reg-field">
        <length className="reg-label">
          Height(Ft) <span className="required">*</span>
        </length>

        <input
          type="text"
          className="reg-input"
          maxLength={2}
          placeholder="Enter Premise Height"
          value={additionalFrom.ProposedPremiseHeight}
          onChange={(e) => onChange("ProposedPremiseHeight", e.target.value)}
        />
      </div>

      {/* Total Area */}
      <div className="reg-field">
        <label className="reg-label">
          Total Area (in Sq Ft) <span className="required">*</span>
        </label>

        <input
          type="text"
          className="reg-input"
          maxLength={10}
          placeholder="Enter Premise Total Area"
          value={additionalFrom.ProposedPremiseTotalArea ?? ""}
          readOnly
        />
      </div>

      <br></br>
    </>
  );
};

export default RetailBasicFields;
