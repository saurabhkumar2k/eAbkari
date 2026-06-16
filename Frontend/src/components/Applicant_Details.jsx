import React from "react";

// import "./../Style/ApplicantDetails.css";

import "../Style/ApplyLicense.css";

const ApplicantDetails = ({
  applicant,
  states = [],
  districts = [],
  onChange,
}) => {
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
              placeholder=" "
              value={applicant.ApplicantName || ""}
              onChange={(e) => onChange("ApplicantName", e.target.value)}
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
              placeholder=" "
              value={applicant.dob || ""}
              onChange={(e) => onChange("dob", e.target.value)}
            />
          </Field>

          <Field icon="👨" label="Father / Husband Name *">
            <input
              placeholder=" "
              value={applicant.FatherHusbandName || ""}
              onChange={(e) => onChange("FatherHusbandName", e.target.value)}
            />
          </Field>

          <Field icon="💼" label="Occupation">
            <input
              placeholder=" "
              value={applicant.Occupation || ""}
              onChange={(e) => onChange("Occupation", e.target.value)}
            />
          </Field>

          <Field icon="🪪" label="PAN No *">
            <input
              placeholder=" "
              value={applicant.panNo || ""}
              onChange={(e) =>
                onChange("panNo", e.target.value.toUpperCase())
              }
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
              placeholder=" "
              value={applicant.PresentAddress || ""}
              onChange={(e) => onChange("PresentAddress", e.target.value)}
            />
          </Field>

          <Field icon="📍" label="Address Line 2">
            <input
              placeholder=" "
              value={applicant.PermanentAddress || ""}
              onChange={(e) => onChange("PermanentAddress", e.target.value)}
            />
          </Field>

        </div>

        <div className="grid-3">

          <Field icon="🌏" label="State *">
<select
  name="state"
  value={applicant.StateUT || ""}
  onChange={(e) => onChange("StateUT", e.target.value)}
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option key={state.sid} value={state.stateCode}>
      {state.stateName}
    </option>
  ))}
</select>







          </Field>

          <Field icon="🏙️" label="District *">
 <select
  value={applicant.district || ""}
  disabled={!applicant.StateUT}
  onChange={(e) => onChange("district", e.target.value)}
>
  <option value="">Select District</option>

  {(districts || []).map((d) => (
  <option key={d.did} value={d.districtCode}>
  {d.districtName}
</option>
  ))}
</select>
          </Field>

          <Field icon="📮" label="PIN Code *">
            <input
              maxLength={6}
              placeholder=" "
              value={applicant.PIN || ""}
              onChange={(e) =>
                onChange("PIN", e.target.value.replace(/\D/g, ""))
              }
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
              value={applicant.EmailId || ""}
              onChange={(e) => onChange("EmailId", e.target.value)}
            />
          </Field>

          <Field icon="📱" label="Mobile No *">
            <input
              maxLength={10}
              placeholder=" "
              value={applicant.MobileNo || ""}
              onChange={(e) =>
                onChange("MobileNo", e.target.value.replace(/\D/g, ""))
              }
            />
          </Field>

          <Field icon="☎️" label="Landline">
            <input
              maxLength={10}
              placeholder=" "
              value={applicant.LandLine || ""}
              onChange={(e) =>
                onChange("LandLine", e.target.value.replace(/\D/g, ""))
              }
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