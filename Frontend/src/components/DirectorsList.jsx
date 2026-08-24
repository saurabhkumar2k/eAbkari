import React from "react";
import DirectorRow from "./DirectorRow";

import "../Style/ApplyLicense.css";
import "../Style/DirectorsList.css";

const DirectorsList = ({ directors, onChange, onAdd, onDelete, ConstitutionType }) => {
  return (
    <div className="directors-section">
      {/* Section Title */}
      {/* <div className="directors-header-box">
        <h3 className="directors-heading">
          Directors / Partners / Proprietors
        </h3>
        <p className="directors-subheading">
          As per MCA Portal (Companies Act 2013)
        </p>
      </div> */}
      <div className="directors-header">
        <div>
          <h2>Directors / Partners / Proprietors</h2>
          <p>As per MCA Portal (Companies Act 2013)</p>
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
            <DirectorRow
              key={index}
              director={director}
              index={index}
              onChange={onChange}
              onDelete={onDelete}
              ConstitutionType={ConstitutionType}
              disableDelete={false}
            />
          ))
        )}
      </div>

      {/* Add Button */}
      {/* <div className="directors-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Director
        </button>
        {directors.length > 0 && (
          <span className="directors-count">
            {directors.length} director{directors.length !== 1 ? 's' : ''} added
          </span>
        )}
      </div> */}
      <div className="directors-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Director
        </button>

        {directors.length > 0 && (
          <span className="directors-count">
            {directors.length} director{directors.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default DirectorsList;





