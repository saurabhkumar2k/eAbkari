import React from "react";
import EmployeeRow from "./EmployeeRow";

import "../../../Style/ApplyLicense.css"
import "../../../Style/DirectorsList.css"

const L10EmployeeDetails = ({ directors, onChange, onAdd, onDelete, ConstitutionType, directorsError }) => {
  return (
    <div className="directors-section">

      <div className="directors-header">
        <div>
          <h2>Employee Details</h2>
          {/* <p>As per MCA Portal (Companies Act 2013)</p> */}
        </div>
      </div>

      {/* Directors List */}
      <div className="directors-wrapper">
        {directors.length === 0 ? (
          <div className="directors-empty-state">
            <p className="empty-message">No directors added yet. Click "Add Director" to start.</p>
          </div>
        ) : (
          directors.map((director, index) => (
            <EmployeeRow
              key={index}
              director={director}
              index={index}
              onChange={onChange}
              onDelete={onDelete}
              ConstitutionType={ConstitutionType}
              disableDelete={false}
              directorsError={directorsError?.errors?.[index] || {}}
            />
          ))
        )}
      </div>

      <div className="directors-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Employee
        </button>

        {directors.length > 0 && (
          <span className="directors-count">
            {directors.length} employee{directors.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default L10EmployeeDetails;





