import React from "react";

import "../Style/ApplyLicense.css";


export default function DirectorRow({
  director,
  index,
  onChange,
  onDelete,
  disableDelete,
  constitutionType
}) {


// console.log("DirectorsList:", applicant?.constitutionType);
console.log("DirectorsList:", constitutionType);
console.log("DirectorRow:", constitutionType);
 console.log("constitutionType:", constitutionType); // 👈 ADD HERE
console.log("DirectorRow constitutionType:", constitutionType);
  return (



    
    <div className="director-row custom-card">
      {/* Header */}


      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <strong>Sl No {index + 1}</strong>

        <button
          type="button"
          className="red-button"
          onClick={() => onDelete(index)}
          disabled={disableDelete}
        >
          Delete
        </button>
      </div>

      <div className="form-row">
        {/* Name */}
        <div className="form-item">
          <label>Name *</label>
          <input
            value={director.name || ""}
            onChange={(e) => onChange(index, "name", e.target.value)}
          />
        </div>

        {/* Share */}
        <div className="form-item">
          <label>Share % *</label>
          <input
            value={director.share || ""}
            onChange={(e) => onChange(index, "share", e.target.value)}
          />
        </div>

     



        </div>

<div className="form-row">
   {/* PAN */}
        <div className="form-item">
          <label>PAN No *</label>
          <input
            value={director.panNo || ""}
            onChange={(e) => onChange(index, "panNo", e.target.value)}
          />
        </div>

        {/* Excise Nominee */}
        <div className="form-item">
          <label>Excise Nominee *</label>

          <div style={{ display: "flex", gap: 5 }}>
            <button
              type="button"
              className={director.exciseNominee === "1" ? "red-button" : ""}
              onClick={() => onChange(index, "exciseNominee", "1")}
            >
              Yes
            </button>

            <button
              type="button"
              className={director.exciseNominee === "0" ? "red-button" : ""}
              onClick={() => onChange(index, "exciseNominee", "0")}
            >
              No
            </button>
          </div>

        </div>


          <div className="form-item">
            
            
            
            {constitutionType === "Company" && (
  <input
    value={director.dinNo || ""}
    label="DIN No"
    placeholder="DIN No"
    onChange={(e) =>
      onChange(index, "dinNo", e.target.value)
    }
  />
)}</div>


  </div>




{/* 🔥 FILE ROW (FULL WIDTH) */}
<div className="form-row file-row">

  <div className="form-item full">
    <label>PAN Proof</label>
     <div className="file-modern">
    {!director.panFile ? (
      <label className="upload-box">
        📄 Upload
        <input
          type="file"
          hidden
          onChange={(e) =>
            onChange(index, "panFile", e.target.files[0])
          }
        />
      </label>
    ) : (
      <>
        <span className="file-name">{director.panFile.name}</span>

        <div className="file-actions">
          <button
            type="button"
            className="btn-view"
            onClick={() =>
              window.open(URL.createObjectURL(director.panFile))
            }
          >
            👁
          </button>

          <label className="btn-replace">
            🔄
            <input
              type="file"
              hidden
              onChange={(e) =>
                onChange(index, "panFile", e.target.files[0])
              }
            />
          </label>

          <button
            type="button"
            className="btn-delete"
            onClick={() => onChange(index, "panFile", null)}
          >
            ❌
          </button>
        </div>
      </>
    )}
  </div>
  </div>

  <div className="form-item full">
    <label>Address Proof</label>
      <div className="file-modern">
    {!director.addressFile ? (
      <label className="upload-box">
        📄 Upload
        <input
          type="file"
          hidden
          onChange={(e) =>
            onChange(index, "addressFile", e.target.files[0])
          }
        />
      </label>
    ) : (
      <>
        <span className="file-name">{director.addressFile.name}</span>

        <div className="file-actions">
          <button
            type="button"
            className="btn-view"
            onClick={() =>
              window.open(URL.createObjectURL(director.addressFile))
            }
          >
            👁
          </button>

          <label className="btn-replace">
            🔄
            <input
              type="file"
              hidden
              onChange={(e) =>
                onChange(index, "addressFile", e.target.files[0])
              }
            />
          </label>

          <button
            type="button"
            className="btn-delete"
            onClick={() => onChange(index, "addressFile", null)}
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

