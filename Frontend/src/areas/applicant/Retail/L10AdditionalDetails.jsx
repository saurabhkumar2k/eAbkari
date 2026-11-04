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

const L10AdditionalDetails = ({
  additionalFrom,
  onChange,
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
      {/*  Lease/ Rent/ Other Agreement */}
      <div className="reg-field">
        <label className="reg-label">
          Details of (Lease/ Rent/ Other Agreement) regarding the Proposed
          Premises (With Documentary Proof) <span className="required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon"></div>

          {/* <input
            type="text"
            className="reg-input"
            value={additionalFrom.OwnerPremiseAddress1}
            onChange={(e) => onChange("OwnerPremiseAddress1", e.target.value)}
            placeholder="Enter Address Line 1"
          /> */}
          <select
            className="reg-input"
            //value={RetailPropDetails.NameOfthe || "0"}
            onChange={(e) => onChange(index, "NameOfthe", e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">Other Agreemen</option>
            <option value="2">Lease</option>
            <option value="3">Rent</option>
          </select>
        </div>
        {errors.OwnerPremiseAddress1 && (
          <p className="error-text">{errors.OwnerPremiseAddress1}</p>
        )}
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

export default L10AdditionalDetails;
