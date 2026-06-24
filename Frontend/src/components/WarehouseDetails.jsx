import React from "react";
import "../Style/ApplyLicense.css";

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

        <div className="grid-3">

          <Field icon="🏬" label="Warehouse Name *">
            <input
              placeholder=" "
              value={applicant.warehouseName || ""}
              onChange={(e) => onChange("warehouseName", e.target.value)}
            />
          </Field>

          <Field icon="🏠" label="Address Line 1 *">
            <input
              placeholder=" "
              value={applicant.warehouseAddress1 || ""}
              onChange={(e) => onChange("warehouseAddress1", e.target.value)}
            />
          </Field>

          <Field icon="📍" label="Address Line 2">
            <input
              placeholder=" "
              value={applicant.warehouseAddress2 || ""}
              onChange={(e) => onChange("warehouseAddress2", e.target.value)}
            />
          </Field>

        </div>
      </div>

      {/* ================= LOCATION ================= */}
      <div className="card-section address-box">
        <h3>📍 Location Details</h3>

        <div className="grid-3">

          <Field icon="🌏" label="State *">
            {/* <select
              value={applicant.warehouseState || ""}
              onChange={(e) => {
                onChange("warehouseState", e.target.value);
                onChange("warehouseDistrict", "");
              }}
            >
              <option value=""></option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select> */}

<select
  name="state"
  value={applicant.warehouseState || ""}
  onChange={(e) => onChange("warehouseState", e.target.value)}
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
            {/* <select
              value={applicant.warehouseDistrict || ""}
              onChange={(e) =>
                onChange("warehouseDistrict", e.target.value)
              }
            >
              <option value=""></option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select> */}


 <select
  value={applicant.warehouseDistrict || ""}
  disabled={!applicant.warehouseState}
  onChange={(e) => onChange("warehouseDistrict", e.target.value)}
   //onChange={(e) => { handleChange(e);fetchSubDivisions(e.target.value)}}
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
              value={applicant.warehousePin || ""}
              onChange={(e) =>
                onChange("warehousePin", e.target.value.replace(/\D/g, ""))
              }
            />
          </Field>

  <Field icon="🏢" label="Sub Division">

  {/* <select
    value={applicant.warehouseSubDivision || ""}
    onChange={(e) =>
      onChange("warehouseSubDivision", e.target.value)
    }
  >
    <option value="">Select Sub Division</option>

    {subDivisions.map((s) => (
      <option key={s.id} value={s.id}>
        {s.name}
      </option>
    ))}
  </select> */}


 <select
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
</select>

</Field>

          <Field icon="🚓" label="Police Station">
<select
  value={applicant.WarehousePoliceStation || ""}
  onChange={(e) => onChange("WarehousePoliceStation", e.target.value)}
>
  <option value="">Select Police Station</option>

  {(policeStations || []).map((p) => (
    <option key={p.psCode} value={p.psCode}>
      {p.psName}
    </option>
  ))}
</select>
          </Field>

          <Field icon="📍" label="Constituency">
            <input
              placeholder=" "
              value={applicant.warehouseConstituency || ""}
              onChange={(e) =>
                onChange("warehouseConstituency", e.target.value)
              }
            />
          </Field>

          <Field icon="🏷️" label="Ward Name">
            <input
              placeholder=" "
              value={applicant.WarehouseWardName || ""}
              onChange={(e) =>
                onChange("WarehouseWardName", e.target.value)
              }
            />
          </Field>

        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="card-section contact-box">
        <h3>📞 Contact Details</h3>

        <div className="grid-3">

          <Field icon="📧" label="Email">
            <input
              type="email"
              placeholder=" "
              value={applicant.warehouseEmail || ""}
              onChange={(e) =>
                onChange("warehouseEmail", e.target.value)
              }
            />
          </Field>

          <Field icon="📱" label="Mobile">
            <input
              maxLength={10}
              placeholder=" "
              value={applicant.warehouseMobile || ""}
              onChange={(e) =>
                onChange("warehouseMobile", e.target.value.replace(/\D/g, ""))
              }
            />
          </Field>

          <Field icon="☎️" label="Landline">
            <input
              placeholder=" "
              value={applicant.warehouseLandline || ""}
              onChange={(e) =>
                onChange("warehouseLandline", e.target.value.replace(/\D/g, ""))
              }
            />
          </Field>

          <Field icon="📠" label="FAX">
            <input
              placeholder=" "
              value={applicant.warehouseFAX || ""}
              onChange={(e) =>
                onChange("warehouseFAX", e.target.value.replace(/\D/g, ""))
              }
            />
          </Field>

        </div>
      </div>



 <div className="section-card">
  <h3 className="section-title">Additional Details of Warehouse</h3>

  <div className="form-row">
    <div className="form-item">
      <label>Whether License Premise is</label>
      <select
        value={applicant.licensePremise || ""}
        onChange={(e) => onChange("licensePremise", e.target.value)}
      >
        <option value="">Select</option>
        <option value="Owned">Owned</option>
        <option value="Leased">Leased</option>
        <option value="Rented">Rented</option>
      </select>
    </div>

    <div className="form-item">
      <label>Lease / Sale / Rent Registration No</label>
      <input
        value={applicant.LeaseRegistration || ""}
        onChange={(e) => onChange("LeaseRegistration", e.target.value)}
      />
    </div>

    <div className="form-item">
      <label>Registration Date</label>
      <input
        type="date"
        value={applicant.LeaseRegistrationDate || ""}
        onChange={(e) => onChange("LeaseRegistrationDate", e.target.value)}
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-item">
      <label>Expiration Date</label>
      <input
        type="date"
        value={applicant.LeaseRegistrationExpiryDate || ""}
        onChange={(e) => onChange("LeaseRegistrationExpiryDate", e.target.value)}
      />
    </div>

    <div className="form-item">
      <label>Architect Reg. No</label>
      <input
        value={applicant.ArchitectRegistrationNo || ""}
        onChange={(e) => onChange("ArchitectRegistrationNo", e.target.value)}
      />
    </div>

    <div className="form-item">
      <label>Architect Valid Upto</label>
      <input
        type="date"
        value={applicant.ArchitectRegistrationNoValidUpto || ""}
        onChange={(e) => onChange("ArchitectRegistrationNoValidUpto", e.target.value)}
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-item">
      <label>Super Area (sq ft)</label>
      <input
        value={applicant.SuperAreaofLicensePremise || ""}
        onChange={(e) =>
          onChange("SuperAreaofLicensePremise", e.target.value.replace(/\D/g, ""))
        }
      />
    </div>

    <div className="form-item">
      <label>Carpet Area (sq ft)</label>
      <input
        value={applicant.CarpetAreaofLicensePremise || ""}
        onChange={(e) =>
          onChange("CarpetAreaofLicensePremise", e.target.value.replace(/\D/g, ""))
        }
      />
    </div>

    <div className="form-item">
      <label>Distance from CP (KM)</label>
      <input
        value={applicant.DistanceofDistillery || ""}
        onChange={(e) =>
          onChange("DistanceofDistillery", e.target.value.replace(/\D/g, ""))
        }
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-item">
      <label>Hours of Sale</label>
      <select
        value={applicant.HoursofSale || ""}
        onChange={(e) => onChange("HoursOfSale", e.target.value)}
      >
        <option value="">Select</option>
        <option value="9-5">9 AM - 5 PM</option>
        <option value="8-8">8 AM - 8 PM</option>
        <option value="10-6">10 AM - 6 PM</option>
      </select>
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