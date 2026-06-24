import React from "react";

// import "./../Style/ApplicantDetails.css";

import "../Style/ApplyLicense.css";

const ApplicantDetails = ({
  applicant,
  states = [],
  districts = [],
  onChange,
}) => {


console.log("Applicant District:", applicant.district);
console.log("Districts:", districts);

districts?.forEach((d) =>
  console.log(
    typeof d.districtCode,
    d.districtCode
  )
);


  return (
    <div className="premium-form">

      {/* HEADER */}
      <div className="premium-header">
        <div className="icon-box">👤</div>
        <div>
          <h2>Applicant Details</h2>
          <p>Enter personal and contact information</p>
        </div>
      </div>

      {/* ================= BASIC ================= */}
      <div className="card-section">
        <h3>Basic Information</h3>

        <div className="grid-3">

          <Field icon="👤" label="Applicant Name *">
        <input
  value={applicant.applicantName || ""}
  disabled
/>
          </Field>

          {/* <Field icon="🏢" label="Company / Firm Name *">
            <input
              placeholder=" "
              value={applicant.CompanyName || ""}
              onChange={(e) => onChange("CompanyName", e.target.value)}
            />
          </Field> */}

          <Field icon="📅" label="Date of Birth *">
            <input
              type="date"
              value={applicant.dateOfBirth || ""}
              disabled
            />
          </Field>

          <Field icon="👨" label="Father / Husband Name *">
            <input
              value={applicant.fatherHusbandName || ""}
              disabled
            />
          </Field>

          <Field icon="💼" label="Occupation">
            <input
              placeholder=" "
              value={applicant.occupation || ""}
              disabled
            />
          </Field>

          <Field icon="🪪" label="PAN No *">
            <input
              placeholder=" "
              value={applicant.panNo || ""}
              disabled
               
              
            />
          </Field>

        </div>
      </div>

      {/* ================= ADDRESS ================= */}
      <div className="card-section address-box">
        <h3>📍 Address Information</h3>

        <div className="grid-1">

          <Field icon="🏠" label="Address Line 1 *">
            <input
              value={applicant.addressLine1 || ""}
              disabled
            />
          </Field>

          <Field icon="📍" label="Address Line 2">
            <input
              value={applicant.addressLine2 || ""}
              disabled
            />
          </Field>

        </div>

        <div className="grid-3">

          <Field icon="🌏" label="State *">
{/* <select
  name="state"
  value={applicant.stateUT || ""}
  onChange={(e) => onChange("stateUT", e.target.value)}
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option key={state.sid} value={state.stateCode}>
      {state.stateName}
    </option>
  ))}
</select> */}

<select
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





          </Field>

          <Field icon="🏙️" label="District *">
 {/* <select
  value={applicant.district || ""}
  disabled={!applicant.stateUT}
  onChange={(e) => onChange("district", e.target.value)}
>
  <option value="">Select District</option>

  {(districts || []).map((d) => (
  <option key={d.did} value={d.districtCode}>
  {d.districtName}
</option>
  ))}
</select> */}

<select
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
          </Field>

          <Field icon="📮" label="PIN Code *">
            <input
              maxLength={6}
              placeholder=" "
              value={applicant.pin || ""}
              disabled
              
            />
          </Field>

        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="card-section contact-box">
        <h3>📞 Contact Information</h3>

        <div className="grid-3">

          <Field icon="📧" label="Email *">
            <input
              type="email"
              placeholder=" "
              value={applicant.email || ""}
              disabled
            />
          </Field>

          <Field icon="📱" label="Mobile No *">
            <input
              maxLength={10}
              placeholder=" "
              value={applicant.mobile || ""}
                disabled
              
            />
          </Field>

          <Field icon="☎️" label="Landline">
            <input
              maxLength={10}
              placeholder=" "
              value={applicant.landline || ""}
              disabled
              
            />
          </Field>

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