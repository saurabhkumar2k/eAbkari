import React from "react";
import ClubDetailsRow from "./ClubDetailsRow";

import "../Style/ApplyLicense.css";
//import "../Style/Restaurant.css";
import "../Style/Club.css"

const ClubDetailsL2829 = ({ ClubDetails, onChange, onAdd, onDelete, ConstitutionType, errors }) => {
  return (
    <div className="restaurants-section">
      {/* Section Title */}
     
      <div className="restaurants-header">
        <div>
          <h2>Bar Details</h2>
          {/* <p className="restaurant-subheading">
            As per MCA Portal (Companies Act 2013)
          </p> */}
        </div>
      </div>

      {/* restaurants List */}
      <div className="restaurants-wrapper">
        {ClubDetails.length === 0 ? (
          <div className="restaurants-empty-state">
            <p className="empty-message">No Club Details added yet. Click "Add Club Details" to start.</p>
          </div>
        ) : (
          ClubDetails.map((detail, index) => (
            <ClubDetailsRow
              key={index}
              ClubDetail={detail}
              index={index}
              onChange={onChange}
              onDelete={onDelete}
              ConstitutionType={ConstitutionType}
              disableDelete={false}            
              errors={errors?.[index]}
            />
          ))
        )}
      </div>

      <div className="restaurants-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Bar Details
        </button>

        {ClubDetails.length > 0 && (
          <span className="restaurants-count">
            {ClubDetails.length} bar detail{ClubDetails.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default ClubDetailsL2829;





