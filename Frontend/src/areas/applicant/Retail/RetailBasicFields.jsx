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
   

     

      <br></br>

      <div>
        <h1 className="section-title">Details of Company/Firm/Society/LLP</h1>
      </div>

      <br></br>

      {/* Constitution Type */}
   

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
                // className={`reg-input uppercase font-mono font-bold text-slate-800 
                //   ${errors.CompanyFirmPANNo ? "error" : ""}
                //   `}
                className={`reg-input uppercase font-mono font-bold text-slate-800 `}
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

export default RetailBasicFields;
