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

const HCRHCRBasicFieldsL28 = ({
  additionalFrom,
  onChange,
//   starCategory,
//   starCategoryRating,
  hoursOfSaleList,
  errors,
  ConstitutionType
}) => {
  useEffect(() => {
    if (additionalFrom.starCategory === "N") {
      onChange("starCategoryRating", "");
    }
  }, [additionalFrom.starCategory]);

  return (
    <>
      {/* Number Of Club Member */}
      <div className="form-group">
        <label className="hcr-form-label">
          Number Of Club Member
          <span className="required">*</span>
        </label>

        <input
          type="number"
          placeholder="Number Of Club Member"
          value={additionalFrom.numberOfClubMember || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              onChange("numberOfClubMember", value);
            }
          }}
          maxLength={3}
          className="input-box"
        />
        <div className="error-text-container">
          {errors?.numberOfClubMember && (
            <span className="error-text-all">{errors?.numberOfClubMember}</span>
          )}
        </div>
      </div>

      {/* Hour of Sale */}
      <div className="form-group">
        <label className="hcr-form-label">
          Hour of Sale
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.hourOfSale || ""}
          onChange={(e) => onChange("hourOfSale", e.target.value)}
          className="input-box"
        >
          <option value="">Select Hour of Sale</option>
          <option value="1">11 AM - 2:30 PM & 7 PM - 12 AM</option>        
          {hoursOfSaleList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {errors.hourOfSale && <p className="error-text">{errors.hourOfSale}</p>}
      </div>

      {/* Club Area */}
      <div className="form-group">
        <label className="hcr-form-label">
          Club Area (in sq Mtrs) as Per MCD/NDMC License
        </label>
        <input
          type="number"
          placeholder="Club Area"
          value={additionalFrom.totalArea || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              onChange("totalArea", value);
            }
          }}
          maxLength={3}
          className="input-box"
        />
        <div className="error-text-container">
          {errors?.totalArea && (
            <span className="error-text-all">{errors?.totalArea}</span>
          )}
        </div>
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
              value="1"
              checked={additionalFrom.educationalInsDist === "1"}
              onChange={(e) => onChange("educationalInsDist", e.target.value)}
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="eduInsDistance"
              value="2"
              checked={additionalFrom.educationalInsDist === "2"}
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
              value="1"
              checked={additionalFrom.religiousPlaceDist === "1"}
              onChange={(e) => onChange("religiousPlaceDist", e.target.value)}
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="religiousPlaceDistance"
              value="2"
              checked={additionalFrom.religiousPlaceDist === "2"}
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

      <br></br>

      <div>
        <h1 className="section-title">Details of Company/Firm/Society/LLP</h1>
      </div>

      <br></br>

      {/* Constitution Type */}
      <div className="form-group">
        <label className="hcr-form-label">
          Constitution Type
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.ConstitutionType || ""}
          onChange={(e) => onChange("ConstitutionType", e.target.value)}
          className="input-box"
        >
          <option value="">--Select--</option>
          <option value="1">Company</option>
          <option value="2">Partnership Firm</option>
          <option value="3">LLP</option>
          <option value="4">Proprietorship Firm</option>
          <option value="5">Cooperative Society</option>
          
          {ConstitutionType.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="error-text-container">
          {errors?.ConstitutionType && (
            <span className="error-text-all">{errors?.ConstitutionType}</span>
          )}
        </div>
      </div>

      {/* CIN No */}
      {additionalFrom.ConstitutionType === "1" && (
        <div className="form-group">
          <label className="hcr-form-label">
            CIN No
            <span className="required">*</span>
          </label>

          <input
          type="text"
          inputMode="number"
          placeholder="CIN No"
          value={additionalFrom.CINNo || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              onChange("CINNo", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
           <div className="error-text-container">
          {errors?.CINNo && (
            <span className="error-text-all">{errors?.CINNo}</span>
          )}
        </div>
        </div>
      )}

      {/* Company Firm PAN No */}
      <div className="reg-field">
        <label className="reg-label">Company Firm PAN No<span className="required">*</span></label>

        <div className="reg-input-group">

          <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                className={`reg-input uppercase font-mono font-bold text-slate-800 ${
                  errors.CompanyFirmPANNo ? "error" : ""
                }`}
                value={additionalFrom.CompanyFirmPANNo || ""}
                onChange={(e) =>
                  onChange("CompanyFirmPANNo", e.target.value.toUpperCase())
                }
                
              />
        </div>
        {errors.CompanyFirmPANNo && <p className="error-text">{errors.CompanyFirmPANNo}</p>}
      </div>
    </>
  );
};

export default HCRHCRBasicFieldsL28;
