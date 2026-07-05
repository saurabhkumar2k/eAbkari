import React from "react";
import DirectorRow from "./DirectorRow";

import "../Style/ApplyLicense.css";

const DirectorsList = ({ directors, onChange, onAdd, onDelete,constitutionType }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>
        List of all Directors/Partners/Proprietors (as in MCA Portal as per provision
        of Companies Act of 2013)
      </h3>

      {directors.map((director, index) => (
        <DirectorRow
          key={index}
          director={director}
          index={index}
          onChange={onChange}
          onDelete={onDelete}
          constitutionType={constitutionType} // 👈 ADD HERE
          disableDelete={directors.length === 1}
        />
      ))}

      <div style={{ textAlign: "right", marginTop: 15 }}>
        <button
          type="button"
          onClick={onAdd}
          style={{
            padding: "8px 16px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Add Director
        </button>
      </div>
    </div>
  );
};

export default DirectorsList;





