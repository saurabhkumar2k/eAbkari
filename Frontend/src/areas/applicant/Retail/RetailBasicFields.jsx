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
            value={additionalFrom.SiteAddress}
            onChange={(e) => onChange("SiteAddress", e.target.value)}
            placeholder="Enter Address Line 1"
          />
        </div>
        {errors.SiteAddress && (
          <p className="error-text">{errors.SiteAddress}</p>
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
            value={additionalFrom.SiteAddress2}
            onChange={(e) => onChange("SiteAddress2", e.target.value)}
            placeholder="Enter Address Line 2"
          />
        </div>
        {errors.SiteAddress2 && (
          <p className="error-text">{errors.SiteAddress2}</p>
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
            name="state"
            value={additionalFrom.State}
            onChange={(e) => onChange("State", e.target.value.trim())}
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
        {errors.State && <p className="error-text">{errors.State}</p>}
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
            value={additionalFrom.DistrictCode}
            disabled={!additionalFrom.State}
            onChange={(e) => onChange("DistrictCode", e.target.value)}
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
        {errors.DistrictCode && (
          <p className="error-text">{errors.DistrictCode}</p>
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
            value={additionalFrom.SubDivisionCode}
            onChange={(e) => onChange("SubDivisionCode", e.target.value)}
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
        {errors.SubDivisionCode && (
          <p className="error-text">{errors.SubDivisionCode}</p>
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
            value={additionalFrom.PoliceStationCode || ""}
            onChange={(e) => onChange("PoliceStationCode", e.target.value)}
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
        {errors.PoliceStationCode && (
          <p className="error-text">{errors.PoliceStationCode}</p>
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
            value={additionalFrom.SitePin}
            onChange={(e) =>
              onChange("SitePin", e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter PIN Code"
          />
        </div>
        {errors.SitePin && <p className="error-text">{errors.SitePin}</p>}
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
            value={additionalFrom.SiteMobile}
            onChange={(e) =>
              onChange("SiteMobile", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
        {errors.SiteMobile && <p className="error-text">{errors.SiteMobile}</p>}
      </div>

      <br></br>

      <div>
        <h1 className="section-title">
          Measurement of Carpet Area of Premises in feet
        </h1>
      </div>

      <div className="reg-field">
        <label className="reg-label">
          Length(Ft) <span className="required">*</span>
        </label>

        <input
          type="text"
          className="reg-input"
          maxLength={3}
          placeholder="Enter Premise Length"
          value={additionalFrom.hoursOfSaleList}
          onChange={(e) => onChange("hoursOfSaleList", e.target.value())}
        />
      </div>

      <div className="reg-field">
        <length className="reg-label">
          Breadth(Ft) <span className="required">*</span>
        </length>

        <input
          type="text"
          className="reg-input"
          maxLength={3}
          placeholder="Enter Premise Breadth"
          value={additionalFrom.hoursOfSaleList}
          onChange={(e) => onChange("hoursOfSaleList", e.target.value())}
        />
      </div>
      <div className="reg-field">
        <length className="reg-label">
          Height(Ft)  <span className="required">*</span>
        </length>

        <input
          type="text"
          className="reg-input"
          maxLength={3}
          placeholder="Enter Premise Height"
          value={additionalFrom.hoursOfSaleList}
          onChange={(e) => onChange("hoursOfSaleList", e.target.value())}
        />
      </div>

      <div className="reg-field">
        <length className="reg-label">
          Total Area(in Sq Ft) <span className="required">*</span>
        </length>

        <input
          type="text"
          className="reg-input"
          maxLength={3}
          placeholder="Enter Premise Total Area"
          value={additionalFrom.hoursOfSaleList}
          onChange={(e) => onChange("hoursOfSaleList", e.target.value())}
        />
      </div>

      <br></br>
    </>
  );
};

export default RetailBasicFields;
