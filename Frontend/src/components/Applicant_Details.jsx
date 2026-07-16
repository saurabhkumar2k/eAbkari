import React from "react";

// import "./../Style/ApplicantDetails.css";

//import "../Style/ApplyLicense.css";
import {
  User,
  Calendar,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building,
  Hash,
  Compass,
    Home,
  MapPinned,
  Building2,
  ChevronDown,
  PhoneCall
} from "lucide-react";


const ApplicantDetails = ({
  applicant,
  states = [],
  districts = [],
  subDivisions = [],
  onChange,
}) => {


console.log("Applicant District:", applicant.district);
console.log("Districts:", districts);
console.log("SubDivisions:", subDivisions);

{console.log("Applicant SubDivision:", applicant.subDivision)}
{console.log("SubDivisions:", subDivisions)}

console.log(typeof applicant.subDivision, applicant.subDivision);
console.log(typeof subDivisions[0]?.subDivisionCode, subDivisions[0]?.subDivisionCode);


districts?.forEach((d) =>
  console.log(
    typeof d.districtCode,
    d.districtCode
  )
);

subDivisions?.forEach((s) =>
  console.log(
    typeof s.subDivisionCode,
    s.subDivisionCode
  )
);


  return (
    <div className="premium-form">

      {/* HEADER */}
    <div className="info-banner">
  <div className="info-banner-icon">
    👤
  </div>

  <div>
    <h4 className="info-banner-title">
      Applicant Profile Information
    </h4>

    <p className="info-banner-text">
      These applicant details are fetched automatically from the registration
      records. You can review the information below.
    </p>
  </div>
</div>

      {/* ================= BASIC ================= */}
<div className="form-section">

       <div className="section-header">

  <h3 className="section-title">
    <span className="section-number">1</span>
    Personal Details
  </h3>

  <p className="section-description">
    Basic information of the applicant
  </p>

</div>

  <div className="form-grid">

           <div className="reg-field">

      <label className="reg-label label-title">
    Applicant Name <span className="required">*</span>
  </label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <User className="w-4 h-4 text-blue-600" />
    </div>

    <input
      className="reg-input"
      value={applicant.applicantName || ""}
      disabled
    />

    
  </div>
</div>

       <div className="reg-field">
  <label className="reg-label label-title">
    Date of Birth <span className="required">*</span>
  </label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <Calendar className="w-4 h-4 text-blue-600" />
    </div>

    <input
      type="date"
      className="reg-input"
      value={applicant.dateOfBirth || ""}
      disabled
    />
  </div>
</div>

       <div className="reg-field">
  <label className="reg-label label-title flex items-center">
    <span>Father / Husband Name</span>
    <span className="required">*</span>
  </label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <User className="w-4 h-4 text-blue-600" />
    </div>

    <input
      type="text"
      className="reg-input"
      value={applicant.fatherHusbandName || ""}
      disabled
    />
  </div>

</div>

<div className="reg-field">
  <label className="reg-label label-title flex items-center">
    <span>Occupation</span>
  </label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <Briefcase className="w-4 h-4 text-blue-600" />
    </div>

    <input
      type="text"
      className="reg-input"
      value={applicant.occupation || ""}
      disabled
    />
  </div>
</div>
   
<div className="reg-field">
  <label className="reg-label label-title flex items-center">
    <span>PAN No</span>
    <span className="required">*</span>
  </label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <FileText className="w-4 h-4 text-blue-600" />
    </div>

    <input
      type="text"
      className="reg-input"
      value={applicant.panNo || ""}
      disabled
    />
  </div>
</div>


  </div>

</div>


     

      {/* ================= ADDRESS ================= */}
     <div className="form-section">
  <div className="section-header">
    <h3 className="section-title">
      <span className="section-number">2</span>
      Address Information
    </h3>
    <p className="section-description">
      Registered address of the applicant
    </p>
  </div>

  <div className="form-grid">

    {/* Address Line 1 */}
    <div className="reg-field">
      <label className="reg-label label-title">
        Address Line 1 <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Home className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={applicant.addressLine1 || ""}
          disabled
        />
      </div>
    </div>

    {/* Address Line 2 */}
    <div className="reg-field">
      <label className="reg-label label-title">
        Address Line 2
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <MapPin className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={applicant.addressLine2 || ""}
          disabled
        />
      </div>
    </div>

    {/* State */}
    <div className="reg-field">
      <label className="reg-label label-title">
        State <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>

        <select
          className="reg-select"
          value={applicant.stateUT?.trim() || ""}
          disabled
        >
          <option value="">Select State</option>

          {states.map((s) => (
            <option
              key={s.stateCode}
              value={s.stateCode?.trim()}
            >
              {s.stateName}
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
      <label className="reg-label label-title">
        District <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <MapPinned className="w-4 h-4 text-blue-600" />
        </div>

        <select
          className="reg-select"
          value={applicant.district?.trim() || ""}
          disabled
        >
          <option value="">Select District</option>

          {districts.map((d) => (
            <option
              key={d.did}
              value={d.districtCode?.trim()}
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

    {/* Sub Division */}
    <div className="reg-field">
      <label className="reg-label label-title">
        Sub Division <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <MapPinned className="w-4 h-4 text-blue-600" />
        </div>

        <select
          className="reg-select"
          value={String(applicant.subDivision ?? "").trim()}
          disabled
        >
          <option value="">Select Sub Division</option>

          {subDivisions.map((s) => (
            <option
              key={s.dvid}
              value={String(s.subDivisionCode).trim()}
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

    {/* PIN */}
    <div className="reg-field">
      <label className="reg-label label-title">
        PIN Code <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Hash className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          maxLength={6}
          value={applicant.pin || ""}
          disabled
        />
      </div>
    </div>

  </div>
</div>

      {/* ================= CONTACT ================= */}
    <div className="form-section">
  <div className="section-header">
    <h3 className="section-title">
      Contact Information
    </h3>
    <p className="section-description">
      Applicant contact details
    </p>
  </div>

  <div className="form-grid">

    {/* Email */}
    <div className="reg-field">
      <label className="reg-label label-title flex items-center">
        <span>Email</span>
        <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Mail className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="email"
          className="reg-input"
          value={applicant.email || ""}
          disabled
        />
      </div>
    </div>

    {/* Mobile */}
    <div className="reg-field">
      <label className="reg-label label-title flex items-center">
        <span>Mobile No</span>
        <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Phone className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          maxLength={10}
          className="reg-input"
          value={applicant.mobile || ""}
          disabled
        />
      </div>
    </div>

    {/* Landline */}
    {/* <div className="reg-field">
      <label className="reg-label label-title">
        Landline
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <PhoneCall className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          maxLength={10}
          className="reg-input"
          value={applicant.landline || ""}
          disabled
        />
      </div>
    </div> */}

  </div>
</div>
    </div>
  );
};

/* 🔥 REUSABLE FIELD COMPONENT */
const Field = ({ icon, label, children }) => (
  <div className="field floating">
    <div className="input-box">
      <span className="input-icon">{icon}</span>
      {children}
      <label>{label}</label>
    </div>
  </div>
);

export default ApplicantDetails;