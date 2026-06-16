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
            <select
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
            </select>
          </Field>

          <Field icon="🏙️" label="District *">
            <select
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
  <select
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
  </select>
</Field>

          <Field icon="🚓" label="Police Station">
            <select
              value={applicant.warehousePoliceStation || ""}
              onChange={(e) =>
                onChange("warehousePoliceStation", e.target.value)
              }
            >
              <option value=""></option>
              {policeStations.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
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
              value={applicant.warehouseWard || ""}
              onChange={(e) =>
                onChange("warehouseWard", e.target.value)
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