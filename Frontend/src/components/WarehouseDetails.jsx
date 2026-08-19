import React from "react";
import "../Style/ApplyLicense.css";

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
  Mail, Phone, PhoneCall,
  FileText,
  Calendar,
  Clock3



 
} from "lucide-react";




const WarehouseDetails = ({
  applicant,
  states = [],
  districts = [],
  subDivisions = [],
  policeStations = [],
  onChange,
}) => {
  return (
    <div className="premium-form">

      {/* HEADER */}
      <div className="premium-header">
        <div className="icon-box">🏬</div>
        <div>
          <h2>Warehouse Details</h2>
          <p>Enter warehouse location & contact info</p>
        </div>
      </div>

      {/* ================= BASIC ================= */}

<div className="card-section">
  <h3>Basic Details</h3>

  <div className="form-grid">

    <div className="reg-field">
      <label className="reg-label">
        Warehouse Name <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Warehouse className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={applicant.warehouseName || ""}
          onChange={(e) => onChange("warehouseName", e.target.value)}
        />
      </div>
    </div>

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
      value={applicant.warehouseAddress1 || ""}
      onChange={(e) => onChange("warehouseAddress1", e.target.value)}
      placeholder="Enter Address Line 1"
    />
  </div>
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
      value={applicant.warehouseAddress2 || ""}
      onChange={(e) => onChange("warehouseAddress2", e.target.value)}
      placeholder="Enter Address Line 2"
    />
  </div>
</div>

    
  </div>
</div>






      {/* ================= LOCATION ================= */}
      <div className="card-section">
  <h3>Location Details</h3>

  <div className="form-grid">

    {/* State */}
    <div className="reg-field">
      <label className="reg-label">
        State <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <MapPinned className="w-4 h-4 text-blue-600" />
        </div>
{/* 
        <select
          className="reg-select"
          name="state"
           value={(applicant.warehouseState || "").trim()}
          onChange={(e) => onChange("warehouseState", e.target.value)}
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state.sid} value={state.stateCode}>
              {state.stateName}
            </option>
          ))}
        </select> */}
<select
  className="reg-select"
  name="state"
  value={String(applicant.warehouseState || "").trim()}
  onChange={(e) => onChange("warehouseState", e.target.value)}
>
  <option value="">Select State</option>

  {(Array.isArray(states) ? states : []).map((state) => (
<option
  key={state.sid}
  value={String(state.stateCode || "").trim()}
>
  {state.stateName}
</option>
  ))}
</select>
        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
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

        {/* <select
          className="reg-select"
          value={applicant.warehouseDistrict || ""}
          disabled={!applicant.warehouseState}
          onChange={(e) => onChange("warehouseDistrict", e.target.value)}
        >
          <option value="">Select District</option>

          {(districts || []).map((d) => (
            <option key={d.did} value={d.districtCode}>
              {d.districtName}
            </option>
          ))}
        </select> */}


<select
  className="reg-select"
  value={String(applicant.warehouseDistrict || "").trim()}
  disabled={!applicant.warehouseState}
  onChange={(e) =>
    onChange("warehouseDistrict", e.target.value)
  }
>
  <option value="">Select District</option>

  {Array.isArray(districts) &&
    districts.map((d) => (
      <option
        key={d.did}
        value={String(d.districtCode || "").trim()}
      >
        {d.districtName}
      </option>
    ))}
</select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
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
          value={applicant.warehousePin || ""}
          onChange={(e) =>
            onChange("warehousePin", e.target.value.replace(/\D/g, ""))
          }
          placeholder="Enter PIN Code"
        />
      </div>
    </div>

    {/* Sub Division */}
    <div className="reg-field">
      <label className="reg-label">
        Sub Division
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Map className="w-4 h-4 text-blue-600" />
        </div>

        {/* <select
          className="reg-select"
          value={applicant.WarehouseSubDivision || ""}
          onChange={(e) => onChange("WarehouseSubDivision", e.target.value)}
        >
          <option value="">Select Sub Division</option>

          {(subDivisions || []).map((s) => (
            <option
              key={s.subDivisionCode}
              value={s.subDivisionCode}
            >
              {s.subDivisionName}
            </option>
          ))}
        </select> */}


<select
  className="reg-select"
  value={String(applicant.warehouseSubDivision || "").trim()}
  onChange={(e) =>
    onChange("warehouseSubDivision", e.target.value)
  }
>
  <option value="">Select Sub Division</option>

  {(Array.isArray(subDivisions) ? subDivisions : []).map((s) => (
    <option
      key={s.dvid}
      value={String(s.subDivisionCode || "").trim()}
    >
      {s.subDivisionName}
    </option>
  ))}
</select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Police Station */}
    <div className="reg-field">
      <label className="reg-label">
        Police Station
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Shield className="w-4 h-4 text-blue-600" />
        </div>

        {/* <select
          className="reg-select"
          value={applicant.WarehousePoliceStation || ""}
          onChange={(e) => onChange("WarehousePoliceStation", e.target.value)}
        >
          <option value="">Select Police Station</option>

          {(policeStations || []).map((p) => (
            <option key={p.psCode} value={p.psCode}>
              {p.psName}
            </option>
          ))}
        </select> */}



        <select
  className="reg-select"
  value={String(applicant.warehousePoliceStation || "").trim()}
  onChange={(e) =>
    onChange("warehousePoliceStation", e.target.value)
  }
>
  <option value="">Select Police Station</option>

{(Array.isArray(policeStations) ? policeStations : []).map((p, index) => (
  <option
    key={`${String(p.psCode || "").trim()}-${index}`}
    value={String(p.psCode || "").trim()}
  >
    {p.psName}
  </option>
))}
</select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>

  </div>
</div>

      {/* ================= CONTACT ================= */}
     <div className="card-section">
  <h3>Contact Details</h3>

  <div className="form-grid">

    {/* Email */}
    <div className="reg-field">
      <label className="reg-label">
        Email
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Mail className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="email"
          className="reg-input"
          placeholder="Enter Email"
          value={applicant.warehouseEmail || ""}
          onChange={(e) =>
            onChange("warehouseEmail", e.target.value)
          }
        />
      </div>
    </div>

    {/* Mobile */}
    <div className="reg-field">
      <label className="reg-label">
        Mobile
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
          value={applicant.warehouseMobile || ""}
          onChange={(e) =>
            onChange(
              "warehouseMobile",
              e.target.value.replace(/\D/g, "")
            )
          }
        />
      </div>
    </div>

    {/* Landline */}
    <div className="reg-field">
      <label className="reg-label">
        Landline
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <PhoneCall className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          placeholder="Enter Landline Number"
          value={applicant.warehouseLandline || ""}
          onChange={(e) =>
            onChange(
              "warehouseLandline",
              e.target.value.replace(/\D/g, "")
            )
          }
        />
      </div>
    </div>

  </div>
</div>



<div className="card-section">
  <h3>Additional Details of Warehouse</h3>

  <div className="form-grid">

    {/* Whether License Premise */}
    <div className="reg-field">
      <label className="reg-label">
        Whether License Premise is
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>

        <select
          className="reg-select"
          value={applicant.leasePremise || ""}
          onChange={(e) => onChange("leasePremise", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Owned">Owned</option>
          <option value="Leased">Leased</option>
          <option value="Rented">Rented</option>
        </select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Lease Registration */}
    <div className="reg-field">
      <label className="reg-label">
        Registration No. of Lease Deed/ Sale Deed / Rent Agreement 
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={applicant.leaseRegistration || ""}
          onChange={(e) =>
            onChange("leaseRegistration", e.target.value)
          }
        />
      </div>
    </div>

    {/* Registration Date */}
    <div className="reg-field">
      <label className="reg-label">
        Date of Registration of Lease Deed/ Sale Deed / Rent Agreement 
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={applicant.leaseRegistrationDate || ""}
          onChange={(e) =>
            onChange("leaseRegistrationDate", e.target.value)
          }
        />
      </div>
    </div>

    {/* Expiration Date */}
    <div className="reg-field">
      <label className="reg-label">
        Date of Expiration of Lease Deed/ Sale Deed / Rent Agreement 
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={applicant.leaseRegistrationExpiryDate || ""}
          onChange={(e) =>
            onChange("leaseRegistrationExpiryDate", e.target.value)
          }
        />
      </div>
    </div>

    {/* Architect Registration */}
    <div className="reg-field">
      <label className="reg-label">
        Certified Architect Registration Number
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={applicant.architectRegistrationNo || ""}
          onChange={(e) =>
            onChange("architectRegistrationNo", e.target.value)
          }
        />
      </div>
    </div>

    {/* Architect Valid Upto */}
    <div className="reg-field">
      <label className="reg-label">
        Certified Architect Registration valid upto
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={applicant.architectRegistrationNoValidUpto || ""}
          onChange={(e) =>
            onChange(
              "architectRegistrationNoValidUpto",
              e.target.value
            )
          }
        />
      </div>
    </div>

    {/* Super Area */}
    <div className="reg-field">
      <label className="reg-label">
       Total Super Area of License Premise (in sq ft)
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          placeholder="Enter Super Area"
          value={applicant.superAreaofLicensePremise || ""}
          onChange={(e) =>
            onChange(
              "superAreaofLicensePremise",
              e.target.value.replace(/\D/g, "")
            )
          }
        />
      </div>
    </div>

    {/* Carpet Area */}
    <div className="reg-field">
      <label className="reg-label">
        Total Carpet Area of License Premise (in sq ft)
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          placeholder="Enter Carpet Area"
          value={applicant.carpetAreaofLicensePremise || ""}
          onChange={(e) =>
            onChange(
              "carpetAreaofLicensePremise",
              e.target.value.replace(/\D/g, "")
            )
          }
        />
      </div>
    </div>

    {/* Distance */}
    <div className="reg-field">
      <label className="reg-label">
       Distance of Distillery from Connaught Place,Delhi (in KM)
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <MapPinned className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          placeholder="Enter Distance"
          value={applicant.distanceofDistilleryCP || ""}
          onChange={(e) =>
            onChange(
              "distanceofDistilleryCP",
              e.target.value.replace(/\D/g, "")
            )
          }
        />
      </div>
    </div>

    {/* Hours of Sale */}
    <div className="reg-field">
      <label className="reg-label">
        Hours of Sale
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Clock3 className="w-4 h-4 text-blue-600" />
        </div>

 <select
  className="reg-select"
  value={applicant.hoursofSale || ""}
  onChange={(e) => onChange("hoursofSale", e.target.value)}
>
  <option value="">Select</option>
  <option value="9-5">9 AM - 5 PM</option>
  <option value="8-8">8 AM - 8 PM</option>
  <option value="10-6">10 AM - 6 PM</option>
</select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>

  </div>
</div>














    </div>
  );
};

/* REUSABLE FIELD */
const Field = ({ icon, label, children }) => (
  <div className="field floating">
    <div className="input-box">
      <span className="input-icon">{icon}</span>
      {children}
      <label>{label}</label>
    </div>
  </div>
);

export default WarehouseDetails;