import React from "react";
import RetailDirectorRow from "./RetailDirectorRow";


//import "../Style/Restaurant.css";
import "../../../Style/Retail.css"

const RetailDirectorDetails = ({ RetailPropDetails, onChange, onAdd, onDelete, ConstitutionType, errors }) => {

  console.log("ClubDetailsL2829 errors:", errors); 
  return (
    <div className="restaurants-section">
      {/* Section Title */}
     
      <div className="restaurants-header">
        <div>
          <h2>Directors/Proprietors/Partners Details</h2>
          {/* <p className="restaurant-subheading">
            As per MCA Portal (Companies Act 2013)
          </p> */}
        </div>
      </div>

      {/* restaurants List */}
      <div className="restaurants-wrapper">
        {RetailPropDetails.length === 0 ? (
          <div className="restaurants-empty-state">
            <p className="empty-message">No Directors/Proprietors/Partners Details added yet. Click "Add Directors/Proprietors/Partners Details" to start.</p>
          </div>
        ) : (
          RetailPropDetails.map((detail, index) => (
            <RetailDirectorRow
              key={index}
              RetailPropDetails={detail}
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
          + Add Directors/Proprietors/Partners Details
        </button>

        {RetailPropDetails.length > 0 && (
          <span className="restaurants-count">
            {RetailPropDetails.length} directors/partners{RetailPropDetails.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
      
    </div>
  );
};

export default RetailDirectorDetails;





