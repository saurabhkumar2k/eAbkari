import React from "react";

import "../Style/ApplyLicense.css";

import {
  User,
  Percent,
  CreditCard,
  BadgeCheck,
  Upload ,
  FileText,
  Eye ,
  RefreshCcw,
  Trash2  
} from "lucide-react";

export default function DirectorRow({
  director,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType
}) {


// console.log("DirectorsList:", applicant?.constitutionType);
console.log("DirectorsList:", ConstitutionType);
console.log("DirectorRow:", ConstitutionType);
 console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
console.log("DirectorRow ConstitutionType:", ConstitutionType);
console.log(director);
  return (



    
//     <div className="director-row custom-card">
//       {/* Header */}


      
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
//         <strong>Sl No {index + 1}</strong>

//         <button
//           type="button"
//           className="red-button"
//           onClick={() => onDelete(index)}
//           disabled={disableDelete}
//         >
//           Delete
//         </button>
//       </div>

//       <div className="form-row">
//         {/* Name */}
//         <div className="form-item">
//           <label>Name *</label>
//           <input
//             value={director.PName || ""}
//             onChange={(e) => onChange(index, "PName", e.target.value)}
//           />
//         </div>

//         {/* Share */}
//         <div className="form-item">
//           <label>Share % *</label>
//           <input
//             value={director.PPerShare || ""}
//             onChange={(e) => onChange(index, "PPerShare", e.target.value)}
//           />
//         </div>

     



//         </div>

// <div className="form-row">
//    {/* PAN */}
//         <div className="form-item">
//           <label>PAN No *</label>
//           <input
//             value={director.PPanNo || ""}
//             onChange={(e) => onChange(index, "PPanNo", e.target.value)}
//           />
//         </div>

//         {/* Excise Nominee */}
//         <div className="form-item">
//           <label>Excise Nominee *</label>

//           <div style={{ display: "flex", gap: 5 }}>
//             <button
//               type="button"
//               className={director.PExciseNominee === "1" ? "red-button" : ""}
//               onClick={() => onChange(index, "PExciseNominee", "1")}
//             >
//               Yes
//             </button>

//             <button
//               type="button"
//               className={director.PExciseNominee === "0" ? "red-button" : ""}
//               onClick={() => onChange(index, "PExciseNominee", "0")}
//             >
//               No
//             </button>
//           </div>

//         </div>


//           <div className="form-item">
            
            
            
//             {ConstitutionType === "01" && (
//   <input
//     value={director.DINNo || ""}
//     label="DIN No"
//     placeholder="DIN No"
//     onChange={(e) =>
//       onChange(index, "DINNo", e.target.value)
//     }
//   />
// )}</div>


//   </div>




// {/* 🔥 FILE ROW (FULL WIDTH) */}
// <div className="form-row file-row">

//   <div className="form-item full">
//     <label>PAN Proof</label>
//      <div className="file-modern">
//     {!director.panFile ? (
//       <label className="upload-box">
//         📄 Upload
//         <input
//           type="file"
//           hidden
//           onChange={(e) =>
//             onChange(index, "panFile", e.target.files[0])
//           }
//         />
//       </label>
//     ) : (
//       <>
//         <span className="file-name">{director.panFile.name}</span>

//         <div className="file-actions">
//           <button
//             type="button"
//             className="btn-view"
//             onClick={() =>
//               window.open(URL.createObjectURL(director.panFile))
//             }
//           >
//             👁
//           </button>

//           <label className="btn-replace">
//             🔄
//             <input
//               type="file"
//               hidden
//               onChange={(e) =>
//                 onChange(index, "panFile", e.target.files[0])
//               }
//             />
//           </label>

//           <button
//             type="button"
//             className="btn-delete"
//             onClick={() => onChange(index, "panFile", null)}
//           >
//             ❌
//           </button>
//         </div>
//       </>
//     )}
//   </div>
//   </div>

//   <div className="form-item full">
//     <label>Address Proof</label>
//       <div className="file-modern">
//     {!director.addressFile ? (
//       <label className="upload-box">
//         📄 Upload
//         <input
//           type="file"
//           hidden
//           onChange={(e) =>
//             onChange(index, "addressFile", e.target.files[0])
//           }
//         />
//       </label>
//     ) : (
//       <>
//         <span className="file-name">{director.addressFile.name}</span>

//         <div className="file-actions">
//           <button
//             type="button"
//             className="btn-view"
//             onClick={() =>
//               window.open(URL.createObjectURL(director.addressFile))
//             }
//           >
//             👁
//           </button>

//           <label className="btn-replace">
//             🔄
//             <input
//               type="file"
//               hidden
//               onChange={(e) =>
//                 onChange(index, "addressFile", e.target.files[0])
//               }
//             />
//           </label>

//           <button
//             type="button"
//             className="btn-delete"
//             onClick={() => onChange(index, "addressFile", null)}
//           >
//             ❌
//           </button>
//         </div>
//       </>
//     )}
//   </div>
//   </div>

// </div>



//     </div>



<div className="card-section">

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <h3>Director / Partner #{index + 1}</h3>

    <button
      type="button"
      className="btn btn-danger"
      onClick={() => onDelete(index)}
      disabled={disableDelete}
    >
      Delete
    </button>
  </div>

  <div className="form-grid">

    {/* Name */}
    <div className="reg-field">
      <label className="reg-label">
        Name <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <User className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={director.PName || ""}
          onChange={(e) =>
            onChange(index, "PName", e.target.value)
          }
        />
      </div>
    </div>

    {/* Share */}
    <div className="reg-field">
      <label className="reg-label">
        Share % <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Percent className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={director.PPerShare || ""}
          onChange={(e) =>
            onChange(index, "PPerShare", e.target.value)
          }
        />
      </div>
    </div>

    {/* PAN */}
    <div className="reg-field">
      <label className="reg-label">
        PAN No <span className="required">*</span>
      </label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <CreditCard className="w-4 h-4 text-blue-600" />
        </div>

        <input
          className="reg-input"
          value={director.PPanNo || ""}
          onChange={(e) =>
            onChange(index, "PPanNo", e.target.value)
          }
        />
      </div>
    </div>

    {/* DIN */}
    {ConstitutionType === "01" && (
      <div className="reg-field">
        <label className="reg-label">DIN No</label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
          </div>

          <input
            className="reg-input"
            value={director.DINNo || ""}
            onChange={(e) =>
              onChange(index, "DINNo", e.target.value)
            }
          />
        </div>
      </div>
    )}

    {/* Excise Nominee */}
    <div className="reg-field">
      <label className="reg-label">
        Excise Nominee <span className="required">*</span>
      </label>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <label>
          <input
            type="radio"
            checked={director.PExciseNominee === "1"}
            onChange={() =>
              onChange(index, "PExciseNominee", "1")
            }
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={director.PExciseNominee === "0"}
            onChange={() =>
              onChange(index, "PExciseNominee", "0")
            }
          />
          No
        </label>
      </div>
    </div>



{/* ================= Upload Documents ================= */}

<div className="file-grid">

  {/* PAN Proof */}

  <div className="reg-field">

    <label className="reg-label">PAN Proof</label>

    <div className="file-modern">

      {!director.panFile ? (

        <label className="upload-box">

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

        <>

          <span className="file-name">
            {director.panFile.name}
          </span>

          <div className="file-actions">

            <button
              type="button"
              className="btn-view"
              onClick={() =>
                window.open(
                  URL.createObjectURL(director.panFile),
                  "_blank"
                )
              }
            >
              👁
            </button>

            <label className="btn-replace">

              🔄

              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  onChange(index, "panFile", e.target.files?.[0] || null)
                }
              />

            </label>

            <button
              type="button"
              className="btn-delete"
              onClick={() =>
                onChange(index, "panFile", null)
              }
            >
              ❌
            </button>

          </div>

        </>

      )}

    </div>

  </div>

  {/* Address Proof */}

  <div className="reg-field">

    <label className="reg-label">
      Address Proof
    </label>

    <div className="file-modern">

      {!director.addressFile ? (

        <label className="upload-box">

          📄 Upload Address Proof

          <input
            type="file"
            hidden
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              onChange(index, "addressFile", e.target.files?.[0] || null)
            }
          />

        </label>

      ) : (

        <>

          <span className="file-name">
            {director.addressFile.name}
          </span>

          <div className="file-actions">

            <button
              type="button"
              className="btn-view"
              onClick={() =>
                window.open(
                  URL.createObjectURL(director.addressFile),
                  "_blank"
                )
              }
            >
              👁
            </button>

            <label className="btn-replace">

              🔄

              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  onChange(index, "addressFile", e.target.files?.[0] || null)
                }
              />

            </label>

            <button
              type="button"
              className="btn-delete"
              onClick={() =>
                onChange(index, "addressFile", null)
              }
            >
              ❌
            </button>

          </div>

        </>

      )}
</div>


  </div>


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

