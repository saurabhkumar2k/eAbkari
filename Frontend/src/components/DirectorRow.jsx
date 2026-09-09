import React from "react";

import "../Style/ApplyLicense.css";

import {
  User,
  Percent,
  CreditCard,
  BadgeCheck,
  Upload,
  FileText,
  Eye,
  RefreshCcw,
  Trash2,
} from "lucide-react";

export default function DirectorRow({
  director,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  console.log("DirectorsList:", ConstitutionType);
  console.log("DirectorRow:", ConstitutionType);
  console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log(director);
  return (

    <div className="directors-container">
      {/* Director List */}
      <div className="directors-list">
        <div className="director-section">
          {/* Director Header */}
          <div className="director-header">
            <h3>Director / Partner #{index + 1}</h3>

            <button
              type="button"
              className="bt-dir-del"
              onClick={() => onDelete(index)}
              disabled={disableDelete}
            >
              🗑 Delete
            </button>
          </div>

          {/* 3 × 2 Grid */}
          <div className="director-grid">
            {/* Name */}
            <div className="director-field">
              <label>
                Name <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />
                <input
                  value={director.PName || ""}
                  onChange={(e) => onChange(index, "PName", e.target.value)}
                />
              </div>
            </div>

            {/* Share */}
            <div className="director-field">
              <label>
                Share % <span>*</span>
              </label>

              <div className="input-wrapper">
                <Percent size={16} />
                <input
                  value={director.PPerShare || ""}
                  onChange={(e) => onChange(index, "PPerShare", e.target.value)}
                />
              </div>
            </div>

            {/* PAN */}
            <div className="director-field">
              <label>
                PAN No <span>*</span>
              </label>

              <div className="input-wrapper">
                <CreditCard size={16} />
                <input
                  type="text"
                  name="PanNo"
                  className="reg-input"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={director.PPanNo || ""}
                  onChange={(e) => onChange(index, "PPanNo", e.target.value.toUpperCase())}
                />
              </div>
            </div>

            {/* Excise */}
            <div className="director-field">
              <label>
                Excise Nominee <span>*</span>
              </label>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={director.PExciseNominee === "1"}
                    onChange={() => onChange(index, "PExciseNominee", "1")}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={director.PExciseNominee === "0"}
                    onChange={() => onChange(index, "PExciseNominee", "0")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* PAN Proof */}
            <div className="director-field">
              <label>PAN Proof</label>

              {!director.panFile ? (
                <label className="upload-button">
                  📄 Upload PAN Proof
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      onChange(index, "panFile", e.target.files?.[0] || null)
                    }
                  />
                </label>
              ) : (
                <div className="uploaded-file">
                  <span title={director.panFile.name}>
                    {director.panFile.name}
                  </span>

                  <div className="file-actions">
                    <button
                      type="button"
                      className="file-view"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(director.panFile),
                          "_blank",
                        )
                      }
                    >
                      👁
                    </button>

                    <label className="file-replace">
                      🔄
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          onChange(
                            index,
                            "panFile",
                            e.target.files?.[0] || null,
                          )
                        }
                      />
                    </label>

                    <button
                      type="button"
                      className="file-remove"
                      onClick={() => onChange(index, "panFile", null)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Address Proof */}
            <div className="director-field">
              <label>Address Proof</label>

              {!director.addressFile ? (
                <label className="upload-button">
                  📄 Upload Address Proof
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      onChange(
                        index,
                        "addressFile",
                        e.target.files?.[0] || null,
                      )
                    }
                  />
                </label>
              ) : (
                <div className="uploaded-file">
                  <span title={director.addressFile.name}>
                    {director.addressFile.name}
                  </span>

                  <div className="file-actions">
                    <button
                      type="button"
                      className="file-view"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(director.addressFile),
                          "_blank",
                        )
                      }
                    >
                      👁
                    </button>

                    <label className="file-replace">
                      🔄
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          onChange(
                            index,
                            "addressFile",
                            e.target.files?.[0] || null,
                          )
                        }
                      />
                    </label>

                    <button
                      type="button"
                      className="file-remove"
                      onClick={() => onChange(index, "addressFile", null)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DIN - only when required */}
          {ConstitutionType === "01" && (
            <div className="din-row">
              <div className="din-field">
                <label>DIN No</label>

                <div className="input-wrapper">
                  <BadgeCheck size={16} />

                  <input
                    value={director.DINNo || ""}
                    onChange={(e) => onChange(index, "DINNo", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// import "../Styles/ApplyLicense.css";

// export default function DirectorRow({
//   director,
//   index,
//   onChange,
//   onDelete,
//   disableDelete,
// }) {
//   return (
//     <div className="director-row custom-card">
//       <strong>Director {index + 1}</strong>

//       <div className="form-row">
//         <div className="form-item">
//           <label>Name</label>
//           <input
//             value={director.name || ""}
//             onChange={(e) => onChange(index, "name", e.target.value)}
//           />
//         </div>

//         <div className="form-item">
//           <label>PAN</label>
//           <input
//             value={director.panNo || ""}
//             onChange={(e) => onChange(index, "panNo", e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         className="red-button"
//         onClick={() => onDelete(index)}
//         disabled={disableDelete}
//       >
//         Delete
//       </button>
//     </div>
//   );
// }
