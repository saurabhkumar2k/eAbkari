import React from "react";
import RetailDirectorRow from "./RetailDirectorRow";


//import "../Style/Restaurant.css";
import "../../../Style/Retail.css"

const RetailDirectorDetails = ({ ClubDetails, onChange, onAdd, onDelete, ConstitutionType, errors }) => {

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
        {ClubDetails.length === 0 ? (
          <div className="restaurants-empty-state">
            <p className="empty-message">No Directors/Proprietors/Partners Details added yet. Click "Add Directors/Proprietors/Partners Details" to start.</p>
          </div>
        ) : (
          ClubDetails.map((detail, index) => (
            <RetailDirectorRow
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
          + Add Directors/Proprietors/Partners Details
        </button>

        {ClubDetails.length > 0 && (
          <span className="restaurants-count">
            {ClubDetails.length} directors/partners{ClubDetails.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
      
    </div>
  );
};

export default RetailDirectorDetails;





